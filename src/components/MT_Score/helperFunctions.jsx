import axios from "axios";
import { ListeningQuestionNames, ReadingQuestionNames, SpeakingQuestionNames, WritingQuestionNames } from "./data";

const isPteCore = localStorage.getItem("pte-type") === "pte core";

const categoryOrder = ["Speaking", "Writing", "Reading", "Listening"];
const subCategoryOrder = {
  Speaking: ["Read Aloud", "Repeat Sentence", "Describe Image", "Re-tell Lecture", "Respond to a situation", "Answer Short Question"],
  Writing: ["Summarize Written Text", "Write Essay", "Write Email"],
  Reading: ["Reading & Writing: Fill in the Blanks", "Multiple Choice, Multiple Answers", "Re-order Paragraphs", "Reading: Fill in the Blanks", "Multiple Choice, Single Answer"],
  Listening: ["Summarize Spoken Text", "Listening: Multiple Choice, Multiple Answers", "Fill in the Blanks", "Highlight Correct Summary", "Listening: Multiple Choice, Single Answer", "Select Missing Word", "Highlight Incorrect Words", "Write from Dictation"],
};

const sortResponses = (responses, categoryOrder, subCategoryOrder) => {
  return responses.sort((a, b) => {
    // Handle missing Category or SubCategory
    const categoryA = a.Category || "";
    const categoryB = b.Category || "";
    const subCategoryA = a.SubCategory || "";
    const subCategoryB = b.SubCategory || "";

    // Determine the order index for categories
    const categoryIndexA = categoryOrder.indexOf(categoryA);
    const categoryIndexB = categoryOrder.indexOf(categoryB);

    // Categories not in categoryOrder are placed at the end
    const finalCategoryIndexA = categoryIndexA !== -1 ? categoryIndexA : categoryOrder.length;
    const finalCategoryIndexB = categoryIndexB !== -1 ? categoryIndexB : categoryOrder.length;

    if (finalCategoryIndexA < finalCategoryIndexB) return -1;
    if (finalCategoryIndexA > finalCategoryIndexB) return 1;

    // If categories are the same, sort by subcategory
    if (categoryA === categoryB) {
      const subOrder = subCategoryOrder[categoryA] || [];
      const subIndexA = subOrder.indexOf(subCategoryA);
      const subIndexB = subOrder.indexOf(subCategoryB);

      const finalSubIndexA = subIndexA !== -1 ? subIndexA : subOrder.length;
      const finalSubIndexB = subIndexB !== -1 ? subIndexB : subOrder.length;

      if (finalSubIndexA < finalSubIndexB) return -1;
      if (finalSubIndexA > finalSubIndexB) return 1;
    }

    return 0;
  });
};

