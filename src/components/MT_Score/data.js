import AI_Score from "../../assets/images/aiscoresvg.svg";

export const CircularScoreProgressData1 = [
  {
    id: 1,
    CircularScoreProgress: [
      {
        key: "Reading",
        HeaderBgColor: "#AD826E",
        Title: "Reading",
        score: "3",
        totalScore: "10",
        progressColorFilled: "#AD826E",
        progressColorUnfilled: "#E5DAFF",
        scoreColor: "#AD826E",
      },
      {
        key: "Listening",
        HeaderBgColor: "#868EAF",
        Title: "Listening",
        score: "8",
        totalScore: "10",
        progressColorFilled: "#868EAF",
        progressColorUnfilled: "#E5DAFF",
        scoreColor: "#868EAF",
      },
    ],
  },
];

export const CircularScoreProgressData2 = [
  {
    id: 1,
    CircularScoreProgress: [
      {
        key: "Speaking",
        HeaderBgColor: "#49D7F2",
        Title: "Speaking",
        score: "7",
        totalScore: "10",
        progressColorFilled: "#49D7F2",
        progressColorUnfilled: "#E5DAFF",
        scoreColor: "#49D7F2",
      },
      {
        key: "Writing",
        HeaderBgColor: "#FF5D5D",
        Title: "Writing",
        score: "6",
        totalScore: "10",
        progressColorFilled: "#FF5D5D",
        progressColorUnfilled: "#E5DAFF",
        scoreColor: "#FF5D5D",
      },
    ],
  },
];

export const skillsData = [
  {
    title: "Speaking",
    score: 100,
    progressColor: "#49D7F2",
  },
  {
    title: "Writing",
    score: 100,
    progressColor: "#FF5D5D",
  },
  {
    title: "Reading",
    score: 100,
    progressColor: "#AD826E",
  },
  {
    title: "Listening",
    score: 100,
    progressColor: "#868EAF",
  },
];

export const EnablingSkillsData = [
  {
    title: "Grammar",
    skill: 'grammar',
    score: 23,
    progressColor: "#996CFE",
  },
  {
    title: "Oral Fluency",
    skill: 'fluency',
    score: 40,
    progressColor: "#996CFE",
  },
  {
    title: "Pronounciation",
    skill: 'pronounciation',
    score: 75,
    progressColor: "#996CFE",
  },
  {
    title: "Spelling",
    skill: 'spelling',
    score: 34,
    progressColor: "#996CFE",
  },
  {
    title: "Vocabulary",
    skill: 'vocab',
    score: 24,
    progressColor: "#996CFE",
  },
  {
    title: "Written Discourde",
    skill: 'discorude',
    score: 45,
    progressColor: "#996CFE",
  },
];

export const testData = {
  speaking: [
    {
      id: "#1001173",
      question: "Volcano Behaviours",
      questionText: "Question",
      aiScore: true,
      color: "#49D7F2",
      score: "85/100",
      src: AI_Score,
    },
  ],
  writing: [
    {
      id: "#1001174",
      question: "Global Warming Impact",
      questionText: "Question",
      aiScore: false,
      color: "#FF5D5D",
      score: "68/100",
    },
  ],
  reading: [
    {
      id: "#1001175",
      question: "Historical Literature Review",
      questionText: "Question",
      aiScore: false,
      color: "#AD826E",
      score: "74/90",
    },
  ],
  listening: [
    {
      id: "#1001176",
      question: "Modern Music Trends",
      questionText: "Question",
      aiScore: true,
      color: "#868EAF",
      score: "90/100",
      src: AI_Score,
    },
  ],
};

