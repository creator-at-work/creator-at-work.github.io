/* ==========================================================================
   MARIE CURIE (1867–1934) — Historical Life Atlas
   Sources: Marie Curie (Pierre Curie & Autobiographical Notes, 1923; Nobel
            Lectures 1903 & 1911), Eve Curie, Musée Curie, Britannica
   ========================================================================== */

(function (global) {
  'use strict';

  global.ATLAS_FIGURES = global.ATLAS_FIGURES || {};

  global.ATLAS_FIGURES.curie = {
    id: 'curie',
    era: 'Modern World',
    title: 'Marie Curie',
    fullName: 'Maria Salomea Skłodowska-Curie',
    years: '1867 — 1934',
    subtitle: 'Warsaw to Paris, Stockholm & the Front',
    worldLabel: 'World of 1911',
    worldEraLabel: 'Dawn of Atomic Physics · 1867–1934',
    originName: 'Warsaw',
    originCoords: [21.0122, 52.2297],

    viewBounds: {
      lon: [-4.5, 26.5],
      lat: [43.5, 61.5]
    },

    waterLabels: [
      { name: 'NORTH SEA', coords: [3.2, 55.8], regionalOnly: true },
      { name: 'BALTIC SEA', coords: [19.2, 56.5], regionalOnly: true },
      { name: 'ATLANTIC OCEAN', coords: [-28, -4], worldOnly: true },
      { name: 'INDIAN OCEAN', coords: [78, -22], worldOnly: true },
      { name: 'PACIFIC OCEAN', coords: [-130, -8], worldOnly: true }
    ],

    defaultEraKey: 'europe1911',
    territorySets: {
      europe1911: {
        empireLabel: 'France & Independent Poland',
        dependentLabel: 'European Scientific Community',
        rivalLabel: 'World War I Fronts (1914–1918)',
        empire: ['France', 'Poland'],
        dependent: ['Sweden', 'Belgium', 'Switzerland', 'United Kingdom'],
        ally: [],
        rival: ['Germany', 'Austria', 'Russia']
      }
    },

    worldRealms: [
      { id: 'us', name: 'United States', desc: 'In 1921, American women raised $100,000 so President Harding could present Marie Curie with one pure gram of radium for her research.', cssVar: '--realm-us', countries: ['United States of America'], label: 'UNITED STATES', labelCoords: [-100.0, 39.0] },
      { id: 'russia', name: 'Russian Empire / USSR', desc: 'Partitioned Poland during Marie’s youth until Poland regained independence in 1918.', cssVar: '--realm-persia', countries: ['Russia'], label: 'RUSSIA', labelCoords: [86.0, 61.0] },
      { id: 'british', name: 'British Empire', desc: 'Home of Ernest Rutherford and J. J. Thomson, fellow pioneers of atomic and nuclear physics.', cssVar: '--terr-rival', countries: ['United Kingdom', 'Canada', 'India', 'Australia'], label: 'BRITISH EMPIRE', labelCoords: [78.0, 22.0] },
      { id: 'china', name: 'China & East Asia', desc: 'Transitioning from the Qing Dynasty to the Republic of China in 1912.', cssVar: '--realm-qing', countries: ['China'], label: 'CHINA', labelCoords: [106.0, 35.0] }
    ],

    historicalNames: {
      Poland: 'Congress Poland (Russian Partition; Republic from 1918)',
      France: 'French Third Republic (Sorbonne & Radium Institute)',
      Sweden: 'Kingdom of Sweden (Royal Swedish Academy of Sciences)',
      Belgium: 'Kingdom of Belgium (Solvay Congresses)'
    },

    worldPlaces: [
      { name: 'Washington, D.C.', year: '1921', detail: 'President Warren G. Harding presented Marie Curie with one gram of radium funded by American women’s subscriptions.', coords: [-77.0369, 38.9072] },
      { name: 'Cambridge', year: '1911', detail: 'Cavendish Laboratory, where Ernest Rutherford uncovered the atomic nucleus the year of Curie’s second Nobel.', coords: [0.117, 52.207] },
      { name: 'Warsaw Radium Institute', year: '1932', detail: 'Opened by Marie Curie in her native city two years before her death; still operates as Poland’s premier oncology institute.', coords: [20.985, 52.215] }
    ],

    sources: [
      { label: 'Nobel Prize Archive · Marie Curie', url: 'https://www.nobelprize.org/prizes/physics/1903/marie-curie/biographical/' },
      { label: 'Musée Curie · Paris', url: 'https://musee.curie.fr/' }
    ],

    stages: [
      {
        number: 1,
        roman: 'I',
        id: 'warsaw',
        year: '1867',
        age: 'Birth',
        date: '7 November 1867 – 1891',
        location: 'Warsaw, Russian-Occupied Poland',
        shortPlace: 'Warsaw',
        coords: [21.0122, 52.2297],
        coordText: '52°14′N, 21°01′E',
        eraKey: 'europe1911',
        labelPos: [14, -4],
        routeCurve: 0,
        focusMultiplier: 1.55,
        title: 'The Secret Flying University',
        prose: 'Born Maria Skłodowska in Russian-occupied Warsaw to two patriotic teachers, she was barred from the University of Warsaw simply for being a woman. Attending Poland’s clandestine underground “Flying University”—which shifted locations nightly to evade Tsarist police—she worked five years as a rural governess to finance her older sister Bronisława’s medical degree in Paris, before Bronisława returned the favor.',
        fact: 'Years later, when Marie discovered her first new chemical element in Paris in 1898, she named it polonium—ensuring her occupied, erased homeland of Poland was inscribed permanently onto the periodic table.',
        quote: {
          en: 'Life is not easy for any of us. But what of that? We must have perseverance and above all confidence in ourselves.',
          orig: '',
          provenance: 'Quoted by Ève Curie in Madame Curie (1937), from Marie’s letters'
        }
      },
      {
        number: 2,
        roman: 'II',
        id: 'paris',
        year: '1898',
        age: 'Age 30',
        date: '1891 – 1906',
        location: 'Rue Lhomond & the Sorbonne, Paris',
        shortPlace: 'Paris',
        coords: [2.3522, 48.8566],
        coordText: '48°51′N, 2°21′E',
        eraKey: 'europe1911',
        labelPos: [-15, 6],
        alignEnd: true,
        routeCurve: 0.16,
        focusMultiplier: 1.6,
        title: 'Polonium, Radium & Radioactivity',
        prose: 'Living in an unheated Paris garret where water froze in her washbasin, Marie graduated first in physics at the Sorbonne and married physicist Pierre Curie. Working in a leaky, unventilated wooden shed, they processed tons of Bohemian pitchblende ore by hand—coining the word “radioactivity,” proving it is an intrinsic atomic property rather than a chemical reaction, and isolating two unknown elements: polonium and radium.',
        fact: 'Marie and Pierre deliberately refused to patent their radium-isolation process—forgoing immense personal fortune because they believed scientific discovery belonged to all humanity.',
        quote: {
          en: 'Radium is not to enrich anyone. It is an element; it is for all people.',
          orig: 'Le radium ne doit enrichir personne. C’est un élément, il appartient à tout le monde.',
          origLang: 'Français',
          provenance: 'Recorded in Marie Curie’s Pierre Curie (1923)'
        },
        subTabsLabel: 'Paris milestones:',
        subStages: [
          {
            label: '1898 · Polonium & Radium',
            year: '1898',
            age: 'Age 30',
            date: 'July – December 1898',
            title: 'Glowing Vials in a Leaky Shed',
            prose: 'Working in an abandoned, glass-roofed dissection shed on Rue Lhomond, Marie stirred boiling vats of Bohemian pitchblende ore with an iron rod nearly as tall as herself for four years. By 1902 she had extracted a single tenth of a gram of pure radium chloride from tons of slag—discovering that atoms were neither indivisible nor immutable.',
            fact: 'Marie and Pierre deliberately refused to patent their radium-isolation process, giving the full industrial technique away freely to hospitals and laboratories worldwide.',
            quote: {
              en: 'Radium is not to enrich anyone. It is an element; it is for all people.',
              orig: 'Le radium ne doit enrichir personne. C’est un élément, il appartient à tout le monde.',
              origLang: 'Français',
              provenance: 'Recorded in Marie Curie’s Pierre Curie (1923)'
            }
          },
          {
            label: '1906 · First Woman Professor',
            year: '1906',
            age: 'Age 38',
            date: '5 November 1906',
            title: 'Resuming Pierre’s Unfinished Sentence',
            prose: 'Devastated when Pierre was killed by a horse-drawn wagon on a rainy Paris street in April 1906, Marie was appointed to his chair—becoming the first female professor in the 650-year history of the Sorbonne. Stepping before a packed amphitheater, she quietly began her inaugural physics lecture at the exact sentence where Pierre’s final lecture had left off.',
            fact: 'Her laboratory notebooks from the 1890s and 1900s remain so strongly contaminated with radium-226 (half-life 1,600 years) that they are stored in lead-lined boxes at France’s Bibliothèque Nationale.',
            quote: {
              en: 'When one considers the progress that has been accomplished in physics in the last ten years, one is surprised at the change that has taken place in our ideas concerning electricity and matter.',
              orig: '',
              provenance: 'Opening words of Marie Curie’s inaugural Sorbonne lecture, 5 November 1906'
            }
          }
        ]
      },
      {
        number: 3,
        roman: 'III',
        id: 'stockholm',
        year: '1911',
        age: 'Age 44',
        date: '1903 & 10 December 1911',
        location: 'Stockholm, Sweden',
        shortPlace: 'Stockholm',
        coords: [18.0686, 59.3293],
        coordText: '59°20′N, 18°04′E',
        eraKey: 'europe1911',
        labelPos: [14, -4],
        routeCurve: -0.18,
        focusMultiplier: 1.5,
        title: 'Two Nobel Prizes in Two Sciences',
        prose: 'After becoming the first woman to win a Nobel Prize in 1903 (Physics, shared with Pierre and Henri Becquerel), Marie returned to Stockholm in December 1911 to receive a second, unshared Nobel Prize in Chemistry for isolating pure metallic radium. To this day she remains the only human being ever awarded Nobel Prizes in two distinct scientific disciplines.',
        fact: 'Facing a vicious xenophobic press scandal in Paris in 1911, a Swedish committee member privately urged her to stay away from Stockholm; Marie refused, replying that the prize was for scientific work and she would collect it in person.',
        quote: {
          en: 'I believe that there is no connection between my scientific work and the facts of private life.',
          orig: '',
          provenance: 'Letter to Svante Arrhenius declining to skip the 1911 Nobel ceremony, November 1911'
        }
      },
      {
        number: 4,
        roman: 'IV',
        id: 'brussels',
        year: '1911',
        age: 'Age 43',
        date: 'October – November 1911',
        location: 'Hotel Metropole, Brussels',
        shortPlace: 'Brussels',
        coords: [4.3517, 50.8503],
        coordText: '50°51′N, 4°21′E',
        eraKey: 'europe1911',
        labelPos: [-15, -6],
        alignEnd: true,
        routeCurve: 0.14,
        focusMultiplier: 1.6,
        title: 'The First Solvay Congress',
        prose: 'Invited to Brussels for the historic inaugural Solvay Congress on Radiation and the Quanta alongside Max Planck, Henri Poincaré, Ernest Rutherford, and young Albert Einstein, Marie Curie stood as the sole woman among twenty-four architects of modern physics. It was here she forged her lifelong friendship with Einstein—who stood fiercely beside her when Paris tabloids attacked her days later.',
        fact: 'Writing to Marie from Prague during the 1911 press storm, Albert Einstein urged her simply: “If the rabble continues to occupy itself with you, then simply don’t read that hogwash, but rather leave it to the reptile for whom it has been fabricated.”',
        quote: {
          en: 'Madame Curie is, of all celebrated beings, the only one whom fame has not corrupted.',
          orig: '',
          provenance: 'Albert Einstein, memorial tribute to Marie Curie (1935)'
        }
      },
      {
        number: 5,
        roman: 'V',
        id: 'verdun',
        year: '1914',
        age: 'Age 47',
        date: '1914 – 1918',
        location: 'Western Front (Verdun & Flanders)',
        shortPlace: 'Western Front',
        coords: [5.3878, 49.1599],
        coordText: '49°10′N, 5°23′E',
        eraKey: 'europe1911',
        labelPos: [14, 4],
        routeCurve: 0.14,
        focusMultiplier: 1.6,
        title: 'Driving the “Petites Curies” to the Trenches',
        prose: 'When World War I erupted in August 1914, Marie stowed her precious gram of radium in a Bordeaux bank vault, learned automobile mechanics and anatomy, and outfitted twenty Renault vans with portable X-ray dynamos powered by the car engines. Together with her seventeen-year-old daughter Irène, she drove these “Petites Curies” directly to field hospitals near Verdun and Ypres—training 150 women radiographers and helping locate shrapnel in over one million wounded soldiers.',
        fact: 'France’s government never formally awarded Marie Curie a military medal for her wartime X-ray corps, yet soldiers affectionately nicknamed her fleet of vans “les petites Curies.”',
        quote: {
          en: 'We must not forget that when radium was discovered no one knew that it would prove useful in hospitals. The work was one of pure science.',
          orig: '',
          provenance: 'Lecture at Vassar College, Poughkeepsie, New York, 14 May 1921'
        }
      },
      {
        number: 6,
        roman: 'VI',
        id: 'passy',
        year: '1934',
        age: 'Age 66',
        date: '4 July 1934',
        location: 'Sancellemoz Sanatorium, Passy (French Alps)',
        shortPlace: 'Passy',
        coords: [6.685, 45.923],
        coordText: '45°55′N, 6°41′E',
        eraKey: 'europe1911',
        labelPos: [14, 6],
        routeCurve: -0.14,
        focusMultiplier: 1.55,
        title: 'Final Days in the Alps & the Panthéon',
        prose: 'After decades of handling unshielded radium and wartime X-ray tubes—she used to carry glowing test tubes in her lab-coat pockets—Marie Curie succumbed to aplastic anemia at Sancellemoz in the French Alps on July 4, 1934, aged sixty-six. Just months earlier, her daughter Irène and son-in-law Frédéric Joliot-Curie had discovered artificial radioactivity, winning the family’s fifth Nobel Prize the following year.',
        fact: 'In 1995, Marie Curie became the first woman enshrined in France’s Panthéon in Paris strictly on her own merits—her coffin lined with nearly an inch of lead.',
        quote: {
          en: 'I am among those who think that science has great beauty. A scientist in his laboratory is not only a technician: he is also a child placed before natural phenomena which impress him like a fairy tale.',
          orig: '',
          provenance: 'Quoted in Ève Curie, Madame Curie (1937)'
        }
      }
    ]
  };
})(window);