export const fetchMockTestScore = async ({
  url,
  setIsLoading,
  setMockTestsResult,
  setMockTestType,
  withCredentials = true
}) => {
  setIsLoading(true); 

  try {
    const response = await axios.get(url, { withCredentials: withCredentials });

    if (response.status === 200 && response.data.message === "Mock Test Score:") {
      const parsedResponses = response.data.response.map((item) => {
        let parsedUserResponse = null;
        if (item.UserResponse) {
          try {
            const firstParse = JSON.parse(item.UserResponse);
            parsedUserResponse =
              typeof firstParse === "string" ? JSON.parse(firstParse) : firstParse;
          } catch (parseError) {
            console.error("Error parsing UserResponse:", parseError);
            parsedUserResponse = null;
          }
        }
        return {
          ...item,
          Category: parsedUserResponse?.Category || item.Category || "",
          SubCategory: parsedUserResponse?.SubCategory || item.SubCategory || "",
          UserResponse: parsedUserResponse,
        };
      });

      const hasScore = parsedResponses.some((item) => item.UserResponse !== null);

      if (hasScore) {
        const sortedResponses = sortResponses(parsedResponses, categoryOrder, subCategoryOrder);
        setMockTestType(sortedResponses[0]?.UserResponse?.mockTestType || "");
        setMockTestsResult(sortedResponses);
        return { success: true, message: "Score fetched successfully", data: sortedResponses };
      } else {
        return { success: false, message: "No score available" };
      }
    } else if (response.status === 300) {
      return { success: false, message: response.data.message || "No Mock Test Score available" };
    } else {
      return { success: false, message: "Unexpected response from the server." };
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return { success: false, message: "Failed to fetch mock test scores." };
  } finally {
    setIsLoading(false);
  }
};

var testTimings = null; 

export const splitCategories = (
  data,
  // setCounts,
  setTestCounts,
  setListeningTests, 
  setReadingTests, 
  setWritingTests, 
  setSpeakingTests,
) => {
  const categorizedData = data.reduce(
    (acc, curr) => {
      const subCategory = curr.UserResponse?.SubCategory;
      if (subCategory) {
        switch (subCategory) {
        case 'Write Essay':
          acc.writing.push(curr);
          acc.enableSkills.push(curr)
          acc.we.push(curr);
          break;
        case 'Summarize Written Text':
          acc.writing.push(curr);
          acc.reading.push(curr);
          acc.enableSkills.push(curr)
          acc.swt.push(curr);
          break;
        case 'Write Email':
          acc.writing.push(curr);
          acc.enableSkills.push(curr)
          acc.ew.push(curr);
          break;
        case 'Reading & Writing: Fill in the Blanks':
          acc.writing.push(curr);
          acc.reading.push(curr);
          acc.rwfib.push(curr);
          break;
        case 'Summarize Spoken Text':
          acc.writing.push(curr);
          acc.listening.push(curr);
          acc.enableSkills.push(curr)
          acc.sst.push(curr);
          break;
        case 'Fill in the Blanks':
          acc.writing.push(curr);
          acc.listening.push(curr);
          acc.lfib.push(curr);
          break;
        case 'Write from Dictation':
          acc.writing.push(curr);
          acc.listening.push(curr);
          acc.wfd.push(curr);
          // acc.enableSkills.push(curr)
          break;
        case 'Read Aloud':
          acc.ra.push(curr);
          acc.reading.push(curr);
          acc.speaking.push(curr);
          acc.enableSkills.push(curr)
          break;                        
        case 'Multiple Choice, Multiple Answers':
          acc.mcma.push(curr);
          acc.reading.push(curr);
          break;
        case 'Re-order Paragraphs':
          acc.reading.push(curr);
          acc.rop.push(curr);
          break;
        case 'Multiple Choice, Single Answer':
          acc.reading.push(curr);
          acc.mcsa.push(curr);
          break;
        case 'Highlight Correct Summary':
          acc.reading.push(curr);
          acc.listening.push(curr);
          acc.hcs.push(curr);
          break;                                                            
        case 'Highlight Incorrect Words':
          acc.reading.push(curr);
          acc.listening.push(curr);
          acc.hiw.push(curr);
          break;
        case 'Reading: Fill in the Blanks':
          acc.reading.push(curr);
          acc.rfib.push(curr);
          break;
        case 'Repeat Sentence':
          acc.speaking.push(curr);
          acc.listening.push(curr);
          acc.rs.push(curr);
          break;
        case 'Describe Image':
          acc.speaking.push(curr);
          acc.di.push(curr);
          break;
        case 'Re-tell Lecture':
          acc.speaking.push(curr);
          acc.listening.push(curr);
          acc.rl.push(curr);
          break;
        case 'Respond to a situation':
          acc.speaking.push(curr);
          acc.listening.push(curr);
          acc.rts.push(curr);
          break;
        case 'Answer Short Question':
          acc.speaking.push(curr);
          acc.listening.push(curr);
          acc.asq.push(curr);
          break;
        default:
          acc.listening.push(curr);
          switch (curr.UserResponse.SubCategory){
            case 'Listening: Multiple Choice, Multiple Answers':
              acc.lmcma.push(curr);
              break;
            case 'Listening: Multiple Choice, Single Answer':
              acc.lmcsa.push(curr);
              break;
            default:
              acc.smw.push(curr);
              break;
          }
          break;
      } }
      else {
        acc.noScoreAvailable.push(curr);
      }
      return acc;
    },
    { 
      listening: [], reading: [], writing: [], speaking: [], enableSkills: [], 
      ra: [], rs: [], di: [], rl: [], rts: [], asq: [],
      swt: [], we: [], ew: [],
      rwfib: [], rfib: [], mcma: [], mcsa: [], rop: [],
      sst: [], lmcma: [], lmcsa: [], hiw: [], lfib: [], wfd: [], hcs: [], smw: [], noScoreAvailable: [],
    }
  );

  // if (setCounts) {
  //   setCounts([
  //     categorizedData.ra, categorizedData.rs, categorizedData.di, categorizedData.rl, categorizedData.rts, categorizedData.asq,
  //     categorizedData.swt, categorizedData.we, categorizedData.ew,
  //     categorizedData.rwfib, categorizedData.rfib, categorizedData.mcma, categorizedData.mcsa, categorizedData.rop,
  //     categorizedData.sst, categorizedData.lmcma, categorizedData.lmcsa, categorizedData.hiw, categorizedData.lfib, categorizedData.wfd, categorizedData.hcs, categorizedData.smw      
  //   ]);
  // }
  
  if (setTestCounts) {
    setTestCounts([
      categorizedData.ra, categorizedData.rs, categorizedData.di, categorizedData.rl, categorizedData.rts, categorizedData.asq,
      categorizedData.swt, categorizedData.we, categorizedData.ew,
      categorizedData.rwfib, categorizedData.rfib, categorizedData.mcma, categorizedData.mcsa, categorizedData.rop,
      categorizedData.sst, categorizedData.lmcma, categorizedData.lmcsa, categorizedData.hiw, categorizedData.lfib, categorizedData.wfd, categorizedData.hcs, categorizedData.smw      
    ])
  }

  if (setListeningTests) {
    setListeningTests(categorizedData.listening);
  }

  if (setReadingTests) {
    setReadingTests(categorizedData.reading);
  }

  if (setWritingTests) {
    setWritingTests(categorizedData.writing);
  }

  if (setSpeakingTests) {
    setSpeakingTests(categorizedData.speaking);
  }

    testTimings = {
    "Read Aloud": categorizedData.ra,
    "Repeat Sentence": categorizedData.rs,
    "Describe Image": categorizedData.di,
    "Re-tell Lecture": categorizedData.rl,
    "Respond to a situation": categorizedData.rts,
    "Answer Short Question": categorizedData.asq,
    "Summarize Written Text": categorizedData.swt,
    "Write Essay": categorizedData.we,
    "Write Email": categorizedData.ew,
    "Reading & Writing: Fill in the Blanks": categorizedData.rwfib,
    "Reading: Fill in the Blanks": categorizedData.rfib,
    "Multiple Choice, Multiple Answers": categorizedData.mcma,
    "Multiple Choice, Single Answer": categorizedData.mcsa,
    "Re-order Paragraphs": categorizedData.rop,
    "Summarize Spoken Text": categorizedData.sst,
    "Listening: Multiple Choice, Multiple Answers": categorizedData.lmcma,
    "Listening: Multiple Choice, Single Answer": categorizedData.lmcsa,
    "Highlight Incorrect Words": categorizedData.hiw,
    "Fill in the Blanks": categorizedData.lfib,
    "Write from Dictation": categorizedData.wfd,
    "Highlight Correct Summary": categorizedData.hcs,
    "Select Missing Word": categorizedData.smw,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Filter mostly used while filtering test names in sectional mock tests
// ─────────────────────────────────────────────────────────────────────────────
export const filterQuestionNames = (questionNames, mockTestsResult) => {
  // console.log("QuestionNames: ", questionNames)
  // console.log("MockTestsResult: ", mockTestsResult)
  return questionNames.filter((name) =>
    mockTestsResult.some(
      (result) =>
        result.UserResponse &&
        result.UserResponse.SubCategory === name
    )
  );
};

function convertSecondsToMMSS(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return isNaN(formattedSeconds) ? "00:00" : `${formattedMinutes}:${formattedSeconds}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Total Mock Test Time
// ─────────────────────────────────────────────────────────────────────────────
export const getTotalTimeTaken = (
  speakingQuestions = [],
  writingQuestions = [],
  readingQuestions = [],
  listeningQuestions = []
) => {
  let totalTime = 0;
  // console.log("speakingQuestions: ", speakingQuestions)
  // console.log("writingQuestions: ", writingQuestions)
  // console.log("readingQuestions: ", readingQuestions)
  // console.log("listeningQuestions: ", listeningQuestions)

  [speakingQuestions, writingQuestions, readingQuestions, listeningQuestions].forEach(
    (questions) => {
      if (questions && questions.length > 0) {
        questions.forEach((test) => {
          totalTime += getTimeTaken(test, false);
        });
      }
    }
  );

  return convertSecondsToMMSS(totalTime);
};

// ─────────────────────────────────────────────────────────────────────────────
// Each Test Time
// ─────────────────────────────────────────────────────────────────────────────
const getTimeTaken = (testName = "", mmss = true) => {
  if (testTimings && testTimings[testName]) {
    const time = testTimings[testName].reduce((acc, test) => acc + test.TimeTaken, 0);
    return Number.isInteger(mmss) ? convertSecondsToMMSS(time) : time;
  } else {
    return "00:00";
  }
};

// const filterQuestionNames = (questionNames) => {
//   return questionNames.filter((name) => {
//     if (isPteCore) {
//       return name !== "Re-tell Lecture" && name !== "Write Essay" && name !== "Highlight Correct Summary";
//     } else {
//       return name !== "Respond to a situation" && name !== "Write Email";
//     }
//   });
// };


// const filteredSpeakingQuestionNames = filterQuestionNames(SpeakingQuestionNames);
// const filteredWritingQuestionNames = filterQuestionNames(WritingQuestionNames);
// const filteredListeningQuestionNames = filterQuestionNames(ListeningQuestionNames);

// export const getSpeakingTimeTaken = () => SpeakingQuestionNames.map(getTimeTaken);
// export const getTotalSpeakingTimeTaken = () => {
//   let totalTime = 0;
//   SpeakingQuestionNames.forEach((test) => {totalTime += getTimeTaken(test, false)});
//   return convertSecondsToMMSS(totalTime);
// };

// ─────────────────────────────────────────────────────────────────────────────
// SPEAKING
// ─────────────────────────────────────────────────────────────────────────────
export const getSpeakingTimeTaken = (questionNames) => {
  // console.log("speakingQuestions: ", questionNames)
  return questionNames.map(getTimeTaken);
};
export const getTotalSpeakingTimeTaken = (questionNames) => {
  let totalTime = 0;
  questionNames.forEach((test) => {totalTime += getTimeTaken(test, false)});
  return convertSecondsToMMSS(totalTime);
};

// ─────────────────────────────────────────────────────────────────────────────
// WRITING
// ─────────────────────────────────────────────────────────────────────────────
export const getWritingTimeTaken = (questionNames) => {
  return questionNames.map(getTimeTaken);
};
export const getTotalWritingTimeTaken = (questionNames) => {
  let totalTime = 0;
  questionNames.forEach((test) => {totalTime += getTimeTaken(test, false)});
  return convertSecondsToMMSS(totalTime);
};

// ─────────────────────────────────────────────────────────────────────────────
// READING
// ─────────────────────────────────────────────────────────────────────────────
export const getReadingTimeTaken = (questionNames) => {
  return questionNames.map(getTimeTaken);
}
export const getTotalReadingTimeTaken = (questionNames) => {
  let totalTime = 0;
  questionNames.forEach((test) => {totalTime += getTimeTaken(test, false)});
  return convertSecondsToMMSS(totalTime);
};

// ─────────────────────────────────────────────────────────────────────────────
// LISTENING
// ─────────────────────────────────────────────────────────────────────────────
export const getListeningTimeTaken = (questionNames) => {
  return questionNames.map(getTimeTaken);
}
export const getTotalListeningTimeTaken = (questionNames) => {
  let totalTime = 0;
  questionNames.forEach((test) => {totalTime += getTimeTaken(test, false)});
  return convertSecondsToMMSS(totalTime);
};

export const getCountsByCategory = (responses) => {
  const counts = {
      speaking:   { attempted: 0, total: 0 },
      writing:    { attempted: 0, total: 0 },
      reading:    { attempted: 0, total: 0 },
      listening:  { attempted: 0, total: 0 },
  };

  responses.forEach((item) => {
      const cat = item.Category?.toLowerCase();
      if (!cat || !counts[cat]) return;

      counts[cat].total++;

      if (cat === "reading" && item.UserResponse?.autoAttemptedLastOnTimeUp) {
          return;
      }

      if (item.UserResponse?.IsAttempted !== false) {
          counts[cat].attempted++;
      }
  });

  return counts;
};

// ─────────────────────────────────────────────────────────────────────────────
// This functions returns score and fallback score
// ─────────────────────────────────────────────────────────────────────────────
export const returnScoringFunction = (type, listeningsScore, readingsScore, writingsScore, speakingScore) => {
  if (type === "Listening"){
    return listeningsScore?listeningsScore>10?listeningsScore:10:10;
  }else if(type === "Reading"){
    return readingsScore?readingsScore>10?readingsScore:10:10;
  }else if(type === "Writing"){
    return writingsScore?writingsScore>10?writingsScore:10:10;
  }else{
    return speakingScore?speakingScore>10?speakingScore:10:10;
  }
}

export const getOverallScore = (speakingScore, writingsScore, readingsScore, listeningsScore) => {
    let overall = (speakingScore + writingsScore + readingsScore + listeningsScore) / 4;
    if (overall > 12) {
      overall -= overall > 40 ? 2 : 1;
    }
    return overall > 10 ? parseInt(overall) : 10;
  };

export const sendTest = (type, listeningTests, readingTests, writingTests, speakingTests) => {    
    if (type === "listening"){
      return listeningTests;
    }else if(type === "reading"){
      return readingTests;
    }else if(type === "writing"){
      return writingTests;
    }else{
      return speakingTests;
    }
  }

export const formatDate = (isoString) => {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
