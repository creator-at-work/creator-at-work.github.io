/* ==========================================================================
   SRINIVASA RAMANUJAN (1887–1920) — Historical Life Atlas
   Sources: Ramanujan's Letters to G. H. Hardy, Robert Kanigel, Britannica
   ========================================================================== */

(function (global) {
  'use strict';

  global.ATLAS_FIGURES = global.ATLAS_FIGURES || {};

  global.ATLAS_FIGURES.ramanujan = {
    id: 'ramanujan',
    era: 'Modern World',
    title: 'Srinivasa Ramanujan',
    fullName: 'Srinivasa Ramanujan FRS',
    years: '1887 — 1920',
    subtitle: 'Erode to Cambridge',
    worldLabel: 'World of 1914',
    worldEraLabel: 'World · 1887–1920',
    originName: 'Erode',
    originCoords: [77.7172, 11.341],

    viewBounds: {
      lon: [-8.0, 86.0],
      lat: [6.0, 56.5]
    },

    waterLabels: [
      { name: 'ARABIAN SEA', coords: [64.0, 15.5], regionalOnly: true },
      { name: 'MEDITERRANEAN SEA', coords: [17.5, 35.0], regionalOnly: true },
      { name: 'ATLANTIC OCEAN', coords: [-28, -4], worldOnly: true },
      { name: 'INDIAN OCEAN', coords: [78, -22], worldOnly: true },
      { name: 'PACIFIC OCEAN', coords: [-130, -8], worldOnly: true }
    ],

    defaultEraKey: 'world1914',
    territorySets: {
      world1914: {
        empireLabel: 'British India & United Kingdom',
        dependentLabel: 'Suez Maritime Corridor',
        empire: ['India', 'United Kingdom'],
        dependent: ['Egypt', 'France'],
        ally: [],
        rival: ['Germany', 'Austria']
      }
    },

    worldRealms: [
      { id: 'british', name: 'British Empire', desc: 'At its territorial zenith on the eve of the First World War, spanning Britain, India, Canada, Australia, and Egypt.', cssVar: '--terr-rival', countries: ['United Kingdom', 'India', 'Pakistan', 'Bangladesh', 'Myanmar', 'Australia', 'Canada', 'South Africa', 'Egypt'], label: 'BRITISH EMPIRE', labelCoords: [26.0, -24.0] },
      { id: 'china', name: 'Republic of China', desc: 'Established in 1912 after the fall of the Qing Dynasty.', cssVar: '--realm-qing', countries: ['China'], label: 'REPUBLIC OF CHINA', labelCoords: [104.0, 35.5] },
      { id: 'ottoman', name: 'Ottoman Empire', desc: 'Final decade of the Ottoman Empire during World War I (1914–1918).', cssVar: '--realm-ottoman', countries: ['Turkey', 'Iraq', 'Syria'], label: 'OTTOMAN EMPIRE', labelCoords: [36.0, 38.0] },
      { id: 'us', name: 'United States', desc: 'Emerging industrial superpower entering World War I in 1917.', cssVar: '--realm-us', countries: ['United States of America'], label: 'UNITED STATES', labelCoords: [-100.0, 39.0] },
      { id: 'russia', name: 'Russian Empire / Revolution', desc: 'Entered WWI in 1914 before the 1917 Russian Revolution.', cssVar: '--realm-persia', countries: ['Russia'], label: 'RUSSIA', labelCoords: [86.0, 61.0] }
    ],

    historicalNames: {
      India: 'British India (Madras Presidency)',
      'United Kingdom': 'United Kingdom of Great Britain & Ireland',
      Egypt: 'British Protectorate of Egypt (Suez Canal)',
      France: 'French Third Republic (World War I)'
    },

    worldPlaces: [
      { name: 'Göttingen', year: '1914', detail: 'Center of German mathematics under David Hilbert as Europe slid into war.', coords: [9.9355, 51.5328] },
      { name: 'Princeton', year: '1914', detail: 'Growing center of American mathematics and physics.', coords: [-74.6672, 40.3573] },
      { name: 'Calcutta', year: '1913', detail: 'Home of the Indian Mathematical Society journal where Ramanujan published his first paper in 1911.', coords: [88.3639, 22.5726] }
    ],

    sources: [
      { label: 'Britannica', url: 'https://www.britannica.com/biography/Srinivasa-Ramanujan' },
      { label: 'Trinity College Cambridge', url: 'https://www.trin.cam.ac.uk/' }
    ],

    stages: [
      {
        number: 1,
        roman: 'I',
        id: 'erode',
        year: '1887',
        age: 'Birth',
        date: '22 December 1887',
        location: 'Erode & Kumbakonam, Tamil Nadu',
        shortPlace: 'Kumbakonam',
        coords: [78.6, 11.1],
        coordText: '11°20′N, 77°43′E',
        eraKey: 'world1914',
        labelPos: [-15, 8],
        alignEnd: true,
        routeCurve: 0,
        focusMultiplier: 2.2,
        title: 'The Self-Taught Prodigy of the Kaveri',
        prose: 'Born in Erode and raised in the temple town of Kumbakonam, Ramanujan borrowed G. S. Carr’s dry reference book A Synopsis of Elementary Results in Pure Mathematics at sixteen—a bare list of 5,000 formulas without proofs. Working on a slate to save paper, he rediscovered a century of European mathematics independently and began filling his famed notebooks with wholly original identities.',
        fact: 'So total was his absorption in pure mathematics that he repeatedly failed his non-mathematical college exams in English and physiology, losing his scholarship and enduring years of near-poverty.',
        quote: {
          en: 'An equation for me has no meaning unless it expresses a thought of God.',
          orig: '',
          provenance: 'Recalled by S. R. Ranganathan in Ramanujan: The Man and the Mathematician'
        }
      },
      {
        number: 2,
        roman: 'II',
        id: 'madras',
        year: '1913',
        age: 'Age 25',
        date: '16 January 1913',
        location: 'Madras (Chennai), India',
        shortPlace: 'Madras',
        coords: [80.2707, 13.0827],
        coordText: '13°05′N, 80°16′E',
        eraKey: 'world1914',
        labelPos: [15, -4],
        routeCurve: 0.14,
        focusMultiplier: 2.2,
        title: 'The Letter to G. H. Hardy',
        prose: 'Working as an accounting clerk at the Madras Port Trust for £20 a year, Ramanujan mailed nine pages of startling, unproved theorems to Cambridge mathematician G. H. Hardy on January 16, 1913. Initially suspecting a crank, Hardy and J. E. Littlewood studied the pages until midnight—concluding they could only have been written by a mathematician of the highest class.',
        fact: 'Two earlier Cambridge professors had already returned Ramanujan’s letters unread; Hardy later called his discovery of Ramanujan “the one romantic incident in my life.”',
        quote: {
          en: 'I beg to introduce myself to you as a clerk in the Accounts Department of the Port Trust Office at Madras on a salary of only £20 per annum. I have had no university education, but I have struck out a new path for myself.',
          orig: '',
          provenance: 'Letter to G. H. Hardy from Madras, 16 January 1913'
        },
        subTabsLabel: 'Madras chapters:',
        subStages: [
          {
            label: '1913 · Letter to Hardy',
            year: '1913',
            age: 'Age 25',
            date: '16 January 1913',
            title: 'The Letter to G. H. Hardy',
            prose: 'Working as an accounting clerk at the Madras Port Trust for £20 a year, Ramanujan mailed nine pages of startling, unproved theorems to Cambridge mathematician G. H. Hardy on January 16, 1913. Initially suspecting a crank, Hardy and J. E. Littlewood studied the pages until midnight—concluding they could only have been written by a mathematician of the highest class.',
            fact: 'Two earlier Cambridge professors had already returned Ramanujan’s letters unread; Hardy later called his discovery of Ramanujan “the one romantic incident in my life.”',
            quote: {
              en: 'I beg to introduce myself to you as a clerk in the Accounts Department of the Port Trust Office at Madras on a salary of only £20 per annum. I have had no university education, but I have struck out a new path for myself.',
              orig: '',
              provenance: 'Letter to G. H. Hardy from Madras, 16 January 1913'
            }
          },
          {
            label: '1920 · Chetput & Lost Notebook',
            year: '1920',
            age: 'Age 32',
            date: '26 April 1920',
            title: 'The Lost Notebook & Immortal Legacy',
            prose: 'Returning to Madras in failing health, Ramanujan worked tirelessly through his final year—introducing “mock theta functions” in a deathbed letter to Hardy—before dying in Chetput on April 26, 1920, aged just thirty-two. Half a century later, in 1976, mathematician George Andrews uncovered a forgotten bundle of 138 loose pages from that final year in Trinity College Library—his “Lost Notebook,” whose formulas today illuminate string theory and black hole entropy.',
            fact: 'Modern computers still use Ramanujan’s rapidly converging 1914 infinite series to compute trillions of digits of π—each single term adds roughly eight new decimal digits of accuracy.',
            quote: {
              en: 'I am extremely sorry for not writing you a single letter up to now… I discovered very interesting functions recently which I call “Mock” θ-functions.',
              orig: '',
              provenance: 'Final mathematical letter to G. H. Hardy from Madras, 12 January 1920'
            }
          }
        ]
      },
      {
        number: 3,
        roman: 'III',
        id: 'suez',
        year: '1914',
        age: 'Age 26',
        date: '17 March – 14 April 1914',
        location: 'Suez & Mediterranean Voyage',
        shortPlace: 'Suez Crossing',
        coords: [32.3, 31.2],
        coordText: '31°12′N, 32°18′E',
        eraKey: 'world1914',
        labelPos: [-15, 6],
        alignEnd: true,
        seaLeg: true,
        routeCurve: 0.16,
        focusMultiplier: 1.6,
        title: 'Across the Sea to England',
        prose: 'Overcoming deep orthodox reservations against crossing the ocean—after his mother reportedly experienced a dream granting permission at the Namakkal temple—Ramanujan boarded the SS Nevasa in Madras on March 17, 1914. Sailing through the Arabian Sea, Suez Canal, and Mediterranean, he arrived in England just four months before the outbreak of the First World War.',
        fact: 'A strict vegetarian, Ramanujan cooked his own meals in his Trinity College rooms throughout the freezing English winters, a struggle severely worsened by wartime food rationing.',
        quote: {
          en: 'They must be true, because, if they were not true, no one would have had the imagination to invent them.',
          orig: '',
          provenance: 'G. H. Hardy, recalling his reaction to Ramanujan’s theorems'
        }
      },
      {
        number: 4,
        roman: 'IV',
        id: 'cambridge',
        year: '1918',
        age: 'Age 30',
        date: 'April 1914 – February 1919',
        location: 'Trinity College, Cambridge',
        shortPlace: 'Cambridge',
        coords: [0.117, 52.207],
        coordText: '52°12′N, 0°07′E',
        eraKey: 'world1914',
        labelPos: [15, -4],
        routeCurve: -0.16,
        focusMultiplier: 1.9,
        title: 'Partitions, Modular Forms & Royal Society',
        prose: 'Collaborating with Hardy in Cambridge, Ramanujan published over twenty groundbreaking papers on integer partitions, highly composite numbers, elliptic functions, and modular forms—revolutionizing analytic number theory. In 1918, at thirty, he became one of the youngest Fellows of the Royal Society and the first Indian elected a Fellow of Trinity College.',
        fact: 'Visiting the gravely ill Ramanujan in a Putney nursing home, Hardy remarked that his taxi number 1729 seemed dull. Ramanujan replied instantly: “No, Hardy! It is a very interesting number; it is the smallest number expressible as the sum of two cubes in two different ways” (1³ + 12³ and 9³ + 10³).',
        quote: {
          en: 'No, it is a very interesting number; it is the smallest number expressible as the sum of two cubes in two different ways.',
          orig: '',
          provenance: 'Recorded by G. H. Hardy in Ramanujan: Twelve Lectures (1940)'
        }
      },
      {
        number: 5,
        roman: 'V',
        id: 'bombay',
        year: '1919',
        age: 'Age 31',
        date: '27 March 1919',
        location: 'Bombay (Mumbai), India',
        shortPlace: 'Bombay',
        coords: [72.8777, 19.076],
        coordText: '19°05′N, 72°53′E',
        eraKey: 'world1914',
        labelPos: [-15, 4],
        alignEnd: true,
        seaLeg: true,
        routeCurve: 0.2,
        focusMultiplier: 1.9,
        title: 'Homecoming in Failing Health',
        prose: 'Weakened by severe undiagnosed hepatic amoebiasis and years of wartime privation in England, Ramanujan sailed home aboard the SS Nagoya, stepping ashore at Bombay on March 27, 1919. Greeted as an intellectual hero across India, he refused rest and spent his final months back in Madras producing mathematics of astonishing depth.',
        fact: 'Even on his deathbed in January 1920, he sent Hardy a final letter introducing an entirely new class of objects—mock theta functions—whose full theoretical meaning took mathematicians over eighty years to unravel.',
        quote: {
          en: 'Paul Erdős passed on to us Hardy’s personal ratings of mathematicians on a scale of 0 to 100: Hardy gave himself 25, Littlewood 30, Hilbert 80, and Ramanujan 100.',
          orig: '',
          provenance: 'Bruce C. Berndt & Robert Rankin, Ramanujan: Essays and Surveys'
        }
      }
    ]
  };
})(window);
