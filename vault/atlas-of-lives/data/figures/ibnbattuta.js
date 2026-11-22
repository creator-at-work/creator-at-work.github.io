/* ==========================================================================
   IBN BATTUTA (1304–1369) — Historical Life Atlas
   Sources: The Rihla (A Gift to Those Who Contemplate the Wonders of Cities,
            dictated to Ibn Juzayy, 1355), Ross E. Dunn, Britannica
   ========================================================================== */

(function (global) {
  'use strict';

  global.ATLAS_FIGURES = global.ATLAS_FIGURES || {};

  global.ATLAS_FIGURES.ibnbattuta = {
    id: 'ibnbattuta',
    era: 'Medieval & Renaissance',
    title: 'Ibn Battuta',
    fullName: 'Shams al-Din Abu Abdallah Muhammad ibn Battuta',
    years: '1304 — 1369',
    subtitle: 'Tangier to Mecca, Delhi, Quanzhou & Timbuktu',
    worldLabel: 'World of 1345',
    worldEraLabel: 'Afro-Eurasian World · 14th Century',
    originName: 'Tangier',
    originCoords: [-5.834, 35.7595],

    viewBounds: {
      lon: [-14.0, 126.0],
      lat: [-14.0, 47.0]
    },

    waterLabels: [
      { name: 'INDIAN OCEAN', coords: [68.0, -4.0], regionalOnly: true },
      { name: 'MEDITERRANEAN SEA', coords: [16.5, 35.0], regionalOnly: true },
      { name: 'SOUTH CHINA SEA', coords: [113.0, 14.0], regionalOnly: true },
      { name: 'ATLANTIC OCEAN', coords: [-28, -4], worldOnly: true },
      { name: 'PACIFIC OCEAN', coords: [-130, -8], worldOnly: true }
    ],

    defaultEraKey: 'daralislam1345',
    territorySets: {
      daralislam1345: {
        empireLabel: 'Islamic Sultanates & Caliphates Visited',
        dependentLabel: 'Yuan China & Maritime Trade Ports',
        allyLabel: 'Mali Empire (West Africa)',
        rivalLabel: 'Byzantine & European Kingdoms',
        empire: ['Morocco', 'Algeria', 'Tunisia', 'Libya', 'Egypt', 'Saudi Arabia', 'Syria', 'Iraq', 'Iran', 'Turkey', 'India', 'Pakistan', 'Oman', 'Yemen', 'Tanzania', 'Kenya', 'Maldives'],
        dependent: ['China', 'Indonesia', 'Sri Lanka', 'Bangladesh', 'Malaysia'],
        ally: ['Mali', 'Mauritania', 'Niger'],
        rival: ['Greece', 'Italy', 'Spain', 'France']
      }
    },

    worldRealms: [
      { id: 'yuan', name: 'Yuan Dynasty China', desc: 'Mongol-ruled China, famed for paper currency, silk, porcelain, and bustling coastal ports like Quanzhou.', cssVar: '--realm-qing', countries: ['China', 'Mongolia'], label: 'YUAN CHINA', labelCoords: [106.0, 36.0] },
      { id: 'delhi', name: 'Delhi Sultanate (Tughlaq)', desc: 'Vast Indo-Islamic empire ruled by Muhammad bin Tughlaq, who employed Ibn Battuta as a chief Maliki judge for seven years.', cssVar: '--realm-maratha', countries: ['India', 'Pakistan', 'Bangladesh'], label: 'DELHI SULTANATE', labelCoords: [78.5, 22.5] },
      { id: 'mamluk', name: 'Mamluk Sultanate', desc: 'Rulers of Egypt, Syria, and the Holy Cities of Mecca and Medina.', cssVar: '--realm-ottoman', countries: ['Egypt', 'Syria', 'Jordan', 'Saudi Arabia'], label: 'MAMLUK SULTANATE', labelCoords: [35.0, 27.5] },
      { id: 'mali', name: 'Mali Empire', desc: 'Gold-rich West African empire of Mansa Musa and Mansa Sulayman along the Niger River.', cssVar: '--realm-spain', countries: ['Mali', 'Senegal', 'Guinea'], label: 'MALI EMPIRE', labelCoords: [-6.0, 14.5] },
      { id: 'europe', name: 'Medieval Europe (Black Death Era)', desc: 'England and France locked in the Hundred Years’ War as the Black Death struck Eurasia in 1347–1351.', cssVar: '--terr-rival', countries: ['France', 'United Kingdom', 'Germany', 'Italy', 'Spain'], label: 'MEDIEVAL EUROPE', labelCoords: [10.0, 48.0] }
    ],

    historicalNames: {
      Morocco: 'Marinid Sultanate of Morocco',
      Egypt: 'Mamluk Sultanate (Cairo)',
      Turkey: 'Anatolian Beyliks & Constantinople',
      India: 'Delhi Sultanate & Malabar Coast',
      China: 'Yuan Dynasty (Zaytun & Khanbaliq)',
      Mali: 'Empire of Mali (Timbuktu)',
      Tanzania: 'Swahili Coast (Kilwa Sultanate)'
    },

    worldPlaces: [
      { name: 'Damascus', year: '1348', detail: 'Witnessed by Ibn Battuta at the height of the Black Death, where Muslims, Christians, and Jews walked together in prayer for relief.', coords: [36.2765, 33.5138] },
      { name: 'Maldives', year: '1343', detail: 'Where Ibn Battuta spent eighteen months serving as Chief Judge before sailing to Sri Lanka and China.', coords: [73.5093, 4.1755] },
      { name: 'Fez', year: '1355', detail: 'Marinid capital where Ibn Battuta dictated his Rihla to royal scribe Ibn Juzayy.', coords: [-5.0078, 34.0181] }
    ],

    sources: [
      { label: 'Ibn Battuta · The Rihla', url: 'https://www.britannica.com/biography/Ibn-Battuta' },
      { label: 'UC Berkeley · Travels of Ibn Battuta', url: 'https://orias.berkeley.edu/resources-teachers/travels-ibn-battuta' }
    ],

    stages: [
      {
        number: 1,
        roman: 'I',
        id: 'tangier',
        year: '1325',
        age: 'Age 21',
        date: '14 June 1325',
        location: 'Tangier, Marinid Morocco',
        shortPlace: 'Tangier',
        coords: [-5.834, 35.7595],
        coordText: '35°46′N, 5°50′W',
        eraKey: 'daralislam1345',
        labelPos: [-14, -4],
        alignEnd: true,
        routeCurve: 0,
        focusMultiplier: 2.0,
        title: 'Setting Out Alone for Mecca',
        prose: 'Born into a family of Berber Islamic legal scholars in Tangier, twenty-one-year-old Ibn Battuta rode out of his hometown on a donkey in June 1325 intending simply to perform the Hajj pilgrimage to Mecca. He would not return to Morocco for twenty-four years—ultimately logging roughly 117,000 kilometers across forty modern countries, three times the distance traveled by Marco Polo.',
        fact: 'His mother died of the Black Death just months before Ibn Battuta finally returned home to Tangier in 1349.',
        quote: {
          en: 'I set out alone, having neither fellow-traveler in whose companionship I might find cheer, nor caravan whose party I might join, but swayed by an overmastering impulse within me.',
          orig: '',
          provenance: 'The Rihla (1355), translated by H. A. R. Gibb'
        }
      },
      {
        number: 2,
        roman: 'II',
        id: 'cairo',
        year: '1326',
        age: 'Age 22',
        date: 'April 1326',
        location: 'Cairo, Mamluk Egypt',
        shortPlace: 'Cairo',
        coords: [31.2357, 30.0444],
        coordText: '30°03′N, 31°14′E',
        eraKey: 'daralislam1345',
        labelPos: [14, -6],
        routeCurve: 0.14,
        focusMultiplier: 1.8,
        title: 'Mother of Cities on the Nile',
        prose: 'Arriving in Alexandria and ascending the Nile to Cairo, Ibn Battuta marveled at the greatest metropolis of the western Islamic world—packed with twelve thousand water-carriers, thirty thousand mule-hirers, grand madrasas, and hospitals. There a Sufi mystic named Burhan al-Din allegedly predicted he would travel to India, Sind, and China—igniting his lifelong resolve never to travel the same road twice if he could help it.',
        fact: 'In Alexandria, Ibn Battuta saw the famous ancient Pharos Lighthouse still partially standing—only to find it completely ruined by an earthquake when he passed through again twenty-three years later.',
        quote: {
          en: 'She is the mistress of broad regions and fruitful lands, boundless in multitude of buildings, peerless in beauty and splendor.',
          orig: '',
          provenance: 'The Rihla, on Mamluk Cairo (1326)'
        }
      },
      {
        number: 3,
        roman: 'III',
        id: 'mecca',
        year: '1326',
        age: 'Age 22',
        date: 'October 1326',
        location: 'Mecca, Hejaz',
        shortPlace: 'Mecca',
        coords: [39.8262, 21.4225],
        coordText: '21°25′N, 39°50′E',
        eraKey: 'daralislam1345',
        labelPos: [14, 6],
        routeCurve: 0.14,
        focusMultiplier: 1.8,
        title: 'The Pilgrimage & Cosmopolitan Crossroads',
        prose: 'After riding through Palestine and Damascus, Ibn Battuta completed his first Hajj in Mecca in the autumn of 1326—returning to live and study there three more times over the next six years. Mecca was more than a sanctuary; it was an international crossroads where scholars, merchants, and mariners from Andalusia to Java shared routes and letters of introduction.',
        fact: 'Because educated Maliki jurists (qadis) were prized throughout the Muslim world, Ibn Battuta’s legal training acted as a universal passport—earning him robes of honor, silver, and hospitality from sultans across three continents.',
        quote: {
          en: 'The people of Mecca are distinguished by noble and kindly acts, upright character, and generous hospitality toward the poor and the stranger.',
          orig: '',
          provenance: 'The Rihla (1355), on Mecca and its pilgrims (translated by H. A. R. Gibb)'
        }
      },
      {
        number: 4,
        roman: 'IV',
        id: 'kilwa',
        year: '1331',
        age: 'Age 27',
        date: '1331',
        location: 'Kilwa Kisiwani, Swahili Coast',
        shortPlace: 'Kilwa',
        coords: [39.512, -8.96],
        coordText: '8°58′S, 39°31′E',
        eraKey: 'daralislam1345',
        labelPos: [14, 4],
        seaLeg: true,
        routeCurve: 0.18,
        focusMultiplier: 1.8,
        title: 'Monsoon Voyage to the Swahili Coast',
        prose: 'Catching the winter northeast monsoon down the Red Sea and East African coast aboard lateen-rigged dhows, Ibn Battuta visited Mogadishu, Mombasa, and the coral-stone island port of Kilwa in modern Tanzania. His eyewitness account remains our single richest medieval portrait of East Africa’s thriving Swahili gold-and-ivory trade before European arrival.',
        fact: 'Ibn Battuta praised Kilwa as “one of the finest and most substantially built towns” on earth, astonished by its tidy timbered architecture and the generosity of Sultan al-Hasan ibn Sulaiman.',
        quote: {
          en: 'Kilwa is a very fine and substantially built town, and all its buildings are of wood. Its inhabitants are constantly engaged in maritime trade.',
          orig: '',
          provenance: 'The Rihla, East African voyage (1331)'
        }
      },
      {
        number: 5,
        roman: 'V',
        id: 'constantinople',
        year: '1332',
        age: 'Age 28',
        date: '1332',
        location: 'Constantinople, Byzantine Empire',
        shortPlace: 'Constantinople',
        coords: [28.9784, 41.0082],
        coordText: '41°00′N, 28°59′E',
        eraKey: 'daralislam1345',
        labelPos: [-14, -6],
        alignEnd: true,
        routeCurve: -0.18,
        focusMultiplier: 1.8,
        title: 'Escorting a Princess to Byzantium',
        prose: 'Journeying north across Anatolia and the Golden Horde steppe of Crimea, Ibn Battuta joined the diplomatic escort of Princess Bayalun—a Byzantine princess married to the Mongol Khan Özbeg—returning to Constantinople to give birth. Granted an audience with Emperor Andronikos III, he rode past the great dome of Hagia Sophia in the last century of the Byzantine Empire.',
        fact: 'So delighted was the Byzantine Emperor by this Moroccan scholar who had seen Jerusalem, Damascus, and Cairo that he gifted Ibn Battuta a robe of honor and a saddled horse for touring the city.',
        quote: {
          en: 'The city is enormous in magnitude, divided into two parts separated by a great river, in which there is a rising and ebbing tide.',
          orig: '',
          provenance: 'The Rihla, on Constantinople and the Golden Horn (1332)'
        }
      },
      {
        number: 6,
        roman: 'VI',
        id: 'delhi',
        year: '1334',
        age: 'Age 30',
        date: '1334 – 1341',
        location: 'Delhi, Delhi Sultanate',
        shortPlace: 'Delhi',
        coords: [77.209, 28.6139],
        coordText: '28°37′N, 77°13′E',
        eraKey: 'daralislam1345',
        labelPos: [14, -8],
        routeCurve: 0.16,
        focusMultiplier: 1.8,
        title: 'Chief Judge in the Court of Delhi',
        prose: 'Trekking through Bukhara, Samarkand, and across the snowy Hindu Kush into India, Ibn Battuta entered the service of the brilliant, mercurial Sultan Muhammad bin Tughlaq in Delhi. Appointed chief qadi (judge) with an immense annual salary of 12,000 silver dinars, he lived seven opulent yet terrifying years at court—before eagerly accepting an appointment as the Sultan’s ambassador to the Emperor of China.',
        fact: 'When Ibn Battuta’s royal embassy was ambushed by rebels south of Delhi, he barely escaped by hiding in a ditch and wandering barefoot for days before reuniting with his party.',
        quote: {
          en: 'Of all men this king is the most humble and the one who most displays equity and justice—yet he is also the swiftest to shed blood.',
          orig: '',
          provenance: 'The Rihla, portrait of Sultan Muhammad bin Tughlaq (c. 1334–1341)'
        }
      },
      {
        number: 7,
        roman: 'VII',
        id: 'calicut',
        year: '1342',
        age: 'Age 38',
        date: '1342',
        location: 'Calicut (Kozhikode), Malabar Coast',
        shortPlace: 'Calicut',
        coords: [75.7804, 11.2588],
        coordText: '11°16′N, 75°47′E',
        eraKey: 'daralislam1345',
        labelPos: [-14, 6],
        alignEnd: true,
        routeCurve: 0.16,
        focusMultiplier: 1.85,
        title: 'Shipwreck on the Spice Coast',
        prose: 'Reaching the great pepper-trading port of Calicut in Kerala, Ibn Battuta loaded the Sultan’s lavish gifts for China—including warhorses, fine silks, and jewels—onto towering multi-decked Chinese junks. The very night before departure, a violent monsoon squall smashed his ship onto the rocks while he stood praying on shore—leaving him stranded with only his prayer rug and ten dinars.',
        fact: 'Afraid to face Sultan Tughlaq’s wrath empty-handed, Ibn Battuta sailed south instead to the Maldives, where he became Chief Judge, then climbed Sri Lanka’s Adam’s Peak and sailed on to Bengal and Sumatra before finally reaching China.',
        quote: {
          en: 'The port of Calicut is one of the largest in the world; merchants from China, Java, Ceylon, the Maldives, Yemen, and Persia gather there.',
          orig: '',
          provenance: 'The Rihla, on the Malabar Coast (1342)'
        }
      },
      {
        number: 8,
        roman: 'VIII',
        id: 'quanzhou',
        year: '1345',
        age: 'Age 41',
        date: '1345 – 1346',
        location: 'Quanzhou (Zaytun), Yuan China',
        shortPlace: 'Quanzhou',
        coords: [118.675, 24.874],
        coordText: '24°52′N, 118°41′E',
        eraKey: 'daralislam1345',
        labelPos: [-14, 10],
        alignEnd: true,
        seaLeg: true,
        routeCurve: 0.18,
        focusMultiplier: 1.8,
        title: 'Paper Money, Porcelain & Zaytun Harbor',
        prose: 'Landing at the bustling Fujian seaport of Quanzhou—known across the Islamic world as Zaytun, origin of the English word “satin”—Ibn Battuta found China the safest and most technologically refined land he had ever entered. He marveled at paper currency, blue-and-white porcelain, portrait artists who sketched visitors from memory, and massive four-decked ocean junks growing fresh ginger and herbs in wooden tubs on deck.',
        fact: 'In every Chinese port city, Ibn Battuta noted an autonomous Muslim quarter with its own mosque, bazaar, and qadi—and even bumped into the brother of a man he had met years earlier in Morocco.',
        quote: {
          en: 'China is the safest and best regulated of countries for a traveler. A man may go by himself a nine-months’ journey, carrying with him large sums of money, without any fear on that account.',
          orig: '',
          provenance: 'The Rihla, on Yuan Dynasty China (1345–1346)'
        }
      },
      {
        number: 9,
        roman: 'IX',
        id: 'timbuktu',
        year: '1353',
        age: 'Age 49',
        date: '1352 – 1353',
        location: 'Timbuktu & the Niger, Mali Empire',
        shortPlace: 'Timbuktu',
        coords: [-3.0026, 16.7666],
        coordText: '16°46′N, 3°00′W',
        eraKey: 'daralislam1345',
        labelPos: [-14, 6],
        alignEnd: true,
        routeCurve: -0.18,
        focusMultiplier: 1.85,
        title: 'Across the Sahara to Mali & the Rihla',
        prose: 'Even after returning home to Morocco and visiting Granada in Spain, the aging traveler answered the Marinid sultan’s call for one last expedition—crossing the blistering Sahara salt mines of Taghaza to reach the golden Mali Empire and Timbuktu in 1353. Returning to Fez in 1354, he spent a year dictating his complete memoirs, the Rihla, to court scholar Ibn Juzayy, leaving an unmatched panorama of the fourteenth-century world.',
        fact: 'Crossing the Sahara’s Taghaza salt oasis, Ibn Battuta was stunned to discover an entire desert town whose houses and mosques were built from blocks of rock salt and roofed with camel skins.',
        quote: {
          en: 'I have indeed—praise be to God—attained my desire in this world, which was to travel through the earth, and I have attained in this respect what no other person has attained to my knowledge.',
          orig: '',
          provenance: 'The Rihla, closing reflections dictated in Fez (1355)'
        }
      }
    ]
  };
})(window);
