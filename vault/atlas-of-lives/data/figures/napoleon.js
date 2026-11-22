/* ==========================================================================
   NAPOLÉON BONAPARTE (1769–1821) — Historical Life Atlas & Era Globe
   Default frame: uncluttered 1–10 trajectory across Europe, Egypt & Russia
   (with Saint Helena inset). Zooming out / panning reveals the living world
   of 1769–1821 with contemporaneous empires and historic places.
   ========================================================================== */

(function (global) {
  'use strict';

  global.ATLAS_FIGURES = global.ATLAS_FIGURES || {};

  global.ATLAS_FIGURES.napoleon = {
    id: 'napoleon',
    era: 'Enlightenment & Empire',
    title: 'Napoléon',
    fullName: 'Napoléon Bonaparte',
    years: '1769 — 1821',
    subtitle: 'Ajaccio to Saint Helena',
    worldLabel: 'World of 1812',
    worldEraLabel: 'World · 1769–1821',
    originName: 'Ajaccio',
    originCoords: [8.7346, 41.9272],

    /* Default opening visual frame (Europe, Mediterranean, Egypt, Russia) */
    viewBounds: {
      lon: [-14.5, 43.0],
      lat: [25.5, 59.5]
    },

    /* Quiet ocean labels across the full interactive globe */
    waterLabels: [
      { name: 'ATLANTIC OCEAN', coords: [-28, -4], worldOnly: true },
      { name: 'INDIAN OCEAN', coords: [78, -22], worldOnly: true },
      { name: 'PACIFIC OCEAN', coords: [-130, -8], worldOnly: true },
      { name: 'ATLANTIC OCEAN', coords: [-11.5, 43.2], regionalOnly: true },
      { name: 'MEDITERRANEAN SEA', coords: [16.5, 34.4], regionalOnly: true }
    ],

    /* Engraved Saint Helena inset — visible in Europe Life Frame, dissolves when zoomed out to globe */
    inset: {
      title: 'Saint Helena',
      coordsText: '15°56′ S, 5°42′ W',
      caption: 'South Atlantic · 1,900 km off Africa',
      w: 186,
      h: 174,
      stageNumber: 10,
      islandPolygon: [
        [108, 56], [124, 60], [137, 69], [144, 83], [141, 98],
        [131, 110], [119, 120], [104, 127], [88, 130], [72, 127],
        [58, 121], [48, 112], [43, 100], [50, 88], [62, 79],
        [75, 72], [87, 64], [97, 57]
      ],
      markerOffset: [110, 90]
    },

    /* Dynamic European territorial states (whisper-soft tint in Life View, full historical atlas on World Globe) */
    defaultEraKey: 'peak1812',
    territorySets: {
      kingdom1769: {
        empire: ['France'],
        dependent: [],
        ally: [],
        rival: ['United Kingdom', 'Austria']
      },
      republic1796: {
        empire: ['France', 'Belgium', 'Luxembourg'],
        dependent: ['Netherlands', 'Italy'],
        ally: ['Spain'],
        rival: ['United Kingdom', 'Austria']
      },
      egypt1798: {
        empire: ['France', 'Belgium', 'Luxembourg'],
        dependent: ['Netherlands', 'Switzerland', 'Italy'],
        ally: ['Spain'],
        rival: ['United Kingdom', 'Egypt', 'Turkey', 'Austria', 'Russia']
      },
      consulate1804: {
        empire: ['France', 'Belgium', 'Luxembourg'],
        dependent: ['Netherlands', 'Switzerland', 'Italy'],
        ally: ['Spain'],
        rival: ['United Kingdom', 'Austria', 'Russia']
      },
      peak1812: {
        empire: ['France', 'Belgium', 'Netherlands', 'Luxembourg', 'Croatia', 'Slovenia'],
        dependent: ['Spain', 'Italy', 'Switzerland', 'Germany', 'Poland'],
        ally: ['Austria', 'Czechia', 'Hungary', 'Slovakia', 'Denmark', 'Norway'],
        rival: ['United Kingdom', 'Russia', 'Sweden', 'Turkey', 'Portugal']
      },
      collapse1813: {
        empire: ['France'],
        dependent: [],
        ally: [],
        rival: ['United Kingdom', 'Russia', 'Austria', 'Germany', 'Spain', 'Sweden', 'Netherlands']
      },
      waterloo1815: {
        empire: ['France'],
        dependent: [],
        ally: [],
        rival: ['United Kingdom', 'Belgium', 'Netherlands', 'Germany', 'Austria', 'Russia']
      },
      exile1821: {
        empire: [],
        dependent: [],
        ally: [],
        rival: ['United Kingdom']
      }
    },

    /* Contemporaneous World Empires of 1769–1821 (bloom softly when zooming out / exploring globe) */
    worldRealms: [
      {
        id: 'maratha',
        name: 'Maratha Empire & British India',
        postYear: {
          year: 1818,
          name: 'British East India Company',
          label: 'BRITISH INDIA',
          desc: 'Following the defeat of the Maratha Confederacy in 1818, the British East India Company dominated the subcontinent.'
        },
        desc: 'Maratha Confederacy (1674–1818), Kingdom of Mysore (until 1799), and the expanding British East India Company.',
        cssVar: '--realm-maratha',
        countries: ['India', 'Pakistan', 'Bangladesh', 'Sri Lanka', 'Nepal'],
        label: 'MARATHA EMPIRE',
        labelCoords: [79.5, 22.5]
      },
      {
        id: 'qing',
        name: 'Qing Dynasty',
        desc: 'Qing Empire (1636–1912) under the Qianlong and Jiaqing emperors, at its greatest territorial reach.',
        cssVar: '--realm-qing',
        countries: ['China', 'Mongolia', 'Taiwan'],
        label: 'QING DYNASTY',
        labelCoords: [104.0, 35.5]
      },
      {
        id: 'japan',
        name: 'Tokugawa Shogunate',
        desc: 'Edo-period Japan (1603–1868), maintaining strict maritime seclusion (sakoku) during the Napoleonic Wars.',
        cssVar: '--realm-japan',
        countries: ['Japan'],
        label: 'TOKUGAWA JAPAN',
        labelCoords: [142.0, 36.2]
      },
      {
        id: 'ottoman',
        name: 'Ottoman Empire',
        desc: 'Spanning Anatolia, the Balkans, the Levant, Mesopotamia, and North Africa—contested by Napoleon in Egypt (1798).',
        cssVar: '--realm-ottoman',
        countries: ['Turkey', 'Iraq', 'Syria', 'Jordan', 'Lebanon', 'Israel', 'Palestine', 'Egypt', 'Libya', 'Tunisia', 'Algeria', 'Greece', 'Bulgaria', 'Romania', 'Serbia', 'Bosnia and Herz.', 'Albania', 'Macedonia'],
        label: 'OTTOMAN EMPIRE',
        labelCoords: [35.5, 37.8]
      },
      {
        id: 'persia',
        name: 'Qajar Persia',
        desc: 'Persian Empire under Fath-Ali Shah Qajar, courted by Napoleon in 1807 via the Treaty of Finckenstein.',
        cssVar: '--realm-persia',
        countries: ['Iran'],
        label: 'QAJAR PERSIA',
        labelCoords: [54.0, 32.5]
      },
      {
        id: 'spanish',
        name: 'Spanish Empire',
        desc: 'Viceroyalties of New Spain, New Granada, Peru, and Río de la Plata—sparking Latin American independence after Napoleon’s 1808 invasion of Spain.',
        cssVar: '--realm-spanish',
        countries: ['Mexico', 'Guatemala', 'Honduras', 'Nicaragua', 'Costa Rica', 'Panama', 'Cuba', 'Colombia', 'Venezuela', 'Ecuador', 'Peru', 'Bolivia', 'Chile', 'Argentina', 'Uruguay', 'Paraguay'],
        label: 'SPANISH EMPIRE',
        labelCoords: [-66.5, -24.5]
      },
      {
        id: 'portuguese',
        name: 'Portuguese Brazil',
        desc: 'Seat of the Portuguese royal court from 1808 to 1821 after Prince Regent João fled Napoleon’s invasion of Portugal.',
        cssVar: '--realm-portuguese',
        countries: ['Brazil'],
        label: 'PORTUGUESE BRAZIL',
        labelCoords: [-51.5, -10.0]
      },
      {
        id: 'us',
        name: 'United States',
        desc: 'Young republic doubled in territory by Napoleon’s 1803 sale of the Louisiana Territory.',
        cssVar: '--realm-us',
        countries: ['United States of America'],
        label: 'UNITED STATES',
        labelCoords: [-101.0, 39.0]
      },
      {
        id: 'british_overseas',
        name: 'British Empire',
        desc: 'British North America, Cape Colony (seized from the Dutch in 1806), and early settlements in New South Wales.',
        cssVar: '--terr-rival',
        countries: ['Canada', 'Australia', 'South Africa'],
        label: 'BRITISH NORTH AMERICA',
        labelCoords: [-102.0, 57.5]
      }
    ],

    extraRealmLabels: [
      { text: 'RUSSIAN EMPIRE', coords: [86.0, 61.5] },
      { text: 'NEW SOUTH WALES', coords: [134.5, -25.0] }
    ],

    historicalNames: {
      France: 'First French Empire',
      Belgium: 'Annexed Departments (former Austrian Netherlands)',
      Netherlands: 'Kingdom of Holland / Annexed to France',
      Germany: 'Confederation of the Rhine & Prussia',
      Poland: 'Duchy of Warsaw',
      Italy: 'Kingdom of Italy & Naples',
      Spain: 'Kingdom of Spain (Peninsular War)',
      Switzerland: 'Swiss Confederation (Act of Mediation)',
      Austria: 'Austrian Empire',
      Czechia: 'Bohemia & Moravia (Austrian Empire)',
      Croatia: 'Illyrian Provinces',
      Slovenia: 'Illyrian Provinces',
      Russia: 'Russian Empire',
      'United Kingdom': 'United Kingdom of Great Britain & Ireland',
      Egypt: 'Ottoman Egypt',
      Turkey: 'Ottoman Empire',
      Denmark: 'Denmark–Norway',
      Norway: 'Denmark–Norway',
      Sweden: 'Kingdom of Sweden',
      Portugal: 'Kingdom of Portugal',
      'United States of America': 'United States (1803 Louisiana Purchase)',
      Haiti: 'Saint-Domingue / Republic of Haiti',
      'Saint Helena': 'Saint Helena (British East India Company)'
    },

    /* Historic world cities & places of Napoleon's time (revealed when exploring the globe) */
    worldPlaces: [
      {
        name: 'New Orleans · Louisiana',
        year: '1803',
        detail: 'Sold by Napoleon to the United States in 1803 for $15 million, ending French imperial ambitions in North America.',
        coords: [-90.0963, 29.9819]
      },
      {
        name: 'Saint-Domingue (Haiti)',
        year: '1801–04',
        detail: 'Toussaint Louverture and Jean-Jacques Dessalines defeated Napoleon’s expedition, founding the world’s first Black republic in 1804.',
        coords: [-72.335, 18.5392]
      },
      {
        name: 'Rio de Janeiro',
        year: '1808–21',
        detail: 'Temporary capital of the Portuguese Empire after the royal court fled Lisbon ahead of French troops in 1807.',
        coords: [-43.1729, -22.9068]
      },
      {
        name: 'Cape Trafalgar',
        year: '1805',
        detail: 'October 21, 1805 — Admiral Nelson shattered the Franco-Spanish fleet, securing British naval supremacy for a century.',
        coords: [-6.0339, 36.1833],
        alignEnd: true
      },
      {
        name: 'London',
        year: '1793–1815',
        detail: 'Financial and naval heart of seven European coalitions against Revolutionary and Napoleonic France.',
        coords: [-0.1278, 51.5074],
        alignEnd: true
      },
      {
        name: 'Constantinople',
        year: '1769–1821',
        detail: 'Imperial capital of the Ottoman Empire, balancing diplomacy between France, Britain, and Russia.',
        coords: [28.9784, 41.0082]
      },
      {
        name: 'Mysore',
        year: '1798–99',
        detail: 'Capital of Tipu Sultan, to whom Napoleon wrote from Egypt proposing an alliance against British India before Tipu fell in 1799.',
        coords: [76.6539, 12.3084]
      },
      {
        name: 'Calcutta',
        year: '1769–1821',
        detail: 'Seat of the British East India Company’s Governor-General and hub of British expansion across South Asia.',
        coords: [88.3639, 22.5726]
      },
      {
        name: 'Peking',
        year: '1769–1821',
        detail: 'Imperial capital of the Qing Dynasty, which rebuffed European trade concessions while commanding the world’s largest economy.',
        coords: [116.4074, 39.9042]
      },
      {
        name: 'Edo (Tokyo)',
        year: '1769–1821',
        detail: 'Seat of the Tokugawa Shogunate and one of the largest cities on Earth during the Napoleonic era.',
        coords: [139.6917, 35.6895]
      },
      {
        name: 'Mexico City',
        year: '1810–21',
        detail: 'Capital of New Spain; the Napoleonic invasion of Spain in 1808 triggered Mexico’s War of Independence (1810–1821).',
        coords: [-99.1332, 19.4326],
        alignEnd: true
      },
      {
        name: 'Cape Town',
        year: '1806',
        detail: 'Seized permanently by Britain from the Dutch in 1806 to guard the sea route around Africa to India.',
        coords: [18.4241, -33.9249]
      }
    ],

    sources: [
      { label: 'Britannica', url: 'https://www.britannica.com/summary/Napoleon-I-Timeline' },
      { label: 'Wikiquote', url: 'https://en.wikiquote.org/wiki/Napoleon' }
    ],

    /* 10 Numbered Chronological Stages (1 -> 10) from Birth to Death */
    stages: [
      {
        number: 1,
        roman: 'I',
        id: '1769',
        year: '1769',
        age: 'Birth',
        date: '15 August 1769',
        location: 'Ajaccio, Corsica',
        shortPlace: 'Ajaccio',
        coords: [8.7346, 41.9272],
        coordText: '41°56′N, 8°44′E',
        eraKey: 'kingdom1769',
        labelPos: [15, 5],
        routeCurve: 0,
        focusMultiplier: 1.35,
        title: 'Birth on a Newly French Island',
        prose: 'Born Napoleone Buonaparte to minor Corsican nobility, he grew up fiercely proud of his island homeland before being sent to mainland France at age nine to study at the royal military school in Brienne. Commissioned an artillery officer at sixteen, he entered the French Revolution as a restless outsider with a mathematician’s eye for terrain and guns.',
        fact: 'Corsica had been ceded by Genoa to France just fifteen months before his birth—making him a French subject by a sliver of history. He spoke Corsican and Italian before learning French, and kept an unmistakable accent all his life.',
        quote: {
          en: 'The character of its people destined it for liberty.',
          fr: '',
          provenance: 'Letters on Corsica, to Abbé Raynal, 1790'
        }
      },
      {
        number: 2,
        roman: 'II',
        id: '1793',
        year: '1793',
        age: 'Age 24',
        date: 'December 1793',
        location: 'Toulon, France',
        shortPlace: 'Toulon',
        coords: [5.928, 43.1242],
        coordText: '43°07′N, 5°56′E',
        eraKey: 'kingdom1769',
        labelPos: [-15, 5],
        alignEnd: true,
        routeCurve: -0.22,
        focusMultiplier: 1.35,
        title: 'Breakthrough at the Siege of Toulon',
        prose: 'When royalists handed France’s chief Mediterranean naval base at Toulon to the British fleet, young artillery captain Bonaparte saw the decisive point his senior generals missed: the Fort Mulgrave heights commanding the harbour mouth. Capturing that promontory under heavy fire forced the British ships to evacuate, winning him overnight renown and promotion straight to brigadier general.',
        fact: 'He took a bayonet wound to his thigh during the final night assault on December 16, 1793, and was promoted to brigadier general six days later—at just twenty-four years old.',
        quote: {
          en: 'Make them take steps which theory and practice alike have shown to be axiomatic.',
          fr: '',
          provenance: 'Dispatch to the Committee of Public Safety, 25 October 1793'
        }
      },
      {
        number: 3,
        roman: 'III',
        id: '1796',
        year: '1796',
        age: 'Age 26',
        date: 'March 1796 – October 1797',
        location: 'Lodi & Milan, Italy',
        shortPlace: 'Lodi',
        coords: [9.503, 45.313],
        coordText: '45°19′N, 9°30′E',
        eraKey: 'republic1796',
        labelPos: [15, -2],
        routeCurve: -0.18,
        focusMultiplier: 1.35,
        title: 'The Italian Lightning',
        prose: 'Two days after marrying Joséphine de Beauharnais, Napoleon took command of the ragged, underpaid Army of Italy. Through relentless forced marches and concentrated strikes—at Montenotte, Lodi, Arcole, and Rivoli—he dismantled far larger Austrian armies, entered Milan in triumph, and negotiated the Treaty of Campo Formio virtually on his own authority.',
        fact: 'At the Battle of Lodi on May 10, 1796, he personally helped sight cannons under Austrian fire—prompting his soldiers to give him the lifelong nickname le Petit Caporal (“the Little Corporal”).',
        quote: {
          en: 'All great events hang by a hair. The man of ability takes advantage of everything and neglects nothing.',
          fr: 'Tous les grands événements ne tiennent qu’à un cheveu. L’homme habile profite de tout, ne néglige rien.',
          provenance: 'Letter to Talleyrand, Passariano, 26 September 1797'
        }
      },
      {
        number: 4,
        roman: 'IV',
        id: '1798',
        year: '1798',
        age: 'Age 28',
        date: 'July 1798 – August 1799',
        location: 'Giza, Egypt',
        shortPlace: 'Giza',
        coords: [31.2089, 30.0131],
        coordText: '30°01′N, 31°13′E',
        eraKey: 'egypt1798',
        labelPos: [-15, 4],
        alignEnd: true,
        routeCurve: 0.16,
        focusMultiplier: 1.25,
        title: 'Soldiers and Scholars on the Nile',
        prose: 'Seeking to cut Britain’s trade route to India, Napoleon sailed to Egypt with 38,000 soldiers and 167 scientists, engineers, and artists. He defeated Egypt’s Mamluk rulers near the Pyramids in July 1798, but Admiral Horatio Nelson destroyed the French fleet at Aboukir Bay days later—stranding the army until Napoleon slipped back to France in 1799.',
        fact: 'Military engineers attached to his expedition unearthed the Rosetta Stone at Rashid in July 1799, laying the foundation for modern Egyptology and the decipherment of ancient hieroglyphs.',
        quote: {
          en: 'You are about to undertake a conquest the effects of which upon civilization and commerce are incalculable.',
          fr: '',
          provenance: 'Proclamation to the Army, June 1798'
        }
      },
      {
        number: 5,
        roman: 'V',
        id: '1804',
        year: '1804',
        age: 'Age 35',
        date: '21 March & 2 December 1804',
        location: 'Paris, France',
        shortPlace: 'Paris',
        coords: [2.3522, 48.8566],
        coordText: '48°51′N, 2°21′E',
        eraKey: 'consulate1804',
        labelPos: [-15, 5],
        alignEnd: true,
        routeCurve: -0.17,
        focusMultiplier: 1.35,
        title: 'The Code and the Crown',
        prose: 'Having seized power as First Consul in the 1799 Coup of 18 Brumaire, Napoleon stabilized France’s currency, reformed schools, reconciled with Rome, and enacted the Napoleonic Code in March 1804—sweeping away feudal privileges in favor of unified civil law. On December 2, 1804, he crowned himself Emperor of the French inside Notre-Dame.',
        fact: 'Breaking a thousand years of medieval precedent, Napoleon lifted the imperial crown himself before Pope Pius VII and placed it on his own head. His Civil Code remains the foundation of legal systems in over seventy countries.',
        quote: {
          en: 'My true glory is not to have won forty battles; Waterloo will erase the memory of so many victories. What will live forever is my Civil Code.',
          fr: 'Ma vraie gloire n’est pas d’avoir gagné quarante batailles. Waterloo effacera le souvenir de tant de victoires. Ce qui vivra éternellement, c’est mon code civil !',
          provenance: 'Recorded by General Montholon, Récits de la captivité (1847)'
        },
        subTabsLabel: 'Paris chapters:',
        subStages: [
          {
            label: '1799 · First Consul',
            year: '1799',
            age: 'Age 30',
            date: '9–10 November 1799',
            title: '18 Brumaire & First Consul',
            prose: 'Returning from Egypt to a fractured Republic, Bonaparte overthrew the Directory in the bloodless Coup of 18 Brumaire and became First Consul at thirty. He effectively ended a decade of revolutionary upheaval, won at Marengo in 1800, and consolidated executive authority across France.',
            fact: 'To fund his European wars after losing Saint-Domingue (Haiti), he sold the entire Louisiana Territory to the United States in 1803 for $15 million—doubling the size of the young republic overnight.',
            quote: {
              en: 'I can no longer obey; I have tasted command, and I cannot give it up.',
              fr: '',
              provenance: 'Memoirs of Count Miot de Melito'
            }
          },
          {
            label: '1804 · Emperor & Code',
            isDefault: true
          }
        ]
      },
      {
        number: 6,
        roman: 'VI',
        id: '1805',
        year: '1805',
        age: 'Age 36',
        date: '2 December 1805',
        location: 'Austerlitz, Moravia',
        shortPlace: 'Austerlitz',
        coords: [16.8765, 49.1533],
        coordText: '49°09′N, 16°53′E',
        eraKey: 'peak1812',
        labelPos: [15, 5],
        routeCurve: -0.15,
        focusMultiplier: 1.35,
        title: 'Battle of the Three Emperors',
        prose: 'On the first anniversary of his coronation, Napoleon lured the larger Russian and Austrian armies into attacking his deliberately weakened right flank, then stormed the vacated Pratzen Heights to slice their army in half. The rout forced Austria out of the war, dissolved the thousand-year-old Holy Roman Empire, and made him master of continental Europe.',
        fact: 'Dawn broke in heavy freezing mist until bright sunlight suddenly pierced the valley floor as French columns crested the heights—remembered ever after by soldiers as the “Sun of Austerlitz.”',
        quote: {
          en: 'It will be enough for you to say, “I was at the Battle of Austerlitz,” for people to reply, “There is a brave man.”',
          fr: 'Il suffira de dire : J’étais à la bataille d’Austerlitz, pour qu’on réponde : Voilà un brave !',
          provenance: 'Proclamation to the Grande Armée, 3 December 1805'
        }
      },
      {
        number: 7,
        roman: 'VII',
        id: '1812',
        year: '1812',
        age: 'Age 43',
        date: 'June – November 1812',
        location: 'Moscow, Russia',
        shortPlace: 'Moscow',
        coords: [37.6156, 55.7522],
        coordText: '55°45′N, 37°37′E',
        eraKey: 'peak1812',
        labelPos: [-15, 4],
        alignEnd: true,
        routeCurve: -0.15,
        focusMultiplier: 1.15,
        title: 'The Abyss of Russia',
        prose: 'To force Tsar Alexander I back into his economic blockade against Britain, Napoleon invaded Russia in June 1812 with roughly 600,000 soldiers drawn from across Europe. Russian commanders traded space for time, fought a brutal battle at Borodino, and abandoned Moscow to flames—leaving the Grande Armée to disintegrate during a freezing autumn retreat.',
        metric: {
          label: 'Grande Armée main force, 1812',
          summary: '600,000 → <10,000',
          rows: [
            { date: 'June 1812', width: '100%', color: 'var(--brass)', value: '600,000' },
            { date: 'Nov 1812', width: '2%', color: 'var(--accent)', value: '<10,000' }
          ]
        },
        fact: 'Napoleon waited thirty-five days inside the Kremlin expecting Tsar Alexander to negotiate terms. No reply ever arrived—turning his deepest geographic advance into the catastrophe that broke his aura of invincibility.',
        quote: {
          en: 'From the sublime to the ridiculous is but a step.',
          fr: 'Du sublime au ridicule il n’y a qu’un pas.',
          provenance: 'Spoken in Warsaw during the retreat, 10 December 1812 · Abbé de Pradt'
        }
      },
      {
        number: 8,
        roman: 'VIII',
        id: '1813',
        year: '1813',
        age: 'Age 44',
        date: 'October 1813 – April 1814',
        location: 'Leipzig, Saxony',
        shortPlace: 'Leipzig',
        coords: [12.3731, 51.3397],
        coordText: '51°20′N, 12°22′E',
        eraKey: 'collapse1813',
        labelPos: [0, -18],
        alignMiddle: true,
        routeCurve: 0.16,
        focusMultiplier: 1.35,
        title: 'Battle of the Nations & First Fall',
        prose: 'Sensing weakness after Russia, Prussia, Austria, Russia, and Sweden united in the Sixth Coalition and encircled Napoleon at Leipzig in October 1813. Defeated after four days of ferocious fighting, he withdrew behind the Rhine; allied armies entered Paris on March 30, 1814, forcing his abdication on April 6 and exile to the Mediterranean island of Elba.',
        fact: 'With roughly 600,000 soldiers engaged, Leipzig was the largest battle in European history prior to World War I. During the retreat, a corporal mistakenly detonated the Elster Bridge early, stranding 20,000 French troops inside the city.',
        quote: {
          en: 'What is the throne? A wooden frame covered with velvet. In political language, the throne is myself.',
          fr: 'Qu’est-ce qu’un trône ? Un morceau de bois recouvert de velours ; dans la langue politique, le trône c’est moi.',
          provenance: 'Address to the Legislative Body, December 1813'
        }
      },
      {
        number: 9,
        roman: 'IX',
        id: '1815',
        year: '1815',
        age: 'Age 45',
        date: '18 June 1815',
        location: 'Waterloo, Belgium',
        shortPlace: 'Waterloo',
        coords: [4.3991, 50.7147],
        coordText: '50°43′N, 4°24′E',
        eraKey: 'waterloo1815',
        labelPos: [15, -7],
        routeCurve: -0.15,
        focusMultiplier: 1.4,
        title: 'The Hundred Days End at Waterloo',
        prose: 'Escaping Elba in February 1815, Napoleon marched back into Paris without firing a shot as royal troops defected to his banner. European powers immediately declared war; on June 18 at Waterloo, Wellington’s squares held the ridge until Blücher’s Prussians smashed his right flank, forcing his second and final abdication four days later.',
        fact: 'Torrential overnight rain turned the fields around Waterloo into deep mud, prompting Napoleon to delay his opening artillery barrage until 11:35 a.m. so the ground could dry—four lost hours that gave the Prussian army time to arrive.',
        quote: {
          en: 'I ought to have died at Waterloo.',
          fr: 'J’aurais dû mourir à Waterloo.',
          provenance: 'Mémorial de Sainte-Hélène'
        }
      },
      {
        number: 10,
        roman: 'X',
        id: '1821',
        year: '1821',
        age: 'Age 51',
        date: '16 October 1815 – 5 May 1821',
        location: 'Saint Helena, South Atlantic',
        shortPlace: 'Saint Helena',
        coords: [-5.6672, -15.9425],
        coordText: '15°56′S, 5°42′W',
        eraKey: 'exile1821',
        inset: true,
        labelPos: [15, 5],
        insetLabelPos: [-14, 17],
        insetAlignEnd: true,
        routeCurve: -0.18,
        focusZoom: 2.35,
        title: 'Exile at the Edge of the World',
        prose: 'Surrendering to the British warship HMS Bellerophon, Napoleon was banished to Saint Helena—a windswept volcanic rock in the South Atlantic guarded by warships so no second escape would ever be possible. Confined to damp Longwood House, he spent nearly six years dictating his memoirs before dying on May 5, 1821, at age fifty-one.',
        fact: 'Nineteen years after his death, Britain agreed to return his remains to France in 1840 (Le Retour des Cendres). Today he lies beneath the gilded dome of Les Invalides in Paris, honoring the final wish written in his will.',
        quote: {
          en: 'It is my wish that my ashes may repose on the banks of the Seine, in the midst of the French people, whom I have loved so well.',
          fr: 'Je désire que mes cendres reposent sur les bords de la Seine, au milieu de ce peuple français que j’ai tant aimé.',
          provenance: 'Last Will and Testament, Longwood, 15 April 1821'
        }
      }
    ]
  };
})(window);
