import React, { useEffect, useState } from "react";
import CalculateMockTestsCategoryWiseScoresChild from "./CalculateMockTestsCategoryWiseScoresChild";
// import { splitCategories } from "./helperFunctions";

const CalculateMockTestsCategoryWiseScores = ({ singleMockTestData, updateScores }) => {
  const [counts, setCounts] = useState([]);
  const [speakingScore, setSpeakingScore] = useState(0);
  const [writingScore, setWritingScore] = useState(0);
  const [readingScore, setReadingScore] = useState(0);
  const [listeningScore, setListeningScore] = useState(0);

  useEffect(() => {
    splitCategories(singleMockTestData);
  }, [singleMockTestData]);

  useEffect(() => {
    updateScores({
      speaking: speakingScore,
      writing: writingScore,
      reading: readingScore,
      listening: listeningScore,
    });
  }, [speakingScore, writingScore, readingScore, listeningScore]);

  const splitCategories = (data) => {
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
          case 'Write Email':
              acc.writing.push(curr);
              acc.enableSkills.push(curr)
              acc.ew.push(curr);
              break;
          case 'Summarize Written Text':
            acc.writing.push(curr);
            acc.reading.push(curr);
            acc.enableSkills.push(curr)
            acc.swt.push(curr);
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
      { listening: [], reading: [], writing: [], speaking: [], enableSkills: [], 
        ra: [], rs: [], di: [], rl: [], rts: [], asq: [],
        swt: [], we: [], ew: [],
        rwfib: [], rfib: [], mcma: [], mcsa: [], rop: [],
        sst: [], lmcma: [], lmcsa: [], hiw: [], lfib: [], wfd: [], hcs: [], smw: [], noScoreAvailable: [],
      }
    );
    
    setCounts([
      categorizedData.ra, categorizedData.rs, categorizedData.di, categorizedData.rl, categorizedData.rts, categorizedData.asq,
      categorizedData.swt, categorizedData.we, categorizedData.ew,
      categorizedData.rwfib, categorizedData.rfib, categorizedData.mcma, categorizedData.mcsa, categorizedData.rop,
      categorizedData.sst, categorizedData.lmcma, categorizedData.lmcsa, categorizedData.hiw, categorizedData.lfib, categorizedData.wfd, categorizedData.hcs, categorizedData.smw      
    ])
  };

  return (
    <>
      {counts && (
        <CalculateMockTestsCategoryWiseScoresChild
          counts={counts}
          speakingTotScore={setSpeakingScore}
          writingTotScore={setWritingScore}
          readingTotScore={setReadingScore}
          listeningTotScore={setListeningScore}
        />
      )}
    </>
  );
};

export default CalculateMockTestsCategoryWiseScores;
