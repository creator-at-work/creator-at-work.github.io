/* ==========================================================================
   CHARLES DARWIN (1809–1882) — Historical Life Atlas
   Sources: The Voyage of the Beagle (1839), On the Origin of Species (1859),
            The Autobiography of Charles Darwin, Darwin Correspondence Project
   ========================================================================== */

(function (global) {
  'use strict';

  global.ATLAS_FIGURES = global.ATLAS_FIGURES || {};

  global.ATLAS_FIGURES.darwin = {
    id: 'darwin',
    era: 'Enlightenment & Empire',
    title: 'Charles Darwin',
    fullName: 'Charles Robert Darwin FRS',
    years: '1809 — 1882',
    subtitle: 'HMS Beagle Circumnavigation & Down House',
    worldLabel: 'World of 1835',
    worldEraLabel: 'Age of Sail & Natural History · 1831–1882',
    originName: 'Plymouth',
    originCoords: [-4.1427, 50.3755],

    viewBounds: {
      lon: [-180, 180],
      lat: [-60, 72]
    },

    waterLabels: [
      { name: 'ATLANTIC OCEAN', coords: [-28, -4] },
      { name: 'INDIAN OCEAN', coords: [78, -22] },
      { name: 'PACIFIC OCEAN', coords: [-130, -8] }
    ],

    defaultEraKey: 'beagle1835',
    territorySets: {
      beagle1835: {
        empireLabel: 'British Maritime Network',
        dependentLabel: 'HMS Beagle Survey Lands',
        allyLabel: 'New South American Republics',
        rivalLabel: 'Continental Empires',
        empire: ['United Kingdom', 'Australia', 'South Africa', 'New Zealand', 'India'],
        dependent: ['Ecuador', 'Chile', 'Argentina', 'Uruguay', 'Brazil', 'Cabo Verde'],
        ally: [],
        rival: []
      }
    },

    worldRealms: [
      { id: 'british', name: 'British Maritime Empire', desc: 'Global naval and hydrographic power that dispatched HMS Beagle to chart South America’s coasts.', cssVar: '--terr-rival', countries: ['United Kingdom', 'Canada', 'India', 'Australia', 'South Africa'], label: 'BRITISH EMPIRE', labelCoords: [78.0, 22.0] },
      { id: 'us', name: 'United States', desc: 'Expanding westward across North America.', cssVar: '--realm-us', countries: ['United States of America'], label: 'UNITED STATES', labelCoords: [-100.0, 39.0] },
      { id: 'qing', name: 'Qing Dynasty China', desc: 'On the eve of the First Opium War (1839).', cssVar: '--realm-qing', countries: ['China'], label: 'QING DYNASTY', labelCoords: [106.0, 35.0] },
      { id: 'russia', name: 'Russian Empire', desc: 'Stretching from Eastern Europe across Siberia to Alaska.', cssVar: '--realm-persia', countries: ['Russia'], label: 'RUSSIAN EMPIRE', labelCoords: [88.0, 61.0] }
    ],

    historicalNames: {
      'United Kingdom': 'United Kingdom (Shrewsbury, Cambridge & Down House)',
      Brazil: 'Empire of Brazil',
      Argentina: 'Argentine Confederation & Patagonia',
      Ecuador: 'Republic of Ecuador (Galápagos Archipelago)',
      Australia: 'Colony of New South Wales',
      'South Africa': 'British Cape Colony'
    },

    worldPlaces: [
      { name: 'Ternate (Maluku Islands)', year: '1858', detail: 'Where Alfred Russel Wallace independently conceived natural selection during a malarial fever and mailed his essay to Darwin.', coords: [127.3845, 0.7893] },
      { name: 'Tahiti', year: '1835', detail: 'Where Darwin formulated his enduring geological theory of how sinking volcanic islands build coral atolls.', coords: [-149.426, -17.6509] },
      { name: 'Mauritius', year: '1836', detail: 'Indian Ocean stopover on HMS Beagle’s final leg homeward.', coords: [57.5522, -20.3484] }
    ],

    sources: [
      { label: 'Darwin Online · Complete Works', url: 'https://darwin-online.org.uk/' },
      { label: 'Darwin Correspondence Project · Cambridge', url: 'https://www.darwinproject.ac.uk/' }
    ],

    stages: [
      {
        number: 1,
        roman: 'I',
        id: 'england',
        year: '1831',
        age: 'Age 22',
        date: '27 December 1831',
        location: 'Plymouth & Down House, England',
        shortPlace: 'England',
        coords: [-2.0, 51.3],
        coordText: '50°22′N, 4°09′W',
        eraKey: 'beagle1835',
        labelPos: [14, -6],
        routeCurve: 0,
        focusMultiplier: 2.8,
        title: 'Sailing Aboard HMS Beagle',
        prose: 'Born in Shrewsbury in 1809 on the exact same day as Abraham Lincoln, young Charles Darwin dropped out of Edinburgh medical school and studied theology at Cambridge while obsessively collecting beetles. Invited at twenty-two to join Captain Robert FitzRoy aboard the tiny ninety-foot survey brig HMS Beagle, he sailed out of Plymouth on December 27, 1831 on a voyage planned for two years that stretched into five.',
        fact: 'Captain FitzRoy nearly rejected Darwin because he practiced physiognomy and doubted that anyone with the shape of Darwin’s nose possessed sufficient energy for a round-the-world voyage.',
        quote: {
          en: 'The voyage of the Beagle has been by far the most important event in my life, and has determined my whole career.',
          orig: '',
          provenance: 'The Autobiography of Charles Darwin (1876)'
        },
        subTabsLabel: 'England chapters:',
        subStages: [
          {
            label: '1831 · HMS Beagle Departs',
            year: '1831',
            age: 'Age 22',
            date: '27 December 1831',
            title: 'Sailing Aboard HMS Beagle',
            prose: 'Born in Shrewsbury in 1809 on the exact same day as Abraham Lincoln, young Charles Darwin dropped out of Edinburgh medical school and studied theology at Cambridge while obsessively collecting beetles. Invited at twenty-two to join Captain Robert FitzRoy aboard the tiny ninety-foot survey brig HMS Beagle, he sailed out of Plymouth on December 27, 1831 on a voyage planned for two years that stretched into five.',
            fact: 'Captain FitzRoy nearly rejected Darwin because he practiced physiognomy and doubted that anyone with the shape of Darwin’s nose possessed sufficient energy for a round-the-world voyage.',
            quote: {
              en: 'The voyage of the Beagle has been by far the most important event in my life, and has determined my whole career.',
              orig: '',
              provenance: 'The Autobiography of Charles Darwin (1876)'
            }
          },
          {
            label: '1859 · Down House & Origin',
            year: '1859',
            age: 'Age 50',
            date: '24 November 1859',
            title: 'On the Origin of Species',
            prose: 'Settled quietly at Down House in Kent with his wife Emma for forty years—walking his gravel “Sandwalk” daily while spending eight years dissecting barnacles and compiling overwhelming evidence—Darwin was spurred to publish in 1858 when young naturalist Alfred Russel Wallace sent him an independent essay describing natural selection. Published on November 24, 1859, On the Origin of Species transformed humanity’s understanding of all living nature.',
            fact: 'Remarkably, the word “evolution” never appears once in the first five editions of On the Origin of Species—though the book’s very last word is “evolved.”',
            quote: {
              en: 'There is grandeur in this view of life, with its several powers, having been originally breathed into a few forms or into one; and that… from so simple a beginning endless forms most beautiful and most wonderful have been, and are being, evolved.',
              orig: '',
              provenance: 'On the Origin of Species (1859), closing sentence'
            }
          }
        ]
      },
      {
        number: 2,
        roman: 'II',
        id: 'capeverde',
        year: '1832',
        age: 'Age 22',
        date: '16 January 1832',
        location: 'Santiago, Cape Verde Islands',
        shortPlace: 'Cape Verde',
        coords: [-23.5133, 14.9177],
        coordText: '14°55′N, 23°31′W',
        eraKey: 'beagle1835',
        labelPos: [-14, 4],
        alignEnd: true,
        seaLeg: true,
        routeCurve: 0.14,
        focusMultiplier: 2.5,
        title: 'First Glimpse of Deep Geological Time',
        prose: 'Suffering terribly from seasickness across the North Atlantic, Darwin stepped ashore on the volcanic island of Santiago in Cape Verde with Charles Lyell’s brand-new Principles of Geology in hand. Seeing a white band of marine seashells embedded high in a black basalt sea cliff, he realized the Earth’s crust rises and falls imperceptibly over vast ages—giving him the immense timescale evolution required.',
        fact: 'Standing on the sunlit cliffs of Santiago, Darwin felt the first flash of ambition that he too might write a book on the geology of the countries he visited.',
        quote: {
          en: 'It then first dawned on me that I might perhaps write a book on the geology of the various countries visited, and this made me thrill with delight.',
          orig: '',
          provenance: 'The Autobiography of Charles Darwin (1876)'
        }
      },
      {
        number: 3,
        roman: 'III',
        id: 'brazil',
        year: '1832',
        age: 'Age 23',
        date: 'February – July 1832',
        location: 'Salvador & Rio de Janeiro, Brazil',
        shortPlace: 'Brazil',
        coords: [-43.1729, -22.9068],
        coordText: '22°54′S, 43°10′W',
        eraKey: 'beagle1835',
        labelPos: [14, 4],
        seaLeg: true,
        routeCurve: 0.12,
        focusMultiplier: 2.3,
        title: 'Tropical Wonder & Abhorrence of Slavery',
        prose: 'Stepping into the Atlantic rainforests of Bahia and Rio de Janeiro left Darwin overwhelmed by the profusion of orchids, hummingbirds, and beetles—collecting sixty-nine species of beetles in a single afternoon. Yet Brazil also exposed him directly to the cruelty of chattel slavery, sparking a fierce moral argument with Captain FitzRoy that almost got Darwin dismissed from the ship.',
        fact: 'Darwin’s lifelong abolitionist conviction—inherited from his grandfather Josiah Wedgwood—deeply informed his later scientific insistence in The Descent of Man that all human races share a single common origin.',
        quote: {
          en: 'If the misery of our poor be caused not by the laws of nature, but by our institutions, great is our sin.',
          orig: '',
          provenance: 'The Voyage of the Beagle (1839), Chapter XXI'
        }
      },
      {
        number: 4,
        roman: 'IV',
        id: 'patagonia',
        year: '1833',
        age: 'Age 24',
        date: '1832 – 1834',
        location: 'Patagonia & Tierra del Fuego',
        shortPlace: 'Patagonia',
        coords: [-68.303, -54.8019],
        coordText: '54°48′S, 68°18′W',
        eraKey: 'beagle1835',
        labelPos: [14, 4],
        seaLeg: true,
        routeCurve: 0.14,
        focusMultiplier: 2.3,
        title: 'Giant Fossils & Andean Earthquakes',
        prose: 'Riding across the Argentine pampas with gauchos and weathering violent gales off Tierra del Fuego, Darwin unearthed massive fossil skeletons of extinct ground sloths (Megatherium) and armored Glyptodon—strikingly resembling the small living sloths and armadillos of the same continent. Months later in Chile, he experienced the devastating 1835 Concepción earthquake, watching mussel beds thrust ten feet out of the sea in minutes.',
        fact: 'While digging at Punta Alta, Darwin realized that extinct fossil species and living local species were bound by a “law of succession of types”—a clue pointing unmistakably to descent with modification.',
        quote: {
          en: 'This wonderful relationship in the same continent between the dead and the living will, I do not doubt, hereafter throw more light on the appearance of organic beings on our earth.',
          orig: '',
          provenance: 'The Voyage of the Beagle (1839), Chapter VIII'
        }
      },
      {
        number: 5,
        roman: 'V',
        id: 'galapagos',
        year: '1835',
        age: 'Age 26',
        date: '15 September – 20 October 1835',
        location: 'Galápagos Islands, Pacific Ocean',
        shortPlace: 'Galápagos',
        coords: [-90.55, -0.65],
        coordText: '0°39′S, 90°33′W',
        eraKey: 'beagle1835',
        labelPos: [-14, -4],
        alignEnd: true,
        seaLeg: true,
        routeCurve: -0.15,
        focusMultiplier: 2.5,
        title: 'The Archipelago of Divergent Forms',
        prose: 'For five weeks among the black lava islands of the Galápagos, Darwin rode giant tortoises, tossed marine iguanas into the surf to test their instincts, and noted with astonishment that the vice-governor could tell which island any tortoise came from merely by the shape of its shell. Back in London, ornithologist John Gould revealed that Darwin’s Galápagos finches and mockingbirds were distinct island species—forcing Darwin to open his secret Transmutation Notebooks.',
        fact: 'On the Galápagos themselves, Darwin actually failed to label which island most of his finches came from—it was his carefully labeled mockingbirds (plus Captain FitzRoy’s properly labeled finch specimens) that cracked the evolutionary puzzle back in England.',
        quote: {
          en: 'Seeing this gradation and diversity of structure in one small, intimately related group of birds, one might really fancy that from an original paucity of birds in this archipelago, one species had been taken and modified for different ends.',
          orig: '',
          provenance: 'The Voyage of the Beagle (2nd edition, 1845), Chapter XVII'
        }
      },
      {
        number: 6,
        roman: 'VI',
        id: 'sydney',
        year: '1836',
        age: 'Age 26',
        date: 'January – March 1836',
        location: 'Sydney & New South Wales, Australia',
        shortPlace: 'Sydney',
        coords: [151.2093, -33.8688],
        coordText: '33°52′S, 151°13′E',
        eraKey: 'beagle1835',
        labelPos: [-14, -6],
        alignEnd: true,
        seaLeg: true,
        routeCurve: 0.08,
        focusMultiplier: 2.3,
        title: 'Marsupials & “Two Distinct Creators”',
        prose: 'Sailing west across the Pacific via Tahiti and New Zealand to Sydney, Darwin lay on a sunlit riverbank in New South Wales watching a duck-billed platypus dive and an antlion dig its sand-pit. Puzzled why an identical climate hosted completely different marsupial fauna than Europe or South America, he scribbled in his diary that an unbeliever might conclude “surely two distinct Creators must have been at work.”',
        fact: 'Stopping shortly afterward in the Indian Ocean’s Cocos (Keeling) Islands, Darwin tested and confirmed his coral-atoll theory—explaining for the first time how circular reef rings form atop slowly subsiding volcanic peaks.',
        quote: {
          en: 'A little time before this I had been lying on a sunny bank and was reflecting on the strange character of the animals of this country as compared to the rest of the world.',
          orig: '',
          provenance: 'Beagle Diary, 19 January 1836 (Wallerawang, New South Wales)'
        }
      },
      {
        number: 7,
        roman: 'VII',
        id: 'capetown',
        year: '1836',
        age: 'Age 27',
        date: '31 May – 18 June 1836',
        location: 'Cape Town, South Africa',
        shortPlace: 'Cape Town',
        coords: [18.4241, -33.9249],
        coordText: '33°55′S, 18°25′E',
        eraKey: 'beagle1835',
        labelPos: [14, 6],
        seaLeg: true,
        routeCurve: 0.14,
        focusMultiplier: 2.4,
        title: 'Dinner with Herschel & the Mystery of Mysteries',
        prose: 'Rounding the Cape of Good Hope in June 1836, Darwin dined at Feldhausen near Cape Town with his scientific hero, astronomer Sir John Herschel—who had recently called the origin of new species “that mystery of mysteries.” Returning to England four months later with 5,436 preserved specimens and 770 pages of diary notes, Darwin spent the next twenty-three years solving that mystery with unyielding care.',
        fact: 'In July 1837, back in London, Darwin sketched his famous branching tree of life in Notebook B—writing two simple, revolutionary words above the branches: “I think.”',
        quote: {
          en: 'These facts seemed to me to throw some light on the origin of species—that mystery of mysteries, as it has been called by one of our greatest philosophers.',
          orig: '',
          provenance: 'On the Origin of Species (1859), opening paragraph (citing Sir John Herschel)'
        }
      }
    ]
  };
})(window);
