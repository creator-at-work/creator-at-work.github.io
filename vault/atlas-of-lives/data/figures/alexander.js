/* ==========================================================================
   ALEXANDER THE GREAT (356–323 BCE) — Historical Life Atlas
   Sources: Arrian (Anabasis), Plutarch (Life of Alexander), Britannica
   ========================================================================== */

(function (global) {
  'use strict';

  global.ATLAS_FIGURES = global.ATLAS_FIGURES || {};

  global.ATLAS_FIGURES.alexander = {
    id: 'alexander',
    era: 'Antiquity',
    title: 'Alexander the Great',
    fullName: 'Alexander III of Macedon',
    years: '356 — 323 BCE',
    subtitle: 'Pella to Babylon',
    worldLabel: 'World of 323 BCE',
    worldEraLabel: 'Classical World · c. 330 BCE',
    originName: 'Pella',
    originCoords: [22.525, 40.76],

    viewBounds: {
      lon: [18.0, 77.5],
      lat: [24.0, 44.5]
    },

    waterLabels: [
      { name: 'MEDITERRANEAN SEA', coords: [23.0, 33.8], regionalOnly: true },
      { name: 'ARABIAN SEA', coords: [64.0, 20.5], regionalOnly: true },
      { name: 'ATLANTIC OCEAN', coords: [-28, -4], worldOnly: true },
      { name: 'INDIAN OCEAN', coords: [78, -22], worldOnly: true },
      { name: 'PACIFIC OCEAN', coords: [-130, -8], worldOnly: true }
    ],

    defaultEraKey: 'empire323',
    territorySets: {
      macedon356: {
        empireLabel: 'Kingdom of Macedon',
        rivalLabel: 'Achaemenid Persian Empire',
        empire: ['Greece', 'Macedonia'],
        dependent: [],
        ally: [],
        rival: ['Turkey', 'Syria', 'Iraq', 'Iran', 'Egypt', 'Afghanistan', 'Pakistan']
      },
      levant332: {
        empireLabel: 'Macedonian Conquests',
        rivalLabel: 'Achaemenid Empire',
        empire: ['Greece', 'Macedonia', 'Turkey', 'Syria', 'Lebanon', 'Israel', 'Palestine', 'Egypt'],
        dependent: [],
        ally: [],
        rival: ['Iraq', 'Iran', 'Afghanistan', 'Pakistan']
      },
      empire323: {
        empireLabel: 'Empire of Alexander (323 BCE)',
        empire: ['Greece', 'Macedonia', 'Bulgaria', 'Turkey', 'Syria', 'Lebanon', 'Israel', 'Palestine', 'Jordan', 'Egypt', 'Iraq', 'Iran', 'Afghanistan', 'Pakistan', 'Turkmenistan', 'Uzbekistan', 'Tajikistan'],
        dependent: [],
        ally: [],
        rival: ['India']
      }
    },

    worldRealms: [
      { id: 'nanda', name: 'Nanda Empire', desc: 'Powerful empire of northern India centered at Pataliputra, whose vast army deterred Alexander’s weary troops at the Beas River.', cssVar: '--realm-maratha', countries: ['India', 'Bangladesh', 'Nepal'], label: 'NANDA EMPIRE', labelCoords: [82.0, 23.0] },
      { id: 'warring', name: 'Warring States China', desc: 'Seven competing Chinese kingdoms (Qin, Chu, Qi, Zhao, Wei, Han, Yan) a century before Qin unification.', cssVar: '--realm-qing', countries: ['China'], label: 'WARRING STATES', labelCoords: [108.0, 34.5] },
      { id: 'carthage', name: 'Carthaginian Republic', desc: 'Phoenician maritime power dominating the western Mediterranean and North Africa.', cssVar: '--realm-ottoman', countries: ['Tunisia', 'Algeria', 'Libya'], label: 'CARTHAGE', labelCoords: [10.0, 33.5] },
      { id: 'rome', name: 'Roman Republic', desc: 'Rising regional republic in central Italy fighting the Samnite Wars.', cssVar: '--terr-rival', countries: ['Italy'], label: 'ROMAN REPUBLIC', labelCoords: [13.5, 42.5] },
      { id: 'scythia', name: 'Scythian & Saka Steppes', desc: 'Nomadic equestrian confederations across the Eurasian steppe.', cssVar: '--realm-persia', countries: ['Kazakhstan', 'Ukraine'], label: 'SCYTHIA', labelCoords: [64.0, 48.0] }
    ],

    historicalNames: {
      Greece: 'Hellenic League & Macedon',
      Turkey: 'Anatolia (Phrygia & Lydia)',
      Egypt: 'Satrapy of Egypt',
      Iraq: 'Babylonia & Assyria',
      Iran: 'Persia (Achaemenid Heartland)',
      Afghanistan: 'Bactria & Arachosia',
      Uzbekistan: 'Sogdiana',
      Pakistan: 'Gandhara & the Indus Valley'
    },

    worldPlaces: [
      { name: 'Rome', year: '323 BCE', detail: 'Still an Italian republic expanding southward against the Samnites.', coords: [12.4964, 41.9028] },
      { name: 'Carthage', year: '323 BCE', detail: 'Dominant commercial empire of the western Mediterranean.', coords: [10.323, 36.852] },
      { name: 'Pataliputra', year: '323 BCE', detail: 'Capital of the Nanda Empire on the Ganges; soon to become Chandragupta Maurya’s seat.', coords: [85.1376, 25.5941] },
      { name: 'Xianyang', year: '323 BCE', detail: 'Capital of the rising State of Qin in western China.', coords: [108.709, 34.329] }
    ],

    sources: [
      { label: 'Britannica', url: 'https://www.britannica.com/biography/Alexander-the-Great' },
      { label: 'Arrian · Anabasis', url: 'https://www.britannica.com/topic/Anabasis-of-Alexander' }
    ],

    stages: [
      {
        number: 1,
        roman: 'I',
        id: 'pella',
        year: '356 BCE',
        age: 'Birth',
        date: 'July 356 BCE',
        location: 'Pella, Macedon',
        shortPlace: 'Pella',
        coords: [22.525, 40.76],
        coordText: '40°46′N, 22°31′E',
        eraKey: 'macedon356',
        labelPos: [-15, -4],
        alignEnd: true,
        routeCurve: 0,
        focusMultiplier: 1.45,
        title: 'Heir of Philip, Pupil of Aristotle',
        prose: 'Born in the Macedonian capital of Pella to King Philip II and Queen Olympias, Alexander was tutored from age thirteen by Aristotle at Mieza in philosophy, medicine, and Homer. When Philip was assassinated in 336 BCE, twenty-year-old Alexander crushed rebellions across Greece and inherited the disciplined Macedonian phalanx built to invade Persia.',
        fact: 'Alexander kept a copy of Homer’s Iliad—annotated by Aristotle himself—beneath his pillow alongside a dagger throughout his Asian campaigns.',
        quote: {
          en: 'I am indebted to my father for living, but to my teacher for living well.',
          orig: '',
          provenance: 'Attributed in Plutarch, Life of Alexander'
        }
      },
      {
        number: 2,
        roman: 'II',
        id: 'granicus',
        year: '334 BCE',
        age: 'Age 21',
        date: 'May 334 BCE',
        location: 'Granicus River, Anatolia',
        shortPlace: 'Granicus',
        coords: [27.32, 40.25],
        coordText: '40°15′N, 27°19′E',
        eraKey: 'levant332',
        labelPos: [0, -17],
        alignMiddle: true,
        routeCurve: -0.18,
        focusMultiplier: 1.45,
        title: 'Crossing into Asia',
        prose: 'Crossing the Hellespont with roughly 40,000 troops, Alexander hurled his spear into Asian soil to claim the continent as won by the spear. Weeks later he charged across the steep banks of the Granicus River into the Persian satraps’ cavalry, opening western Anatolia and liberating the Greek cities of Ionia.',
        fact: 'Before fighting at Granicus, he made a pilgrimage to the ruins of Troy, sacrificing at the tomb of Achilles and taking an ancient sacred shield from the temple of Athena.',
        quote: {
          en: 'From Alexander, son of Philip, and all the Greeks except the Lacedaemonians, from the spoils of the barbarians who dwell in Asia.',
          orig: '',
          provenance: 'Dedication sent with 300 Persian suits of armor to the Parthenon, Arrian 1.16.7'
        }
      },
      {
        number: 3,
        roman: 'III',
        id: 'issus',
        year: '333 BCE',
        age: 'Age 23',
        date: 'November 333 BCE',
        location: 'Issus, Cilicia',
        shortPlace: 'Issus',
        coords: [36.2, 36.85],
        coordText: '36°51′N, 36°12′E',
        eraKey: 'levant332',
        labelPos: [15, -4],
        routeCurve: 0.16,
        focusMultiplier: 1.45,
        title: 'First Defeat of Darius III',
        prose: 'After untying the famed Gordian Knot in Phrygia, Alexander met King Darius III himself on a narrow coastal plain near Issus where Persian numbers could not deploy. Leading his Companion cavalry straight at the royal chariot, Alexander forced Darius to flee eastward—capturing the Persian king’s treasury, mother, and family, whom he treated with royal courtesy.',
        fact: 'After Issus, Darius offered half his empire west of the Euphrates and ten thousand talents of silver for peace; Alexander refused, demanding unconditional submission as Lord of Asia.',
        quote: {
          en: 'In future, whenever you communicate with me, send to me as king of Asia; do not write to me as an equal.',
          orig: '',
          provenance: 'Letter to Darius III after Issus, Arrian, Anabasis 2.14.8'
        }
      },
      {
        number: 4,
        roman: 'IV',
        id: 'alexandria',
        year: '331 BCE',
        age: 'Age 24',
        date: 'January – April 331 BCE',
        location: 'Alexandria & Siwa, Egypt',
        shortPlace: 'Alexandria',
        coords: [29.9187, 31.2001],
        coordText: '31°12′N, 29°55′E',
        eraKey: 'levant332',
        labelPos: [-15, 6],
        alignEnd: true,
        routeCurve: 0.2,
        focusMultiplier: 1.4,
        title: 'Pharaoh & Founding of Alexandria',
        prose: 'Welcomed in Egypt as a liberator from Persian rule, Alexander laid out the street grid of Alexandria on the Nile Delta—destined to become the intellectual capital of the ancient Mediterranean. He then marched deep into the Libyan desert to the Oracle of Amun at Siwa, where priests greeted him as the son of Zeus-Amun.',
        fact: 'Lacking chalk to trace the future walls of Alexandria, his architects outlined the streets with barley meal—which sea birds promptly ate, a sign his seers interpreted as predicting the city would feed the world.',
        quote: {
          en: 'God is the common father of all men, but he makes the best ones peculiarly his own.',
          orig: '',
          provenance: 'Plutarch, Life of Alexander 27.6 (on the Oracle of Amun)'
        }
      },
      {
        number: 5,
        roman: 'V',
        id: 'gaugamela',
        year: '331 BCE',
        age: 'Age 25',
        date: '1 October 331 BCE',
        location: 'Gaugamela, Assyria',
        shortPlace: 'Gaugamela',
        coords: [43.25, 36.36],
        coordText: '36°22′N, 43°15′E',
        eraKey: 'empire323',
        labelPos: [15, -5],
        routeCurve: -0.18,
        focusMultiplier: 1.4,
        title: 'Shattering the Persian Empire',
        prose: 'On wide plains near modern Erbil chosen and flattened by Darius for his scythed chariots and vast cavalry, Alexander angled his entire right wing outward until a gap tore open in the Persian line. Driving a wedge straight into that breach, he routed Darius a final time and seized Babylon, Susa, and the Achaemenid heartland.',
        fact: 'Eleven days before the battle, a lunar eclipse darkened the sky over the Tigris; Persian chroniclers recorded it as an omen of their empire’s fall.',
        quote: {
          en: 'I do not steal victory.',
          orig: '',
          provenance: 'Rejecting Parmenion’s advice for a night attack before Gaugamela, Arrian 3.10.2'
        }
      },
      {
        number: 6,
        roman: 'VI',
        id: 'persepolis',
        year: '330 BCE',
        age: 'Age 25',
        date: 'January – May 330 BCE',
        location: 'Persepolis, Persia',
        shortPlace: 'Persepolis',
        coords: [52.8916, 29.9352],
        coordText: '29°56′N, 52°53′E',
        eraKey: 'empire323',
        labelPos: [-15, 6],
        alignEnd: true,
        routeCurve: 0.16,
        focusMultiplier: 1.4,
        title: 'Ashes of the Ceremonial Capital',
        prose: 'Forcing the Persian Gates into Fars, Alexander occupied Persepolis—the glittering ceremonial palace built by Darius I and Xerxes—seizing 120,000 talents of royal bullion. Before departing in pursuit of Darius, he ordered the great palace complex set ablaze in symbolic vengeance for Xerxes’ burning of Athens in 480 BCE.',
        fact: 'According to Plutarch, it required twenty thousand mules and five thousand camels to haul the captured Persian gold and silver out of Persepolis and Susa.',
        quote: {
          en: 'I wish to punish the Persians for sacking Athens and burning its temples.',
          orig: '',
          provenance: 'Arrian, Anabasis 3.18.12'
        }
      },
      {
        number: 7,
        roman: 'VII',
        id: 'samarkand',
        year: '328 BCE',
        age: 'Age 28',
        date: '329 – 327 BCE',
        location: 'Maracanda (Samarkand), Sogdiana',
        shortPlace: 'Samarkand',
        coords: [66.975, 39.6542],
        coordText: '39°39′N, 66°59′E',
        eraKey: 'empire323',
        labelPos: [0, -17],
        alignMiddle: true,
        routeCurve: -0.18,
        focusMultiplier: 1.35,
        title: 'Guerilla War on the Silk Road',
        prose: 'Crossing the snowbound Hindu Kush into Bactria and Sogdiana, Alexander spent two brutal years fighting mobile mountain and steppe insurgents led by Spitamenes. To bind the eastern frontier into his empire, he founded garrison cities across Central Asia and married the Bactrian noblewoman Roxana after storming the sheer cliffs of the Sogdian Rock.',
        fact: 'At Samarkand in 328 BCE, during a drunken banquet argument over Persian court customs, Alexander killed his own friend and cavalry commander Cleitus the Black—then grieved inconsolably in his tent for three days.',
        quote: {
          en: 'There is nothing noble in hearing yourself spoken ill of when you are doing well—it is the part of a king to do good and be reviled.',
          orig: '',
          provenance: 'Plutarch, Life of Alexander 41.2'
        }
      },
      {
        number: 8,
        roman: 'VIII',
        id: 'hydaspes',
        year: '326 BCE',
        age: 'Age 29',
        date: 'May 326 BCE',
        location: 'Hydaspes River (Jhelum), Punjab',
        shortPlace: 'Hydaspes',
        coords: [73.73, 32.93],
        coordText: '32°56′N, 73°44′E',
        eraKey: 'empire323',
        labelPos: [15, 5],
        routeCurve: 0.14,
        focusMultiplier: 1.35,
        title: 'Porus & the Edge of the Known World',
        prose: 'Crossing the Indus into the Punjab, Alexander fought his costliest pitched battle across the monsoon-swollen Hydaspes against King Porus and two hundred war elephants. Impressed by Porus’s courage, Alexander restored him as ally and ruler—but months later at the Hyphasis (Beas) River, his exhausted Macedonian veterans refused to march further east.',
        fact: 'Alexander’s beloved warhorse Bucephalus died after the Hydaspes battle aged thirty; in his honor, Alexander founded the city of Bucephala on the river’s bank.',
        quote: {
          en: 'How do you wish to be treated? — “Like a king,” replied Porus. — That shall be done for my own sake; ask what you wish for yourself.',
          orig: '',
          provenance: 'Arrian, Anabasis 5.19.2'
        }
      },
      {
        number: 9,
        roman: 'IX',
        id: 'babylon',
        year: '323 BCE',
        age: 'Age 32',
        date: '10–11 June 323 BCE',
        location: 'Babylon, Mesopotamia',
        shortPlace: 'Babylon',
        coords: [44.4209, 32.5364],
        coordText: '32°32′N, 44°25′E',
        eraKey: 'empire323',
        labelPos: [-15, 16],
        alignEnd: true,
        routeCurve: 0.24,
        focusMultiplier: 1.45,
        title: 'To the Strongest',
        prose: 'Surviving a harrowing march back through the Gedrosian Desert, Alexander returned to Babylon to plan an Arabian maritime expedition and fuse Greek and Persian elites. Struck by a violent fever after heavy banqueting in late May 323 BCE, he died unbeaten at thirty-two—leaving no adult heir and plunging his empire into the Wars of the Diadochi.',
        fact: 'His campaigns launched the Hellenistic Age: for three centuries Greek language, coinage, urban planning, and science connected Egypt, the Levant, Persia, and northwestern India.',
        quote: {
          en: 'To the strongest.',
          orig: 'Τῷ κρατίστῳ.',
          origLang: 'Ελληνικά',
          provenance: 'Reputed reply when asked to whom he left his kingdom, Arrian 7.26 / Diodorus 17.117'
        }
      }
    ]
  };
})(window);
