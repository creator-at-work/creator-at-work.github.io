"""Build the public suggestion catalogue from the attributed TMDB snapshots."""
from argparse import ArgumentParser
from datetime import date
import gzip
import json
from pathlib import Path
import re
from io import TextIOWrapper
import csv
from zipfile import ZipFile

HERE = Path(__file__).resolve().parent


def rows(archive):
    with ZipFile(archive) as source:
        filename, = [name for name in source.namelist() if name.endswith('.csv')]
        with TextIOWrapper(source.open(filename), encoding='utf-8-sig', newline='') as stream:
            yield from csv.DictReader(stream)


def compiler(rule_file):
    rules = json.loads(rule_file.read_text())
    for labels in rules.values():
        for rule in labels.values():
            for field in ('phrases', 'exclude'):
                words = rule.get(field, [])
                rule[field] = re.compile(r'(?<!\w)(?:'+ '|'.join(map(re.escape, words)) +r')(?!\w)') if words else None
            rule['keywords'] = set(rule['keywords'])
            rule['genres'] = set(rule.get('genres', []))
    return rules


def classify(rules, overview, keywords, genres, source, joined):
    result = {}
    for dimension, labels in rules.items():
        tags = {}
        for label, rule in labels.items():
            if rule['exclude'] and (rule['exclude'].search(overview) or any(rule['exclude'].search(k) for k in keywords)):
                continue
            keyword = sorted(keywords & rule['keywords'])
            phrase = list(dict.fromkeys(rule['phrases'].findall(overview))) if rule['phrases'] else []
            genre = sorted(genres & rule['genres'])
            if not (keyword or phrase):
                continue
            strength = 3 if (keyword and phrase) or (genre and (keyword or phrase)) else 2
            if dimension == 'mood' and label == 'slow-living' and not (phrase and (keyword or len(phrase) >= 2)):
                continue
            if not joined:
                strength = min(strength, 2)
            tags[label] = [strength, source, [*keyword[:2], *phrase[:2], *genre[:1]]]
        if tags:
            result[dimension] = tags
    return result


def wordset(value):
    return {word.strip() for word in value.split(',') if word.strip()}

def pack(movies, series, output):
    rules = compiler(HERE / 'mood_rules.json')
    editorial = json.loads((HERE / 'editorial_tags.json').read_text())
    quiet = json.loads((HERE / 'slow_living.json').read_text())
    by_imdb = {}
    for dimension, tags in editorial.items():
        for tag, entries in tags.items():
            for ident in entries:
                by_imdb.setdefault(int(ident), {}).setdefault(dimension, set()).add(tag)
    quiet_names = {label.rsplit(' (', 1)[0].casefold(): int(label.rsplit('(', 1)[1][:-1])
                   for label in quiet.values()}
    titles = []
    for archive, format, name_field, date_field in (
        (movies, 'Film', 'title', 'release_date'), (series, 'Series', 'name', 'first_air_date')
    ):
        for row in rows(archive):
            year = row[date_field][:4]
            title = row[name_field].strip()
            if row['adult'].lower() == 'true' or not title or not year.isdigit() or int(year)>date.today().year:
                continue
            rating = float(row['vote_average'] or 0)
            votes = int(float(row['vote_count'] or 0))
            if not votes:
                continue
            genres = wordset(row.get('genres', ''))
            keywords = wordset(row.get('keywords', '').lower())
            tags = classify(rules, row.get('overview', '').lower(), keywords, genres, 'synopsis', True)
            ident = row.get('imdb_id', '')
            external_id = int(ident[2:]) if re.fullmatch(r'tt\d+', ident) else None
            moods = set(tags.get('mood', {}))
            focus = set(tags.get('focus', {}))
            moods.update(by_imdb.get(external_id, {}).get('mood', set()))
            focus.update(by_imdb.get(external_id, {}).get('focus', set()))
            if ((external_id and str(external_id) in quiet) or
                quiet_names.get(title.casefold()) == int(year)):
                moods.add('slow-living')
            lang = row['original_language']
            countries = wordset(row.get('production_countries', ''))
            industry = ''
            if format == 'Film':
                if lang == 'en' and 'United States of America' in countries:
                    industry = 'hollywood'
                elif lang == 'hi' and 'India' in countries:
                    industry = 'bollywood'
            titles.append([int(row['id']),title,int(year),format,round(rating,2),votes,
                           sorted(genres),sorted(moods),sorted(focus),industry])
    output.parent.mkdir(parents=True, exist_ok=True)
    with gzip.open(output, 'wt', encoding='utf-8', compresslevel=6) as stream:
        json.dump(titles, stream, ensure_ascii=False, separators=(',', ':'))
    print(f'{len(titles):,} public films and series')


if __name__ == '__main__':
    parser = ArgumentParser(description=__doc__)
    for field in ('movies', 'series', 'output'):
        parser.add_argument(field, type=Path)
    pack(**vars(parser.parse_args()))
