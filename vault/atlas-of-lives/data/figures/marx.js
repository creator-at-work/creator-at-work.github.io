/* ==========================================================================
   KARL MARX (1818–1883) — Historical Life Atlas
   Sources: Marx–Engels Collected Works (MECW), Das Kapital Vol. I (1867),
            The Communist Manifesto (1848), The Eighteenth Brumaire (1852)
   ========================================================================== */

(function (global) {
  'use strict';

  global.ATLAS_FIGURES = global.ATLAS_FIGURES || {};

  global.ATLAS_FIGURES.marx = {
    id: 'marx',
    era: 'Enlightenment & Empire',
    title: 'Karl Marx',
    fullName: 'Karl Heinrich Marx',
    years: '1818 — 1883',
    subtitle: 'Trier & Paris to Brussels & London',
    worldLabel: 'World of 1867',
    worldEraLabel: 'Industrial Age & Revolutions · 1818–1883',
    originName: 'Trier',
    originCoords: [6.6371, 49.7499],

    viewBounds: {
      lon: [-4.5, 16.5],
      lat: [46.5, 54.6]
    },

    waterLabels: [
      { name: 'NORTH SEA', coords: [3.2, 54.0], regionalOnly: true },
      { name: 'ENGLISH CHANNEL', coords: [-2.2, 49.9], regionalOnly: true },
      { name: 'ATLANTIC OCEAN', coords: [-28, -4], worldOnly: true },
      { name: 'INDIAN OCEAN', coords: [78, -22], worldOnly: true },
      { name: 'PACIFIC OCEAN', coords: [-130, -8], worldOnly: true }
    ],

    defaultEraKey: 'industrial1867',
    territorySets: {
      industrial1867: {
        empireLabel: 'Exile & Print Corridor (Britain, Belgium, France, Germany)',
        dependentLabel: 'Revolutions of 1848 Theater',
        rivalLabel: 'Tsarist & Imperial Autocracies',
        empire: ['United Kingdom', 'Belgium', 'France', 'Germany'],
        dependent: ['Austria', 'Italy', 'Hungary', 'Switzerland', 'Netherlands'],
        ally: [],
        rival: ['Russia']
      }
    },

    worldRealms: [
      { id: 'british', name: 'Victorian British Empire', desc: 'Workshop of the Industrial Revolution—whose factory blue books and Manchester cotton mills supplied Marx’s empirical evidence for Das Kapital.', cssVar: '--terr-rival', countries: ['United Kingdom', 'India', 'Canada', 'Australia'], label: 'BRITISH EMPIRE', labelCoords: [78.0, 22.0] },
      { id: 'us', name: 'United States', desc: 'Marx served for a decade as London correspondent for the New-York Daily Tribune and wrote an official 1864 congratulatory address to Abraham Lincoln on behalf of the First International.', cssVar: '--realm-us', countries: ['United States of America'], label: 'UNITED STATES', labelCoords: [-100.0, 39.0] },
      { id: 'russia', name: 'Russian Empire', desc: 'Surprisingly, Tsarist censors allowed the first foreign translation of Das Kapital (Russian, 1872), assuming few readers would grasp its dense economics.', cssVar: '--realm-persia', countries: ['Russia'], label: 'RUSSIAN EMPIRE', labelCoords: [88.0, 61.0] },
      { id: 'qing', name: 'Qing China', desc: 'Struggling through the Opium Wars and Taiping Rebellion, subjects of Marx’s sharp 1850s newspaper dispatches.', cssVar: '--realm-qing', countries: ['China'], label: 'QING CHINA', labelCoords: [106.0, 35.0] }
    ],

    historicalNames: {
      Germany: 'Kingdom of Prussia & German Confederation (Empire from 1871)',
      France: 'July Monarchy, Second Republic & Paris Commune (1871)',
      Belgium: 'Kingdom of Belgium (Brussels)',
      'United Kingdom': 'United Kingdom (British Museum & Soho)'
    },

    worldPlaces: [
      { name: 'Manchester', year: '1844', detail: 'Industrial textile capital where Friedrich Engels studied working-class poverty while managing his family’s cotton mill.', coords: [-2.2426, 53.4808] },
      { name: 'New York City', year: '1852', detail: 'Home of the New-York Daily Tribune, for which Marx wrote nearly 500 journalism articles on global politics, India, and the American Civil War.', coords: [-74.006, 40.7128] },
      { name: 'Saint Petersburg', year: '1872', detail: 'Site of the very first foreign translation of Das Kapital, selling out 3,000 copies in weeks.', coords: [30.3351, 59.9343] }
    ],

    sources: [
      { label: 'Stanford Encyclopedia of Philosophy · Karl Marx', url: 'https://plato.stanford.edu/entries/marx/' },
      { label: 'British Museum · Marx & Reading Room', url: 'https://www.britannica.com/biography/Karl-Marx' }
    ],

    stages: [
      {
        number: 1,
        roman: 'I',
        id: 'trier',
        year: '1818',
        age: 'Birth',
        date: '5 May 1818',
        location: 'Brückengasse 664, Trier (Rhineland)',
        shortPlace: 'Trier',
        coords: [6.6371, 49.7499],
        coordText: '49°45′N, 6°38′E',
        eraKey: 'industrial1867',
        labelPos: [-15, 8],
        alignEnd: true,
        routeCurve: 0,
        focusMultiplier: 1.55,
        title: 'Child of the Enlightenment Rhineland',
        prose: 'Born in Germany’s oldest city of Trier—just three years after Napoleon’s defeat returned the liberal, French-influenced Rhineland to conservative Prussia—Karl Marx was the son of a cultured lawyer from a long line of rabbis who had converted to Lutheranism to keep his legal practice. Raised reading Voltaire, Rousseau, and Shakespeare aloud with his neighbor Baron Ludwig von Westphalen, Marx later married the Baron’s daughter Jenny in a lifelong bond.',
        fact: 'In his seventeen-year-old high-school graduation essay in Trier, Marx wrote that the noblest profession is one “in which we can work most for humanity”—an essay preserved in full today.',
        quote: {
          en: 'If we have chosen the position in life in which we can most of all work for mankind, no burdens can bow us down, because they are sacrifices for the benefit of all.',
          orig: '',
          provenance: 'Reflections of a Young Man on the Choice of a Profession, Trier Gymnasium essay (August 1835)'
        }
      },
      {
        number: 2,
        roman: 'II',
        id: 'berlin',
        year: '1836',
        age: 'Age 18',
        date: '1836 – 1841',
        location: 'University of Berlin, Prussia',
        shortPlace: 'Berlin',
        coords: [13.405, 52.52],
        coordText: '52°31′N, 13°24′E',
        eraKey: 'industrial1867',
        labelPos: [14, -4],
        routeCurve: -0.15,
        focusMultiplier: 1.5,
        title: 'Hegel’s Dialectics & the Doctoral Thesis',
        prose: 'Sent to Berlin to study law, Marx instead threw himself into philosophy, joining the radical “Young Hegelians” debating Georg Wilhelm Friedrich Hegel’s dialectic of history in smoky tavern circles. Submitting his doctoral thesis in 1841 on the ancient Greek atomists Democritus and Epicurus (to the more liberal University of Jena), he found academic doors slammed shut by Prussian censorship—pushing him into radical journalism.',
        fact: 'In his 1841 doctoral foreword, young Marx chose Prometheus as his patron saint of philosophy—declaring Prometheus “the most eminent saint and martyr in the philosophical calendar.”',
        quote: {
          en: 'It is not the consciousness of men that determines their being, but, on the contrary, their social being that determines their consciousness.',
          orig: 'Es ist nicht das Bewußtsein der Menschen, das ihr Sein, sondern umgekehrt ihr gesellschaftliches Sein, das ihr Bewußtsein bestimmt.',
          origLang: 'Deutsch',
          provenance: 'Preface to A Contribution to the Critique of Political Economy (1859)'
        }
      },
      {
        number: 3,
        roman: 'III',
        id: 'cologne',
        year: '1842',
        age: 'Age 24',
        date: '1842 – 1843 & 1848 – 1849',
        location: 'Cologne, Prussian Rhineland',
        shortPlace: 'Cologne',
        coords: [6.9603, 50.9375],
        coordText: '50°56′N, 6°58′E',
        eraKey: 'industrial1867',
        labelPos: [14, -6],
        routeCurve: 0.14,
        focusMultiplier: 1.6,
        title: 'Editor of the Rheinische Zeitung',
        prose: 'Taking the helm of Cologne’s liberal daily Rheinische Zeitung at twenty-four, Marx tripled its circulation by championing press freedom and exposing the plight of Moselle wine-growers and impoverished peasants prosecuted for gathering fallen firewood. Confronting real material conflicts forced him to realize philosophy alone could not explain society—launching his lifelong study of economics just before Prussian authorities banned the paper.',
        fact: 'Returning to Cologne during the Revolutions of 1848 to edit the Neue Rheinische Zeitung, Marx printed its final issue in May 1849 entirely in crimson red ink before being expelled from Prussia forever.',
        quote: {
          en: 'The free press is the ubiquitous vigilant eye of a people’s soul, the embodiment of a people’s faith in itself.',
          orig: '',
          provenance: 'Debates on Freedom of the Press, Rheinische Zeitung, Cologne (May 1842)'
        }
      },
      {
        number: 4,
        roman: 'IV',
        id: 'paris',
        year: '1844',
        age: 'Age 26',
        date: 'October 1843 – January 1845',
        location: 'Rue Vaneau & Café de la Régence, Paris',
        shortPlace: 'Paris',
        coords: [2.3522, 48.8566],
        coordText: '48°51′N, 2°21′E',
        eraKey: 'industrial1867',
        labelPos: [-15, 6],
        alignEnd: true,
        routeCurve: 0.16,
        focusMultiplier: 1.55,
        title: 'Meeting Engels & the 1844 Manuscripts',
        prose: 'Exiled to Paris in late 1843, Marx plunged into Adam Smith, David Ricardo, and French socialist thinkers—drafting his celebrated Economic and Philosophic Manuscripts of 1844 on human alienation under industrial labor. On August 28, 1844, at the famous chess haunt Café de la Régence, he met twenty-three-year-old Friedrich Engels for ten days of nonstop conversation, launching one of history’s most consequential intellectual partnerships.',
        fact: 'Expelled from Paris in early 1845 at the Prussian government’s request, Marx’s 1844 Manuscripts sat unpublished in archives for nearly ninety years until 1932—transforming twentieth-century humanist philosophy when finally printed.',
        quote: {
          en: 'History repeats itself, first as tragedy, second as farce.',
          orig: 'Das eine Mal als Tragödie, das andere Mal als Farce.',
          origLang: 'Deutsch',
          provenance: 'The Eighteenth Brumaire of Louis Bonaparte (1852), opening paragraph (paraphrasing Hegel)'
        }
      },
      {
        number: 5,
        roman: 'V',
        id: 'brussels',
        year: '1848',
        age: 'Age 29',
        date: '1845 – February 1848',
        location: 'Maison du Cygne, Grand-Place, Brussels',
        shortPlace: 'Brussels',
        coords: [4.3517, 50.8503],
        coordText: '50°51′N, 4°21′E',
        eraKey: 'industrial1867',
        labelPos: [-15, -6],
        alignEnd: true,
        routeCurve: -0.15,
        focusMultiplier: 1.6,
        title: 'Theses on Feuerbach & the Communist Manifesto',
        prose: 'Living in Brussels after renouncing his Prussian citizenship (remaining stateless for the rest of his life), Marx and Engels formulated historical materialism in The German Ideology and scribbled eleven terse Theses on Feuerbach. Commissioned by the Communist League, Marx raced past his deadline in early 1848 to finish a blazing 23-page pamphlet—The Communist Manifesto—published in London just days before revolutions swept across Europe.',
        fact: 'Despite its explosive later fame, the first German printing of The Communist Manifesto in February 1848 barely drew notice at the time—and was printed anonymously in a tiny Bishopsgate workshop in London.',
        quote: {
          en: 'The philosophers have only interpreted the world, in various ways; the point, however, is to change it.',
          orig: 'Die Philosophen haben die Welt nur verschieden interpretiert; es kömmt drauf an, sie zu verändern.',
          origLang: 'Deutsch',
          provenance: 'Eleventh Thesis on Feuerbach, written in Brussels (Spring 1845)'
        }
      },
      {
        number: 6,
        roman: 'VI',
        id: 'london',
        year: '1867',
        age: 'Age 49',
        date: '1849 – 14 March 1883',
        location: 'British Museum & Soho, London',
        shortPlace: 'London',
        coords: [-0.1278, 51.5074],
        coordText: '51°30′N, 0°08′W',
        eraKey: 'industrial1867',
        labelPos: [-15, -4],
        alignEnd: true,
        seaLeg: true,
        routeCurve: -0.16,
        focusMultiplier: 1.6,
        title: 'Das Kapital at the British Museum',
        prose: 'Arriving in London in August 1849 expecting a brief stay, Marx remained thirty-four years—enduring grinding poverty in Soho while sustained by journalism and Engels’s unstinting financial support. Sitting day after day under the dome of the British Museum Reading Room devouring parliamentary factory-inspection reports, he published Volume I of Das Kapital in 1867—an exhaustive critique of industrial capitalism, surplus value, and global crisis that reshaped modern economics, sociology, and twentieth-century geopolitics.',
        fact: 'When Marx died at his desk in March 1883, only eleven mourners stood beside his grave at Highgate Cemetery—yet Friedrich Engels declared over the open earth: “His name will endure through the ages, and so also will his work.”',
        quote: {
          en: 'Men make their own history, but they do not make it as they please; they do not make it under self-selected circumstances, but under circumstances existing already, given and transmitted from the past.',
          orig: 'Die Menschen machen ihre eigene Geschichte, aber sie machen sie nicht aus freien Stücken.',
          origLang: 'Deutsch',
          provenance: 'The Eighteenth Brumaire of Louis Bonaparte (1852)'
        },
        subTabsLabel: 'London chapters:',
        subStages: [
          {
            label: '1867 · Das Kapital',
            year: '1867',
            age: 'Age 49',
            date: '14 September 1867',
            title: 'Critique of Political Economy',
            prose: 'Sitting under the vast blue dome of the British Museum Reading Room from nine until seven for over fifteen years, Marx synthesized classical economics, factory legislation reports, and mathematical notebooks into Das Kapital (1867). Rather than simply condemning capitalism morally, he sought to lay bare its internal laws of motion—commodity fetishism, mechanization, crisis cycles, and globalization.',
            fact: 'Marx sent a personally inscribed copy of Das Kapital to Charles Darwin in 1873; Darwin replied with polite English courtesy thanking him, though most of its German pages in Darwin’s library at Down House remained uncut.',
            quote: {
              en: 'There is no royal road to science, and only those who do not dread the fatiguing climb of its steep paths have a chance of gaining its luminous summits.',
              orig: 'Il n’y a pas de route royale pour la science.',
              origLang: 'Français',
              provenance: 'Preface to the French edition of Das Kapital, 18 March 1872'
            }
          },
          {
            label: '1883 · Highgate & Legacy',
            year: '1883',
            age: 'Age 64',
            date: '14 March 1883',
            title: 'The Stateless Exile’s Quiet Funeral',
            prose: 'Having helped organize the International Workingmen’s Association (the First International) in 1864 and defended the Paris Commune in 1871, Marx spent his final years learning Russian to study agrarian economics and teaching himself differential calculus—leaving Volumes II and III of Das Kapital in vast manuscripts that Engels faithfully edited and published after Marx’s death in March 1883.',
            fact: 'Despite his fame across Europe, Britain rejected Marx’s 1874 application for naturalization on the grounds that he had “not been loyal to his own King.”',
            quote: {
              en: 'Men make their own history, but they do not make it as they please; they do not make it under self-selected circumstances, but under circumstances existing already, given and transmitted from the past.',
              orig: 'Die Menschen machen ihre eigene Geschichte, aber sie machen sie nicht aus freien Stücken.',
              origLang: 'Deutsch',
              provenance: 'The Eighteenth Brumaire of Louis Bonaparte (1852)'
            }
          }
        ]
      }
    ]
  };
})(window);
