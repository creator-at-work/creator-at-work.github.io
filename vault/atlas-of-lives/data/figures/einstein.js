/* ==========================================================================
   ALBERT EINSTEIN (1879–1955) — Historical Life Atlas
   Sources: Collected Papers of Albert Einstein (Princeton University Press),
            Autobiographical Notes (1949), Walter Isaacson, Britannica
   ========================================================================== */

(function (global) {
  'use strict';

  global.ATLAS_FIGURES = global.ATLAS_FIGURES || {};

  global.ATLAS_FIGURES.einstein = {
    id: 'einstein',
    era: 'Modern World',
    title: 'Albert Einstein',
    fullName: 'Albert Einstein · Nobel Laureate in Physics',
    years: '1879 — 1955',
    subtitle: 'Bern & Berlin to Pasadena & Princeton',
    worldLabel: 'World of 1919',
    worldEraLabel: 'Relativity & Quantum Era · 1879–1955',
    originName: 'Bern & Ulm',
    originCoords: [7.4474, 46.948],

    viewBounds: {
      lon: [-122.0, 22.0],
      lat: [26.0, 58.0]
    },

    waterLabels: [
      { name: 'ATLANTIC OCEAN', coords: [-40.0, 39.0], regionalOnly: true },
      { name: 'ATLANTIC OCEAN', coords: [-28, -4], worldOnly: true },
      { name: 'INDIAN OCEAN', coords: [78, -22], worldOnly: true },
      { name: 'PACIFIC OCEAN', coords: [-130, -8], worldOnly: true }
    ],

    defaultEraKey: 'relativity1919',
    territorySets: {
      relativity1919: {
        empireLabel: 'Switzerland, Germany, Britain & United States',
        dependentLabel: 'International Scientific Centers',
        rivalLabel: 'Totalitarian Exile (1933)',
        empire: ['Switzerland', 'Germany', 'United Kingdom', 'United States of America'],
        dependent: ['Netherlands', 'Belgium', 'Czechia', 'France', 'Japan'],
        ally: [],
        rival: []
      }
    },

    worldRealms: [
      { id: 'us', name: 'United States', desc: 'Sanctuary for European refugee physicists after 1933 and Einstein’s home for his final twenty-two years.', cssVar: '--realm-us', countries: ['United States of America'], label: 'UNITED STATES', labelCoords: [-100.0, 41.0] },
      { id: 'europe', name: 'Interwar Europe', desc: 'Birthplace of both relativity and quantum mechanics—soon shattered by fascism and World War II.', cssVar: '--terr-rival', countries: ['Germany', 'France', 'United Kingdom', 'Switzerland', 'Italy', 'Poland'], label: 'EUROPE', labelCoords: [12.0, 48.0] },
      { id: 'ussr', name: 'Soviet Union', desc: 'Home of Alexander Friedmann, who found the expanding-universe solutions to Einstein’s field equations in 1922.', cssVar: '--realm-persia', countries: ['Russia'], label: 'SOVIET UNION', labelCoords: [88.0, 61.0] },
      { id: 'japan', name: 'Japan', desc: 'Einstein was aboard a steamship bound for Tokyo in November 1922 when the telegram arrived announcing his Nobel Prize.', cssVar: '--realm-qing', countries: ['Japan'], label: 'JAPAN', labelCoords: [139.0, 36.5] }
    ],

    historicalNames: {
      Switzerland: 'Swiss Confederation (Bern Patent Office & ETH Zurich)',
      Germany: 'German Empire & Weimar Republic (Prussian Academy)',
      'United Kingdom': 'United Kingdom (Oxford & Royal Society)',
      'United States of America': 'United States (Caltech & Princeton IAS)'
    },

    worldPlaces: [
      { name: 'Príncipe Island (São Tomé)', year: '1919', detail: 'Where British astronomer Arthur Eddington photographed deflected starlight during the May 29, 1919 solar eclipse—proving General Relativity.', coords: [7.41, 1.61] },
      { name: 'Sobral, Brazil', year: '1919', detail: 'Second British solar-eclipse observatory confirming Einstein’s gravitational light-bending prediction.', coords: [-40.35, -3.69] },
      { name: 'Tokyo', year: '1922', detail: 'Einstein delivered wildly popular lectures across Japan right after learning he had won the 1921 Nobel Prize in Physics.', coords: [139.6917, 35.6895] }
    ],

    sources: [
      { label: 'Einstein Papers Project · Caltech & Princeton', url: 'https://einsteinpapers.press.princeton.edu/' },
      { label: 'Nobel Prize Archive · Albert Einstein', url: 'https://www.nobelprize.org/prizes/physics/1921/einstein/biographical/' }
    ],

    stages: [
      {
        number: 1,
        roman: 'I',
        id: 'bern',
        year: '1905',
        age: 'Age 26',
        date: 'March – September 1905',
        location: 'Kramgasse 49, Bern (Switzerland)',
        shortPlace: 'Bern',
        coords: [7.4474, 46.948],
        coordText: '46°57′N, 7°27′E',
        eraKey: 'relativity1919',
        labelPos: [14, 8],
        routeCurve: 0,
        focusMultiplier: 2.4,
        title: 'The Patent Clerk’s Miracle Year',
        prose: 'Born in Ulm in 1879 and educated at ETH Zurich—where every university rejected him for a teaching post—twenty-six-year-old Einstein worked six days a week evaluating electromagnetic inventions as a Technical Expert Third Class at the Swiss Patent Office in Bern. In his spare evenings during 1905, he published four revolutionary papers: proving light travels in quanta (photons), confirming the existence of atoms via Brownian motion, formulating Special Relativity, and unveiling E = mc².',
        fact: 'Einstein later called the Bern Patent Office “that worldly cloister where I hatched my most beautiful ideas,” crediting his daily review of synchronized-clock patents with sharpening his insight that simultaneity is relative.',
        quote: {
          en: 'Imagination is more important than knowledge. For knowledge is limited, whereas imagination embraces the entire world, stimulating progress, giving birth to evolution.',
          orig: '',
          provenance: 'Interview with George Sylvester Viereck, Saturday Evening Post, 26 October 1929'
        },
        subTabsLabel: 'Early years:',
        subStages: [
          {
            label: '1905 · Bern Miracle Year',
            year: '1905',
            age: 'Age 26',
            date: 'March – September 1905',
            title: 'The Patent Clerk’s Miracle Year',
            prose: 'Working six days a week as a Technical Expert Third Class at the Swiss Patent Office in Bern, twenty-six-year-old Einstein published four papers in 1905 that rebuilt physics from the ground up: light quanta (later winning him the Nobel Prize), Brownian motion proving atoms are real, Special Relativity banishing absolute time, and mass–energy equivalence, E = mc².',
            fact: 'Einstein called the Bern Patent Office “that worldly cloister where I hatched my most beautiful ideas,” crediting his daily review of train-clock synchronization patents with illuminating the relativity of time.',
            quote: {
              en: 'A storm broke loose in my mind.',
              orig: '',
              provenance: 'Recalling the May 1905 breakthrough on Special Relativity after talking with friend Michele Besso'
            }
          },
          {
            label: '1879 · Ulm & the Compass',
            year: '1879',
            age: 'Birth',
            date: '14 March 1879 – 1900',
            title: 'The Pocket Compass & Geometry Book',
            prose: 'Born in Ulm and raised in Munich, Einstein was never a failing student—he excelled in physics and calculus—but despised rigid Prussian rote drills. At age five, watching a pocket compass needle turn invisibly in his sickbed filled him with lifelong wonder; at twelve, a “sacred little geometry book” of Euclid revealed the austere beauty of mathematical proof.',
            fact: 'At sixteen in Aarau, Switzerland, Einstein conceived the famous thought experiment that haunted him for ten years: what would a beam of light look like if you rode right alongside it at the speed of light?',
            quote: {
              en: 'Something deeply hidden had to be behind things.',
              orig: '',
              provenance: 'Autobiographical Notes (1949), recalling his father’s pocket compass at age five'
            }
          }
        ]
      },
      {
        number: 2,
        roman: 'II',
        id: 'berlin',
        year: '1915',
        age: 'Age 36',
        date: '25 November 1915',
        location: 'Prussian Academy of Sciences, Berlin',
        shortPlace: 'Berlin',
        coords: [13.405, 52.52],
        coordText: '52°31′N, 13°24′E',
        eraKey: 'relativity1919',
        labelPos: [14, -6],
        routeCurve: -0.18,
        focusMultiplier: 2.3,
        title: 'General Relativity: Gravity as Curved Spacetime',
        prose: 'Recruited to Berlin in 1914 by Max Planck, Einstein worked in feverish isolation amid World War I—speaking out courageously against German militarism—until he presented the final field equations of General Relativity to the Prussian Academy on November 25, 1915. Replacing Newton’s invisible gravitational pull with the geometry of curved spacetime, he immediately solved the century-old anomaly in Mercury’s orbit—a moment that gave him literal heart palpitations.',
        fact: 'When Arthur Eddington’s 1919 solar-eclipse photographs confirmed starlight bending around the Sun, a student asked Einstein what he would have done if the eclipse had proved him wrong; he replied: “Then I would feel sorry for the dear Lord. The theory is correct anyway.”',
        quote: {
          en: 'The most incomprehensible thing about the universe is that it is comprehensible.',
          orig: 'Das ewig Unbegreifliche an der Welt ist ihre Begreiflichkeit.',
          origLang: 'Deutsch',
          provenance: 'Physics and Reality, Journal of the Franklin Institute (March 1936)'
        },
        subTabsLabel: 'Berlin milestones:',
        subStages: [
          {
            label: '1915 · Field Equations',
            year: '1915',
            age: 'Age 36',
            date: '25 November 1915',
            title: 'General Relativity: Curved Spacetime',
            prose: 'Recruited to Berlin in 1914 by Max Planck, Einstein worked in feverish isolation amid World War I until presenting the final field equations of General Relativity to the Prussian Academy on November 25, 1915. Replacing Newton’s invisible pull with curved four-dimensional spacetime, he solved Mercury’s orbital anomaly on the very first calculation.',
            fact: 'Writing to physicist Arnold Sommerfeld days later, Einstein said the month of November 1915 had been “one of the most exciting, most strenuous times of my life, yet also one of the most rewarding.”',
            quote: {
              en: 'For a few days, I was beside myself with joyous excitement.',
              orig: '',
              provenance: 'Letter to Paul Ehrenfest upon computing Mercury’s perihelion shift, 17 January 1916'
            }
          },
          {
            label: '1919 · Eclipse & Global Fame',
            year: '1919',
            age: 'Age 40',
            date: '6 November 1919',
            title: '“Lights All Askew in the Heavens”',
            prose: 'On November 6, 1919, a joint session of the Royal Society in London announced that British expeditions to Príncipe Island and Sobral, Brazil had photographed starlight bent around the eclipsed Sun by precisely Einstein’s predicted 1.75 arcseconds. Overnight, in a world exhausted by war, an English astronomer’s confirmation of a German-born pacifist’s theory made Einstein the first global scientific celebrity.',
            fact: 'Einstein actually won the 1921 Nobel Prize in Physics primarily for explaining the photoelectric effect—not Relativity, which conservative committee members still deemed too philosophical.',
            quote: {
              en: 'The Lord is subtle, but malicious He is not.',
              orig: 'Raffiniert ist der Herrgott, aber boshaft ist er nicht.',
              origLang: 'Deutsch',
              provenance: 'Spoken in Princeton, May 1921 (now carved in stone above Fine Hall’s fireplace)'
            }
          }
        ]
      },
      {
        number: 3,
        roman: 'III',
        id: 'oxford',
        year: '1931',
        age: 'Age 52',
        date: 'May 1931 & Autumn 1933',
        location: 'Christ Church, Oxford (England)',
        shortPlace: 'Oxford',
        coords: [-1.2577, 51.752],
        coordText: '51°45′N, 1°15′W',
        eraKey: 'relativity1919',
        labelPos: [-14, -6],
        alignEnd: true,
        routeCurve: 0.16,
        focusMultiplier: 2.3,
        title: 'The Blackboards of Oxford & Exile from Germany',
        prose: 'Lecturing in Oxford in 1931 on the newly discovered expansion of the universe, Einstein returned to England in 1933 as a stateless refugee after Adolf Hitler seized power, confiscated his Berlin property, and placed a bounty on his head. Sheltered briefly in a secluded wooden hut in Norfolk guarded by armed volunteers, he packed his violin and sailed permanently for America in October 1933.',
        fact: 'One of the dusty chalk blackboards from Einstein’s May 1931 Oxford lecture on cosmic expansion was saved un-erased by a curator and remains on display at Oxford’s History of Science Museum.',
        quote: {
          en: 'As long as I have any choice in the matter, I shall live only in a country where civil liberty, tolerance, and equality of all citizens before the law prevail.',
          orig: '',
          provenance: 'Public declaration renouncing German citizenship, March 1933'
        }
      },
      {
        number: 4,
        roman: 'IV',
        id: 'pasadena',
        year: '1931',
        age: 'Age 51',
        date: 'January – February 1931',
        location: 'Mount Wilson & Caltech, Pasadena',
        shortPlace: 'Pasadena',
        coords: [-118.1445, 34.1478],
        coordText: '34°09′N, 118°09′W',
        eraKey: 'relativity1919',
        labelPos: [14, 8],
        seaLeg: true,
        routeCurve: -0.15,
        focusMultiplier: 2.2,
        title: 'Peering Through Hubble’s Telescope',
        prose: 'Spending three winters as a visiting scholar at Caltech in Pasadena, Einstein climbed Mount Wilson to peer through Edwin Hubble’s giant 100-inch Hooker telescope. Confronted by Hubble’s spectroscopic proof that distant galaxies are racing away in an expanding universe, Einstein publicly abandoned the “cosmological constant” he had inserted in 1917 to force a static cosmos—giving rise to modern Big Bang cosmology.',
        fact: 'While in Los Angeles in 1931, Einstein attended the Hollywood premiere of City Lights with Charlie Chaplin; when crowds cheered them both, Chaplin smiled: “They cheer me because they all understand me, and they cheer you because no one understands you.”',
        quote: {
          en: 'Quantum mechanics is certainly imposing. But an inner voice tells me that it is not yet the real thing. The theory says a lot, but does not really bring us any closer to the secret of the “old one.” I, at any rate, am convinced that He does not throw dice.',
          orig: 'Jedenfalls bin ich überzeugt, daß der nicht würfelt.',
          origLang: 'Deutsch',
          provenance: 'Letter to Max Born, 4 December 1926'
        }
      },
      {
        number: 5,
        roman: 'V',
        id: 'princeton',
        year: '1955',
        age: 'Age 76',
        date: '1933 – 18 April 1955',
        location: '112 Mercer Street, Princeton, New Jersey',
        shortPlace: 'Princeton',
        coords: [-74.6672, 40.3573],
        coordText: '40°21′N, 74°40′W',
        eraKey: 'relativity1919',
        labelPos: [14, -4],
        routeCurve: 0.14,
        focusMultiplier: 2.3,
        title: '112 Mercer Street & the Quest for Unity',
        prose: 'Settling into a modest white clapboard house at 112 Mercer Street as a founding professor at Princeton’s Institute for Advanced Study, Einstein walked to work daily with logician Kurt Gödel, searching tirelessly for a unified theory of gravity and electromagnetism while championing civil rights and nuclear disarmament. Weeks before his death in April 1955, he signed the Russell–Einstein Manifesto pleading with humanity to renounce nuclear war—and kept scribbling equations on his hospital bedside pad until his final night.',
        fact: 'Although Einstein’s 1939 letter to President Roosevelt warned that Nazi Germany might build an atomic bomb, the U.S. military denied Einstein a security clearance for the Manhattan Project because of his outspoken pacifist and civil-rights activism.',
        quote: {
          en: 'Remember your humanity, and forget the rest.',
          orig: '',
          provenance: 'The Russell–Einstein Manifesto, signed April 1955 (Einstein’s final public act)'
        }
      }
    ]
  };
})(window);
