'use strict';

const moods = {
  any: 'Surprise me', 'slow-living': 'Slow living', 'feel-good': 'Feel-good', funny: 'Funny',
  tense: 'Tense', 'mind-bending': 'Mind-bending', 'high-energy': 'High-energy', scary: 'Scary'
};
const focuses = {
  espionage: 'Espionage', military: 'Military & tactics', power: 'Power games',
  investigation: 'Investigation', relationships: 'Relationships', history: 'History'
};
const byId = id => document.getElementById(id);
const catalogueUrl = 'https://after-dark-public-catalogue.jatinbhatt.workers.dev/catalogue-v1.part';
let catalogue;
let queue = [];
let filters;
const seen = new Set();

for (const [id, name] of Object.entries(moods)) {
  const label = document.createElement('label');
  const input = document.createElement('input');
  const display = document.createElement('span');
  label.className = 'mood';
  input.type = 'radio';
  input.name = 'mood';
  input.value = id;
  input.checked = id === 'any';
  display.textContent = name;
  label.append(input, display);
  byId('moods').append(label);
}
for (const [id, name] of Object.entries(focuses)) {
  byId('focus').append(new Option(name, id));
}
for (const genre of ['Action','Action & Adventure','Adventure','Animation','Comedy','Crime','Documentary','Drama','Family','Fantasy','History','Horror','Music','Mystery','Romance','Science Fiction','Sci-Fi & Fantasy','Thriller','War','War & Politics','Western']) {
  byId('genre').append(new Option(genre === 'Science Fiction' ? 'Science fiction' : genre, genre));
}
byId('industry').addEventListener('change', () => {
  if (byId('industry').value !== 'any') byId('format').value = 'Film';
});
byId('format').addEventListener('change', () => {
  if (byId('format').value !== 'Film') byId('industry').value = 'any';
});

function getCatalogue() {
  catalogue ??= fetch(catalogueUrl).then(response => {
    if (!response.ok || !response.body) throw new Error('The catalogue is temporarily unavailable.');
    return new Response(response.body.pipeThrough(new DecompressionStream('gzip'))).json();
  }).catch(error => {
    catalogue = null;
    throw error;
  });
  return catalogue;
}

function eligible(row, selections) {
  const [, , , format, rating, , genres, tags, topics, industry] = row;
  return (selections.format === 'any' || format === selections.format) &&
    (selections.mood === 'any' || tags.includes(selections.mood)) &&
    (selections.focus === 'any' || topics.includes(selections.focus)) &&
    (selections.genre === 'any' || genres.includes(selections.genre)) &&
    (selections.industry === 'any' || industry === selections.industry) &&
    (selections.rating === 'under-6' ? rating > 0 && rating < 6 : rating >= Number(selections.rating));
}
function nextBatch(rows) {
  const top = [];
  for (const row of rows) {
    const [id, , , format, rating, votes] = row;
    if (seen.has(format + id) || !eligible(row, filters)) continue;
    const weight = votes / (votes + 70);
    const value = rating * weight + 5.8 * (1 - weight) + Math.random() * 0.8;
    if (top.length >= 5 && top.at(-1).value >= value) continue;
    top.push({row, value});
    top.sort((a, b) => b.value - a.value);
    if (top.length > 5) top.pop();
  }
  return top.map(entry => entry.row);
}
function showNext(rows) {
  if (!queue.length) queue = nextBatch(rows);
  const result = byId('result');
  if (!queue.length) {
    result.hidden = true;
    byId('status').textContent = 'No more matches. Try changing a filter.';
    return;
  }
  const [id, title, year, format, rating, , genres] = queue.shift();
  seen.add(format + id);
  byId('title').textContent = title;
  byId('details').textContent = [year, format, genres.join(', '), 'TMDB ' + rating.toFixed(1)]
    .filter(Boolean).join(' · ');
  byId('title-info').href = 'https://www.themoviedb.org/' + (format === 'Film' ? 'movie/' : 'tv/') + id;
  byId('status').textContent = '';
  result.hidden = false;
  result.scrollIntoView({block:'nearest'});
}
byId('pick-form').addEventListener('submit', async event => {
  event.preventDefault();
  byId('submit').disabled = true;
  byId('skip-pick').disabled = true;
  byId('status').textContent = 'Finding a pick…';
  filters = Object.fromEntries(['format','focus','genre','industry','rating'].map(id => [id, byId(id).value]));
  filters.mood = document.querySelector('input[name=mood]:checked').value;
  queue = [];
  try {
    showNext(await getCatalogue());
  } catch {
    byId('status').textContent = 'The catalogue could not load. Try again.';
    byId('result').hidden = true;
  } finally {
    byId('submit').disabled = false;
    byId('skip-pick').disabled = false;
  }
});
byId('skip-pick').addEventListener('click', async () => showNext(await getCatalogue()));
