export const HighlightIncWordsCardData = [
  {
    id: 1,
    textValue:
      "Height is correlated with a lot of things. Up to a certain height, taller people make more money than the vertically challenged. And the taller professional candidate almost always wins. Now a study finds that your height as an adult has a profound effect on your perception of your health. Short people judge their health to be worse than medium or tall people judge theirs. The research was published in the journal Medical Endocrinology. Data for the study came from the 2003 Health Survey for England. More than 14,000 participants filled out questionnaires and had their heights measured. The study only looked at how good the subject thought his or her health was, not their actual health. Questions focused on five areas: mobility, self-care, normal activities, pain or discomfort, and anxiety or depression. Men shorter than about 5'4 and women shorter than 5' reported the worst impressions. But small increases in height at the low end had much bigger effects on inspection than the same increases among taller people. Other studies have shown, ironically, that shorter people on average actually live longer.",
    incorrectWords: ["professional", "medium", "Medical", "inspection"],
    correctWords: ["presidential", "average", "Clinical", "perception"],
  },
];

export const FillTheBlanksCardData = [
  {
    id: 1,
    textValue:
      "A landmark ethnobotanical study recently uncovered the use of a previously unknown # plant among tribes in the Amazon. Researchers, collaborating with the #, are now into the plant's potential, # the traditional knowledge while its application in modern medicine. The plant, which the tribes call yakumama, has shown #  and anti-microbial properties in preliminary tests.",
    correctFillingWords: [
      "medicinal",
      "tribes",
      "respecting",
      "anti-inflammatory",
    ],
  },
];

export const MCQsComponentData = [
  {
    id: 1,
    question:
      "Which of the following most accurately summarizes the opinion of the author in the text?",
    answers: [
      "A) The study of family history began hundreds of years ago in North Africa in order to establish such things as ownership of property. It rapidly became a common practice in many cultures because inheritance played such an important role in society and government.",
      "B) Research into family history by ordinary people only started to become far more widespread in the early nineteenth century. Prior to that time, it was chiefly rich. important and powerful families who had an interest and involvement in this type of activity.",
      "C) All social classes of the general population have always been interested in recording their family history. but genealogy became really popular in the early nineteenth century due to the publication of a book concerning the methodology of determining family history.",
      "D) Originally. tracing family history was only used in order to establish the origins of prosperous and powerful families. However. by the middle of the twentieth century. ordinary people were also starting to show an interest in researching their family background too.",
    ],
    render: "single",
    // pass prop 'single' to render single answer selection component
    // pass prop 'multiple to render multiple answer selection component
  },
];

export const ListeningMCSData = [
  {
    id: 1,
    question:
      "Which of the following most accurately summarizes the opinion of the author in the text?",
    answers: [
      "A) The author believes that the maps are an accurate representation of post-war London.",
      "B) The author believes that the maps give information about London’s destruction in World War II.",
      "C) The author believes that the maps are a beautiful and accurate representation of pre-war London.",
      "D) The author believes that the maps are a valuable piece of World War II history.",
    ],
    render: "single",
  },
];

export const ListeningSMWData = [
  {
    id: 1,
    question: "Select Missing Word from the following.",
    answers: [
      "A) took place",
      "B) were at stake",
      "C) were discovered",
      "D) could fail",
    ],
    render: "single",
  },
];

