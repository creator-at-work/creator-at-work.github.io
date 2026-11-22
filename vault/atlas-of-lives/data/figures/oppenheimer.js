/* ==========================================================================
   J. ROBERT OPPENHEIMER (1904–1967) — Historical Life Atlas
   Sources: Kai Bird & Martin Sherwin (American Prometheus), AEC Transcripts, Britannica
   ========================================================================== */

(function (global) {
  'use strict';

  global.ATLAS_FIGURES = global.ATLAS_FIGURES || {};

  global.ATLAS_FIGURES.oppenheimer = {
    id: 'oppenheimer',
    era: 'Modern World',
    title: 'J. Robert Oppenheimer',
    fullName: 'J. Robert Oppenheimer',
    years: '1904 — 1967',
    subtitle: 'New York to Los Alamos & Princeton',
    worldLabel: 'World of 1945',
    worldEraLabel: 'Atomic Era · 1904–1967',
    originName: 'New York',
    originCoords: [-74.006, 40.7128],

    viewBounds: {
      lon: [-126.0, 18.0],
      lat: [15.0, 56.5]
    },

    waterLabels: [
      { name: 'ATLANTIC OCEAN', coords: [-40.0, 34.0], regionalOnly: true },
      { name: 'ATLANTIC OCEAN', coords: [-28, -4], worldOnly: true },
      { name: 'INDIAN OCEAN', coords: [78, -22], worldOnly: true },
      { name: 'PACIFIC OCEAN', coords: [-130, -8], worldOnly: true }
    ],

    defaultEraKey: 'ww2',
    territorySets: {
      interwar: {
        empireLabel: 'Centers of Quantum Physics',
        empire: ['United States of America', 'United Kingdom', 'Germany'],
        dependent: [],
        ally: [],
        rival: []
      },
      ww2: {
        empireLabel: 'Allied Atomic Effort (1945)',
        rivalLabel: 'Axis Powers (1945)',
        empire: ['United States of America', 'United Kingdom', 'Canada'],
        dependent: [],
        ally: ['Russia'],
        rival: ['Germany', 'Japan']
      },
      coldwar: {
        empireLabel: 'United States (Cold War)',
        rivalLabel: 'Soviet Union',
        empire: ['United States of America'],
        dependent: ['United Kingdom', 'France', 'Germany'],
        ally: [],
        rival: ['Russia']
      }
    },

    worldRealms: [
      { id: 'ussr', name: 'Soviet Union', desc: 'Tested its first atomic bomb (RDS-1) in August 1949, inaugurating the nuclear arms race Oppenheimer feared.', cssVar: '--terr-rival', countries: ['Russia', 'Ukraine', 'Kazakhstan', 'Belarus'], label: 'SOVIET UNION', labelCoords: [82.0, 60.0] },
      { id: 'japan', name: 'Japan (1945)', desc: 'Target of the atomic bombings of Hiroshima (Aug 6) and Nagasaki (Aug 9, 1945), ending World War II.', cssVar: '--realm-japan', countries: ['Japan'], label: 'JAPAN', labelCoords: [142.0, 36.0] },
      { id: 'india', name: 'India (Independence 1947)', desc: 'Oppenheimer studied Sanskrit deeply at Berkeley, reading the Bhagavad Gita in the original.', cssVar: '--realm-maratha', countries: ['India'], label: 'INDIA', labelCoords: [79.0, 22.0] },
      { id: 'china', name: 'China', desc: 'Emerged from World War II into civil war and the founding of the People’s Republic in 1949.', cssVar: '--realm-qing', countries: ['China'], label: 'CHINA', labelCoords: [104.0, 35.5] }
    ],

    historicalNames: {
      'United States of America': 'United States of America',
      Germany: 'Weimar Republic / Nazi Germany',
      'United Kingdom': 'United Kingdom',
      Russia: 'Soviet Union (USSR)'
    },

    worldPlaces: [
      { name: 'Hiroshima', year: '6 Aug 1945', detail: 'First city struck by an atomic weapon in warfare (“Little Boy”), killing over 70,000 immediately.', coords: [132.4553, 34.3853] },
      { name: 'Nagasaki', year: '9 Aug 1945', detail: 'Struck three days later by a plutonium implosion weapon (“Fat Man”) designed at Los Alamos.', coords: [129.8777, 32.7503] },
      { name: 'Copenhagen', year: '1927', detail: 'Niels Bohr’s institute—spiritual home of the quantum revolution.', coords: [12.5683, 55.6761] }
    ],

    sources: [
      { label: 'Britannica', url: 'https://www.britannica.com/biography/J-Robert-Oppenheimer' },
      { label: 'Atomic Heritage Foundation', url: 'https://ahf.nuclearmuseum.org/' }
    ],

    stages: [
      {
        number: 1,
        roman: 'I',
        id: 'newyork',
        year: '1904',
        age: 'Birth',
        date: '22 April 1904',
        location: 'New York City, United States',
        shortPlace: 'New York',
        coords: [-74.006, 40.7128],
        coordText: '40°43′N, 74°00′W',
        eraKey: 'interwar',
        labelPos: [15, -5],
        routeCurve: 0,
        focusMultiplier: 1.8,
        title: 'A Restless Prodigy of Manhattan',
        prose: 'Born to prosperous German-Jewish immigrants on Manhattan’s Upper West Side, Robert Oppenheimer collected minerals at age seven, read Greek and Latin classics, and graduated summa cum laude in chemistry from Harvard in just three years. Beneath his dazzling brilliance lay an acute emotional fragility that surfaced as soon as he crossed the Atlantic.',
        fact: 'At age twelve he corresponded with geologists so knowledgeably that the New York Mineralogical Club invited him to deliver a lecture—astonished when a boy stepped up to the podium.',
        quote: {
          en: 'The best way to send information is to wrap it up in a person.',
          orig: '',
          provenance: 'Lecture remarks on science and teaching (1948)'
        }
      },
      {
        number: 2,
        roman: 'II',
        id: 'cambridge',
        year: '1925',
        age: 'Age 21',
        date: '1925 – 1926',
        location: 'Cambridge, England',
        shortPlace: 'Cambridge',
        coords: [0.1218, 52.2053],
        coordText: '52°12′N, 0°07′E',
        eraKey: 'interwar',
        labelPos: [-15, -5],
        alignEnd: true,
        seaLeg: true,
        routeCurve: -0.18,
        focusMultiplier: 1.9,
        title: 'Crisis at the Cavendish Laboratory',
        prose: 'Assigned to experimental benchwork under Patrick Blackett at Cambridge’s famed Cavendish Laboratory, Oppenheimer proved clumsy with glassblowing and vacuum pumps and fell into deep despair. Encountering Niels Bohr and Paul Dirac revealed his true vocation—not experimental apparatus, but the mathematical architecture of the new quantum mechanics.',
        fact: 'During this bleak year, Oppenheimer read Marcel Proust and Fyodor Dostoevsky obsessively; his turn toward pure theory saved both his career and his peace of mind.',
        quote: {
          en: 'I am having a pretty bad time. The lab work is a terrible bore, and I am so bad at it that it is impossible to feel that I am learning anything.',
          orig: '',
          provenance: 'Letter to Francis Fergusson from Cambridge, November 1925'
        }
      },
      {
        number: 3,
        roman: 'III',
        id: 'gottingen',
        year: '1927',
        age: 'Age 23',
        date: '1926 – 1927',
        location: 'Göttingen, Germany',
        shortPlace: 'Göttingen',
        coords: [9.9355, 51.5328],
        coordText: '51°32′N, 9°56′E',
        eraKey: 'interwar',
        labelPos: [15, 5],
        routeCurve: -0.12,
        focusMultiplier: 1.9,
        title: 'Quantum Revolution at Göttingen',
        prose: 'Invited to Germany by Max Born, Oppenheimer flourished at Göttingen—the epicenter of 1920s theoretical physics—earning his doctorate at twenty-three. Together with Born, he published the landmark Born–Oppenheimer approximation for separating nuclear and electronic motion in molecules, still a cornerstone of quantum chemistry a century later.',
        fact: 'After his oral doctoral examination, Nobel laureate James Franck remarked dryly: “I’m glad that’s over. He was on the point of questioning me.”',
        quote: {
          en: 'Both the man of science and the man of art live always at the edge of mystery, surrounded by it.',
          orig: '',
          provenance: '“Prospects in the Arts and Sciences,” Columbia University bicentennial, 1954'
        }
      },
      {
        number: 4,
        roman: 'IV',
        id: 'berkeley',
        year: '1939',
        age: 'Age 35',
        date: '1929 – 1942',
        location: 'Berkeley, California',
        shortPlace: 'Berkeley',
        coords: [-122.273, 37.8715],
        coordText: '37°52′N, 122°16′W',
        eraKey: 'interwar',
        labelPos: [15, 5],
        routeCurve: -0.22,
        focusMultiplier: 1.8,
        title: 'Black Holes & the American School of Physics',
        prose: 'Splitting his year between UC Berkeley and Caltech, Oppenheimer built the first world-class American school of theoretical physics, inspiring devoted graduate students who imitated even his walk and porkpie hat. In 1939, with Hartland Snyder, he published the first rigorous prediction of gravitational collapse into what we now call black holes—the very day World War II began in Europe.',
        fact: 'At Berkeley, Oppenheimer studied Sanskrit with Arthur Ryder every Thursday evening, reading the Bhagavad Gita in the original and calling it “the most beautiful philosophical song existing in any known tongue.”',
        quote: {
          en: 'When all thermonuclear sources of energy are exhausted a sufficiently heavy star will collapse… cutting itself off from any communication with a distant observer.',
          orig: '',
          provenance: 'J. R. Oppenheimer & H. Snyder, Physical Review, 1 September 1939'
        }
      },
      {
        number: 5,
        roman: 'V',
        id: 'losalamos',
        year: '1945',
        age: 'Age 41',
        date: '1943 – 16 July 1945',
        location: 'Los Alamos & Trinity, New Mexico',
        shortPlace: 'Los Alamos',
        coords: [-106.3031, 35.88],
        coordText: '35°53′N, 106°18′W',
        eraKey: 'ww2',
        labelPos: [15, -4],
        routeCurve: 0.16,
        focusMultiplier: 1.9,
        title: 'Los Alamos & the Dawn of the Atomic Age',
        prose: 'Chosen by General Leslie Groves to direct the secret Manhattan Project laboratory on a remote New Mexico mesa he had loved since boyhood, Oppenheimer united Nobel laureates and thousands of scientists in a race against Nazi Germany. At 5:29 a.m. on July 16, 1945, the Trinity plutonium device detonated in the Jornada del Muerto desert—changing human history permanently.',
        fact: 'Weeks after the bombings of Hiroshima and Nagasaki, Oppenheimer told President Harry Truman in the Oval Office, “Mr. President, I feel I have blood on my hands”—provoking Truman to vow never to see him again.',
        quote: {
          en: 'We knew the world would not be the same. A few people laughed, a few people cried. Most people were silent. I remembered the line from the Hindu scripture, the Bhagavad-Gita… “Now I am become Death, the destroyer of worlds.”',
          orig: '',
          provenance: 'NBC television interview, 1965 (recalling the Trinity test of 16 July 1945)'
        },
        subTabsLabel: 'Manhattan Project:',
        subStages: [
          {
            label: '1943 · The Mesa',
            year: '1943',
            age: 'Age 38',
            date: 'Spring 1943',
            title: 'Building the Secret City',
            prose: 'On the Pajarito Plateau where he had once ridden horseback as a frail teenager, Oppenheimer helped select the Los Alamos Ranch School for Site Y. Overcoming military compartmentalization, he insisted scientists hold weekly open colloquia so breakthroughs in implosion and neutron physics could move at wartime speed.',
            fact: 'All mail to the 6,000 scientists and families living at Los Alamos went simply to “P.O. Box 1663, Santa Fe, New Mexico”—the town itself did not appear on any public map.',
            quote: {
              en: 'My two great loves are physics and New Mexico. It’s a pity they can’t be combined.',
              orig: '',
              provenance: 'Remark to colleagues years before selecting Los Alamos'
            }
          },
          {
            label: '1945 · Trinity Test',
            isDefault: true
          }
        ]
      },
      {
        number: 6,
        roman: 'VI',
        id: 'washington',
        year: '1954',
        age: 'Age 50',
        date: 'April – June 1954',
        location: 'Washington, D.C.',
        shortPlace: 'Washington',
        coords: [-77.0369, 38.9072],
        coordText: '38°54′N, 77°02′W',
        eraKey: 'coldwar',
        labelPos: [-15, 11],
        alignEnd: true,
        routeCurve: 0.16,
        focusMultiplier: 1.9,
        title: 'The Security Hearing & Exile from Power',
        prose: 'After the war, Oppenheimer chaired the Atomic Energy Commission’s General Advisory Committee and argued urgently for international arms control while opposing the thermonuclear “Super” (hydrogen bomb). At the height of McCarthyism in 1954, a closed AEC hearing stripped him of his security clearance—ending his voice in American nuclear policy.',
        fact: 'In December 2022—sixty-eight years later—the U.S. Department of Energy formally vacated the 1954 ruling, declaring the proceeding “flawed” and affirming Oppenheimer’s loyalty.',
        quote: {
          en: 'In some sort of crude sense which no vulgarity, no humor, no overstatement can quite extinguish, the physicists have known sin; and this is a knowledge which they cannot lose.',
          orig: '',
          provenance: 'Arthur D. Little Memorial Lecture at MIT, 25 November 1947'
        }
      },
      {
        number: 7,
        roman: 'VII',
        id: 'stjohn',
        year: '1967',
        age: 'Age 62',
        date: '1947 – 18 February 1967',
        location: 'Princeton & St. John, Virgin Islands',
        shortPlace: 'St. John / IAS',
        coords: [-64.75, 18.34],
        coordText: '18°20′N, 64°45′W',
        eraKey: 'coldwar',
        labelPos: [15, 5],
        seaLeg: true,
        routeCurve: 0.18,
        focusMultiplier: 1.8,
        title: 'Quiet Years & Ashes on the Sea',
        prose: 'Directing the Institute for Advanced Study in Princeton alongside Albert Einstein, Kurt Gödel, and Freeman Dyson for nearly two decades, Oppenheimer found solace each summer sailing a small sloop off Hawksnest Bay on St. John. Receiving the Enrico Fermi Award from President Lyndon Johnson in 1963 as a gesture of rehabilitation, he died of throat cancer in Princeton in February 1967.',
        fact: 'Following his death, his wife Kitty carried his urn back to St. John and scattered his ashes into the turquoise cove now known as Oppenheimer Beach.',
        quote: {
          en: 'I think it is just possible, Mr. President, that it has taken some charity and some courage for you to make this award today.',
          orig: '',
          provenance: 'Accepting the Enrico Fermi Award from President Lyndon B. Johnson, 2 December 1963'
        }
      }
    ]
  };
})(window);
