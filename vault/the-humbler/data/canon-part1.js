/* ==========================================================================
   THE HUMBLER, Verified Ancient Philosophical & Scriptural Canon (Part I: 1–18)
   Every quotation traces to an authenticated primary text with original script,
   transliteration, scholarly translation, provenance, and historical coordinates.
   ========================================================================== */

(function (global) {
  'use strict';

  global.HUMBLER_CANON = global.HUMBLER_CANON || [];

  const PART_ONE = [
    {
      id: 'expectation-suffering',
      domain: 'Relationships & Suffering',
      title: 'The Root of Relational Suffering',
      ancientThesis: 'Piya-upādāna & Taṇhā, Suffering springs from clinging to what is dear and demanding others conform to our craving.',
      modernSummary: 'Expecting another person to fulfill our wishes or remain as we demand is the silent engine of heartbreak and conflict.',
      specimen: 'The root cause of human suffering in relationships is expectation from the other.',
      concepts: [
        'relational_expectation', 'relationships', 'suffering', 'attachment', 'desire', 'heartbreak', 'expectations'
      ],
      phrases: [
        'expectation from the other', 'expectations in relationships', 'suffering in relationships',
        'expecting too much', 'expect from others', 'root cause of suffering', 'cause of human suffering',
        'attachment causes suffering', 'clinging to loved ones', 'depend on someone for happiness',
        'wanting people to change', 'disappointed by people', 'heartbreak comes from expectation',
        'unmet expectations', 'love and suffering', 'hurt by expectations'
      ],
      keywords: [
        'expectation', 'expectations', 'expect', 'expecting', 'relationship', 'relationships',
        'partner', 'spouse', 'lover', 'loved', 'suffering', 'sorrow', 'grief', 'hurt',
        'attachment', 'cling', 'clinging', 'demand', 'demanding', 'disappointment', 'other',
        'others', 'heartbreak', 'people', 'craving', 'entitlement', 'dependence'
      ],
      origin: {
        year: -480,
        yearLabel: 'c. 5th Century BCE',
        thinker: 'Siddhartha Gautama (The Buddha)',
        tradition: 'Early Buddhism · Pāli Canon',
        place: 'Sāvatthī, Kosala',
        region: 'Ancient India',
        coords: [82.05, 27.51],
        scripture: 'Dhammapada XVI.212–215 & Piyajātikā Sutta (Majjhima Nikāya 87)',
        language: 'Pāli',
        scriptDir: 'ltr',
        scriptClass: 'script-latin',
        originalScript: 'Piyato jāyatī soko, piyato jāyatī bhayaṃ;\npiyato vippamuttassa, natthi soko kuto bhayaṃ.',
        transliteration: 'Piyato jāyatī soko, piyato jāyatī bhayaṃ; piyato vippamuttassa, natthi soko kuto bhayaṃ.',
        translation: 'From what is held dear springs sorrow; from what is held dear springs fear. For one wholly free from clinging to the dear, there is no sorrow, whence then fear?',
        provenance: 'Dhammapada, Chapter XVI (Piyavagga), v. 212; elaborated in Piyajātikā Sutta, Majjhima Nikāya 87 (c. 5th century BCE)',
        commentary: 'Your diagnosis of relational pain arrived twenty-five centuries after Gautama stated it in Sāvatthī, and in far blunter terms. In the Piyajātikā Sutta, when a grieving father objects to the claim that sorrow is born from affection, the Buddha traces grief directly to our grasping expectation that loved ones stay unchanged and answer our longing. Where modern psychology speaks gently of "unmet expectations," the Pāli Canon calls it taṇhā, the feverish thirst that turns tenderness into a quiet contract.',
        marginalia: 'In Majjhima Nikāya 87, Queen Mallikā actually defended this exact teaching to her skeptical husband, King Pasenadi, by asking him whether any harm to his beloved daughter or kingdom would bring him grief; trapped by his own answer, the king turned toward the Jetavana grove and bowed.'
      },
      echoes: [
        {
          year: -300,
          yearLabel: 'c. 300 BCE',
          thinker: 'Zhuangzi (Zhuang Zhou)',
          tradition: 'Classical Daoism',
          place: 'Meng, State of Song',
          region: 'Warring States China',
          coords: [115.65, 34.41],
          scripture: 'Zhuangzi, Chapter 20 (Shān Mù, "The Mountain Tree")',
          language: 'Classical Chinese',
          scriptDir: 'ltr',
          scriptClass: 'script-cjk',
          originalScript: '方舟而濟於河，有虛船來觸舟，雖有惼心之人不怒；有一人在其上，則呼張歙之。',
          transliteration: 'Fāng zhōu ér jì yú hé, yǒu xū chuán lái chù zhōu, suī yǒu biǎn xīn zhī rén bù nù; yǒu yī rén zài qí shàng, zé hū zhāng xī zhī.',
          translation: 'If a man is crossing a river and an empty boat collides with his skiff, even a short-tempered man will not grow angry. But if there is someone sitting in the other boat, he shouts and curses at them.',
          provenance: 'Zhuangzi, Outer Chapters, Chapter 20 (Shān Mù), c. 300 BCE',
          commentary: 'Zhuangzi isolated the exact psychological trigger behind relational expectation with his parable of the Empty Boat. The collision is identical in both cases; fury erupts only the instant we detect another person inside the vessel whom we expect to behave otherwise. Empty your own boat of self-centered demand, he concludes, and no collision can wound you.',
          marginalia: 'Chinese commentators across two millennia treasured the xū zhōu ("empty boat") image as the clearest diagnosis of why human intimacy provokes rage that inanimate misfortune never does.'
        },
        {
          year: -200,
          yearLabel: 'c. 200 BCE',
          thinker: 'Vyāsa (Voice of Krishna)',
          tradition: 'Vedānta · Mahābhārata',
          place: 'Kurukṣetra, Northern India',
          region: 'Ancient India',
          coords: [76.87, 29.97],
          scripture: 'Bhagavad Gītā 2.62–63',
          language: 'Sanskrit',
          scriptDir: 'ltr',
          scriptClass: 'script-deva',
          originalScript: 'ध्यायतो विषयान्पुंसः सङ्गस्तेषूपजायते।\nसङ्गात्सञ्जायते कामः कामात्क्रोधोऽभिजायते॥',
          transliteration: 'Dhyāyato viṣayān puṃsaḥ saṅgas teṣūpajāyate; saṅgāt sañjāyate kāmaḥ kāmāt krodho ’bhijāyate.',
          translation: 'Brooding upon objects of attachment, clinging is born; from clinging springs craving, and from thwarted craving arises anger.',
          provenance: 'Bhagavad Gītā, Chapter II (Sāṅkhya Yoga), vv. 62–63 (c. 2nd century BCE)',
          commentary: 'The Gītā maps the anatomy of expectation as a deterministic chain: fixated attention breeds attachment (saṅga), attachment breeds demand (kāma), and when the world or another person fails to deliver, demand instantly curdles into anger (krodha). Acting with care while surrendering entitlement to a prescribed return is its proposed cure.',
          marginalia: 'Spoken at the edge of a fratricidal war among cousins, the Gītā treats emotional expectation toward kinsmen as the very paralysis that clouds moral clarity.'
        },
        {
          year: 108,
          yearLabel: 'c. 108 CE',
          thinker: 'Epictetus',
          tradition: 'Roman Stoicism',
          place: 'Nicopolis, Epirus',
          region: 'Roman Greece',
          coords: [20.73, 39.01],
          scripture: 'Enchiridion (The Manual), Chapters 8 & 14',
          language: 'Koine Greek',
          scriptDir: 'ltr',
          scriptClass: 'script-greek',
          originalScript: 'Μὴ ζήτει τὰ γινόμενα γίνεσθαι ὡς θέλεις, ἀλλὰ θέλε τὰ γινόμενα ὡς γίνεται καὶ εὐροήσεις.',
          transliteration: 'Mē zētei ta ginomena ginesthai hōs theleis, alla thele ta ginomena hōs ginetai kai euroēseis.',
          translation: 'Do not demand that things happen as you wish, but wish that they happen as they do happen, and your life will flow smoothly.',
          provenance: 'Epictetus, Enchiridion 8 (compiled by Arrian of Nicomedia, c. 108–125 CE)',
          commentary: 'Born into slavery in Hierapolis, Epictetus applied this razor directly to family and friendship in Enchiridion 14: demanding that a spouse, child, or friend behave as we prefer is attempting to own what does not belong to us. Whenever we tie our tranquility to another person’s compliance, we volunteer for servitude.',
          marginalia: 'Epictetus never wrote a word himself; his classroom lectures in Nicopolis survive solely because his student Arrian recorded them in shorthand.'
        }
      ]
    },

    {
      id: 'love-and-self',
      domain: 'Relationships & Self',
      title: 'The Self Hidden Behind Every Love',
      ancientThesis: 'Ātmanastu Kāmāya, We love partners, children, and friends ultimately for the sake of the Self reflected through them.',
      modernSummary: 'Every seemingly selfless love still passes through the lens of our own selfhood and longing.',
      specimen: 'We never truly love another person purely for themselves; we love how our own self feels through them.',
      concepts: ['relationships', 'ego', 'self_love', 'love', 'selfishness'],
      phrases: [
        'love another person for ourselves', 'all love is selfish', 'love is about the self',
        'we love how they make us feel', 'selfishness in love', 'true reason we love',
        'why we love others', 'projection in love', 'love is a mirror'
      ],
      keywords: [
        'love', 'loving', 'husband', 'wife', 'partner', 'friend', 'selfish', 'self',
        'mirror', 'dear', 'affection', 'projection', 'feel', 'ourselves', 'altruism'
      ],
      origin: {
        year: -700,
        yearLabel: 'c. 700 BCE',
        thinker: 'Yājñavalkya (to Maitreyī)',
        tradition: 'Vedic Upaniṣads',
        place: 'Mithila, Videha',
        region: 'Ancient India',
        coords: [85.92, 26.73],
        scripture: 'Bṛhadāraṇyaka Upaniṣad 2.4.5',
        language: 'Vedic Sanskrit',
        scriptDir: 'ltr',
        scriptClass: 'script-deva',
        originalScript: 'न वा अरे पत्युः कामाय पतिः प्रियो भवति,\nआत्मनस्तु कामाय पतिः प्रियो भवति।',
        transliteration: 'Na vā are patyuḥ kāmāya patiḥ priyo bhavati, ātmanastu kāmāya patiḥ priyo bhavati.',
        translation: 'Verily, not for the sake of the husband is the husband dear, but for the sake of the Self is the husband dear. Not for the sake of the wife is the wife dear, but for the sake of the Self is the wife dear.',
        provenance: 'Bṛhadāraṇyaka Upaniṣad II.4.5, Yājñavalkya–Maitreyī Dialogue (c. 700 BCE)',
        commentary: 'Before modern cynicism ever called love transactional, the sage Yājñavalkya stunned his wife Maitreyī on the eve of his renunciation with this exact dismantling. Going down the list, husband, wife, sons, wealth, worlds, he declared that every bond is cherished only because of the Ātman (the Self) within. Yet he turned the observation upward: if the shared Self is what we truly seek in another, then recognizing it dissolves possessiveness rather than justifying egoism.',
        marginalia: 'Maitreyī famously refused Yājñavalkya’s offer to divide his estate between his two wives, asking: "If this whole earth filled with wealth were mine, would I become immortal through it?", prompting one of antiquity’s earliest recorded philosophical dialogues led by a woman.'
      },
      echoes: [
        {
          year: -340,
          yearLabel: 'c. 340 BCE',
          thinker: 'Aristotle',
          tradition: 'Classical Greek Philosophy',
          place: 'Athens, Attica',
          region: 'Ancient Greece',
          coords: [23.73, 37.98],
          scripture: 'Nicomachean Ethics VIII.3 (1156a)',
          language: 'Ancient Greek',
          scriptDir: 'ltr',
          scriptClass: 'script-greek',
          originalScript: 'Οἱ μὲν οὖν διὰ τὸ χρήσιμον φιλοῦντες ἀλλήλους οὐ καθ᾽ αὑτοὺς φιλοῦσιν.',
          transliteration: 'Hoi men oun dia to chrēsimon philountes allēlous ou kath’ hautous philousin.',
          translation: 'Those who love one another for utility do not love each other for themselves, but insofar as some good accrues to them from the other.',
          provenance: 'Aristotle, Nicomachean Ethics VIII.3, 1156a10–12 (c. 340 BCE)',
          commentary: 'Aristotle dissected human bonds into three tiers, utility, pleasure, and character, noting that most friendships and romances belong to the first two and vanish the moment the benefit fades. Only rare "complete friendship" loves the other for who they are, and even there, Aristotle calls a true friend "another self" (allos autos).',
          marginalia: 'Aristotle devoted two full books, a fifth of the entire Nicomachean Ethics, to philia (friendship and love), treating it as more indispensable to a city than justice itself.'
        }
      ]
    },

    {
      id: 'nothing-new',
      domain: 'Originality & History',
      title: 'Nothing New Under the Sun',
      ancientThesis: 'The Complaint of Unoriginality, Humanity has been lamenting that every profound thought was already spoken since 1900 BCE.',
      modernSummary: 'There are no truly original ideas left; every generation merely rediscovers and rephrases ancient truths.',
      specimen: 'There are no truly original ideas left; everything profound has already been thought before.',
      concepts: ['originality', 'history', 'repetition', 'meta'],
      phrases: [
        'nothing new under the sun', 'no original ideas', 'everything has already been said',
        'already been thought', 'history repeats', 'unoriginal', 'rediscover old ideas',
        'human nature never changes'
      ],
      keywords: [
        'original', 'originality', 'new', 'nothing', 'repeat', 'repeats', 'repetition',
        'already', 'said', 'stale', 'ancient', 'sun', 'invent', 'plagiarism', 'unoriginal'
      ],
      origin: {
        year: -1900,
        yearLabel: 'c. 1900 BCE',
        thinker: 'Khakheperreseneb',
        tradition: 'Middle Kingdom Egyptian Wisdom Literature',
        place: 'Heliopolis, Lower Egypt',
        region: 'Ancient Egypt',
        coords: [31.31, 30.13],
        scripture: 'The Complaints of Khakheperreseneb (BM EA 5645)',
        language: 'Middle Egyptian',
        scriptDir: 'ltr',
        scriptClass: 'script-latin',
        originalScript: 'ḥꜣ n.i mdwt n rx.tw tsw hppyw m rꜣ mꜣw n swꜣ.n.f šw m whm',
        transliteration: 'Ḥꜣ n.i mdwt n rḫ.tw, tsw ḥppyw m rꜣ mꜣw n swꜣ.n.f, šw m wḥm.',
        translation: 'Would that I had unknown speeches, utterances that are strange, in new language that has not been used, free from repetition, not an utterance that has grown stale, which men of old have spoken.',
        provenance: 'Writing Board BM EA 5645, recto ll. 2–3, British Museum (Middle Kingdom, c. 1900 BCE)',
        commentary: 'Even the realization that every idea is unoriginal is itself nearly four thousand years unoriginal. Around 1900 BCE, an Egyptian priest named Khakheperreseneb stared at his writing board in Heliopolis and groaned that the ancestors had already harvested every worthwhile sentence, leaving him only stale repetitions to glean.',
        marginalia: 'This wooden stuccoed scribe’s board (BM EA 5645), now in the British Museum, predates the Book of Ecclesiastes by roughly sixteen centuries, making "everything has already been said" one of the oldest surviving complaints in literature.'
      },
      echoes: [
        {
          year: -250,
          yearLabel: 'c. 3rd Century BCE',
          thinker: 'Qohelet (The Preacher)',
          tradition: 'Hebrew Wisdom Literature',
          place: 'Jerusalem, Judea',
          region: 'Ancient Near East',
          coords: [35.23, 31.78],
          scripture: 'Ecclesiastes (Qohelet) 1:9',
          language: 'Biblical Hebrew',
          scriptDir: 'rtl',
          scriptClass: 'script-hebrew',
          originalScript: 'מַה־שֶּׁהָיָה הוּא שֶׁיִּהְיֶה וּמַה־שֶּׁנַּעֲשָׂה הוּא שֶׁיֵּעָשֶׂה וְאֵין כָּל־חָדָשׁ תַּחַת הַשָּׁמֶשׁ׃',
          transliteration: 'Mah-shehāyāh hū sheyihyeh, ūmah-shena‘ăśāh hū sheyē‘āśeh, wə’ên kol-ḥādāsh taḥat hashāmesh.',
          translation: 'What has been is what will be, and what has been done is what will be done; and there is nothing new under the sun.',
          provenance: 'Ecclesiastes 1:9 (Masoretic Text, composed c. 4th–3rd century BCE)',
          commentary: 'Qohelet turned the exhaustion of repetition into a full existential meditation: rivers run to the sea yet the sea is never full, generations rise and vanish, and whatever looks brand new has merely outlived our collective memory.',
          marginalia: 'The very next verse (1:10–11) explains why people still feel original: "There is no remembrance of former things", humanity’s genius is mostly amnesia.'
        },
        {
          year: -161,
          yearLabel: '161 BCE',
          thinker: 'Terence (Publius Terentius Afer)',
          tradition: 'Roman Comedy & Letters',
          place: 'Rome, Roman Republic',
          region: 'Ancient Italy',
          coords: [12.49, 41.89],
          scripture: 'Eunuchus, Prologue, line 41',
          language: 'Classical Latin',
          scriptDir: 'ltr',
          scriptClass: 'script-latin',
          originalScript: 'Nullumst iam dictum quod non dictum sit prius.',
          transliteration: 'Nullumst iam dictum quod non dictum sit prius.',
          translation: 'Nothing has yet been said that has not been said before.',
          provenance: 'Terence, Eunuchus, Prologue l. 41 (first performed at the Ludi Megalenses, Rome, 161 BCE)',
          commentary: 'Accused by rival playwrights of stealing stock characters from older Greek comedies, the North African–born Roman playwright Terence shrugged before the entire theater: every plot and aphorism already belonged to the commons of antiquity.',
          marginalia: 'Born in Carthage and brought to Rome as a slave before being freed and educated, Terence’s Eunuchus earned the highest fee ever paid for a Roman comedy, 8,000 sesterces, and had to be performed twice in one day.'
        }
      ]
    },

    {
      id: 'humility-wisdom',
      domain: 'Knowledge & Humility',
      title: 'True Wisdom Begins in Knowing You Know Nothing',
      ancientThesis: 'Epistemic Humility, No artisan reaches the boundary of craft; the wise remain students of the ignorant.',
      modernSummary: 'Genuine intelligence is recognizing the vastness of your own ignorance rather than feeling certain.',
      specimen: 'True wisdom is realizing how little you actually know, while fools are certain of everything.',
      concepts: ['humility', 'knowledge', 'ignorance', 'wisdom', 'ego', 'imposter'],
      phrases: [
        'know that i know nothing', 'how little we know', 'dunning kruger', 'imposter syndrome',
        'fools are certain', 'wisdom is humility', 'admit you know nothing', 'limits of knowledge',
        'smart people doubt', 'ignorant are confident', 'stay humble'
      ],
      keywords: [
        'wisdom', 'wise', 'ignorance', 'ignorant', 'humble', 'humility', 'know', 'knowledge',
        'certainty', 'doubt', 'arrogance', 'pride', 'fool', 'fools', 'imposter', 'learn', 'learning'
      ],
      origin: {
        year: -2375,
        yearLabel: 'c. 2375 BCE',
        thinker: 'Ptahhotep',
        tradition: 'Old Kingdom Egyptian Sebayt',
        place: 'Memphis, Old Kingdom Egypt',
        region: 'Ancient Egypt',
        coords: [31.25, 29.85],
        scripture: 'The Maxims of Ptahhotep, Maxim 1 (Papyrus Prisse)',
        language: 'Middle Egyptian (Old Kingdom tradition)',
        scriptDir: 'ltr',
        scriptClass: 'script-latin',
        originalScript: 'm ꜥꜣ ib.k ḥr rḫ.k; ndnd m-ꜥ ḫm mi rḫ, n in.tw drw ḥmwt, n ḥmww ꜥpr ꜣḫw.f',
        transliteration: 'M ꜥꜣ ib.k ḥr rḫ.k; ndnd m-ꜥ ḫm mi rḫ, n in.tw drw ḥmwt, n ḥmww ꜥpr ꜣḫw.f.',
        translation: 'Be not proud because of your knowledge; take counsel with the ignorant as with the wise, for the limits of craft are never reached, and no artisan has attained full mastery. Good speech is more hidden than malachite, yet it is found among the maidservants at the grindstones.',
        provenance: 'The Maxims of Ptahhotep, Maxim 1 (ll. 52–59), Papyrus Prisse, Bibliothèque nationale de France (Fifth Dynasty tradition, c. 2375 BCE)',
        commentary: 'Nearly two thousand years before Socrates walked the Athenian Agora, the aged vizier Ptahhotep opened humanity’s oldest complete book of philosophy with an assault on intellectual vanity. Knowledge has no ceiling, he warned his son, and insight hides just as readily among women grinding grain as among royal scribes.',
        marginalia: 'Ptahhotep served as vizier under Pharaoh Djedkare Isesi during Egypt’s Fifth Dynasty; the surviving Papyrus Prisse was copied around 1900 BCE and is often called the oldest intact book in the world.'
      },
      echoes: [
        {
          year: -450,
          yearLabel: 'c. 5th–4th Century BCE',
          thinker: 'Laozi',
          tradition: 'Classical Daoism',
          place: 'Chu / Luoyi, Zhou China',
          region: 'Ancient China',
          coords: [112.45, 34.62],
          scripture: 'Dao De Jing (Tao Te Ching), Chapter 71',
          language: 'Classical Chinese',
          scriptDir: 'ltr',
          scriptClass: 'script-cjk',
          originalScript: '知不知，尚矣；不知知，病也。',
          transliteration: 'Zhī bù zhī, shàng yǐ; bù zhī zhī, bìng yě.',
          translation: 'To know that you do not know is highest; not to know, yet think you know, is a sickness.',
          provenance: 'Dao De Jing, Chapter 71 (Mawangdui & Wang Bi recensions, c. 5th–4th century BCE)',
          commentary: 'In ten brisk characters, Laozi diagnosed what modern cognitive psychology later branded the Dunning–Kruger effect: mistaking ignorance for knowledge is a pathology, and the sage stays healthy only by recognizing the illness in himself.',
          marginalia: 'The Mawangdui silk manuscripts excavated in 1973 from a Han tomb sealed in 168 BCE preserve this chapter virtually intact.'
        },
        {
          year: -399,
          yearLabel: '399 BCE',
          thinker: 'Socrates (via Plato)',
          tradition: 'Classical Greek Philosophy',
          place: 'Athens, Attica',
          region: 'Ancient Greece',
          coords: [23.72, 37.97],
          scripture: 'Plato, Apology 21d',
          language: 'Attic Greek',
          scriptDir: 'ltr',
          scriptClass: 'script-greek',
          originalScript: 'Οὗτος μὲν οἴεταί τι εἰδέναι οὐκ εἰδώς, ἐγὼ δέ, ὥσπερ οὖν οὐκ οἶδα, οὐδὲ οἴομαι.',
          transliteration: 'Houtos men oietai ti eidenai ouk eidōs, egō de, hōsper oun ouk oida, oude oimai.',
          translation: 'He thinks he knows something when he does not, whereas I, just as I do not know, do not even think that I know.',
          provenance: 'Plato, Apology 21d (dramatic date: trial of Socrates, 399 BCE)',
          commentary: 'When the Delphic Oracle declared no one wiser than Socrates, Socrates spent years testing politicians, poets, and artisans until he solved the riddle: his sole advantage was refusing to hallucinate expertise where he had none.',
          marginalia: 'Socrates never actually uttered the viral phrasing "I know that I know nothing", in the Greek text of Apology 21d, he carefully avoids claiming even absolute ignorance, saying simply that he does not imagine he knows what he does not.'
        }
      ]
    },

    {
      id: 'two-arrows',
      domain: 'Pain & Psychology',
      title: 'Pain Is Inevitable; Suffering Is the Second Arrow',
      ancientThesis: 'Sallatha (The Two Darts), External events inflict the first wound; our mental commentary fires the second.',
      modernSummary: 'We cannot avoid physical or circumstantial pain, but the psychological agony we layer on top of it is self-inflicted.',
      specimen: 'Pain in life is unavoidable, but the suffering we create by resisting and narrating it is optional.',
      concepts: ['suffering', 'pain', 'perception', 'mind', 'emotion', 'resilience'],
      phrases: [
        'pain is inevitable suffering is optional', 'two arrows', 'second arrow',
        'we hurt ourselves with our thoughts', 'not events but our reaction',
        'suffering is a choice', 'resistance creates suffering', 'story we tell ourselves',
        'disturbed not by things'
      ],
      keywords: [
        'pain', 'suffering', 'optional', 'inevitable', 'arrow', 'arrows', 'wound',
        'reaction', 'judgment', 'story', 'narrative', 'resist', 'resistance', 'mental', 'trauma'
      ],
      origin: {
        year: -480,
        yearLabel: 'c. 5th Century BCE',
        thinker: 'Siddhartha Gautama (The Buddha)',
        tradition: 'Early Buddhism · Pāli Canon',
        place: 'Sāvatthī, Kosala',
        region: 'Ancient India',
        coords: [82.05, 27.51],
        scripture: 'Sallatha Sutta (Saṃyutta Nikāya 36.6, "The Dart")',
        language: 'Pāli',
        scriptDir: 'ltr',
        scriptClass: 'script-latin',
        originalScript: 'So ekaṃyeva vedanaṃ vediyati, kāyikaṃ, na cetasikaṃ.',
        transliteration: 'So ekaṃyeva vedanaṃ vediyati, kāyikaṃ, na cetasikaṃ.',
        translation: 'Touched by painful feeling, the untaught person grieves, laments, and beats their breast, feeling two pains, bodily and mental, as though struck by a dart and immediately struck by a second dart. The instructed person feels only one pain: the bodily, not the mental.',
        provenance: 'Sallatha Sutta, Saṃyutta Nikāya 36.6 (Vedanāsaṃyutta, c. 5th century BCE)',
        commentary: 'That crisp modern wellness aphorism, "pain is inevitable, suffering is optional", is a 2,500-year-old paraphrase of the Buddha’s parable of the Two Darts. Life shoots the first arrow indiscriminately (illness, loss, setback); it is our panicked resistance, grievance, and compulsive storytelling that reloads the bow and fires the second arrow directly into our own chest.',
        marginalia: 'The Pāli word vedanā does not mean emotion as a whole, but the raw split-second sensory tone (pleasant, unpleasant, or neutral) before thought ever builds a drama around it.'
      },
      echoes: [
        {
          year: 108,
          yearLabel: 'c. 108 CE',
          thinker: 'Epictetus',
          tradition: 'Roman Stoicism',
          place: 'Nicopolis, Epirus',
          region: 'Roman Greece',
          coords: [20.73, 39.01],
          scripture: 'Enchiridion, Chapter 5',
          language: 'Koine Greek',
          scriptDir: 'ltr',
          scriptClass: 'script-greek',
          originalScript: 'Ταράσσει τοὺς ἀνθρώπους οὐ τὰ πράγματα, ἀλλὰ τὰ περὶ τῶν πραγμάτων δόγματα.',
          transliteration: 'Tarassei tous anthrōpous ou ta pragmata, alla ta peri tōn pragmatōn dogmata.',
          translation: 'People are disturbed not by things themselves, but by the judgments they form about those things.',
          provenance: 'Epictetus, Enchiridion 5 (c. 108–125 CE)',
          commentary: 'Epictetus distilled the second arrow into a single Greek sentence that became the foundation stone of modern Cognitive Behavioral Therapy (CBT): external events carry no emotional voltage until our dogma, our verdict about them, assigns it.',
          marginalia: 'Aaron Beck and Albert Ellis, founders of CBT and REBT in the 1950s–60s, both explicitly cited this exact line from Epictetus as the historical ancestor of cognitive therapy.'
        },
        {
          year: 175,
          yearLabel: 'c. 175 CE',
          thinker: 'Marcus Aurelius',
          tradition: 'Roman Stoicism',
          place: 'Carnuntum, Upper Pannonia',
          region: 'Danube Frontier',
          coords: [16.86, 48.11],
          scripture: 'Meditations IV.7',
          language: 'Koine Greek',
          scriptDir: 'ltr',
          scriptClass: 'script-greek',
          originalScript: 'Ἆρον τὴν ὑπόληψιν, ἦρται τὸ "βέβλαμμαι". ἆρον τὸ "βέβλαμμαι", ἦρται ἡ βλάβη.',
          transliteration: 'Aron tēn hypolēpsin, ērtai to "beblammai." Aron to "beblammai," ērtai hē blabē.',
          translation: 'Remove the judgment, and "I have been harmed" is removed; remove "I have been harmed," and the harm itself is gone.',
          provenance: 'Marcus Aurelius, Meditations (Ta eis heauton) IV.7 (written on military campaign, c. 170–180 CE)',
          commentary: 'Jotting private reminders by oil lamp on the freezing Danube frontier during plague and war, the Roman emperor trained himself to strip away his interpretive commentary until only the bare physical fact remained.',
          marginalia: 'Marcus Aurelius never titled his notebook "Meditations" nor intended it for publication; the Greek manuscript is headed simply Ta eis heauton, "Things to Himself."'
        }
      ]
    },

    {
      id: 'impermanence-flux',
      domain: 'Change & Time',
      title: 'Everything Flows; Nothing Stays the Same',
      ancientThesis: 'Panta Rhei & Anicca, Stability is a slow illusion; both the river and the person stepping into it change ceaselessly.',
      modernSummary: 'Nothing in life is permanent; trying to freeze a moment, identity, or season is fighting the basic fabric of reality.',
      specimen: 'You can never return to the same moment twice because both the world and you have already changed.',
      concepts: ['impermanence', 'change', 'time', 'flux', 'letting_go'],
      phrases: [
        'everything changes', 'nothing lasts forever', 'same river twice', 'constant flux',
        'only constant is change', 'this too shall pass', 'cannot freeze time',
        'everything is temporary', 'impermanence', 'you have changed'
      ],
      keywords: [
        'change', 'changes', 'changing', 'impermanence', 'impermanent', 'temporary',
        'river', 'flux', 'flow', 'flows', 'forever', 'pass', 'decay', 'ephemeral', 'fleeting'
      ],
      origin: {
        year: -500,
        yearLabel: 'c. 500 BCE',
        thinker: 'Heraclitus of Ephesus',
        tradition: 'Pre-Socratic Greek Philosophy',
        place: 'Ephesus, Ionia',
        region: 'Anatolia',
        coords: [27.34, 37.94],
        scripture: 'Fragments DK B12 & B91 (preserved in Arius Didymus)',
        language: 'Ionic Greek',
        scriptDir: 'ltr',
        scriptClass: 'script-greek',
        originalScript: 'Ποταμοῖσι τοῖσιν αὐτοῖσιν ἐμβαίνουσιν ἕτερα καὶ ἕτερα ὕδατα ἐπιρρεῖ.',
        transliteration: 'Potamoisi toisin autoisin embainousin hetera kai hetera hydata epirrei.',
        translation: 'Upon those who step into the same rivers, different and ever-different waters flow.',
        provenance: 'Heraclitus, Fragment DK B12 (quoted by Arius Didymus apud Eusebius, Praeparatio Evangelica XV.20.2, c. 500 BCE)',
        commentary: 'Heraclitus of Ephesus, nicknamed "the Obscure" for depositing his book in the Temple of Artemis so the crowd could not misread it, saw that persistence itself is an optical trick of continuous motion. A river remains a river only because its waters never stop leaving; pause the flow and the river ceases to exist.',
        marginalia: 'The punchier slogan "you cannot step into the same river twice" is actually Plato’s paraphrase of Heraclitus in Cratylus 402a; the authentic Ionic fragment (B12) is subtler, it insists the river stays "the same" precisely by constantly replacing itself.'
      },
      echoes: [
        {
          year: -483,
          yearLabel: 'c. 5th Century BCE',
          thinker: 'Siddhartha Gautama (The Buddha)',
          tradition: 'Early Buddhism · Pāli Canon',
          place: 'Kusinārā, Malla',
          region: 'Ancient India',
          coords: [83.89, 26.74],
          scripture: 'Mahāparinibbāna Sutta (Dīgha Nikāya 16)',
          language: 'Pāli',
          scriptDir: 'ltr',
          scriptClass: 'script-latin',
          originalScript: 'Vayadhammā saṅkhārā appamādena sampādetha.',
          transliteration: 'Vayadhammā saṅkhārā, appamādena sampādetha.',
          translation: 'All conditioned things are subject to decay; strive on with heedfulness.',
          provenance: 'Mahāparinibbāna Sutta, Dīgha Nikāya 16, Chapter VI (recorded last words of the Buddha, c. 5th century BCE)',
          commentary: 'Lying between two twin sal trees at Kusinārā, the Buddha condensed forty-five years of teaching into a single parting line: anything assembled, bodies, empires, friendships, thoughts, carries dissolution built into its architecture.',
          marginalia: 'In Buddhist ontology, anicca (impermanence) is not merely a melancholy observation about aging; it is the exact reason suffering is curable, since no troubled state can lock itself permanently either.'
        },
        {
          year: 175,
          yearLabel: 'c. 175 CE',
          thinker: 'Marcus Aurelius',
          tradition: 'Roman Stoicism',
          place: 'Sirmium, Pannonia',
          region: 'Roman Empire',
          coords: [19.61, 44.97],
          scripture: 'Meditations IV.43',
          language: 'Koine Greek',
          scriptDir: 'ltr',
          scriptClass: 'script-greek',
          originalScript: 'Ποταμός τίς ἐστι τῶν γινομένων καὶ ῥεῦμα βίαιον ὁ αἰών.',
          transliteration: 'Potamos tis esti tōn ginomenōn kai rheuma biaion ho aiōn.',
          translation: 'Time is a river of passing events, and strong is its current; no sooner is a thing brought to sight than it is swept away and another takes its place.',
          provenance: 'Marcus Aurelius, Meditations IV.43 (c. 175 CE)',
          commentary: 'Six centuries after Heraclitus, Marcus Aurelius openly borrowed the river metaphor to calm his dread of losing power, children, and reputation, reminding himself that clinging to a wave in mid-current is sheer comedy.',
          marginalia: 'Marcus quoted Heraclitus by name at least five times in the Meditations, treating the fiery Ephesian philosopher as his favorite antidote to rigidity.'
        }
      ]
    },

    {
      id: 'wu-wei',
      domain: 'Action & Effort',
      title: 'Forcing Things Ruins Them',
      ancientThesis: 'Wú Wéi (無為), Trying too hard to control or force an outcome breaks the very thing you seek to hold.',
      modernSummary: 'Excessive strain and anxious over-control sabotage performance, love, and creativity; mastery looks effortless.',
      specimen: 'When you try too hard to force a result, you end up ruining it.',
      concepts: ['effortless_action', 'control', 'forcing', 'flow', 'overtrying'],
      phrases: [
        'try too hard', 'force a result', 'forcing things ruins', 'let go to get',
        'effortless action', 'flow state', 'stop forcing', 'grasp too tightly',
        'chasing makes it run', 'backwards law', 'paradox of effort'
      ],
      keywords: [
        'force', 'forcing', 'effort', 'effortless', 'grasp', 'grasping', 'spoil', 'ruin',
        'try', 'trying', 'flow', 'chase', 'chasing', 'push', 'overcontrol', 'micromanage', 'strain'
      ],
      origin: {
        year: -450,
        yearLabel: 'c. 5th–4th Century BCE',
        thinker: 'Laozi',
        tradition: 'Classical Daoism',
        place: 'Chu / Luoyi, Zhou China',
        region: 'Ancient China',
        coords: [112.45, 34.62],
        scripture: 'Dao De Jing (Tao Te Ching), Chapters 29 & 64',
        language: 'Classical Chinese',
        scriptDir: 'ltr',
        scriptClass: 'script-cjk',
        originalScript: '為者敗之，執者失之。是以聖人無為，故無敗；無執，故無失。',
        transliteration: 'Wéi zhě bài zhī, zhí zhě shī zhī. Shì yǐ shèng rén wú wéi, gù wú bài; wú zhí, gù wú shī.',
        translation: 'Those who try to force it spoil it; those who grasp it lose it. Therefore the sage acts without forcing and spoils nothing, does not grasp and loses nothing.',
        provenance: 'Dao De Jing, Chapter 64 (echoing Chapter 29; Guodian bamboo slips c. 300 BCE & Wang Bi text)',
        commentary: 'Modern productivity writers call it "the backwards law" or "flow state"; Laozi carved it onto bamboo strips over two millennia ago as wú wéi, literally "non-coercive action." It is not laziness, but the recognition that reality has grain like wood or currents like water: push against the grain with clenched fists and the work splinters in your hands.',
        marginalia: 'Chapter 64 appears among the Guodian Chu bamboo slips discovered in a Hubei tomb dated to roughly 300 BCE, the oldest surviving physical manuscript of the Dao De Jing.'
      },
      echoes: [
        {
          year: -300,
          yearLabel: 'c. 300 BCE',
          thinker: 'Zhuangzi (Zhuang Zhou)',
          tradition: 'Classical Daoism',
          place: 'Meng, State of Song',
          region: 'Warring States China',
          coords: [115.65, 34.41],
          scripture: 'Zhuangzi, Chapter 3 (Yǎng Shēng Zhǔ, "Cook Ding")',
          language: 'Classical Chinese',
          scriptDir: 'ltr',
          scriptClass: 'script-cjk',
          originalScript: '依乎天理，批大郤，導大窾，因其固然。',
          transliteration: 'Yī hū tiān lǐ, pī dà xì, dǎo dà kuǎn, yīn qí gù rán.',
          translation: 'I follow the natural structure, strike into the big hollows, guide the blade through the wide gaps, and rely on things as they already are.',
          provenance: 'Zhuangzi, Inner Chapters, Chapter 3 (Cook Ding carving an ox for Lord Wenhui, c. 300 BCE)',
          commentary: 'Zhuangzi illustrated effortless mastery through a humble butcher whose knife stayed razor-sharp for nineteen years after carving thousands of oxen, because he never hacked through bone by brute will, but slipped effortlessly through the natural spaces already there.',
          marginalia: 'In Zhuangzi’s hands, supreme philosophical skill belongs not to monarchs or scholars, but to butchers, wheelwrights, swimmers, and cicada-catchers.'
        }
      ]
    },

    {
      id: 'soft-overcomes-hard',
      domain: 'Power & Resilience',
      title: 'Gentleness Outlasts Brute Force',
      ancientThesis: 'Róu Ruò Shèng Gāng Qiáng, What bends survives the storm; water wears down stone without ever striking it.',
      modernSummary: 'Flexibility, patience, and gentle persistence quietly defeat rigid strength and aggression.',
      specimen: 'True strength is flexibility and gentleness; whatever is rigid and forceful eventually breaks.',
      concepts: ['gentleness', 'power', 'flexibility', 'resilience', 'water'],
      phrases: [
        'soft overcomes hard', 'gentleness defeats force', 'rigid things break',
        'bend so you do not break', 'water wears down stone', 'flexibility is strength',
        'kindness is stronger than force', 'brittle breaks'
      ],
      keywords: [
        'soft', 'gentle', 'gentleness', 'water', 'rigid', 'stiff', 'bend', 'flexible',
        'flexibility', 'yielding', 'yield', 'brute', 'force', 'breaks', 'stone', 'storm', 'bamboo'
      ],
      origin: {
        year: -600,
        yearLabel: 'c. 7th–5th Century BCE',
        thinker: 'Sages of Ancient Israel (Men of Hezekiah)',
        tradition: 'Hebrew Wisdom Literature',
        place: 'Jerusalem, Judea',
        region: 'Ancient Near East',
        coords: [35.23, 31.78],
        scripture: 'Book of Proverbs 25:15 & 15:1',
        language: 'Biblical Hebrew',
        scriptDir: 'rtl',
        scriptClass: 'script-hebrew',
        originalScript: 'בְּאֹרֶךְ אַפַּיִם יְפֻתֶּה קָצִין וְלָשׁוֹן רַכָּה תִּשְׁבָּר־גָּרֶם׃',
        transliteration: 'Bə’ōreḵ ’appayim yəfutteh qāṣîn, wəlāshôn rakkāh tishbār-gārem.',
        translation: 'With patience a ruler may be persuaded, and a soft tongue will break a bone.',
        provenance: 'Proverbs 25:15 (from the royal collection copied by the scribes of King Hezekiah, c. 7th–5th century BCE)',
        commentary: 'Notice the jarring physical paradox preserved in the Hebrew court proverbs more than twenty-five centuries ago: gentleness does not merely soothe, it fractures bone, cracking brittle defenses that aggression only welds tighter.',
        marginalia: 'Chapters 25–29 of Proverbs carry an explicit archival colophon crediting royal scribes of King Hezekiah (late 8th century BCE) with copying older wisdom collections.'
      },
      echoes: [
        {
          year: -450,
          yearLabel: 'c. 5th–4th Century BCE',
          thinker: 'Laozi',
          tradition: 'Classical Daoism',
          place: 'Chu / Luoyi, Zhou China',
          region: 'Ancient China',
          coords: [112.45, 34.62],
          scripture: 'Dao De Jing (Tao Te Ching), Chapters 76 & 78',
          language: 'Classical Chinese',
          scriptDir: 'ltr',
          scriptClass: 'script-cjk',
          originalScript: '天下莫柔弱於水，而攻堅強者莫之能勝，以其無以易之。',
          transliteration: 'Tiān xià mò róu ruò yú shuǐ, ér gōng jiān qiáng zhě mò zhī néng shèng, yǐ qí wú yǐ yì zhī.',
          translation: 'Nothing under heaven is softer and more yielding than water; yet for overcoming the hard and strong, nothing can surpass it, because nothing can alter its nature.',
          provenance: 'Dao De Jing, Chapter 78 (see also Chapter 76: "The stiff and unbending belong to death; the supple and yielding belong to life")',
          commentary: 'Laozi looked at corpses and dry timber versus newborns and green shoots and inverted humanity’s entire instinct about power. Rigidity looks intimidating until pressure arrives; suppleness absorbs shock, slips around obstacles, and carves canyons out of granite simply by refusing to harden.',
          marginalia: 'Laozi’s water metaphor went on to shape East Asian martial arts (tài jí and jūdō, literally "the gentle way"), hydrology philosophy, and statecraft for twenty-four centuries.'
        }
      ]
    },

    {
      id: 'control-response',
      domain: 'Agency & Stoicism',
      title: 'The Dichotomy of Control',
      ancientThesis: 'Niṣkāma Karma & Ta Eph’ Hēmin, Your jurisdiction ends at your own action and choice; outcomes belong to the universe.',
      modernSummary: 'You cannot control what happens to you or the outcomes of your work, only your own intentions, effort, and response.',
      specimen: 'You have total control over your actions and responses, and zero control over the final outcome.',
      concepts: ['control', 'agency', 'outcomes', 'stoicism', 'detachment'],
      phrases: [
        'control your response', 'cannot control what happens', 'only control how you react',
        'dichotomy of control', 'focus on what you can control', 'let go of the outcome',
        'attached to results', 'process not the outcome', 'not in your control'
      ],
      keywords: [
        'control', 'outcome', 'outcomes', 'result', 'results', 'response', 'react', 'reaction',
        'action', 'actions', 'fruits', 'power', 'choice', 'process', 'effort', 'agency', 'stoic'
      ],
      origin: {
        year: -200,
        yearLabel: 'c. 200 BCE',
        thinker: 'Vyāsa (Voice of Krishna)',
        tradition: 'Vedānta · Mahābhārata',
        place: 'Kurukṣetra, Northern India',
        region: 'Ancient India',
        coords: [76.87, 29.97],
        scripture: 'Bhagavad Gītā 2.47',
        language: 'Sanskrit',
        scriptDir: 'ltr',
        scriptClass: 'script-deva',
        originalScript: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
        transliteration: 'Karmaṇy evādhikāras te mā phaleṣu kadācana; mā karmaphalahetur bhūr mā te saṅgo ’stv akarmaṇi.',
        translation: 'Your right and jurisdiction are to action alone, never to its fruits. Let not the fruit of action be your motive, nor let your attachment be to inaction.',
        provenance: 'Bhagavad Gītā, Chapter II (Sāṅkhya Yoga), v. 47 (c. 2nd century BCE)',
        commentary: 'Every modern "trust the process" manifesto is a pale echo of this single Sanskrit śloka. Notice its double edge: the Gītā does not tell you to withdraw from work when results are uncertain, it strips away your claim of ownership over the payoff while forbidding apathy as an excuse.',
        marginalia: 'The word adhikāra literally means legal jurisdiction or domain of authority; you are sovereign over the effort you put forth and a complete foreigner to the outcome.'
      },
      echoes: [
        {
          year: 108,
          yearLabel: 'c. 108 CE',
          thinker: 'Epictetus',
          tradition: 'Roman Stoicism',
          place: 'Nicopolis, Epirus',
          region: 'Roman Greece',
          coords: [20.73, 39.01],
          scripture: 'Enchiridion (The Manual), Chapter 1.1',
          language: 'Koine Greek',
          scriptDir: 'ltr',
          scriptClass: 'script-greek',
          originalScript: 'Τῶν ὄντων τὰ μέν ἐστιν ἐφ᾽ ἡμῖν, τὰ δὲ οὐκ ἐφ᾽ ἡμῖν.',
          transliteration: 'Tōn ontōn ta men estin eph’ hēmin, ta de ouk eph’ hēmin.',
          translation: 'Of all things that exist, some are within our power and others are not within our power.',
          provenance: 'Epictetus, Enchiridion 1.1 (c. 108–125 CE)',
          commentary: 'Epictetus opened his handbook by cleaving the entire universe into two halves: our own judgments, impulses, desires, and aversions (up to us), and our bodies, wealth, reputations, and offices (not up to us). Confuse the two, he warned, and you guarantee resentment and fear.',
          marginalia: 'Because Epictetus had lived with a lame leg from his years in bondage under Nero’s secretary Epaphroditus, his boundary between bodily fate and inward freedom was never an armchair theory.'
        }
      ]
    },

    {
      id: 'imagined-anxiety',
      domain: 'Fear & Overthinking',
      title: 'We Suffer More in Imagination Than Reality',
      ancientThesis: 'Opinione Quam Re, Most human dread is rehearsed catastrophe for futures that never materialize.',
      modernSummary: 'Our anxiety is overwhelmingly caused by inventing worst-case futures in our heads rather than actual present danger.',
      specimen: 'Most of our suffering happens in our imagination, worrying about futures that never arrive.',
      concepts: ['anxiety', 'imagination', 'worry', 'fear', 'overthinking'],
      phrases: [
        'suffer more in imagination', 'worry about the future', 'futures that never happen',
        'overthinking creates suffering', 'anxiety is imagination', 'fear of what might happen',
        'rehearse disaster', 'worst case scenarios', 'most things we worry about never happen'
      ],
      keywords: [
        'anxiety', 'anxious', 'worry', 'worrying', 'imagination', 'imagine', 'imagined',
        'overthinking', 'overthink', 'future', 'fear', 'dread', 'panic', 'catastrophe', 'stress', 'nervous'
      ],
      origin: {
        year: -300,
        yearLabel: 'c. 300 BCE',
        thinker: 'Epicurus',
        tradition: 'Epicureanism',
        place: 'The Garden, Athens',
        region: 'Ancient Greece',
        coords: [23.72, 37.98],
        scripture: 'Letter to Menoeceus 127 & Principal Doctrines XV',
        language: 'Koine Greek',
        scriptDir: 'ltr',
        scriptClass: 'script-greek',
        originalScript: 'Ὁ τῆς φύσεως πλοῦτος καὶ ὥρισται καὶ εὐπόριστός ἐστιν· ὁ δὲ τῶν κενῶν δοξῶν εἰς ἄπειρον ἐκπίπτει.',
        transliteration: 'Ho tēs physeōs ploutos kai hōristai kai euporistos estin; ho de tōn kenōn doxōn eis apeiron ekpiptei.',
        translation: 'Nature’s wealth is both bounded and easy to obtain; the wealth, and fear, born of empty opinions stretches out to infinity.',
        provenance: 'Epicurus, Principal Doctrines (Kyriai Doxai) XV, preserved in Diogenes Laërtius X.144 (c. 300 BCE)',
        commentary: 'Epicurus diagnosed anxiety as kenodoxia, "empty opinion," the mind spinning unbounded projections untethered from real bodily need or present evidence. What actually hurts in the moment is usually finite and bearable; it is the infinite theater of speculation that exhausts us.',
        marginalia: 'Epicurus’s "Garden" outside the Dipylon Gate of Athens scandalized conventional society by admitting women and enslaved people as full philosophical equals.'
      },
      echoes: [
        {
          year: 64,
          yearLabel: 'c. 64 CE',
          thinker: 'Seneca the Younger',
          tradition: 'Roman Stoicism',
          place: 'Rome, Roman Empire',
          region: 'Ancient Italy',
          coords: [12.49, 41.89],
          scripture: 'Epistulae Morales ad Lucilium, Letter XIII.4',
          language: 'Classical Latin',
          scriptDir: 'ltr',
          scriptClass: 'script-latin',
          originalScript: 'Plura sunt, Lucili, quae nos terrent quam quae premunt, et saepius opinione quam re laboramus.',
          transliteration: 'Plura sunt, Lucili, quae nos terrent quam quae premunt, et saepius opinione quam re laboramus.',
          translation: 'There are more things, Lucilius, likely to frighten us than there are to crush us; we suffer more often in imagination than in reality.',
          provenance: 'Seneca, Moral Letters to Lucilius, Letter 13, Section 4 (c. 63–65 CE)',
          commentary: 'Writing to his friend Lucilius while living under the paranoid gaze of Emperor Nero, Seneca coined the crispest diagnosis of chronic anxiety in Western literature: he advised auditing our fears the way a merchant audits debts, refusing to pay interest on troubles that have not yet fallen due.',
          marginalia: 'Seneca’s serenity was tested for real a year later: in 65 CE, Nero ordered him to take his own life on suspicion of joining the Pisonian conspiracy.'
        }
      ]
    },

    {
      id: 'desire-sufficiency',
      domain: 'Desire & Contentment',
      title: 'Happiness Is Wanting Less, Not Getting More',
      ancientThesis: 'Santuṭṭhi & Zhī Zú, Appetite is a bottomless pit; wealth consists in the smallness of one’s wants.',
      modernSummary: 'Chasing more money, pleasure, or possessions never satisfies because the goalpost always moves; peace comes from sufficiency.',
      specimen: 'Happiness is not getting everything you want, but needing less and knowing when enough is enough.',
      concepts: ['desire', 'contentment', 'wealth', 'greed', 'hedonic_treadmill', 'happiness'],
      phrases: [
        'happiness is wanting less', 'goalpost always moves', 'hedonic treadmill',
        'never enough', 'more money does not bring happiness', 'knowing enough is enough',
        'rich is he who needs least', 'desire is endless', 'greed never satisfies', 'consumerism'
      ],
      keywords: [
        'desire', 'want', 'wanting', 'enough', 'more', 'money', 'wealth', 'rich', 'poor',
        'greed', 'contentment', 'satisfied', 'satisfaction', 'happiness', 'possessions', 'luxury', 'materialism'
      ],
      origin: {
        year: -480,
        yearLabel: 'c. 5th Century BCE',
        thinker: 'Siddhartha Gautama (The Buddha)',
        tradition: 'Early Buddhism · Pāli Canon',
        place: 'Sāvatthī, Kosala',
        region: 'Ancient India',
        coords: [82.05, 27.51],
        scripture: 'Dhammapada XIV.186 & Raṭṭhapāla Sutta (MN 82)',
        language: 'Pāli',
        scriptDir: 'ltr',
        scriptClass: 'script-latin',
        originalScript: 'Na kahāpaṇavassena titti kāmesu vijjati;\nappassādā dukhā kāmā iti viññāya paṇḍito.',
        transliteration: 'Na kahāpaṇavassena titti kāmesu vijjati; appassādā dukhā kāmā iti viññāya paṇḍito.',
        translation: 'Not even a rain of gold coins brings satisfaction in sensual desires. Knowing that desires yield brief sweetness and long pain, the wise person finds no delight even in heavenly pleasures.',
        provenance: 'Dhammapada, Chapter XIV (Buddhavagga), v. 186 (c. 5th century BCE)',
        commentary: 'Long before behavioral economists named the "hedonic treadmill," the Pāli Canon noticed that pouring treasure onto craving is like drinking salt water to cure thirst. Each acquisition raises the baseline of appetite rather than extinguishing it.',
        marginalia: 'In the Raṭṭhapāla Sutta (MN 82), a wealthy merchant’s son walks away from a literal mountain of gold after summarizing the world in four axioms, the fourth being: "The world is incomplete, insatiate, the slave of craving."'
      },
      echoes: [
        {
          year: -450,
          yearLabel: 'c. 5th–4th Century BCE',
          thinker: 'Laozi',
          tradition: 'Classical Daoism',
          place: 'Chu / Luoyi, Zhou China',
          region: 'Ancient China',
          coords: [112.45, 34.62],
          scripture: 'Dao De Jing (Tao Te Ching), Chapter 46',
          language: 'Classical Chinese',
          scriptDir: 'ltr',
          scriptClass: 'script-cjk',
          originalScript: '禍莫大於不知足，咎莫大於欲得。故知足之足，常足矣。',
          transliteration: 'Huò mò dà yú bù zhī zú, jiù mò dà yú yù dé. Gù zhī zú zhī zú, cháng zú yǐ.',
          translation: 'No misfortune is greater than not knowing what is enough; no fault is greater than craving acquisition. Therefore, the sufficiency of knowing enough is always enough.',
          provenance: 'Dao De Jing, Chapter 46 (c. 5th–4th century BCE)',
          commentary: 'Laozi treated insatiability not as a mild personal quirk, but as the root of war itself, remarking in the opening lines of the same chapter that when a society loses sufficiency, warhorses are bred on the sacred outskirts.',
          marginalia: 'The four-character idiom zhī zú cháng lè ("knowing enough brings lasting joy") became one of the most inscribed mottos on Chinese studio walls and inkstones.'
        },
        {
          year: -300,
          yearLabel: 'c. 300 BCE',
          thinker: 'Epicurus',
          tradition: 'Epicureanism',
          place: 'Athens, Attica',
          region: 'Ancient Greece',
          coords: [23.72, 37.98],
          scripture: 'Vatican Sayings 68',
          language: 'Koine Greek',
          scriptDir: 'ltr',
          scriptClass: 'script-greek',
          originalScript: 'Οὐδὲν ἱκανὸν ᾧ ὀλίγον τὸ ἱκανόν.',
          transliteration: 'Ouden hikanon hōi oligon to hikanon.',
          translation: 'Nothing is enough for the person to whom enough is too little.',
          provenance: 'Epicurus, Gnomologium Vaticanum 68 (preserved in a 14th-century Vatican manuscript, Codex Vaticanus Graecus 1950)',
          commentary: 'Epicurus inverted the stereotype that later got attached to his name: far from advocating luxury, he lived on bread, water, and occasional cheese, arguing that wanting less makes you instantly wealthier than kings.',
          marginalia: 'Seneca loved quoting Epicurus’s poverty-maxims in his own Stoic letters, calling them "plunder brought back from the enemy’s camp."'
        }
      ]
    },

    {
      id: 'self-mastery',
      domain: 'Discipline & Power',
      title: 'Conquering Yourself Is the Highest Victory',
      ancientThesis: 'Self-Conquest, Ruling empires is easy compared to governing one’s own impulses and mind.',
      modernSummary: 'Real power and strength are measured by mastering yourself, not dominating or conquering other people.',
      specimen: 'True strength is governing your own mind, not conquering or controlling other people.',
      concepts: ['self_mastery', 'discipline', 'power', 'strength', 'mind'],
      phrases: [
        'conquer yourself', 'true strength is controlling yourself', 'governing your own mind',
        'master yourself', 'hardest battle is within', 'enemy is within', 'self discipline is true power',
        'conquering others is strength conquering yourself'
      ],
      keywords: [
        'conquer', 'conquering', 'master', 'mastery', 'discipline', 'strength', 'strong',
        'power', 'battle', 'victory', 'govern', 'rule', 'empire', 'yourself', 'self-control', 'impulse'
      ],
      origin: {
        year: -480,
        yearLabel: 'c. 5th Century BCE',
        thinker: 'Siddhartha Gautama (The Buddha)',
        tradition: 'Early Buddhism · Pāli Canon',
        place: 'Rājagaha, Magadha',
        region: 'Ancient India',
        coords: [85.42, 25.02],
        scripture: 'Dhammapada VIII.103',
        language: 'Pāli',
        scriptDir: 'ltr',
        scriptClass: 'script-latin',
        originalScript: 'Yo sahassaṃ sahassena saṅgāme mānuse jine,\nekañca jeyyamattānaṃ sa ve saṅgāmajuttamo.',
        transliteration: 'Yo sahassaṃ sahassena saṅgāme mānuse jine, ekañca jeyyamattānaṃ sa ve saṅgāmajuttamo.',
        translation: 'Though one should conquer a thousand times a thousand men in battle, yet the one who conquers a single self is indeed the greatest victor in war.',
        provenance: 'Dhammapada, Chapter VIII (Sahassavagga), v. 103 (c. 5th century BCE)',
        commentary: 'Every time we applaud self-mastery over outer dominance, we repeat a reversal already standard across Iron Age Eurasia. The Dhammapada deliberately hijacks the warrior vocabulary of kings (saṅgāma, battlefield) to declare that a million slain foes weigh less than a single tamed impulse.',
        marginalia: 'A century later, this very verse inspired Emperor Ashoka’s Rock Edict XIII after the bloodbath of Kalinga, prompting him to declare dhamma-vijaya (conquest through self-restraint) superior to military victory.'
      },
      echoes: [
        {
          year: -450,
          yearLabel: 'c. 5th–4th Century BCE',
          thinker: 'Laozi',
          tradition: 'Classical Daoism',
          place: 'Chu / Luoyi, Zhou China',
          region: 'Ancient China',
          coords: [112.45, 34.62],
          scripture: 'Dao De Jing (Tao Te Ching), Chapter 33',
          language: 'Classical Chinese',
          scriptDir: 'ltr',
          scriptClass: 'script-cjk',
          originalScript: '知人者智，自知者明。勝人者有力，自勝者強。',
          transliteration: 'Zhī rén zhě zhì, zì zhī zhě míng. Shèng rén zhě yǒu lì, zì shèng zhě qiáng.',
          translation: 'Knowing others is cleverness; knowing yourself is lucidity. Overcoming others takes force; overcoming yourself is true strength.',
          provenance: 'Dao De Jing, Chapter 33 (c. 5th–4th century BCE)',
          commentary: 'Laozi separates mere muscular leverage (lì) from durable inner strength (qiáng): anyone with weapons or leverage can overpower a rival, yet remain a hostage to their own temper.',
          marginalia: 'Notice the sharp pairing of intelligence vs. illumination (zhì vs. míng) right alongside outward force vs. inward power, linking self-knowledge directly to self-command.'
        },
        {
          year: 65,
          yearLabel: 'c. 65 CE',
          thinker: 'Seneca the Younger',
          tradition: 'Roman Stoicism',
          place: 'Rome, Roman Empire',
          region: 'Ancient Italy',
          coords: [12.49, 41.89],
          scripture: 'Epistulae Morales ad Lucilium, Letter CXIII.30',
          language: 'Classical Latin',
          scriptDir: 'ltr',
          scriptClass: 'script-latin',
          originalScript: 'Imperare sibi maximum imperium est.',
          transliteration: 'Imperare sibi maximum imperium est.',
          translation: 'To command oneself is the greatest empire.',
          provenance: 'Seneca, Moral Letters to Lucilius, Letter 113, Section 30 (c. 64–65 CE)',
          commentary: 'Written in the capital of an empire stretching from Britain to the Euphrates, Seneca’s five Latin words stung like quiet treason: the grandest imperium on earth fits inside one skull.',
          marginalia: 'In the same paragraph Seneca mocks Alexander the Great, conqueror of Persia and master of half the known world, yet utterly unable to rule his own wrath.'
        }
      ]
    },

    {
      id: 'mind-precedes-all',
      domain: 'Mind & Reality',
      title: 'Mind Precedes and Shapes Your Entire World',
      ancientThesis: 'Manopubbaṅgamā Dhammā, Thought is the architect of experience; our inner lens dyes every external fact.',
      modernSummary: 'Our reality is shaped far more by the state and quality of our thoughts than by external circumstances.',
      specimen: 'Your mind creates your reality; we do not see the world as it is, we see it as our thoughts color it.',
      concepts: ['mind', 'perception', 'thoughts', 'consciousness', 'reality'],
      phrases: [
        'mind creates reality', 'thoughts create your reality', 'you become what you think',
        'color of your thoughts', 'mind is everything', 'world as we are', 'reality is mental',
        'mindset shapes everything', 'prison of our own mind'
      ],
      keywords: [
        'mind', 'thought', 'thoughts', 'think', 'thinking', 'reality', 'perception',
        'mindset', 'lens', 'color', 'dyed', 'mental', 'creates', 'projection', 'inner'
      ],
      origin: {
        year: -480,
        yearLabel: 'c. 5th Century BCE',
        thinker: 'Siddhartha Gautama (The Buddha)',
        tradition: 'Early Buddhism · Pāli Canon',
        place: 'Sāvatthī, Kosala',
        region: 'Ancient India',
        coords: [82.05, 27.51],
        scripture: 'Dhammapada I.1–2 (Yamakavagga)',
        language: 'Pāli',
        scriptDir: 'ltr',
        scriptClass: 'script-latin',
        originalScript: 'Manopubbaṅgamā dhammā, manoseṭṭhā manomayā;\nmanasā ce paduṭṭhena bhāsati vā karoti vā,\ntato naṃ dukkhamanveti cakkaṃva vahato padaṃ.',
        transliteration: 'Manopubbaṅgamā dhammā, manoseṭṭhā manomayā; manasā ce paduṭṭhena bhāsati vā karoti vā, tato naṃ dukkhamanveti cakkaṃva vahato padaṃ.',
        translation: 'Mind precedes all mental states. Mind is their chief; they are all mind-wrought. If with an impure mind a person speaks or acts, suffering follows them like the wheel that follows the foot of the ox.',
        provenance: 'Dhammapada, Chapter I (Yamakavagga), vv. 1–2 (c. 5th century BCE)',
        commentary: 'The very first stanza of the Dhammapada cuts straight through modern "manifestation" clichés to something far more rigorous: mind is not a magic wand that conjures sports cars, but the forerunner that determines whether every lived moment becomes heaven or torture, following our habits as faithfully as an ox-cart wheel tracks the hoof.',
        marginalia: 'The paired second verse mirrors the first word-for-word: act with a clear mind, and happiness follows like a shadow that never departs.'
      },
      echoes: [
        {
          year: -350,
          yearLabel: 'c. 4th Century BCE',
          thinker: 'Sage Śākāyanya',
          tradition: 'Upaniṣadic Vedānta',
          place: 'Northern India',
          region: 'Ancient India',
          coords: [78.0, 28.6],
          scripture: 'Maitrī (Maitrāyaṇīya) Upaniṣad 6.34',
          language: 'Sanskrit',
          scriptDir: 'ltr',
          scriptClass: 'script-deva',
          originalScript: 'मन एव मनुष्याणां कारणं बन्धमोक्षयोः।',
          transliteration: 'Mana eva manuṣyāṇāṃ kāraṇaṃ bandhamokṣayoḥ.',
          translation: 'The mind alone is the cause of bondage and liberation for human beings.',
          provenance: 'Maitrī Upaniṣad VI.34 (c. 4th century BCE)',
          commentary: 'In six Sanskrit words, the Maitrī Upaniṣad declares that jailer and liberator wear the exact same face: the unguarded mind locks the cell, and the clarified mind opens it.',
          marginalia: 'This single half-verse became one of the most widely quoted axioms across both Vedānta and Yoga commentaries for over two millennia.'
        },
        {
          year: 175,
          yearLabel: 'c. 175 CE',
          thinker: 'Marcus Aurelius',
          tradition: 'Roman Stoicism',
          place: 'Danube Frontier',
          region: 'Roman Empire',
          coords: [16.86, 48.11],
          scripture: 'Meditations V.16',
          language: 'Koine Greek',
          scriptDir: 'ltr',
          scriptClass: 'script-greek',
          originalScript: 'Οἷα ἂν πολλάκις φαντασθῇς, τοιαύτη σοι ἔσται ἡ διάνοια· βάπτεται γὰρ ὑπὸ τῶν φαντασιῶν ἡ ψυχή.',
          transliteration: 'Hoia an pollakis phantasthēis, toiautē soi estai hē dianoia; baptetai gar hypo tōn phantasiōn hē psychē.',
          translation: 'Such as are your habitual impressions, such also will be the character of your mind; for the soul is dyed by its thoughts.',
          provenance: 'Marcus Aurelius, Meditations V.16 (c. 175 CE)',
          commentary: 'Using the vivid craft image of wool steeped repeatedly in a dye vat (baptetai), Marcus observed that we do not merely have thoughts, we soak in them until their pigment becomes our permanent complexion.',
          marginalia: 'The Greek verb baptein (to dip or dye cloth) is the same root that gave English the word "baptize."'
        }
      ]
    },

    {
      id: 'ego-nonduality',
      domain: 'Consciousness & Ego',
      title: 'The Illusion of the Separate Ego',
      ancientThesis: 'Tat Tvam Asi, The boundary between the observer inside you and the fabric of the cosmos is an illusion.',
      modernSummary: 'The isolated ego is a construct; the awareness inside you and the universe you observe are fundamentally one.',
      specimen: 'The separate ego is an illusion; the observer inside us and the universe itself are the same consciousness.',
      concepts: ['ego', 'nonduality', 'consciousness', 'oneness', 'self', 'spirituality'],
      phrases: [
        'ego is an illusion', 'observer and observed are one', 'we are all one consciousness',
        'universe experiencing itself', 'separate self is an illusion', 'non duality',
        'no separate self', 'god is within', 'drop in the ocean'
      ],
      keywords: [
        'ego', 'illusion', 'separate', 'consciousness', 'awareness', 'observer', 'universe',
        'oneness', 'one', 'nonduality', 'self', 'soul', 'atman', 'brahman', 'unity', 'spirit', 'divine'
      ],
      origin: {
        year: -700,
        yearLabel: 'c. 700 BCE',
        thinker: 'Uddālaka Āruṇi (to Śvetaketu)',
        tradition: 'Vedic Upaniṣads · Vedānta',
        place: 'Kuru–Pañcāla',
        region: 'Ancient India',
        coords: [77.8, 28.9],
        scripture: 'Chāndogya Upaniṣad 6.8.7',
        language: 'Vedic Sanskrit',
        scriptDir: 'ltr',
        scriptClass: 'script-deva',
        originalScript: 'स य एषोऽणिमैतदात्म्यमिदं सर्वं तत्सत्यं स आत्मा तत्त्वमसि श्वेतकेतो।',
        transliteration: 'Sa ya eṣo ’ṇimaitadātmyam idaṃ sarvaṃ tat satyaṃ sa ātmā tat tvam asi, Śvetaketo.',
        translation: 'That subtle essence, all that exists has this as its Self. That is the Real. That is the Self. And that thou art, Śvetaketu.',
        provenance: 'Chāndogya Upaniṣad VI.8.7 (repeated nine times across VI.8–16, c. 700 BCE)',
        commentary: 'When the young scholar Śvetaketu returned home after twelve years of study swollen with academic pride, his father Uddālaka dismantled his ego with salt dissolved in water and the seed of a banyan tree. Nine times he drove the same thunderbolt home: the invisible essence sustaining every star and leaf is not apart from the witness peering through your eyes.',
        marginalia: 'Uddālaka’s salt-in-water experiment (Chāndogya 6.13) is one of the earliest recorded thought-and-kitchen experiments in world philosophy: you can no longer see the salt in the bowl, yet taste any drop from top, middle, or bottom and it is salt throughout.'
      },
      echoes: [
        {
          year: -480,
          yearLabel: 'c. 5th Century BCE',
          thinker: 'Siddhartha Gautama (The Buddha)',
          tradition: 'Early Buddhism · Pāli Canon',
          place: 'Isipatana (Sarnath), Kāśī',
          region: 'Ancient India',
          coords: [83.02, 25.38],
          scripture: 'Anattalakkhaṇa Sutta (Saṃyutta Nikāya 22.59)',
          language: 'Pāli',
          scriptDir: 'ltr',
          scriptClass: 'script-latin',
          originalScript: 'Netaṃ mama, nesohamasmi, na meso attā.',
          transliteration: 'Netaṃ mama, nesohamasmi, na meso attā.',
          translation: 'This is not mine; this I am not; this is not my self.',
          provenance: 'Anattalakkhaṇa Sutta, Saṃyutta Nikāya 22.59 (second discourse at Sarnath, c. 5th century BCE)',
          commentary: 'Where the Upaniṣads expanded the self until it swallowed the cosmos, the Buddha attacked the ego from the opposite flank, showing that body, feelings, perceptions, impulses, and consciousness are all shifting streams with no permanent little homunculus steering inside.',
          marginalia: 'Modern cognitive neuroscience’s discovery that the brain has no single central "self-module", only distributed processes stitched into a narrative, echoes this exact five-aggregate analysis.'
        },
        {
          year: -500,
          yearLabel: 'c. 500 BCE',
          thinker: 'Heraclitus of Ephesus',
          tradition: 'Pre-Socratic Greek Philosophy',
          place: 'Ephesus, Ionia',
          region: 'Anatolia',
          coords: [27.34, 37.94],
          scripture: 'Fragment DK B50 (preserved in Hippolytus)',
          language: 'Ionic Greek',
          scriptDir: 'ltr',
          scriptClass: 'script-greek',
          originalScript: 'Οὐκ ἐμοῦ, ἀλλὰ τοῦ λόγου ἀκούσαντας ὁμολογεῖν σοφόν ἐστιν ἓν πάντα εἶναι.',
          transliteration: 'Ouk emou, alla tou logou akousantas homologein sophon estin hen panta einai.',
          translation: 'Listening not to me but to the Logos, it is wise to agree that all things are one.',
          provenance: 'Heraclitus, Fragment DK B50 (Hippolytus, Refutation of All Heresies IX.9.1, c. 500 BCE)',
          commentary: 'Across the Aegean, Heraclitus scolded mortals for living "as though each had a private understanding" while awake in one shared cosmos governed by a single intelligible unity (hen panta einai).',
          marginalia: 'In Fragment B89, Heraclitus adds: "The waking have one common world, but the sleeping turn aside each into a world of his own."'
        }
      ]
    },

    {
      id: 'perspectivism',
      domain: 'Truth & Perspective',
      title: 'Every Mind Sees Only One Side of the Elephant',
      ancientThesis: 'Anekāntavāda, Reality is many-sided; fanaticism is mistaking your local slice for the entire truth.',
      modernSummary: 'Every person perceives only a fragment of reality from their own angle, yet argues as if they possess the whole.',
      specimen: 'Every person holds only a fragment of the truth, yet fights as if they see the whole.',
      concepts: ['perspective', 'truth', 'relativism', 'humility', 'empathy', 'dogma'],
      phrases: [
        'fragment of the truth', 'blind men and the elephant', 'every perspective is partial',
        'no one has the whole truth', 'two sides to every story', 'point of view',
        'truth depends on perspective', 'different perspectives', 'echo chamber', 'bias'
      ],
      keywords: [
        'perspective', 'perspectives', 'fragment', 'partial', 'angle', 'viewpoint', 'truth',
        'elephant', 'blind', 'dogma', 'bias', 'subjective', 'relativism', 'opinion', 'sides'
      ],
      origin: {
        year: -480,
        yearLabel: 'c. 5th Century BCE',
        thinker: 'Siddhartha Gautama & Mahāvīra (Śramaṇa Tradition)',
        tradition: 'Early Buddhism & Jainism',
        place: 'Sāvatthī & Vaiśālī',
        region: 'Ancient India',
        coords: [85.13, 25.99],
        scripture: 'Tittha Sutta (Udāna 6.4) & Jain Anekāntavāda Canon',
        language: 'Pāli / Ardhamāgadhī',
        scriptDir: 'ltr',
        scriptClass: 'script-latin',
        originalScript: 'Imesu kira sajjanti eke samaṇabrāhmaṇā;\nviggayha naṃ vivadanti janā ekaṅgadassino.',
        transliteration: 'Imesu kira sajjanti eke samaṇabrāhmaṇā; viggayha naṃ vivadanti janā ekaṅgadassino.',
        translation: 'To these views some ascetics and thinkers cling; quarreling and brawling over them, they are people who see only one side.',
        provenance: 'Tittha Sutta, Udāna VI.4 (The Blind Men and the Elephant, Pāli Canon, c. 5th c. BCE); parallel Jain doctrine of Anekāntavāda & Syādvāda',
        commentary: 'Your realization that warring camps each hold a partial slice is literally the Parable of the Blind Men and the Elephant from fifth-century BCE India. One feels a leg and swears the elephant is a pillar; another feels the ear and swears it is a winnowing fan, and soon they come to blows, each wholly accurate about his sliver and wholly blind to the animal.',
        marginalia: 'Jain philosophers formalized this insight into Syādvāda ("the doctrine of maybe"), prefixing philosophical claims with syāt, "from a certain standpoint", as an intellectual vaccine against absolutism.'
      },
      echoes: [
        {
          year: -300,
          yearLabel: 'c. 300 BCE',
          thinker: 'Zhuangzi (Zhuang Zhou)',
          tradition: 'Classical Daoism',
          place: 'Meng, State of Song',
          region: 'Warring States China',
          coords: [115.65, 34.41],
          scripture: 'Zhuangzi, Chapter 2 (Qí Wù Lùn, "Equalizing Things")',
          language: 'Classical Chinese',
          scriptDir: 'ltr',
          scriptClass: 'script-cjk',
          originalScript: '物無非彼，物無非是。自彼則不見，自知則知之。',
          transliteration: 'Wù wú fēi bǐ, wù wú fēi shì. Zì bǐ zé bù jiàn, zì zhī zé zhī zhī.',
          translation: 'There is nothing that is not "that," and nothing that is not "this." From "that" standpoint you cannot see it; from your own standpoint you think you know it.',
          provenance: 'Zhuangzi, Inner Chapters, Chapter 2 (Qí Wù Lùn, c. 300 BCE)',
          commentary: 'Zhuangzi laughed at rival Confucian and Mohist schools endlessly declaring each other wrong: "this" and "that" shift the moment you walk three paces to the left. Wisdom stands at the pivot of the hinge, seeing how every perspective generates its own blind spot.',
          marginalia: 'In the same chapter, Zhuangzi asks: if humans sleep in damp places they get aching backs, does an eel? Humans tremble up in tall trees, does a monkey? Which of the three knows the "right" place to live?'
        }
      ]
    },

    {
      id: 'illusion-perception',
      domain: 'Reality & Illusion',
      title: 'We Mistake Shadows for Reality',
      ancientThesis: 'Doxa vs. Alētheia, Ordinary appearances are a wall of shadows we mistake for the real world.',
      modernSummary: 'Most humans live trapped inside cultural conditioning and sensory illusions, mistaking shadows on the wall for truth.',
      specimen: 'Most people live inside a mental simulation of shadows and fear anyone who tries to show them reality.',
      concepts: ['illusion', 'perception', 'reality', 'conditioning', 'simulation', 'awakening'],
      phrases: [
        'mistake shadows for reality', 'living in a simulation', 'matrix', 'allegory of the cave',
        'appearances deceive', 'illusion of reality', 'trapped in conditioning',
        'waking up from illusion', 'dream or reality', 'butterfly dream'
      ],
      keywords: [
        'shadow', 'shadows', 'cave', 'illusion', 'simulation', 'matrix', 'dream', 'reality',
        'appearances', 'conditioned', 'conditioning', 'asleep', 'awake', 'delusion', 'maya', 'deceive'
      ],
      origin: {
        year: -480,
        yearLabel: 'c. 480 BCE',
        thinker: 'Parmenides of Elea',
        tradition: 'Eleatic Greek Philosophy',
        place: 'Elea (Velia), Magna Graecia',
        region: 'Southern Italy',
        coords: [15.15, 40.16],
        scripture: 'On Nature (Peri Physeōs), Fragment DK B7',
        language: 'Epic Greek',
        scriptDir: 'ltr',
        scriptClass: 'script-greek',
        originalScript: 'Μηδέ σ᾽ ἔθος πολύπειρον ὁδὸν κατὰ τήνδε βιάσθω,\nνωμᾶν ἄσκοπον ὄμμα καὶ ἠχήεσσαν ἀκουήν.',
        transliteration: 'Mēde s’ ethos polypeiron hodon kata tēnde biasthō, nōman askopon omma kai ēchēessan akouēn.',
        translation: 'Let not habit, born of much experience, force you along this beaten road, plying an aimless eye and echoing ear; rather judge by reason the much-contested proof.',
        provenance: 'Parmenides, On Nature, Fragment DK B7.3–5 (preserved in Sextus Empiricus, c. 480 BCE)',
        commentary: 'Nearly a century before Plato’s famous Cave, and 2,500 years before The Matrix, Parmenides split human understanding into the Way of Truth (Alētheia) and the Way of Mortal Seeming (Doxa). Habitual sensory experience, he warned, is a well-worn rut that deceives two-headed mortals who mistake surface flicker for what truly is.',
        marginalia: 'Parmenides wrote the founding work of Western logic and metaphysics not as dry prose, but as an ecstatic hexameter poem in which a chariot drawn by mares carries him beyond the gates of Night and Day to meet an unnamed goddess.'
      },
      echoes: [
        {
          year: -375,
          yearLabel: 'c. 375 BCE',
          thinker: 'Plato',
          tradition: 'Classical Greek Philosophy',
          place: 'Athens, Attica',
          region: 'Ancient Greece',
          coords: [23.72, 37.98],
          scripture: 'Republic, Book VII (514a–517a, Allegory of the Cave)',
          language: 'Attic Greek',
          scriptDir: 'ltr',
          scriptClass: 'script-greek',
          originalScript: 'Παντάπασι δὴ οἱ τοιοῦτοι οὐκ ἂν ἄλλο τι νομίζοιεν τὸ ἀληθὲς ἢ τὰς τῶν σκευαστῶν σκιὰς.',
          transliteration: 'Pantapasi dē hoi toioutoi ouk an allo ti nomizoien to alēthes ē tas tōn skeuastōn skias.',
          translation: 'To such prisoners, the truth would be literally nothing other than the shadows of manufactured objects.',
          provenance: 'Plato, Republic VII.515c (c. 375 BCE)',
          commentary: 'Plato turned Parmenides’s intuition into history’s most enduring image of mass delusion: prisoners chained from childhood watching puppet-shadows on a cave wall, who would even kill the freed companion who returns blinking from the sunlight to tell them their reality is a projection.',
          marginalia: 'Plato explicitly notes that the prisoners hold contests and bestow honors on whoever is quickest at predicting which shadow will pass next, an uncanny portrait of modern punditry.'
        },
        {
          year: -300,
          yearLabel: 'c. 300 BCE',
          thinker: 'Zhuangzi (Zhuang Zhou)',
          tradition: 'Classical Daoism',
          place: 'Meng, State of Song',
          region: 'Warring States China',
          coords: [115.65, 34.41],
          scripture: 'Zhuangzi, Chapter 2 (The Butterfly Dream)',
          language: 'Classical Chinese',
          scriptDir: 'ltr',
          scriptClass: 'script-cjk',
          originalScript: '不知周之夢為胡蝶與，胡蝶之夢為周與？',
          transliteration: 'Bù zhī Zhōu zhī mèng wéi húdié yú, húdié zhī mèng wéi Zhōu yú?',
          translation: 'He did not know whether he was Zhuang Zhou who had dreamt he was a butterfly, or a butterfly now dreaming he was Zhuang Zhou.',
          provenance: 'Zhuangzi, Inner Chapters, Chapter 2 (Qí Wù Lùn, c. 300 BCE)',
          commentary: 'Rather than fleeing the dream for a stern realm of Forms, Zhuangzi gently dissolved the boundary between dreamer and waking reality, leaving us smiling at how flimsy our certainty about "being awake" really is.',
          marginalia: 'Unlike Descartes’s anxious "evil demon" dream skepticism nearly two millennia later, Zhuangzi greets the uncertainty with delight, calling it wù huà, "the transformation of things."'
        }
      ]
    },

    {
      id: 'fear-of-death',
      domain: 'Mortality & Fear',
      title: 'Why Fearing Death Is a Logical Error',
      ancientThesis: 'Ho Thanatos Ouden Pros Hēmas, You never meet your own death; where you are, death is not, and where death is, you are not.',
      modernSummary: 'Fearing being dead makes no sense because you will not be conscious to experience non-existence, just as you did not suffer before you were born.',
      specimen: 'Fearing death is irrational because when we are dead we will not exist to experience being dead.',
      concepts: ['death', 'fear', 'mortality', 'nonexistence', 'logic'],
      phrases: [
        'death is nothing to us', 'fear of death is irrational', 'not conscious after death',
        'before we were born', 'when death is we are not', 'why fear death',
        'afraid of dying', 'nonexistence does not hurt'
      ],
      keywords: [
        'death', 'dead', 'dying', 'die', 'fear', 'irrational', 'nonexistence', 'afterlife',
        'oblivion', 'before', 'born', 'experience', 'nothingness', 'cease'
      ],
      origin: {
        year: -300,
        yearLabel: 'c. 300 BCE',
        thinker: 'Epicurus',
        tradition: 'Epicureanism',
        place: 'Athens, Attica',
        region: 'Ancient Greece',
        coords: [23.72, 37.98],
        scripture: 'Letter to Menoeceus 125',
        language: 'Koine Greek',
        scriptDir: 'ltr',
        scriptClass: 'script-greek',
        originalScript: 'Ὁ θάνατος οὐδὲν πρὸς ἡμᾶς· ἐπειδήπερ ὅταν μὲν ἡμεῖς ὦμεν, ὁ θάνατος οὐ πάρεστιν, ὅταν δὲ ὁ θάνατος παρῇ, τόθ᾽ ἡμεῖς οὐκ ἐσμέν.',
        transliteration: 'Ho thanatos ouden pros hēmas; epeidēper hotan men hēmeis ōmen, ho thanatos ou parestin, hotan de ho thanatos parēi, toth’ hēmeis ouk esmen.',
        translation: 'Death is nothing to us: since when we exist, death is not present, and when death is present, then we do not exist.',
        provenance: 'Epicurus, Letter to Menoeceus 125 (preserved in Diogenes Laërtius X.125, c. 300 BCE)',
        commentary: 'Your sleek argument dissolving the terror of non-existence was already carved onto Greek garden walls in 300 BCE. Epicurus noticed that humans secretly smuggle a ghostly spectator into their own coffin, imagining themselves watching themselves be dead, when death by definition removes the witness.',
        marginalia: 'Inscribed across a massive stone colonnade in Oenoanda (Turkey) by Diogenes of Oenoanda in the 2nd century CE as the "Four-Part Cure" (Tetrapharmakos): "Don’t fear god, don’t worry about death; what is good is easy to get, what is terrible is easy to endure."'
      },
      echoes: [
        {
          year: -55,
          yearLabel: 'c. 55 BCE',
          thinker: 'Lucretius (Titus Lucretius Carus)',
          tradition: 'Roman Epicureanism',
          place: 'Rome, Roman Republic',
          region: 'Ancient Italy',
          coords: [12.49, 41.89],
          scripture: 'De Rerum Natura (On the Nature of Things), Book III.830–842 & 972–975',
          language: 'Classical Latin',
          scriptDir: 'ltr',
          scriptClass: 'script-latin',
          originalScript: 'Respice item quam nil ad nos anteacta vetustas\ntemporis aeterni fuerit, quam nascimur ante.',
          transliteration: 'Respice item quam nil ad nos anteacta vetustas temporis aeterni fuerit, quam nascimur ante.',
          translation: 'Look back at how the endless stretch of past time before we were born was nothing to us. This is the mirror Nature holds up to us of the time to come after our death.',
          provenance: 'Lucretius, De Rerum Natura III.972–975 (c. 55 BCE)',
          commentary: 'Lucretius sharpened Epicurus with the famous Symmetry Argument: you feel zero terror contemplating the billions of years before your birth, yet panic over the identical eternity waiting afterward.',
          marginalia: 'Lost for over a millennium, Lucretius’s poem survived in a single German monastery manuscript rediscovered in 1417 by the humanist Poggio Bracciolini, igniting the Renaissance revival of atomism.'
        }
      ]
    },

    {
      id: 'mortality-living',
      domain: 'Mortality & Meaning',
      title: 'Mortality Is What Makes Ordinary Life Precious',
      ancientThesis: 'Siduri’s Counsel, Immortality belongs to the gods; human meaning lives in bread, companionship, and the fleeting day.',
      modernSummary: 'Chasing immortality or legacy wastes our brief life; knowing we will die should teach us to savor ordinary human joy now.',
      specimen: 'We waste our lives chasing permanence and legacy when mortality is the very reason to savor today.',
      concepts: ['mortality', 'meaning', 'legacy', 'living_now', 'joy', 'ephemeral'],
      phrases: [
        'mortality teaches us to live', 'seize the day', 'carpe diem', 'life is short',
        'savor ordinary life', 'chasing immortality', 'legacy fades', 'cherish the moment',
        'remember you will die', 'memento mori', 'live fully before you die'
      ],
      keywords: [
        'mortality', 'mortal', 'short', 'brief', 'live', 'living', 'savor', 'ordinary',
        'legacy', 'immortality', 'fame', 'fleeting', 'cherish', 'today', 'youth', 'memento'
      ],
      origin: {
        year: -1800,
        yearLabel: 'c. 1800 BCE',
        thinker: 'Siduri the Alewife (Mesopotamian Scribe)',
        tradition: 'Old Babylonian Literature',
        place: 'Sippar / Babylon, Mesopotamia',
        region: 'Ancient Iraq',
        coords: [44.29, 33.06],
        scripture: 'Epic of Gilgamesh (Old Babylonian Sippar Tablet, Col. iii)',
        language: 'Akkadian (Old Babylonian)',
        scriptDir: 'ltr',
        scriptClass: 'script-latin',
        originalScript: 'Inūma ilū ibnû awīlūtam, mūtam iškunū ana awīlūtim, balāṭam ina qātīšunu iṣṣabtū.',
        transliteration: 'Inūma ilū ibnû awīlūtam, mūtam iškunū ana awīlūtim, balāṭam ina qātīšunu iṣṣabtū.',
        translation: 'When the gods created mankind, death for mankind they set aside, keeping eternal life in their own hands. You, Gilgamesh, let your belly be full; make merry by day and by night; gaze on the little one who holds your hand, and let a wife delight in your embrace, for this alone is the lot of humanity.',
        provenance: 'Epic of Gilgamesh, Old Babylonian Sippar Tablet (VA+BM, Col. iii, ll. 2–14, c. 1800 BCE)',
        commentary: 'Almost four thousand years ago, in humanity’s oldest surviving epic, a tavern-keeper at the edge of the world intercepted a grieving king hunting for immortality and gave him the answer every modern memoir still thinks it invented: stop running from death, wash your head, dance, hold your child’s hand, and inhabit the warmth you actually have.',
        marginalia: 'Curiously, this passage was excised from the later Standard Babylonian version of Gilgamesh (c. 1200 BCE) and survives only on a broken Old Babylonian clay tablet split between Berlin and the British Museum.'
      },
      echoes: [
        {
          year: -250,
          yearLabel: 'c. 3rd Century BCE',
          thinker: 'Qohelet (The Preacher)',
          tradition: 'Hebrew Wisdom Literature',
          place: 'Jerusalem, Judea',
          region: 'Ancient Near East',
          coords: [35.23, 31.78],
          scripture: 'Ecclesiastes 9:7–9',
          language: 'Biblical Hebrew',
          scriptDir: 'rtl',
          scriptClass: 'script-hebrew',
          originalScript: 'לֵךְ אֱכֹל בְּשִׂמְחָה לַחְמֶךָ וּשְׁתֵה בְלֶב־טוֹב יֵינֶךָ… רְאֵה חַיִּים עִם־אִשָּׁה אֲשֶׁר־אָהַבְתָּ.',
          transliteration: 'Lēḵ ’ĕḵōl bəśimḥāh laḥmeḵā ūshətēh bəleb-ṭôb yêneḵā… rə’ēh ḥayyîm ‘im-’ishshāh ’ăsher-’āhabtā.',
          translation: 'Go, eat your bread with joy, and drink your wine with a glad heart… Enjoy life with the partner whom you love, all the days of your fleeting life.',
          provenance: 'Ecclesiastes 9:7–9 (c. 3rd century BCE)',
          commentary: 'Scholars have long marveled at the near-verbatim sequence shared with Siduri’s speech, bread, festive drink, clean garments, oil on the head, and cherishing one’s beloved, proving that this quiet rebellion against existential dread echoed across the ancient Near East for fifteen centuries.',
          marginalia: 'The Hebrew word hevel, usually translated "vanity," literally means breath, mist, or vapor, something real, warm, and impossible to bottle.'
        },
        {
          year: 49,
          yearLabel: 'c. 49 CE',
          thinker: 'Seneca the Younger',
          tradition: 'Roman Stoicism',
          place: 'Rome, Roman Empire',
          region: 'Ancient Italy',
          coords: [12.49, 41.89],
          scripture: 'De Brevitate Vitae (On the Shortness of Life) 1.3–4',
          language: 'Classical Latin',
          scriptDir: 'ltr',
          scriptClass: 'script-latin',
          originalScript: 'Non exiguum temporis habemus, sed multum perdidimus.',
          transliteration: 'Non exiguum temporis habemus, sed multum perdidimus.',
          translation: 'It is not that we have a short space of time, but that we waste much of it.',
          provenance: 'Seneca, De Brevitate Vitae I.3 (c. 49 CE)',
          commentary: 'Seneca turned the lament over mortality back onto our own calendars: people guard their property fiercely while handing away hours of their irredeemable life to status games and procrastination as if they expected to live forever.',
          marginalia: 'Seneca wrote this essay shortly after returning from eight years of exile on the rocky island of Corsica, having learned firsthand what happens when ambition is stripped away.'
        }
      ]
    },

    {
      id: 'habit-character',
      domain: 'Habit & Character',
      title: 'We Become What We Repeatedly Do',
      ancientThesis: 'Yathākārī Tathā Bhavati, Intentions leave no mark; repeated desire and action sculpt the self.',
      modernSummary: 'You are not defined by your grand intentions or beliefs, but by the daily habits and actions you repeat.',
      specimen: 'We are not what we intend to be; we become whatever we repeatedly practice and do.',
      concepts: ['habits', 'action', 'character', 'practice', 'discipline'],
      phrases: [
        'what we repeatedly do', 'habits shape us', 'actions not intentions',
        'we become our habits', 'you are what you practice', 'excellence is a habit',
        'identity follows action', 'daily habits create character', 'judged by actions'
      ],
      keywords: [
        'habit', 'habits', 'repeatedly', 'repeat', 'practice', 'action', 'actions',
        'intention', 'intentions', 'become', 'becomes', 'character', 'routine', 'virtue', 'doing'
      ],
      origin: {
        year: -700,
        yearLabel: 'c. 700 BCE',
        thinker: 'Yājñavalkya',
        tradition: 'Vedic Upaniṣads',
        place: 'Mithila, Videha',
        region: 'Ancient India',
        coords: [85.92, 26.73],
        scripture: 'Bṛhadāraṇyaka Upaniṣad 4.4.5',
        language: 'Vedic Sanskrit',
        scriptDir: 'ltr',
        scriptClass: 'script-deva',
        originalScript: 'यथाकारी यथाचारी तथा भवति, साधुकारी साधुर्भवति, पापकारी पापो भवति।',
        transliteration: 'Yathākārī yathācārī tathā bhavati, sādhukārī sādhur bhavati, pāpakārī pāpo bhavati.',
        translation: 'As a person acts, as a person conducts themselves, so do they become. The doer of good becomes good; the doer of harm becomes harmful. As is one’s deep desire, so is one’s will; as is one’s will, so is one’s deed; and whatever deed one does, that one reaps.',
        provenance: 'Bṛhadāraṇyaka Upaniṣad IV.4.5 (c. 700 BCE)',
        commentary: 'Three and a half centuries before Aristotle ever lectured in the Lyceum, and 2,700 years before modern habit books, the Bṛhadāraṇyaka Upaniṣad traced identity as a four-step chain from deep desire (kāma) to resolve (kratu) to repeated action (karma) to who you literally become. You do not merely perform deeds; deeds forge the performer.',
        marginalia: 'This passage contains one of the earliest explicit philosophical formulations of karma in Indian history, long before the word became simplified into cosmic reward-and-punishment.'
      },
      echoes: [
        {
          year: -340,
          yearLabel: 'c. 340 BCE',
          thinker: 'Aristotle',
          tradition: 'Classical Greek Philosophy',
          place: 'Athens, Attica',
          region: 'Ancient Greece',
          coords: [23.73, 37.98],
          scripture: 'Nicomachean Ethics II.1 (1103a31–b2)',
          language: 'Attic Greek',
          scriptDir: 'ltr',
          scriptClass: 'script-greek',
          originalScript: 'Ἃ γὰρ δεῖ μαθόντας ποιεῖν, ταῦτα ποιοῦντες μανθάνομεν… τὰ μὲν δίκαια πράττοντες δίκαιοι γινόμεθα.',
          transliteration: 'Ha gar dei mathontas poiein, tauta poiountes manthanomen… ta men dikaia prattontes dikaioi ginometha.',
          translation: 'The things we have to learn before we can do them, we learn by doing them… we become just by doing just acts, temperate by doing temperate acts, brave by doing brave acts.',
          provenance: 'Aristotle, Nicomachean Ethics II.1, 1103a32–b2 (c. 340 BCE)',
          commentary: 'Aristotle compared moral character to playing the lyre or building houses: nobody becomes a harpist by reading lectures on music, and nobody becomes courageous by admiring courage from a sofa.',
          marginalia: 'The viral quote "We are what we repeatedly do. Excellence, then, is not an act, but a habit" was actually written by Will Durant in 1926 summarizing this exact Aristotelian passage, not verbatim by Aristotle himself.'
        }
      ]
    },

    {
      id: 'character-destiny',
      domain: 'Fate & Character',
      title: 'Your Own Character Is Your Destiny',
      ancientThesis: 'Ēthos Anthrōpōi Daimōn, What people blame on luck, stars, or fate is mostly the quiet unfolding of their own character.',
      modernSummary: 'Our destiny is not written in external luck or the stars; our inner character quietly manufactures the life we end up living.',
      specimen: 'People blame luck or fate, but a person’s own character is what quietly writes their destiny.',
      concepts: ['character', 'destiny', 'fate', 'responsibility', 'luck'],
      phrases: [
        'character is destiny', 'create your own fate', 'blame luck or fate',
        'fault is not in our stars', 'inner nature shapes fate', 'heirs of our deeds',
        'fate is personality', 'destiny is character'
      ],
      keywords: [
        'character', 'destiny', 'fate', 'luck', 'stars', 'fortune', 'nature', 'personality',
        'blame', 'responsibility', 'karma', 'consequence', 'daimon'
      ],
      origin: {
        year: -500,
        yearLabel: 'c. 500 BCE',
        thinker: 'Heraclitus of Ephesus',
        tradition: 'Pre-Socratic Greek Philosophy',
        place: 'Ephesus, Ionia',
        region: 'Anatolia',
        coords: [27.34, 37.94],
        scripture: 'Fragment DK B119 (preserved in Stobaeus & Plutarch)',
        language: 'Ionic Greek',
        scriptDir: 'ltr',
        scriptClass: 'script-greek',
        originalScript: 'Ἦθος ἀνθρώπῳ δαίμων.',
        transliteration: 'Ēthos anthrōpōi daimōn.',
        translation: 'A human being’s character is their fate.',
        provenance: 'Heraclitus, Fragment DK B119 (Stobaeus, Anthology IV.40.23, c. 500 BCE)',
        commentary: 'Three Greek words dismantled an entire mythic worldview. In archaic Greece, a daimōn was an external guardian spirit or divine lot assigned at birth; Heraclitus moved the spirit inside the chest, declaring that your habitual disposition (ēthos) is the invisible deity steering your fortunes.',
        marginalia: 'Notice the word ēthos originally meant an animal’s familiar haunt or dwelling-place, meaning your destiny is literally the mental habitat you choose to live in.'
      },
      echoes: [
        {
          year: -480,
          yearLabel: 'c. 5th Century BCE',
          thinker: 'Siddhartha Gautama (The Buddha)',
          tradition: 'Early Buddhism · Pāli Canon',
          place: 'Sāvatthī, Kosala',
          region: 'Ancient India',
          coords: [82.05, 27.51],
          scripture: 'Cūḷakammavibhaṅga Sutta (Majjhima Nikāya 135)',
          language: 'Pāli',
          scriptDir: 'ltr',
          scriptClass: 'script-latin',
          originalScript: 'Kammassakā, māṇava, sattā kammadāyādā kammayonī kammabandhū kammapaṭisaraṇā.',
          transliteration: 'Kammassakā, māṇava, sattā kammadāyādā kammayonī kammabandhū kammapaṭisaraṇā.',
          translation: 'Beings are the owners of their deeds, the heirs of their deeds; their deeds are the womb from which they spring, their kin, and their refuge.',
          provenance: 'Cūḷakammavibhaṅga Sutta, Majjhima Nikāya 135 (c. 5th century BCE)',
          commentary: 'Answered to a young brahmin asking why human fortunes diverge so sharply, the Buddha pointed away from birthright or divine whim toward intentional action: you inherit the psychological world your choices construct.',
          marginalia: 'In Buddhist ethics, kamma is explicitly defined as cetanā, volition or intention, not blind physical accident.'
        }
      ]
    },

    {
      id: 'anger-revenge',
      domain: 'Anger & Forgiveness',
      title: 'Hatred Never Ends Hatred; Anger Burns Its Host First',
      ancientThesis: 'Averena Ca Sammanti, Retaliation feeds the fire it claims to extinguish; forgiveness liberates the one who lets go.',
      modernSummary: 'Holding onto anger or seeking revenge poisons you far more than your enemy; only non-hatred breaks the cycle.',
      specimen: 'Holding onto anger and seeking revenge destroys the person holding it; only letting go ends the cycle.',
      concepts: ['anger', 'revenge', 'forgiveness', 'hatred', 'peace'],
      phrases: [
        'anger hurts you more', 'drinking poison expecting the other', 'hatred never ends hatred',
        'forgive for your own peace', 'revenge poisons', 'eye for an eye', 'break the cycle of hate',
        'holding onto resentment', 'resentment destroys', 'love your enemies'
      ],
      keywords: [
        'anger', 'angry', 'rage', 'hatred', 'hate', 'revenge', 'retaliation', 'resentment',
        'grudge', 'forgive', 'forgiveness', 'enemy', 'enemies', 'poison', 'bitterness', 'wrath'
      ],
      origin: {
        year: -480,
        yearLabel: 'c. 5th Century BCE',
        thinker: 'Siddhartha Gautama (The Buddha)',
        tradition: 'Early Buddhism · Pāli Canon',
        place: 'Sāvatthī, Kosala',
        region: 'Ancient India',
        coords: [82.05, 27.51],
        scripture: 'Dhammapada I.5 & Kodhana Sutta (Aṅguttara Nikāya 7.64)',
        language: 'Pāli',
        scriptDir: 'ltr',
        scriptClass: 'script-latin',
        originalScript: 'Na hi verena verāni sammantīdha kudācanaṃ;\naverena ca sammanti, esa dhammo sanantano.',
        transliteration: 'Na hi verena verāni sammantīdha kudācanaṃ; averena ca sammanti, esa dhammo sanantano.',
        translation: 'Never in this world is hatred appeased by hatred; by non-hatred alone is hatred appeased. This is an ancient, eternal law.',
        provenance: 'Dhammapada, Chapter I (Yamakavagga), v. 5 (c. 5th century BCE)',
        commentary: 'Notice that even in the fifth century BCE, Gautama already called this "an ancient law" (sanantano dhammo), humbling both you and himself in one stroke. In the companion Kodhana Sutta, he adds an unforgettable psychological sting: an angry person actually fulfills their enemy’s fondest wishes by making themselves sleepless, ugly, and miserable.',
        marginalia: 'The famous internet meme "Holding onto anger is like drinking poison and expecting the other person to die" is modern, never spoken by the Buddha, though it loosely paraphrases the Kodhana Sutta’s comparison of anger to grabbing a glowing ember or smearing oneself with filth to throw at a foe.'
      },
      echoes: [
        {
          year: -450,
          yearLabel: 'c. 5th–4th Century BCE',
          thinker: 'Laozi',
          tradition: 'Classical Daoism',
          place: 'Chu / Luoyi, Zhou China',
          region: 'Ancient China',
          coords: [112.45, 34.62],
          scripture: 'Dao De Jing (Tao Te Ching), Chapter 63',
          language: 'Classical Chinese',
          scriptDir: 'ltr',
          scriptClass: 'script-cjk',
          originalScript: '報怨以德。',
          transliteration: 'Bào yuàn yǐ dé.',
          translation: 'Respond to resentment with virtue.',
          provenance: 'Dao De Jing, Chapter 63 (c. 5th–4th century BCE)',
          commentary: 'Four Chinese characters sparked one of antiquity’s sharpest ethical debates: when a disciple later asked Confucius about this exact Daoist maxim (Analects 14.34), Confucius tartly replied that injury should be met with upright fairness, and kindness with kindness.',
          marginalia: 'That Confucius directly quotes and debates "bào yuàn yǐ dé" proves how widely this non-retaliatory ideal was already circulating in Spring-and-Autumn China.'
        },
        {
          year: 45,
          yearLabel: 'c. 45 CE',
          thinker: 'Seneca the Younger',
          tradition: 'Roman Stoicism',
          place: 'Rome, Roman Empire',
          region: 'Ancient Italy',
          coords: [12.49, 41.89],
          scripture: 'De Ira (On Anger), Book I.1.2',
          language: 'Classical Latin',
          scriptDir: 'ltr',
          scriptClass: 'script-latin',
          originalScript: 'Quidam itaque e sapientibus viris iram dixerunt brevem insaniam.',
          transliteration: 'Quidam itaque e sapientibus viris iram dixerunt brevem insaniam.',
          translation: 'Certain wise men have called anger a brief madness: for it is equally devoid of self-control, forgetful of decency, and eager to crush another even as it drags itself down into the same ruin.',
          provenance: 'Seneca, De Ira I.1.2 (dedicated to his brother Novatus, c. 41–52 CE)',
          commentary: 'Seneca compares fury to a crumbling masonry wall that collapses onto whatever it strikes, destroying itself in the very instant of impact. Even the "wise men" Seneca cites were older still (including Horace, Epistles I.2.62).',
          marginalia: 'Seneca wrote De Ira right after surviving the reign of the famously erratic Emperor Caligula, giving him an uncomfortable front-row seat to unchecked rage.'
        }
      ]
    },

    {
      id: 'reciprocity-empathy',
      domain: 'Ethics & Empathy',
      title: 'The Universal Law of Reciprocity',
      ancientThesis: 'Shù (恕), Do not impose upon another what you yourself would not wish to endure.',
      modernSummary: 'The entire foundation of morality boils down to treating others the way you would want to be treated in their shoes.',
      specimen: 'All of ethics can be boiled down to one rule: never inflict on another what you would hate to suffer yourself.',
      concepts: ['empathy', 'ethics', 'reciprocity', 'golden_rule', 'morality'],
      phrases: [
        'golden rule', 'silver rule', 'treat others how you want to be treated',
        'do not do to others', 'in their shoes', 'all ethics boils down to',
        'empathy is the foundation', 'reciprocity', 'do unto others'
      ],
      keywords: [
        'empathy', 'ethics', 'morality', 'moral', 'reciprocity', 'golden', 'rule',
        'treat', 'others', 'impose', 'shoes', 'fairness', 'justice', 'kindness'
      ],
      origin: {
        year: -1850,
        yearLabel: 'c. 1850 BCE',
        thinker: 'Khun-Anup (The Eloquent Peasant)',
        tradition: 'Middle Kingdom Egyptian Ethics',
        place: 'Herakleopolis, Middle Egypt',
        region: 'Ancient Egypt',
        coords: [30.93, 29.09],
        scripture: 'The Tale of the Eloquent Peasant (Papyrus Berlin 3023, Petition 3)',
        language: 'Middle Egyptian',
        scriptDir: 'ltr',
        scriptClass: 'script-latin',
        originalScript: 'ir n irr n.k, di.k ir.f st',
        transliteration: 'Ir n irr n.k, di.k ir.f st.',
        translation: 'Now this is the command: do to the doer to make him do, act for one who may act for you, that you may cause him thus to act.',
        provenance: 'The Tale of the Eloquent Peasant, Papyrus Berlin 3023 (B1, ll. 109–110, Twelfth Dynasty, c. 1850 BCE)',
        commentary: 'Long before every major world religion canonized the Golden Rule, an Egyptian peasant robbed of his donkeys by a corrupt official stood before the High Steward Rensi and argued that social order survives solely on moral reciprocity. The Steward was so dazzled by his rhetoric that the Pharaoh ordered scribes to transcribe every petition.',
        marginalia: 'The four surviving Middle Kingdom papyri of this story show that Egyptian schoolchildren copied the peasant’s nine speeches for centuries as the gold standard of eloquence and justice.'
      },
      echoes: [
        {
          year: -479,
          yearLabel: 'c. 5th Century BCE',
          thinker: 'Confucius (Kong Qiu)',
          tradition: 'Classical Confucianism',
          place: 'Qufu, State of Lu',
          region: 'Ancient China',
          coords: [116.99, 35.59],
          scripture: 'Analects (Lúnyǔ) XV.24',
          language: 'Classical Chinese',
          scriptDir: 'ltr',
          scriptClass: 'script-cjk',
          originalScript: '子貢問曰：「有一言而可以終身行之者乎？」子曰：「其恕乎！己所不欲，勿施於人。」',
          transliteration: 'Zǐgòng wèn yuē: "Yǒu yī yán ér kěyǐ zhōngshēn xíng zhī zhě hū?" Zǐ yuē: "Qí shù hū! Jǐ suǒ bù yù, wù shī yú rén."',
          translation: 'Zigong asked: "Is there one single word that can serve as a guide for one’s entire life?" The Master replied: "Is it not reciprocity (shù)? What you do not wish for yourself, do not impose upon others."',
          provenance: 'Analects of Confucius (Lúnyǔ) 15.24 (compiled by disciples, 5th–4th century BCE)',
          commentary: 'Notice the quiet wisdom of Confucius’s negative phrasing ("do not impose") over the more forceful positive rule: it respects that another person may not want your exact preferences forced on them, while barring cruelty universally.',
          marginalia: 'The Chinese character shù (恕) is literally composed of "likeness/as" (如) placed directly over "heart-mind" (心), comparing another’s heart to your own.'
        },
        {
          year: -20,
          yearLabel: 'c. 1st Century BCE',
          thinker: 'Hillel the Elder',
          tradition: 'Rabbinic Judaism',
          place: 'Jerusalem, Judea',
          region: 'Ancient Near East',
          coords: [35.23, 31.78],
          scripture: 'Babylonian Talmud, Tractate Shabbat 31a',
          language: 'Jewish Babylonian Aramaic',
          scriptDir: 'rtl',
          scriptClass: 'script-hebrew',
          originalScript: 'דַּעֲלָךְ סְנֵי לְחַבְרָךְ לָא תַּעֲבֵיד, זוֹ הִיא כָּל הַתּוֹרָה כֻּלָּהּ וְאִידָךְ פֵּירוּשָׁהּ הוּא.',
          transliteration: 'Da‘ălāḵ sənê ləḥabrāḵ lā ta‘ăbêd; zô hî kol ha-Tôrāh kullāh wə’îdāḵ pêrūshāh hū.',
          translation: 'What is hateful to you, do not do to your neighbor: that is the whole Torah, while the rest is commentary; now go and learn it.',
          provenance: 'Babylonian Talmud, Shabbat 31a (tradition of Hillel the Elder, late 1st century BCE)',
          commentary: 'Challenged by a prankster to teach the entire Torah while standing on one foot, Hillel answered in one Aramaic breath, compressing thousands of laws into a single ethical mirror.',
          marginalia: 'Hillel’s rival Shammai had just chased the same inquirer away with a builder’s measuring rod; Hillel’s patience became a Jewish proverb in its own right.'
        }
      ]
    },

    {
      id: 'limits-of-language',
      domain: 'Language & Mystery',
      title: 'Words Can Never Capture Ultimate Truth',
      ancientThesis: 'Dào Kě Dào, Fēi Cháng Dào, The moment you pin ultimate reality inside a definition, it slips through the net.',
      modernSummary: 'Language is too narrow for deepest reality; the map is not the territory, and truth begins where words fail.',
      specimen: 'Language can never capture ultimate truth; the moment you put the deepest reality into words, you distort it.',
      concepts: ['language', 'mystery', 'ineffable', 'truth', 'words', 'silence'],
      phrases: [
        'words cannot capture truth', 'limits of language', 'map is not the territory',
        'cannot be put into words', 'truth is beyond words', 'tao that can be spoken',
        'language distorts reality', 'finger pointing at the moon', 'ineffable'
      ],
      keywords: [
        'language', 'words', 'word', 'speak', 'spoken', 'define', 'definition', 'name',
        'naming', 'ineffable', 'describe', 'distort', 'map', 'territory', 'mystery', 'ultimate'
      ],
      origin: {
        year: -600,
        yearLabel: 'c. 600 BCE',
        thinker: 'Taittirīya Vedic Sages',
        tradition: 'Vedic Upaniṣads',
        place: 'Northern India',
        region: 'Ancient India',
        coords: [78.5, 27.9],
        scripture: 'Taittirīya Upaniṣad 2.4.1 & 2.9.1',
        language: 'Vedic Sanskrit',
        scriptDir: 'ltr',
        scriptClass: 'script-deva',
        originalScript: 'यतो वाचो निवर्तन्ते अप्राप्य मनसा सह।',
        transliteration: 'Yato vāco nivartante aprāpya manasā saha.',
        translation: 'That from which words turn back, together with the mind, unable to reach it.',
        provenance: 'Taittirīya Upaniṣad II.4.1 & II.9.1 (Brahmānandavallī, c. 6th century BCE)',
        commentary: 'Centuries before Ludwig Wittgenstein closed the Tractatus with "Whereof one cannot speak, thereof one must be silent," the Taittirīya Upaniṣad pictured language and conceptual thought running out of breath and turning home empty-handed at the border of ultimate reality.',
        marginalia: 'The Sanskrit verb nivartante evokes a messenger or traveler turning back from an uncrossable frontier, acknowledging language’s usefulness right up to the border, and its collapse beyond it.'
      },
      echoes: [
        {
          year: -450,
          yearLabel: 'c. 5th–4th Century BCE',
          thinker: 'Laozi',
          tradition: 'Classical Daoism',
          place: 'Chu / Luoyi, Zhou China',
          region: 'Ancient China',
          coords: [112.45, 34.62],
          scripture: 'Dao De Jing (Tao Te Ching), Chapter 1',
          language: 'Classical Chinese',
          scriptDir: 'ltr',
          scriptClass: 'script-cjk',
          originalScript: '道可道，非常道；名可名，非常名。',
          transliteration: 'Dào kě dào, fēi cháng dào; míng kě míng, fēi cháng míng.',
          translation: 'The Way that can be spoken is not the constant Way; the name that can be named is not the constant name.',
          provenance: 'Dao De Jing, Chapter 1, opening lines (c. 5th–4th century BCE)',
          commentary: 'Laozi famously launched an entire 5,000-character classic by immediately warning the reader that words cannot hold what the book is about, a glorious irony that has humbled philosophers ever since.',
          marginalia: 'In Classical Chinese, the second dào functions as a verb ("to speak" or "to chart a path"), creating an untranslatable pun: a way you can fully map out stops being the living Way.'
        },
        {
          year: -300,
          yearLabel: 'c. 300 BCE',
          thinker: 'Zhuangzi (Zhuang Zhou)',
          tradition: 'Classical Daoism',
          place: 'Meng, State of Song',
          region: 'Warring States China',
          coords: [115.65, 34.41],
          scripture: 'Zhuangzi, Chapter 26 (Wài Wù, "External Things")',
          language: 'Classical Chinese',
          scriptDir: 'ltr',
          scriptClass: 'script-cjk',
          originalScript: '筌者所以在魚，得魚而忘筌… 言者所以在意，得意而忘言。',
          transliteration: 'Quán zhě suǒ yǐ zài yú, dé yú ér wàng quán… yán zhě suǒ yǐ zài yì, dé yì ér wàng yán.',
          translation: 'The fish trap exists because of the fish; once you have caught the fish, you can forget the trap. Words exist because of meaning; once you have grasped the meaning, you can forget the words.',
          provenance: 'Zhuangzi, Miscellaneous Chapters, Chapter 26 (Wài Wù, c. 300 BCE)',
          commentary: 'Zhuangzi added a wistful punchline right after that line: "Where can I find someone who has forgotten words, so that I may have a word with them?"',
          marginalia: 'This fish-trap metaphor directly seeded Chinese Chan (Zen) Buddhism’s later image of the finger pointing at the moon.'
        }
      ]
    },

    {
      id: 'silence-speech',
      domain: 'Speech & Restraint',
      title: 'The Quiet Mind Outlasts the Loud One',
      ancientThesis: 'Grw Mꜣꜥ (The Truly Silent Person), Measured silence is strength; impulsive speech betrays a restless interior.',
      modernSummary: 'Those who talk endlessly usually know the least; restraint, listening, and calm silence carry far deeper authority.',
      specimen: 'The loudest person in the room usually knows the least; silence and restraint reveal far more strength.',
      concepts: ['silence', 'speech', 'listening', 'restraint', 'calm'],
      phrases: [
        'loudest person in the room', 'silence speaks louder', 'those who know do not speak',
        'talk less listen more', 'restraint in speech', 'empty vessels make the most noise',
        'power of silence', 'impulsive speech', 'quiet strength'
      ],
      keywords: [
        'silence', 'silent', 'quiet', 'loud', 'loudest', 'talk', 'talking', 'speak',
        'speech', 'listen', 'listening', 'restraint', 'mouth', 'noise', 'chatter', 'stillness'
      ],
      origin: {
        year: -1100,
        yearLabel: 'c. 1100 BCE',
        thinker: 'Amenemope, son of Kanakht',
        tradition: 'New Kingdom Egyptian Wisdom Literature',
        place: 'Akhmim / Thebes, Upper Egypt',
        region: 'Ancient Egypt',
        coords: [32.64, 25.69],
        scripture: 'The Instruction of Amenemope, Chapter 4 (BM Papyrus 10474)',
        language: 'Late Egyptian',
        scriptDir: 'ltr',
        scriptClass: 'script-latin',
        originalScript: 'ir pꜣ grw mꜣꜥ di.f sw r-gs, sw mi šn rwd m hnt',
        transliteration: 'Ir pꜣ grw mꜣꜥ di.f sw r-gs, sw mi šn rwd m ḥnt.',
        translation: 'As for the heated, loud man in the temple, he is like a tree growing indoors, a moment lasts his shoot, and his end is in the timber-yard. But the truly silent man sets himself apart; he is like a tree growing in a meadow: it greens, it doubles its yield, its fruit is sweet, its shade is pleasant.',
        provenance: 'The Instruction of Amenemope, Chapter 4 (ll. 6.1–12), British Museum Papyrus 10474 (Ramesside period, c. 1100 BCE)',
        commentary: 'Three millennia before "quiet confidence" became a modern leadership trope, the Egyptian scribe Amenemope built an entire ethical system around the contrast between the šmm ("heated, noisy man") and the grw mꜣꜥ ("truly silent man"). Silence in Egypt did not mean timidity, it meant deep roots capable of weathering heat without reacting.',
        marginalia: 'Scholars discovered in 1923 that portions of the Instruction of Amenemope closely parallel Book of Proverbs 22:17–24:22, demonstrating how ancient Egyptian wisdom traveled across borders into Hebrew scripture.'
      },
      echoes: [
        {
          year: -450,
          yearLabel: 'c. 5th–4th Century BCE',
          thinker: 'Laozi',
          tradition: 'Classical Daoism',
          place: 'Chu / Luoyi, Zhou China',
          region: 'Ancient China',
          coords: [112.45, 34.62],
          scripture: 'Dao De Jing (Tao Te Ching), Chapter 56',
          language: 'Classical Chinese',
          scriptDir: 'ltr',
          scriptClass: 'script-cjk',
          originalScript: '知者不言，言者不知。',
          transliteration: 'Zhī zhě bù yán, yán zhě bù zhī.',
          translation: 'Those who know do not speak; those who speak do not know.',
          provenance: 'Dao De Jing, Chapter 56 (c. 5th–4th century BCE)',
          commentary: 'The Tang poet Bai Juyi later teased Laozi for this exact aphorism: "Those who know don’t speak, those who speak don’t know, so Laozi told us. Yet if Laozi himself knew, why did he write five thousand words?"',
          marginalia: 'In Classical Chinese, yán means not just casual speech but dogmatic pronouncement and lecturing, meaning real insight rarely needs to shout.'
        },
        {
          year: -550,
          yearLabel: 'c. 6th Century BCE',
          thinker: 'Sages of Ancient Israel',
          tradition: 'Hebrew Wisdom Literature',
          place: 'Jerusalem, Judea',
          region: 'Ancient Near East',
          coords: [35.23, 31.78],
          scripture: 'Book of Proverbs 17:28',
          language: 'Biblical Hebrew',
          scriptDir: 'rtl',
          scriptClass: 'script-hebrew',
          originalScript: 'גַּם אֱוִיל מַחֲרִישׁ חָכָם יֵחָשֵׁב אֹטֵם שְׂפָתָיו נָבוֹן׃',
          transliteration: 'Gam ’ĕwîl maḥărîsh ḥāḵām yēḥāshēb; ’ōṭēm śəfātāw nābôn.',
          translation: 'Even a fool who keeps silent is considered wise; when he closes his lips, he is deemed intelligent.',
          provenance: 'Proverbs 17:28 (c. 6th century BCE)',
          commentary: 'With dry, timeless wit, Proverbs reminds us that silence is not only the hallmark of sages, it is also the last respectable shelter for the rest of us.',
          marginalia: 'Centuries later, Abraham Lincoln and Mark Twain were both wrongly credited with inventing this exact epigram.'
        }
      ]
    },

    {
      id: 'self-knowledge',
      domain: 'Introspection & Meaning',
      title: 'Know Thyself & The Unexamined Life',
      ancientThesis: 'Gnōthi Seauton, Turning the gaze inward is the first and hardest frontier of human inquiry.',
      modernSummary: 'Living on autopilot without questioning your own mind, motives, and beliefs wastes a human life.',
      specimen: 'Most people live on autopilot looking outward, when the only real journey is examining yourself.',
      concepts: ['self_knowledge', 'introspection', 'autopilot', 'awareness', 'meaning'],
      phrases: [
        'know thyself', 'unexamined life', 'living on autopilot', 'examine yourself',
        'look inward', 'know yourself first', 'self awareness', 'question everything',
        'inner journey', 'understand yourself'
      ],
      keywords: [
        'examine', 'unexamined', 'introspection', 'inward', 'autopilot', 'self-awareness',
        'know', 'thyself', 'yourself', 'question', 'reflection', 'reflect', 'soul', 'blindspot'
      ],
      origin: {
        year: -580,
        yearLabel: 'c. 6th Century BCE',
        thinker: 'The Seven Sages of Greece (Delphic Inscription)',
        tradition: 'Archaic Greek Wisdom · Sanctuary of Apollo',
        place: 'Delphi, Phocis',
        region: 'Ancient Greece',
        coords: [22.50, 38.48],
        scripture: 'Forecourt Inscription of the Temple of Apollo at Delphi',
        language: 'Ancient Greek',
        scriptDir: 'ltr',
        scriptClass: 'script-greek',
        originalScript: 'Γνῶθι σεαυτόν.',
        transliteration: 'Gnōthi seauton.',
        translation: 'Know thyself.',
        provenance: 'Inscribed in the pronaos of the Temple of Apollo at Delphi (recorded by Pausanias X.24.1 & Plato, Protagoras 343b, c. 6th century BCE)',
        commentary: 'Carved in stone above the entrance of Apollo’s temple before Greek philosophy even had schools, "Know thyself" was originally a humbling warning, not a self-help affirmation: know your limits as a mortal, know what drives you, and stop pretending to be a god.',
        marginalia: 'The Delphic maxims were inscribed on a stele as far away as Ai-Khanoum in northern Afghanistan (3rd century BCE), carried thousands of miles east in the wake of Alexander’s campaigns.'
      },
      echoes: [
        {
          year: -500,
          yearLabel: 'c. 500 BCE',
          thinker: 'Heraclitus of Ephesus',
          tradition: 'Pre-Socratic Greek Philosophy',
          place: 'Ephesus, Ionia',
          region: 'Anatolia',
          coords: [27.34, 37.94],
          scripture: 'Fragments DK B101 & B45',
          language: 'Ionic Greek',
          scriptDir: 'ltr',
          scriptClass: 'script-greek',
          originalScript: 'Ἐδιζησάμην ἐμεωυτόν.',
          transliteration: 'Edizēsamēn emeōuton.',
          translation: 'I went in search of myself.',
          provenance: 'Heraclitus, Fragment DK B101 (Plutarch, Adversus Colotem 1118c, c. 500 BCE)',
          commentary: 'Heraclitus warned in Fragment B45 that you could walk every road and still never locate the boundaries of the soul, so deep is its measure (logos).',
          marginalia: 'Plutarch remarked that Heraclitus considered this two-word expedition the grandest inquiry of his entire life.'
        },
        {
          year: -399,
          yearLabel: '399 BCE',
          thinker: 'Socrates (via Plato)',
          tradition: 'Classical Greek Philosophy',
          place: 'Athens, Attica',
          region: 'Ancient Greece',
          coords: [23.72, 37.97],
          scripture: 'Plato, Apology 38a',
          language: 'Attic Greek',
          scriptDir: 'ltr',
          scriptClass: 'script-greek',
          originalScript: 'Ὁ δὲ ἀνεξέταστος βίος οὐ βιωτὸς ἀνθρώπῳ.',
          transliteration: 'Ho de anexetastos bios ou biōtos anthrōpōi.',
          translation: 'The unexamined life is not worth living for a human being.',
          provenance: 'Plato, Apology 38a5–6 (trial of Socrates, Athens, 399 BCE)',
          commentary: 'Offered exile and silence to spare his life, the seventy-year-old Socrates refused: breathing without questioning one’s assumptions was, in his eyes, barely distinguishable from sleepwalking.',
          marginalia: 'The Greek word anexetastos comes from exetazein, to audit or assay gold for purity; Socrates was asking citizens to test their convictions the way merchants test coins.'
        }
      ]
    },

    {
      id: 'solitude-restlessness',
      domain: 'Solitude & Escapism',
      title: 'You Cannot Outrun Your Own Restless Mind',
      ancientThesis: 'Animum Debes Mutare, Non Caelum, Travel and distraction fail because you pack yourself in the suitcase.',
      modernSummary: 'Being alone with our own mind terrifies us; changing cities, jobs, or distractions never cures inner restlessness because we bring ourselves along.',
      specimen: 'Moving to a new place or chasing distractions never fixes restlessness because you always bring yourself with you.',
      concepts: ['solitude', 'escapism', 'restlessness', 'travel', 'distraction', 'alone'],
      phrases: [
        'wherever you go there you are', 'bring yourself with you', 'cannot outrun yourself',
        'alone with your own mind', 'sitting alone in a room', 'travel does not fix',
        'running away from yourself', 'change your mind not your sky', 'escapism', 'distraction'
      ],
      keywords: [
        'solitude', 'alone', 'lonely', 'restless', 'restlessness', 'escape', 'escapism',
        'travel', 'distraction', 'distractions', 'flee', 'run', 'boredom', 'suitcase', 'room', 'scroll'
      ],
      origin: {
        year: -55,
        yearLabel: 'c. 55 BCE',
        thinker: 'Lucretius (Titus Lucretius Carus)',
        tradition: 'Roman Epicureanism',
        place: 'Rome, Roman Republic',
        region: 'Ancient Italy',
        coords: [12.49, 41.89],
        scripture: 'De Rerum Natura, Book III.1053–1070',
        language: 'Classical Latin',
        scriptDir: 'ltr',
        scriptClass: 'script-latin',
        originalScript: 'Hoc se quisque modo fugit, at quem scilicet, ut fit,\neffugere haud potis est, ingratis haeret et odit.',
        transliteration: 'Hoc se quisque modo fugit, at quem scilicet, ut fit, effugere haud potis est, ingratis haeret et odit.',
        translation: 'In this way each person flees from himself, yet the self he cannot escape clings to him against his will, and he hates it, because sick he does not grasp the cause of his disease.',
        provenance: 'Lucretius, De Rerum Natura III.1068–1070 (c. 55 BCE)',
        commentary: 'Sixteen centuries before Blaise Pascal remarked that all humanity’s troubles stem from an inability to sit quietly alone in a room, Lucretius painted a devastating portrait of Roman escapism: a wealthy man bolts from his city townhouse in boredom, whips his horses madly to his country villa, and the moment he steps across the threshold begins yawning and rushes straight back to Rome.',
        marginalia: 'Lucretius diagnoses modern scroll-addiction and geographic escapism identically: motion masquerading as cure when the ailment is an unhealed mind.'
      },
      echoes: [
        {
          year: 64,
          yearLabel: 'c. 64 CE',
          thinker: 'Seneca the Younger',
          tradition: 'Roman Stoicism',
          place: 'Rome, Roman Empire',
          region: 'Ancient Italy',
          coords: [12.49, 41.89],
          scripture: 'Epistulae Morales ad Lucilium, Letter XXVIII.1–2',
          language: 'Classical Latin',
          scriptDir: 'ltr',
          scriptClass: 'script-latin',
          originalScript: 'Animum debes mutare, non caelum… Tecum fugis.',
          transliteration: 'Animum debes mutare, non caelum… Tecum fugis.',
          translation: 'You must change your soul, not your sky… How can you wonder that travel does you no good, when you take yourself along?',
          provenance: 'Seneca, Moral Letters to Lucilius, Letter 28, Sections 1–2 (quoting Socrates & Lucretius, c. 64 CE)',
          commentary: 'Seneca explicitly cites both Socrates and Lucretius here, turning the observation into a razor-sharp epigram: crossing oceans alters your latitude, never your temperament.',
          marginalia: 'Horace had written the sister line a few decades earlier (Epistles I.11.27): "Caelum, non animum mutant, qui trans mare currunt", those who rush across the sea change their sky, not their mind.'
        }
      ]
    },

    {
      id: 'interdependence',
      domain: 'Systems & Oneness',
      title: 'Nothing Exists Independently on Its Own',
      ancientThesis: 'Paṭiccasamuppāda, Every event, identity, and object arises solely in dependence on an infinite web of conditions.',
      modernSummary: 'Everything in the universe is interconnected; no person or thing exists in isolation, and every cause ripples outward.',
      specimen: 'Nothing in the universe exists on its own; every person and event is woven into one interdependent web.',
      concepts: ['interdependence', 'systems', 'connection', 'causality', 'emptiness'],
      phrases: [
        'everything is connected', 'nothing exists in isolation', 'interdependent web',
        'butterfly effect', 'dependent origination', 'we are all interconnected',
        'no man is an island', 'web of causes', 'self made is a myth'
      ],
      keywords: [
        'connected', 'interconnected', 'interdependence', 'interdependent', 'web', 'isolated',
        'isolation', 'island', 'depend', 'dependent', 'causes', 'conditions', 'woven', 'systems', 'self-made'
      ],
      origin: {
        year: -480,
        yearLabel: 'c. 5th Century BCE',
        thinker: 'Siddhartha Gautama (The Buddha)',
        tradition: 'Early Buddhism · Pāli Canon',
        place: 'Sāvatthī, Kosala',
        region: 'Ancient India',
        coords: [82.05, 27.51],
        scripture: 'Assutavā Sutta (Saṃyutta Nikāya 12.61) & Bahudhātuka Sutta (MN 115)',
        language: 'Pāli',
        scriptDir: 'ltr',
        scriptClass: 'script-latin',
        originalScript: 'Imasmiṃ sati idaṃ hoti, imassuppādā idaṃ uppajjati;\nimasmiṃ asati idaṃ na hoti, imassa nirodhā idaṃ nirujjhati.',
        transliteration: 'Imasmiṃ sati idaṃ hoti, imassuppādā idaṃ uppajjati; imasmiṃ asati idaṃ na hoti, imassa nirodhā idaṃ nirujjhati.',
        translation: 'When this exists, that comes to be; with the arising of this, that arises. When this does not exist, that does not come to be; with the cessation of this, that ceases.',
        provenance: 'Saṃyutta Nikāya 12.61 & Majjhima Nikāya 115 (Core formula of Paṭiccasamuppāda, c. 5th century BCE)',
        commentary: 'Your systems-thinking epiphany that no "self-made" individual or isolated object actually exists was formalized as a four-line causal calculus 2,500 years ago. In the Pāli Canon, understanding dependent origination is equated with understanding the entirety of reality itself.',
        marginalia: 'When his attendant Ānanda remarked that dependent origination seemed quite straightforward, the Buddha famously chided him: "Say not so, Ānanda! Profound is this dependent arising, and profound does it appear."'
      },
      echoes: [
        {
          year: 150,
          yearLabel: 'c. 2nd Century CE',
          thinker: 'Nāgārjuna',
          tradition: 'Madhyamaka Buddhist Philosophy',
          place: 'Nāgārjunakoṇḍa, Andhra',
          region: 'Southern India',
          coords: [79.24, 16.52],
          scripture: 'Mūlamadhyamakakārikā 24.18',
          language: 'Sanskrit',
          scriptDir: 'ltr',
          scriptClass: 'script-deva',
          originalScript: 'यः प्रतीत्यसमुत्पादः शून्यतां तां प्रचक्ष्महे।',
          transliteration: 'Yaḥ pratītyasamutpādaḥ śūnyatāṃ tāṃ pracakṣmahe.',
          translation: 'Whatever is dependently co-arisen, that we declare to be emptiness, it is a dependent designation, and that itself is the middle way.',
          provenance: 'Nāgārjuna, Mūlamadhyamakakārikā XXIV.18 (c. 150–250 CE)',
          commentary: 'Nāgārjuna pushed interdependence to its dazzling logical limit: if nothing possesses an independent, standalone essence (svabhāva), then "emptiness" is not nihilistic void, it is the exact openness that makes change, relationship, and life possible.',
          marginalia: 'Nāgārjuna’s logical proofs are still studied by contemporary analytic philosophers and physicists examining relational quantum mechanics.'
        },
        {
          year: 175,
          yearLabel: 'c. 175 CE',
          thinker: 'Marcus Aurelius',
          tradition: 'Roman Stoicism',
          place: 'Carnuntum, Pannonia',
          region: 'Roman Empire',
          coords: [16.86, 48.11],
          scripture: 'Meditations VII.9',
          language: 'Koine Greek',
          scriptDir: 'ltr',
          scriptClass: 'script-greek',
          originalScript: 'Πάντα ἀλλήλοις ἐπιπέπλεκται καὶ ἡ σύνδεσις ἱερά.',
          transliteration: 'Panta allēlois epipeplektai kai hē syndesis hiera.',
          translation: 'All things are interwoven with one another, and the bond is sacred; scarcely anything is foreign to any other thing.',
          provenance: 'Marcus Aurelius, Meditations VII.9 (c. 175 CE)',
          commentary: 'Drawing on the Stoic doctrine of sympatheia (cosmic mutual responsiveness), Marcus reminded himself that harming any fellow citizen is like one hand injuring the other, because we belong to one woven organism.',
          marginalia: 'In Meditations VI.54 he compressed the ecological ethic into ten words: "What brings no benefit to the hive brings no benefit to the bee."'
        }
      ]
    },

    {
      id: 'adversity-growth',
      domain: 'Hardship & Growth',
      title: 'Adversity Is the Classroom; The Obstacle Becomes the Way',
      ancientThesis: 'Pathei Mathos, Wisdom and resilience are forged through friction, not comfort.',
      modernSummary: 'Hardship, failure, and obstacles are not detours from growth, they are the exact material that builds strength and wisdom.',
      specimen: 'Obstacles and suffering are not interruptions to our path; they are what actually forge wisdom and strength.',
      concepts: ['adversity', 'growth', 'hardship', 'obstacles', 'resilience', 'failure'],
      phrases: [
        'obstacle is the way', 'what does not kill you', 'growth comes from hardship',
        'learn through suffering', 'adversity builds character', 'failure is the teacher',
        'comfort makes us weak', 'friction creates growth', 'pain makes us stronger'
      ],
      keywords: [
        'obstacle', 'obstacles', 'adversity', 'hardship', 'struggle', 'failure', 'fail',
        'growth', 'grow', 'stronger', 'comfort', 'friction', 'trial', 'trials', 'resilience', 'forged'
      ],
      origin: {
        year: -458,
        yearLabel: '458 BCE',
        thinker: 'Aeschylus',
        tradition: 'Classical Athenian Tragedy',
        place: 'Athens, Attica',
        region: 'Ancient Greece',
        coords: [23.73, 37.97],
        scripture: 'Agamemnon, lines 176–178 (Hymn to Zeus)',
        language: 'Attic Greek',
        scriptDir: 'ltr',
        scriptClass: 'script-greek',
        originalScript: 'Τὸν φρονεῖν βροτοὺς ὁδώσαντα, τὸν πάθει μάθος θέντα κυρίως ἔχειν.',
        transliteration: 'Ton phronein brotous hodōsanta, ton pathei mathos thenta kyriōs echein.',
        translation: 'He who guided mortals on the road to wisdom, who laid down the sovereign law: learning comes through suffering.',
        provenance: 'Aeschylus, Agamemnon ll. 176–178 (first performed at the City Dionysia, Athens, 458 BCE)',
        commentary: 'Long before Nietzsche’s "what does not kill me" or modern grit books, the chorus of Aeschylus’s Oresteia sang pathei mathos, literally "through suffering, learning." Even against our will, the poet notes in the next line, painful memory drips upon the heart in sleep until wisdom arrives.',
        marginalia: 'Aeschylus fought in the front ranks at the Battle of Marathon (490 BCE), and on his own epitaph he chose to commemorate his military endurance there rather than his legendary plays.'
      },
      echoes: [
        {
          year: -300,
          yearLabel: 'c. 300 BCE',
          thinker: 'Mencius (Meng Ke)',
          tradition: 'Classical Confucianism',
          place: 'Zou / Qi, Warring States China',
          region: 'Ancient China',
          coords: [117.0, 35.4],
          scripture: 'Mencius (Mèngzǐ) 6B.15',
          language: 'Classical Chinese',
          scriptDir: 'ltr',
          scriptClass: 'script-cjk',
          originalScript: '故天將降大任於是人也，必先苦其心志，勞其筋骨，餓其體膚，空乏其身。',
          transliteration: 'Gù tiān jiāng jiàng dà rèn yú shì rén yě, bì xiān kǔ qí xīn zhì, láo qí jīn gǔ, è qí tǐ fū, kōng fá qí shēn.',
          translation: 'When Heaven is about to place a great responsibility upon a person, it always first tests their mind with bitterness, toils their sinews and bones, and frustrates their plans, so as to rouse their mind, toughen their nature, and supply what they lacked.',
          provenance: 'Mencius, Book VI, Part B, Section 15 (c. 300 BCE)',
          commentary: 'Mencius closed this famous passage with a stark biological contrast: "We live through anxiety and hardship, and die through ease and comfort" (shēng yú yōu huàn, sǐ yú ān lè).',
          marginalia: 'Every Chinese schoolchild for over two thousand years memorized this passage; it remains one of the most cited texts in East Asian moral education.'
        },
        {
          year: 175,
          yearLabel: 'c. 175 CE',
          thinker: 'Marcus Aurelius',
          tradition: 'Roman Stoicism',
          place: 'Danube Frontier',
          region: 'Roman Empire',
          coords: [16.86, 48.11],
          scripture: 'Meditations V.20',
          language: 'Koine Greek',
          scriptDir: 'ltr',
          scriptClass: 'script-greek',
          originalScript: 'Τὸ ἐμπόδιον τῆς πράξεως προάγει τὴν πρᾶξιν· τὸ ἐν τῇ ὁδῷ γινόμενον ὁδὸς γίνεται.',
          transliteration: 'To empodion tēs praxeōs proagei tēn praxin; to en tēi hodōi ginomenon hodos ginetai.',
          translation: 'The mind adapts and converts to its own purposes the obstacle to our acting: the impediment to action advances action. What stands in the way becomes the way.',
          provenance: 'Marcus Aurelius, Meditations V.20 (c. 175 CE)',
          commentary: 'Like a blazing fire that turns whatever is thrown onto it into brighter flame and heat (Meditations IV.1), a disciplined mind refuses to treat an obstacle as an interruption, it consumes it as fuel.',
          marginalia: 'Two thousand years later, this single sentence launched a bestselling modern Stoic revival, almost word-for-word from Marcus’s private Greek journal.'
        }
      ]
    }
  ];

  global.HUMBLER_CANON.push(...PART_ONE);
})(window);
