import TodayTaskImg1 from "../../assets/todaytaskcard/todaytaskimg1.svg";
import TodayTaskImg2 from "../../assets/todaytaskcard/todaytaskimg2.svg";
import TodayTaskImg3 from "../../assets/todaytaskcard/todaytaskimg3.svg";
import TodayTaskImg4 from "../../assets/todaytaskcard/todaytaskimg4.svg";
import MockTestImg from "../../assets/todaytaskcard/mocktestimg.svg";
import CardBottomImg1 from "../../assets/cardbottom/Rectangle44.svg";
import CardBottomImg2 from "../../assets/cardbottom/Rectangle45.svg";
import CardBottomImg3 from "../../assets/cardbottom/Rectangle46.svg";
import CardBottomImg4 from "../../assets/cardbottom/Rectangle47.svg";
import CardBottomImg5 from "../../assets/images/SV.svg";
import CardBottomImg6 from "../../assets/cardbottom/Rectangle49.svg";
import CardBottomImg7 from "../../assets/cardbottom/Rectangle50.svg";
import CardBottomImg8 from "../../assets/cardbottom/Rectangle51.svg";

const speakingDataCore = {
  id: 1,
  imageSrc: TodayTaskImg4,
  titleText: "Speaking",
  titleTextColor: "#49D7F2",
  marksTextColor: "#66E0F7CC",
  barBgColor: "rgba(73, 215, 242, 0.2)",
  categoriesData: [
    {
      CategoryName: "Read Aloud",
      TotalCount: "3",
      attemptedcount: "1",
      totalProgress: "67",
      chunkCount: "10",
    },
    {
      CategoryName: "Repeat Sentence",
      TotalCount: "3",
      attemptedcount: "1",
      totalProgress: "70",
      chunkCount: "10",
    },
    {
      CategoryName: "Describe Image",
      TotalCount: "3",
      attemptedcount: "1",
      totalProgress: "20",
      chunkCount: "10",
    },
    {
      CategoryName: "Respond to a Situation",
      TotalCount: "3",
      attemptedcount: "1",
      totalProgress: "50",
      chunkCount: "10",
    },
    {
      CategoryName: "Answer Short Question",
      TotalCount: "3",
      attemptedcount: "1",
      totalProgress: "80",
      chunkCount: "10",
    },
  ],
};

const speakingDataAcademic = {
  id: 1,
  imageSrc: TodayTaskImg4,
  titleText: "Speaking",
  titleTextColor: "#49D7F2",
  marksTextColor: "#66E0F7CC",
  barBgColor: "rgba(73, 215, 242, 0.2)",
  categoriesData: [
    {
      CategoryName: "Read Aloud",
      TotalCount: "3",
      attemptedcount: "1",
      totalProgress: "67",
      chunkCount: "10",
    },
    {
      CategoryName: "Repeat Sentence",
      TotalCount: "3",
      attemptedcount: "1",
      totalProgress: "70",
      chunkCount: "10",
    },
    {
      CategoryName: "Describe Image",
      TotalCount: "3",
      attemptedcount: "1",
      totalProgress: "20",
      chunkCount: "10",
    },
    {
      CategoryName: "Re-Tell Lecture",
      TotalCount: "3",
      attemptedcount: "1",
      totalProgress: "50",
      chunkCount: "10",
    },
    {
      CategoryName: "Answer Short Question",
      TotalCount: "3",
      attemptedcount: "1",
      totalProgress: "80",
      chunkCount: "10",
    },
  ],
};

const writingDataCore = {
  //writing data for PTE Core
  id: 3,
  imageSrc: TodayTaskImg3,
  titleText: "Writing",
  titleTextColor: "#FF5D5D",
  marksTextColor: "#FF5D5DCC",
  barBgColor: "rgba(255, 93, 93, 0.2)",
  categoriesData: [
    {
      CategoryName: "Summarize Written Text",
      TotalCount: "3",
      attemptedcount: "1",
      totalProgress: "50",
      chunkCount: "10",
    },
    {
      CategoryName: "Write Email",
      TotalCount: "3",
      attemptedcount: "1",
      totalProgress: "50",
      chunkCount: "10",
    },
  ],
};

