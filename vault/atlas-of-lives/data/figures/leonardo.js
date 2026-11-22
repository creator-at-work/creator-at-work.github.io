/* ==========================================================================
   LEONARDO DA VINCI (1452–1519) — Historical Life Atlas
   Sources: Leonardo’s Notebooks (Codex Atlanticus, Codex Leicester, Windsor
            Folios), Giorgio Vasari (Lives of the Artists), Walter Isaacson
   ========================================================================== */

(function (global) {
  'use strict';

  global.ATLAS_FIGURES = global.ATLAS_FIGURES || {};

  global.ATLAS_FIGURES.leonardo = {
    id: 'leonardo',
    era: 'Medieval & Renaissance',
    title: 'Leonardo da Vinci',
    fullName: 'Leonardo di ser Piero da Vinci',
    years: '1452 — 1519',
    subtitle: 'Vinci & Florence to Amboise',
    worldLabel: 'World of 1503',
    worldEraLabel: 'High Renaissance Europe · c. 1500',
    originName: 'Vinci & Florence',
    originCoords: [11.2558, 43.7696],

    viewBounds: {
      lon: [-1.5, 16.0],
      lat: [40.5, 49.0]
    },

    waterLabels: [
      { name: 'TYRRHENIAN SEA', coords: [11.2, 41.2], regionalOnly: true },
      { name: 'ADRIATIC SEA', coords: [14.5, 43.6], regionalOnly: true },
      { name: 'ATLANTIC OCEAN', coords: [-28, -4], worldOnly: true },
      { name: 'INDIAN OCEAN', coords: [78, -22], worldOnly: true },
      { name: 'PACIFIC OCEAN', coords: [-130, -8], worldOnly: true }
    ],

    defaultEraKey: 'renaissance1503',
    territorySets: {
      renaissance1503: {
        empireLabel: 'Italian Renaissance States (Florence, Milan, Venice, Rome)',
        dependentLabel: 'Kingdom of France (Patron of Final Years)',
        rivalLabel: 'Habsburg & Ottoman Spheres',
        empire: ['Italy'],
        dependent: ['France'],
        ally: [],
        rival: ['Spain', 'Austria', 'Germany', 'Turkey']
      }
    },

    worldRealms: [
      { id: 'ottoman', name: 'Ottoman Empire', desc: 'Expanding Mediterranean superpower under Bayezid II, to whom Leonardo submitted a bold 240-meter single-span bridge design for the Golden Horn.', cssVar: '--realm-ottoman', countries: ['Turkey', 'Greece', 'Bulgaria', 'Serbia'], label: 'OTTOMAN EMPIRE', labelCoords: [29.0, 39.5] },
      { id: 'spain', name: 'Crown of Spain', desc: 'United under Ferdinand and Isabella; Columbus had just crossed the Atlantic in 1492.', cssVar: '--realm-spain', countries: ['Spain', 'Mexico'], label: 'SPANISH CROWN', labelCoords: [-4.0, 40.0] },
      { id: 'ming', name: 'Ming Dynasty China', desc: 'Flourishing arts, porcelain, and urban culture in East Asia.', cssVar: '--realm-qing', countries: ['China'], label: 'MING DYNASTY', labelCoords: [108.0, 34.5] },
      { id: 'vijayanagara', name: 'Vijayanagara & Delhi', desc: 'Great kingdoms of South Asia on the eve of the Mughal era.', cssVar: '--realm-maratha', countries: ['India'], label: 'INDIA', labelCoords: [79.0, 21.0] },
      { id: 'safavid', name: 'Safavid Persia', desc: 'Newly unified Iranian empire founded in 1501 by Shah Ismail I.', cssVar: '--realm-persia', countries: ['Iran'], label: 'SAFAVID PERSIA', labelCoords: [53.0, 33.0] }
    ],

    historicalNames: {
      Italy: 'Republic of Florence, Duchy of Milan, Venice & Papal States',
      France: 'Kingdom of France (Francis I)',
      Turkey: 'Ottoman Empire (Constantinople)'
    },

    worldPlaces: [
      { name: 'Constantinople', year: '1502', detail: 'Leonardo drafted an audacious single-arch stone bridge across the Golden Horn for Sultan Bayezid II; engineers confirmed its structural soundness 500 years later.', coords: [28.9784, 41.0082] },
      { name: 'Seville', year: '1503', detail: 'Gateway of Spain’s newly opened Atlantic voyages to the Americas.', coords: [-5.9845, 37.3891] },
      { name: 'Nuremberg', year: '1500', detail: 'Northern Renaissance printmaking center of Albrecht Dürer.', coords: [11.0767, 49.4521] }
    ],

    sources: [
      { label: 'Leonardo · Notebooks (British Library)', url: 'https://www.bl.uk/people/leonardo-da-vinci' },
      { label: 'Britannica', url: 'https://www.britannica.com/biography/Leonardo-da-Vinci' }
    ],

    stages: [
      {
        number: 1,
        roman: 'I',
        id: 'florence',
        year: '1466',
        age: 'Age 14',
        date: '1452 – 1482',
        location: 'Vinci & Florence, Tuscany',
        shortPlace: 'Florence',
        coords: [11.2558, 43.7696],
        coordText: '43°46′N, 11°15′E',
        eraKey: 'renaissance1503',
        labelPos: [-15, 6],
        alignEnd: true,
        routeCurve: 0,
        focusMultiplier: 1.55,
        title: 'Apprentice in Verrocchio’s Workshop',
        prose: 'Born out of wedlock in the Tuscan hill village of Vinci in 1452, Leonardo was barred from university and the notary guild—freeing him to learn directly from nature rather than Latin scholastic texts. Apprenticed around fourteen to Florentine master Andrea del Verrocchio, he mastered painting, bronze casting, optics, and mechanics—painting a kneeling angel in The Baptism of Christ so luminous that Vasari claimed Verrocchio laid down his brush forever.',
        fact: 'Left-handed throughout his life, Leonardo wrote over 7,000 surviving notebook pages in crisp right-to-left mirror script—not primarily for secrecy, but to avoid smudging wet ink with his left hand.',
        quote: {
          en: 'Experience never errs; it is only your judgments that err by promising themselves effects such as are not caused by your experiments.',
          orig: 'La sperienza non falla mai, ma solo fallano i vostri giudizi.',
          origLang: 'Italiano',
          provenance: 'Codex Atlanticus, fol. 154r'
        },
        subTabsLabel: 'Florence chapters:',
        subStages: [
          {
            label: '1466 · Apprentice',
            year: '1466',
            age: 'Age 14',
            date: '1452 – 1482',
            title: 'Apprentice in Verrocchio’s Workshop',
            prose: 'Born out of wedlock in the Tuscan hill village of Vinci in 1452, Leonardo was barred from university and the notary guild—freeing him to learn directly from nature rather than Latin scholastic texts. Apprenticed around fourteen to Florentine master Andrea del Verrocchio, he mastered painting, bronze casting, optics, and mechanics—painting a kneeling angel in The Baptism of Christ so luminous that Vasari claimed Verrocchio laid down his brush forever.',
            fact: 'Left-handed throughout his life, Leonardo wrote over 7,000 surviving notebook pages in crisp right-to-left mirror script—not primarily for secrecy, but to avoid smudging wet ink with his left hand.',
            quote: {
              en: 'Experience never errs; it is only your judgments that err by promising themselves effects such as are not caused by your experiments.',
              orig: 'La sperienza non falla mai, ma solo fallano i vostri giudizi.',
              origLang: 'Italiano',
              provenance: 'Codex Atlanticus, fol. 154r'
            }
          },
          {
            label: '1503 · Mona Lisa & Anatomy',
            year: '1503',
            age: 'Age 51',
            date: '1503 – 1506',
            title: 'The Mona Lisa & Nocturnal Dissections',
            prose: 'Returning to Florence in his fifties, Leonardo began his oil portrait of Lisa Gherardini—the Mona Lisa—carrying the poplar panel with him for sixteen years as he refined its gossamer sfumato shadows. By night at the hospital of Santa Maria Nuova, he dissected more than thirty human corpses, producing anatomical drawings of the heart valves, spine, and fetus unmatched in accuracy for centuries.',
            fact: 'Leonardo’s notebooks reveal he understood how the eye’s peripheral vision perceives shadows differently from direct gaze—explaining why the Mona Lisa’s smile seems to shift depending on where the viewer looks.',
            quote: {
              en: 'Painting is poetry that is seen rather than felt, and poetry is painting that is felt rather than seen.',
              orig: 'La pittura è una poesia che si vede e non si sente, e la poesia è una pittura che si sente e non si vede.',
              origLang: 'Italiano',
              provenance: 'Treatise on Painting (Codex Urbinas Latinus 1270)'
            }
          }
        ]
      },
      {
        number: 2,
        roman: 'II',
        id: 'milan',
        year: '1482',
        age: 'Age 30',
        date: '1482 – 1499',
        location: 'Milan, Duchy of Milan',
        shortPlace: 'Milan',
        coords: [9.19, 45.4642],
        coordText: '45°28′N, 9°11′E',
        eraKey: 'renaissance1503',
        labelPos: [-15, -4],
        alignEnd: true,
        routeCurve: -0.16,
        focusMultiplier: 1.55,
        title: 'The Last Supper & the Vitruvian Man',
        prose: 'Applying to Duke Ludovico Sforza of Milan with a remarkable letter listing nine military engineering skills—and only mentioning at the end that “in painting I can do as well as any other”—Leonardo spent seventeen fertile years in Milan. There he drew the Vitruvian Man, filled notebooks with flying machines and hydraulic locks, and painted The Last Supper on the refectory wall of Santa Maria delle Grazie.',
        fact: 'Because Leonardo hated the hurried wet-plaster pace of traditional fresco, he painted The Last Supper with experimental tempera and oil on dry plaster—giving him time to pause and stare for hours, though the paint began flaking within his own lifetime.',
        quote: {
          en: 'In time of peace I believe I can give perfect satisfaction and to the equal of any other in architecture… also I can carry out sculpture in marble, bronze, or clay, and also in painting whatever may be done.',
          orig: '',
          provenance: 'Letter to Ludovico Sforza, Duke of Milan (c. 1482, Codex Atlanticus)'
        }
      },
      {
        number: 3,
        roman: 'III',
        id: 'venice',
        year: '1500',
        age: 'Age 47',
        date: 'March – April 1500',
        location: 'Venice, Republic of Venice',
        shortPlace: 'Venice',
        coords: [12.3155, 45.4408],
        coordText: '45°26′N, 12°19′E',
        eraKey: 'renaissance1503',
        labelPos: [14, -6],
        routeCurve: 0.14,
        focusMultiplier: 1.55,
        title: 'Naval Engineer on the Lagoon',
        prose: 'When French armies invaded Milan in 1499, Leonardo fled east to Venice alongside mathematician Luca Pacioli. Hired by the Venetian Senate as a military and hydraulic consultant against Ottoman naval raids, he surveyed the Isonzo River frontier, proposed movable floodgates, and sketched underwater breathing suits and hull-piercing divers—though he deliberately withheld his submarine design for fear of human cruelty.',
        fact: 'Leonardo’s notebooks explicitly explain why he refused to publish his underwater diving apparatus: “because of the evil nature of men, who would practice assassination at the bottom of the seas.”',
        quote: {
          en: 'How by an appliance many are able to remain for some time under water. How and why I do not describe my method of remaining under water… because of the evil nature of men.',
          orig: '',
          provenance: 'Codex Leicester, fol. 22v (c. 1506–1510)'
        }
      },
      {
        number: 4,
        roman: 'IV',
        id: 'cesena',
        year: '1502',
        age: 'Age 50',
        date: '1502 – 1503',
        location: 'Imola & Cesena, Romagna',
        shortPlace: 'Romagna',
        coords: [12.2432, 44.1396],
        coordText: '44°08′N, 12°15′E',
        eraKey: 'renaissance1503',
        labelPos: [14, 6],
        routeCurve: 0.16,
        focusMultiplier: 1.6,
        title: 'The Birth of Modern Cartography',
        prose: 'Serving briefly as Chief Military Architect and Engineer to Cesare Borgia across central Italy—where he crossed paths with Florentine diplomat Niccolò Machiavelli—Leonardo revolutionized mapmaking. Surveying the walled town of Imola with a compass and paced bearings, he drew history’s first true ichnographic (bird’s-eye) city plan, replacing medieval artistic views with mathematical precision.',
        fact: 'Leonardo’s 1502 plan of Imola is so exact that when overlaid onto modern satellite imagery of the town today, its streets, plazas, and fortress walls align almost millimeter for millimeter.',
        quote: {
          en: 'Water is the driving force of all nature.',
          orig: 'L’acqua è il vetturale della natura.',
          origLang: 'Italiano',
          provenance: 'Notebooks on hydraulics & earth sciences (Windsor & Codex Leicester)'
        }
      },
      {
        number: 5,
        roman: 'V',
        id: 'rome',
        year: '1513',
        age: 'Age 61',
        date: '1513 – 1516',
        location: 'Belvedere Palace, Rome',
        shortPlace: 'Rome',
        coords: [12.4964, 41.9028],
        coordText: '41°54′N, 12°30′E',
        eraKey: 'renaissance1503',
        labelPos: [14, 4],
        routeCurve: -0.15,
        focusMultiplier: 1.55,
        title: 'Mirrors, Fossils & the Vatican Years',
        prose: 'Invited to Rome under the patronage of Giuliano de’ Medici, brother of Pope Leo X, the aging Leonardo lived in the Vatican Belvedere at the same moment Michelangelo and Raphael were painting masterpieces nearby. Rather than competing on frescoes, he focused on parabolic solar mirrors, botanical studies, swirling Deluge drawings, and fossilized seashells in mountain rock—deducing that Earth was vastly older than biblical chronology allowed.',
        fact: 'In his Roman notebooks, Leonardo scribbled a wistful personal lament across a page of geometric studies: “Tell me if anything was ever done… tell me.”',
        quote: {
          en: 'Tell me if anything was ever done.',
          orig: 'Dimmi se mai fu fatto alcuna cosa.',
          origLang: 'Italiano',
          provenance: 'Repeated marginal refrain in Leonardo’s late notebooks (Codex Atlanticus)'
        }
      },
      {
        number: 6,
        roman: 'VI',
        id: 'amboise',
        year: '1519',
        age: 'Age 67',
        date: '1516 – 2 May 1519',
        location: 'Château du Clos Lucé, Amboise (France)',
        shortPlace: 'Amboise',
        coords: [0.992, 47.4103],
        coordText: '47°25′N, 0°59′E',
        eraKey: 'renaissance1503',
        labelPos: [-15, -4],
        alignEnd: true,
        routeCurve: -0.16,
        focusMultiplier: 1.5,
        title: 'Premier Painter to the King of France',
        prose: 'At sixty-four, Leonardo crossed the Alps by mule—carrying his notebooks and three cherished paintings, including the Mona Lisa—to accept the invitation of young King Francis I of France. Settled in the manor of Clos Lucé near the royal château of Amboise with a generous pension and complete freedom simply to think and converse, he died peacefully on May 2, 1519.',
        fact: 'King Francis I purchased the Mona Lisa from Leonardo’s workshop—the reason Florence’s most famous portrait has hung in France’s Louvre rather than Italy ever since.',
        quote: {
          en: 'As a well-spent day brings happy sleep, so a life well used brings happy death.',
          orig: 'Sì come una giornata bene spesa dà lieto dormire, così una vita bene usata dà lieto morire.',
          origLang: 'Italiano',
          provenance: 'Codex Trivulzianus, fol. 27r'
        }
      }
    ]
  };
})(window);
