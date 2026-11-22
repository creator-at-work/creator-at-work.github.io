/* ==========================================================================
   ALAN TURING (1912–1954) — Historical Life Atlas
   Sources: On Computable Numbers (1936), Computing Machinery and Intelligence
            (1950), The Chemical Basis of Morphogenesis (1952), Andrew Hodges
   ========================================================================== */

(function (global) {
  'use strict';

  global.ATLAS_FIGURES = global.ATLAS_FIGURES || {};

  global.ATLAS_FIGURES.turing = {
    id: 'turing',
    era: 'Modern World',
    title: 'Alan Turing',
    fullName: 'Alan Mathison Turing OBE FRS',
    years: '1912 — 1954',
    subtitle: 'Cambridge & Bletchley Park to Manchester',
    worldLabel: 'World of 1943',
    worldEraLabel: 'World War II & Dawn of Computing · 1912–1954',
    originName: 'London',
    originCoords: [-0.1278, 51.5074],

    viewBounds: {
      lon: [-5.6, 3.2],
      lat: [50.4, 54.8]
    },

    waterLabels: [
      { name: 'NORTH SEA', coords: [2.2, 53.3], regionalOnly: true },
      { name: 'IRISH SEA', coords: [-4.6, 53.5], regionalOnly: true },
      { name: 'ENGLISH CHANNEL', coords: [-2.0, 50.3], regionalOnly: true },
      { name: 'ATLANTIC OCEAN', coords: [-28, -4], worldOnly: true },
      { name: 'INDIAN OCEAN', coords: [78, -22], worldOnly: true },
      { name: 'PACIFIC OCEAN', coords: [-130, -8], worldOnly: true }
    ],

    inset: {
      title: 'Princeton, N.J.',
      coordsText: '40°21′ N, 74°40′ W',
      caption: 'PhD Years · Across the Atlantic',
      w: 186,
      h: 168,
      stageNumber: 3,
      islandPolygon: [
        [28, 42], [116, 42], [134, 58], [122, 82], [112, 106],
        [98, 126], [80, 140], [28, 140]
      ],
      markerOffset: [96, 94]
    },

    defaultEraKey: 'ww2_1943',
    territorySets: {
      ww2_1943: {
        empireLabel: 'United Kingdom & Allied Cryptanalysis',
        dependentLabel: 'United States (Princeton & Bell Labs)',
        allyLabel: 'Polish Cipher Bureau Predecessors',
        rivalLabel: 'Axis Powers (Enigma Network)',
        empire: ['United Kingdom'],
        dependent: ['United States of America'],
        ally: ['Poland'],
        rival: ['Germany', 'Italy']
      }
    },

    worldRealms: [
      { id: 'us', name: 'United States', desc: 'Where Turing earned his Princeton PhD under Alonzo Church (1938) and met Claude Shannon at Bell Labs in 1943.', cssVar: '--realm-us', countries: ['United States of America'], label: 'UNITED STATES', labelCoords: [-100.0, 39.0] },
      { id: 'europe', name: 'Occupied Europe (1943)', desc: 'Axis-controlled continent across which encrypted Enigma radio traffic directed U-boat wolfpacks and Panzer divisions.', cssVar: '--terr-rival', countries: ['Germany', 'France', 'Poland', 'Italy', 'Norway'], label: 'AXIS EUROPE', labelCoords: [11.0, 49.0] },
      { id: 'ussr', name: 'Soviet Union', desc: 'Allied Eastern Front receiving sanitized “Ultra” intelligence derived from Bletchley Park.', cssVar: '--realm-persia', countries: ['Russia'], label: 'SOVIET UNION', labelCoords: [88.0, 61.0] }
    ],

    historicalNames: {
      'United Kingdom': 'United Kingdom (Cambridge, Bletchley Park & Manchester)',
      'United States of America': 'United States (Princeton & Bell Labs)',
      Poland: 'Polish Cipher Bureau (Rejewski, Różycki & Zygalski)'
    },

    worldPlaces: [
      { name: 'Warsaw', year: '1932', detail: 'Polish mathematicians Marian Rejewski, Jerzy Różycki, and Henryk Zygalski first broke early German Enigma ciphers and shared their findings with Britain in 1939.', coords: [21.0122, 52.2297] },
      { name: 'Bell Labs, New York', year: '1943', detail: 'Turing sailed across the U-boat-infested Atlantic in 1942–43 to coordinate speech encryption and debate thinking machines with information-theory pioneer Claude Shannon.', coords: [-74.006, 40.7128] },
      { name: 'North Atlantic', year: '1941', detail: 'Where Hut 8’s decoding of Naval Enigma allowed Allied convoys to steer around U-boat wolfpacks, turning the Battle of the Atlantic.', coords: [-30.0, 50.0] }
    ],

    sources: [
      { label: 'The Turing Digital Archive · King’s College Cambridge', url: 'https://turingarchive.kings.cam.ac.uk/' },
      { label: 'Bletchley Park Trust', url: 'https://bletchleypark.org.uk/' }
    ],

    stages: [
      {
        number: 1,
        roman: 'I',
        id: 'london',
        year: '1912',
        age: 'Birth',
        date: '23 June 1912',
        location: 'Maida Vale, London',
        shortPlace: 'London',
        coords: [-0.1278, 51.5074],
        coordText: '51°30′N, 0°08′W',
        eraKey: 'ww2_1943',
        labelPos: [14, 6],
        routeCurve: 0,
        focusMultiplier: 1.55,
        title: 'A Restless Mind from Maida Vale to Sherborne',
        prose: 'Born in London to an Indian Civil Service officer and raised largely in foster homes while his parents lived in Madras, Alan Turing showed an intense, solitary passion for codes, chemistry, and mathematics from childhood. During Britain’s 1926 General Strike, thirteen-year-old Turing was so determined not to miss his first day at Sherborne School that he bicycled 97 kilometers unaccompanied from Southampton, making the local newspapers.',
        fact: 'At Sherborne, Turing’s deep first love was brilliant fellow student Christopher Morcom—whose sudden death from bovine tuberculosis at eighteen propelled Turing’s lifelong obsession with whether mind and consciousness could be embodied in physical machinery.',
        quote: {
          en: 'I feel sure that I shall meet Morcom again somewhere and that there will be some work for us to do together, as I believed there was for us to do here.',
          orig: '',
          provenance: 'Letter to Frances Morcom on the anniversary of Christopher’s death, 1932 (King’s College Archive)'
        }
      },
      {
        number: 2,
        roman: 'II',
        id: 'cambridge',
        year: '1936',
        age: 'Age 23',
        date: 'May 1936',
        location: 'King’s College, Cambridge',
        shortPlace: 'Cambridge',
        coords: [0.117, 52.207],
        coordText: '52°12′N, 0°07′E',
        eraKey: 'ww2_1943',
        labelPos: [14, -4],
        routeCurve: 0.16,
        focusMultiplier: 1.6,
        title: 'Inventing the Universal Computer on Paper',
        prose: 'While lying in Grantchester Meadows outside King’s College, Cambridge, twenty-three-year-old Turing attacked David Hilbert’s Entscheidungsproblem—asking whether any mechanical procedure could decide every mathematical truth. In his landmark 1936 paper On Computable Numbers, he proved the answer is no by inventing an imaginary tape-reading device—the Universal Turing Machine—a single machine capable of simulating any algorithm, laying the entire theoretical blueprint of the modern stored-program computer.',
        fact: 'In 1936, the English word “computer” did not mean a machine—it meant a human being sitting at a desk doing arithmetic; Turing’s paper explicitly imagined mechanizing the exact steps of a human “computer.”',
        quote: {
          en: 'It is possible to invent a single machine which can be used to compute any computable sequence.',
          orig: '',
          provenance: 'On Computable Numbers, with an Application to the Entscheidungsproblem (1936), §6'
        }
      },
      {
        number: 3,
        roman: 'III',
        id: 'princeton',
        year: '1938',
        age: 'Age 25',
        date: '1936 – July 1938',
        location: 'Princeton University, New Jersey',
        shortPlace: 'Princeton',
        coords: [-74.6672, 40.3573],
        coordText: '40°21′N, 74°40′W',
        eraKey: 'ww2_1943',
        labelPos: [14, 4],
        insetLabelPos: [15, -4],
        insetAlignEnd: false,
        seaLeg: true,
        isInset: true,
        routeCurve: -0.14,
        focusMultiplier: 1.5,
        title: 'PhD with Alonzo Church & Turning Down America',
        prose: 'Sailing to Princeton University to study under logician Alonzo Church—who had independently reached the same undecidability result via lambda calculus—Turing earned his doctorate in 1938 with a thesis introducing “oracle machines.” Though John von Neumann offered him a prestigious assistantship to remain safely in America, Turing chose to return to England as war clouds gathered over Europe.',
        fact: 'In Princeton’s physics workshop, Turing built his own working electromechanical binary multiplier from salvaged relays—already thinking seriously about cipher machines before Britain declared war.',
        quote: {
          en: 'Mathematical reasoning may be regarded rather schematically as the exercise of a combination of two facilities, which we may call intuition and ingenuity.',
          orig: '',
          provenance: 'Systems of Logic Based on Ordinals, Princeton PhD thesis (1938)'
        }
      },
      {
        number: 4,
        roman: 'IV',
        id: 'bletchley',
        year: '1941',
        age: 'Age 28',
        date: '4 September 1939 – 1945',
        location: 'Hut 8, Bletchley Park, Buckinghamshire',
        shortPlace: 'Bletchley Park',
        coords: [-0.7406, 51.9977],
        coordText: '51°59′N, 0°44′W',
        eraKey: 'ww2_1943',
        labelPos: [-15, 4],
        alignEnd: true,
        routeCurve: -0.15,
        focusMultiplier: 1.65,
        title: 'Breaking Naval Enigma in Hut 8',
        prose: 'Reporting to the Government Code and Cypher School at Bletchley Park the day after Britain declared war, Turing led Hut 8 against the formidable German Naval Enigma cipher—whose rotor settings changed daily across 159 quintillion possibilities. Building on foundational Polish breakthroughs, Turing and Gordon Welchman designed the electromechanical Bombe, slashing U-boat losses in the Battle of the Atlantic and helping shorten World War II by an estimated two years.',
        fact: 'Because his hay fever was severe, Turing bicycled to Bletchley Park wearing a full World War II gas mask—and chained his tea mug to a Hut 8 radiator so nobody would borrow it.',
        quote: {
          en: 'We have had to wait for a long time, and are still waiting, for the full resources we need—if we are to read the naval messages without delay.',
          orig: '',
          provenance: 'Joint letter from Turing, Welchman, Alexander & Milner-Barry directly to Winston Churchill, 21 October 1941 (Churchill scrawled “ACTION THIS DAY” across the top)'
        }
      },
      {
        number: 5,
        roman: 'V',
        id: 'manchester',
        year: '1950',
        age: 'Age 38',
        date: '1948 – 7 June 1954',
        location: 'University of Manchester & Wilmslow',
        shortPlace: 'Manchester',
        coords: [-2.2426, 53.4808],
        coordText: '53°29′N, 2°15′W',
        eraKey: 'ww2_1943',
        labelPos: [-15, -4],
        alignEnd: true,
        routeCurve: 0.16,
        focusMultiplier: 1.6,
        title: 'Can Machines Think? & Biological Patterns',
        prose: 'After designing the Pilot ACE computer in London, Turing moved to Manchester in 1948 to program the Ferranti Mark 1, publishing his iconic 1950 paper Computing Machinery and Intelligence (proposing the “Imitation Game,” now the Turing Test) and pioneering mathematical biology by explaining how chemical diffusion creates leopard spots and zebra stripes. Persecuted in 1952 under Britain’s unjust anti-homosexuality laws and forced to undergo chemical castration, he died of cyanide poisoning in June 1954 at forty-one—posthumously pardoned by the Crown in 2013.',
        fact: 'At Manchester, Turing was also a world-class marathon runner, clocking 2 hours 46 minutes—just eleven minutes off the 1948 Olympic gold-medal winning time.',
        quote: {
          en: 'We can only see a short distance ahead, but we can see plenty there that needs to be done.',
          orig: '',
          provenance: 'Computing Machinery and Intelligence, Mind (October 1950), closing sentence'
        }
      }
    ]
  };
})(window);
