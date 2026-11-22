/* ==========================================================================
   MAHATMA GANDHI (1869–1948) — Historical Life Atlas
   Sources: The Story of My Experiments with Truth (1927), Hind Swaraj (1909),
            Collected Works of Mahatma Gandhi (CWMG), Ramachandra Guha
   ========================================================================== */

(function (global) {
  'use strict';

  global.ATLAS_FIGURES = global.ATLAS_FIGURES || {};

  global.ATLAS_FIGURES.gandhi = {
    id: 'gandhi',
    era: 'Modern World',
    title: 'Mahatma Gandhi',
    fullName: 'Mohandas Karamchand Gandhi',
    years: '1869 — 1948',
    subtitle: 'Porbandar to London, South Africa & Delhi',
    worldLabel: 'World of 1930',
    worldEraLabel: 'Twilight of Colonial Empires · 1869–1948',
    originName: 'Porbandar',
    originCoords: [69.6293, 21.6417],

    viewBounds: {
      lon: [-10.0, 92.0],
      lat: [-35.5, 56.0]
    },

    waterLabels: [
      { name: 'INDIAN OCEAN', coords: [64.0, -14.0], regionalOnly: true },
      { name: 'ARABIAN SEA', coords: [62.0, 14.5], regionalOnly: true },
      { name: 'ATLANTIC OCEAN', coords: [-28, -4], worldOnly: true },
      { name: 'PACIFIC OCEAN', coords: [-130, -8], worldOnly: true }
    ],

    defaultEraKey: 'empire1930',
    territorySets: {
      empire1930: {
        empireLabel: 'British India, South Africa & United Kingdom',
        dependentLabel: 'British Imperial Sea Lanes',
        rivalLabel: 'Interwar Powers',
        empire: ['India', 'Pakistan', 'Bangladesh', 'South Africa', 'United Kingdom'],
        dependent: ['Egypt', 'Kenya', 'Tanzania', 'Myanmar', 'Sri Lanka'],
        ally: [],
        rival: []
      }
    },

    worldRealms: [
      { id: 'british', name: 'British Empire', desc: 'At its widest geographic extent after 1919—directly challenged by Gandhi’s mass nonviolent Satyagraha movements.', cssVar: '--terr-rival', countries: ['United Kingdom', 'India', 'Pakistan', 'Bangladesh', 'Canada', 'Australia', 'South Africa', 'Egypt'], label: 'BRITISH EMPIRE', labelCoords: [24.0, -16.0] },
      { id: 'us', name: 'United States', desc: 'Where Martin Luther King Jr. would later study and adapt Gandhi’s methods for the Civil Rights Movement.', cssVar: '--realm-us', countries: ['United States of America'], label: 'UNITED STATES', labelCoords: [-100.0, 39.0] },
      { id: 'ussr', name: 'Soviet Union', desc: 'Forged after the 1917 Revolution.', cssVar: '--realm-persia', countries: ['Russia'], label: 'SOVIET UNION', labelCoords: [88.0, 61.0] },
      { id: 'china', name: 'Republic of China', desc: 'Engulfed in civil war and resistance against imperial Japan.', cssVar: '--realm-qing', countries: ['China'], label: 'CHINA', labelCoords: [106.0, 35.0] }
    ],

    historicalNames: {
      India: 'British India (Independent 15 August 1947)',
      'South Africa': 'Colony of Natal & Transvaal (Union of South Africa)',
      'United Kingdom': 'United Kingdom (Inner Temple & Round Table Conference)'
    },

    worldPlaces: [
      { name: 'Yasnaya Polyana', year: '1909', detail: 'Estate of Leo Tolstoy, whose 1909–1910 correspondence deeply strengthened Gandhi’s commitment to nonviolent resistance.', coords: [37.526, 54.076] },
      { name: 'Montgomery, Alabama', year: '1955', detail: 'Seven years after Gandhi’s death, Martin Luther King Jr. adapted Gandhian nonviolence in the Montgomery Bus Boycott.', coords: [-86.3006, 32.3668] },
      { name: 'Noakhali (Bengal)', year: '1946', detail: 'Where seventy-seven-year-old Gandhi walked barefoot from village to village to halt communal violence on the eve of Partition.', coords: [91.0973, 22.8724] }
    ],

    sources: [
      { label: 'Collected Works of Mahatma Gandhi (Gandhi Heritage Portal)', url: 'https://www.gandhiheritageportal.org/' },
      { label: 'Britannica', url: 'https://www.britannica.com/biography/Mahatma-Gandhi' }
    ],

    stages: [
      {
        number: 1,
        roman: 'I',
        id: 'porbandar',
        year: '1869',
        age: 'Birth',
        date: '2 October 1869',
        location: 'Porbandar & Dandi, Gujarat',
        shortPlace: 'Gujarat',
        coords: [70.2, 21.5],
        coordText: '21°39′N, 69°38′E',
        eraKey: 'empire1930',
        labelPos: [-14, 4],
        alignEnd: true,
        routeCurve: 0,
        focusMultiplier: 2.2,
        title: 'Coastal Childhood & the Salt March',
        prose: 'Born in the white-limestone Arabian Sea port of Porbandar to Karamchand Gandhi and his deeply devout mother Putlibai, young Mohandas grew up immersed in Vaishnava Hindu and Jain traditions of ahimsa (non-injury to all living beings). Sixty years later, he would return to this same Gujarat shoreline at Dandi to lift a fistful of natural sea salt and shake the foundations of the British Empire.',
        fact: 'Before allowing eighteen-year-old Mohandas to sail to England to study law, his mother made him swear three solemn vows before a Jain monk: to abstain from wine, women, and meat.',
        quote: {
          en: 'Truth is by nature self-evident. As soon as you remove the cobwebs of ignorance that surround it, it shines clear.',
          orig: '',
          provenance: 'Young India, 1925 (Collected Works of Mahatma Gandhi)'
        },
        subTabsLabel: 'Gujarat milestones:',
        subStages: [
          {
            label: '1869 · Porbandar Birth',
            year: '1869',
            age: 'Birth',
            date: '2 October 1869',
            title: 'Coastal Childhood & Vows of Truth',
            prose: 'Born in the white-limestone Arabian Sea port of Porbandar to Karamchand Gandhi, diwan (chief minister) of the princely state, and his deeply devout mother Putlibai, young Mohandas grew up immersed in Vaishnava Hindu and Jain traditions of ahimsa (non-injury to all living beings) and fasting. Shy and self-critical as a boy, he was married at thirteen to Kasturba—a partnership that lasted sixty-two years.',
            fact: 'Before allowing eighteen-year-old Mohandas to sail to England to study law, his mother made him swear three solemn vows before a Jain monk: to abstain from wine, women, and meat.',
            quote: {
              en: 'Truth is by nature self-evident. As soon as you remove the cobwebs of ignorance that surround it, it shines clear.',
              orig: '',
              provenance: 'Young India, 1925 (Collected Works of Mahatma Gandhi)'
            }
          },
          {
            label: '1930 · Salt March to Dandi',
            year: '1930',
            age: 'Age 60',
            date: '12 March – 6 April 1930',
            title: 'The 385-Kilometer Salt March',
            prose: 'Choosing the British monopoly tax on salt—a daily necessity taxed on the poorest peasant—as the symbol of colonial injustice, sixty-year-old Gandhi marched 385 kilometers on foot from Sabarmati Ashram to the coastal village of Dandi with 78 satyagrahis over twenty-four days. At dawn on April 6, 1930, he bent down, lifted a fistful of natural sea salt from the mud, and broke imperial law—igniting nationwide civil disobedience that drew over 60,000 Indians into jail.',
            fact: 'As Gandhi walked twelve miles a day at sixty, crowds carpeted the dusty Gujarat roads with green leaves and flowers—making a handful of mud-caked salt front-page news from London to New York.',
            quote: {
              en: 'With this, I am shaking the foundations of the British Empire.',
              orig: '',
              provenance: 'At Dandi beach, 6 April 1930 (widely reported by Webb Miller & eyewitnesses)'
            }
          }
        ]
      },
      {
        number: 2,
        roman: 'II',
        id: 'london',
        year: '1888',
        age: 'Age 18',
        date: '1888 – 1891',
        location: 'Inner Temple, London',
        shortPlace: 'London',
        coords: [-0.1278, 51.5074],
        coordText: '51°30′N, 0°08′W',
        eraKey: 'empire1930',
        labelPos: [14, -4],
        seaLeg: true,
        routeCurve: -0.15,
        focusMultiplier: 2.0,
        title: 'Law Student & First Reading of the Gita',
        prose: 'Arriving in Victorian London in 1888 to train as a barrister at the Inner Temple, Gandhi briefly tried dressing like an English gentleman in top hat and violin lessons before abandoning the affectation for austere simplicity. Joining the London Vegetarian Society, he discovered Henry Salt, John Ruskin, and—paradoxically for the first time, in Sir Edwin Arnold’s English translation—the Bhagavad Gita, which became his lifelong spiritual compass.',
        fact: 'When Gandhi returned to London forty years later in 1931 for the Round Table Conference wearing his simple hand-spun khadi dhoti, a journalist asked what he thought of Western civilization; Gandhi smiled and answered: “I think it would be a good idea.”',
        quote: {
          en: 'I have nothing new to teach the world. Truth and Non-violence are as old as the hills.',
          orig: '',
          provenance: 'Harijan, 28 March 1936'
        },
        subTabsLabel: 'London chapters:',
        subStages: [
          {
            label: '1888 · Law Student',
            year: '1888',
            age: 'Age 18',
            date: '1888 – 1891',
            title: 'Law Student & First Reading of the Gita',
            prose: 'Arriving in Victorian London in 1888 to train as a barrister at the Inner Temple, Gandhi briefly tried dressing like an English gentleman in top hat and violin lessons before abandoning the affectation for austere simplicity. Joining the London Vegetarian Society, he discovered Henry Salt, John Ruskin, and—paradoxically for the first time, in Sir Edwin Arnold’s English translation—the Bhagavad Gita, which became his lifelong spiritual compass.',
            fact: 'Called to the bar in June 1891, Gandhi returned to India so paralyzed by stage fright in his very first Bombay courtroom case that he sat down speechless and refunded his client’s fee.',
            quote: {
              en: 'I have nothing new to teach the world. Truth and Non-violence are as old as the hills.',
              orig: '',
              provenance: 'Harijan, 28 March 1936'
            }
          },
          {
            label: '1931 · Round Table & Lancashire',
            year: '1931',
            age: 'Age 61',
            date: 'September – December 1931',
            title: 'Tea at Buckingham Palace & Mill Workers',
            prose: 'Returning to London in 1931 as sole delegate of the Indian National Congress to the Second Round Table Conference, Gandhi chose to stay at Kingsley Hall in impoverished East London rather than a luxury hotel. Visiting striking Lancashire textile workers whose jobs had been hit by India’s cloth boycott, he won their roaring cheers by explaining his country’s poverty with fearless warmth.',
            fact: 'Asked if he was underdressed for tea with King George V at Buckingham Palace in his shawl and sandals, Gandhi quipped: “The King had enough on for both of us.”',
            quote: {
              en: 'My life is my message.',
              orig: '',
              provenance: 'Note written in Bengali/English to journalists asking for a message, 1947 (CWMG)'
            }
          }
        ]
      },
      {
        number: 3,
        roman: 'III',
        id: 'southafrica',
        year: '1893',
        age: 'Age 23',
        date: '1893 – 1914',
        location: 'Pietermaritzburg & Johannesburg, South Africa',
        shortPlace: 'South Africa',
        coords: [29.4, -28.2],
        coordText: '29°36′S, 30°23′E',
        eraKey: 'empire1930',
        labelPos: [-14, 4],
        alignEnd: true,
        seaLeg: true,
        routeCurve: 0.16,
        focusMultiplier: 2.0,
        title: 'The Cold Night at Pietermaritzburg & Satyagraha',
        prose: 'Traveling to South Africa in 1893 on a one-year legal contract, Gandhi was ordered out of a first-class train compartment in Pietermaritzburg solely because of his skin color—and thrown onto the freezing station platform with his luggage. Shivering through the night, he resolved not to flee home but to stay and fight racial injustice, remaining twenty-one years and forging Satyagraha (“Truth-Force”), mass nonviolent civil resistance.',
        fact: 'Reading John Ruskin’s Unto This Last on a 24-hour overnight train from Johannesburg to Durban in 1904 changed Gandhi’s life instantaneously—the very next week he bought farmland to found Phoenix Settlement.',
        quote: {
          en: 'Should I fight for my rights or go back to India? It would be cowardice to run back to India without fulfilling my obligation.',
          orig: '',
          provenance: 'The Story of My Experiments with Truth (1927), Part II, Chapter 8'
        },
        subTabsLabel: 'South Africa chapters:',
        subStages: [
          {
            label: '1893 · Pietermaritzburg',
            year: '1893',
            age: 'Age 23',
            date: '7 June 1893',
            title: 'The Cold Night on the Platform',
            prose: 'Traveling to South Africa in 1893 on a one-year legal contract, Gandhi was ordered out of a first-class train compartment in Pietermaritzburg solely because of his skin color—and thrown onto the freezing station platform with his luggage. Shivering through the night, he resolved not to flee home but to stay and fight racial injustice—the decisive turning point of his entire life.',
            fact: 'Years later, when asked what was the single most creative experience of his life, Gandhi pointed not to a triumph in India, but to that freezing winter night in Pietermaritzburg.',
            quote: {
              en: 'Should I fight for my rights or go back to India? It would be cowardice to run back to India without fulfilling my obligation.',
              orig: '',
              provenance: 'The Story of My Experiments with Truth (1927), Part II, Chapter 8'
            }
          },
          {
            label: '1906 · Birth of Satyagraha',
            year: '1906',
            age: 'Age 36',
            date: '11 September 1906 – 1914',
            title: 'Burning the Registration Passes',
            prose: 'When the Transvaal government demanded every Indian resident carry humiliating fingerprinted registration certificates, Gandhi convened 3,000 Indians at Johannesburg’s Empire Theatre on September 11, 1906 to swear a solemn oath of peaceful defiance. Over eight years of marches, imprisonment, and Tolstoy Farm austerity, his 1913 miners’ march forced General Jan Smuts to repeal the hated poll tax.',
            fact: 'Before leaving South Africa in 1914, Gandhi stitched a pair of leather sandals in prison and gifted them to his adversary General Smuts—who wore them every summer for twenty-five years and returned them on Gandhi’s 70th birthday, writing: “I am not worthy to stand in the shoes of so great a man.”',
            quote: {
              en: 'The saint has left our shores—I sincerely hope forever.',
              orig: '',
              provenance: 'General Jan Smuts, letter to a friend upon Gandhi’s departure from South Africa (July 1914)'
            }
          }
        ]
      },
      {
        number: 4,
        roman: 'IV',
        id: 'champaran',
        year: '1917',
        age: 'Age 47',
        date: 'April 1917',
        location: 'Champaran, Bihar',
        shortPlace: 'Champaran',
        coords: [84.91, 26.65],
        coordText: '26°39′N, 84°55′E',
        eraKey: 'empire1930',
        labelPos: [14, -4],
        routeCurve: 0.16,
        focusMultiplier: 2.1,
        title: 'First Satyagraha in India',
        prose: 'Returning permanently to India in 1915, Gandhi spent a year riding third-class trains across the subcontinent at his mentor Gokhale’s urging before arriving in impoverished Champaran, Bihar, in April 1917 to aid peasants coerced into growing indigo for British planters. Ordered by the magistrate to leave immediately, Gandhi politely pleaded guilty in court to obeying “the higher law of our being, the voice of conscience”—forcing the colonial government to drop charges and abolish the exploitative system.',
        fact: 'In Champaran, Gandhi did not merely fight a legal battle—he recruited doctors and teachers (including Kasturba) to open village schools, dig clean wells, and teach sanitation across rural Bihar.',
        quote: {
          en: 'I have disregarded the order served upon me, not for want of respect for lawful authority, but in obedience to the higher law of our being, the voice of conscience.',
          orig: '',
          provenance: 'Written statement read before the Magistrate’s Court, Motihari, Champaran, 18 April 1917'
        }
      },
      {
        number: 5,
        roman: 'V',
        id: 'calcutta',
        year: '1947',
        age: 'Age 77',
        date: 'August – September 1947',
        location: 'Beliaghata, Calcutta (Bengal)',
        shortPlace: 'Calcutta',
        coords: [88.3639, 22.5726],
        coordText: '22°34′N, 88°22′E',
        eraKey: 'empire1930',
        labelPos: [14, 6],
        routeCurve: 0.14,
        focusMultiplier: 2.2,
        title: 'The One-Man Boundary Force',
        prose: 'When India finally achieved independence on August 15, 1947 amid the harrowing communal riots of Partition, Gandhi skipped the official celebrations in Delhi to move into a ruined house in riot-torn Beliaghata, Calcutta. Launching an indefinite fast for peace until armed Hindu and Muslim factions laid their weapons at his feet, the frail seventy-seven-year-old halted bloodshed across Bengal where fifty-five thousand soldiers in Punjab could not.',
        fact: 'Viceroy Lord Mountbatten telegraphed Gandhi in astonishment: “In the Punjab we have 55,000 soldiers and large-scale rioting on our hands. In Bengal our forces consist of one man, and there is no rioting.”',
        quote: {
          en: 'You must not lose faith in humanity. Humanity is an ocean; if a few drops of the ocean are dirty, the ocean does not become dirty.',
          orig: '',
          provenance: 'Collected Works of Mahatma Gandhi (reflections on nonviolence and peace)'
        }
      },
      {
        number: 6,
        roman: 'VI',
        id: 'delhi',
        year: '1948',
        age: 'Age 78',
        date: '15 August 1947 – 30 January 1948',
        location: 'Birla House, New Delhi',
        shortPlace: 'New Delhi',
        coords: [77.209, 28.6139],
        coordText: '28°37′N, 77°13′E',
        eraKey: 'empire1930',
        labelPos: [-14, -8],
        alignEnd: true,
        routeCurve: 0.16,
        focusMultiplier: 2.1,
        title: 'Independence, Partition & the Final Fast',
        prose: 'When India finally achieved independence on August 15, 1947 amid the harrowing bloodshed of Partition, Gandhi skipped the official celebrations in Delhi to fast and walk through riot-torn Calcutta—bringing calm where fifty-five thousand troops had struggled. Returning to Delhi in January 1948 to fast for Hindu–Muslim peace and fair treatment of Pakistan, he was shot three times at close range on his way to evening prayers at Birla House on January 30, 1948.',
        fact: 'Every earthly possession Gandhi owned at his death fit on a small table: a pair of round spectacles, two wooden sandals, a pocket watch, a metal eating bowl, a copy of the Gita, and his spinning wheel.',
        quote: {
          en: 'Generations to come, it may be, will scarce believe that such a one as this ever in flesh and blood walked upon this earth.',
          orig: '',
          provenance: 'Albert Einstein, tribute to Mahatma Gandhi (1944 / repeated 1948)'
        }
      }
    ]
  };
})(window);