export const AiScoreCardSSTData = [
  {
    id: 1,
    EnableSkills: [
      { component: "Content", score: "2/3", suggestion: "Great!" },
      {
        component: "Form",
        score: "2/2",
        suggestion: "Great Form",
      },
      {
        component: "Grammar",
        score: "1/2",
        suggestion: "Great grammar!",
      },
      {
        component: "Spelling",
        score: "1/2",
        suggestion: "Great spelling!",
      },
      {
        component: "Vocabulary Range",
        score: "2/4",
        suggestion: "Great! A good range of vocabulary is used.",
      },
      {
        component: "General linguistic range",
        score: "2/4",
        suggestion: "Good! Various sentence structures are used.",
      },
      {
        component: "Development, structure and coherence",
        score: "2/4",
        suggestion: "Great! Clear essay structure.",
      },
    ],
    WritingData: { score: "12", totalScore: "15" },
    UserResponseData: {
      textValue:
        "Rosalind Franklin's contributions to the discovery of DNA structure remain one of the most compelling narratives in the annals of scientific research. Born in 1920 in London, Franklin was a gifted scientist whose work in X-ray crystallography was instrumental in understanding the molecular structure of DNA.\n\nFranklin's journey in science began at Cambridge University, where her passion for chemistry and physics blossomed. Her most significant work unfolded at King's College London, where she used X-ray diffraction methods to study DNA. Franklin's photographs, particularly Photo 51, revealed critical clues about DNA's structure. Her images showed DNA to be a double helix, a discovery that was pivotal to the work of James Watson and Francis Crick, who later won the Nobel Prize for this groundbreaking finding.\n\nDespite her crucial role, Franklin's contributions were overshadowed in a male-dominated field, and her work was only fully recognized posthumously. She faced gender-based discrimination, yet remained undeterred in her pursuit of scientific excellence. Franklin's dedication to her research was unwavering, even as she battled ovarian cancer, which tragically cut her life short at the age of 37.\n\nToday, Rosalind Franklin is celebrated as a pioneering figure in molecular biology. Her legacy lives on, not only in the realm of DNA research but also as an inspiration for women in science. She broke barriers and paved the way for future generations of female scientists, showing the world the invaluable contributions women can make in the field of science and research.\n\nIn conclusion, Rosalind Franklin's story is a poignant reminder of the unrecognized heroes of scientific discovery. Her determination, expertise, and significant findings in DNA structure have left an indelible mark on the world of science and medicine.",
    },
  },
];

export const AiScorePopupReadingWFDData = [
  {
    id: 1,
    EnableSkills: [
      { component: "Words", score: "4/4", suggestion: "Excellent!" },
    ],
    SmallScoreCard: [
      {
        key: "Score",
        HeaderBgColor: "#868EAF",
        Heading: "Score",
        score: "2",
        totalScore: "4",
        progressColorFilled: "#868EAF",
        progressColorUnfilled: "#E5DAFF",
        scoreColor: "#868EAF",
      },
      // {
      //   key: "reading",
      //   HeaderBgColor: "#AD826E",
      //   Heading: "Reading",
      //   score: "2",
      //   totalScore: "4",
      //   progressColorFilled: "#AD826E",
      //   progressColorUnfilled: "#E5DAFF",
      //   scoreColor: "#AD826E",
      // },
      // {
      //   key: "Score",
      //   HeaderBgColor: "#996CFE",
      //   Heading: "Score",
      //   score: "1",
      //   totalScore: "4",
      //   progressColorFilled: "#996CFE",
      //   progressColorUnfilled: "#E5DAFF",
      //   scoreColor: "#996CFE",
      // },
    ],
  },
];

export const AiScorePopupListeningHCSData = [
  {
    id: 1,
    EnableSkills: [
      { component: "Choice", score: "4/4", suggestion: "Excellent!" },
    ],
    SmallScoreCard: [
      {
        key: "Score",
        HeaderBgColor: "#868EAF",
        Heading: "Score",
        score: "2",
        totalScore: "4",
        progressColorFilled: "#868EAF",
        progressColorUnfilled: "#E5DAFF",
        scoreColor: "#868EAF",
      },
      // {
      //   key: "Listening",
      //   HeaderBgColor: "#868EAF",
      //   Heading: "Listening",
      //   score: "2",
      //   totalScore: "4",
      //   progressColorFilled: "#868EAF",
      //   progressColorUnfilled: "#E5DAFF",
      //   scoreColor: "#868EAF",
      // },
      // {
      //   key: "reading",
      //   HeaderBgColor: "#AD826E",
      //   Heading: "Reading",
      //   score: "2",
      //   totalScore: "4",
      //   progressColorFilled: "#AD826E",
      //   progressColorUnfilled: "#E5DAFF",
      //   scoreColor: "#AD826E",
      // },
      // {
      //   key: "Overall",
      //   HeaderBgColor: "#996CFE",
      //   Heading: "Overall",
      //   score: "1",
      //   totalScore: "4",
      //   progressColorFilled: "#996CFE",
      //   progressColorUnfilled: "#E5DAFF",
      //   scoreColor: "#996CFE",
      // },
    ],
    UserResponse: {
      textValue:
        "Rosalind Franklin's from Cambridge University had passion for chemistry and physics. At King's College London, she used X-ray diffraction method to studt DNA. Het photo 51, revealed clues about DNA structure.Her discovery shows double helix discovery that was pivotal to the work of James Watson and Francis Crick. Her contributions were overtaken by male dominated field whereby her work wad not fully recognised. Faced with gender discrimination she remained stern to persue.",
    },
  },
];

