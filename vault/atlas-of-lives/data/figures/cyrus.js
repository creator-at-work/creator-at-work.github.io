/* ==========================================================================
   CYRUS THE GREAT (c. 600–530 BCE) — Historical Life Atlas
   Sources: The Cyrus Cylinder (British Museum), Herodotus (Histories),
            Nabonidus Chronicle, Encyclopaedia Iranica & Britannica
   ========================================================================== */

(function (global) {
  'use strict';

  global.ATLAS_FIGURES = global.ATLAS_FIGURES || {};

  global.ATLAS_FIGURES.cyrus = {
    id: 'cyrus',
    era: 'Antiquity',
    title: 'Cyrus the Great',
    fullName: 'Cyrus II of Persia',
    years: 'c. 600 — 530 BCE',
    subtitle: 'Anshan to Pasargadae',
    worldLabel: 'World of 539 BCE',
    worldEraLabel: 'Ancient Near East · 6th Century BCE',
    originName: 'Anshan',
    originCoords: [52.409, 30.011],

    viewBounds: {
      lon: [24.0, 71.0],
      lat: [24.0, 44.5]
    },

    waterLabels: [
      { name: 'PERSIAN GULF', coords: [51.5, 26.8], regionalOnly: true },
      { name: 'CASPIAN SEA', coords: [50.8, 40.5], regionalOnly: true },
      { name: 'MEDITERRANEAN SEA', coords: [27.0, 34.0], regionalOnly: true },
      { name: 'ATLANTIC OCEAN', coords: [-28, -4], worldOnly: true },
      { name: 'INDIAN OCEAN', coords: [78, -22], worldOnly: true },
      { name: 'PACIFIC OCEAN', coords: [-130, -8], worldOnly: true }
    ],

    defaultEraKey: 'achaemenid539',
    territorySets: {
      anshan559: {
        empireLabel: 'Kingdom of Anshan (Persia)',
        rivalLabel: 'Median & Babylonian Empires',
        empire: ['Iran'],
        dependent: [],
        ally: [],
        rival: ['Iraq', 'Syria', 'Turkey']
      },
      lydia547: {
        empireLabel: 'Expanding Achaemenid Realm',
        rivalLabel: 'Neo-Babylonian Empire',
        empire: ['Iran', 'Turkey', 'Armenia', 'Azerbaijan', 'Georgia'],
        dependent: [],
        ally: [],
        rival: ['Iraq', 'Syria', 'Lebanon', 'Israel', 'Palestine', 'Jordan']
      },
      achaemenid539: {
        empireLabel: 'Achaemenid Persian Empire (539 BCE)',
        empire: ['Iran', 'Iraq', 'Syria', 'Lebanon', 'Israel', 'Palestine', 'Jordan', 'Turkey', 'Armenia', 'Azerbaijan', 'Georgia', 'Afghanistan', 'Turkmenistan', 'Uzbekistan', 'Tajikistan', 'Pakistan'],
        dependent: ['Cyprus'],
        ally: [],
        rival: ['Egypt', 'Greece']
      }
    },

    worldRealms: [
      { id: 'egypt', name: 'Saite Egypt (26th Dynasty)', desc: 'Wealthy independent kingdom of the Nile under Pharaoh Amasis II, soon conquered by Cyrus’s son Cambyses II in 525 BCE.', cssVar: '--terr-rival', countries: ['Egypt', 'Libya'], label: 'SAITE EGYPT', labelCoords: [28.0, 26.0] },
      { id: 'mahajanapada', name: 'Sixteen Mahajanapadas', desc: 'Great kingdoms and republics of northern India—including Magadha and Kosala—during the lifetime of the Buddha and Mahavira.', cssVar: '--realm-maratha', countries: ['India', 'Nepal', 'Bangladesh'], label: 'MAHAJANAPADAS', labelCoords: [80.0, 23.0] },
      { id: 'zhou', name: 'Spring & Autumn China (Zhou)', desc: 'Era of competing Chinese states and the birth of Confucius (551 BCE).', cssVar: '--realm-qing', countries: ['China'], label: 'ZHOU CHINA', labelCoords: [108.0, 34.5] },
      { id: 'greece', name: 'Archaic Greek City-States', desc: 'Athens under Peisistratus, Sparta in the Peloponnese, and Ionian cities along the Aegean coast.', cssVar: '--realm-ottoman', countries: ['Greece'], label: 'GREECE', labelCoords: [21.5, 38.5] },
      { id: 'carthage', name: 'Carthage', desc: 'Rising Phoenician maritime republic across North Africa and Sicily.', cssVar: '--realm-us', countries: ['Tunisia', 'Algeria'], label: 'CARTHAGE', labelCoords: [8.0, 34.0] }
    ],

    historicalNames: {
      Iran: 'Persia & Media (Parsa & Mada)',
      Iraq: 'Babylonia & Assyria',
      Turkey: 'Lydia, Phrygia & Ionia',
      Afghanistan: 'Bactria & Arachosia',
      Uzbekistan: 'Sogdiana',
      Egypt: 'Saite Kingdom of Egypt'
    },

    worldPlaces: [
      { name: 'Athens', year: '546 BCE', detail: 'Ruled by the tyrant Peisistratus; democracy lay four decades ahead.', coords: [23.7275, 37.9838] },
      { name: 'Jerusalem', year: '538 BCE', detail: 'Following Cyrus’s edict, exiled Judeans returned from Babylon to rebuild the Temple.', coords: [35.2137, 31.7683] },
      { name: 'Lumbini', year: 'c. 563 BCE', detail: 'Birthplace of Siddhartha Gautama (the Buddha) in the Himalayan foothills.', coords: [83.2757, 27.4698] },
      { name: 'Qufu', year: '551 BCE', detail: 'Birthplace of Confucius in the State of Lu during China’s Spring and Autumn period.', coords: [116.991, 35.596] }
    ],

    sources: [
      { label: 'British Museum · Cyrus Cylinder', url: 'https://www.britishmuseum.org/collection/object/W_1880-0617-1941' },
      { label: 'Britannica', url: 'https://www.britannica.com/biography/Cyrus-the-Great' }
    ],

    stages: [
      {
        number: 1,
        roman: 'I',
        id: 'anshan',
        year: '559 BCE',
        age: 'c. Age 40',
        date: '559 BCE',
        location: 'Anshan & Pasargadae, Parsa',
        shortPlace: 'Pasargadae',
        coords: [53.179, 30.194],
        coordText: '30°12′N, 53°11′E',
        eraKey: 'anshan559',
        labelPos: [15, 10],
        routeCurve: 0,
        focusMultiplier: 1.55,
        title: 'King of Anshan & Builder of Pasargadae',
        prose: 'Ascending the throne of Anshan in southwestern Iran around 559 BCE, Cyrus II inherited a modest Persian kingdom subordinate to the powerful Median Empire. Drawing together the Persian tribes, he forged a disciplined coalition that overturned the entire Near East within twenty years—and built his open paradise-garden capital of Pasargadae in these very highlands, where his gabled limestone tomb still stands.',
        fact: 'In his own surviving Babylonian inscription, Cyrus styled himself first and foremost by his ancestral highland title: “King of the city of Anshan,” rather than “King of Persia.”',
        quote: {
          en: 'I am Cyrus, king of the universe, the great king, the powerful king, king of Babylon, king of Sumer and Akkad, king of the four quarters of the world.',
          orig: '',
          provenance: 'The Cyrus Cylinder, lines 20–21 (c. 539 BCE, British Museum)'
        },
        subTabsLabel: 'Parsa heartland:',
        subStages: [
          {
            label: '559 BCE · King of Anshan',
            year: '559 BCE',
            age: 'c. Age 40',
            date: '559 BCE',
            eraKey: 'anshan559',
            title: 'King of a Highland Vassal Realm',
            prose: 'Ascending the throne of Anshan in southwestern Iran around 559 BCE, Cyrus II inherited a modest Persian kingdom subordinate to the powerful Median Empire. Drawing together the Persian tribes, he forged a disciplined coalition that would overturn the entire political order of the ancient Near East within twenty years.',
            fact: 'In his own surviving Babylonian inscription, Cyrus styled himself first and foremost by his ancestral highland title: “King of the city of Anshan,” rather than “King of Persia.”',
            quote: {
              en: 'I am Cyrus, king of the universe, the great king, the powerful king, king of Babylon, king of Sumer and Akkad, king of the four quarters of the world.',
              orig: '',
              provenance: 'The Cyrus Cylinder, lines 20–21 (c. 539 BCE, British Museum)'
            }
          },
          {
            label: '530 BCE · Tomb at Pasargadae',
            year: '530 BCE',
            age: 'c. Age 70',
            date: 'December 530 BCE',
            eraKey: 'achaemenid539',
            title: 'The Garden Capital & Limestone Tomb',
            prose: 'In the high plains of Parsa, Cyrus designed Pasargadae—not as a cramped walled citadel, but as an open royal park of stone pavilions watered by stone channels, the earliest known prototype of the Persian paradise garden (pairidaēza). After falling on the northeastern frontier in 530 BCE, his body was brought home and laid in a gabled white limestone tomb that still stands.',
            fact: 'Two centuries later, after burning Persepolis, Alexander the Great visited Cyrus’s looted tomb at Pasargadae in reverence and ordered its careful restoration.',
            quote: {
              en: 'O man, whoever you are and wherever you come from, for I know you will come, I am Cyrus who won the Persians their empire. Do not therefore begrudge me this bit of earth that covers my bones.',
              orig: '',
              provenance: 'Epitaph on Cyrus’s tomb at Pasargadae, recorded by Aristobulus in Arrian’s Anabasis (6.29.8)'
            }
          }
        ]
      },
      {
        number: 2,
        roman: 'II',
        id: 'ecbatana',
        year: '550 BCE',
        age: 'c. Age 50',
        date: '550 BCE',
        location: 'Ecbatana (Hamadan), Media',
        shortPlace: 'Ecbatana',
        coords: [48.515, 34.799],
        coordText: '34°48′N, 48°31′E',
        eraKey: 'anshan559',
        labelPos: [-15, -4],
        alignEnd: true,
        routeCurve: -0.18,
        focusMultiplier: 1.5,
        title: 'Uniting the Medes and Persians',
        prose: 'When Median King Astyages marched against his rebellious Persian vassal, mutinous Median troops defected and handed Astyages over to Cyrus. Entering the royal treasury city of Ecbatana without destroying it, Cyrus spared the deposed king and elevated Median nobles alongside Persians as commanders and governors.',
        fact: 'Rather than ruling as a conqueror who erased his predecessor’s institutions, Cyrus adopted Median court dress, administrative titles, and Ecbatana itself as his summer capital.',
        quote: {
          en: 'King Astyages mustered his army and marched against Cyrus, king of Anshan, for conquest. The army rebelled against Astyages and he was taken prisoner; they handed him over to Cyrus.',
          orig: '',
          provenance: 'The Nabonidus Chronicle (Babylonian cuneiform tablet, 6th century BCE)'
        }
      },
      {
        number: 3,
        roman: 'III',
        id: 'sardis',
        year: '547 BCE',
        age: 'c. Age 53',
        date: 'Autumn 547 BCE',
        location: 'Sardis, Kingdom of Lydia',
        shortPlace: 'Sardis',
        coords: [28.04, 38.488],
        coordText: '38°29′N, 28°02′E',
        eraKey: 'lydia547',
        labelPos: [-15, -4],
        alignEnd: true,
        routeCurve: 0.16,
        focusMultiplier: 1.45,
        title: 'The Fall of Croesus & Lydia',
        prose: 'When King Croesus of Lydia—famed across Greece for his gold—crossed the Halys River to test the rising Persian power, Cyrus struck back swiftly in mid-winter before Lydia’s allies could assemble. After fourteen days besieging the steep citadel of Sardis, Persian soldiers scaled an unguarded cliff face and absorbed all of Anatolia into the empire.',
        fact: 'At the Battle of Thymbra before Sardis, Cyrus reportedly placed baggage camels in his front line; the unfamiliar scent panicked the renowned Lydian cavalry horses and broke their charge.',
        quote: {
          en: 'If Croesus crosses the Halys, he will destroy a great empire.',
          orig: '',
          provenance: 'The Delphic Oracle’s famously ambiguous prophecy, recorded by Herodotus (Histories, I.53)'
        }
      },
      {
        number: 4,
        roman: 'IV',
        id: 'bactria',
        year: '543 BCE',
        age: 'c. Age 57',
        date: 'c. 545 – 540 BCE',
        location: 'Bactria & the Oxus Frontier',
        shortPlace: 'Bactria',
        coords: [66.897, 36.756],
        coordText: '36°45′N, 66°54′E',
        eraKey: 'achaemenid539',
        labelPos: [15, -4],
        routeCurve: -0.18,
        focusMultiplier: 1.45,
        title: 'Securing Central Asia & the East',
        prose: 'Turning eastward across the Iranian plateau, Cyrus brought Parthia, Aria, Margiana, Bactria, Sogdiana, and Gandhara under Achaemenid authority—establishing the fortress city of Cyropolis on the Jaxartes (Syr Darya) to anchor the nomadic steppe frontier. His empire now stretched from the Aegean Sea to the approaches of the Indus.',
        fact: 'By organizing conquered kingdoms into semi-autonomous satrapies governed under local laws and languages while paying regular tribute, Cyrus created the imperial blueprint later inherited by Darius and Alexander.',
        quote: {
          en: 'All the kings from the Upper Sea to the Lower Sea, those who dwell in throne rooms, and all the kings of the West who dwell in tents, brought their heavy tribute and kissed my feet.',
          orig: '',
          provenance: 'The Cyrus Cylinder, lines 28–30 (c. 539 BCE)'
        }
      },
      {
        number: 5,
        roman: 'V',
        id: 'babylon',
        year: '539 BCE',
        age: 'c. Age 61',
        date: 'October 539 BCE',
        location: 'Babylon, Mesopotamia',
        shortPlace: 'Babylon',
        coords: [44.421, 32.536],
        coordText: '32°32′N, 44°25′E',
        eraKey: 'achaemenid539',
        labelPos: [-15, 8],
        alignEnd: true,
        routeCurve: 0.2,
        focusMultiplier: 1.5,
        title: 'Entry into Babylon & the Clay Cylinder',
        prose: 'After defeating the Babylonian army at Opis, Cyrus’s general Gobryas entered Babylon without a street battle; sixteen days later Cyrus himself marched in with green twigs laid before him. In the Akkadian clay Cyrus Cylinder buried in the city’s foundations, he proclaimed peace, returned captured cult statues to their cities, and permitted displaced peoples—including the Judean exiles—to return home and rebuild their sanctuaries.',
        fact: 'Discovered in Babylon in 1879 by archaeologist Hormuzd Rassam, the 23-centimeter barrel-shaped clay cylinder is widely studied as one of antiquity’s earliest royal charters of religious and cultural restoration.',
        quote: {
          en: 'I returned the images of the gods, who had resided there, to their places and I let them dwell in eternal abodes. I gathered all their inhabitants and returned to them their dwellings.',
          orig: '',
          provenance: 'The Cyrus Cylinder, lines 31–32 (539 BCE, translated by Irving Finkel)'
        }
      },
      {
        number: 6,
        roman: 'VI',
        id: 'jaxartes',
        year: '530 BCE',
        age: 'c. Age 70',
        date: 'December 530 BCE',
        location: 'Jaxartes (Syr Darya) Steppe Frontier',
        shortPlace: 'Jaxartes',
        coords: [64.8, 41.8],
        coordText: '41°48′N, 64°48′E',
        eraKey: 'achaemenid539',
        labelPos: [-15, -4],
        alignEnd: true,
        routeCurve: -0.16,
        focusMultiplier: 1.55,
        title: 'Final Campaign Beyond the Jaxartes',
        prose: 'Returning northeast in 530 BCE to secure his Central Asian border along the Jaxartes (Syr Darya) River against nomadic steppe riders—the Massagetae led by Queen Tomyris in Herodotus’s celebrated account—seventy-year-old Cyrus fell in battle on the far frontier. His body was recovered and carried 1,800 kilometers back to his garden capital of Pasargadae, leaving the largest empire the ancient world had yet seen.',
        fact: 'More than two millennia later, Thomas Jefferson kept two copies of Xenophon’s Cyropaedia—an admiring ancient portrait of Cyrus’s tolerant governance—and studied it closely while helping shape the American Republic.',
        quote: {
          en: 'O man, whoever you are and wherever you come from, for I know you will come, I am Cyrus who won the Persians their empire. Do not therefore begrudge me this bit of earth that covers my bones.',
          orig: '',
          provenance: 'Epitaph on Cyrus’s tomb at Pasargadae, recorded by Aristobulus in Arrian’s Anabasis (6.29.8)'
        }
      }
    ]
  };
})(window);
