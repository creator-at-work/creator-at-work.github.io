/* ==========================================================================
   JOHANNES GUTENBERG (c. 1400–1468) — Historical Life Atlas
   Sources: Strasbourg 1439 Court Transcripts, Helmasperger Notarial Instrument
            (1455), Letter of Enea Silvio Piccolomini (1455), Stephan Füssel
   ========================================================================== */

(function (global) {
  'use strict';

  global.ATLAS_FIGURES = global.ATLAS_FIGURES || {};

  global.ATLAS_FIGURES.gutenberg = {
    id: 'gutenberg',
    era: 'Medieval & Renaissance',
    title: 'Johannes Gutenberg',
    fullName: 'Johannes Gensfleisch zur Laden zum Gutenberg',
    years: 'c. 1400 — 1468',
    subtitle: 'Mainz & Strasbourg to the Printed World',
    worldLabel: 'World of 1455',
    worldEraLabel: 'Dawn of Print · Mid-15th Century',
    originName: 'Mainz',
    originCoords: [8.2473, 49.9929],

    viewBounds: {
      lon: [3.8, 13.5],
      lat: [47.3, 52.1]
    },

    waterLabels: [
      { name: 'NORTH SEA', coords: [4.2, 52.8], regionalOnly: true },
      { name: 'ATLANTIC OCEAN', coords: [-28, -4], worldOnly: true },
      { name: 'INDIAN OCEAN', coords: [78, -22], worldOnly: true },
      { name: 'PACIFIC OCEAN', coords: [-130, -8], worldOnly: true }
    ],

    defaultEraKey: 'hre1455',
    territorySets: {
      hre1455: {
        empireLabel: 'Holy Roman Empire (Rhine Printing Heartland)',
        dependentLabel: 'Early European Print Centers (by 1475)',
        rivalLabel: 'Ottoman Empire (Constantinople, 1453)',
        empire: ['Germany', 'Switzerland', 'Austria', 'Czechia', 'Netherlands', 'Belgium', 'Luxembourg'],
        dependent: ['France', 'Italy', 'United Kingdom', 'Poland', 'Spain'],
        ally: [],
        rival: ['Turkey', 'Greece']
      }
    },

    worldRealms: [
      { id: 'ottoman', name: 'Ottoman Empire', desc: 'Mehmed II captured Constantinople in May 1453—just as Gutenberg was setting the lead type of the 42-Line Bible in Mainz.', cssVar: '--realm-ottoman', countries: ['Turkey', 'Greece', 'Bulgaria', 'Serbia'], label: 'OTTOMAN EMPIRE', labelCoords: [29.0, 39.5] },
      { id: 'ming', name: 'Ming Dynasty China', desc: 'Long pioneer of paper, woodblock printing, and Bi Sheng’s 11th-century ceramic movable type.', cssVar: '--realm-qing', countries: ['China'], label: 'MING CHINA', labelCoords: [108.0, 34.5] },
      { id: 'joseon', name: 'Joseon Korea', desc: 'Korean artisans had cast metal movable type decades earlier (printing the Buddhist Jikji in 1377) and promulgated the phonetic Hangul script in 1446.', cssVar: '--realm-us', countries: ['South Korea', 'North Korea'], label: 'JOSEON KOREA', labelCoords: [127.5, 37.5] },
      { id: 'italy', name: 'Renaissance Italy', desc: 'Within a decade of Gutenberg’s death, Venice became Europe’s printing powerhouse with over 150 presses.', cssVar: '--terr-rival', countries: ['Italy'], label: 'ITALIAN STATES', labelCoords: [12.5, 43.0] },
      { id: 'india', name: 'Delhi & Vijayanagara', desc: 'Major South Asian manuscript and scholarly realms.', cssVar: '--realm-maratha', countries: ['India'], label: 'INDIA', labelCoords: [79.0, 21.5] }
    ],

    historicalNames: {
      Germany: 'Holy Roman Empire (Electorate of Mainz & Free Imperial Cities)',
      France: 'Kingdom of France & Alsace (Strasbourg)',
      Italy: 'Italian City-States (Subiaco & Venice)',
      Turkey: 'Ottoman Empire (Constantinople, 1453)'
    },

    worldPlaces: [
      { name: 'Venice', year: '1469', detail: 'German printer Johannes of Speyer brought Mainz printing to Venice, launching the capital of Renaissance publishing.', coords: [12.3155, 45.4408] },
      { name: 'Constantinople', year: '1453', detail: 'Fell to the Ottomans while Gutenberg’s Bible was on press; fleeing Greek scholars brought classical texts to Europe’s new printing houses.', coords: [28.9784, 41.0082] },
      { name: 'Cheongju, Korea', year: '1377', detail: 'Site of Heungdeok Temple, where the world’s oldest surviving metal movable-type book (Jikji) was printed 78 years before Gutenberg’s Bible.', coords: [127.4897, 36.6424] }
    ],

    sources: [
      { label: 'Gutenberg-Museum · Mainz', url: 'https://www.gutenberg-museum.de/en/' },
      { label: 'British Library · Gutenberg Bible', url: 'https://www.bl.uk/treasures/gutenberg/homepage.html' }
    ],

    stages: [
      {
        number: 1,
        roman: 'I',
        id: 'mainz',
        year: '1400',
        age: 'Birth',
        date: 'c. 1400 – 1468',
        location: 'Mainz, Electorate of Mainz',
        shortPlace: 'Mainz',
        coords: [8.2473, 49.9929],
        coordText: '50°00′N, 8°15′E',
        eraKey: 'hre1455',
        labelPos: [-15, 6],
        alignEnd: true,
        routeCurve: 0,
        focusMultiplier: 1.55,
        title: 'Patrician Goldsmith & the 42-Line Bible',
        prose: 'Born around 1400 into a patrician family tied to the archiepiscopal mint in Mainz, Johannes Gutenberg grew up surrounded by steel punches, coin dies, and precision metallurgy. Returning to Mainz in 1448 after years of exile, he unified four breakthroughs—an adjustable hand-mold for casting identical type, a lead-tin-antimony alloy, oil-based ink, and a modified wooden screw press—to print the monumental 1,282-page 42-Line Bible around 1455.',
        fact: 'Not a single portrait of Gutenberg was painted during his lifetime, and not one printed book bears his name on the title page—we know his authorship only from lawsuits, financial ledgers, and admiring contemporary letters.',
        quote: {
          en: 'By the grace of the Most High, this book has been printed not by means of reed, stylus, or quill, but by the wondrous agreement, proportion, and harmony of punches and matrices.',
          orig: 'Non calami, stili aut pennae suffragio, sed mira patronarum formarumque concordia, proportione et modulo.',
          origLang: 'Latina',
          provenance: 'Colophon of the Mainz Catholicon (1460), widely attributed to Gutenberg’s workshop'
        },
        subTabsLabel: 'Mainz chapters:',
        subStages: [
          {
            label: '1455 · The 42-Line Bible',
            year: '1455',
            age: 'c. Age 55',
            date: '1452 – November 1455',
            title: 'Masterpiece & Financial Ruin',
            prose: 'Borrowing 1,600 guilders from Mainz financier Johann Fust, Gutenberg employed twenty workers casting 290 distinct gothic characters to mirror the finest hand-lettered manuscripts, printing roughly 180 Bibles on fine paper and calfskin vellum. Just as the work neared completion in November 1455, Fust foreclosed on the debt in court (recorded in the Helmasperger Notarial Instrument)—seizing Gutenberg’s presses and type with former assistant Peter Schöffer.',
            fact: 'Of roughly 180 Gutenberg Bibles printed, 49 copies survive today (21 completely intact); a single stray leaf now commands tens of thousands of dollars at auction.',
            quote: {
              en: 'By the grace of the Most High, this book has been printed not by means of reed, stylus, or quill, but by the wondrous agreement, proportion, and harmony of punches and matrices.',
              orig: 'Non calami, stili aut pennae suffragio, sed mira patronarum formarumque concordia, proportione et modulo.',
              origLang: 'Latina',
              provenance: 'Colophon of the Mainz Catholicon (1460), widely attributed to Gutenberg’s workshop'
            }
          },
          {
            label: 'c. 1400 · Mint Origins & 1468 End',
            year: '1468',
            age: 'c. Age 68',
            date: '1465 – 3 February 1468',
            title: 'Archbishop’s Pension & Quiet Death',
            prose: 'Following the violent 1462 Sack of Mainz—which scattered Mainz’s trained printers across Italy, France, and Germany—Archbishop Adolf II of Nassau honored the aging inventor in January 1465 as a Hofmann (gentleman of the court) at nearby Eltville, granting him a yearly robe, 2,180 liters of grain, and 2,000 liters of wine free of tax. Gutenberg died in Mainz in February 1468, just as his invention began transforming human literacy forever.',
            fact: 'Before Gutenberg, all of Europe held an estimated 30,000 hand-copied books; within fifty years of his death, more than 20 million printed volumes were circulating across over 250 European cities.',
            quote: {
              en: 'We have recognized the pleasant and willing services which our dear and faithful Johann Gutenberg has rendered to us and our archbishopric.',
              orig: '',
              provenance: 'Court pension decree of Archbishop Adolf II of Nassau, Eltville, 17 January 1465'
            }
          }
        ]
      },
      {
        number: 2,
        roman: 'II',
        id: 'erfurt',
        year: '1419',
        age: 'c. Age 19',
        date: '1418 – 1420',
        location: 'University of Erfurt, Thuringia',
        shortPlace: 'Erfurt',
        coords: [11.0299, 50.9848],
        coordText: '50°59′N, 11°02′E',
        eraKey: 'hre1455',
        labelPos: [14, -4],
        routeCurve: -0.15,
        focusMultiplier: 1.5,
        title: 'Latin Letters & Scholarly Years',
        prose: 'Forced out of Mainz during violent guild revolts against patrician families, Gutenberg is widely identified by historians with the “Johannes de Alta Villa” (referencing his family estate at Eltville) enrolled at the University of Erfurt in 1418–1419. There he acquired the fluent Latin, editorial discipline, and familiarity with scholarly manuscripts that later enabled him to set intricate Latin Bibles and grammars without error.',
        fact: 'Nearly a century later, Martin Luther studied at the exact same University of Erfurt—before using Gutenberg’s printing press to ignite the Protestant Reformation across Germany in a matter of weeks.',
        quote: {
          en: 'Printing is the ultimate gift of God and the greatest one.',
          orig: 'Die Druckerei ist das höchste und letzte Geschenk, durch welches Gott die Sache des Evangeliums forttreibt.',
          origLang: 'Deutsch',
          provenance: 'Martin Luther, Table Talk (Tischreden), reflecting on the revolution launched from Mainz'
        }
      },
      {
        number: 3,
        roman: 'III',
        id: 'strasbourg',
        year: '1438',
        age: 'c. Age 38',
        date: '1434 – 1444',
        location: 'St. Arbogast, Strasbourg',
        shortPlace: 'Strasbourg',
        coords: [7.7521, 48.5734],
        coordText: '48°34′N, 7°45′E',
        eraKey: 'hre1455',
        labelPos: [-15, 6],
        alignEnd: true,
        routeCurve: 0.16,
        focusMultiplier: 1.55,
        title: 'Secret Workshop & the 1439 Courtroom Clue',
        prose: 'Settling outside Strasbourg near the monastery of St. Arbogast, Gutenberg formed a secretive partnership teaching gem polishing and metalwork while privately experimenting on a mystery venture called “Aventur und Kunst” (enterprise and art). When a partner died suddenly in 1438 and his heirs sued, startled court clerks recorded testimony of a wooden press, lead, and “four pieces lying in the press” that Gutenberg frantically ordered dismantled so no outsider would understand them.',
        fact: 'Those surviving 1439 Strasbourg court records provide history’s very first documentary glimpse of Europe’s movable-type press taking shape behind locked doors.',
        quote: {
          en: 'Go swiftly to the press and open it by means of the two screws, so that the pieces fall apart, and place them on or inside the press; then nobody can see or comprehend anything.',
          orig: '',
          provenance: 'Sworn testimony of witness Hans Dünne & Lorenz Beildeck in the Strasbourg 1439 lawsuit against Gutenberg'
        }
      },
      {
        number: 4,
        roman: 'IV',
        id: 'aachen',
        year: '1440',
        age: 'c. Age 40',
        date: '1438 – 1440',
        location: 'Aachen, Rhineland',
        shortPlace: 'Aachen',
        coords: [6.0839, 50.7753],
        coordText: '50°47′N, 6°05′E',
        eraKey: 'hre1455',
        labelPos: [-15, -4],
        alignEnd: true,
        routeCurve: -0.15,
        focusMultiplier: 1.55,
        title: 'Pilgrim Mirrors & Precision Alloy Casting',
        prose: 'To fund his costly mechanical experiments, Gutenberg’s Strasbourg syndicate mass-produced tens of thousands of small polished lead-tin convex mirrors for the septennial Aachen Pilgrimage (Heiltumsfahrt), which pilgrims held aloft to catch sacred reflections of Charlemagne’s relics. Although the pilgrimage was postponed a year by plague—crushing his profits—the venture perfected the rapid metallic casting molds that made movable type possible.',
        fact: 'Gutenberg’s crucial metallurgical insight was adding antimony to lead and tin: unlike pure metals that shrink when cooling, a lead-tin-antimony alloy expands slightly as it solidifies, capturing razor-sharp letter corners inside the mold.',
        quote: {
          en: 'I earned nearly one hundred guilders from Johannes Gutenberg solely for things pertaining to printing.',
          orig: '',
          provenance: 'Sworn statement of Strasbourg goldsmith Hans Dünne, December 1439'
        }
      },
      {
        number: 5,
        roman: 'V',
        id: 'frankfurt',
        year: '1455',
        age: 'c. Age 55',
        date: 'March 1455',
        location: 'Frankfurt Trade Fair, Frankfurt am Main',
        shortPlace: 'Frankfurt',
        coords: [8.6821, 50.1109],
        coordText: '50°07′N, 8°41′E',
        eraKey: 'hre1455',
        labelPos: [14, -6],
        routeCurve: 0.18,
        focusMultiplier: 1.65,
        title: 'First Eyewitness to the Printed Bible',
        prose: 'At the Frankfurt Imperial Diet and spring trade fair in March 1455, humanist diplomat Enea Silvio Piccolomini—who three years later became Pope Pius II—examined freshly printed sample gatherings of Gutenberg’s Bible shown by an unknown “marvelous man.” Writing immediately to Cardinal Juan de Carvajal in Rome, Piccolomini marveled that the pages were so crisp and error-free that the Cardinal could read them effortlessly without spectacles—and noted every single copy already had a buyer.',
        fact: 'Within six months of Piccolomini’s letter, Gutenberg’s press had proven that mechanized printing could match the finest monastic calligraphy at a fraction of the time and cost—giving birth to modern science, journalism, and mass education.',
        quote: {
          en: 'The script was exceedingly clean and correct, not at all difficult to read; Your Grace would be able to read it without effort, and indeed without glasses.',
          orig: '',
          provenance: 'Letter of Enea Silvio Piccolomini (future Pope Pius II) to Cardinal Carvajal, 12 March 1455'
        }
      }
    ]
  };
})(window);