export const AiScorePopupListeningFIBData = [
  {
    id: 1,
    EnableSkills: [
      { component: "Blanks", score: "4/4", suggestion: "Excellent!" },
    ],
    SmallScoreCard: [
      {
        key: "Score",
        HeaderBgColor: "#868EAF",
        Heading: "Score",
        score: "2",
        totalScore: "4",
        progressColorFilled: "#868EAF",
        progressColorUnfilled: "#E5DAFF",
        scoreColor: "#868EAF",
      },
      // {
      //   key: "reading",
      //   HeaderBgColor: "#AD826E",
      //   Heading: "Reading",
      //   score: "2",
      //   totalScore: "4",
      //   progressColorFilled: "#AD826E",
      //   progressColorUnfilled: "#E5DAFF",
      //   scoreColor: "#AD826E",
      // },
      // {
      //   key: "Overall",
      //   HeaderBgColor: "#996CFE",
      //   Heading: "Overall",
      //   score: "1",
      //   totalScore: "4",
      //   progressColorFilled: "#996CFE",
      //   progressColorUnfilled: "#E5DAFF",
      //   scoreColor: "#996CFE",
      // },
    ],
    UserResponse: {
      textValue:
        "Rosalind Franklin's from Cambridge University had passion for chemistry and physics. At King's College London, she used X-ray diffraction method to studt DNA. Het photo 51, revealed clues about DNA structure.Her discovery shows double helix discovery that was pivotal to the work of James Watson and Francis Crick. Her contributions were overtaken by male dominated field whereby her work wad not fully recognised. Faced with gender discrimination she remained stern to persue.",
    },
  },
];

export const AiScorePopupListeningMCMData = [
  {
    id: 1,
    EnableSkills: [
      { component: "Choice", score: "4/4", suggestion: "Excellent!" },
    ],
    SmallScoreCard: [
      {
        key: "Score",
        HeaderBgColor: "#868EAF",
        Heading: "Score",
        score: "2",
        totalScore: "4",
        progressColorFilled: "#868EAF",
        progressColorUnfilled: "#E5DAFF",
        scoreColor: "#868EAF",
      },
      // {
      //   key: "reading",
      //   HeaderBgColor: "#AD826E",
      //   Heading: "Reading",
      //   score: "2",
      //   totalScore: "4",
      //   progressColorFilled: "#AD826E",
      //   progressColorUnfilled: "#E5DAFF",
      //   scoreColor: "#AD826E",
      // },
      // {
      //   key: "Overall",
      //   HeaderBgColor: "#996CFE",
      //   Heading: "Overall",
      //   score: "1",
      //   totalScore: "4",
      //   progressColorFilled: "#996CFE",
      //   progressColorUnfilled: "#E5DAFF",
      //   scoreColor: "#996CFE",
      // },
    ],
    UserResponse: {
      textValue:
        "Rosalind Franklin's from Cambridge University had passion for chemistry and physics. At King's College London, she used X-ray diffraction method to studt DNA. Het photo 51, revealed clues about DNA structure.Her discovery shows double helix discovery that was pivotal to the work of James Watson and Francis Crick. Her contributions were overtaken by male dominated field whereby her work wad not fully recognised. Faced with gender discrimination she remained stern to persue.",
    },
  },
];

