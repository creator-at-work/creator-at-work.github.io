/* ==========================================================================
   ISAAC NEWTON (1643–1727) — Historical Life Atlas
   Sources: Philosophiæ Naturalis Principia Mathematica (1687), Opticks (1704),
            Newton Project (Oxford), Richard Westfall, Britannica
   ========================================================================== */

(function (global) {
  'use strict';

  global.ATLAS_FIGURES = global.ATLAS_FIGURES || {};

  global.ATLAS_FIGURES.newton = {
    id: 'newton',
    era: 'Enlightenment & Empire',
    title: 'Isaac Newton',
    fullName: 'Sir Isaac Newton PRS',
    years: '1643 — 1727',
    subtitle: 'Woolsthorpe to Cambridge & London',
    worldLabel: 'World of 1687',
    worldEraLabel: 'Age of Reason · Late 17th Century',
    originName: 'Woolsthorpe',
    originCoords: [-0.6305, 52.809],

    viewBounds: {
      lon: [-4.8, 3.6],
      lat: [50.2, 54.4]
    },

    waterLabels: [
      { name: 'NORTH SEA', coords: [2.4, 53.2], regionalOnly: true },
      { name: 'ENGLISH CHANNEL', coords: [-2.0, 50.3], regionalOnly: true },
      { name: 'IRISH SEA', coords: [-4.4, 53.3], regionalOnly: true },
      { name: 'ATLANTIC OCEAN', coords: [-28, -4], worldOnly: true },
      { name: 'INDIAN OCEAN', coords: [78, -22], worldOnly: true },
      { name: 'PACIFIC OCEAN', coords: [-130, -8], worldOnly: true }
    ],

    defaultEraKey: 'britain1687',
    territorySets: {
      britain1687: {
        empireLabel: 'Kingdom of England & Great Britain',
        dependentLabel: 'European Republic of Letters',
        rivalLabel: 'Louis XIV’s France',
        empire: ['United Kingdom'],
        dependent: ['Netherlands', 'Germany', 'Switzerland'],
        ally: [],
        rival: ['France']
      }
    },

    worldRealms: [
      { id: 'france', name: 'France of Louis XIV', desc: 'Rival philosophical realm of René Descartes and the Académie des Sciences; Voltaire later championed Newton’s physics across the continent.', cssVar: '--terr-rival', countries: ['France'], label: 'FRANCE', labelCoords: [2.2, 47.0] },
      { id: 'dutch', name: 'Dutch Republic', desc: 'Home of Christiaan Huygens and Baruch Spinoza; William of Orange sailed to England in the Glorious Revolution of 1688.', cssVar: '--realm-us', countries: ['Netherlands'], label: 'DUTCH REPUBLIC', labelCoords: [5.5, 52.3] },
      { id: 'qing', name: 'Qing Dynasty China (Kangxi)', desc: 'Flourishing reign of the Kangxi Emperor, who studied European astronomy and geometry in Beijing.', cssVar: '--realm-qing', countries: ['China'], label: 'QING DYNASTY', labelCoords: [108.0, 34.5] },
      { id: 'mughal', name: 'Mughal India (Aurangzeb)', desc: 'Subcontinental empire at its widest territorial extent.', cssVar: '--realm-maratha', countries: ['India', 'Pakistan'], label: 'MUGHAL EMPIRE', labelCoords: [78.5, 22.5] },
      { id: 'ottoman', name: 'Ottoman Empire', desc: 'Following the 1683 Siege of Vienna.', cssVar: '--realm-ottoman', countries: ['Turkey', 'Iraq', 'Syria', 'Egypt'], label: 'OTTOMAN EMPIRE', labelCoords: [35.0, 38.0] }
    ],

    historicalNames: {
      'United Kingdom': 'Kingdom of England (Great Britain from 1707)',
      France: 'Kingdom of France (Louis XIV)',
      Netherlands: 'Dutch Republic'
    },

    worldPlaces: [
      { name: 'Hanover', year: '1684', detail: 'Residence of Gottfried Wilhelm Leibniz, who published differential calculus independently—igniting history’s fiercest priority dispute.', coords: [9.732, 52.3759] },
      { name: 'Paris', year: '1687', detail: 'Seat of the French Academy of Sciences, where Cartesian vortex physics yielded slowly to Newtonian gravity.', coords: [2.3522, 48.8566] },
      { name: 'Boston', year: '1687', detail: 'Colonial North America; Harvard adopted Newton’s Principia within a generation.', coords: [-71.0589, 42.3601] }
    ],

    sources: [
      { label: 'The Newton Project · Oxford', url: 'https://www.newtonproject.ox.ac.uk/' },
      { label: 'Cambridge Digital Library · Newton Papers', url: 'https://cudl.lib.cam.ac.uk/collections/newton/' }
    ],

    stages: [
      {
        number: 1,
        roman: 'I',
        id: 'woolsthorpe',
        year: '1643',
        age: 'Birth',
        date: '4 January 1643 (25 Dec 1642 O.S.)',
        location: 'Woolsthorpe Manor, Lincolnshire',
        shortPlace: 'Woolsthorpe',
        coords: [-0.6305, 52.809],
        coordText: '52°49′N, 0°38′W',
        eraKey: 'britain1687',
        labelPos: [-15, -4],
        alignEnd: true,
        routeCurve: 0,
        focusMultiplier: 1.55,
        title: 'The Posthumous Farmer’s Son & Plague Year',
        prose: 'Born prematurely on Christmas Day (Old Style) in a stone farmhouse in Lincolnshire—three months after his illiterate father died—Newton was small enough to fit inside a quart mug. Though his mother tried pulling him from school to manage the farm, he neglected sheep to build water clocks and sundials, eventually returning home during the Great Plague of 1665–1666 for the single most astonishing burst of solitary genius in scientific history.',
        fact: 'Newton unlocked the universal laws governing planets, moons, and tides while barely ever traveling more than 160 kilometers from Woolsthorpe—he never once left England or saw the open ocean.',
        quote: {
          en: 'All this was in the two plague years of 1665 and 1666, for in those days I was in the prime of my age for invention, and minded Mathematicks and Philosophy more than at any time since.',
          orig: '',
          provenance: 'Autobiographical memorandum, Portsmouth Collection (Cambridge University Library, Add. MS 3968)'
        },
        subTabsLabel: 'Woolsthorpe chapters:',
        subStages: [
          {
            label: '1643 · Birthplace',
            year: '1643',
            age: 'Birth',
            date: '4 January 1643 (25 Dec 1642 O.S.)',
            title: 'The Posthumous Farmer’s Son',
            prose: 'Born prematurely on Christmas Day (Old Style) in a stone farmhouse in Lincolnshire—three months after his illiterate father died—Newton was small enough to fit inside a quart mug. Though his mother tried pulling him from school to manage the farm, he neglected sheep to build water clocks and sundials until his schoolmaster and uncle intervened to send him to Cambridge.',
            fact: 'Newton unlocked the universal laws governing planets, moons, and tides while barely ever traveling more than 160 kilometers from Woolsthorpe—he never once left England.',
            quote: {
              en: 'Truth is ever to be found in simplicity, and not in the multiplicity and confusion of things.',
              orig: '',
              provenance: 'Rules for Methodizing the Apocalypse (c. 1670s, Newton Project)'
            }
          },
          {
            label: '1666 · Annus Mirabilis',
            year: '1666',
            age: 'Age 23',
            date: '1665 – 1666',
            title: 'The Plague Year & the Falling Apple',
            prose: 'When bubonic plague closed Cambridge University, twenty-two-year-old Newton retreated to Woolsthorpe for eighteen months. Working alone in his bedroom and orchard, he invented differential and integral calculus (“fluxions”), split sunlight with a glass prism to prove white light is a spectrum of colors, and—triggered by watching an apple fall—deduced that the same inverse-square force pulls both the apple and the Moon.',
            fact: 'No apple ever hit Newton on the head; his friend William Stukeley recorded Newton’s own recollection over tea in 1726: he simply watched an apple drop straight down and wondered why gravity extends all the way to the Moon.',
            quote: {
              en: 'All this was in the two plague years of 1665 and 1666, for in those days I was in the prime of my age for invention, and minded Mathematicks and Philosophy more than at any time since.',
              orig: '',
              provenance: 'Autobiographical memorandum (Cambridge University Library, Add. MS 3968)'
            }
          }
        ]
      },
      {
        number: 2,
        roman: 'II',
        id: 'cambridge',
        year: '1687',
        age: 'Age 44',
        date: '1661 – 1696 (Principia, July 1687)',
        location: 'Trinity College, Cambridge',
        shortPlace: 'Cambridge',
        coords: [0.117, 52.207],
        coordText: '52°12′N, 0°07′E',
        eraKey: 'britain1687',
        labelPos: [15, -4],
        routeCurve: 0.16,
        focusMultiplier: 1.55,
        title: 'The Principia Mathematica',
        prose: 'Appointed Lucasian Professor of Mathematics at twenty-six, Newton spent thirty-five solitary years at Trinity College building the first practical reflecting telescope, conducting secret alchemical experiments, and—prodded by astronomer Edmond Halley—working eighteen months straight to compose Philosophiæ Naturalis Principia Mathematica (1687). Its three laws of motion and universal gravitation unified earthly mechanics and celestial astronomy into one mathematical cosmos.',
        fact: 'Because the Royal Society had spent its entire publishing budget on Francis Willughby’s illustrated History of Fishes, Edmond Halley personally paid out of his own pocket to print Newton’s Principia.',
        quote: {
          en: 'If I have seen further it is by standing on the shoulders of Giants.',
          orig: '',
          provenance: 'Letter to Robert Hooke, 5 February 1676 (Historical Society of Pennsylvania)'
        },
        subTabsLabel: 'Cambridge chapters:',
        subStages: [
          {
            label: '1687 · Principia',
            year: '1687',
            age: 'Age 44',
            date: '5 July 1687',
            title: 'The Principia Mathematica',
            prose: 'Prodded by astronomer Edmond Halley to prove what orbit an inverse-square gravity law produces, Newton locked himself in his Trinity rooms for eighteen months, often forgetting to eat or sleep, to write Philosophiæ Naturalis Principia Mathematica. In three Latin books he formulated the three laws of motion and universal gravitation, explaining tides, comets, and planetary ellipses with breathtaking precision.',
            fact: 'Because the Royal Society had spent its entire publishing budget on Francis Willughby’s illustrated History of Fishes, Edmond Halley personally paid out of his own pocket to print Newton’s Principia.',
            quote: {
              en: 'I frame no hypotheses; for whatever is not deduced from the phenomena is to be called an hypothesis.',
              orig: 'Hypotheses non fingo.',
              origLang: 'Latina',
              provenance: 'General Scholium, Principia Mathematica (2nd edition, 1713)'
            }
          },
          {
            label: '1669 · Lucasian Chair & Light',
            year: '1669',
            age: 'Age 26',
            date: '1669 – 1676',
            title: 'Prisms, Reflecting Telescopes & Calculus',
            prose: 'Succeeding his mentor Isaac Barrow as Lucasian Professor at just twenty-six, Newton built a tiny six-inch reflecting telescope using a curved mirror to eliminate color distortion—winning instant election to the Royal Society. His first published paper on light and color sparked fierce correspondence with Robert Hooke, prompting Newton’s famous line about standing on the shoulders of giants.',
            fact: 'In his private rooms at Trinity, Newton wrote over a million words on alchemy and biblical chronology—far more words than he ever published on physics and mathematics combined.',
            quote: {
              en: 'If I have seen further it is by standing on the shoulders of Giants.',
              orig: '',
              provenance: 'Letter to Robert Hooke, 5 February 1676'
            }
          }
        ]
      },
      {
        number: 3,
        roman: 'III',
        id: 'london',
        year: '1704',
        age: 'Age 61',
        date: '1696 – 31 March 1727',
        location: 'Tower of London & Westminster',
        shortPlace: 'London',
        coords: [-0.1278, 51.5074],
        coordText: '51°30′N, 0°08′W',
        eraKey: 'britain1687',
        labelPos: [15, 6],
        routeCurve: -0.16,
        focusMultiplier: 1.55,
        title: 'Master of the Mint, Opticks & the Sea-Shore',
        prose: 'Leaving Cambridge for London in 1696 as Warden and then Master of the Royal Mint, Newton rescued England’s clipped silver currency in the Great Recoinage and personally interrogated counterfeiters in taverns and Newgate Prison. Elected President of the Royal Society in 1703, he published Opticks in English in 1704, was knighted by Queen Anne, and upon his death in 1727 became the first scientist buried in state in Westminster Abbey.',
        fact: 'As Master of the Mint, Newton introduced milled (ridged) coin edges to foil coin-clippers and fixed the gold guinea at 21 silver shillings—inadvertently putting Britain on the world’s first de facto gold standard.',
        quote: {
          en: 'I do not know what I may appear to the world, but to myself I seem to have been only like a boy playing on the sea-shore, and diverting myself in now and then finding a smoother pebble or a prettier shell than ordinary, whilst the great ocean of truth lay all undiscovered before me.',
          orig: '',
          provenance: 'Recorded shortly before his death in Joseph Spence’s Anecdotes & Memoirs of Sir Isaac Newton'
        },
        subTabsLabel: 'London chapters:',
        subStages: [
          {
            label: '1704–27 · Opticks & Royal Society',
            year: '1704',
            age: 'Age 61',
            date: '1703 – 31 March 1727',
            title: 'President of Science & the Ocean of Truth',
            prose: 'Elected President of the Royal Society in 1703—a post he held with iron authority for twenty-four years—Newton published Opticks in lucid English in 1704, exploring interference rings, diffraction, and thirty-one visionary Queries on atoms and forces. When he died at eighty-four in Kensington in 1727, Voltaire marveled at his funeral in Westminster Abbey: “He was buried like a king who had done good to his subjects.”',
            fact: 'Alexander Pope wrote the celebrated couplet intended for Newton’s Westminster tomb: “Nature and Nature’s laws lay hid in night: God said, Let Newton be! and all was light.”',
            quote: {
              en: 'I do not know what I may appear to the world, but to myself I seem to have been only like a boy playing on the sea-shore, and diverting myself in now and then finding a smoother pebble or a prettier shell than ordinary, whilst the great ocean of truth lay all undiscovered before me.',
              orig: '',
              provenance: 'Recorded shortly before his death in Joseph Spence’s Anecdotes'
            }
          },
          {
            label: '1696 · Warden of the Mint',
            year: '1696',
            age: 'Age 53',
            date: '1696 – 1700',
            title: 'Hunting Counterfeiters at the Tower',
            prose: 'Expected to treat his Royal Mint post at the Tower of London as a comfortable retirement sinecure, Newton instead worked with fierce administrative intensity—overseeing the complete melting and re-minting of England’s silver coinage while building an informant network that hunted down master counterfeiter William Chaloner.',
            fact: 'In January 1697, returning exhausted from the Mint at 4 p.m., Newton opened Johann Bernoulli’s fiendish “brachistochrone” calculus challenge meant to stump him—and solved it completely before going to bed at 4 a.m.',
            quote: {
              en: 'I do not love to be dunned and teased by foreigners about mathematical things.',
              orig: '',
              provenance: 'Remark to his niece Catherine Barton after solving Bernoulli’s challenge overnight (1697)'
            }
          }
        ]
      }
    ]
  };
})(window);
