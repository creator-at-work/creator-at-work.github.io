/* ==========================================================================
   RAJA RAJA CHOLA I (c. 947–1014 CE) — Historical Life Atlas
   Sources: Thanjavur Brihadisvara Temple Inscriptions, Britannica
   ========================================================================== */

(function (global) {
  'use strict';

  global.ATLAS_FIGURES = global.ATLAS_FIGURES || {};

  global.ATLAS_FIGURES.rajaraja = {
    id: 'rajaraja',
    era: 'Medieval & Renaissance',
    title: 'Rajaraja Chola I',
    fullName: 'Rajaraja Chola I (Arulmozhi Varman)',
    years: 'c. 947 — 1014',
    subtitle: 'Thanjavur to the Indian Ocean',
    worldLabel: 'World of 1010',
    worldEraLabel: 'World · c. 1010 CE',
    originName: 'Thanjavur',
    originCoords: [79.1378, 10.787],

    viewBounds: {
      lon: [69.0, 88.0],
      lat: [2.0, 19.5]
    },

    waterLabels: [
      { name: 'ARABIAN SEA', coords: [71.5, 13.0], regionalOnly: true },
      { name: 'BAY OF BENGAL', coords: [85.0, 12.0], regionalOnly: true },
      { name: 'INDIAN OCEAN', coords: [77.0, 2.5], regionalOnly: true },
      { name: 'ATLANTIC OCEAN', coords: [-28, -4], worldOnly: true },
      { name: 'INDIAN OCEAN', coords: [78, -22], worldOnly: true },
      { name: 'PACIFIC OCEAN', coords: [-130, -8], worldOnly: true }
    ],

    defaultEraKey: 'peak1014',
    territorySets: {
      heartland985: {
        empireLabel: 'Chola Kingdom (985 CE)',
        empire: ['India'],
        dependent: [],
        ally: [],
        rival: ['Sri Lanka']
      },
      peak1014: {
        empireLabel: 'Chola Empire & Maritime Orbit (1014 CE)',
        empire: ['India', 'Sri Lanka'],
        dependent: ['Maldives'],
        ally: ['Indonesia', 'Malaysia'],
        rival: []
      }
    },

    worldRealms: [
      { id: 'song', name: 'Northern Song Dynasty', desc: 'Golden age of Chinese science, printing, compass navigation, and maritime trade with the Chola ports of Nagapattinam.', cssVar: '--realm-qing', countries: ['China'], label: 'SONG DYNASTY', labelCoords: [110.0, 32.5] },
      { id: 'srivijaya', name: 'Srivijaya Maritime Kingdom', desc: 'Buddhist thalassocracy controlling the Strait of Malacca; endowed a Buddhist vihara at Nagapattinam with Raja Raja’s royal grant.', cssVar: '--realm-maratha', countries: ['Indonesia', 'Malaysia'], label: 'SRIVIJAYA', labelCoords: [103.5, -1.5] },
      { id: 'ghaznavid', name: 'Ghaznavid Empire', desc: 'Turkic dynasty under Mahmud of Ghazni ruling Afghanistan and eastern Persia.', cssVar: '--realm-persia', countries: ['Afghanistan', 'Iran', 'Pakistan'], label: 'GHAZNAVIDS', labelCoords: [63.0, 33.0] },
      { id: 'fatimid', name: 'Fatimid Caliphate', desc: 'Mediterranean and Red Sea caliphate centered in Cairo, linked directly to South Indian spice trade.', cssVar: '--realm-ottoman', countries: ['Egypt', 'Libya', 'Tunisia', 'Syria', 'Israel', 'Palestine'], label: 'FATIMID CALIPHATE', labelCoords: [28.0, 27.5] },
      { id: 'byzantine', name: 'Byzantine Empire', desc: 'Eastern Roman Empire at its medieval military height under Emperor Basil II.', cssVar: '--terr-rival', countries: ['Turkey', 'Greece', 'Bulgaria'], label: 'BYZANTINE EMPIRE', labelCoords: [32.0, 39.5] },
      { id: 'hre', name: 'Holy Roman Empire', desc: 'Ottonian Europe across Germany and northern Italy.', cssVar: '--realm-us', countries: ['Germany', 'Austria', 'Italy'], label: 'HOLY ROMAN EMPIRE', labelCoords: [11.5, 49.5] }
    ],

    historicalNames: {
      India: 'Chola Empire (South) & Chalukya / Pala Realms',
      'Sri Lanka': 'Mummudi Cholamandalam (Ilam)',
      Indonesia: 'Srivijaya Kingdom',
      Egypt: 'Fatimid Caliphate',
      China: 'Northern Song Dynasty'
    },

    worldPlaces: [
      { name: 'Kaifeng', year: '1010', detail: 'Bustling million-person capital of the Northern Song Dynasty; Chola trade missions reached China by sea.', coords: [114.307, 34.797] },
      { name: 'Palembang', year: '1006', detail: 'Capital of Srivijaya; its king Maravijayottungavarman built the Chudamani Vihara at Nagapattinam with Raja Raja’s patronage.', coords: [104.7458, -2.9761] },
      { name: 'Cairo', year: '1010', detail: 'Fatimid seat receiving pepper, textiles, and gemstones from Chola-controlled Indian Ocean ports.', coords: [31.2357, 30.0444] },
      { name: 'Constantinople', year: '1010', detail: 'Imperial capital of Basil II and the wealthiest city in medieval Christendom.', coords: [28.9784, 41.0082] }
    ],

    sources: [
      { label: 'Britannica', url: 'https://www.britannica.com/biography/Rajaraja-I' },
      { label: 'Thanjavur Inscriptions', url: 'https://whc.unesco.org/en/list/250/' }
    ],

    stages: [
      {
        number: 1,
        roman: 'I',
        id: 'thanjavur',
        year: '985',
        age: 'c. Age 38',
        date: 'July 985 – 1010 CE',
        location: 'Thanjavur, Kaveri Delta',
        shortPlace: 'Thanjavur',
        coords: [79.1318, 10.7828],
        coordText: '10°47′N, 79°08′E',
        eraKey: 'heartland985',
        labelPos: [15, -4],
        routeCurve: 0,
        focusMultiplier: 1.45,
        title: 'Ascension & the Great Temple of Thanjavur',
        prose: 'Born Prince Arulmozhi Varman in the fertile Kaveri delta, he patiently deferred his claim to the throne for sixteen years out of respect for his uncle Uttama Chola. Ascending in 985 CE as Rajaraja (“King of Kings”), he overhauled land revenue surveys, centralized provincial administration, built South Asia’s first standing blue-water navy, and crowned his capital in 1010 CE with the monumental granite Brihadisvara Temple.',
        fact: 'Rajaraja was the first Tamil monarch to preface his stone inscriptions with a standardized poetic royal chronicle (Meykkirtti), allowing historians to date his campaigns year by year.',
        quote: {
          en: 'While the goddess of fortune grew in radiance and the great goddess of the earth became his queen, he ordered his deeds engraved in stone.',
          orig: '',
          provenance: 'Opening Meykkirtti preamble of Raja Raja Chola I’s royal inscriptions'
        },
        subTabsLabel: 'Thanjavur chapters:',
        subStages: [
          {
            label: '985 · Ascension',
            year: '985',
            age: 'c. Age 38',
            date: 'July 985 CE',
            eraKey: 'heartland985',
            title: 'Ascension of Arulmozhi Varman',
            prose: 'Born Prince Arulmozhi Varman in the fertile Kaveri delta, he patiently deferred his claim to the throne for sixteen years out of respect for his uncle Uttama Chola. Ascending in 985 CE as Rajaraja (“King of Kings”), he overhauled land revenue surveys, centralized provincial administration, and built South Asia’s first standing blue-water navy.',
            fact: 'Rajaraja was the first Tamil monarch to preface his stone inscriptions with a standardized poetic royal chronicle (Meykkirtti), allowing historians to date his campaigns year by year.',
            quote: {
              en: 'While the goddess of fortune grew in radiance and the great goddess of the earth became his queen, he ordered his deeds engraved in stone.',
              orig: '',
              provenance: 'Opening Meykkirtti preamble of Raja Raja Chola I’s royal inscriptions'
            }
          },
          {
            label: '1010 · Brihadisvara Temple',
            year: '1010',
            age: 'c. Age 63',
            date: '1010 CE',
            eraKey: 'peak1014',
            title: 'Consecration of the Great Temple',
            prose: 'In 1010 CE, Raja Raja consecrated the towering Rajarajeshvaram (Brihadisvara Temple) in Thanjavur—a 66-meter granite vimana built without mortar and crowned by an immense carved stone cupola. Functioning as bank, treasury, archive, and artistic center, its walls preserve meticulous Tamil inscriptions recording every gift of gold, land, dancer, and musician.',
            fact: 'More than 130,000 tons of granite had to be quarried over 60 kilometers away and hauled to Thanjavur, since no granite outcrops exist anywhere in the surrounding Kaveri delta.',
            quote: {
              en: 'On the twentieth day of the twenty-sixth year of his reign, Rajarajadeva commanded that the gifts made by himself, his elder sister Kundavai, his queens, and all donors be engraved upon the stone walls of the temple.',
              orig: '',
              provenance: 'North Wall Foundation Inscription, Brihadisvara Temple, Thanjavur (1010 CE)'
            }
          }
        ]
      },
      {
        number: 2,
        roman: 'II',
        id: 'kandalur',
        year: '988',
        age: 'c. Age 41',
        date: 'c. 988 CE',
        location: 'Kandalur Salai (Thiruvananthapuram)',
        shortPlace: 'Kandalur',
        coords: [76.9366, 8.5241],
        coordText: '8°31′N, 76°56′E',
        eraKey: 'heartland985',
        labelPos: [-15, 4],
        alignEnd: true,
        routeCurve: 0.16,
        focusMultiplier: 1.45,
        title: 'Naval Victory on the Malabar Coast',
        prose: 'To break the Pandya–Chera–Sinhala alliance threatening the Chola heartland, Raja Raja launched his first major campaign westward across the Western Ghats. Destroying the Chera naval fleet stationed at Kandalur Salai, he secured the lucrative Malabar pepper ports and established Chola maritime dominance on India’s western seaboard.',
        fact: 'So proud was he of this opening triumph that “Kandalur Salai kalam aruttaruliya” (“who destroyed the ships at Kandalur Salai”) became the permanent title opening nearly every subsequent inscription of his reign.',
        quote: {
          en: 'He graciously destroyed the ships at Kandalur Salai and brought the western coast under his royal umbrella.',
          orig: '',
          provenance: 'Chola stone inscriptions, regnal year 4 onward'
        }
      },
      {
        number: 3,
        roman: 'III',
        id: 'anuradhapura',
        year: '993',
        age: 'c. Age 46',
        date: 'c. 993 CE',
        location: 'Anuradhapura & Polonnaruwa, Sri Lanka',
        shortPlace: 'Polonnaruwa',
        coords: [81.0014, 7.9403],
        coordText: '7°56′N, 81°00′E',
        eraKey: 'peak1014',
        labelPos: [15, 5],
        routeCurve: 0.18,
        focusMultiplier: 1.45,
        title: 'Across the Palk Strait into Ilam',
        prose: 'Launching an amphibious expedition across the Palk Strait against King Mahinda V, Chola armies captured northern Sri Lanka—sacking the ancient capital of Anuradhapura and establishing a new fortified Chola provincial capital at Polonnaruwa (Jananathamangalam). The island became the Chola province of Mummudi Cholamandalam, anchoring control over Indian Ocean sea lanes.',
        fact: 'The Shiva Devale No. 2 erected at Polonnaruwa during Chola rule remains the oldest surviving stone monument standing intact in the city today.',
        quote: {
          en: 'He conquered Ilamandalam of the fierce Singalas, extending his single wheel of authority across the southern sea.',
          orig: '',
          provenance: 'Thanjavur Royal Prasasti Inscriptions'
        }
      },
      {
        number: 4,
        roman: 'IV',
        id: 'talakad',
        year: '999',
        age: 'c. Age 52',
        date: 'c. 999 – 1002 CE',
        location: 'Talakad & Gangavadi, Karnataka',
        shortPlace: 'Gangavadi',
        coords: [77.029, 12.194],
        coordText: '12°12′N, 77°02′E',
        eraKey: 'peak1014',
        labelPos: [-15, -4],
        alignEnd: true,
        routeCurve: -0.16,
        focusMultiplier: 1.4,
        title: 'Push to the Tungabhadra',
        prose: 'Turning north onto the Deccan plateau, Raja Raja overran Gangavadi, Nolambavadi, and Tadigaipadi—ending centuries of Western Ganga rule and clashing directly with the Western Chalukya emperor Satyashraya. Securing the Mysore highlands pushed the Chola frontier all the way to the Tungabhadra River.',
        fact: 'In 1000 CE, Raja Raja ordered a comprehensive kingdom-wide land survey measuring plots down to microscopic fractions of an acre to make taxation fair, transparent, and auditable.',
        quote: {
          en: 'He seized Tadigaipadi, Vengainadu, Gangapadi, and Nolambapadi, his fame rising across the eight directions.',
          orig: '',
          provenance: 'Thanjavur Meykkirtti Inscription'
        }
      },
      {
        number: 5,
        roman: 'V',
        id: 'vengi',
        year: '1003',
        age: 'c. Age 56',
        date: 'c. 1003 CE',
        location: 'Vengi, Andhra Coast',
        shortPlace: 'Vengi',
        coords: [81.1, 16.81],
        coordText: '16°49′N, 81°06′E',
        eraKey: 'peak1014',
        labelPos: [15, 4],
        routeCurve: -0.15,
        focusMultiplier: 1.35,
        title: 'Dynastic Alliance on the Eastern Seaboard',
        prose: 'Intervening in a succession crisis among the Eastern Chalukyas of Vengi, Raja Raja restored Shaktivarman I to the throne and sealed a lasting dynastic alliance by marrying his daughter Kundavai to Prince Vimaladitya. This brought the entire Coromandel and Andhra coastline—vital ports for trade with Southeast Asia and Song China—into the Chola orbit.',
        fact: 'From that union sprang Kulottunga I, who later united both the Chola and Eastern Chalukya crowns and presided over another half-century of imperial prosperity.',
        quote: {
          en: 'Having granted the village of Anaimangalam for the upkeep of the Buddhist Chudamani Vihara built by the king of Srivijaya at Nagapattinam.',
          orig: '',
          provenance: 'Larger Leiden Copper-Plate Grant of Raja Raja Chola I (1006 CE)'
        }
      },
      {
        number: 6,
        roman: 'VI',
        id: 'maldives',
        year: '1014',
        age: 'c. Age 67',
        date: 'c. 1012 – 1014 CE',
        location: 'The Maldives (Munnir Pazhantivu)',
        shortPlace: 'Maldives',
        coords: [73.5093, 4.1755],
        coordText: '4°11′N, 73°31′E',
        eraKey: 'peak1014',
        labelPos: [15, 4],
        seaLeg: true,
        routeCurve: 0.2,
        focusMultiplier: 1.35,
        title: 'Twelve Thousand Islands of the Sea',
        prose: 'In the crowning maritime achievement of his final years, Raja Raja dispatched his ocean-going navy deep into the Indian Ocean to conquer the “twelve thousand ancient islands of the sea”—the Maldives. When he died in 1014 CE, he handed his son Rajendra I a maritime superpower poised to project Indian naval power all the way to Sumatra and the Malay Peninsula.',
        fact: 'His inscriptions explicitly list the Maldives as “Munnir Pazhantivu Pannirayiram”—demonstrating advanced Chola celestial navigation and monsoon-wind fleet logistics centuries before European caravels entered the Indian Ocean.',
        quote: {
          en: 'He subdued the twelve thousand ancient islands of the sea, bequeathing a realm unchallenged from the Tungabhadra to the southern ocean.',
          orig: '',
          provenance: 'Final Regnal Year 29 Inscription of Raja Raja Chola I (1014 CE)'
        }
      }
    ]
  };
})(window);