export const AiScorePopupListeningMCSData = [
  {
    id: 1,
    EnableSkills: [
      { component: "Choice", score: "4/4", suggestion: "Excellent!" },
    ],
    SmallScoreCard: [
      {
        key: "Score",
        HeaderBgColor: "#868EAF",
        Heading: "Score",
        score: "2",
        totalScore: "4",
        progressColorFilled: "#868EAF",
        progressColorUnfilled: "#E5DAFF",
        scoreColor: "#868EAF",
      },
      // {
      //   key: "reading",
      //   HeaderBgColor: "#AD826E",
      //   Heading: "Reading",
      //   score: "2",
      //   totalScore: "4",
      //   progressColorFilled: "#AD826E",
      //   progressColorUnfilled: "#E5DAFF",
      //   scoreColor: "#AD826E",
      // },
      // {
      //   key: "Overall",
      //   HeaderBgColor: "#996CFE",
      //   Heading: "Overall",
      //   score: "1",
      //   totalScore: "4",
      //   progressColorFilled: "#996CFE",
      //   progressColorUnfilled: "#E5DAFF",
      //   scoreColor: "#996CFE",
      // },
    ],
    UserResponse: {
      textValue:
        "Rosalind Franklin's from Cambridge University had passion for chemistry and physics. At King's College London, she used X-ray diffraction method to studt DNA. Het photo 51, revealed clues about DNA structure.Her discovery shows double helix discovery that was pivotal to the work of James Watson and Francis Crick. Her contributions were overtaken by male dominated field whereby her work wad not fully recognised. Faced with gender discrimination she remained stern to persue.",
    },
  },
];

export const AiScorePopupListeningSMWData = [
  {
    id: 1,
    EnableSkills: [
      { component: "Choice", score: "4/4", suggestion: "Excellent!" },
    ],
    SmallScoreCard: [
      {
        key: "Score",
        HeaderBgColor: "#868EAF",
        Heading: "Score",
        score: "2",
        totalScore: "4",
        progressColorFilled: "#868EAF",
        progressColorUnfilled: "#E5DAFF",
        scoreColor: "#868EAF",
      },
      // {
      //   key: "reading",
      //   HeaderBgColor: "#AD826E",
      //   Heading: "Reading",
      //   score: "2",
      //   totalScore: "4",
      //   progressColorFilled: "#AD826E",
      //   progressColorUnfilled: "#E5DAFF",
      //   scoreColor: "#AD826E",
      // },
      // {
      //   key: "Overall",
      //   HeaderBgColor: "#996CFE",
      //   Heading: "Overall",
      //   score: "1",
      //   totalScore: "4",
      //   progressColorFilled: "#996CFE",
      //   progressColorUnfilled: "#E5DAFF",
      //   scoreColor: "#996CFE",
      // },
    ],
    UserResponse: {
      textValue:
        "Rosalind Franklin's from Cambridge University had passion for chemistry and physics. At King's College London, she used X-ray diffraction method to studt DNA. Het photo 51, revealed clues about DNA structure.Her discovery shows double helix discovery that was pivotal to the work of James Watson and Francis Crick. Her contributions were overtaken by male dominated field whereby her work wad not fully recognised. Faced with gender discrimination she remained stern to persue.",
    },
  },
];

