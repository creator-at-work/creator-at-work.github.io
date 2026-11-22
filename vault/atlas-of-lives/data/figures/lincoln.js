/* ==========================================================================
   ABRAHAM LINCOLN (1809–1865) — Historical Life Atlas
   Sources: Collected Works of Abraham Lincoln (Basler), Library of Congress,
            Doris Kearns Goodwin, Eric Foner, Britannica
   ========================================================================== */

(function (global) {
  'use strict';

  global.ATLAS_FIGURES = global.ATLAS_FIGURES || {};

  global.ATLAS_FIGURES.lincoln = {
    id: 'lincoln',
    era: 'Modern World',
    title: 'Abraham Lincoln',
    fullName: 'Abraham Lincoln · 16th President of the United States',
    years: '1809 — 1865',
    subtitle: 'Kentucky Frontier to Gettysburg & Washington',
    worldLabel: 'World of 1863',
    worldEraLabel: 'American Civil War Era · 1809–1865',
    originName: 'Hodgenville, Kentucky',
    originCoords: [-85.74, 37.574],

    viewBounds: {
      lon: [-97.5, -69.5],
      lat: [27.0, 44.8]
    },

    waterLabels: [
      { name: 'ATLANTIC OCEAN', coords: [-71.5, 34.5], regionalOnly: true },
      { name: 'GULF OF MEXICO', coords: [-89.5, 26.8], regionalOnly: true },
      { name: 'ATLANTIC OCEAN', coords: [-28, -4], worldOnly: true },
      { name: 'INDIAN OCEAN', coords: [78, -22], worldOnly: true },
      { name: 'PACIFIC OCEAN', coords: [-130, -8], worldOnly: true }
    ],

    defaultEraKey: 'union1863',
    territorySets: {
      union1863: {
        empireLabel: 'United States of America (Civil War Era)',
        dependentLabel: 'British North America & Mexico',
        rivalLabel: 'European Powers Watching the Union',
        empire: ['United States of America'],
        dependent: ['Canada', 'Mexico'],
        ally: [],
        rival: ['United Kingdom', 'France']
      }
    },

    worldRealms: [
      { id: 'british', name: 'British Empire (Victorian Era)', desc: 'Textile mills in Lancashire felt the Union cotton blockade, yet British mill workers sent Lincoln a famous letter of solidarity supporting emancipation.', cssVar: '--terr-rival', countries: ['United Kingdom', 'Canada', 'India', 'Australia'], label: 'BRITISH EMPIRE', labelCoords: [-2.0, 54.0] },
      { id: 'russia', name: 'Russian Empire (Alexander II)', desc: 'Tsar Alexander II emancipated 23 million Russian serfs in 1861, two years before Lincoln’s Emancipation Proclamation.', cssVar: '--realm-persia', countries: ['Russia'], label: 'RUSSIAN EMPIRE', labelCoords: [88.0, 61.0] },
      { id: 'france', name: 'Second French Empire', desc: 'Napoleon III intervened militarily in Mexico while the United States fought its Civil War.', cssVar: '--realm-ottoman', countries: ['France', 'Mexico'], label: 'SECOND EMPIRE', labelCoords: [2.5, 47.0] },
      { id: 'qing', name: 'Qing China (Taiping Rebellion)', desc: 'Simultaneously engulfed in the deadliest civil war of the nineteenth century.', cssVar: '--realm-qing', countries: ['China'], label: 'QING CHINA', labelCoords: [106.0, 35.0] }
    ],

    historicalNames: {
      'United States of America': 'United States (Union & Confederacy, 1861–1865)',
      Canada: 'Province of Canada (British North America)',
      Mexico: 'Mexican Republic (Benito Juárez)'
    },

    worldPlaces: [
      { name: 'Manchester', year: '1862', detail: 'Out-of-work Lancashire cotton mill workers wrote to Lincoln endorsing the blockade against slavery despite their own hunger.', coords: [-2.2426, 53.4808] },
      { name: 'Saint Petersburg', year: '1861', detail: 'Tsar Alexander II abolished serfdom across the Russian Empire in March 1861.', coords: [30.3351, 59.9343] },
      { name: 'Appomattox', year: '1865', detail: 'Where General Robert E. Lee surrendered the Army of Northern Virginia to Ulysses S. Grant on April 9, 1865.', coords: [-78.8253, 37.3771] }
    ],

    sources: [
      { label: 'Library of Congress · Lincoln Papers', url: 'https://www.loc.gov/collections/abraham-lincoln-papers/' },
      { label: 'Collected Works of Abraham Lincoln', url: 'https://quod.lib.umich.edu/l/lincoln/' }
    ],

    stages: [
      {
        number: 1,
        roman: 'I',
        id: 'hodgenville',
        year: '1809',
        age: 'Birth',
        date: '12 February 1809',
        location: 'Sinking Spring Farm, Hodgenville, Kentucky',
        shortPlace: 'Kentucky',
        coords: [-85.74, 37.574],
        coordText: '37°34′N, 85°44′W',
        eraKey: 'union1863',
        labelPos: [14, 6],
        routeCurve: 0,
        focusMultiplier: 1.55,
        title: 'Log Cabin & Self-Education on the Frontier',
        prose: 'Born in a one-room dirt-floor log cabin in Kentucky and raised in the Indiana wilderness after his mother died when he was nine, Abraham Lincoln received barely one cumulative year of formal schooling. Reading by firelight—Aesop’s Fables, Shakespeare, the King James Bible, and later all six books of Euclid’s geometry—he taught himself the cadence and logic that would define American political prose.',
        fact: 'Lincoln’s father moved the family from Kentucky to Indiana in 1816 in part because of land-title disputes and his quiet opposition to slavery in Kentucky.',
        quote: {
          en: 'The things I want to know are in books; my best friend is the man who’ll get me a book I ain’t read.',
          orig: '',
          provenance: 'Recalled by boyhood companions in Indiana & Illinois (collected in Herndon’s Informants)'
        }
      },
      {
        number: 2,
        roman: 'II',
        id: 'neworleans',
        year: '1831',
        age: 'Age 22',
        date: '1828 & May 1831',
        location: 'New Orleans, Louisiana',
        shortPlace: 'New Orleans',
        coords: [-90.0715, 29.9511],
        coordText: '29°57′N, 90°04′W',
        eraKey: 'union1863',
        labelPos: [14, 4],
        routeCurve: 0.16,
        focusMultiplier: 1.5,
        title: 'Down the Mississippi to the Slave Market',
        prose: 'Twice as a young frontier boatman, nineteen- and twenty-two-year-old Lincoln poled flatboats loaded with pork, corn, and flour more than a thousand miles down the Ohio and Mississippi rivers to New Orleans. There, witnessing enslaved human beings shackled and auctioned in the largest slave market in North America seared a moral revulsion into his conscience that never faded.',
        fact: 'On his 1828 voyage downriver, Lincoln earned $24 for three months of grueling river labor and fought off an ambush of armed robbers one night near Baton Rouge.',
        quote: {
          en: 'If slavery is not wrong, nothing is wrong. I can not remember when I did not so think, and feel.',
          orig: '',
          provenance: 'Letter to Albert G. Hodges, 4 April 1864 (Collected Works, Vol. 7)'
        }
      },
      {
        number: 3,
        roman: 'III',
        id: 'springfield',
        year: '1858',
        age: 'Age 49',
        date: '1837 – February 1861',
        location: 'Springfield, Illinois',
        shortPlace: 'Springfield',
        coords: [-89.6501, 39.7817],
        coordText: '39°47′N, 89°39′W',
        eraKey: 'union1863',
        labelPos: [-15, -4],
        alignEnd: true,
        routeCurve: -0.16,
        focusMultiplier: 1.55,
        title: 'Prairie Lawyer & the “House Divided”',
        prose: 'Settling in New Salem and then Springfield, Lincoln taught himself law from borrowed volumes, rode the Eighth Judicial Circuit across Illinois for twenty years, and served a single term in Congress opposing the Mexican–American War. When the Kansas–Nebraska Act threatened to spread slavery across western territories, he returned to politics in 1858 with his electrifying “House Divided” speech and seven historic Senate debates against Stephen A. Douglas.',
        fact: 'Lincoln remains the only U.S. President to hold a federal patent (No. 6,469, granted in 1849)—for an ingenious buoyant-chamber device to lift stranded riverboats over shoals.',
        quote: {
          en: 'A house divided against itself cannot stand. I believe this government cannot endure, permanently half slave and half free.',
          orig: '',
          provenance: 'Address to the Illinois Republican State Convention, Springfield, 16 June 1858'
        }
      },
      {
        number: 4,
        roman: 'IV',
        id: 'newyork',
        year: '1860',
        age: 'Age 51',
        date: '27 February 1860',
        location: 'Cooper Union, New York City',
        shortPlace: 'New York',
        coords: [-74.006, 40.7128],
        coordText: '40°43′N, 74°00′W',
        eraKey: 'union1863',
        labelPos: [14, -4],
        routeCurve: -0.14,
        focusMultiplier: 1.55,
        title: 'The Cooper Union Address',
        prose: 'Invited east to speak before 1,500 skeptical New York intellectuals at Cooper Union in a rumpled new suit, the gangly westerner delivered a rigorously researched constitutional proof that the Founding Fathers had consistently restricted slavery’s expansion. Combined with Mathew Brady’s dignified photograph taken earlier that morning, the speech vaulted Lincoln from regional contender to the Republican presidential nomination.',
        fact: 'Lincoln later remarked modestly that “Brady and the Cooper Institute made me President.”',
        quote: {
          en: 'Let us have faith that right makes might, and in that faith, let us, to the end, dare to do our duty as we understand it.',
          orig: '',
          provenance: 'Cooper Union Address, New York City, 27 February 1860'
        }
      },
      {
        number: 5,
        roman: 'V',
        id: 'gettysburg',
        year: '1863',
        age: 'Age 54',
        date: '19 November 1863',
        location: 'Soldiers’ National Cemetery, Gettysburg',
        shortPlace: 'Gettysburg',
        coords: [-77.2311, 39.8309],
        coordText: '39°50′N, 77°14′W',
        eraKey: 'union1863',
        labelPos: [-15, -6],
        alignEnd: true,
        routeCurve: 0.14,
        focusMultiplier: 1.65,
        title: 'A New Birth of Freedom',
        prose: 'Following the two-hour classical oration of Edward Everett at the dedication of the Gettysburg battlefield cemetery, Lincoln rose to speak just 272 words in barely two minutes. Redefining the Civil War not merely as a constitutional dispute over Union, but as a global test of whether democratic equality can survive, he recast the Declaration of Independence as the nation’s true moral charter.',
        fact: 'The very next day, famed orator Edward Everett wrote to Lincoln: “I should be glad, if I could flatter myself that I came as near to the central idea of the occasion, in two hours, as you did in two minutes.”',
        quote: {
          en: 'That this nation, under God, shall have a new birth of freedom—and that government of the people, by the people, for the people, shall not perish from the earth.',
          orig: '',
          provenance: 'The Gettysburg Address, 19 November 1863'
        }
      },
      {
        number: 6,
        roman: 'VI',
        id: 'washington',
        year: '1865',
        age: 'Age 56',
        date: '1861 – 15 April 1865',
        location: 'Washington, D.C.',
        shortPlace: 'Washington',
        coords: [-77.0369, 38.9072],
        coordText: '38°54′N, 77°02′W',
        eraKey: 'union1863',
        labelPos: [14, 6],
        routeCurve: 0.16,
        focusMultiplier: 1.65,
        title: 'Emancipation, Victory & Martyrdom',
        prose: 'Guiding the Republic through four agonizing years of civil war, Lincoln issued the Emancipation Proclamation (January 1, 1863), enlisted nearly 200,000 Black soldiers and sailors into Union forces, and drove the Thirteenth Amendment permanently abolishing slavery through Congress. Just five days after Lee’s surrender at Appomattox, he was assassinated at Ford’s Theatre by John Wilkes Booth on April 14, 1865.',
        fact: 'On signing the Emancipation Proclamation, Lincoln noticed his hand trembling from hours of shaking New Year’s visitors’ hands and paused—saying he did not want posterity seeing a shaky signature and thinking he had hesitated.',
        quote: {
          en: 'With malice toward none; with charity for all; with firmness in the right, as God gives us to see the right, let us strive on to finish the work we are in.',
          orig: '',
          provenance: 'Second Inaugural Address, U.S. Capitol, 4 March 1865'
        },
        subTabsLabel: 'Washington turning points:',
        subStages: [
          {
            label: '1865 · Second Inaugural & Peace',
            year: '1865',
            age: 'Age 56',
            date: '4 March – 15 April 1865',
            title: 'With Malice Toward None',
            prose: 'As Union victory drew near in March 1865, Lincoln stood before the Capitol—with Frederick Douglass watching in the crowd—and delivered a 701-word Second Inaugural Address rejecting triumphalism, acknowledging shared national guilt for slavery, and calling for compassionate healing. Six weeks later he lay dead, mourned by millions along a 1,700-mile funeral train back to Springfield.',
            fact: 'Frederick Douglass called Lincoln’s Second Inaugural “a sacred effort,” and Lincoln greeted Douglass at the reception afterward as “my friend Douglass,” asking how he liked the speech.',
            quote: {
              en: 'With malice toward none; with charity for all; with firmness in the right, as God gives us to see the right, let us strive on to finish the work we are in.',
              orig: '',
              provenance: 'Second Inaugural Address, U.S. Capitol, 4 March 1865'
            }
          },
          {
            label: '1863 · Emancipation Proclamation',
            year: '1863',
            age: 'Age 53',
            date: '1 January 1863',
            title: 'Forever Free',
            prose: 'Drafted quietly at the Soldiers’ Home cottage north of the White House and announced after the Battle of Antietam, the Emancipation Proclamation declared enslaved people in rebellious states “thenceforward, and forever free.” It transformed the Union Army into an army of liberation and blocked European recognition of the Confederacy.',
            fact: 'On signing the final document, Lincoln paused to steady his hand after a long reception so his signature would look firm: “If my name ever goes into history it will be for this act, and my whole soul is in it.”',
            quote: {
              en: 'In giving freedom to the slave, we assure freedom to the free—honorable alike in what we give, and what we preserve.',
              orig: '',
              provenance: 'Annual Message to Congress, 1 December 1862'
            }
          }
        ]
      }
    ]
  };
})(window);
