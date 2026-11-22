/* ==========================================================================
   ARISTOTLE (384–322 BCE) — Historical Life Atlas
   Sources: Aristotle (Metaphysics, Nicomachean Ethics, Politics, History of
            Animals), Diogenes Laërtius, Stanford Encyclopedia of Philosophy
   ========================================================================== */

(function (global) {
  'use strict';

  global.ATLAS_FIGURES = global.ATLAS_FIGURES || {};

  global.ATLAS_FIGURES.aristotle = {
    id: 'aristotle',
    era: 'Antiquity',
    title: 'Aristotle',
    fullName: 'Aristotle of Stagira',
    years: '384 — 322 BCE',
    subtitle: 'Stagira to Athens & Chalcis',
    worldLabel: 'World of 335 BCE',
    worldEraLabel: 'Classical Aegean · 4th Century BCE',
    originName: 'Stagira',
    originCoords: [23.794, 40.592],

    viewBounds: {
      lon: [20.5, 28.2],
      lat: [36.8, 41.6]
    },

    waterLabels: [
      { name: 'AEGEAN SEA', coords: [25.2, 38.6], regionalOnly: true },
      { name: 'IONIAN SEA', coords: [20.2, 37.8], regionalOnly: true },
      { name: 'ATLANTIC OCEAN', coords: [-28, -4], worldOnly: true },
      { name: 'INDIAN OCEAN', coords: [78, -22], worldOnly: true },
      { name: 'PACIFIC OCEAN', coords: [-130, -8], worldOnly: true }
    ],

    defaultEraKey: 'aegean335',
    territorySets: {
      aegean367: {
        empireLabel: 'Greek City-States & Chalkidiki',
        dependentLabel: 'Kingdom of Macedon',
        rivalLabel: 'Achaemenid Persian Empire',
        empire: ['Greece'],
        dependent: ['Macedonia'],
        ally: [],
        rival: ['Turkey', 'Syria', 'Iran', 'Egypt']
      },
      aegean335: {
        empireLabel: 'League of Corinth & Macedon',
        rivalLabel: 'Achaemenid Persian Empire',
        empire: ['Greece', 'Macedonia', 'Bulgaria'],
        dependent: [],
        ally: [],
        rival: ['Turkey', 'Syria', 'Iraq', 'Iran', 'Egypt']
      }
    },

    worldRealms: [
      { id: 'persia', name: 'Achaemenid Persian Empire', desc: 'Ruling Anatolia, the Levant, Egypt, Mesopotamia, and Iran until Alexander’s invasion in 334 BCE.', cssVar: '--realm-persia', countries: ['Turkey', 'Syria', 'Iraq', 'Iran', 'Egypt', 'Afghanistan'], label: 'PERSIAN EMPIRE', labelCoords: [48.0, 33.5] },
      { id: 'rome', name: 'Roman Republic', desc: 'Consolidating central Italy while Aristotle lectured in Athens.', cssVar: '--terr-rival', countries: ['Italy'], label: 'ROMAN REPUBLIC', labelCoords: [13.5, 42.5] },
      { id: 'carthage', name: 'Carthage', desc: 'Maritime republic spanning Tunisia, western Sicily, and Sardinia.', cssVar: '--realm-ottoman', countries: ['Tunisia', 'Algeria'], label: 'CARTHAGE', labelCoords: [9.5, 34.0] },
      { id: 'nanda', name: 'Nanda Empire', desc: 'Empire of the Ganges valley in India.', cssVar: '--realm-maratha', countries: ['India'], label: 'NANDA EMPIRE', labelCoords: [80.0, 23.0] },
      { id: 'warring', name: 'Warring States China', desc: 'Golden age of Mencius and Zhuangzi in classical Chinese philosophy.', cssVar: '--realm-qing', countries: ['China'], label: 'WARRING STATES', labelCoords: [108.0, 34.5] }
    ],

    historicalNames: {
      Greece: 'Attica, Euboea & the Aegean Polis',
      Macedonia: 'Kingdom of Macedon',
      Turkey: 'Anatolia (Mysia & the Troad)'
    },

    worldPlaces: [
      { name: 'Syracuse', year: '360 BCE', detail: 'Sicilian Greek city where Aristotle’s teacher Plato repeatedly tried—and failed—to shape a philosopher-king.', coords: [15.2866, 37.0755] },
      { name: 'Babylon', year: '323 BCE', detail: 'City where Aristotle’s former pupil Alexander died, sparking the anti-Macedonian backlash in Athens.', coords: [44.421, 32.536] },
      { name: 'Alexandria', year: '331 BCE', detail: 'Newly founded Egyptian city whose Great Library would model itself on Aristotle’s Lyceum.', coords: [29.9187, 31.2001] }
    ],

    sources: [
      { label: 'Stanford Encyclopedia of Philosophy', url: 'https://plato.stanford.edu/entries/aristotle/' },
      { label: 'Britannica', url: 'https://www.britannica.com/biography/Aristotle' }
    ],

    stages: [
      {
        number: 1,
        roman: 'I',
        id: 'stagira',
        year: '384 BCE',
        age: 'Birth',
        date: '384 BCE',
        location: 'Stagira, Chalkidiki',
        shortPlace: 'Stagira',
        coords: [23.794, 40.592],
        coordText: '40°36′N, 23°48′E',
        eraKey: 'aegean367',
        labelPos: [14, -8],
        routeCurve: 0,
        focusMultiplier: 1.5,
        title: 'Son of a Macedonian Court Physician',
        prose: 'Born in the small northern Greek polis of Stagira, Aristotle was the son of Nicomachus, personal physician to King Amyntas III of Macedon. Growing up in an Asclepiad medical household instilled an early habit of careful anatomical observation—an empirical temperament that would forever distinguish him from his future mentor Plato.',
        fact: 'After Philip II razed Stagira during his northern campaigns, he later rebuilt the town and freed its enslaved citizens specifically in honor of Aristotle’s service as Alexander’s tutor.',
        quote: {
          en: 'All men by nature desire to know. An indication of this is the delight we take in our senses.',
          orig: 'Πάντες ἄνθρωποι τοῦ εἰδέναι ὀρέγονται φύσει.',
          origLang: 'Ελληνικά',
          provenance: 'Metaphysics, Book I (980a21)'
        }
      },
      {
        number: 2,
        roman: 'II',
        id: 'athens',
        year: '367 BCE',
        age: 'Age 17',
        date: '367 – 347 BCE',
        location: 'Athens (Academy & Lyceum)',
        shortPlace: 'Athens',
        coords: [23.7275, 37.9838],
        coordText: '37°59′N, 23°44′E',
        eraKey: 'aegean367',
        labelPos: [-15, 6],
        alignEnd: true,
        routeCurve: -0.2,
        focusMultiplier: 1.55,
        title: 'Twenty Years at Plato’s Academy',
        prose: 'Sent to Athens at seventeen, Aristotle spent two full decades studying, debating, and lecturing at Plato’s Academy. Even as he revered his teacher, he forged a bold critique of Plato’s disembodied Theory of Forms, insisting that reality resides in concrete, living substances and laying the foundations of formal syllogistic logic.',
        fact: 'Plato reportedly nicknamed the voraciously reading young Aristotle “the Mind” (Nous) of the Academy, and called his house “the house of the reader.”',
        quote: {
          en: 'Though both are dear, piety requires us to honor truth above our friends.',
          orig: 'Ἀμφοῖν γὰρ ὄντοιν φίλοιν ὅσιον προτιμᾶν τὴν ἀλήθειαν.',
          origLang: 'Ελληνικά',
          provenance: 'Nicomachean Ethics, Book I, Chapter 6 (1096a16)'
        },
        subTabsLabel: 'Athens chapters:',
        subStages: [
          {
            label: '367–347 · The Academy',
            year: '367 BCE',
            age: 'Age 17',
            date: '367 – 347 BCE',
            eraKey: 'aegean367',
            title: 'Twenty Years at Plato’s Academy',
            prose: 'Sent to Athens at seventeen, Aristotle spent two full decades studying, debating, and lecturing at Plato’s Academy. Even as he revered his teacher, he forged a bold critique of Plato’s disembodied Theory of Forms, insisting that reality resides in concrete, living substances and laying the foundations of formal syllogistic logic.',
            fact: 'Plato reportedly nicknamed the voraciously reading young Aristotle “the Mind” (Nous) of the Academy, and called his house “the house of the reader.”',
            quote: {
              en: 'Though both are dear, piety requires us to honor truth above our friends.',
              orig: 'Ἀμφοῖν γὰρ ὄντοιν φίλοιν ὅσιον προτιμᾶν τὴν ἀλήθειαν.',
              origLang: 'Ελληνικά',
              provenance: 'Nicomachean Ethics, Book I, Chapter 6 (1096a16)'
            }
          },
          {
            label: '335–323 · The Lyceum',
            year: '335 BCE',
            age: 'Age 49',
            date: '335 – 323 BCE',
            eraKey: 'aegean335',
            title: 'Founding the Peripatetic School',
            prose: 'Returning to Athens in 335 BCE as a resident alien unable to buy land, Aristotle rented buildings in the Lyceum gymnasium outside the city walls. Walking its covered colonnade (peripatos) with students, he organized history’s first collaborative research institute—assembling maps, biological specimens, a library, and analyses of 158 Greek city-state constitutions.',
            fact: 'Almost all of Aristotle’s surviving books—including the Nicomachean Ethics, Politics, Poetics, and Metaphysics—are not polished dialogues for the public, but dense lecture notes prepared for his Lyceum classes.',
            quote: {
              en: 'One swallow does not make a summer, nor does one day; and so too one day, or a short time, does not make a man blessed and happy.',
              orig: 'Μία γὰρ χελιδὼν ἔαρ οὐ ποιεῖ, οὐδὲ μία ἡμέρα.',
              origLang: 'Ελληνικά',
              provenance: 'Nicomachean Ethics, Book I, Chapter 7 (1098a18)'
            }
          }
        ]
      },
      {
        number: 3,
        roman: 'III',
        id: 'assos',
        year: '347 BCE',
        age: 'Age 37',
        date: '347 – 345 BCE',
        location: 'Assos, Mysia (Anatolia)',
        shortPlace: 'Assos',
        coords: [26.336, 39.49],
        coordText: '39°29′N, 26°20′E',
        eraKey: 'aegean367',
        labelPos: [14, -4],
        seaLeg: true,
        routeCurve: 0.16,
        focusMultiplier: 1.5,
        title: 'An Independent Circle in Asia Minor',
        prose: 'Leaving Athens after Plato’s death, Aristotle crossed the Aegean to Assos on the Anatolian coast at the invitation of its ruler Hermias, a former Academy student. There he led an independent philosophical circle, married Hermias’s niece Pythias, and began the systematic empirical studies of politics and nature that defined his mature thought.',
        fact: 'When Persian agents later lured Hermias into a trap and executed him, Aristotle composed a moving hymn to Virtue (Arete) in his friend’s honor—an unusual lyric poem cited decades later by his Athenian political enemies.',
        quote: {
          en: 'Man is by nature a political animal.',
          orig: 'Ὁ ἄνθρωπος φύσει πολιτικὸν ζῷον.',
          origLang: 'Ελληνικά',
          provenance: 'Politics, Book I, Chapter 2 (1253a2)'
        }
      },
      {
        number: 4,
        roman: 'IV',
        id: 'lesbos',
        year: '345 BCE',
        age: 'Age 39',
        date: '345 – 343 BCE',
        location: 'Mytilene, Island of Lesbos',
        shortPlace: 'Lesbos',
        coords: [26.555, 39.106],
        coordText: '39°06′N, 26°33′E',
        eraKey: 'aegean367',
        labelPos: [14, 10],
        seaLeg: true,
        routeCurve: 0.14,
        focusMultiplier: 1.55,
        title: 'The Birth of Marine Biology',
        prose: 'Moving across the narrow strait to the island of Lesbos alongside his collaborator Theophrastus, Aristotle spent two extraordinary years wading the shallow Pyrra Lagoon and interviewing local fishermen. Dissecting and classifying over 500 species—from cuttlefish and sea urchins to placental dogfish sharks—he invented comparative zoology.',
        fact: 'Aristotle’s precise description of the hectocotylus reproductive arm of the octopus and the placental reproduction of the smooth-hound shark were dismissed by European naturalists as myths for over two thousand years—until nineteenth-century zoologists proved him completely right.',
        quote: {
          en: 'We should venture on the study of every kind of animal without distaste; for each and all will reveal to us something natural and something beautiful.',
          orig: '',
          provenance: 'Parts of Animals, Book I, Chapter 5 (645a21)'
        }
      },
      {
        number: 5,
        roman: 'V',
        id: 'mieza',
        year: '343 BCE',
        age: 'Age 41',
        date: '343 – 340 BCE',
        location: 'Mieza, Kingdom of Macedon',
        shortPlace: 'Mieza',
        coords: [22.126, 40.644],
        coordText: '40°39′N, 22°08′E',
        eraKey: 'aegean335',
        labelPos: [-15, -4],
        alignEnd: true,
        routeCurve: -0.18,
        focusMultiplier: 1.5,
        title: 'Tutor to Young Alexander',
        prose: 'Summoned north by King Philip II of Macedon, Aristotle taught thirteen-year-old Prince Alexander and his noble companions—including future kings Ptolemy and Cassander—at the shaded stone Nymphaeum of Mieza. For three years he instructed the heir in Homer, ethics, medicine, rhetoric, and natural inquiry before Alexander became regent at sixteen.',
        fact: 'Though their later relationship cooled after Alexander executed Aristotle’s grand-nephew Callisthenes in Central Asia, Aristotle’s years in Macedon secured the patronage that later enabled the Lyceum.',
        quote: {
          en: 'The roots of education are bitter, but the fruit is sweet.',
          orig: '',
          provenance: 'Attributed to Aristotle in Diogenes Laërtius, Lives of the Eminent Philosophers (V.18)'
        }
      },
      {
        number: 6,
        roman: 'VI',
        id: 'chalcis',
        year: '322 BCE',
        age: 'Age 62',
        date: '323 – 322 BCE',
        location: 'Chalcis, Island of Euboea',
        shortPlace: 'Chalcis',
        coords: [23.602, 38.463],
        coordText: '38°28′N, 23°36′E',
        eraKey: 'aegean335',
        labelPos: [14, -4],
        routeCurve: 0.18,
        focusMultiplier: 1.55,
        title: 'Refuge in Euboea & Last Will',
        prose: 'When news of Alexander’s death in Babylon reached Athens in 323 BCE, anti-Macedonian sentiment erupted and Aristotle was charged with impiety. Leaving the Lyceum to Theophrastus, he withdrew to his mother’s ancestral estate in Chalcis on the island of Euboea, where he died of a stomach ailment the following year at sixty-two.',
        fact: 'Aristotle’s preserved last will—recorded by Diogenes Laërtius—was remarkably humane for antiquity: it provided thoughtfully for his partner Herpyllis and explicitly emancipated several of his household slaves.',
        quote: {
          en: 'I will not let the Athenians sin twice against philosophy.',
          orig: '',
          provenance: 'Explaining his departure from Athens in 323 BCE (referring to Socrates), recorded in Aelian, Varia Historia (III.36)'
        }
      }
    ]
  };
})(window);