const writingDataAcademic = {
  //writing data for PTE Academic
  id: 3,
  imageSrc: TodayTaskImg3,
  titleText: "Writing",
  titleTextColor: "#FF5D5D",
  marksTextColor: "#FF5D5DCC",
  barBgColor: "rgba(255, 93, 93, 0.2)",
  categoriesData: [
    {
      CategoryName: "Summarize Written Text",
      TotalCount: "3",
      attemptedcount: "1",
      totalProgress: "50",
      chunkCount: "10",
    },
    {
      CategoryName: "Write Essay",
      TotalCount: "3",
      attemptedcount: "1",
      totalProgress: "50",
      chunkCount: "10",
    },
  ],
};

const listeningDataAcademic = {
  id: 2,
  imageSrc: TodayTaskImg2,
  titleText: "Listening",
  titleTextColor: "#868EAF",
  marksTextColor: "#868EAFCC",
  barBgColor: "rgba(134, 142, 175, 0.2)",
  categoriesData: [
    {
      CategoryName: "Summarize Spoken Text",
      TotalCount: "3",
      attemptedcount: "1",
      totalProgress: "40",
      chunkCount: "10",
    },
    {
      CategoryName: "Multiple Choice, Multiple Answers",
      TotalCount: "3",
      attemptedcount: "1",
      totalProgress: "40",
      chunkCount: "10",
    },
    {
      CategoryName: "Multiple Choice, Single Answer",
      TotalCount: "3",
      attemptedcount: "1",
      totalProgress: "40",
      chunkCount: "10",
    },
    {
      CategoryName: "Highlight Incorrect Words",
      TotalCount: "3",
      attemptedcount: "1",
      totalProgress: "40",
      chunkCount: "10",
    },
    {
      CategoryName: "Fill in the Blanks",
      TotalCount: "3",
      attemptedcount: "1",
      totalProgress: "40",
      chunkCount: "10",
    },
    {
      CategoryName: "Write from Dictation",
      TotalCount: "3",
      attemptedcount: "1",
      totalProgress: "40",
      chunkCount: "10",
    },
    {
      CategoryName: "Highlight Correct Summary",
      TotalCount: "3",
      attemptedcount: "1",
      totalProgress: "40",
      chunkCount: "10",
    },
    {
      CategoryName: "Select Missing Word",
      TotalCount: "3",
      attemptedcount: "1",
      totalProgress: "40",
      chunkCount: "10",
    },
  ],
};

const listeningDataCore = {
  id: 2,
  imageSrc: TodayTaskImg2,
  titleText: "Listening",
  titleTextColor: "#868EAF",
  marksTextColor: "#868EAFCC",
  barBgColor: "rgba(134, 142, 175, 0.2)",
  categoriesData: [
    {
      CategoryName: "Summarize Spoken Text",
      TotalCount: "3",
      attemptedcount: "1",
      totalProgress: "40",
      chunkCount: "10",
    },
    {
      CategoryName: "Multiple Choice, Multiple Answers",
      TotalCount: "3",
      attemptedcount: "1",
      totalProgress: "40",
      chunkCount: "10",
    },
    {
      CategoryName: "Multiple Choice, Single Answer",
      TotalCount: "3",
      attemptedcount: "1",
      totalProgress: "40",
      chunkCount: "10",
    },
    {
      CategoryName: "Highlight Incorrect Words",
      TotalCount: "3",
      attemptedcount: "1",
      totalProgress: "40",
      chunkCount: "10",
    },
    {
      CategoryName: "Fill in the Blanks",
      TotalCount: "3",
      attemptedcount: "1",
      totalProgress: "40",
      chunkCount: "10",
    },
    {
      CategoryName: "Write from Dictation",
      TotalCount: "3",
      attemptedcount: "1",
      totalProgress: "40",
      chunkCount: "10",
    },
    {
      CategoryName: "Select Missing Word",
      TotalCount: "3",
      attemptedcount: "1",
      totalProgress: "40",
      chunkCount: "10",
    },
  ],
};

