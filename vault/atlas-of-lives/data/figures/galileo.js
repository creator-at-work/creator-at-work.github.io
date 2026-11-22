/* ==========================================================================
   GALILEO GALILEI (1564–1642) — Historical Life Atlas
   Sources: Sidereus Nuncius (1610), The Assayer (1623), Letter to the Grand
            Duchess Christina (1615), Two New Sciences (1638), Britannica
   ========================================================================== */

(function (global) {
  'use strict';

  global.ATLAS_FIGURES = global.ATLAS_FIGURES || {};

  global.ATLAS_FIGURES.galileo = {
    id: 'galileo',
    era: 'Medieval & Renaissance',
    title: 'Galileo Galilei',
    fullName: 'Galileo di Vincenzo Bonaiuti de’ Galilei',
    years: '1564 — 1642',
    subtitle: 'Pisa & Padua to Rome & Arcetri',
    worldLabel: 'World of 1610',
    worldEraLabel: 'Scientific Revolution · Early 17th Century',
    originName: 'Pisa',
    originCoords: [10.4017, 43.7228],

    viewBounds: {
      lon: [7.2, 16.5],
      lat: [40.4, 46.8]
    },

    waterLabels: [
      { name: 'TYRRHENIAN SEA', coords: [10.8, 41.2], regionalOnly: true },
      { name: 'ADRIATIC SEA', coords: [14.3, 43.7], regionalOnly: true },
      { name: 'ATLANTIC OCEAN', coords: [-28, -4], worldOnly: true },
      { name: 'INDIAN OCEAN', coords: [78, -22], worldOnly: true },
      { name: 'PACIFIC OCEAN', coords: [-130, -8], worldOnly: true }
    ],

    defaultEraKey: 'italy1610',
    territorySets: {
      italy1610: {
        empireLabel: 'Italian States (Venice, Tuscany, Papal States)',
        dependentLabel: 'European Scientific Network',
        rivalLabel: 'Thirty Years’ War & Ottoman Fronts',
        empire: ['Italy'],
        dependent: ['Netherlands', 'France', 'Germany', 'Czechia', 'United Kingdom'],
        ally: [],
        rival: ['Turkey', 'Spain']
      }
    },

    worldRealms: [
      { id: 'habsburg', name: 'Habsburg & Thirty Years’ War Europe', desc: 'Prague (where Johannes Kepler corresponded with Galileo), Vienna, and Madrid amid Europe’s confessional wars.', cssVar: '--terr-rival', countries: ['Germany', 'Austria', 'Czechia', 'Spain'], label: 'HABSBURG EUROPE', labelCoords: [11.5, 50.0] },
      { id: 'dutch', name: 'Dutch Republic', desc: 'Center of lens-grinding and free printing—where Leiden’s Elzevir press smuggled and published Galileo’s Two New Sciences in 1638.', cssVar: '--realm-us', countries: ['Netherlands'], label: 'DUTCH REPUBLIC', labelCoords: [5.5, 52.5] },
      { id: 'ottoman', name: 'Ottoman Empire', desc: 'Eastern Mediterranean empire bordering the Venetian Republic.', cssVar: '--realm-ottoman', countries: ['Turkey', 'Greece', 'Egypt'], label: 'OTTOMAN EMPIRE', labelCoords: [32.0, 38.5] },
      { id: 'mughal', name: 'Mughal India (Jahangir)', desc: 'Reign of Emperor Jahangir and Shah Jahan in South Asia.', cssVar: '--realm-maratha', countries: ['India', 'Pakistan'], label: 'MUGHAL EMPIRE', labelCoords: [78.5, 23.0] },
      { id: 'ming', name: 'Late Ming China', desc: 'Jesuit astronomers in Beijing translated Galileo’s telescopic discoveries into Chinese within five years of 1610.', cssVar: '--realm-qing', countries: ['China'], label: 'MING CHINA', labelCoords: [108.0, 34.5] }
    ],

    historicalNames: {
      Italy: 'Grand Duchy of Tuscany, Republic of Venice & Papal States',
      Netherlands: 'Dutch Republic (Leiden Press)',
      Czechia: 'Kingdom of Bohemia (Prague · Johannes Kepler)'
    },

    worldPlaces: [
      { name: 'Prague', year: '1610', detail: 'Imperial mathematician Johannes Kepler received Galileo’s Sidereus Nuncius and enthusiastically endorsed his sightings of Jupiter’s moons.', coords: [14.4378, 50.0755] },
      { name: 'Leiden', year: '1638', detail: 'Dutch university city where Louis Elzevir published Galileo’s smuggled masterwork Two New Sciences.', coords: [4.497, 52.1601] },
      { name: 'Woolsthorpe', year: '1642', detail: 'In the very year Galileo died (1642), Isaac Newton was born in England (by the Julian calendar).', coords: [-0.63, 52.809] }
    ],

    sources: [
      { label: 'Museo Galileo · Florence', url: 'https://www.museogalileo.it/en/' },
      { label: 'Stanford Encyclopedia of Philosophy', url: 'https://plato.stanford.edu/entries/galileo/' }
    ],

    stages: [
      {
        number: 1,
        roman: 'I',
        id: 'pisa',
        year: '1564',
        age: 'Birth',
        date: '15 February 1564 – 1592',
        location: 'Pisa, Grand Duchy of Tuscany',
        shortPlace: 'Pisa',
        coords: [10.4017, 43.7228],
        coordText: '43°43′N, 10°24′E',
        eraKey: 'italy1610',
        labelPos: [-15, 2],
        alignEnd: true,
        routeCurve: 0,
        focusMultiplier: 1.6,
        title: 'Pendulums, Inclined Planes & Falling Bodies',
        prose: 'Born in Pisa to lutenist and music theorist Vincenzo Galilei, Galileo abandoned medical studies for mathematics and became professor at the University of Pisa at twenty-five. Challenging two thousand years of Aristotelian physics, he demonstrated—through brilliant thought experiments and inclined-plane measurements rather than the famous Leaning Tower legend—that all bodies fall with the same acceleration regardless of weight.',
        fact: 'Galileo’s musical father taught him to measure tiny fractions of a second by singing steady rhythmic beats and weighing trickling water—essential for timing rolling bronze balls before accurate clocks existed.',
        quote: {
          en: 'Philosophy is written in this grand book—I mean the universe—which stands continually open to our gaze… It is written in the language of mathematics.',
          orig: 'La filosofia è scritta in questo grandissimo libro che continuamente ci sta aperto innanzi a gli occhi… Egli è scritto in lingua matematica.',
          origLang: 'Italiano',
          provenance: 'Il Saggiatore (The Assayer, 1623)'
        }
      },
      {
        number: 2,
        roman: 'II',
        id: 'padua',
        year: '1609',
        age: 'Age 45',
        date: '1592 – 1610',
        location: 'Padua & Venice, Republic of Venice',
        shortPlace: 'Padua',
        coords: [11.8768, 45.4064],
        coordText: '45°24′N, 11°53′E',
        eraKey: 'italy1610',
        labelPos: [14, -6],
        routeCurve: -0.18,
        focusMultiplier: 1.6,
        title: 'Turning the Telescope to the Heavens',
        prose: 'Spending what he called “the eighteen best years of my life” teaching at the University of Padua under Venetian intellectual freedom, Galileo heard in 1609 of a Dutch spyglass, ground his own superior 20-power lenses, and aimed the instrument skyward. In a few electrifying winter weeks he discovered craters and mountains on the Moon, countless stars in the Milky Way, and four moons orbiting Jupiter—shattering the perfection of the Ptolemaic heavens.',
        fact: 'Galileo rushed his observations into print in Venice in March 1610 as Sidereus Nuncius (The Starry Messenger); the 550-copy first edition sold out within days and made him the most famous scientist in Europe.',
        quote: {
          en: 'I render infinite thanks to God for being so kind as to make me alone the first observer of marvels kept hidden in obscurity for all previous centuries.',
          orig: '',
          provenance: 'Letter to Belisario Vinta, 30 January 1610'
        },
        subTabsLabel: 'Venetian years:',
        subStages: [
          {
            label: '1609 · The Telescope',
            year: '1609',
            age: 'Age 45',
            date: 'August 1609 – March 1610',
            title: 'Turning the Telescope to the Heavens',
            prose: 'Spending what he called “the eighteen best years of my life” teaching at the University of Padua under Venetian intellectual freedom, Galileo heard in 1609 of a Dutch spyglass, ground his own superior 20-power lenses, and aimed the instrument skyward. In a few electrifying winter weeks he discovered craters and mountains on the Moon, countless stars in the Milky Way, and four moons orbiting Jupiter—shattering the perfection of the Ptolemaic heavens.',
            fact: 'Galileo rushed his observations into print in Venice in March 1610 as Sidereus Nuncius (The Starry Messenger); the 550-copy first edition sold out within days and made him the most famous scientist in Europe.',
            quote: {
              en: 'I render infinite thanks to God for being so kind as to make me alone the first observer of marvels kept hidden in obscurity for all previous centuries.',
              orig: '',
              provenance: 'Letter to Belisario Vinta, 30 January 1610'
            }
          },
          {
            label: '1609 · St. Mark’s Campanile',
            year: '1609',
            age: 'Age 45',
            date: '21 August 1609',
            title: 'Demonstration to the Venetian Doge',
            prose: 'Before pointing his instrument at Jupiter, Galileo climbed the bell tower of St. Mark’s Square in Venice with Doge Leonardo Donato and elderly senators, letting them spot distant sailing ships two full hours before they were visible to the naked eye. Thrilled by the naval advantage, the Venetian Senate doubled his Padua salary and granted him lifetime tenure.',
            fact: 'Despite receiving lifetime tenure from Venice, Galileo left Padua less than a year later to accept the title of Chief Mathematician and Philosopher to Grand Duke Cosimo II de’ Medici in Florence—giving up Venice’s political shield from the Roman Inquisition.',
            quote: {
              en: 'We have seen with our own eyes the stars never before beheld since the creation of the world.',
              orig: '',
              provenance: 'Sidereus Nuncius (Venice, March 1610)'
            }
          }
        ]
      },
      {
        number: 3,
        roman: 'III',
        id: 'rome',
        year: '1633',
        age: 'Age 69',
        date: '22 June 1633',
        location: 'Santa Maria sopra Minerva, Rome',
        shortPlace: 'Rome',
        coords: [12.4964, 41.9028],
        coordText: '41°54′N, 12°30′E',
        eraKey: 'italy1610',
        labelPos: [14, 4],
        routeCurve: 0.16,
        focusMultiplier: 1.55,
        title: 'The Inquisition Trial of the Dialogue',
        prose: 'After publishing his vivid Italian masterpiece Dialogue Concerning the Two Chief World Systems (1632)—which dismantled geocentrism and placed Pope Urban VIII’s favorite argument in the mouth of a fool named Simplicio—the frail sixty-nine-year-old was summoned to Rome. On June 22, 1633, threatened with torture, Galileo knelt in the convent of Santa Maria sopra Minerva to formally abjure the motion of the Earth.',
        fact: 'Historians know Galileo did not actually mutter “Eppur si muove” (“And yet it moves”) at the Inquisition table—it would have meant instant execution—yet the phrase already appeared inscribed on a painting in Madrid within a decade of his death.',
        quote: {
          en: 'The intention of the Holy Ghost is to teach us how one goes to heaven, not how heaven goes.',
          orig: 'L’intenzione dello Spirito Santo essere d’insegnarci come si vadia al cielo, e non come vadia il cielo.',
          origLang: 'Italiano',
          provenance: 'Letter to the Grand Duchess Christina (1615, quoting Cardinal Baronius)'
        }
      },
      {
        number: 4,
        roman: 'IV',
        id: 'siena',
        year: '1633',
        age: 'Age 69',
        date: 'July – December 1633',
        location: 'Palazzo Piccolomini, Siena',
        shortPlace: 'Siena',
        coords: [11.3308, 43.3188],
        coordText: '43°19′N, 11°20′E',
        eraKey: 'italy1610',
        labelPos: [-15, 8],
        alignEnd: true,
        routeCurve: -0.16,
        focusMultiplier: 1.6,
        title: 'Sanctuary & Rebirth of Physics',
        prose: 'Broken in spirit after his condemnation, Galileo was placed in the initial custody of his devoted admirer Archbishop Ascanio Piccolomini in Siena. Surrounded by warm hospitality, music, and visiting scholars, Galileo’s intellect roared back to life—and here he began composing his greatest scientific achievement, Discourses and Mathematical Demonstrations Relating to Two New Sciences.',
        fact: 'Archbishop Piccolomini’s kindness was so generous that anonymous informants wrote to Rome complaining that Galileo was being treated more like an honored guest than a penitent heretic.',
        quote: {
          en: 'In questions of science, the authority of a thousand is not worth the humble reasoning of a single individual.',
          orig: '',
          provenance: 'Letter on Sunspots & scientific reasoning (1610–1613)'
        }
      },
      {
        number: 5,
        roman: 'V',
        id: 'florence',
        year: '1642',
        age: 'Age 77',
        date: '1633 – 8 January 1642',
        location: 'Villa Il Gioiello, Arcetri (Florence)',
        shortPlace: 'Florence',
        coords: [11.2558, 43.7696],
        coordText: '43°46′N, 11°15′E',
        eraKey: 'italy1610',
        labelPos: [14, -4],
        routeCurve: 0.16,
        focusMultiplier: 1.65,
        title: 'Blindness, Smuggled Physics & Final Light',
        prose: 'Confined under permanent house arrest at his hillside villa Il Gioiello in Arcetri above Florence—and grieving the death of his beloved daughter Sister Maria Celeste—Galileo completed Two New Sciences, establishing the laws of inertia, parabolic projectile motion, and material strength. Smuggled out of Italy and printed in Holland in 1638, it laid the exact foundation upon which Isaac Newton built classical mechanics.',
        fact: 'Even after going completely blind at seventy-three, Galileo dictated to young assistants Evangelista Torricelli and Vincenzo Viviani a brilliant design for the first pendulum clock escapement.',
        quote: {
          en: 'Alas! Your dear friend and servant Galileo has for the last month been hopelessly blind; so that this heaven, this earth, this universe, which I by my marvelous discoveries had enlarged a hundred thousand times… henceforward for me is shrunk into such a small space as is filled by my own bodily sensations.',
          orig: '',
          provenance: 'Letter to Elia Diodati from Arcetri, 2 January 1638'
        },
        subTabsLabel: 'Florence chapters:',
        subStages: [
          {
            label: '1642 · Arcetri & Two New Sciences',
            year: '1642',
            age: 'Age 77',
            date: '1633 – 8 January 1642',
            title: 'Blindness, Smuggled Physics & Final Light',
            prose: 'Confined under permanent house arrest at his hillside villa Il Gioiello in Arcetri above Florence—and grieving the death of his beloved daughter Sister Maria Celeste—Galileo completed Two New Sciences, establishing the laws of inertia, parabolic projectile motion, and material strength. Smuggled out of Italy and printed in Holland in 1638, it laid the exact foundation upon which Isaac Newton built classical mechanics.',
            fact: 'Even after going completely blind at seventy-three, Galileo dictated to young assistants Evangelista Torricelli and Vincenzo Viviani a brilliant design for the first pendulum clock escapement.',
            quote: {
              en: 'Alas! Your dear friend and servant Galileo has for the last month been hopelessly blind; so that this heaven, this earth, this universe, which I by my marvelous discoveries had enlarged a hundred thousand times… henceforward for me is shrunk into such a small space as is filled by my own bodily sensations.',
              orig: '',
              provenance: 'Letter to Elia Diodati from Arcetri, 2 January 1638'
            }
          },
          {
            label: '1610 · Medici Court & Phases of Venus',
            year: '1610',
            age: 'Age 46',
            date: 'September 1610 – 1632',
            title: 'Chief Mathematician of Florence',
            prose: 'Returning home in triumph to Florence as court philosopher to the Medici, Galileo turned his telescope on Venus in autumn 1610 and observed a complete cycle of moon-like phases—an optical proof impossible under the old Ptolemaic system. For two decades he observed sunspots, debated Jesuits on comets, and wrote the explosive Dialogue.',
            fact: 'To protect his priority while double-checking his discovery of Venus’s phases, Galileo sent Johannes Kepler a scrambled Latin anagram that unscrambled to: “The Mother of Love [Venus] emulates the figures of Cynthia [the Moon].”',
            quote: {
              en: 'I do not feel obliged to believe that the same God who has endowed us with sense, reason, and intellect has intended us to forgo their use.',
              orig: '',
              provenance: 'Letter to the Grand Duchess Christina (1615)'
            }
          }
        ]
      }
    ]
  };
})(window);
