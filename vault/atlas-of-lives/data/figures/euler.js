/* ==========================================================================
   LEONHARD EULER (1707–1783) — Historical Life Atlas
   Sources: Euler Archive, Correspondence with Goldbach & Bernoulli, Britannica
   ========================================================================== */

(function (global) {
  'use strict';

  global.ATLAS_FIGURES = global.ATLAS_FIGURES || {};

  global.ATLAS_FIGURES.euler = {
    id: 'euler',
    era: 'Enlightenment & Empire',
    title: 'Leonhard Euler',
    fullName: 'Leonhard Euler',
    years: '1707 — 1783',
    subtitle: 'Basel to Saint Petersburg',
    worldLabel: 'World of 1760',
    worldEraLabel: 'Age of Enlightenment · 1707–1783',
    originName: 'Basel',
    originCoords: [7.5886, 47.5596],

    viewBounds: {
      lon: [-3.0, 35.5],
      lat: [43.5, 62.5]
    },

    waterLabels: [
      { name: 'NORTH SEA', coords: [3.2, 56.0], regionalOnly: true },
      { name: 'BALTIC SEA', coords: [19.5, 57.5], regionalOnly: true },
      { name: 'ATLANTIC OCEAN', coords: [-28, -4], worldOnly: true },
      { name: 'INDIAN OCEAN', coords: [78, -22], worldOnly: true },
      { name: 'PACIFIC OCEAN', coords: [-130, -8], worldOnly: true }
    ],

    defaultEraKey: 'enlightenment',
    territorySets: {
      enlightenment: {
        empireLabel: 'Centers of Euler’s Work',
        dependentLabel: 'European Republic of Letters',
        empire: ['Switzerland', 'Germany', 'Russia'],
        dependent: ['France', 'Austria', 'Sweden', 'United Kingdom'],
        ally: [],
        rival: []
      }
    },

    worldRealms: [
      { id: 'qing', name: 'Qing Dynasty', desc: 'High Qing era under the Qianlong Emperor (r. 1735–1796).', cssVar: '--realm-qing', countries: ['China', 'Mongolia'], label: 'QING DYNASTY', labelCoords: [104.0, 35.5] },
      { id: 'maratha', name: 'Maratha Confederacy', desc: 'Dominant Indian power of the 18th century alongside the rising British East India Company.', cssVar: '--realm-maratha', countries: ['India', 'Pakistan', 'Bangladesh'], label: 'MARATHA EMPIRE', labelCoords: [79.0, 22.0] },
      { id: 'ottoman', name: 'Ottoman Empire', desc: 'Spanning southeastern Europe, Anatolia, and North Africa.', cssVar: '--realm-ottoman', countries: ['Turkey', 'Iraq', 'Syria', 'Egypt', 'Greece'], label: 'OTTOMAN EMPIRE', labelCoords: [35.0, 37.5] },
      { id: 'spanish', name: 'Spanish Empire', desc: 'Viceroyalties of New Spain and Peru across the Americas.', cssVar: '--realm-spanish', countries: ['Mexico', 'Colombia', 'Peru', 'Argentina', 'Chile'], label: 'SPANISH EMPIRE', labelCoords: [-68.0, -20.0] },
      { id: 'british_col', name: 'British America', desc: 'Thirteen Colonies and British North America; the United States declared independence in 1776 during Euler’s final decade.', cssVar: '--realm-us', countries: ['United States of America', 'Canada'], label: 'NORTH AMERICA', labelCoords: [-98.0, 44.0] }
    ],

    historicalNames: {
      Switzerland: 'Old Swiss Confederacy (Basel & Lausanne)',
      Germany: 'Kingdom of Prussia (Berlin & Königsberg)',
      Russia: 'Russian Empire (St. Petersburg)',
      France: 'Kingdom of France (Royal Academy of Sciences)'
    },

    worldPlaces: [
      { name: 'Philadelphia', year: '1776', detail: 'American Declaration of Independence signed seven years before Euler’s death.', coords: [-75.1652, 39.9526] },
      { name: 'London', year: '1707–1783', detail: 'Royal Society; Isaac Newton was still president when young Euler entered university.', coords: [-0.1278, 51.5074] },
      { name: 'Calcutta', year: '1757', detail: 'British East India Company solidified power in Bengal after Plassey.', coords: [88.3639, 22.5726] }
    ],

    sources: [
      { label: 'Britannica', url: 'https://www.britannica.com/biography/Leonhard-Euler' },
      { label: 'Euler Archive', url: 'https://scholarlycommons.pacific.edu/euler/' }
    ],

    stages: [
      {
        number: 1,
        roman: 'I',
        id: 'basel',
        year: '1707',
        age: 'Birth',
        date: '15 April 1707',
        location: 'Basel, Switzerland',
        shortPlace: 'Basel',
        coords: [7.5886, 47.5596],
        coordText: '47°34′N, 7°35′E',
        eraKey: 'enlightenment',
        labelPos: [15, 5],
        routeCurve: 0,
        focusMultiplier: 1.45,
        title: 'The Prodigy of Basel',
        prose: 'Born in Basel to a Calvinist pastor who had studied under Jacob Bernoulli, Euler enrolled at the University of Basel at thirteen. Every Saturday afternoon, Johann Bernoulli—Europe’s foremost mathematician—tutored him privately, swiftly convincing Euler’s father that the boy was destined for mathematics rather than theology.',
        fact: 'At nineteen, Euler submitted a brilliant dissertation on the optimal masting of sailing ships to the Paris Academy of Sciences—despite living in landlocked Switzerland and having never seen the sea.',
        quote: {
          en: 'I soon found an opportunity to be introduced to a famous professor Johann Bernoulli… and this was undoubtedly the best method to succeed in mathematical subjects.',
          orig: '',
          provenance: 'Autobiographical dictation to his son Johann Albrecht Euler, 1767'
        }
      },
      {
        number: 2,
        roman: 'II',
        id: 'konigsberg',
        year: '1736',
        age: 'Age 28',
        date: '1735 – 1736',
        location: 'Königsberg, Prussia',
        shortPlace: 'Königsberg',
        coords: [20.5109, 54.7104],
        coordText: '54°43′N, 20°31′E',
        eraKey: 'enlightenment',
        labelPos: [15, 4],
        routeCurve: -0.18,
        focusMultiplier: 1.45,
        title: 'The Seven Bridges & the Basel Problem',
        prose: 'Working from St. Petersburg’s Imperial Academy, Euler stunned Europe in 1735 by solving the ninety-year-old Basel Problem—proving the sum of inverse squares equals π²/6. Months later he solved the Seven Bridges of Königsberg puzzle by stripping the city down to abstract nodes and edges, inventing graph theory and topology in a single stroke.',
        fact: 'His notation became the universal alphabet of modern mathematics: Euler popularized π, introduced f(x) for functions, i for √−1, Σ for summation, and e for the natural exponential base.',
        quote: {
          en: 'This question is so banal, but seemed to me worthy of attention in that neither geometry, nor algebra, nor even the art of counting was sufficient to solve it.',
          orig: '',
          provenance: 'Letter to Carl Leonhard Gottlieb Ehler on the Königsberg bridges, 3 April 1736'
        }
      },
      {
        number: 3,
        roman: 'III',
        id: 'paris',
        year: '1738',
        age: 'Age 31',
        date: '1738 – 1772',
        location: 'Paris, France',
        shortPlace: 'Paris',
        coords: [2.3522, 48.8566],
        coordText: '48°51′N, 2°21′E',
        eraKey: 'enlightenment',
        labelPos: [-15, 4],
        alignEnd: true,
        routeCurve: 0.16,
        focusMultiplier: 1.45,
        title: 'Twelve Prizes of the Paris Academy',
        prose: 'Though he never resided in France, Euler dominated the prestigious international prize competitions of the French Royal Academy of Sciences, winning twelve times across fire physics, ocean tides, lunar motion, magnetism, and naval engineering. His mathematical theories of fluid dynamics and celestial mechanics transformed physics into a precise analytical discipline.',
        fact: 'Pierre-Simon Laplace later told younger French mathematicians the famous counsel: “Read Euler, read Euler, he is the master of us all.”',
        quote: {
          en: 'Mathematicians have tried in vain to this day to discover some order in the sequence of prime numbers, and we have reason to believe that it is a mystery into which the human mind will never penetrate.',
          orig: '',
          provenance: 'Découverte d’une loi tout extraordinaire des nombres (1751)'
        }
      },
      {
        number: 4,
        roman: 'IV',
        id: 'berlin',
        year: '1741',
        age: 'Age 34',
        date: '1741 – 1766',
        location: 'Berlin, Prussia',
        shortPlace: 'Berlin',
        coords: [13.405, 52.52],
        coordText: '52°31′N, 13°24′E',
        eraKey: 'enlightenment',
        labelPos: [-15, -6],
        alignEnd: true,
        routeCurve: -0.15,
        focusMultiplier: 1.45,
        title: 'Twenty-Five Years at the Berlin Academy',
        prose: 'Summoned by Frederick the Great to rebuild the Prussian Academy of Sciences, Euler spent a quarter-century in Berlin writing over 380 papers on calculus, optics, acoustics, rigid-body mechanics, and number theory. Alongside his technical treatises, he authored the bestselling Letters to a German Princess—bringing physics, astronomy, and philosophy to readers across Europe.',
        fact: 'Frederick the Great also leaned on Euler for practical state work: designing fountains at Sanssouci Palace, auditing royal lotteries, and calculating Prussia’s first actuarial pension tables.',
        quote: {
          en: 'Now I will have fewer distractions.',
          orig: '',
          provenance: 'Remark upon losing his remaining sight, recorded in Condorcet’s Éloge de M. Euler'
        }
      },
      {
        number: 5,
        roman: 'V',
        id: 'lausanne',
        year: '1748',
        age: 'Age 41',
        date: '1748',
        location: 'Lausanne, Switzerland',
        shortPlace: 'Lausanne',
        coords: [6.6323, 46.5197],
        coordText: '46°31′N, 6°38′E',
        eraKey: 'enlightenment',
        labelPos: [-15, 10],
        alignEnd: true,
        routeCurve: 0.16,
        focusMultiplier: 1.45,
        title: 'The Most Beautiful Formula in Mathematics',
        prose: 'Published in Lausanne in 1748, Euler’s two-volume Introductio in analysin infinitorum placed the concept of the mathematical function at the very center of calculus. Within its pages appeared Euler’s formula e^(ix) = cos x + i sin x—unifying exponentials, trigonometry, and complex numbers, and yielding the celebrated identity e^(iπ) + 1 = 0.',
        fact: 'Even after centuries of mathematical advances, Euler’s Introductio reads so clearly that modern textbooks still follow its structure and notation almost unchanged.',
        quote: {
          en: 'For since the fabric of the universe is most perfect and the work of a most wise Creator, nothing at all takes place in the universe in which some rule of maximum or minimum does not appear.',
          orig: '',
          provenance: 'Introductio & variational mechanics writings (1744–1748)'
        }
      },
      {
        number: 6,
        roman: 'VI',
        id: 'stpetersburg',
        year: '1783',
        age: 'Age 76',
        date: '1766 – 18 September 1783',
        location: 'Saint Petersburg, Russia',
        shortPlace: 'St. Petersburg',
        coords: [30.3351, 59.9343],
        coordText: '59°56′N, 30°20′E',
        eraKey: 'enlightenment',
        labelPos: [-15, 5],
        alignEnd: true,
        routeCurve: -0.14,
        focusMultiplier: 1.4,
        title: 'Blind Mastery & Final Calculation',
        prose: 'Returning to St. Petersburg in 1766 at the invitation of Empress Catherine the Great, Euler soon lost the sight in his remaining eye after a failed cataract operation. Relying on a staggering photographic memory—reciting Virgil’s Aeneid verbatim and computing 17-digit lunar tables in his head—he dictated nearly half of his 866 lifetime works while totally blind.',
        fact: 'On September 18, 1783, after calculating the orbit of the newly discovered planet Uranus on a slate and playing with his grandson, Euler suffered a stroke—prompting the Marquis de Condorcet to write: “He ceased to calculate and to live.”',
        quote: {
          en: 'He calculated without apparent effort, as men breathe, or as eagles sustain themselves in the wind.',
          orig: 'Il calculait sans aucun effort apparent, comme les hommes respirent, comme les aigles se soutiennent dans les airs.',
          origLang: 'Français',
          provenance: 'François Arago, Éloge d’Euler (reflecting on his St. Petersburg years)'
        },
        subTabsLabel: 'St. Petersburg chapters:',
        subStages: [
          {
            label: '1727 · First Arrival',
            year: '1727',
            age: 'Age 20',
            date: 'May 1727 – 1741',
            title: 'Young Academician on the Neva',
            prose: 'Invited to St. Petersburg by Daniel and Nicolaus Bernoulli at age twenty, Euler arrived on the very day Empress Catherine I died. Within six years he succeeded Daniel Bernoulli as chair of mathematics, married Katharina Gsell, and began the torrent of memoirs that made the Russian Academy famous across Europe.',
            fact: 'In 1738, following a severe fever and grueling cartographic work for the Russian government, Euler lost vision in his right eye—joking that it was the price of mapping the vast Russian Empire.',
            quote: {
              en: 'Everything I have accomplished I owe to my stay in St. Petersburg.',
              orig: '',
              provenance: 'Correspondence with the St. Petersburg Academy'
            }
          },
          {
            label: '1766–83 · Blindness & Legacy',
            isDefault: true
          }
        ]
      }
    ]
  };
})(window);
