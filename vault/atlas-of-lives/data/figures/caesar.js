/* ==========================================================================
   JULIUS CAESAR (100–44 BCE) — Historical Life Atlas
   Sources: Julius Caesar (Commentarii de Bello Gallico & Bello Civili),
            Suetonius (Divus Julius), Plutarch (Life of Caesar), Britannica
   ========================================================================== */

(function (global) {
  'use strict';

  global.ATLAS_FIGURES = global.ATLAS_FIGURES || {};

  global.ATLAS_FIGURES.caesar = {
    id: 'caesar',
    era: 'Antiquity',
    title: 'Julius Caesar',
    fullName: 'Gaius Julius Caesar',
    years: '100 — 44 BCE',
    subtitle: 'Rome to Gaul, Egypt & the Senate',
    worldLabel: 'World of 44 BCE',
    worldEraLabel: 'Mediterranean World · 1st Century BCE',
    originName: 'Rome',
    originCoords: [12.4964, 41.9028],

    viewBounds: {
      lon: [-8.5, 34.0],
      lat: [29.5, 53.5]
    },

    waterLabels: [
      { name: 'MARE NOSTRUM (MEDITERRANEAN)', coords: [15.5, 35.0], regionalOnly: true },
      { name: 'GALLIC OCEAN', coords: [-6.0, 46.5], regionalOnly: true },
      { name: 'ATLANTIC OCEAN', coords: [-28, -4], worldOnly: true },
      { name: 'INDIAN OCEAN', coords: [78, -22], worldOnly: true },
      { name: 'PACIFIC OCEAN', coords: [-130, -8], worldOnly: true }
    ],

    defaultEraKey: 'republic44',
    territorySets: {
      republic100: {
        empireLabel: 'Roman Republic (100 BCE)',
        rivalLabel: 'Independent Gaul & Hellenistic East',
        empire: ['Italy', 'Spain', 'Portugal', 'Greece', 'Macedonia', 'Tunisia', 'Turkey'],
        dependent: [],
        ally: [],
        rival: ['France', 'Belgium', 'Egypt', 'Syria']
      },
      gaul52: {
        empireLabel: 'Roman Republic & Gallic Conquests',
        dependentLabel: 'Client Kingdoms',
        rivalLabel: 'Parthian Empire',
        empire: ['Italy', 'Spain', 'Portugal', 'France', 'Belgium', 'Switzerland', 'Greece', 'Macedonia', 'Turkey', 'Syria', 'Tunisia', 'Libya'],
        dependent: ['Egypt'],
        ally: [],
        rival: ['Iraq', 'Iran']
      },
      republic44: {
        empireLabel: 'Roman Republic under Caesar (44 BCE)',
        dependentLabel: 'Ptolemaic Egypt (Allied Client)',
        rivalLabel: 'Parthian Empire',
        empire: ['Italy', 'France', 'Belgium', 'Switzerland', 'Spain', 'Portugal', 'Greece', 'Macedonia', 'Croatia', 'Slovenia', 'Turkey', 'Syria', 'Lebanon', 'Israel', 'Palestine', 'Tunisia', 'Libya', 'Algeria'],
        dependent: ['Egypt'],
        ally: [],
        rival: ['Iraq', 'Iran']
      }
    },

    worldRealms: [
      { id: 'parthia', name: 'Parthian Empire', desc: 'Formidable Iranian rival that had destroyed Crassus’s legions at Carrhae in 53 BCE; Caesar was preparing to campaign against Parthia when assassinated.', cssVar: '--realm-persia', countries: ['Iran', 'Iraq', 'Turkmenistan'], label: 'PARTHIAN EMPIRE', labelCoords: [52.0, 33.5] },
      { id: 'han', name: 'Western Han Dynasty', desc: 'Imperial China at the height of Silk Road expansion into Central Asia.', cssVar: '--realm-qing', countries: ['China'], label: 'HAN DYNASTY', labelCoords: [108.0, 34.5] },
      { id: 'satavahana', name: 'Satavahana & Shaka India', desc: 'Flourishing trade powers linking Indian ports directly to Roman Egypt across the Arabian Sea.', cssVar: '--realm-maratha', countries: ['India'], label: 'SATAVAHANA INDIA', labelCoords: [79.0, 21.0] },
      { id: 'germania', name: 'Germanic Tribes', desc: 'Independent tribes beyond the Rhine River, crossed twice by Caesar’s timber bridges.', cssVar: '--realm-ottoman', countries: ['Germany', 'Poland'], label: 'GERMANIA', labelCoords: [13.5, 51.5] }
    ],

    historicalNames: {
      Italy: 'Italia (Heartland of the Republic)',
      France: 'Gallia Transalpina (Gaul)',
      Spain: 'Hispania Ulterior & Citerior',
      'United Kingdom': 'Britannia',
      Greece: 'Macedonia & Achaea',
      Egypt: 'Ptolemaic Kingdom of Egypt',
      Turkey: 'Asia, Bithynia & Pontus'
    },

    worldPlaces: [
      { name: 'Zela (Pontus)', year: '47 BCE', detail: 'Site of Caesar’s five-day victory over Pharnaces II, summarized in three Latin words: Veni, vidi, vici.', coords: [35.887, 40.303] },
      { name: 'Chang’an', year: '44 BCE', detail: 'Capital of the Western Han Empire, terminus of the newly opened Silk Road.', coords: [108.9398, 34.3416] },
      { name: 'Ctesiphon', year: '44 BCE', detail: 'Winter capital of the Parthian Empire on the Tigris.', coords: [44.581, 33.093] }
    ],

    sources: [
      { label: 'Caesar · Commentarii', url: 'https://www.britannica.com/biography/Julius-Caesar-Roman-ruler' },
      { label: 'Suetonius · Divus Julius', url: 'https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Suetonius/12Caesars/Julius*.html' }
    ],

    stages: [
      {
        number: 1,
        roman: 'I',
        id: 'rome',
        year: '100 BCE',
        age: 'Birth',
        date: '12 July 100 BCE',
        location: 'Rome, Roman Republic',
        shortPlace: 'Rome',
        coords: [12.4964, 41.9028],
        coordText: '41°54′N, 12°30′E',
        eraKey: 'republic100',
        labelPos: [-15, 6],
        alignEnd: true,
        routeCurve: 0,
        focusMultiplier: 1.6,
        title: 'Patrician Born in the Subura',
        prose: 'Born into the ancient but politically faded patrician clan of the Julii in Rome’s crowded Subura district, Caesar came of age during the bloody civil wars of Marius and Sulla. Refusing dictator Sulla’s order to divorce his wife Cornelia, the teenager fled into hiding—only spared after noble relatives begged for his life.',
        fact: 'Sulla reluctantly pardoned the nineteen-year-old Caesar with an eerie warning to his senators: “In this Caesar there are many Mariuses.”',
        quote: {
          en: 'I had rather be first in a village than second at Rome.',
          orig: '',
          provenance: 'Remark while crossing an Alpine town, recorded in Plutarch’s Life of Caesar (11.2)'
        },
        subTabsLabel: 'Rome chapters:',
        subStages: [
          {
            label: '100 BCE · Birth',
            year: '100 BCE',
            age: 'Birth',
            date: '12 July 100 BCE',
            eraKey: 'republic100',
            title: 'Patrician Born in the Subura',
            prose: 'Born into the ancient but politically faded patrician clan of the Julii in Rome’s crowded Subura district, Caesar came of age during the bloody civil wars of Marius and Sulla. Refusing dictator Sulla’s order to divorce his wife Cornelia, the teenager fled into hiding—only spared after noble relatives begged for his life.',
            fact: 'Sulla reluctantly pardoned the nineteen-year-old Caesar with an eerie warning to his senators: “In this Caesar there are many Mariuses.”',
            quote: {
              en: 'I had rather be first in a village than second at Rome.',
              orig: '',
              provenance: 'Remark while crossing an Alpine town, recorded in Plutarch’s Life of Caesar (11.2)'
            }
          },
          {
            label: '44 BCE · Ides of March',
            year: '44 BCE',
            age: 'Age 55',
            date: '15 March 44 BCE',
            eraKey: 'republic44',
            title: 'Dictator Perpetuo & the Ides of March',
            prose: 'Victorious across three continents, Caesar reformed the Roman calendar into the 365¼-day Julian year, relieved debt, expanded the Senate to provincial elites, and accepted the title Dictator Perpetuo (dictator in perpetuity). On March 15, 44 BCE, a conspiracy of sixty senators led by Brutus and Cassius stabbed him twenty-three times in the Theatre of Pompey—unleashing the final civil war that ended the Republic and birthed the Roman Empire.',
            fact: 'Caesar’s famous dying words were not Shakespeare’s Latin “Et tu, Brute?”—Suetonius reports that witnesses heard him say in Greek to Marcus Brutus: “Kai su, teknon?” (“You too, child?”), or else nothing at all.',
            quote: {
              en: 'You too, child?',
              orig: 'Καὶ σύ, τέκνον;',
              origLang: 'Ελληνικά',
              provenance: 'Reported by some witnesses according to Suetonius, Divus Julius (82.2)'
            }
          }
        ]
      },
      {
        number: 2,
        roman: 'II',
        id: 'rhodes',
        year: '75 BCE',
        age: 'Age 25',
        date: '75 BCE',
        location: 'Island of Rhodes, Aegean Sea',
        shortPlace: 'Rhodes',
        coords: [28.2278, 36.434],
        coordText: '36°26′N, 28°14′E',
        eraKey: 'republic100',
        labelPos: [14, 4],
        seaLeg: true,
        routeCurve: 0.16,
        focusMultiplier: 1.5,
        title: 'The Pirate Captive & the Orator',
        prose: 'Sailing east to study rhetoric under Apollonius Molon on Rhodes, young Caesar was captured by Cilician pirates near the island of Pharmacusa. Demanding twenty talents of ransom, they were stunned when their prisoner laughed, told them they did not know whom they had taken, and raised his own ransom to fifty talents—joking all the while that he would return to crucify them.',
        fact: 'The moment his ransom was paid, Caesar raised a private naval squad in Miletus, hunted down the pirates in their cove, recovered his money, and carried out his promise to the letter—though he mercifully had their throats cut first.',
        quote: {
          en: 'Avoid an unusual word as a sailor avoids a reef.',
          orig: 'Tamquam scopulum, sic fugias inauditum atque insolens verbum.',
          origLang: 'Latina',
          provenance: 'Caesar’s lost treatise De Analogia, preserved by Aulus Gellius (Noctes Atticae, I.10.4)'
        }
      },
      {
        number: 3,
        roman: 'III',
        id: 'hispania',
        year: '61 BCE',
        age: 'Age 39',
        date: '61 – 60 BCE',
        location: 'Hispania Ulterior (Gades / Cádiz)',
        shortPlace: 'Hispania',
        coords: [-6.292, 36.527],
        coordText: '36°32′N, 6°18′W',
        eraKey: 'republic100',
        labelPos: [-15, 6],
        alignEnd: true,
        routeCurve: 0.18,
        focusMultiplier: 1.5,
        title: 'Weeping Before Alexander’s Statue',
        prose: 'Serving first as quaestor and then governor of Further Spain, Caesar paid off crushing political debts through frontier campaigns in Lusitania and returned to Rome to forge the First Triumvirate with Pompey and Crassus. According to Suetonius and Plutarch, gazing upon a statue of Alexander the Great at the Temple of Hercules in Gades moved him to tears at how little he had achieved by the age at which Alexander had conquered the world.',
        fact: 'To win his 59 BCE consulship, Caesar gave up a guaranteed military triumph outside Rome’s walls—choosing supreme political office over a single day’s parade.',
        quote: {
          en: 'Do you not think I have reason to grieve, when Alexander at my age was already king of so many peoples, and I have not yet achieved a single brilliant deed?',
          orig: '',
          provenance: 'Plutarch, Life of Caesar (11.3)'
        }
      },
      {
        number: 4,
        roman: 'IV',
        id: 'alesia',
        year: '52 BCE',
        age: 'Age 48',
        date: 'September 52 BCE',
        location: 'Alesia (Alise-Sainte-Reine), Gaul',
        shortPlace: 'Alesia',
        coords: [4.5, 47.537],
        coordText: '47°32′N, 4°30′E',
        eraKey: 'gaul52',
        labelPos: [-15, -4],
        alignEnd: true,
        routeCurve: -0.18,
        focusMultiplier: 1.55,
        title: 'The Double Siege of Alesia',
        prose: 'Over eight ruthless campaigns (58–50 BCE), Caesar conquered all of Gaul from the Pyrenees to the Rhine, sending annual third-person dispatches—the Commentarii de Bello Gallico—to electrify the Roman public. At the hilltop fortress of Alesia, he trapped the united Gallic chieftain Vercingetorix inside an 18-kilometer inner wall while building a 21-kilometer outer wall to hold off a massive relief army.',
        fact: 'Caesar’s Gallic Wars were devastatingly costly: ancient estimates suggest up to a million Gauls were killed and another million enslaved—yet the conquest permanently Romanized Western Europe.',
        quote: {
          en: 'All Gaul is divided into three parts.',
          orig: 'Gallia est omnis divisa in partes tres.',
          origLang: 'Latina',
          provenance: 'Commentarii de Bello Gallico, Book I, opening line (c. 51 BCE)'
        }
      },
      {
        number: 5,
        roman: 'V',
        id: 'britannia',
        year: '55 BCE',
        age: 'Age 45',
        date: 'August 55 & July 54 BCE',
        location: 'Kentish Coast, Britannia',
        shortPlace: 'Britannia',
        coords: [1.4, 51.22],
        coordText: '51°13′N, 1°24′E',
        eraKey: 'gaul52',
        labelPos: [14, -6],
        seaLeg: true,
        routeCurve: 0.16,
        focusMultiplier: 1.5,
        title: 'Crossing Beyond the Known Ocean',
        prose: 'In 55 and 54 BCE, Caesar launched two amphibious expeditions across the English Channel, becoming the first Roman commander to bridge the Rhine and cross the Ocean into Britain. Though he left no permanent garrison, his crossing of the Thames and submission of British tribes stunned Rome—which decreed twenty days of public thanksgiving for pushing Roman arms beyond the edge of the known world.',
        fact: 'During his first landing under fierce British chariot fire, the standard-bearer of the Tenth Legion leaped into the surf shouting, “Jump, comrades, unless you wish to betray your eagle to the enemy!”—rallying the entire shore assault.',
        quote: {
          en: 'Men generally believe quite readily what they want to be true.',
          orig: 'Fere libenter homines id quod volunt credunt.',
          origLang: 'Latina',
          provenance: 'Commentarii de Bello Gallico, Book III, Chapter 18'
        }
      },
      {
        number: 6,
        roman: 'VI',
        id: 'rubicon',
        year: '49 BCE',
        age: 'Age 50',
        date: '10 January 49 BCE',
        location: 'Rubicon River, Northern Italy',
        shortPlace: 'Rubicon',
        coords: [12.43, 44.14],
        coordText: '44°08′N, 12°26′E',
        eraKey: 'gaul52',
        labelPos: [14, -6],
        routeCurve: 0.16,
        focusMultiplier: 1.6,
        title: 'Crossing the Rubicon',
        prose: 'Ordered by a hostile Senate faction to lay down his command and face prosecution in Rome, Caesar halted on the banks of the shallow Rubicon stream marking the legal boundary of Italy. Knowing that leading a single legion across meant treason and civil war, he gave the order to march south with the Thirteenth Legion—turning a minor river’s name into an eternal metaphor for an irrevocable choice.',
        fact: 'Caesar’s famous words at the crossing were spoken not in Latin but in Greek—quoting a line from his favorite comic playwright Menander: “Anerriphtho kybos” (“Let the die be cast”).',
        quote: {
          en: 'Let the die be cast.',
          orig: 'Ἀνερρίφθω κύβος. (Alea iacta est.)',
          origLang: 'Ελληνικά / Latina',
          provenance: 'Plutarch, Life of Caesar (32.8) & Suetonius, Divus Julius (32)'
        }
      },
      {
        number: 7,
        roman: 'VII',
        id: 'pharsalus',
        year: '48 BCE',
        age: 'Age 52',
        date: '9 August 48 BCE',
        location: 'Pharsalus, Thessaly (Greece)',
        shortPlace: 'Pharsalus',
        coords: [22.384, 39.295],
        coordText: '39°18′N, 22°23′E',
        eraKey: 'republic44',
        labelPos: [14, -4],
        routeCurve: -0.15,
        focusMultiplier: 1.5,
        title: 'Victory Over Pompey the Great',
        prose: 'Outnumbered nearly two-to-one in infantry and seven-to-one in cavalry on the plain of Pharsalus, Caesar hid a secret fourth battle line of six veteran cohorts behind his right flank. Armed with thrusting javelins, they shattered Pompey’s aristocratic cavalry and rolled up the Senatorial army—ending Pompey’s military career in a single morning.',
        fact: 'Breaking with the bloody proscriptions of Sulla, Caesar practiced conspicuous clemency (clementia), pardoning surviving Senatorial enemies on the battlefield—including Marcus Junius Brutus.',
        quote: {
          en: 'They would have it so. After all my great achievements, I, Gaius Caesar, would have been condemned had I not appealed to my army.',
          orig: 'Hoc voluerunt; tantis rebus gestis Gaius Caesar condemnatus essem, nisi ab exercitu auxilium petissem.',
          origLang: 'Latina',
          provenance: 'Attributed by Asinius Pollio on the field of Pharsalus, quoted in Suetonius (Divus Julius, 30.4)'
        }
      },
      {
        number: 8,
        roman: 'VIII',
        id: 'alexandria',
        year: '47 BCE',
        age: 'Age 52',
        date: 'October 48 – June 47 BCE',
        location: 'Alexandria, Ptolemaic Egypt',
        shortPlace: 'Alexandria',
        coords: [29.9187, 31.2001],
        coordText: '31°12′N, 29°55′E',
        eraKey: 'republic44',
        labelPos: [-15, 6],
        alignEnd: true,
        seaLeg: true,
        routeCurve: 0.16,
        focusMultiplier: 1.5,
        title: 'Cleopatra & the Alexandrian War',
        prose: 'Pursuing Pompey to Egypt only to be presented with his rival’s severed head, Caesar intervened in the Ptolemaic dynastic struggle in favor of twenty-one-year-old Cleopatra VII—who famously had herself smuggled into his palace inside a linen sack. Besieged for months in the royal quarter, Caesar fought out of the harbor by swimming to safety, secured Cleopatra’s throne, and fathered her son Caesarion.',
        fact: 'During the harbor battle in Alexandria, fires set by Caesar to destroy the Egyptian fleet spread to the docks, burning warehouses full of scrolls—an episode often linked to the gradual loss of the Great Library.',
        quote: {
          en: 'I came, I saw, I conquered.',
          orig: 'Veni, vidi, vici.',
          origLang: 'Latina',
          provenance: 'Caesar’s laconic Pontic victory dispatch (47 BCE), recorded in Plutarch (50.2) & Suetonius (37.2)'
        }
      }
    ]
  };
})(window);
