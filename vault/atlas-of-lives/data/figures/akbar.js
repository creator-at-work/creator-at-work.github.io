/* ==========================================================================
   AKBAR THE GREAT (1542–1605) — Historical Life Atlas
   Sources: Abu’l-Fazl ibn Mubarak (Akbarnama & Ain-i-Akbari), Jahangir
            (Tuzuk-i-Jahangiri), Ira Mukhoty, Britannica
   ========================================================================== */

(function (global) {
  'use strict';

  global.ATLAS_FIGURES = global.ATLAS_FIGURES || {};

  global.ATLAS_FIGURES.akbar = {
    id: 'akbar',
    era: 'Medieval & Renaissance',
    title: 'Akbar the Great',
    fullName: 'Jalal-ud-din Muhammad Akbar',
    years: '1542 — 1605',
    subtitle: 'Umarkot to Fatehpur Sikri & Kabul',
    worldLabel: 'World of 1600',
    worldEraLabel: 'Early Modern World · Late 16th Century',
    originName: 'Umarkot',
    originCoords: [69.736, 25.361],

    viewBounds: {
      lon: [63.5, 92.5],
      lat: [17.0, 36.8]
    },

    waterLabels: [
      { name: 'ARABIAN SEA', coords: [66.5, 19.5], regionalOnly: true },
      { name: 'BAY OF BENGAL', coords: [88.5, 18.0], regionalOnly: true },
      { name: 'ATLANTIC OCEAN', coords: [-28, -4], worldOnly: true },
      { name: 'INDIAN OCEAN', coords: [78, -22], worldOnly: true },
      { name: 'PACIFIC OCEAN', coords: [-130, -8], worldOnly: true }
    ],

    defaultEraKey: 'mughal1605',
    territorySets: {
      mughal1556: {
        empireLabel: 'Restored Mughal Core (1556)',
        rivalLabel: 'Rajput, Sur, Bengal & Deccan Kingdoms',
        empire: ['Pakistan', 'Afghanistan'],
        dependent: [],
        ally: [],
        rival: ['India', 'Bangladesh']
      },
      mughal1605: {
        empireLabel: 'Mughal Empire at Akbar’s Death (1605)',
        dependentLabel: 'Allied Rajput & Vassal States',
        rivalLabel: 'Safavid Persia & Southern Deccan',
        empire: ['India', 'Pakistan', 'Bangladesh', 'Afghanistan'],
        dependent: ['Nepal'],
        ally: [],
        rival: ['Iran', 'Uzbekistan']
      }
    },

    worldRealms: [
      { id: 'safavid', name: 'Safavid Persia', desc: 'Shia Persian empire under Shah Abbas the Great, cultural and diplomatic counterpart to the Mughal court.', cssVar: '--realm-persia', countries: ['Iran', 'Azerbaijan'], label: 'SAFAVID PERSIA', labelCoords: [53.0, 33.0] },
      { id: 'ottoman', name: 'Ottoman Empire', desc: 'Ruling Anatolia, the Levant, Egypt, and the Balkans at the close of the sixteenth century.', cssVar: '--realm-ottoman', countries: ['Turkey', 'Iraq', 'Syria', 'Egypt', 'Greece'], label: 'OTTOMAN EMPIRE', labelCoords: [36.0, 37.5] },
      { id: 'ming', name: 'Ming Dynasty China', desc: 'Wanli-era China alongside the rise of Tokugawa Japan (1600).', cssVar: '--realm-qing', countries: ['China'], label: 'MING DYNASTY', labelCoords: [108.0, 34.5] },
      { id: 'europe', name: 'Elizabethan England & Habsburg Spain', desc: 'Queen Elizabeth I chartered the English East India Company in 1600; William Shakespeare was staging Hamlet in London.', cssVar: '--terr-rival', countries: ['United Kingdom', 'Spain', 'Portugal', 'France'], label: 'EARLY MODERN EUROPE', labelCoords: [4.0, 48.0] }
    ],

    historicalNames: {
      India: 'Hindustan (Mughal Empire)',
      Pakistan: 'Punjab & Sind',
      Afghanistan: 'Subah of Kabul & Qandahar',
      Bangladesh: 'Subah of Bengal',
      Iran: 'Safavid Empire of Persia'
    },

    worldPlaces: [
      { name: 'London', year: '1600', detail: 'Queen Elizabeth I granted the East India Company charter while Akbar’s India produced nearly a quarter of global economic output.', coords: [-0.1278, 51.5074] },
      { name: 'Isfahan', year: '1598', detail: 'Newly designated jewel capital of Shah Abbas I’s Safavid Persia.', coords: [51.666, 32.6539] },
      { name: 'Goa', year: '1580', detail: 'Portuguese enclave from which Jesuit scholars traveled north to debate at Akbar’s Ibadat Khana.', coords: [73.8567, 15.4909] }
    ],

    sources: [
      { label: 'Abu’l-Fazl · Akbarnama & Ain-i-Akbari', url: 'https://www.britannica.com/biography/Akbar' },
      { label: 'Encyclopaedia Iranica', url: 'https://iranicaonline.org/articles/akbar' }
    ],

    stages: [
      {
        number: 1,
        roman: 'I',
        id: 'umarkot',
        year: '1542',
        age: 'Birth',
        date: '15 October 1542',
        location: 'Umarkot, Thar Desert (Sind)',
        shortPlace: 'Umarkot',
        coords: [69.736, 25.361],
        coordText: '25°22′N, 69°44′E',
        eraKey: 'mughal1556',
        labelPos: [-15, 6],
        alignEnd: true,
        routeCurve: 0,
        focusMultiplier: 1.55,
        title: 'Born in Desert Exile',
        prose: 'Akbar was born not in a marble palace, but in a Rajput desert fortress at Umarkot while his father, Emperor Humayun, fled across Sind as a dethroned fugitive. Growing up amid mountain campaigns in Afghanistan and Persia, Akbar never learned to read or write—yet he developed an astonishing memory, insisting books be read aloud to him nightly and amassing an imperial library of 24,000 illuminated manuscripts.',
        fact: 'Celebrating his newborn son with almost no treasury left, Humayun broke open a single pod of musk and distributed it to his followers, praying his son’s fame would spread across the world like its fragrance.',
        quote: {
          en: 'A monarch should be ever intent on conquest, otherwise his neighbors rise in arms against him.',
          orig: '',
          provenance: 'Sayings of His Majesty, recorded by Abu’l-Fazl in Ain-i-Akbari (Book III)'
        }
      },
      {
        number: 2,
        roman: 'II',
        id: 'kalanaur',
        year: '1556',
        age: 'Age 13',
        date: '14 February 1556',
        location: 'Kalanaur, Punjab',
        shortPlace: 'Kalanaur',
        coords: [75.154, 32.012],
        coordText: '32°01′N, 75°09′E',
        eraKey: 'mughal1556',
        labelPos: [14, -6],
        routeCurve: -0.16,
        focusMultiplier: 1.55,
        title: 'A Brick Platform Throne at Thirteen',
        prose: 'When Humayun died suddenly after slipping down his library stairs in Delhi in January 1556, thirteen-year-old Akbar was on campaign in the Punjab. Hurriedly enthroned atop a simple brick garden platform (Takht-i-Akbari) at Kalanaur under regent Bairam Khan, the boy emperor inherited a fragile realm surrounded by far stronger rivals.',
        fact: 'That humble masonry coronation platform still survives in Kalanaur today—a stark contrast to the sandstone and marble grandeur Akbar later built across northern India.',
        quote: {
          en: 'The pursuit of reason and rejection of traditionalism are so brilliantly patent as to be above the need of argument.',
          orig: '',
          provenance: 'Recorded by Abu’l-Fazl in Ain-i-Akbari (Sayings of Akbar)'
        }
      },
      {
        number: 3,
        roman: 'III',
        id: 'panipat',
        year: '1556',
        age: 'Age 14',
        date: '5 November 1556',
        location: 'Panipat, Haryana',
        shortPlace: 'Panipat',
        coords: [76.9635, 29.3909],
        coordText: '29°23′N, 76°58′E',
        eraKey: 'mughal1556',
        labelPos: [14, -4],
        routeCurve: 0.14,
        focusMultiplier: 1.55,
        title: 'Second Battle of Panipat',
        prose: 'Nine months after his coronation, Akbar’s outnumbered Mughal army met the vast war-elephant force of Hemu—who had just captured Delhi—on the historic plain of Panipat. Just as Hemu’s charge threatened to break the Mughal wings, a stray arrow struck Hemu in the eye; his army panicked and collapsed, securing Hindustan for the Mughal dynasty for the next three centuries.',
        fact: 'Within six years of Panipat, Akbar ended Bairam Khan’s regency, abolished the pilgrimage tax on Hindus (1563) and the jizya poll tax on non-Muslims (1564), and married Rajput princess Harkha Bai (Mariam-uz-Zamani)—transforming defeated foes into loyal imperial partners.',
        quote: {
          en: 'Never did he allow religious fanaticism to stand in the way of political wisdom or human sympathy.',
          orig: '',
          provenance: 'Jahangir, Tuzuk-i-Jahangiri (Memoirs of his son, reflecting on Akbar’s rule)'
        }
      },
      {
        number: 4,
        roman: 'IV',
        id: 'chittorgarh',
        year: '1568',
        age: 'Age 25',
        date: 'October 1567 – February 1568',
        location: 'Chittorgarh, Rajasthan',
        shortPlace: 'Chittorgarh',
        coords: [74.6269, 24.8887],
        coordText: '24°53′N, 74°38′E',
        eraKey: 'mughal1605',
        labelPos: [14, 4],
        routeCurve: 0.16,
        focusMultiplier: 1.55,
        title: 'Siege of Chittorgarh & Rajput Integration',
        prose: 'While most Rajput kingdoms joined Akbar’s imperial alliance with full autonomy and top military ranks, the proud hill fortress of Chittorgarh in Mewar resisted fiercely for four months. Akbar built covered siege trenches (sabats) up the cliffside and breached the walls in February 1568—a bloody turning point that broke Rajput resistance across northern India while leaving a dark mark on his record.',
        fact: 'Deeply moved by the valor of Chittorgarh’s defenders Jaimal and Patta, Akbar commissioned two monumental carved stone statues of them mounted on elephants outside the Delhi Gate of Agra Fort.',
        quote: {
          en: 'He who seeks the good of all peoples makes the whole world his kindred.',
          orig: '',
          provenance: 'Principle of Sulh-i-Kul (“Peace with All”), articulated in Abu’l-Fazl’s Akbarnama'
        }
      },
      {
        number: 5,
        roman: 'V',
        id: 'gujarat',
        year: '1573',
        age: 'Age 30',
        date: '1572 – September 1573',
        location: 'Ahmedabad & Surat, Gujarat',
        shortPlace: 'Gujarat',
        coords: [72.5714, 23.0225],
        coordText: '23°01′N, 72°34′E',
        eraKey: 'mughal1605',
        labelPos: [-15, 8],
        alignEnd: true,
        routeCurve: 0.14,
        focusMultiplier: 1.55,
        title: 'Reaching the Sea & the Nine-Day Forced March',
        prose: 'Conquering the prosperous maritime province of Gujarat gave the landlocked Mughal Empire direct access to Indian Ocean commerce, silver bullion, and European traders at Surat. When rebels rose in Ahmedabad months later, Akbar stunned India by racing nearly 1,000 kilometers from Fatehpur Sikri on racing camels in just nine days—crushing the revolt before the rebels believed he had left his capital.',
        fact: 'On Gujarat’s coast at Cambay, thirty-year-old Akbar saw the ocean for the first time in his life and sailed out in a ship to inspect the waves.',
        quote: {
          en: 'So rapid was the Emperor’s march from Fatehpur to Ahmedabad that rumor itself could not outrun his dust.',
          orig: '',
          provenance: 'Abu’l-Fazl, Akbarnama (account of the 1573 Gujarat lightning campaign)'
        }
      },
      {
        number: 6,
        roman: 'VI',
        id: 'fatehpur',
        year: '1575',
        age: 'Age 32',
        date: '1571 – 1605',
        location: 'Fatehpur Sikri & Agra, Uttar Pradesh',
        shortPlace: 'Fatehpur Sikri',
        coords: [77.6679, 27.0945],
        coordText: '27°06′N, 77°40′E',
        eraKey: 'mughal1605',
        labelPos: [14, 4],
        routeCurve: -0.18,
        focusMultiplier: 1.6,
        title: 'The Hall of Worship & Sulh-i-Kul',
        prose: 'Carved out of red sandstone near Agra, Akbar’s ceremonial capital of Fatehpur Sikri housed the Ibadat Khana (Hall of Worship), where he convened Thursday-night debates among Sunni and Shia scholars, Hindu pandits, Jain monks, Zoroastrian priests, and Portuguese Jesuits. Out of these dialogues emerged his guiding state philosophy of Sulh-i-Kul (“Universal Peace”) and a golden age of Indo-Persian art, music under Tansen, and administration under Todar Mal.',
        fact: 'Akbar’s revenue minister Raja Todar Mal instituted a standardized ten-year land-measurement and crop-yield tax system (Zabt) so effective that British colonial administrators kept its core vocabulary and structure centuries later.',
        quote: {
          en: 'No man should be interfered with on account of religion, and anyone is to be allowed to go over to a religion that pleases him.',
          orig: '',
          provenance: 'Imperial decree of 1594, recorded by historian Bada’uni & Abu’l-Fazl'
        },
        subTabsLabel: 'Imperial capitals:',
        subStages: [
          {
            label: '1575 · Fatehpur Sikri',
            year: '1575',
            age: 'Age 32',
            date: '1571 – 1585',
            title: 'The Hall of Worship & Sulh-i-Kul',
            prose: 'Carved out of red sandstone near Agra, Akbar’s ceremonial capital of Fatehpur Sikri housed the Ibadat Khana (Hall of Worship), where he convened Thursday-night debates among Sunni and Shia scholars, Hindu pandits, Jain monks, Zoroastrian priests, and Portuguese Jesuits. Out of these dialogues emerged his guiding state philosophy of Sulh-i-Kul (“Universal Peace”) and a golden age of Indo-Persian art, music under Tansen, and administration under Todar Mal.',
            fact: 'Akbar’s revenue minister Raja Todar Mal instituted a standardized ten-year land-measurement and crop-yield tax system (Zabt) so effective that British colonial administrators kept its core vocabulary and structure centuries later.',
            quote: {
              en: 'No man should be interfered with on account of religion, and anyone is to be allowed to go over to a religion that pleases him.',
              orig: '',
              provenance: 'Imperial decree of 1594, recorded by Abu’l-Fazl & Bada’uni'
            }
          },
          {
            label: '1605 · Agra & Sikandra',
            year: '1605',
            age: 'Age 63',
            date: '27 October 1605',
            title: 'An Empire of One Hundred Million',
            prose: 'Spending his final years in Agra Fort after a fifty-year reign that tripled his empire’s territory—spanning Afghanistan, Kashmir, Bengal, Gujarat, and the northern Deccan—Akbar died of dysentery in October 1605. He left behind a stable, meritocratic bureaucratic system (the Mansabdari) and a pluralistic cultural synthesis that shaped South Asia permanently.',
            fact: 'Akbar personally designed his own sandstone-and-marble mausoleum at Sikandra near Agra, blending Islamic arches, Hindu chhatri pavilions, and Buddhist-inspired terraced stories in one harmonious monument.',
            quote: {
              en: 'In his dominions, professors of various faiths had room, as in the broad expanse of the outstretched sky.',
              orig: '',
              provenance: 'Emperor Jahangir, Tuzuk-i-Jahangiri (1605)'
            }
          }
        ]
      },
      {
        number: 7,
        roman: 'VII',
        id: 'kabul',
        year: '1581',
        age: 'Age 38',
        date: '1581 – 1598',
        location: 'Kabul & the Northwest Frontier',
        shortPlace: 'Kabul',
        coords: [69.1723, 34.5553],
        coordText: '34°33′N, 69°10′E',
        eraKey: 'mughal1605',
        labelPos: [-15, -4],
        alignEnd: true,
        routeCurve: -0.16,
        focusMultiplier: 1.5,
        title: 'Securing the Khyber & the North',
        prose: 'When his half-brother Mirza Hakim invaded Punjab from Afghanistan, Akbar led 50,000 cavalry across the Indus and through the Khyber Pass into Kabul in 1581, reuniting his ancestral Timurid base with Hindustan. Moving his court to Lahore for thirteen years (1585–1598), he absorbed Kashmir, Sind, and Balochistan, giving the empire natural mountain borders from the Hindu Kush to the Bay of Bengal.',
        fact: 'On his march to Kabul, Akbar brought along Jesuit priest Father Antonio Monserrate to tutor his sons and record the journey—producing Europe’s first detailed eye-witness map of the Himalayan foothills and northern India.',
        quote: {
          en: 'True sovereignty consists in protecting the weak and administering impartial justice to every subject.',
          orig: '',
          provenance: 'Abu’l-Fazl, Ain-i-Akbari (Imperial Maxims)'
        }
      }
    ]
  };
})(window);