const pteType = localStorage.getItem("pte-type") || "pte academic";
const writingData =
  pteType === "pte core" ? writingDataCore : writingDataAcademic;
const speakingData =
  pteType === "pte core" ? speakingDataCore : speakingDataAcademic;
const listeningData =
  pteType === "pte core" ? listeningDataCore : listeningDataAcademic;

export const AnalyticsCard2Data = [
  speakingData,
  listeningData,
  writingData,

  {
    //Reading data
    id: 3,
    imageSrc: TodayTaskImg1,
    titleText: "Reading",
    titleTextColor: "#AD826E",
    marksTextColor: "#AD826ECC",
    barBgColor: "rgba(173, 130, 110, 0.2)",
    categoriesData: [
      {
        CategoryName: "Reading & Writing: Fill in the Blanks",
        TotalCount: "3",
        attemptedcount: "1",
        totalProgress: "80",
        chunkCount: "10",
      },
      {
        CategoryName: "Reading: Fill in the Blanks",
        TotalCount: "3",
        attemptedcount: "1",
        totalProgress: "80",
        chunkCount: "10",
      },
      {
        CategoryName: "Multiple Choice, Multiple Answers",
        TotalCount: "3",
        attemptedcount: "1",
        totalProgress: "80",
        chunkCount: "10",
      },
      {
        CategoryName: "Re-order Paragraphs",
        TotalCount: "3",
        attemptedcount: "1",
        totalProgress: "80",
        chunkCount: "10",
      },
      {
        CategoryName: "Multiple Choice, Single Answer",
        TotalCount: "3",
        attemptedcount: "1",
        totalProgress: "80",
        chunkCount: "10",
      },
    ],
  },
  {
    //Mock Test data
    id: 3,
    imageSrc: MockTestImg,
    titleText: "Mock Test",
    titleTextColor: "#FD3C65",
    marksTextColor: "#FD3C65CC",
    barBgColor: "rgba(253, 60, 101, 0.2)",
    categoriesData: [
      {
        CategoryName: "Full Mock Tests",
        TotalCount: "3",
        attemptedcount: "1",
        totalProgress: "90",
        chunkCount: "10",
      },

      {
        CategoryName: "Sectional Mock Tests",
        TotalCount: "3",
        attemptedcount: "1",
        totalProgress: "90",
        chunkCount: "10",
      },
    ],
  },
];

export const AnalyticsCard2Data2 = [
  {
    //speaking data
    id: 3,
    imageSrc: TodayTaskImg4,
    titleText: "Speaking",
    titleTextColor: "#49D7F2",
    marksTextColor: "#66E0F7CC",
    barBgColor: "rgba(73, 215, 242, 0.2)",

    categoriesData: [
      {
        CategoryName: "Read Aloud",
        TotalCount: "3",
        attemptedcount: "1",
        totalProgress: "67",
        chunkCount: "8",
      },
      {
        CategoryName: "Repeat Sentence",
        TotalCount: "3",
        attemptedcount: "1",
        totalProgress: "70",
        chunkCount: "8",
      },
    ],
  },
  {
    //writing data
    id: 2,
    imageSrc: TodayTaskImg3,
    titleText: "Writing",
    titleTextColor: "#FF5D5D",
    marksTextColor: "#FF5D5DCC",
    barBgColor: "rgba(255, 93, 93, 0.2)",
    categoriesData: [
      {
        CategoryName: "Summarize Written Text",
        TotalCount: "3",
        attemptedcount: "1",
        totalProgress: "50",
        chunkCount: "10",
      },
      {
        CategoryName: "Write Email",
        TotalCount: "3",
        attemptedcount: "1",
        totalProgress: "50",
        chunkCount: "10",
      },
    ],
  },
  {
    //Reading data
    id: 0,
    imageSrc: TodayTaskImg1,
    titleText: "Reading",
    titleTextColor: "#AD826E",
    marksTextColor: "#AD826ECC",
    barBgColor: "rgba(173, 130, 110, 0.2)",
    categoriesData: [
      {
        CategoryName: "Re-order Paragraphs",
        TotalCount: "3",
        attemptedcount: "1",
        totalProgress: "80",
        chunkCount: "10",
      },
      {
        CategoryName: "Reading: Fill in the Blanks",
        TotalCount: "3",
        attemptedcount: "1",
        totalProgress: "80",
        chunkCount: "10",
      },
    ],
  },
  {
    //Listening data
    id: 1,
    imageSrc: TodayTaskImg2,
    titleText: "Listening",
    titleTextColor: "#868EAF",
    marksTextColor: "#868EAFCC",
    barBgColor: "rgba(134, 142, 175, 0.2)",
    categoriesData: [
      {
        CategoryName: "Summarize Spoken Text",
        TotalCount: "3",
        attemptedcount: "1",
        totalProgress: "40",
        chunkCount: "10",
      },
      {
        CategoryName: "Highlight Incorrect Words",
        TotalCount: "3",
        attemptedcount: "1",
        totalProgress: "40",
        chunkCount: "10",
      },
    ],
  },
];

