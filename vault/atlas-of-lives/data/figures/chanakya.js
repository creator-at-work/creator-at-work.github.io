/* ==========================================================================
   CHANAKYA / KAUTILYA (c. 375–283 BCE) — Historical Life Atlas
   Sources: Kautilya’s Arthashastra (tr. R. P. Kangle & Patrick Olivelle),
            Vishakhadatta (Mudrarakshasa), Mahavamsa, Britannica
   ========================================================================== */

(function (global) {
  'use strict';

  global.ATLAS_FIGURES = global.ATLAS_FIGURES || {};

  global.ATLAS_FIGURES.chanakya = {
    id: 'chanakya',
    era: 'Antiquity',
    title: 'Chanakya (Kautilya)',
    fullName: 'Acharya Chanakya · Kautilya · Vishnugupta',
    years: 'c. 375 — 283 BCE',
    subtitle: 'Takshashila to Pataliputra & the Arthashastra',
    worldLabel: 'World of 305 BCE',
    worldEraLabel: 'Classical Eurasia · c. 320–300 BCE',
    originName: 'Takshashila',
    originCoords: [72.833, 33.746],

    viewBounds: {
      lon: [65.5, 91.5],
      lat: [17.5, 36.2]
    },

    waterLabels: [
      { name: 'ARABIAN SEA', coords: [67.0, 19.5], regionalOnly: true },
      { name: 'BAY OF BENGAL', coords: [88.5, 18.2], regionalOnly: true },
      { name: 'ATLANTIC OCEAN', coords: [-28, -4], worldOnly: true },
      { name: 'INDIAN OCEAN', coords: [78, -22], worldOnly: true },
      { name: 'PACIFIC OCEAN', coords: [-130, -8], worldOnly: true }
    ],

    defaultEraKey: 'maurya305',
    territorySets: {
      nanda325: {
        empireLabel: 'Nanda Empire (Magadha)',
        dependentLabel: 'Northwestern Mahajanapadas (Gandhara)',
        rivalLabel: 'Macedonian Frontier',
        empire: ['India', 'Bangladesh', 'Nepal'],
        dependent: ['Pakistan'],
        ally: [],
        rival: ['Afghanistan', 'Iran']
      },
      maurya305: {
        empireLabel: 'Maurya Empire Designed by Chanakya (c. 305 BCE)',
        dependentLabel: 'Southern Kingdoms (Allied & Tributary)',
        rivalLabel: 'Seleucid Empire',
        empire: ['India', 'Pakistan', 'Bangladesh', 'Nepal', 'Afghanistan'],
        dependent: ['Sri Lanka'],
        ally: [],
        rival: ['Iran', 'Iraq', 'Syria', 'Turkey']
      }
    },

    worldRealms: [
      { id: 'seleucid', name: 'Seleucid Empire', desc: 'Hellenistic successor empire to Alexander spanning Iran, Mesopotamia, and Syria—whose envoy Megasthenes recorded Mauryan administration in Pataliputra.', cssVar: '--realm-persia', countries: ['Iran', 'Iraq', 'Syria', 'Turkey', 'Turkmenistan'], label: 'SELEUCID EMPIRE', labelCoords: [50.0, 33.0] },
      { id: 'warring', name: 'Warring States China', desc: 'Age of Legalist and Mohist statecraft (Shang Yang, Han Feizi) developing parallel administrative philosophies to Kautilya.', cssVar: '--realm-qing', countries: ['China'], label: 'WARRING STATES', labelCoords: [108.0, 34.5] },
      { id: 'ptolemaic', name: 'Ptolemaic Egypt', desc: 'Hellenistic kingdom on the Nile founding the Great Library of Alexandria.', cssVar: '--realm-ottoman', countries: ['Egypt', 'Libya'], label: 'PTOLEMAIC EGYPT', labelCoords: [28.0, 26.5] },
      { id: 'rome', name: 'Roman Republic', desc: 'Expanding across central Italy during the Samnite Wars.', cssVar: '--terr-rival', countries: ['Italy'], label: 'ROMAN REPUBLIC', labelCoords: [13.5, 42.5] }
    ],

    historicalNames: {
      India: 'Jambudvipa (Maurya Empire · Magadha)',
      Pakistan: 'Gandhara & Takshashila',
      Afghanistan: 'Arachosia & Paropamisadae',
      Iran: 'Seleucid Persia',
      Iraq: 'Babylonia (Seleucia)'
    },

    worldPlaces: [
      { name: 'Athens', year: '322 BCE', detail: 'Aristotle was lecturing on politics at the Lyceum in the exact same decades Chanakya was crafting the Mauryan state.', coords: [23.7275, 37.9838] },
      { name: 'Babylon', year: '323 BCE', detail: 'Death of Alexander the Great—creating the power vacuum in Punjab that Chanakya and Chandragupta swiftly exploited.', coords: [44.421, 32.536] },
      { name: 'Xianyang', year: '305 BCE', detail: 'Capital of China’s State of Qin, where Legalist ministers were centralizing bureaucracy in striking parallel to the Arthashastra.', coords: [108.709, 34.329] }
    ],

    sources: [
      { label: 'Kautilya · Arthashastra', url: 'https://www.britannica.com/biography/Kautilya' },
      { label: 'Encyclopedia of Philosophy · Arthashastra', url: 'https://www.britannica.com/topic/Arthashastra' }
    ],

    stages: [
      {
        number: 1,
        roman: 'I',
        id: 'takshashila',
        year: '350 BCE',
        age: 'c. Age 25',
        date: 'c. 350 – 326 BCE',
        location: 'Takshashila (Taxila), Gandhara',
        shortPlace: 'Takshashila',
        coords: [72.833, 33.746],
        coordText: '33°45′N, 72°50′E',
        eraKey: 'nanda325',
        labelPos: [-15, -4],
        alignEnd: true,
        routeCurve: 0,
        focusMultiplier: 1.55,
        title: 'Acharya of Statecraft at Takshashila',
        prose: 'Educated and appointed acharya (master teacher) of political economy, law, and strategy at the ancient university city of Takshashila on the northwestern crossroads of India, Chanakya watched with alarm as fragmented Indian kingdoms failed to unite against Alexander the Great’s approaching legions. Seeing extraordinary leadership in a young boy named Chandragupta, he trained him for nearly a decade in warfare, statecraft, and diplomacy.',
        fact: 'Takshashila attracted students from across Asia in medicine, astronomy, logic, and military science—and its strategic location at the Khyber frontier convinced Chanakya that only a unified subcontinental state could defend India.',
        quote: {
          en: 'In the happiness of his subjects lies the king’s happiness; in their welfare his welfare. He shall not consider as good only that which pleases him, but treat as beneficial whatever pleases his subjects.',
          orig: 'प्रजासुखे सुखं राज्ञः प्रजानां च हिते हितम्।',
          origLang: 'संस्कृतम्',
          provenance: 'Kautilya, Arthashastra, Book I, Chapter 19 (1.19.34)'
        }
      },
      {
        number: 2,
        roman: 'II',
        id: 'pataliputra',
        year: '325 BCE',
        age: 'c. Age 50',
        date: 'c. 325 – 297 BCE',
        location: 'Pataliputra (Patna), Magadha',
        shortPlace: 'Pataliputra',
        coords: [85.1376, 25.5941],
        coordText: '25°36′N, 85°08′E',
        eraKey: 'nanda325',
        labelPos: [14, -4],
        routeCurve: 0.16,
        focusMultiplier: 1.6,
        title: 'The Unbound Shikha & Architect of Empire',
        prose: 'Traveling east to warn the wealthy, arrogant Nanda king Dhana Nanda of the Macedonian threat—only to be mocked and ejected from the royal court—Chanakya famously untied his hair tuft (shikha) and swore never to bind it until the Nanda dynasty was overthrown. Within five years he returned to Pataliputra as chief minister to Emperor Chandragupta, designing the administrative machinery of India’s first pan-subcontinental empire.',
        fact: 'Rather than executing the deposed Nanda dynasty’s brilliant prime minister Rakshasa, Chanakya spent months outwitting him through covert diplomacy to persuade Rakshasa to serve the new Maurya Empire—immortalized in the classical Sanskrit drama Mudrarakshasa.',
        quote: {
          en: 'Artha [material well-being] is the most important; for dharma [righteousness] and kama [pleasure] are both dependent on it.',
          orig: 'अर्थ एव प्रधान इति कौटिल्यः।',
          origLang: 'संस्कृतम्',
          provenance: 'Kautilya, Arthashastra, Book I, Chapter 7 (1.7.6–7)'
        },
        subTabsLabel: 'Pataliputra chapters:',
        subStages: [
          {
            label: 'c. 325 BCE · The Vow',
            year: '325 BCE',
            age: 'c. Age 50',
            date: 'c. 325 BCE',
            eraKey: 'nanda325',
            title: 'Insult at the Nanda Court',
            prose: 'Traveling east to urge Magadha’s powerful king Dhana Nanda to defend India’s western border—only to be humiliated and dragged from the court—Chanakya unbound his shikha hair knot and vowed to topple the corrupt Nanda regime and replace it with a principled sovereign trained in rajadharma.',
            fact: 'Classical Buddhist, Jain, and Brahmanical chronicles—despite differing on religious details—all independently agree on Chanakya’s central role as the strategist behind Chandragupta’s overthrow of the Nandas.',
            quote: {
              en: 'A single wheel does not turn a chariot; therefore a king should appoint wise counselors and listen to their counsel.',
              orig: 'सहायसाध्यं राजत्वं चक्रमेकं न वर्तते।',
              origLang: 'संस्कृतम्',
              provenance: 'Kautilya, Arthashastra, Book I, Chapter 7 (1.7.9)'
            }
          },
          {
            label: 'c. 310 BCE · The Arthashastra',
            year: '310 BCE',
            age: 'c. Age 65',
            date: 'c. 321 – 297 BCE',
            eraKey: 'maurya305',
            title: 'Masterwork of Political Economy & Realism',
            prose: 'Serving as royal counselor in Pataliputra, Kautilya composed or inspired the Arthashastra—a 15-book, 150-chapter treatise covering taxation, standardized weights, consumer protection, forest conservation, espionage, foreign-policy circles (Mandala theory), and legal rights of women and laborers. Lost for centuries, a complete palm-leaf manuscript was rediscovered in Mysore in 1905, astonishing historians worldwide.',
            fact: 'Max Weber marveled that the Arthashastra was “radically Machiavellian” nineteen centuries before Machiavelli—yet paired unsentimental geopolitical realism with strict anti-corruption audits and public welfare duties.',
            quote: {
              en: 'Just as it is impossible not to taste honey or poison that one may find at the tip of one’s tongue, so it is impossible for a government official not to eat up at least a bit of the king’s revenue.',
              orig: '',
              provenance: 'Kautilya, Arthashastra, Book II, Chapter 9 (2.9.32), on auditing officials'
            }
          }
        ]
      },
      {
        number: 3,
        roman: 'III',
        id: 'vindhya',
        year: '324 BCE',
        age: 'c. Age 51',
        date: 'c. 324 BCE',
        location: 'Vindhya Forests, Central India',
        shortPlace: 'Vindhya Hills',
        coords: [78.4, 22.8],
        coordText: '22°48′N, 78°24′E',
        eraKey: 'nanda325',
        labelPos: [14, 8],
        routeCurve: 0.16,
        focusMultiplier: 1.55,
        title: 'Lesson of the Hot Gruel & Raising an Army',
        prose: 'Retreating to the forested Vindhya highlands after an initial premature assault on the Nanda heartland failed, Chanakya rebuilt his coalition—recruiting forest tribes, mountain clans, and disaffected frontier chieftains. Tradition recalls him learning strategic patience by overhearing a village mother scold her child for eating hot porridge from the scalding center instead of starting around the cooler edges.',
        fact: 'Applying that exact “outer-edge” strategy, Chanakya stopped attacking Magadha’s heavily fortified center and instead systematically won over border garrisons and supply routes first.',
        quote: {
          en: 'Before you begin a great undertaking, examine first the strength and weakness of both yourself and your adversary, the terrain, the season, and the treasury.',
          orig: '',
          provenance: 'Kautilya, Arthashastra, Book IX, Chapter 1 (principles of campaign planning)'
        }
      },
      {
        number: 4,
        roman: 'IV',
        id: 'punjab',
        year: '322 BCE',
        age: 'c. Age 53',
        date: 'c. 323 – 321 BCE',
        location: 'Indus & Punjab Frontier',
        shortPlace: 'Punjab',
        coords: [74.35, 31.52],
        coordText: '31°31′N, 74°21′E',
        eraKey: 'maurya305',
        labelPos: [14, -6],
        routeCurve: -0.16,
        focusMultiplier: 1.55,
        title: 'Ousting the Macedonian Satraps',
        prose: 'Seizing the chaos following Alexander the Great’s sudden death in Babylon in 323 BCE, Chanakya orchestrated a swift diplomatic and military campaign across Punjab and Sind. Forging an alliance with Himalayan king Parvataka, he neutralized Alexander’s remaining Greek governors—turning the liberated northwest into the springboard that marched down the Ganges to capture Pataliputra.',
        fact: 'Chanakya articulated the famous Mandala (“Circle of Kings”) doctrine of foreign policy: “Your immediate neighbor is a natural rival, and your neighbor’s neighbor is a natural ally”—a foundational concept in modern international relations.',
        quote: {
          en: 'The king who is situated anywhere immediately on the circumference of the conqueror’s territory is termed the enemy; he who is situated close to the enemy, but separated from the conqueror only by the enemy, is termed the friend.',
          orig: '',
          provenance: 'Kautilya, Arthashastra, Book VI, Chapter 2 (6.2.19–20 · Mandala Theory)'
        }
      },
      {
        number: 5,
        roman: 'V',
        id: 'saurashtra',
        year: '305 BCE',
        age: 'c. Age 70',
        date: 'c. 310 – 300 BCE',
        location: 'Girnar (Saurashtra), Gujarat',
        shortPlace: 'Saurashtra',
        coords: [70.4579, 21.5222],
        coordText: '21°31′N, 70°27′E',
        eraKey: 'maurya305',
        labelPos: [-15, 6],
        alignEnd: true,
        routeCurve: 0.16,
        focusMultiplier: 1.55,
        title: 'Public Works, Trade & the Regulated State',
        prose: 'Extending Mauryan governance all the way to the Arabian Sea ports of Saurashtra, Chanakya’s statecraft linked distant provinces through royal highways (the Uttarapatha), state-supervised mints, customs tariffs, and monumental irrigation works like the Sudarshana Reservoir at Girnar. Rather than leaving provinces to feudal whim, salaried superintendents audited agriculture, mining, shipping, and weights under unified imperial law.',
        fact: 'The Arthashastra prescribes strict environmental and civic laws remarkably ahead of their time: heavy fines for dumping waste in city streets, protected elephant sanctuaries, and tax exemptions for farmers who built new irrigation tanks.',
        quote: {
          en: 'The root of wealth is economic activity, and lack of it brings material distress. Without active enterprise, both current prosperity and future gains are destroyed.',
          orig: '',
          provenance: 'Kautilya, Arthashastra, Book I, Chapter 19 (1.19.35–36)'
        }
      },
      {
        number: 6,
        roman: 'VI',
        id: 'kashi',
        year: '283 BCE',
        age: 'c. Age 92',
        date: 'c. 297 – 283 BCE',
        location: 'Kashi & the Ganges Retreat',
        shortPlace: 'Kashi',
        coords: [82.9739, 25.3176],
        coordText: '25°19′N, 82°58′E',
        eraKey: 'maurya305',
        labelPos: [-15, 10],
        alignEnd: true,
        routeCurve: -0.16,
        focusMultiplier: 1.6,
        title: 'The Minister in a Mud Cottage',
        prose: 'After guiding Chandragupta through the decisive 305 BCE treaty with Seleucus I Nicator—which gained Afghanistan and Balochistan for the Mauryas—Chanakya stayed on to mentor Chandragupta’s son Bindusara during the delicate dynastic transition. Refusing palace luxury even at the pinnacle of imperial power, he lived in austere simplicity until retiring from politics in deep old age.',
        fact: 'A famous legend notes that when foreign envoys visited Chanakya’s modest hut at dusk, he extinguished the lamp fueled by state oil and lit a smaller lamp bought with his own money the instant their talk turned from imperial business to personal conversation.',
        quote: {
          en: 'A wise king, trained in politics, though possessing a small territory, will conquer the whole earth with the help of the best elements of his sovereignty, and will never be defeated.',
          orig: '',
          provenance: 'Kautilya, Arthashastra, Book VI, Chapter 1 (6.1.18)'
        }
      }
    ]
  };
})(window);