export const AiScorePopupListeningHIWData = [
  {
    id: 1,
    EnableSkills: [
      { component: "Words", score: "4/4", suggestion: "Excellent!" },
    ],
    SmallScoreCard: [
      {
        key: "Score",
        HeaderBgColor: "#868EAF",
        Heading: "Score",
        score: "2",
        totalScore: "4",
        progressColorFilled: "#868EAF",
        progressColorUnfilled: "#E5DAFF",
        scoreColor: "#868EAF",
      },
      // {
      //   key: "reading",
      //   HeaderBgColor: "#AD826E",
      //   Heading: "Reading",
      //   score: "2",
      //   totalScore: "4",
      //   progressColorFilled: "#AD826E",
      //   progressColorUnfilled: "#E5DAFF",
      //   scoreColor: "#AD826E",
      // },
      // {
      //   key: "Overall",
      //   HeaderBgColor: "#996CFE",
      //   Heading: "Overall",
      //   score: "1",
      //   totalScore: "4",
      //   progressColorFilled: "#996CFE",
      //   progressColorUnfilled: "#E5DAFF",
      //   scoreColor: "#996CFE",
      // },
    ],
    UserResponse: {
      textValue:
        "Rosalind Franklin's from Cambridge University had passion for chemistry and physics. At King's College London, she used X-ray diffraction method to studt DNA. Het photo 51, revealed clues about DNA structure.Her discovery shows double helix discovery that was pivotal to the work of James Watson and Francis Crick. Her contributions were overtaken by male dominated field whereby her work wad not fully recognised. Faced with gender discrimination she remained stern to persue.",
    },
  },
];

export const AiScorePopupListeningSSTData = [
  {
    id: 1,
    EnableSkills: [
      { component: "Choice", score: "4/4", suggestion: "Excellent!" },
    ],
    SmallScoreCard: [
      {
        key: "Score",
        HeaderBgColor: "#868EAF",
        Heading: "Score",
        score: "2",
        totalScore: "10",
        progressColorFilled: "#868EAF",
        progressColorUnfilled: "#E5DAFF",
        scoreColor: "#868EAF",
      },
      // {
      //   key: "reading",
      //   HeaderBgColor: "#AD826E",
      //   Heading: "Reading",
      //   score: "2",
      //   totalScore: "10",
      //   progressColorFilled: "#AD826E",
      //   progressColorUnfilled: "#E5DAFF",
      //   scoreColor: "#AD826E",
      // },
      // {
      //   key: "Overall",
      //   HeaderBgColor: "#996CFE",
      //   Heading: "Overall",
      //   score: "1",
      //   totalScore: "10",
      //   progressColorFilled: "#996CFE",
      //   progressColorUnfilled: "#E5DAFF",
      //   scoreColor: "#996CFE",
      // },
    ],
    UserResponse: {
      textValue:
        "Rosalind Franklin's from Cambridge University had passion for chemistry and physics. At King's College London, she used X-ray diffraction method to studt DNA. Het photo 51, revealed clues about DNA structure.Her discovery shows double helix discovery that was pivotal to the work of James Watson and Francis Crick. Her contributions were overtaken by male dominated field whereby her work wad not fully recognised. Faced with gender discrimination she remained stern to persue.",
    },
  },
];

export const AiScorePopupListeningWFDData = [
  {
    id: 1,
    EnableSkills: [
      { component: "Words", score: "4/4", suggestion: "Excellent!" },
    ],
    SmallScoreCard: [
      {
        key: "Score",
        HeaderBgColor: "#868EAF",
        Heading: "Score",
        score: "2",
        totalScore: "4",
        progressColorFilled: "#868EAF",
        progressColorUnfilled: "#E5DAFF",
        scoreColor: "#868EAF",
      },
      // {
      //   key: "Writing",
      //   HeaderBgColor: "#AD826E",
      //   Heading: "Writing",
      //   score: "2",
      //   totalScore: "4",
      //   progressColorFilled: "#AD826E",
      //   progressColorUnfilled: "#E5DAFF",
      //   scoreColor: "#AD826E",
      // },
      // {
      //   key: "Overall",
      //   HeaderBgColor: "#996CFE",
      //   Heading: "Overall",
      //   score: "1",
      //   totalScore: "4",
      //   progressColorFilled: "#996CFE",
      //   progressColorUnfilled: "#E5DAFF",
      //   scoreColor: "#996CFE",
      // },
    ],
  },
];