export const shortNamesMap = {
    "Read Aloud": "RA",
    "Repeat Sentence": "RS",
    "Describe Image": "DI",
    "Re-tell Lecture": "RL",
    "Respond to a situation": "RTS",
    "Answer Short Question": "ASQ",

    "Summarize Written Text": "SWT",
    "Write Essay": "WE",
    "Write Email": "WE",

 
    "Reading & Writing: Fill in the Blanks": "FIB",
    "Multiple Choice, Multiple Answers": "MCM",
    "Re-order Paragraphs": "ROP",
    "Reading: Fill in the Blanks": "FIB",
    "Multiple Choice, Single Answer": "MCS",

  
    "Summarize Spoken Text": "SST",
    "Listening: Multiple Choice, Multiple Answers": "MCM",
    "Fill in the Blanks": "FIB",
    "Write from Dictation": "WFD",
    "Highlight Correct Summary": "HCS",
    "Highlight Incorrect Words": "HIW",
    "Listening: Multiple Choice, Single Answer": "MCS",
    "Select Missing Word": "SMW",
  };

  export const SpeakingQuestionNames = [
    "Read Aloud",
    "Repeat Sentence",
    "Describe Image",
    "Re-tell Lecture",
    "Respond to a situation",
    "Answer Short Question",
  ];
  
  export const WritingQuestionNames = ["Summarize Written Text", "Write Essay", "Write Email"];
  
  export const ReadingQuestionNames = [
    "Reading & Writing: Fill in the Blanks",
    "Multiple Choice, Multiple Answers",
    "Re-order Paragraphs",
    "Reading: Fill in the Blanks",
    "Multiple Choice, Single Answer",
  ];
  
  export const ListeningQuestionNames = [
    "Summarize Spoken Text",
    "Listening: Multiple Choice, Multiple Answers",
    "Fill in the Blanks",
    "Highlight Correct Summary",
    "Listening: Multiple Choice, Single Answer",
    "Select Missing Word",
    "Highlight Incorrect Words",
    "Write from Dictation",
  ];

 export const MergedTestsForScoring = {
    'Speaking': [
      'Read Aloud', 'Repeat Sentence', 'Describe Image', 'Re-tell Lecture', 'Answer Short Question'
    ],
    'Writing': [
      'Summarize Written Text', 'Write Essay', 'Reading & Writing: Fill in the Blanks', 'Summarize Spoken Text', 'Fill in the Blanks', 'Write from Dictation'
    ],
    'Reading': [
      'Read Aloud', 'Summarize Written Text', 'Reading & Writing: Fill in the Blanks', 'Multiple Choice, Multiple Answers', 'Re-order Paragraphs', 'Reading: Fill in the Blanks', 'Multiple Choice, Single Answer', 'Highlight Correct Summary', 'Highlight Incorrect Words'
    ],
    'Listening': [
      'Repeat Sentence', 'Re-tell Lecture', 'Answer Short Question', 'Summarize Spoken Text', 'Listening: Multiple Choice, Multiple Answers', 'Fill in the Blanks', 'Highlight Correct Summary', 'Highlight Incorrect Words', 'Listening: Multiple Choice, Single Answer', 'Select Missing Word', 'Write from Dictation'
    ]
  };

  export const MergedTestsForScoringCore = {
    'Speaking': [
      'Read Aloud', 'Repeat Sentence', 'Describe Image', 'Answer Short Question', 'Respond to a situation'
    ],
    'Writing': [
      'Summarize Written Text', 'Write Essay', 'Reading & Writing: Fill in the Blanks', 'Summarize Spoken Text', 'Fill in the Blanks', 'Write from Dictation'
    ],
    'Reading': [
      'Read Aloud', 'Summarize Written Text', 'Reading & Writing: Fill in the Blanks', 'Multiple Choice, Multiple Answers', 'Re-order Paragraphs', 'Reading: Fill in the Blanks', 'Multiple Choice, Single Answer', 'Highlight Incorrect Words'
    ],
    'Listening': [
      'Repeat Sentence', 'Respond to a situation', 'Answer Short Question', 'Summarize Spoken Text', 'Listening: Multiple Choice, Multiple Answers', 'Fill in the Blanks', 'Highlight Incorrect Words', 'Listening: Multiple Choice, Single Answer', 'Select Missing Word', 'Write from Dictation'
    ]
  };