export const CardBottomData = [
  {
    id: 1,
    imageSrc: CardBottomImg1,
    text: "Templates",
    text_borderColor: "#80B6FF",
    backgroundColor: "rgba(128, 182, 255, 0.10)",
    url: "/templates",
  },
  {
    id: 2,
    imageSrc: CardBottomImg2,
    text: "Grammar",
    text_borderColor: "#89DF8F",
    backgroundColor: "rgba(137, 223, 143, 0.10)",
    url: "/grammar",
  },
  {
    id: 3,
    imageSrc: CardBottomImg3,
    text: "Vocab Bank",
    text_borderColor: "#FF7E96",
    backgroundColor: "rgba(255, 126, 150, 0.10)",
    url: "/vocab-bank",
  },
  {
    id: 4,
    imageSrc: CardBottomImg4,
    text: "Score feedback",
    text_borderColor: "#00DFF6",
    backgroundColor: "rgba(0, 223, 246, 0.10)",
    url: "/score-feedback",
  },
  {
    id: 5,
    imageSrc: CardBottomImg5,
    text: "Strategy Videos",
    text_borderColor: "#FF9171",
    backgroundColor: "rgba(255, 145, 113, 0.10)",
    url: "/strategy-videos",
  },
  {
    id: 6,
    imageSrc: CardBottomImg6,
    text: "MT Score",
    text_borderColor: "#FD3C65",
    backgroundColor: "rgba(253, 60, 101, 0.10)",
    url: "/mt-score",
  },
  {
    id: 7,
    imageSrc: CardBottomImg7,
    text: "AI Study Plan",
    text_borderColor: "#FF9171",
    backgroundColor: "rgba(255, 145, 113, 0.10)",
    url: "/ai-study-plan",
  },
  {
    id: 8,
    imageSrc: CardBottomImg8,
    text: "PTE Guide",
    text_borderColor: "#FFCC36",
    backgroundColor: "rgba(255, 204, 54, 0.10)",
    // url: "/pte-guide",
    url: "https://swiftuni.com/pte-guide/",
  },
];

export const AiStudyPlanData = [
  {
    id: 1,
    number: "79+",
    text: "Your Target",
  },
];

export const ExamCountdownData = [
  {
    id: 1,
    DaysCount: "00",
    HoursCount: "00",
    MinutesCount: "00",
    SecondsCount: "00",
  },
];

export const TodayTaskCardData = [
  {
    id: 1,
    borderColor: "#AD826E",
    imageSrc: TodayTaskImg1,
    text: "Reading",
    textColor: "#AD826E",
  },
  {
    id: 2,
    borderColor: "#868EAF",
    imageSrc: TodayTaskImg2,
    text: "Listening",
    textColor: "#868EAF",
  },
  {
    id: 3,
    borderColor: "#FF5D5D",
    imageSrc: TodayTaskImg3,
    text: "Writing",
    textColor: "#FF5D5D",
  },
  {
    id: 4,
    borderColor: "#66E0F7",
    imageSrc: TodayTaskImg4,
    text: "Speaking",
    textColor: "#66E0F7",
  },
];
