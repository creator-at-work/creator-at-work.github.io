/* ==========================================================================
   CHANDRAGUPTA MAURYA (c. 340–297 BCE) — Historical Life Atlas
   Sources: Megasthenes (Indica fragments), Kautilya (Arthashastra), Britannica
   ========================================================================== */

(function (global) {
  'use strict';

  global.ATLAS_FIGURES = global.ATLAS_FIGURES || {};

  global.ATLAS_FIGURES.chandragupta = {
    id: 'chandragupta',
    era: 'Antiquity',
    title: 'Chandragupta Maurya',
    fullName: 'Chandragupta Maurya',
    years: 'c. 340 — 297 BCE',
    subtitle: 'Taxila to Shravanabelagola',
    worldLabel: 'World of 305 BCE',
    worldEraLabel: 'Classical World · c. 305 BCE',
    originName: 'Pataliputra',
    originCoords: [85.1376, 25.5941],

    viewBounds: {
      lon: [61.5, 92.0],
      lat: [9.5, 36.5]
    },

    waterLabels: [
      { name: 'ARABIAN SEA', coords: [66.5, 16.5], regionalOnly: true },
      { name: 'BAY OF BENGAL', coords: [87.5, 15.5], regionalOnly: true },
      { name: 'ATLANTIC OCEAN', coords: [-28, -4], worldOnly: true },
      { name: 'INDIAN OCEAN', coords: [78, -22], worldOnly: true },
      { name: 'PACIFIC OCEAN', coords: [-130, -8], worldOnly: true }
    ],

    defaultEraKey: 'empire305',
    territorySets: {
      rise325: {
        empireLabel: 'Early Mauryan Uprising',
        rivalLabel: 'Nanda Empire & Macedonian Satrapies',
        empire: ['Pakistan'],
        dependent: [],
        ally: [],
        rival: ['India', 'Afghanistan']
      },
      magadha321: {
        empireLabel: 'Maurya Empire (321 BCE)',
        empire: ['India', 'Pakistan', 'Bangladesh', 'Nepal'],
        dependent: [],
        ally: [],
        rival: ['Afghanistan', 'Iran']
      },
      empire305: {
        empireLabel: 'Maurya Empire at Peak (c. 305 BCE)',
        empire: ['India', 'Pakistan', 'Afghanistan', 'Bangladesh', 'Nepal'],
        dependent: [],
        ally: ['Iran', 'Iraq', 'Syria'],
        rival: []
      }
    },

    worldRealms: [
      { id: 'seleucid', name: 'Seleucid Empire', desc: 'Hellenistic successor empire founded by Seleucus I Nicator; concluded a landmark treaty and diplomatic exchange with Chandragupta in 305 BCE.', cssVar: '--realm-persia', countries: ['Iran', 'Iraq', 'Syria', 'Turkey', 'Turkmenistan'], label: 'SELEUCID EMPIRE', labelCoords: [48.0, 34.0] },
      { id: 'ptolemaic', name: 'Ptolemaic Egypt', desc: 'Hellenistic kingdom founded by Ptolemy I on the Nile, centered at Alexandria.', cssVar: '--realm-ottoman', countries: ['Egypt', 'Libya', 'Israel', 'Palestine'], label: 'PTOLEMAIC EGYPT', labelCoords: [30.0, 27.0] },
      { id: 'warring', name: 'Warring States China', desc: 'Late Zhou era states competing for hegemony across the Yellow and Yangtze valleys.', cssVar: '--realm-qing', countries: ['China'], label: 'WARRING STATES', labelCoords: [108.0, 34.5] },
      { id: 'rome', name: 'Roman Republic', desc: 'Expanding across central Italy during the Samnite Wars.', cssVar: '--terr-rival', countries: ['Italy'], label: 'ROMAN REPUBLIC', labelCoords: [13.5, 42.5] },
      { id: 'carthage', name: 'Carthaginian Republic', desc: 'Maritime empire across North Africa and Sicily.', cssVar: '--realm-spanish', countries: ['Tunisia', 'Algeria'], label: 'CARTHAGE', labelCoords: [9.0, 33.5] }
    ],

    historicalNames: {
      India: 'Maurya Empire (Jambudvipa)',
      Pakistan: 'Uttarapatha (Taxila & Indus)',
      Afghanistan: 'Arachosia & Paropamisadae (ceded 305 BCE)',
      Iran: 'Seleucid Persia',
      Iraq: 'Seleucia & Babylonia'
    },

    worldPlaces: [
      { name: 'Seleucia', year: '305 BCE', detail: 'Royal capital founded by Seleucus I Nicator on the Tigris River.', coords: [44.52, 33.09] },
      { name: 'Alexandria', year: '305 BCE', detail: 'Capital of Ptolemaic Egypt, where the Great Library was soon founded.', coords: [29.9187, 31.2001] },
      { name: 'Xianyang', year: '305 BCE', detail: 'Seat of the rising State of Qin in China.', coords: [108.709, 34.329] }
    ],

    sources: [
      { label: 'Britannica', url: 'https://www.britannica.com/biography/Chandragupta' },
      { label: 'Megasthenes · Indica', url: 'https://www.britannica.com/biography/Megasthenes' }
    ],

    stages: [
      {
        number: 1,
        roman: 'I',
        id: 'taxila',
        year: '326 BCE',
        age: 'Youth',
        date: 'c. 326 – 324 BCE',
        location: 'Takshashila (Taxila), Gandhara',
        shortPlace: 'Taxila',
        coords: [72.787, 33.746],
        coordText: '33°45′N, 72°47′E',
        eraKey: 'rise325',
        labelPos: [15, -4],
        routeCurve: 0,
        focusMultiplier: 1.45,
        title: 'Disciple of Chanakya at Taxila',
        prose: 'Educated at the great ancient university city of Takshashila under the political strategist Chanakya (Kautilya), young Chandragupta studied statecraft, espionage, and warfare just as Alexander’s invasion upended the northwestern kingdoms. Classical Greek sources note that the young “Sandrokottos” even observed Alexander’s camp firsthand.',
        fact: 'Plutarch records that Chandragupta later remarked Alexander could easily have toppled the unpopular Nanda king of Magadha had his Greek soldiers not mutinied at the Beas River.',
        quote: {
          en: 'In the happiness of his subjects lies the king’s happiness; in their welfare, his welfare.',
          orig: 'प्रजासुखे सुखं राज्ञः प्रजानां च हिते हितम्।',
          origLang: 'संस्कृतम्',
          provenance: 'Kautilya, Arthashastra 1.19.34 (statecraft treatise linked to Chandragupta’s court)'
        }
      },
      {
        number: 2,
        roman: 'II',
        id: 'punjab',
        year: '323 BCE',
        age: 'c. Age 17',
        date: 'c. 324 – 322 BCE',
        location: 'Indus & Punjab Frontier',
        shortPlace: 'Punjab',
        coords: [74.3436, 31.5497],
        coordText: '31°33′N, 74°21′E',
        eraKey: 'rise325',
        labelPos: [15, 6],
        routeCurve: 0.16,
        focusMultiplier: 1.45,
        title: 'Expelling the Macedonian Garrisons',
        prose: 'Following Alexander’s departure and sudden death in 323 BCE, Chandragupta rallied frontier clans and mercenary republics across the Indus basin. Sweeping away the fractured Macedonian satrapies in the Punjab, he forged a seasoned coalition army and secured the strategic northwestern approaches to the Gangetic plain.',
        fact: 'Roman historian Justin wrote that after Alexander’s death, “India, as if the yoke of servitude had been shaken off its neck, had put his prefects to death—the author of this liberation was Sandrokottos.”',
        quote: {
          en: 'India, shaking off the yoke of servitude from her neck, found her liberator in Sandrokottos.',
          orig: '',
          provenance: 'Justin, Epitome of Pompeius Trogus 15.4 (c. 2nd century CE)'
        }
      },
      {
        number: 3,
        roman: 'III',
        id: 'pataliputra',
        year: '321 BCE',
        age: 'c. Age 19',
        date: 'c. 321 BCE',
        location: 'Pataliputra, Magadha',
        shortPlace: 'Pataliputra',
        coords: [85.1376, 25.5941],
        coordText: '25°36′N, 85°08′E',
        eraKey: 'magadha321',
        labelPos: [15, 4],
        routeCurve: -0.15,
        focusMultiplier: 1.45,
        title: 'Overthrow of the Nandas',
        prose: 'Marching down the Gangetic corridor, Chandragupta and Chanakya toppled the wealthy but deeply resented Nanda Dynasty of Magadha and seized the walled metropolis of Pataliputra. At roughly twenty years old, he founded the Maurya Empire—the first realm to knit northern and central India under one centralized bureaucracy.',
        fact: 'Greek ambassador Megasthenes described Pataliputra as an immense parallelogram stretching nine miles along the Ganges, fortified by 570 towers and 64 gates behind a broad moat.',
        quote: {
          en: 'The greatest city in India is Palimbothra, in the dominions of the Prasians, where the streams of the Erannoboas and the Ganges unite.',
          orig: '',
          provenance: 'Megasthenes, Indica, preserved in Arrian, Indika 10.5'
        }
      },
      {
        number: 4,
        roman: 'IV',
        id: 'girnar',
        year: '315 BCE',
        age: 'c. Age 25',
        date: 'c. 315 – 310 BCE',
        location: 'Girinagara (Junagadh), Saurashtra',
        shortPlace: 'Girnar',
        coords: [70.4579, 21.5222],
        coordText: '21°31′N, 70°27′E',
        eraKey: 'magadha321',
        labelPos: [-15, 5],
        alignEnd: true,
        routeCurve: 0.16,
        focusMultiplier: 1.4,
        title: 'Western Reach & Sudarshana Lake',
        prose: 'Extending Mauryan authority all the way to the Arabian Sea, Chandragupta appointed his provincial governor Pushyagupta over Saurashtra in western India. Rather than merely extracting tribute, the Mauryan administration built durable highways, standardized weights, and monumental hydraulic infrastructure to sustain agrarian prosperity.',
        fact: 'The Sanskrit Junagadh Rock Inscription of Rudradaman (150 CE) explicitly credits Chandragupta’s governor Pushyagupta with constructing the great artificial reservoir Sudarshana Lake—one of the earliest dated epigraphic confirmations of his reign.',
        quote: {
          en: 'Constructed by the Vaishya Pushyagupta, the provincial governor of the Maurya king Chandragupta.',
          orig: '',
          provenance: 'Junagadh Rock Inscription of Rudradaman I (150 CE)'
        }
      },
      {
        number: 5,
        roman: 'V',
        id: 'kandahar',
        year: '305 BCE',
        age: 'c. Age 35',
        date: 'c. 305 – 303 BCE',
        location: 'Arachosia (Kandahar) & Indus',
        shortPlace: 'Arachosia',
        coords: [65.71, 31.6289],
        coordText: '31°38′N, 65°43′E',
        eraKey: 'empire305',
        labelPos: [-15, -4],
        alignEnd: true,
        routeCurve: -0.18,
        focusMultiplier: 1.35,
        title: 'Treaty with Seleucus Nicator',
        prose: 'When Alexander’s general Seleucus I Nicator crossed the Indus to reclaim Alexander’s eastern provinces, Chandragupta met him with an immense imperial army. The resulting peace treaty ceded Kandahar, Kabul, Herat, and Gedrosia to the Mauryas in exchange for 500 war elephants and a diplomatic marriage alliance—fixing India’s natural frontier at the Hindu Kush.',
        fact: 'Those 500 Mauryan war elephants proved decisive in 301 BCE at the Battle of Ipsus in Anatolia, helping Seleucus defeat Antigonus and reshape the entire Hellenistic Mediterranean.',
        quote: {
          en: 'Seleucus ceded to Sandrokottos the territories bordering the Indus, receiving in return five hundred elephants and cementing the pact by marriage.',
          orig: '',
          provenance: 'Strabo, Geography 15.2.9'
        }
      },
      {
        number: 6,
        roman: 'VI',
        id: 'ujjain',
        year: '302 BCE',
        age: 'c. Age 38',
        date: 'c. 302 – 298 BCE',
        location: 'Ujjayini (Ujjain), Central India',
        shortPlace: 'Ujjain',
        coords: [75.7849, 23.1765],
        coordText: '23°11′N, 75°47′E',
        eraKey: 'empire305',
        labelPos: [15, -2],
        routeCurve: 0.14,
        focusMultiplier: 1.4,
        title: 'Heart of a Subcontinental State',
        prose: 'With Seleucid ambassador Megasthenes residing at Pataliputra and royal highways linking Taxila, Ujjain, and the Ganges, the Mauryan Empire governed tens of millions across diverse tongues and faiths. Municipal boards oversaw trade, sanitation, birth registries, and foreign visitors—setting an administrative template that lasted through his grandson Ashoka.',
        fact: 'Megasthenes noted that the Mauryan royal road (Uttarapatha)—ancestor of the Grand Trunk Road—was marked with distance pillars every ten stadia showing side-roads and rest stops.',
        quote: {
          en: 'They live frugally and observe good order; theft is of very rare occurrence, and their houses and property are generally left unguarded.',
          orig: '',
          provenance: 'Megasthenes, Indica, quoted in Strabo, Geography 15.1.53'
        }
      },
      {
        number: 7,
        roman: 'VII',
        id: 'shravanabelagola',
        year: '297 BCE',
        age: 'c. Age 43',
        date: 'c. 297 BCE',
        location: 'Shravanabelagola, Karnataka',
        shortPlace: 'Shravanabelagola',
        coords: [76.4875, 12.8576],
        coordText: '12°51′N, 76°29′E',
        eraKey: 'empire305',
        labelPos: [15, 5],
        routeCurve: 0.16,
        focusMultiplier: 1.45,
        title: 'Renunciation on Chandragiri Hill',
        prose: 'According to enduring Jain historical tradition, when a twelve-year famine threatened Magadha, Chandragupta voluntarily abdicated the greatest throne in South Asia to his son Bindusara. Walking south as a barefoot monk alongside the sage Bhadrabahu, he retired to Chandragiri Hill at Shravanabelagola and ended his life in peaceful meditative fasting (sallekhana).',
        fact: 'Unlike almost every other ancient conqueror who clung to power until assassination or battlefield death, Chandragupta relinquished an intact empire spanning from Afghanistan to Bengal to die as an ascetic.',
        quote: {
          en: 'Having surrendered sovereignty to his son, the king took initiation and travelled south with the preceptor Bhadrabahu to seek liberation.',
          orig: '',
          provenance: 'Jain tradition recorded in Shravanabelagola inscriptions & Hemachandra’s Parishishtaparvan'
        }
      }
    ]
  };
})(window);
