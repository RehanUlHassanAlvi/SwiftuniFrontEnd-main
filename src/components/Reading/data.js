export const FillBlanksCardData = [
  {
    id: 1,
    textValue:
      "A landmark ~ ethnobotanical study recently ~ uncovered the use of a previously unknown medicinal plant among # tribes in the Amazon.Researchers, collaborating with the tribes, are now # into the plant's potential, respecting the traditional knowledge while # its application in modern medicine. The plant, which the tribes call yakumama, has shown anti-inflammatory and anti-microbial properties in preliminary tests.",
    fillingWords: [
      "impure",
      "vegetable",
      "spices",
      "used",
      "food",
      "culture",
      "manufactured",
    ],
  },
];

export const ReadingAndWritingBlanksData = [
  {
    id: 1,
    textValue:
      "A survey of 2700 AI researchers who have recently published work at six of the top AI conferences revealed that many of # see the possible future development of superhuman AI as having a non-trivial chance of causing human extinction or other extremely bad AI-related outcomes. Almost 58 percent of researchers said they considered that there is a 5 percent chance of such #. The survey also asked participants to share their thoughts on possible timelines for future AI technological milestones # and the good or bad societal consequences of those achievements. The surveyed researchers predicted that within the next decade, AI systems have a 50 percent or higher chance of successfully tackling most of 39 sample tasks, including writing new songs or coding an entire website from scratch. The possible development of AI that can outperform humans on every task was given a 50 percent # of happening by 2047, whereas the possibility of all human jobs becoming fully automatable was given a 50 percent chance to occur by 2116.",
    dropDownOptions: [
      ["their", "they", "them", "this"],
      ["if", "scenarios", "what", "why"],
      ["missing", "as well as", "cutting", "following"],
      ["of", "scratch", "out", "in"],
    ],
  },
];

export const ReOrderParagraphsData = [
  {
    id: 1,
    text: "Participants were divided into two groups: one engaged in regular exercise, while the other remained sedentary.",
  },
  {
    id: 2,
    text: "Over time, the exercise group reported a notable improvement in mental well-being, suggesting a positive correlation between physical activity and mental health.",
  },
  {
    id: 3,
    text: "A group of researchers set out to investigate the relationship between exercise and mental health.",
  },
  {
    id: 4,
    text: "Initially, there was no significant difference in mental health scores between the two groups.",
  },
];

//pop up card data, reading, MCMA
export const AiScorePopupReadingMCMAData = [
  {
    id: 1,
    EnableSkills: [
      { component: "Blanks", score: "4/4", suggestion: "Excellent!" },
    ],
    SmallScoreCard: [
      // {
      //   key: "reading",
      //   HeaderBgColor: "#AD826E",
      //   Heading: "Reading",
      //   score: "2",
      //   totalScore: '4',
      //   progressColorFilled: "#AD826E",
      //   progressColorUnfilled: "#E5DAFF",
      //   scoreColor: '#AD826E'
      // },
      // {
      //   key: "writing",
      //   HeaderBgColor: "#FF5D5D",
      //   Heading: "Writing",
      //   score: "1",
      //   totalScore: "4",
      //   progressColorFilled: "#FF5D5D",
      //   progressColorUnfilled: "#E5DAFF",
      //   scoreColor: '#FF5D5D'
      // },
      {
        key: "Score",
        HeaderBgColor: "#AD826E",
        Heading: "Score",
        score: "1",
        totalScore: "4",
        progressColorFilled: "#AD826E",
        progressColorUnfilled: "#E5DAFF",
        scoreColor: "#AD826E",
      },
    ],
    UserResponse: {
      textValue:
        "Rosalind Franklin's from Cambridge University had passion for chemistry and physics. At King's College London, she used X-ray diffraction method to studt DNA. Het photo 51, revealed clues about DNA structure.Her discovery shows double helix discovery that was pivotal to the work of James Watson and Francis Crick. Her contributions were overtaken by male dominated field whereby her work wad not fully recognised. Faced with gender discrimination she remained stern to persue.",
    },
  },
];

export const AiScorePopupReadingFIBData = [
  {
    id: 1,
    EnableSkills: [
      { component: "Blanks", score: "4/4", suggestion: "Excellent!" },
    ],
    SmallScoreCard: [
      {
        key: "Score",
        HeaderBgColor: "#AD826E",
        Heading: "Score",
        score: "2",
        totalScore: "4",
        progressColorFilled: "#AD826E",
        progressColorUnfilled: "#E5DAFF",
        scoreColor: "#AD826E",
      },
    ],
    UserResponse: {
      textValue:
        "Rosalind Franklin's from Cambridge University had passion for chemistry and physics. At King's College London, she used X-ray diffraction method to studt DNA. Het photo 51, revealed clues about DNA structure.Her discovery shows double helix discovery that was pivotal to the work of James Watson and Francis Crick. Her contributions were overtaken by male dominated field whereby her work wad not fully recognised. Faced with gender discrimination she remained stern to persue.",
    },
  },
];

export function getSuggestion(correct, total) {
  if (total <= 1) {
    return correct === 1 ? "Excellent!" : "Try again!";
  }

  const scorePercentage = correct / total;

  if (scorePercentage === 1) {
    return "Excellent!";
  } else if (scorePercentage >= 0.75) {
    return "Great job!";
  } else if (scorePercentage >= 0.5) {
    return "Good effort!";
  } else if (correct > 0) {
    return "Needs improvement!";
  } else {
    return "Try again!";
  }
}