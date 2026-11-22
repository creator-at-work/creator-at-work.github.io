/* ==========================================================================
   THE HUMBLER — Compositional Conceptual Matching Engine (v3)
   Maps natural modern English, metaphors, colloquialisms, and single concepts
   to the oldest recorded ancient primary source via unordered multi-slot
   compositional concept matching + anchors + clean IDF lexical scoring.
   Accurately rejects gibberish and non-philosophical queries.
   ========================================================================== */

(function (global) {
  'use strict';

  const STOPWORDS = new Set([
    'a', 'an', 'the', 'and', 'or', 'but', 'if', 'then', 'than', 'that', 'this',
    'these', 'those', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'am',
    'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'shall', 'should',
    'can', 'could', 'may', 'might', 'must', 'of', 'in', 'on', 'at', 'to', 'for',
    'from', 'by', 'with', 'about', 'into', 'through', 'during', 'before', 'after',
    'above', 'below', 'between', 'out', 'off', 'over', 'under', 'again', 'further',
    'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both',
    'each', 'few', 'more', 'most', 'some', 'such', 'no', 'nor', 'not', 'only',
    'own', 'same', 'so', 'too', 'very', 'just', 'i', 'me', 'my', 'we', 'our',
    'you', 'your', 'he', 'him', 'his', 'she', 'her', 'it', 'its', 'they', 'them',
    'their', 'what', 'which', 'who', 'whom', 'whose', 'because', 'as', 'until',
    'while', 'actually', 'really', 'think', 'idea', 'realized', 'believe', 'feel',
    'feels', 'thing', 'things', 'something', 'anything', 'everything', 'human',
    'humans', 'life', 'world', 'way', 'make', 'makes', 'get', 'gets', 'one', 'much',
    'even', 'still', 'also', 'well', 'back', 'going', 'take', 'takes', 'give', 'gives',
    'dont', 'doesnt', 'cant', 'wont', 'isnt', 'arent', 'wasnt', 'werent', 'youre',
    'theyre', 'thats', 'whats', 'theres', 'heres', 'ive', 'weve', 'hi', 'hello', 'hey',
    /* Broad conversational words that cause cross-topic hijacking */
    'other', 'others', 'people', 'person', 'someone', 'everyone', 'anyone', 'nobody',
    'good', 'bad', 'hard', 'easy', 'long', 'real', 'true', 'never', 'always', 'every',
    'day', 'days', 'year', 'years', 'new', 'old', 'man', 'men', 'woman', 'start', 'stop'
  ]);

  /* Compositional Semantic Profiles for all 46 ancient roots:
     - threads: conceptual tags displayed on the folio
     - anchors: high-precision unambiguous words/phrases
     - slots: 2-3 unordered semantic facets; hitting 2+ distinct facets triggers
       a strong compositional synergy bonus regardless of word order or phrasing! */
  const PROFILES = {
    'expectation-suffering': {
      threads: ['relational expectation', 'attachment', 'suffering'],
      anchors: [
        'expectation', 'expectations', 'unmet expectations', 'entitlement', 'codependent',
        'relational suffering', 'clinging to loved ones', 'piyajatika', 'tanha',
        'expecting too much', 'read your mind'
      ],
      slots: [
        ['expect', 'expecting', 'expectation', 'expectations', 'demand', 'demanding', 'entitlement', 'cling', 'clinging', 'attach', 'attachment', 'perfection', 'read your mind', 'complete you', 'conform', 'gratitude from'],
        ['relationship', 'relationships', 'partner', 'spouse', 'marriage', 'lover', 'wife', 'husband', 'loved', 'love', 'beloved', 'fights in marriage', 'from the other', 'from people'],
        ['suffering', 'suffer', 'heartbreak', 'misery', 'sorrow', 'pain', 'hurts', 'hurting', 'conflict', 'fights', 'disappointed', 'disappointment', 'unhappy']
      ]
    },
    'love-and-self': {
      threads: ['self-reflection in love', 'relationships', 'ego'],
      anchors: [
        'all love is selfish', 'love is selfish', 'love is a mirror', 'atmanastu',
        'yajnavalkya', 'maitreyi'
      ],
      slots: [
        ['love', 'loving', 'parents', 'kids', 'children', 'partner', 'spouse', 'affection', 'selfless', 'altruism'],
        ['selfish', 'secretly', 'own ego', 'fulfills their own', 'for ourselves', 'own self', 'how they make us feel', 'how we feel', 'mirror', 'projection', 'sake of the self']
      ]
    },
    'nothing-new': {
      threads: ['originality', 'repetition', 'history'],
      anchors: [
        'originality', 'unoriginal', 'nothing new under the sun', 'no original ideas',
        'already been said', 'already been thought', 'ecclesiastes', 'qohelet',
        'khakheperreseneb', 'recycling thoughts', 'recycled thoughts'
      ],
      slots: [
        ['original', 'originality', 'unoriginal', 'nothing new', 'recycling', 'recycled', 'rehash', 'repeating', 'repetition', 'rediscover', 'already been said', 'already been thought'],
        ['ideas', 'thoughts', 'thread', 'philosophy', 'insights', 'dead people', 'ancients', 'ancient', 'sun', 'before', 'history']
      ]
    },
    'humility-wisdom': {
      threads: ['epistemic humility', 'ignorance', 'wisdom'],
      anchors: [
        'imposter syndrome', 'dunning kruger', 'know nothing', 'epistemic humility',
        'humility', 'ptahhotep', 'socratic ignorance', 'clueless'
      ],
      slots: [
        ['learn', 'learning', 'knowledge', 'wisdom', 'wise', 'smart', 'intelligent', 'expert', 'field', 'study', 'mastery'],
        ['clueless', 'ignorant', 'ignorance', 'know nothing', 'how little', 'humble', 'humility', 'doubt', 'certain', 'certainty', 'fools', 'arrogant', 'arrogance', 'imposter']
      ]
    },
    'two-arrows': {
      threads: ['pain vs. suffering', 'mental narrative', 'resilience'],
      anchors: [
        'second arrow', 'two arrows', 'pain is inevitable', 'suffering is optional',
        'victim story', 'sallatha', 'cognitive distortion'
      ],
      slots: [
        ['pain', 'hurts once', 'fired', 'bad things', 'hardship', 'events', 'wound', 'setback', 'humiliation', 'inevitable', 'happens'],
        ['optional', 'replaying', 'replay', 'story', 'narrative', 'victim', 'resist', 'resisting', 'resistance', 'thousand times', 'six months', 'breaks us', 'add on top', 'commentary', 'judgment', 'reaction', 'views']
      ]
    },
    'impermanence-flux': {
      threads: ['impermanence', 'constant flux', 'change'],
      anchors: [
        'impermanence', 'impermanent', 'same river', 'panta rhei', 'anicca',
        'constant flux', 'this too shall pass', 'nothing lasts forever', 'heraclitus',
        'nothing stays'
      ],
      slots: [
        ['river', 'hometown', 'old self', 'empire', 'empires', 'moment', 'season', 'weather', 'nothing lasts', 'nothing stays', 'stays frozen', 'friendship', 'permanent'],
        ['dissolves', 'dissolve', 'flowing away', 'flows', 'flux', 'changes', 'changing', 'changed', 'temporary', 'fleeting', 'fades', 'passes', 'decay', 'ephemeral', 'never go back', 'never return', 'same river', 'twice', 'frozen']
      ]
    },
    'wu-wei': {
      threads: ['effortless action', 'over-trying', 'flow'],
      anchors: [
        'wu wei', 'wuwei', 'effortless action', 'backwards law', 'paradox of effort',
        'trying too hard', 'try too hard', 'force a result', 'stop forcing'
      ],
      slots: [
        ['try too hard', 'trying too hard', 'desperately', 'force', 'forcing', 'push too hard', 'grasp too tightly', 'overthinking your', 'chasing', 'strain', 'micromanage'],
        ['ruin', 'ruins', 'spoil', 'kills it', 'runs away', 'slips away', 'backfires', 'sleep', 'golf swing', 'funny', 'creativity', 'effortless', 'flow state', 'result']
      ]
    },
    'soft-overcomes-hard': {
      threads: ['gentleness', 'flexibility', 'quiet strength'],
      anchors: [
        'soft overcomes hard', 'water wears down stone', 'bend so you do not break',
        'quiet adaptability', 'suppleness', 'yielding overcomes'
      ],
      slots: [
        ['soft', 'gentle', 'gentleness', 'flexible', 'flexibility', 'adaptability', 'adaptable', 'supple', 'bend', 'yielding', 'yield', 'water', 'bamboo'],
        ['hard', 'rigid', 'stiff', 'stubborn', 'aggressive', 'yelling', 'shouting', 'brute', 'force', 'breaks', 'stone', 'outlast', 'wins arguments', 'wins in the long', 'defeats', 'stronger']
      ]
    },
    'control-response': {
      threads: ['dichotomy of control', 'agency', 'detachment from outcomes'],
      anchors: [
        'dichotomy of control', 'nishkama karma', 'trust the process', 'locus of control',
        'control your response', 'let go of the outcome', 'attached to results'
      ],
      slots: [
        ['control', 'obsessing', 'worry about', 'let go', 'release your grip', 'detach', 'jurisdiction', 'authority', 'power'],
        ['outcome', 'outcomes', 'result', 'results', 'final score', 'score', 'win or lose', 'winning', 'fruits', 'what happens', 'external'],
        ['response', 'react', 'reaction', 'effort', 'craft', 'process', 'action', 'actions', 'pour everything']
      ]
    },
    'imagined-anxiety': {
      threads: ['imagined catastrophe', 'anxiety', 'overthinking'],
      anchors: [
        'anxiety', 'anxious', 'catastrophizing', 'suffer more in imagination',
        'worst case scenario', 'worrying', 'overthinking'
      ],
      slots: [
        ['worry', 'worrying', 'anxiety', 'anxious', 'fear', 'dread', 'panic', 'scary', '3am', 'stay awake', 'stress', 'overthinking'],
        ['imagination', 'imagined', 'imaginary', 'invents', 'movies', 'rehearse', 'never happen', 'never arrive', 'never come true', 'next month', 'future', 'futures', 'disaster', 'disasters', 'catastrophe', 'worst case', '99 percent']
      ]
    },
    'desire-sufficiency': {
      threads: ['craving', 'hedonic treadmill', 'sufficiency'],
      anchors: [
        'hedonic treadmill', 'goalpost', 'goalposts', 'consumerism', 'materialism',
        'wanting less', 'enough is enough', 'money', 'greed', 'insatiable'
      ],
      slots: [
        ['money', 'wealth', 'salary', 'promoted', 'rich', 'luxury', 'watches', 'possessions', 'buying', 'pricier', 'more', 'greed', 'desire', 'chasing more'],
        ['never enough', 'never fills', 'never satisfies', 'wanting less', 'needing less', 'enough', 'goalpost', 'next salary', 'pricier one', 'for a week', 'treadmill', 'hole', 'sufficiency', 'contentment', 'buy happiness']
      ]
    },
    'self-mastery': {
      threads: ['self-mastery', 'inner discipline', 'true strength'],
      anchors: [
        'self mastery', 'self-mastery', 'self discipline', 'self-discipline',
        'self control', 'self-control', 'conquer yourself', 'master yourself'
      ],
      slots: [
        ['conquer', 'control', 'master', 'govern', 'command', 'walking away', 'tame', 'discipline', 'true strength', 'real strength', 'true power', 'victory'],
        ['own mind', 'own impulses', 'impulses', 'own craving', 'own temper', 'yourself', 'self'],
        ['others', 'bossing', 'employees', 'argument', 'stranger', 'conquering others', 'empire', 'battle', 'harder than', 'greater than', 'ten times']
      ]
    },
    'mind-precedes-all': {
      threads: ['mind & perception', 'mental lens', 'reality'],
      anchors: [
        'mind creates reality', 'mindset', 'thoughts create reality', 'color of your thoughts',
        'manopubbangama', 'manifesting', 'mental lens'
      ],
      slots: [
        ['mind', 'mindset', 'thoughts', 'thought', 'mental', 'lens', 'dyed'],
        ['creates reality', 'shapes reality', 'decides everything', 'colors', 'precedes', 'layoff', 'same event', 'same situation', 'sees ruin', 'sees freedom', 'bondage', 'liberation', 'as we are']
      ]
    },
    'ego-nonduality': {
      threads: ['illusion of ego', 'non-duality', 'consciousness'],
      anchors: [
        'ego', 'nonduality', 'non-duality', 'nondual', 'tat tvam asi', 'atman', 'brahman',
        'anatta', 'oneness', 'separate self', 'universe experiencing itself', 'advaita'
      ],
      slots: [
        ['ego', 'separate', 'little me', 'observer', 'witness', 'consciousness', 'awareness', 'self'],
        ['illusion', 'trick', 'construct', 'observed', 'universe', 'cosmos', 'oneness', 'same consciousness', 'not two', 'inside your head']
      ]
    },
    'perspectivism': {
      threads: ['partial perspective', 'blind spots', 'many-sided truth'],
      anchors: [
        'perspectivism', 'anekantavada', 'blind men and the elephant', 'echo chamber',
        'partial truth', 'fragment of truth', 'point of view'
      ],
      slots: [
        ['perspective', 'perspectives', 'angle', 'angles', 'fragment', 'slice', 'partial', 'viewpoint', 'witnesses', 'left and right', 'opposite stories', 'both see', 'sides'],
        ['truth', 'whole', 'total', 'entire', 'full street', 'accident', 'neither saw', 'elephant', 'fight', 'scream', 'argue', 'facts']
      ]
    },
    'illusion-perception': {
      threads: ['appearances vs. reality', 'cultural conditioning', 'awakening'],
      anchors: [
        'allegory of the cave', 'simulation', 'matrix', 'butterfly dream', 'maya',
        'shadows on the wall', 'cultural conditioning', 'social scripts'
      ],
      slots: [
        ['shadow', 'shadows', 'cave', 'matrix', 'simulation', 'dream', 'illusion', 'social scripts', 'appearances', 'conditioning', 'conditioned'],
        ['reality', 'real world', 'truth', 'plugged into', 'trapped', 'mistake', 'mistaking', 'waking up', 'asleep', 'deceive']
      ]
    },
    'fear-of-death': {
      threads: ['symmetry argument', 'fear of death', 'non-existence'],
      anchors: [
        'fear of death', 'death is nothing to us', 'death', 'nonexistence', 'non-existence',
        'oblivion', 'symmetry argument', 'epicurus'
      ],
      slots: [
        ['death', 'dying', 'dead', 'not existing', 'nonexistence', 'oblivion', 'before birth', 'before we were born', '1850', '2150'],
        ['fear', 'afraid', 'terrified', 'irrational', 'bothered', 'makes no sense', 'nothing to us', 'experience being dead', 'conscious']
      ]
    },
    'mortality-living': {
      threads: ['mortality', 'finite life', 'savoring the ordinary'],
      anchors: [
        'memento mori', 'carpe diem', 'seize the day', 'life is short', 'gilgamesh',
        'siduri', 'mortality', 'turn to dust', 'four thousand weeks', 'chasing immortality'
      ],
      slots: [
        ['mortality', 'mortal', 'turn to dust', 'going to die', 'life is short', 'finite', 'brief', 'four thousand weeks', 'legacy', 'immortality'],
        ['enjoy', 'savor', 'cherish', 'sacred', 'ordinary', 'dinners', 'coffee', 'laugh', 'bread', 'tonight', 'today', 'live fully', 'precious', 'waste']
      ]
    },
    'habit-character': {
      threads: ['habit', 'repeated action', 'character formation'],
      anchors: [
        'habits', 'habit', 'resolutions', 'what we repeatedly do', 'excellence is a habit',
        'actions speak louder', 'daily routine'
      ],
      slots: [
        ['habit', 'habits', 'repeatedly', 'practice', 'routine', 'every morning', 'every boring', 'daily', 'actions', 'resolutions', 'intentions', 'intend'],
        ['become', 'becomes', 'builds who you are', 'sum of what you do', 'worthless', 'character', 'identity', 'five years', 'tuesday']
      ]
    },
    'character-destiny': {
      threads: ['character is destiny', 'temperament', 'karma'],
      anchors: [
        'character is destiny', 'karma', 'daimon', 'own worst enemy', 'heirs of our deeds'
      ],
      slots: [
        ['character', 'temperament', 'personality', 'inner nature', 'disposition'],
        ['destiny', 'fate', 'luck', 'stars', 'fortune', 'blaming bad luck', 'writes their destiny', 'same crises']
      ]
    },
    'anger-revenge': {
      threads: ['anger & resentment', 'revenge', 'forgiveness'],
      anchors: [
        'revenge', 'vengeance', 'grudge', 'resentment', 'anger', 'forgiveness', 'forgive',
        'drinking poison', 'hatred never ends hatred', 'eye for an eye'
      ],
      slots: [
        ['revenge', 'retaliation', 'grudge', 'resentment', 'anger', 'angry', 'rage', 'hatred', 'wrath', 'enemy', 'enemies'],
        ['rots', 'burns', 'poison', 'poisons', 'destroys', 'hurts you', 'from the inside', 'five seconds', 'never ends', 'forgive', 'forgiveness', 'cycle', 'own peace', 'letting go']
      ]
    },
    'reciprocity-empathy': {
      threads: ['golden rule', 'reciprocity', 'moral mirror'],
      anchors: [
        'golden rule', 'silver rule', 'reciprocity', 'do unto others', 'eloquent peasant', 'hillel'
      ],
      slots: [
        ['morality', 'ethics', 'moral', 'rule', 'treat'],
        ['would i hate', 'did this to me', 'done to me', 'want to be treated', 'wish for yourself', 'do to others', 'inflict on', 'impose on', 'in their shoes']
      ]
    },
    'limits-of-language': {
      threads: ['limits of language', 'the ineffable', 'map vs. territory'],
      anchors: [
        'limits of language', 'map is not the territory', 'ineffable', 'beyond words',
        'finger pointing at the moon', 'tao that can be spoken', 'dictionary definitions'
      ],
      slots: [
        ['language', 'words', 'english', 'dictionary', 'definitions', 'define', 'describe', 'explain', 'speak', 'naming'],
        ['capture', 'distort', 'collapse', 'leaves the soul out', 'fail', 'beyond', 'narrow', 'mystical', 'music', 'ultimate truth', 'territory', 'grief']
      ]
    },
    'silence-speech': {
      threads: ['silence', 'restraint in speech', 'listening'],
      anchors: [
        'silence', 'power of silence', 'loudest person', 'empty vessels',
        'talk less listen more', 'amenemope'
      ],
      slots: [
        ['silence', 'silent', 'quiet', 'staying quiet', 'restraint', 'listening', 'listen', 'rarely has anything', 'nothing real to say', 'nothing to say'],
        ['loud', 'loudest', 'ramble', 'talks non stop', 'endless talk', 'chatter', 'meetings', 'mouth', 'notice everything', 'least', 'strength', 'know']
      ]
    },
    'self-knowledge': {
      threads: ['self-examination', 'know thyself', 'living on autopilot'],
      anchors: [
        'know thyself', 'gnothi seauton', 'unexamined life', 'introspection',
        'self-awareness', 'self awareness', 'living on autopilot', 'autopilot'
      ],
      slots: [
        ['autopilot', 'sleepwalking', 'distracting themselves', 'look outward', '80 years', 'unexamined'],
        ['who they actually are', 'look closely', 'examine', 'inward', 'yourself', 'thyself', 'own mind', 'inner journey', 'self']
      ]
    },
    'solitude-restlessness': {
      threads: ['escapism', 'inner restlessness', 'solitude'],
      anchors: [
        'escapism', 'solitude', 'wherever you go there you are', 'sitting alone in a room',
        'change your mind not your sky', 'lucretius'
      ],
      slots: [
        ['moving to', 'another country', 'new city', 'new place', 'travel', 'flee', 'outrun', 'glued to their phones', 'phones', 'distractions', 'alone'],
        ['pack your same brain', 'bring yourself', 'with you', 'same mind', 'cure your', 'fix restlessness', 'alone with their thoughts', 'own mind', 'five quiet minutes', 'unbearable', 'room', 'restless', 'restlessness']
      ]
    },
    'interdependence': {
      threads: ['interdependence', 'dependent origination', 'shared web'],
      anchors: [
        'interdependence', 'interdependent', 'self-made', 'self made', 'no man is an island',
        'dependent origination', 'butterfly effect', 'paticcasamuppada', 'nagarjuna'
      ],
      slots: [
        ['self made', 'isolation', 'isolated', 'independently', 'on its own', 'cup of', 'morning coffee', 'billionaire', 'single'],
        ['interconnected', 'connected', 'woven', 'web', 'required', 'rain', 'farmers', 'ships', 'strangers', 'continents', 'roads', 'teachers', 'invisible helpers', 'millions', 'depend', 'causes']
      ]
    },
    'adversity-growth': {
      threads: ['adversity', 'growth through hardship', 'resilience'],
      anchors: [
        'obstacle is the way', 'adversity', 'hardship', 'pathei mathos', 'grit',
        'what does not kill you', 'comfort makes us weak', 'resilience', 'smooth seas'
      ],
      slots: [
        ['easy', 'comfortable', 'comfort', 'smooth seas', 'zero rejection', 'rejection', 'hardship', 'adversity', 'obstacles', 'obstacle', 'struggle', 'failure', 'surviving', 'friction', 'hard seasons'],
        ['fragile', 'weak', 'never teach', 'teach you', 'character', 'stronger', 'growth', 'forged', 'built by', 'becomes the way', 'wisdom', 'resilience']
      ]
    },
    'present-time': {
      threads: ['the present moment', 'mindfulness', 'time'],
      anchors: [
        'present moment', 'power of now', 'be here now', 'mindfulness',
        'time is an illusion', 'bhaddekaratta', 'augustine'
      ],
      slots: [
        ['past', 'yesterday', 'regret', 'depression', 'future', 'tomorrow', 'anxiety', 'unborn'],
        ['present', 'right now', 'today', 'this moment', 'the now', 'exists right now', 'live in the present', 'presence', 'only today']
      ]
    },
    'humble-leadership': {
      threads: ['invisible leadership', 'servant leadership', 'leading without ego'],
      anchors: [
        'servant leadership', 'invisible leadership', 'leadership', 'best leader',
        'best ceos', 'pole star', 'we did it ourselves'
      ],
      slots: [
        ['leader', 'leaders', 'leadership', 'ceo', 'ceos', 'boss', 'bosses', 'manager', 'ruler'],
        ['invisible', 'barely noticed', 'spotlight', 'credit', 'ego', 'team', 'built it themselves', 'accomplished it themselves', 'did it ourselves', 'empower', 'quietly']
      ]
    },
    'golden-mean': {
      threads: ['moderation', 'the middle way', 'avoiding extremes'],
      anchors: [
        'golden mean', 'middle way', 'middle path', 'moderation', 'nothing in excess',
        'meden agan', 'burnout'
      ],
      slots: [
        ['extreme', 'extremes', 'too far', 'too much', 'too little', 'excess', 'overdo', 'moderation', 'middle', 'balance'],
        ['destructive', 'self destruction', 'burns you out', 'stagnant', 'toxic', 'ruin', 'virtue', 'strength', 'discipline', 'health', 'wisdom', 'both sides']
      ]
    },
    'envy-comparison': {
      threads: ['social comparison', 'envy', 'status anxiety'],
      anchors: [
        'comparison', 'comparison is the thief of joy', 'envy', 'envious', 'jealous',
        'jealousy', 'fomo', 'status anxiety', 'grass is always greener', 'instagram', 'social media'
      ],
      slots: [
        ['compare', 'comparing', 'comparison', 'neighbor', 'strangers', 'instagram', 'social media', 'scrolling', 'bigger', 'yacht', 'status', 'envy', 'jealous'],
        ['proud', 'house', 'joy', 'miserable', 'feel poor', 'poverty', 'ruin', 'thief', 'abundance', 'already have', 'until your']
      ]
    },
    'cosmic-doubt': {
      threads: ['radical uncertainty', 'cosmic origins', 'honest agnosticism'],
      anchors: [
        'agnostic', 'agnosticism', 'nasadiya', 'why is there something rather than nothing',
        'honest doubt', 'cosmic origins', 'skepticism', 'god'
      ],
      slots: [
        ['universe', 'creation', 'began', 'something instead of nothing', 'why there is', 'ultimate reality', 'cosmos', 'god', 'priests', 'scientists'],
        ['nobody', 'know', 'doubt', 'agnostic', 'uncertain', 'uncertainty', 'dogma', 'mystery', 'sacred']
      ]
    },
    'pleasure-pain-twins': {
      threads: ['duality', 'contrast', 'pleasure & pain'],
      anchors: [
        'pleasure and pain', 'yin and yang', 'opposites define each other', 'duality',
        'dopamine', 'contrast gives meaning'
      ],
      slots: [
        ['without', 'need', 'twins', 'two sides', 'inseparable', 'opposites', 'contrast'],
        ['boredom', 'hunger', 'pain', 'darkness', 'hardship', 'sorrow', 'heartbreak', 'weariness'],
        ['pleasure', 'comfort', 'joy', 'happiness', 'light', 'sweet', 'numb', 'meaningless']
      ]
    },
    'inner-freedom': {
      threads: ['inner freedom', 'renunciation', 'minimalism'],
      anchors: [
        'golden handcuffs', 'minimalism', 'minimalist', 'renunciation', 'nothing to lose',
        'diogenes', 'isha upanishad', 'freedom'
      ],
      slots: [
        ['salary', 'golden handcuffs', 'lifestyle is tiny', 'tiny lifestyle', 'needing almost nothing', 'need little', 'possessions', 'belongings', 'things you own', 'fired without panicking'],
        ['nobody owns you', 'owns you', 'slavery', 'freedom', 'free', 'control you', 'bribe', 'hostage', 'chains']
      ]
    },
    'compassion-ahimsa': {
      threads: ['innate compassion', 'non-harm', 'sentient empathy'],
      anchors: [
        'ahimsa', 'nonviolence', 'non-violence', 'compassion', 'animal rights', 'do no harm',
        'child at the well', 'mahavira'
      ],
      slots: [
        ['animal', 'animals', 'creatures', 'sentient', 'living', 'stranger', 'child'],
        ['pain', 'hurting', 'harm', 'wrong', 'violence', 'slain', 'cruelty'],
        ['compassion', 'empathy', 'wired', 'innate', 'natural', 'rulebook', 'highest law', 'deepest law', 'non harm']
      ]
    },
    'moral-choice': {
      threads: ['free moral choice', 'individual conscience', 'responsibility'],
      anchors: [
        'free will', 'moral choice', 'individual conscience', 'zarathustra', 'zoroaster',
        'good thoughts good words'
      ],
      slots: [
        ['tribe', 'tribal', 'upbringing', 'birth', 'bloodline', 'parents', 'inherited', 'inherit'],
        ['choose', 'chooses', 'choice', 'right or wrong', 'good and evil', 'conscience', 'adult', 'own mind', 'individual', 'responsibility']
      ]
    },
    'grief-lent-not-owned': {
      threads: ['borrowed life', 'grief & parting', 'non-ownership'],
      anchors: [
        'only lent', 'lent to us', 'borrowed time', 'grief', 'bereavement', 'mourning',
        'given back not lost', 'grief is the price of love'
      ],
      slots: [
        ['grief', 'grieving', 'heartbreak', 'loss', 'parting', 'separation', 'love', 'loved ones', 'temporarily'],
        ['lent', 'loan', 'borrowed', 'never owned', 'not owned', 'owns anything', 'given back', 'not lost', 'price of love']
      ]
    },
    'question-authority': {
      threads: ['critical inquiry', 'questioning authority', 'direct verification'],
      anchors: [
        'question authority', 'critical thinking', 'blind faith', 'kalama sutta',
        'think for yourself', 'verify through experience'
      ],
      slots: [
        ['authority', 'authorities', 'guru', 'famous', 'parents', 'crowd', 'tradition', 'hearsay', 'ancient text', 'scripture'],
        ['believe', 'blindly', 'doesnt make it true', 'test it yourself', 'verify', 'own experience', 'question', 'never accept']
      ]
    },
    'good-company': {
      threads: ['company & peers', 'contagious character', 'environment'],
      anchors: [
        'company you keep', 'average of the five', 'bad company', 'good company',
        'shuruppak', 'kalyanamitta', 'hang out with'
      ],
      slots: [
        ['hang out', 'surround', 'spend your', 'spend time', 'around', 'circle', 'peers', 'company', 'friends', 'complainers', 'losers', 'cynical'],
        ['turn into', 'become like', 'sound just like', 'just like them', 'average', 'shape', 'corrupt', 'absorb']
      ]
    },
    'hypocrisy-judging': {
      threads: ['hypocrisy', 'bias blind spot', 'judging others'],
      anchors: [
        'hypocrisy', 'hypocrite', 'fundamental attribution error', 'bias blind spot',
        'speck and plank', 'two wallets', 'pot calling the kettle'
      ],
      slots: [
        ['excuses', 'excuse', 'hiding', 'hide', 'blind to', 'ignoring', 'ignore', 'skeletons', 'own mistakes', 'own flaws', 'own faults'],
        ['gossiping', 'judging', 'judge', 'calling others', 'messing up', 'spotting', 'criticizing', 'tiny flaws', 'evil', 'same thing', 'hypocrisy']
      ]
    },
    'work-without-ego': {
      threads: ['craft over applause', 'external validation', 'silent generosity'],
      anchors: [
        'clout', 'external validation', 'performative', 'seeking applause', 'likes and applause',
        'vine bears grapes', 'for its own sake'
      ],
      slots: [
        ['charity', 'good deed', 'good work', 'generosity', 'kindness', 'craft', 'excellence', 'work', 'posting'],
        ['camera', 'filming', 'clout', 'likes', 'applause', 'recognition', 'validation', 'praise', 'audience', 'spotlight', 'fame', 'online']
      ]
    },
    'patience-timing': {
      threads: ['patience', 'organic timing', 'unhurried growth'],
      anchors: [
        'patience', 'impatience', 'pulling up sprouts', 'mud settle', 'everything has its season',
        'cannot rush growth', 'ripen'
      ],
      slots: [
        ['impatience', 'rush', 'rushing', 'speed up', 'hack', 'hurry', 'pull on a plant', 'pulling up', 'wait', 'patience'],
        ['stunts', 'kills', 'destroys', 'ruins', 'growth', 'maturity', 'takes seasons', 'own season', 'ripen', 'faster', 'settle']
      ]
    },
    'value-in-loss': {
      threads: ['value in absence', 'taking blessings for granted', 'gratitude'],
      anchors: [
        'take for granted', 'taken for granted', 'taking for granted', 'until it is gone',
        'till its gone', 'familiarity breeds blindness', 'plautus'
      ],
      slots: [
        ['appreciate', 'value', 'worth', 'grateful', 'poems about', 'healthy', 'breathing', 'knees', 'blessings', 'precious', 'granted'],
        ['until', 'till', 'give out', 'gives out', 'catch a cold', 'once it is gone', 'after we lose', 'lost', 'gone', 'absence', 'miss it']
      ]
    },
    'inner-peace-chaos': {
      threads: ['peace amid chaos', 'the inner citadel', 'equanimity'],
      anchors: [
        'inner citadel', 'equanimity', 'eye of the storm', 'yoga retreat',
        'calm in chaos', 'peace in chaos', 'unshaken mind'
      ],
      slots: [
        ['retreat', 'bali', 'mountain', 'monastery', 'cave', 'escaping', 'fleeing', 'ocean'],
        ['peace', 'calm', 'zen', 'steady', 'unshaken', 'serenity', 'still', 'centered'],
        ['chaos', 'traffic', 'office drama', 'drama', 'storm', 'noise', 'everyday']
      ]
    },
    'purpose-service': {
      threads: ['purpose through service', 'common good', 'beyond self-obsession'],
      anchors: [
        'common good', 'universal love', 'larger than yourself', 'self optimization',
        'self-optimization', 'meaning comes from serving'
      ],
      slots: [
        ['optimizing yourself', 'self care', 'obsessing over your own', 'self obsession', 'own happiness', 'loneliness', 'miserable', 'empty', 'hollow'],
        ['help other', 'serve', 'serving', 'useful for', 'neighbors', 'community', 'contribute', 'common good', 'cooperation', 'larger than yourself']
      ]
    },
    'power-corrupts': {
      threads: ['power & corruption', 'accountability', 'tyranny'],
      anchors: [
        'power corrupts', 'absolute power', 'ring of gyges', 'unchecked power', 'tyranny', 'tyrants'
      ],
      slots: [
        ['power', 'leaders', 'authority', 'ruler', 'rulers', 'unchecked', 'absolute', 'invisibility', 'accountability'],
        ['corrupts', 'corrupt', 'corruption', 'tyrant', 'tyrants', 'tyranny', 'abuse', 'righteous', 'accountable', 'dictator']
      ]
    },
    'knowledge-sorrow': {
      threads: ['curse of awareness', 'knowledge & sorrow', 'ignorance is bliss'],
      anchors: [
        'ignorance is bliss', 'increases knowledge increases sorrow', 'too smart to be happy',
        'curse of awareness', 'more you know the sadder'
      ],
      slots: [
        ['more you know', 'too smart', 'too intelligent', 'overly aware', 'understand life', 'increases knowledge', 'much wisdom', 'ignorance'],
        ['sadder', 'sad', 'sorrow', 'bliss', 'harder to be happy', 'unhappy', 'vexation', 'grief', 'curse', 'melancholy']
      ]
    },
    'pride-hubris': {
      threads: ['pride & hubris', 'downfall', 'nemesis'],
      anchors: [
        'pride comes before a fall', 'pride goes before', 'hubris', 'nemesis', 'fall from grace'
      ],
      slots: [
        ['pride', 'hubris', 'arrogance', 'arrogant', 'haughty', 'tiptoe', 'tallest', 'boasting'],
        ['fall', 'downfall', 'destruction', 'stumble', 'collapse', 'shattering', 'lightning', 'ruin', 'blinds']
      ]
    },
    'forgotten-fame': {
      threads: ['ephemeral fame', 'oblivion', 'remembrance'],
      anchors: [
        'completely forgotten', 'all fame fades', 'no remembrance', 'forgotten eventually', 'oblivion'
      ],
      slots: [
        ['forgotten', 'forget', 'oblivion', 'erased', 'no one will remember', 'short lived'],
        ['fame', 'famous', 'generations', 'few generations', 'legacy', 'remembered', 'reputation', 'monument', 'names']
      ]
    },
    'own-mind-enemy': {
      threads: ['self-sabotage', 'inner adversary', 'training the mind'],
      anchors: [
        'own worst enemy', 'biggest enemy is your own mind', 'self sabotage', 'self-sabotage',
        'mind is your worst enemy'
      ],
      slots: [
        ['own mind', 'mind', 'yourself', 'untamed', 'undisciplined', 'self'],
        ['biggest enemy', 'worst enemy', 'enemy', 'adversary', 'sabotage', 'sabotages', 'friend or enemy', 'outsider']
      ]
    },
    'witness-not-thoughts': {
      threads: ['witness consciousness', 'observing thoughts', 'the two birds'],
      anchors: [
        'you are not your thoughts', 'not your thoughts', 'silent witness', 'two birds',
        'watcher of thoughts', 'sky not the clouds', 'sakshi'
      ],
      slots: [
        ['thoughts', 'emotions', 'feelings', 'mental chatter', 'stream of thoughts'],
        ['not your thoughts', 'silent awareness', 'watching', 'witness', 'observing', 'observer', 'pass by', 'seer', 'detached']
      ]
    },
    'subjective-beauty': {
      threads: ['subjective beauty', 'the beholder', 'aesthetics'],
      anchors: [
        'eye of the beholder', 'beauty is subjective', 'beauty is completely subjective',
        'man is the measure', 'sappho'
      ],
      slots: [
        ['beauty', 'beautiful', 'lovely', 'ugly', 'attractive', 'fairest', 'aesthetics', 'taste'],
        ['subjective', 'beholder', 'eye of the beholder', 'universally', 'measure', 'who is looking', 'whatever one loves']
      ]
    },
    'cosmic-meaninglessness': {
      threads: ['cosmic insignificance', 'hevel / vapor', 'existential void'],
      anchors: [
        'nothing matters', 'grand scheme of the cosmos', 'grand scheme of the universe',
        'nihilism', 'nihilistic', 'all is vanity', 'no built in meaning', 'meaningless universe',
        'indifferent cosmos'
      ],
      slots: [
        ['nothing matters', 'no built in meaning', 'no inherent meaning', 'meaningless', 'pointless', 'futile', 'vanity', 'vapor', 'absurd', 'insignificant'],
        ['cosmos', 'universe', 'grand scheme', 'indifferent', 'project meaning', 'invent meaning', 'skulls', 'dust']
      ]
    },
    'human-nature-selfish': {
      threads: ['raw human nature', 'civilization & discipline', 'cultivated goodness'],
      anchors: [
        'humans are naturally selfish', 'human nature is selfish', 'state of nature', 'xunzi', 'crooked timber'
      ],
      slots: [
        ['naturally selfish', 'human nature', 'selfish by default', 'raw nature', 'selfish', 'instincts'],
        ['society', 'civilization', 'culture', 'teaches them', 'discipline', 'cultivated', 'deliberate', 'laws', 'restraint']
      ]
    },
    'social-masks': {
      threads: ['public persona', 'social masks', 'authenticity'],
      anchors: [
        'wears a mask', 'wear a mask', 'take off the mask', 'public persona', 'curated mask'
      ],
      slots: [
        ['mask', 'masks', 'persona', 'curated', 'pretending', 'fake', 'performing', 'actor'],
        ['public', 'hides who they', 'really are', 'true face', 'authenticity', 'authentic', 'exhausts', 'strangers']
      ]
    },
    'journey-not-destination': {
      threads: ['the journey', 'free wandering', 'living the process'],
      anchors: [
        'journey matters more', 'journey not the destination', 'enjoy the journey',
        'free and easy wandering', 'xiaoyao'
      ],
      slots: [
        ['journey', 'path', 'wandering', 'walking', 'road', 'dance', 'music'],
        ['destination', 'finish line', 'arriving', 'arrive', 'final note', 'end point']
      ]
    },
    'time-heals-grief': {
      threads: ['time as healer', 'softening grief', 'slow recovery'],
      anchors: [
        'time heals all wounds', 'time heals every wound', 'time heals everything',
        'time softens grief', 'chronos malaxei'
      ],
      slots: [
        ['time', 'passing time', 'seasons pass', 'delay', 'eventually'],
        ['heals', 'heal', 'healing', 'softens', 'fades', 'cures', 'wounds', 'wound', 'scars', 'grief']
      ]
    },
    'know-enemy-self': {
      threads: ['strategic self-knowledge', 'understanding your opponent', 'sun tzu'],
      anchors: [
        'know your enemy', 'know the enemy and know yourself', 'hundred battles',
        'art of war', 'sun tzu', 'zhi bi zhi ji'
      ],
      slots: [
        ['enemy', 'opponent', 'rival', 'adversary', 'competitor'],
        ['know yourself', 'understand both', 'blind spots', 'defeat', 'victory', 'battles']
      ]
    },
    'fear-creates-reality': {
      threads: ['self-fulfilling fear', 'what I feared came upon me', 'anxiety'],
      anchors: [
        'thing i greatly feared', 'what we fear most', 'self fulfilling prophecy',
        'running away from what we fear', 'meet our destiny on the road'
      ],
      slots: [
        ['fear', 'feared', 'dread', 'dreaded', 'terrifies', 'afraid of'],
        ['attract', 'create', 'bring into reality', 'comes upon', 'befalls', 'draw into', 'self fulfilling']
      ]
    },
    'teaching-is-learning': {
      threads: ['docendo discimus', 'teaching clarifies thought', 'shared mastery'],
      anchors: [
        'while we teach we learn', 'docendo discimus', 'best way to learn is to teach',
        'explain it to someone else', 'teaching and learning'
      ],
      slots: [
        ['teach', 'teaching', 'explain', 'explaining', 'mentor', 'instruct'],
        ['learn', 'learning', 'understand', 'master', 'gaps', 'ignorance']
      ]
    },
    'begin-small-steps': {
      threads: ['journey of a thousand miles', 'single step', 'compounding'],
      anchors: [
        'journey of a thousand miles', 'begins with a single step', 'single step',
        'drop by drop the water pot', 'nine story terrace'
      ],
      slots: [
        ['thousand miles', 'single step', 'small steps', 'tiny steps', 'drop by drop', 'little by little', 'basket of earth'],
        ['massive', 'impossible', 'achievement', 'journey', 'mountain', 'filled', 'builds']
      ]
    },
    'emptiness-makes-useful': {
      threads: ['value of emptiness', 'negative space', 'rest & silence'],
      anchors: [
        'emptiness makes it useful', 'thirty spokes share one hub', 'hollow of the vessel',
        'negative space', 'space between the notes'
      ],
      slots: [
        ['emptiness', 'empty space', 'hollow', 'void', 'nothingness', 'negative space', 'pauses'],
        ['useful', 'usefulness', 'vessel', 'cup', 'room', 'wheel', 'purpose']
      ]
    },
    'true-wealth-health': {
      threads: ['health as highest wealth', 'arogya parama labha', 'vitality'],
      anchors: [
        'health is the greatest wealth', 'health is the highest gain', 'arogya parama labha',
        'healthy beggar is happier than a sick king', 'sick king'
      ],
      slots: [
        ['health', 'healthy', 'sickness', 'illness', 'sick', 'body', 'disease'],
        ['wealth', 'rich', 'riches', 'money', 'fortune', 'gold', 'crown', 'worthless']
      ]
    },
    'alone-born-die': {
      threads: ['existential solitude', 'born alone die alone', 'standing on one’s own'],
      anchors: [
        'born alone and die alone', 'born alone', 'die alone',
        'enter the world alone', 'leave it alone', 'walk the ultimate path alone'
      ],
      slots: [
        ['born alone', 'die alone', 'alone', 'solitude', 'by yourself'],
        ['born', 'birth', 'die', 'death', 'crossing', 'grave', 'enter', 'leave']
      ]
    },
    'truth-hurts-flattery': {
      threads: ['bitter truth vs. sweet flattery', 'faithful wounds', 'honest counsel'],
      anchors: [
        'truth hurts', 'truth is bitter', 'wounds of a friend', 'flattery is sweet',
        'truthful words are not pleasant', 'pleasant words are not truthful'
      ],
      slots: [
        ['flattery', 'flatterer', 'sweet words', 'praise', 'compliments', 'pleasant words'],
        ['truth', 'honest', 'criticism', 'bitter', 'hurts', 'wounds', 'medicine', 'correction']
      ]
    },
    'boredom-restlessness': {
      threads: ['restless fleeing of self', 'existential boredom', 'taedium vitae'],
      anchors: [
        'running away from themselves', 'fleeing from themselves', 'cannot sit quietly in a room',
        'change of sky not of mind', 'taedium vitae', 'chronically bored'
      ],
      slots: [
        ['bored', 'boredom', 'restless', 'restlessness', 'distraction', 'traveling', 'scrolling', 'busyness'],
        ['alone with their thoughts', 'sit quietly', 'escape themselves', 'fleeing themselves', 'own company']
      ]
    },
    'gratitude-multiplier': {
      threads: ['gratitude as abundance', 'turning enough into plenty', 'thankfulness'],
      anchors: [
        'gratitude turns what we have into enough', 'gratitude is the parent of all virtues',
        'ungrateful mind', 'thankfulness'
      ],
      slots: [
        ['gratitude', 'grateful', 'thankful', 'thankfulness', 'appreciate', 'blessings'],
        ['abundance', 'missing', 'complaining', 'joy', 'richest', 'enough']
      ]
    },
    'fear-of-opinion': {
      threads: ['other people’s opinions', 'craving approval', 'social anxiety'],
      anchors: [
        'what other people think', 'other peoples opinions', 'care more about what others think',
        'living in their heads', 'validation from others'
      ],
      slots: [
        ['what other people think', 'others think', 'opinions', 'approval', 'validation', 'judging', 'applause'],
        ['strangers', 'care more', 'fear', 'prisoner', 'peace', 'respect yourself']
      ]
    },
    'memory-unreliable': {
      threads: ['reconstructed memory', 'nostalgia', 'palace of memory'],
      anchors: [
        'memory is unreliable', 'rewrite our past', 'nostalgia is a lie',
        'palace of memory', 'remember the past differently'
      ],
      slots: [
        ['memory', 'memories', 'remember', 'remembering', 'nostalgia', 'recollection'],
        ['rewrite', 'reconstruct', 'distortion', 'fictional', 'imagination', 'present self', 'recording']
      ]
    },
    'injustice-silence': {
      threads: ['complicity of silence', 'civic courage', 'mutual defense'],
      anchors: [
        'silence in the face of injustice', 'staying silent', 'complicit in injustice',
        'who fails to prevent a wrong', 'injustice anywhere'
      ],
      slots: [
        ['injustice', 'wrongdoing', 'oppression', 'evil', 'cruelty', 'unjust'],
        ['silent', 'silence', 'bystander', 'do nothing', 'passive', 'complicit', 'speak up', 'defend']
      ]
    },
    'evil-from-ignorance': {
      threads: ['no one errs willingly', 'Socratic ethics', 'moral blindness'],
      anchors: [
        'no one does evil willingly', 'nobody is the villain in their own story',
        'people do bad things out of ignorance', 'mistake the bad for the good'
      ],
      slots: [
        ['villain', 'evil', 'bad things', 'harm', 'cruel', 'wrong'],
        ['ignorance', 'blind', 'mistake', 'think they are right', 'own story', 'good for them', 'confused']
      ]
    },
    'change-yourself-first': {
      threads: ['self-cultivation first', 'putting one’s own heart in order', 'inner reform'],
      anchors: [
        'change the world start with yourself', 'change yourself first', 'rectify their hearts',
        'great learning', 'daxue', 'put your own house in order'
      ],
      slots: [
        ['change the world', 'fix the world', 'reform society', 'fix everyone else'],
        ['change yourself', 'start with yourself', 'own heart', 'own mind', 'own house', 'cultivate yourself']
      ]
    },
    'words-wounds-heal': {
      threads: ['wound of the tongue', 'reckless speech', 'permanent verbal scars'],
      anchors: [
        'words cut deeper than swords', 'tongue has no bones', 'wound of a sword heals',
        'wound of the tongue never heals', 'cruel words'
      ],
      slots: [
        ['words', 'tongue', 'speech', 'insult', 'cruel remark', 'said in anger'],
        ['wound', 'wounds', 'scar', 'scars', 'sword', 'arrow', 'blade', 'flesh heals', 'never heals']
      ]
    },
    'youth-wasted-regret': {
      threads: ['brevity of youth', 'procrastination', 'carpe diem'],
      anchors: [
        'youth is wasted on the young', 'putting life on hold', 'waiting for life to start',
        'while we delay life speeds past', 'best days flee first'
      ],
      slots: [
        ['youth', 'young', 'prime of life', 'someday', 'postpone', 'putting off', 'delaying'],
        ['old age', 'grown old', 'too late', 'passed you by', 'slipped away', 'wasted']
      ]
    },
    'hope-and-fear': {
      threads: ['hope and fear as twins', 'future-bound anxiety', 'present peace'],
      anchors: [
        'hope and fear are two sides', 'cease to hope and you will cease to fear',
        'blind hope', 'pandoras jar', 'false hope'
      ],
      slots: [
        ['hope', 'hoping', 'wishful'],
        ['fear', 'anxiety', 'dread', 'chain', 'two sides', 'future', 'torment']
      ]
    },
    'suffering-connects-us': {
      threads: ['shared vulnerability', 'tears of things', 'compassion born of pain'],
      anchors: [
        'sunt lacrimae rerum', 'tears of things', 'suffering makes us compassionate',
        'not ignorant of misfortune', 'shared pain connects us'
      ],
      slots: [
        ['heartbreak', 'grief', 'pain', 'suffering', 'wounded', 'loss', 'misfortune'],
        ['empathy', 'compassion', 'connects us', 'gentler', 'understand others', 'succor', 'tender']
      ]
    },
    'simplicity-genius': {
      threads: ['manifest plainness', 'uncarved block', 'subtracting clutter'],
      anchors: [
        'simplicity is the ultimate sophistication', 'keep it simple', 'less is more',
        'uncarved block', 'manifest plainness'
      ],
      slots: [
        ['simplicity', 'simple', 'plain', 'minimal', 'uncluttered', 'subtract'],
        ['complexity', 'complicated', 'clutter', 'excess', 'ornament', 'essentials', 'mastery']
      ]
    },
    'courage-freedom': {
      threads: ['freedom requires courage', 'happiness requires freedom', 'Pericles'],
      anchors: [
        'secret of happiness is freedom', 'secret of freedom is courage',
        'freedom requires courage', 'cowardice costs you your freedom'
      ],
      slots: [
        ['courage', 'brave', 'bravery', 'fearless', 'cowardice', 'risk'],
        ['freedom', 'free', 'liberty', 'independent', 'safety']
      ]
    },
    'money-servant-master': {
      threads: ['wealth as servant or master', 'owned by possessions', 'financial bondage'],
      anchors: [
        'money is a good servant but a bad master', 'things you own end up owning you',
        'wealth serves the wise', 'slave to money'
      ],
      slots: [
        ['money', 'wealth', 'riches', 'fortune', 'possessions', 'luxury'],
        ['servant', 'master', 'slave', 'owns you', 'owning you', 'obeys', 'commands', 'trap']
      ]
    },
    'uselessness-usefulness': {
      threads: ['usefulness of being useless', 'sacred gnarly tree', 'refusing instrumentalization'],
      anchors: [
        'usefulness of being useless', 'nobody knows the use of the useless',
        'useless tree', 'cut down first', 'burnout from being useful'
      ],
      slots: [
        ['useless', 'unproductive', 'no commercial value', 'gnarled tree', 'crooked tree'],
        ['useful', 'exploited', 'cut down', 'harvested', 'survive', 'peace', 'unharmed']
      ]
    }
  };

  function normalizeText(str) {
    return String(str || '')
      .replace(/<[^>]*>/g, ' ')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/['’‘`]/g, '')
      .replace(/[-–—]/g, ' ')
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function normalizeToken(word) {
    let w = (word || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    if (w.length > 6 && w.endsWith('ations')) w = w.slice(0, -6) + 'ate';
    else if (w.length > 5 && w.endsWith('ation')) w = w.slice(0, -5) + 'ate';
    else if (w.length > 5 && w.endsWith('ingly')) w = w.slice(0, -5);
    else if (w.length > 5 && w.endsWith('ment')) w = w.slice(0, -4);
    else if (w.length > 5 && w.endsWith('ness')) w = w.slice(0, -4);
    else if (w.length > 5 && w.endsWith('ing')) w = w.slice(0, -3);
    else if (w.length > 4 && w.endsWith('ies')) w = w.slice(0, -3) + 'y';
    else if (w.length > 4 && w.endsWith('ed')) w = w.slice(0, -2);
    else if (w.length > 4 && w.endsWith('es')) w = w.slice(0, -2);
    else if (w.length > 3 && w.endsWith('s') && !w.endsWith('ss') && !w.endsWith('us') && !w.endsWith('is')) {
      w = w.slice(0, -1);
    }
    return w;
  }

  function tokenize(text) {
    const clean = normalizeText(text);
    if (!clean) return { raw: [], stems: [], clean: '' };
    const raw = clean.split(' ').filter((t) => t.length >= 3 && !STOPWORDS.has(t));
    const stems = raw.map(normalizeToken).filter((t) => t.length >= 3);
    return { raw, stems, clean };
  }

  function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function matchesTerm(cleanText, stemSet, term) {
    if (!term || !cleanText) return false;
    if (term.includes(' ')) {
      return cleanText.includes(term);
    }
    if (stemSet.has(term) || stemSet.has(normalizeToken(term))) return true;
    const re = new RegExp(`(?:^|\\s)${escapeRegex(term)}(?:$|\\s)`);
    return re.test(cleanText);
  }

  function computeYearsLate(ancientYear) {
    const nowYear = new Date().getFullYear();
    if (ancientYear < 0) return nowYear - ancientYear - 1;
    return Math.max(1, nowYear - ancientYear);
  }

  function formatYearShort(year) {
    if (year < 0) return `${Math.abs(year)} BCE`;
    return `${year} CE`;
  }

  function prepareCanonItem(item) {
    const echoes = (item.echoes || []).slice().sort((a, b) => a.year - b.year);
    return Object.assign({}, item, { echoes });
  }

  let cachedIndex = null;
  function getCanonIndex() {
    const canon = (global.HUMBLER_CANON || []).map(prepareCanonItem);
    if (cachedIndex && cachedIndex.count === canon.length) return cachedIndex;

    const df = new Map();
    const docs = canon.map((item) => {
      const profile = PROFILES[item.id] || { threads: [], anchors: [], slots: [] };

      const kwSet = new Set();
      (item.keywords || []).forEach((k) => {
        const nk = normalizeText(k);
        if (nk.length >= 3 && !STOPWORDS.has(nk)) {
          kwSet.add(nk);
          const st = normalizeToken(nk);
          if (st.length >= 3 && !STOPWORDS.has(st)) kwSet.add(st);
        }
      });

      const textBag = [
        item.title,
        item.domain,
        item.ancientThesis,
        item.modernSummary,
        item.specimen
      ].join(' ');
      const bagTokens = tokenize(textBag);
      const bagSet = new Set([...bagTokens.raw, ...bagTokens.stems]);

      const union = new Set([...kwSet, ...bagSet]);
      union.forEach((t) => df.set(t, (df.get(t) || 0) + 1));

      return {
        item,
        profile,
        kwSet,
        bagSet,
        anchors: (profile.anchors || []).map(normalizeText).filter(Boolean),
        slots: (profile.slots || []).map((slot) => slot.map(normalizeText).filter(Boolean)),
        phrases: (item.phrases || []).map(normalizeText).filter(Boolean)
      };
    });

    const N = Math.max(1, canon.length);
    const idf = new Map();
    df.forEach((count, term) => {
      idf.set(term, Math.log((N + 1) / (count + 1)) + 1);
    });

    cachedIndex = { count: canon.length, docs, idf };
    return cachedIndex;
  }

  function matchIdea(userInput) {
    const rawTrimmed = String(userInput || '').trim();
    const { docs, idf } = getCanonIndex();
    const tokens = tokenize(rawTrimmed);

    if (!tokens.clean || tokens.raw.length === 0) {
      return {
        source: 'archive',
        unmatched: true,
        reason: 'empty_or_symbols',
        userIdea: rawTrimmed,
        entry: null,
        yearsLate: 0,
        confidence: 'none',
        threads: [],
        related: [],
        score: 0
      };
    }

    const stemSet = new Set([...tokens.raw, ...tokens.stems]);
    const lengthNorm = tokens.raw.length > 36 ? Math.sqrt(36 / tokens.raw.length) : 1;

    const scored = docs.map((doc) => {
      let score = 0;
      let anchorHits = 0;
      let phraseHits = 0;
      let slotsHit = 0;
      let totalSlotMatches = 0;

      /* 1. Unordered Compositional Concept-Slot Matching (handles arbitrary word order & metaphors!) */
      doc.slots.forEach((slotTerms) => {
        let hitCount = 0;
        for (let i = 0; i < slotTerms.length; i++) {
          if (matchesTerm(tokens.clean, stemSet, slotTerms[i])) {
            hitCount += 1;
          }
        }
        if (hitCount > 0) {
          slotsHit += 1;
          totalSlotMatches += Math.min(3, hitCount);
        }
      });

      if (slotsHit >= 3) {
        score += 42 + totalSlotMatches * 3.5;
      } else if (slotsHit === 2) {
        score += 30 + totalSlotMatches * 3.0;
      } else if (slotsHit === 1) {
        score += 4.5 + Math.min(3, totalSlotMatches) * 1.5;
      }

      /* 2. High-precision unambiguous anchors */
      doc.anchors.forEach((anchor) => {
        if (matchesTerm(tokens.clean, stemSet, anchor)) {
          score += anchor.includes(' ') ? 20 : 14;
          anchorHits += 1;
        }
      });

      /* 3. Curated phrase hits */
      doc.phrases.forEach((phrase) => {
        if (phrase && tokens.clean.includes(phrase)) {
          score += 16 + Math.min(8, phrase.split(' ').length * 2);
          phraseHits += 1;
        }
      });

      /* 4. Clean IDF-weighted lexical overlap */
      let lexicalScore = 0;
      let matchedLexTokens = 0;
      stemSet.forEach((tok) => {
        const weight = idf.get(tok) || 1.1;
        if (doc.kwSet.has(tok)) {
          lexicalScore += 2.6 * weight;
          matchedLexTokens += 1;
        } else if (doc.bagSet.has(tok)) {
          lexicalScore += 0.85 * weight;
          matchedLexTokens += 1;
        }
      });
      score += lexicalScore * lengthNorm;

      /* 5. Semantic disambiguation guards (prevent surface-word polarity collisions) */
      const id = doc.item.id;
      const c = tokens.clean;
      if (id === 'humble-leadership' && /\b(corrupt\w*|tyrant\w*|tyranny|abuse\w*|dictator)\b/.test(c)) {
        score *= 0.25;
      }
      if (id === 'humility-wisdom' && /\b(sadder|sorrow|bliss|unhappy|harder to be happy|too smart)\b/.test(c)) {
        score *= 0.3;
      }
      if (id === 'purpose-service' && /\b(no .*meaning|meaningless|nothing matters|nihilis\w*|indifferent|pointless)\b/.test(c)) {
        score *= 0.2;
      }
      if (id === 'anger-revenge' && /\b(own mind|yourself)\b/.test(c) && /\benemy\b/.test(c)) {
        score *= 0.25;
      }
      if (id === 'two-arrows' && /\btime\b/.test(c) && /\b(heals?|softens?)\b/.test(c)) {
        score *= 0.2;
      }
      if (id === 'inner-freedom' && /\b(love|lover|partner|spouse)\b/.test(c) && /\b(possess\w*|letting .* free|other person)\b/.test(c)) {
        score *= 0.35;
      }
      if (id === 'expectation-suffering' && /\b(love|lover|partner|spouse)\b/.test(c) && /\b(possess\w*|letting .* free|without possess\w*|cling\w*)\b/.test(c)) {
        score += 24;
        slotsHit = Math.max(slotsHit, 2);
      }

      return {
        item: doc.item,
        profile: doc.profile,
        score,
        slotsHit,
        anchorHits,
        phraseHits,
        matchedLexTokens
      };
    });

    scored.sort((a, b) => b.score - a.score);
    const best = scored[0];

    const hasStrongSignal = best.slotsHit >= 2 || best.anchorHits > 0 || best.phraseHits > 0;
    const isUnmatched = !hasStrongSignal && (best.matchedLexTokens < 3 || best.score < 16);

    const runners = scored
      .slice(1, 4)
      .filter((r) => (r.slotsHit >= 2 || r.anchorHits > 0 || r.score >= Math.max(11, best.score * 0.36)))
      .map((r) => r.item);

    let confidence = 'high';
    if (isUnmatched) confidence = 'none';
    else if (!hasStrongSignal && best.score < 18) confidence = 'broad';
    else if (best.score < 24) confidence = 'medium';

    const threads =
      best.profile && best.profile.threads && best.profile.threads.length
        ? best.profile.threads
        : [best.item.domain.toLowerCase()];

    return {
      source: 'archive',
      unmatched: isUnmatched,
      reason: isUnmatched ? 'no_philosophical_match' : null,
      userIdea: rawTrimmed,
      entry: best.score > 0 ? best.item : null,
      yearsLate: best.score > 0 ? computeYearsLate(best.item.origin.year) : 0,
      confidence,
      threads,
      related: isUnmatched ? [] : runners,
      score: best.score
    };
  }

  function getEntryById(id) {
    const { docs } = getCanonIndex();
    const found = docs.find((d) => d.item.id === id);
    return found ? found.item : null;
  }

  function getAllChronological() {
    const { docs } = getCanonIndex();
    return docs
      .map((d) => d.item)
      .slice()
      .sort((a, b) => a.origin.year - b.origin.year);
  }

  global.HUMBLER_MATCHER = {
    matchIdea,
    getEntryById,
    getAllChronological,
    computeYearsLate,
    formatYearShort
  };
})(window);
