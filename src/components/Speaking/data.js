import DescribeImage from "../../assets/images/DescribeImage.svg";

export const DescribeImageCardData = [
  {
    id: 1,
    srcImage: DescribeImage,
  },
];

export const SpeakingReadAloudData = [
  {
    id: 1,
    textValue:
      "One of the complex agricultural problems is the issue of food waste. Food waste refers to the discarding of edible food at various stages of the food supply chain, from production to consumption. This not only represents a significant loss of resources but also has environmental implications, such as greenhouse gas emissions from decomposing food waste in landfills.",
  },
];

export const SpeakingRTASData = [
  {
    id: 1,
    textValue:
      "You had your friend’s expensive camera for a special event. However, you dropped and damaged it unintentionally. You meet your friend to inform him of the incident.",
  },
];

export const AiScorePopupSpeakingData = [
  {
    id: 1,
    EnableSkills: [
      {
        component: "Content",
        score: "61/90",
        suggestion: "Too few words are repeated. Try to aim for at least 50%",
      },
      {
        component: "Pronunciation",
        score: "60/90",
        suggestion:
          "To ensure a good score in pronunciation, you need 1. a clear speech with correct pronunciation 2. a smooth tone, without frequent stresses 3. a continuous speech Seek help at or Telegram (t.me/pteapeuni)",
      },
      {
        component: "Fluency",
        score: "65/90",
        suggestion:
          "To ensure a good score in pronunciation, you need 1. a clear speech with correct pronunciation 2. a smooth tone, without frequent stresses.",
      },
    ],
    SmallScoreCard: [
      {
        key: "Score",
        HeaderBgColor: "#49D7F2",
        Heading: "Score",
        score: "1",
        totalScore: "4",
        progressColorFilled: "#49D7F2",
        progressColorUnfilled: "#E5DAFF",
        scoreColor: "#49D7F2",
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
  },
];

export const AiScorePopupSpeakingASQData = [
  {
    id: 1,
    EnableSkills: [
      {
        component: "Content",
        score: "1/1",
        suggestion: "Correct",
      },
    ],
    SmallScoreCard: [
      {
        key: "Speaking",
        HeaderBgColor: "#49D7F2",
        Heading: "Speaking",
        score: "1",
        totalScore: "1",
        progressColorFilled: "#49D7F2",
        progressColorUnfilled: "#E5DAFF",
        scoreColor: "#49D7F2",
      },
    ],
  },
];

export const playBeep = (frequency = 520, duration = 200, volume = 1) => {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.type = "sine";
  oscillator.frequency.value = frequency;
  gainNode.gain.value = volume;

  oscillator.start();
  setTimeout(() => {
    oscillator.stop();
    audioCtx.close();
  }, duration);
};
