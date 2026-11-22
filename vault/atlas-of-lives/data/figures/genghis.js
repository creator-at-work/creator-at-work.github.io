/* ==========================================================================
   GENGHIS KHAN (c. 1162–1227) — Historical Life Atlas
   Sources: The Secret History of the Mongols (13th century), Ata-Malik
            Juvayni (History of the World Conqueror), Jack Weatherford, Britannica
   ========================================================================== */

(function (global) {
  'use strict';

  global.ATLAS_FIGURES = global.ATLAS_FIGURES || {};

  global.ATLAS_FIGURES.genghis = {
    id: 'genghis',
    era: 'Medieval & Renaissance',
    title: 'Genghis Khan',
    fullName: 'Temüjin · Chinggis Khaan',
    years: 'c. 1162 — 1227',
    subtitle: 'Onon Steppe to the Indus & Yellow River',
    worldLabel: 'World of 1227',
    worldEraLabel: 'Eurasia · Early 13th Century',
    originName: 'Onon River',
    originCoords: [110.65, 49.02],

    viewBounds: {
      lon: [56.0, 122.0],
      lat: [28.0, 53.5]
    },

    waterLabels: [
      { name: 'YELLOW SEA', coords: [123.0, 35.0], regionalOnly: true },
      { name: 'CASPIAN SEA', coords: [51.0, 41.5], regionalOnly: true },
      { name: 'ATLANTIC OCEAN', coords: [-28, -4], worldOnly: true },
      { name: 'INDIAN OCEAN', coords: [78, -22], worldOnly: true },
      { name: 'PACIFIC OCEAN', coords: [-130, -8], worldOnly: true }
    ],

    defaultEraKey: 'empire1227',
    territorySets: {
      steppe1206: {
        empireLabel: 'United Mongol Ulus (1206)',
        rivalLabel: 'Jin, Western Xia & Khwarazmian Empires',
        empire: ['Mongolia'],
        dependent: [],
        ally: [],
        rival: ['China', 'Uzbekistan', 'Turkmenistan', 'Iran', 'Kazakhstan']
      },
      empire1227: {
        empireLabel: 'Mongol Empire at Genghis Khan’s Death (1227)',
        dependentLabel: 'Raided & Contested Frontiers',
        rivalLabel: 'Southern Song & Delhi Sultanate',
        empire: ['Mongolia', 'Kazakhstan', 'Kyrgyzstan', 'Uzbekistan', 'Turkmenistan', 'Tajikistan', 'Afghanistan', 'Iran'],
        dependent: ['China', 'Azerbaijan', 'Georgia', 'Russia'],
        ally: [],
        rival: ['India', 'Pakistan', 'Iraq']
      }
    },

    worldRealms: [
      { id: 'song', name: 'Southern Song Dynasty', desc: 'Wealthiest, most populous civilization on Earth in 1227—innovator of paper money, compasses, and gunpowder, still unconquered until Kublai Khan (1279).', cssVar: '--realm-qing', countries: ['China'], label: 'SOUTHERN SONG', labelCoords: [112.0, 27.5] },
      { id: 'delhi', name: 'Delhi Sultanate', desc: 'Ruled by Sultan Iltutmish, who prudently refused sanctuary to the fleeing Khwarazmian prince and spared northern India a full Mongol invasion.', cssVar: '--realm-maratha', countries: ['India', 'Pakistan', 'Bangladesh'], label: 'DELHI SULTANATE', labelCoords: [78.5, 23.0] },
      { id: 'abbasid', name: 'Abbasid Caliphate & Ayyubids', desc: 'Baghdad, Syria, and Egypt under Saladin’s successors.', cssVar: '--realm-ottoman', countries: ['Iraq', 'Syria', 'Egypt'], label: 'AYYUBIDS & BAGHDAD', labelCoords: [38.0, 31.0] },
      { id: 'europe', name: 'Latin Christendom & Kievan Rus’', desc: 'Divided European kingdoms and Russian principalities; Jebe and Subutai had just defeated a Rus’-Kipchak coalition at the Kalka River (1223).', cssVar: '--terr-rival', countries: ['France', 'Germany', 'Italy', 'United Kingdom', 'Poland', 'Ukraine'], label: 'EUROPE & RUS’', labelCoords: [16.0, 49.0] },
      { id: 'kamakura', name: 'Kamakura Shogunate', desc: 'Samurai military government of medieval Japan.', cssVar: '--realm-us', countries: ['Japan'], label: 'KAMAKURA JAPAN', labelCoords: [139.0, 36.0] }
    ],

    historicalNames: {
      Mongolia: 'Yeke Mongol Ulus (Great Mongol Nation)',
      China: 'Jin Dynasty, Western Xia & Southern Song',
      Uzbekistan: 'Khwarazmian Empire (Transoxiana)',
      Iran: 'Khorasan & Persia',
      Kazakhstan: 'Kipchak & Qara Khitai Steppes',
      Pakistan: 'Indus Frontier (Delhi Sultanate)'
    },

    worldPlaces: [
      { name: 'Kalka River', year: '1223', detail: 'Site of Subutai and Jebe’s dazzling cavalry reconnaissance victory deep in the Pontic steppe.', coords: [37.5, 47.4] },
      { name: 'Hangzhou', year: '1227', detail: 'Capital of the Southern Song Dynasty, then the largest city in the world.', coords: [120.1551, 30.2741] },
      { name: 'Delhi', year: '1221', detail: 'Capital of the Delhi Sultanate during Genghis Khan’s pursuit to the Indus.', coords: [77.209, 28.6139] }
    ],

    sources: [
      { label: 'The Secret History of the Mongols', url: 'https://www.britannica.com/topic/The-Secret-History-of-the-Mongols' },
      { label: 'Britannica', url: 'https://www.britannica.com/biography/Genghis-Khan' }
    ],

    stages: [
      {
        number: 1,
        roman: 'I',
        id: 'onon',
        year: '1206',
        age: 'c. Age 44',
        date: '1162 – Spring 1206',
        location: 'Onon River, Northeastern Mongolia',
        shortPlace: 'Onon River',
        coords: [110.65, 49.02],
        coordText: '49°01′N, 110°39′E',
        eraKey: 'steppe1206',
        labelPos: [14, -6],
        routeCurve: 0,
        focusMultiplier: 1.5,
        title: 'From Outcast Temüjin to Universal Ruler',
        prose: 'Born near the Onon River around 1162 as Temüjin, he was abandoned by his clan at age nine after his father’s poisoning, surviving on roots, marmots, and river fish before escaping captivity. Over twenty years of steppe warfare, he abolished aristocratic tribal divisions, promoted commanders strictly by merit, and in 1206 was acclaimed by a great assembly (kurultai) as Chinggis Khaan—Universal Ruler of all who dwell in felt tents.',
        fact: 'Genghis Khan instituted the Yassa legal code, outlawed the kidnapping of women and livestock theft, granted universal religious freedom across faiths, and commissioned the Uyghur script to write Mongolian for the first time.',
        quote: {
          en: 'May the Eternal Blue Sky grant us strength and power!',
          orig: '',
          provenance: 'The Secret History of the Mongols (c. 1240), §240'
        }
      },
      {
        number: 2,
        roman: 'II',
        id: 'karakorum',
        year: '1220',
        age: 'c. Age 58',
        date: '1206 – 1220',
        location: 'Orkhon Valley (Karakorum), Mongolia',
        shortPlace: 'Karakorum',
        coords: [102.845, 47.209],
        coordText: '47°13′N, 102°51′E',
        eraKey: 'steppe1206',
        labelPos: [-15, -6],
        alignEnd: true,
        routeCurve: -0.15,
        focusMultiplier: 1.5,
        title: 'The Yam Postal Network & Decimal Army',
        prose: 'Designating the sacred Orkhon River valley as his central supply base—soon to become the imperial capital of Karakorum—Genghis Khan organized Mongol society into interlocking decimal units of 10, 100, 1,000, and 10,000 (tumen) that mixed rival tribes together. To bind his vast domains, he built the Yam, a high-speed horse-relay postal system where riders carrying silver paiza tablets could cover 300 kilometers a day.',
        fact: 'Under the Pax Mongolica established by Genghis Khan and his successors, diplomatic envoys received legal immunity and merchants traveled safely across Eurasia—creating the first transcontinental trade highway.',
        quote: {
          en: 'When my sons and grandsons wear silk robes and eat sweet meats, they will forget how we won this empire.',
          orig: '',
          provenance: 'Recorded in the Persian chronicle of Rashid al-Din (Jami al-Tawarikh, early 14th century)'
        }
      },
      {
        number: 3,
        roman: 'III',
        id: 'zhongdu',
        year: '1215',
        age: 'c. Age 53',
        date: 'May 1215',
        location: 'Zhongdu (Beijing), Jin Empire',
        shortPlace: 'Zhongdu',
        coords: [116.4074, 39.9042],
        coordText: '39°54′N, 116°24′E',
        eraKey: 'empire1227',
        labelPos: [14, 4],
        routeCurve: 0.16,
        focusMultiplier: 1.45,
        title: 'Breaching the Great Wall & the Fall of Zhongdu',
        prose: 'Provoked by the Jurchen Jin Dynasty’s demand for submission, Genghis Khan swept past the Great Wall in 1211 and starved out the heavily fortified Jin capital of Zhongdu (modern Beijing) in 1215. Recognizing that horse archers alone could not storm stone cities, he recruited Chinese siege engineers—absorbing catapults, gunpowder bombs, and administrative officials like Yelü Chucai into his empire.',
        fact: 'Yelü Chucai persuaded the Mongols that taxing conquered northern Chinese farmers regularly would yield far greater wealth than turning their fields into horse pasture—saving millions of lives.',
        quote: {
          en: 'One can conquer an empire on horseback, but one cannot govern it on horseback.',
          orig: '',
          provenance: 'Counsel of Yelü Chucai to the Mongol court, recorded in the Yuan Shi'
        }
      },
      {
        number: 4,
        roman: 'IV',
        id: 'otrar',
        year: '1219',
        age: 'c. Age 57',
        date: '1218 – 1219',
        location: 'Otrar, Syr Darya (Kazakhstan)',
        shortPlace: 'Otrar',
        coords: [68.303, 42.851],
        coordText: '42°51′N, 68°18′E',
        eraKey: 'empire1227',
        labelPos: [14, -8],
        routeCurve: -0.18,
        focusMultiplier: 1.45,
        title: 'The Massacre of the Silk Road Caravan',
        prose: 'Seeking peaceful Silk Road trade with the Islamic Khwarazmian Empire, Genghis Khan dispatched a 450-merchant caravan to the border city of Otrar—where the local governor massacred the traders and Shah Muhammad II executed the Khan’s diplomatic envoy. Outraged, Genghis Khan mobilized 150,000 riders across the Tian Shan mountains and besieged Otrar in 1219, launching one of the swiftest, deadliest campaigns in history.',
        fact: 'Before setting out for the West, Genghis Khan held a formal succession council at the urging of his chief wife Börte, naming his conciliatory third son Ögedei as heir to prevent civil war.',
        quote: {
          en: 'You have chosen war. What will happen will happen, and what it is to be we know not; only God knows.',
          orig: '',
          provenance: 'Genghis Khan’s message to Shah Muhammad II after the Otrar massacre, recorded by Juvayni'
        }
      },
      {
        number: 5,
        roman: 'V',
        id: 'samarkand',
        year: '1220',
        age: 'c. Age 58',
        date: 'February – March 1220',
        location: 'Bukhara & Samarkand, Transoxiana',
        shortPlace: 'Samarkand',
        coords: [66.9597, 39.6542],
        coordText: '39°39′N, 66°58′E',
        eraKey: 'empire1227',
        labelPos: [-15, 4],
        alignEnd: true,
        routeCurve: 0.14,
        focusMultiplier: 1.5,
        title: 'Across the Kyzylkum Desert to Samarkand',
        prose: 'In a brilliant strategic surprise, Genghis Khan led his main column silently across the supposedly impassable Kyzylkum Desert to appear behind the Khwarazmian defenses at Bukhara, then encircled the great Silk Road metropolis of Samarkand in March 1220. Within two years the cities of Bukhara, Samarkand, Merv, and Nishapur fell—while skilled artisans, doctors, and astronomers were spared and resettled eastward.',
        fact: 'While campaigning in Central Asia, Genghis Khan summoned the seventy-year-old Taoist master Qiu Chuji (Changchun) all the way from eastern China to discuss longevity; when the sage told him no elixir of immortality existed, the Khan respected his candor and exempted Taoist temples from taxes.',
        quote: {
          en: 'I wear the same clothing and eat the same food as the cowherds and horse-herders. We make the same sacrifices and we share our riches.',
          orig: '',
          provenance: 'Letter from Genghis Khan to Taoist sage Qiu Chuji, 1219 (preserved in Li Zhichang’s Si Yu Ji)'
        }
      },
      {
        number: 6,
        roman: 'VI',
        id: 'indus',
        year: '1221',
        age: 'c. Age 59',
        date: 'November 1221',
        location: 'Indus River, Northern Punjab',
        shortPlace: 'Indus River',
        coords: [71.56, 32.98],
        coordText: '32°59′N, 71°34′E',
        eraKey: 'empire1227',
        labelPos: [14, 10],
        routeCurve: 0.16,
        focusMultiplier: 1.5,
        title: 'The Leap Across the Indus',
        prose: 'Pursuing the heroic Khwarazmian crown prince Jalal al-Din across the Hindu Kush into the Punjab, Genghis Khan cornered his foe with his back to the rushing Indus River in November 1221. Refusing to surrender, Jalal al-Din rode his horse off a twenty-foot cliff into the river and swam to the far shore under Mongol arrows—prompting Genghis Khan to halt his archers in admiration.',
        fact: 'Turning back from the oppressive heat of the Indian plains, Genghis Khan simultaneously sent generals Subutai and Jebe around the Caspian Sea—executing an unprecedented 8,000-kilometer cavalry raid across Georgia and southern Russia.',
        quote: {
          en: 'Such a son a father should have!',
          orig: '',
          provenance: 'Remark to his sons upon seeing Jalal al-Din swim the Indus, recorded by Juvayni'
        }
      },
      {
        number: 7,
        roman: 'VII',
        id: 'yinchuan',
        year: '1227',
        age: 'c. Age 65',
        date: '18 August 1227',
        location: 'Liupan Mountains & Western Xia',
        shortPlace: 'Western Xia',
        coords: [106.23, 38.487],
        coordText: '38°29′N, 106°14′E',
        eraKey: 'empire1227',
        labelPos: [-15, 8],
        alignEnd: true,
        routeCurve: -0.18,
        focusMultiplier: 1.5,
        title: 'Final Campaign & the Hidden Grave',
        prose: 'Returning east to punish the Tangut kingdom of Western Xia for refusing military aid in Central Asia, Genghis Khan fell gravely ill in the Liupan Mountains after a hunting fall in August 1227. Dictating his final plan to conquer the remaining Jin territories, he died at sixty-five as the founder of the largest contiguous land empire in human history.',
        fact: 'Honoring his wish to be buried quietly in his homeland near Burkhan Khaldun mountain, his funeral escort left no monument above the earth—and despite modern satellite and archaeological searches, his tomb has never been found.',
        quote: {
          en: 'Heaven has appointed me to rule all the nations, for hitherto there has been no order upon the steppes.',
          orig: '',
          provenance: 'Letter to Taoist sage Qiu Chuji, 1219'
        }
      }
    ]
  };
})(window);
