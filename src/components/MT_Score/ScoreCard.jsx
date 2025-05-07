import React, { useEffect, useState  } from "react";
import { Modal } from "@mui/material";

import AiScorePopupSpeakingRA from "../Speaking/AiScorePopupSpeakingRA";
import AiScorePopupSpeakingRS from "../Speaking/AiScorePopupSpeakingRS";
import { AiScorePopupSpeakingData } from "../Speaking/data";
import AiScorePopupSpeakingDI from "../Speaking/AiScorePopupSpeakingDI";
import AiScorePopupSpeakingRTL from "../Speaking/AiScorePopupSpeakingRTL";
import AiScorePopupSpeakingASQ from "../Speaking/AiScorePopupSpeakingASQ";

import {
  AiScoreCardSWTData,
  AiScoreCardWriteEmailData,
  AiScoreCardWriteEssayData,
} from "../Writing/data";

import {
  AiScorePopupListeningFIBData,
  AiScorePopupListeningHIWData,
  AiScorePopupListeningSSTData,
  AiScorePopupListeningWFDData,
} from "../Listening/data";

import AiScorePopupListeningWFD from "../Listening/AiScorePopupListeningWFD";
import AiScorePopupReading from "../Reading/AiScorePopupReading";
import { AiScorePopupReadingMCMAData } from "../Reading/data";
import AiScorePopupReadingMCMmockTest from "../Reading/AiScorePopupReadingMCMmockTest";
import { ModalContent } from "./style";
import AiSummaryScorePopup from "../Writing/AiSummaryScorePopup";
import AiEssayScorePopup from "../Writing/AiEssayScorePopup";
import ScorePopupListeningHIW from "../Reading/ScorePopupListeningHIW";
import AiScorePopupReadingROP from "../Reading/AiScorePopupReadingROP";
import AiEmailScorePopup from "../Writing/AiEmailScorePopup";

const ScoreCard = ({
  isOpen,
  close,
  testData,
  category,
  testType,
  pteType = "pte-academic",
}) => {
   const [enableSkillsData, setEnableSkillsData] = useState([]);
     const [marksObtained, setMarksObtained] = useState(0);
     function markingFunction(answerList, userAnswers) {
      let score = 0;
      answerList.forEach((correctAnswer) => {
        const isCorrect = userAnswers.includes(correctAnswer);
        if (isCorrect) {
          score += 1;
        }
      });
      userAnswers.forEach((answer) => {
        const isCorrect = answerList.includes(answer);
        if (!isCorrect) {
          score = Math.max(0, score - 1);
        }
      });
      return score;
    }

  const modalStyle = {
    overlay: {
      zIndex: 1002,
      backdropFilter: "blur(2px)",
      WebkitBackdropFilter: "blur(2px)",
      background: "transparent",
    },
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const scorecardElement = document.getElementById("scorecard");
      if (scorecardElement && !scorecardElement.contains(event.target)) {
        close();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const getFormattedAttemptedQuestionsScore = () => {
    return {
      AnswerNames: testData.UserResponse.correctAnswers,
      AttemptedQuestionId: testData.UserResponse.QuestionId,
      Comments: [],
      CreatedAt: testData.AttemptedAt,
      IsLiked: false,
      MarksObtained:
        testData.UserResponse.enableSkillsData.length > 0
          ? testData.UserResponse.enableSkillsData[0].score.split("/")[0]
          : "0",
      OptionNames: testData.UserResponse.OptionNames || [],
      TimeTaken: testData.TimeTaken,
      TotalLikes: 0,
      UserId: 0,
      UserImage: "",
      UserName: "",
      UsersResponse: JSON.stringify({
        correctAnswers: testData.UserResponse.correctAnswers,
        selectedAnswers: testData.UserResponse.selectedAnswers,
        enableSkillsData: testData.UserResponse.enableSkillsData,
      }),
    };
  };

  const handleScoreCalculated = (score) => {
    // setCalculatedScore(score);
    // setIsScoreDataReadyForSubmit(true);
  };

  const getScoreCardComponent = () => {
    if (category === "speaking" && testType === "Read Aloud") {
      const parsedAIResponse = JSON.parse(testData.UserResponse.AI_response);
      return (
        <AiScorePopupSpeakingRA
          key={`${testData.UserResponse.QuestionId}-speaking-readaloud`}
          SmallScoreCard={AiScorePopupSpeakingData[0].SmallScoreCard}
          enableSkillsScore={parsedAIResponse}
          allData={parsedAIResponse}
          UserResponse={testData.UserResponse.UserResponse}
          recordedAudio={testData.UserResponse.audio_url || ""}
          OriginalText={testData.UserResponse.QuestionStatement}
          elapsedTime={testData.TimeTaken}
          close={close}
          contentTotalScore={5}
          totalScore={15}
          two={true}
        />
      );
    } else if (category === "speaking" && testType === "Repeat Sentence") {
      const parsedAIResponse = JSON.parse(testData.UserResponse.AI_response);
      return (
        <AiScorePopupSpeakingRS
          key={`${testData.UserResponse.QuestionId}-speaking-repeatsentence`}
          SmallScoreCard={AiScorePopupSpeakingData[0].SmallScoreCard}
          enableSkillsScore={parsedAIResponse}
          allData={parsedAIResponse}
          UserResponse={testData.UserResponse.UserResponse}
          recordedAudio={testData.UserResponse.audio_url || ""}
          OriginalText={testData.UserResponse.QuestionStatement}
          elapsedTime={testData.TimeTaken}
          close={close}
          two={true}
        />
      );
    } else if (
      category === "speaking" &&
      testType === "Respond to a situation"
    ) {
      const parsedAIResponse = JSON.parse(testData.UserResponse.AI_response);
      return (
        <AiScorePopupSpeakingRS
          key={`${testData.UserResponse.QuestionId}-speaking-respondtosituation`}
          SmallScoreCard={AiScorePopupSpeakingData[0].SmallScoreCard}
          enableSkillsScore={parsedAIResponse}
          allData={parsedAIResponse}
          UserResponse={testData.UserResponse.UserResponse}
          recordedAudio={testData.UserResponse.audio_url || ""}
          OriginalText={testData.UserResponse.QuestionStatement}
          elapsedTime={testData.TimeTaken}
          close={close}
          two={true}
        />
      );
    } else if (category === "speaking" && testType === "Describe Image") {
      const parsedAIResponse = JSON.parse(testData.UserResponse.AI_response);
      return (
        <AiScorePopupSpeakingDI
          key={`${testData.UserResponse.QuestionId}-speaking-describeimage`}
          SmallScoreCard={AiScorePopupSpeakingData[0].SmallScoreCard}
          totalScore={15}
          contentTotalScore={5}
          enableSkillsScore={parsedAIResponse}
          UserResponse={testData.UserResponse.UserResponse}
          recordedAudio={testData.UserResponse.audio_url || ""}
          OriginalText={testData.UserResponse.QuestionStatement}
          elapsedTime={testData.TimeTaken}
          show={true}
          text={testData.UserResponse.UserResponse}
          close={close}
          three={true}
          allData={parsedAIResponse}
        />
      );
    } else if (category === "speaking" && testType === "Re-tell Lecture") {
      const parsedAIResponse = JSON.parse(testData.UserResponse.AI_response);
      return (
        <AiScorePopupSpeakingRTL
          key={`${testData.UserResponse.QuestionId}-speaking-retelllecture`}
          SmallScoreCard={AiScorePopupSpeakingData[0].SmallScoreCard}
          enableSkillsScore={parsedAIResponse}
          allData={parsedAIResponse}
          UserResponse={testData.UserResponse.UserResponse}
          recordedAudio={testData.UserResponse.audio_url || ""}
          OriginalText={testData.UserResponse.QuestionStatement}
          elapsedTime={testData.TimeTaken}
          close={close}
          totalScore={15}
          contentTotalScore={5}
          two={true}
        />
      );
    } else if (
      category === "speaking" &&
      testType === "Answer Short Question"
    ) {
      const parsedAIResponse = JSON.parse(testData.UserResponse.AI_response);
      return (
        <AiScorePopupSpeakingASQ
          key={`${testData.UserResponse.QuestionId}-speaking-answershortquestion`}
          SmallScoreCard={AiScorePopupSpeakingData[0].SmallScoreCard}
          enableSkillsScore={parsedAIResponse}
          UserResponse={testData.UserResponse.UserResponse}
          recordedAudio={testData.UserResponse.audio_url || ""}
          OriginalText={testData.UserResponse.QuestionStatement}
          elapsedTime={testData.TimeTaken}
          close={close}
        />
      );
    } else if (
      category === "writing" &&
      testType === "Summarize Written Text"
    ) {
      const parsedAIResponse = JSON.parse(testData.UserResponse.AI_response);
      return (
        <AiSummaryScorePopup 
          key={`${testData.UserResponse.QuestionId}-writing-summarizewrittentext`}
          EnableSkillsScore={parsedAIResponse}
          SmallScoreCard={
            AiScoreCardSWTData[0].SmallScoreCard[
              pteType === "pte-academic" ? 0 : 1
            ]
          }
          UserResponse={{
            textValue:
              testData.UserResponse.UserResponse ||
              testData.UserResponse.selectedAnswers,
          }}
          elapsedTime={testData.TimeTaken}
          grammarKeyName={
            pteType === "pte-academic"
              ? "grammatical Mistakes"
              : "grammatical mistakes"
          }
          grammarIndexKeyName="grammatical mistakes indices"
          mispelledIndex="misspelled words indices"
          summaryWT={true}
          pte_core={pteType === "pte-academic" ? false : true}
          close={close}
          reqIndexNum={2}
          essay={false}
          onScoreCalculated={handleScoreCalculated}
        />
      );
    } else if (category === "writing" && testType === "Write Essay") {
      const parsedAIResponse = JSON.parse(testData.UserResponse.AI_response);
      return (
        <AiEssayScorePopup
          key={`${testData.UserResponse.QuestionId}-writing-writeessay`}
          EnableSkillsScore={parsedAIResponse}
          SmallScoreCard={AiScoreCardWriteEssayData[0].SmallScoreCard}
          UserResponse={{
            textValue:
              testData.UserResponse.UserResponse ||
              testData.UserResponse.selectedAnswers,
          }}
          elapsedTime={testData.TimeTaken}
          essay={true}
          pte_core={pteType === "pte-academic" ? false : true}
          close={close}
          onScoreCalculated={handleScoreCalculated}
        />
      );
    } else if (category === "writing" && testType === "Write Email") {
      const parsedAIResponse = JSON.parse(testData.UserResponse.AI_response);
      return (
        <AiEmailScorePopup 
          key={`${testData.UserResponse.QuestionId}-writing-writeemail`}
          EnableSkillsScore={parsedAIResponse}
          SmallScoreCard={AiScoreCardWriteEmailData[0].SmallScoreCard}
          UserResponse={{
            textValue:
              testData.UserResponse.UserResponse ||
              testData.UserResponse.selectedAnswers,
          }}
          elapsedTime={testData.TimeTaken}
          email={true}
          pte_core={pteType === "pte-academic" ? false : true}
          close={close}
          onScoreCalculated={handleScoreCalculated}
        />
      );
    } else if (
      category === "reading" &&
      testType === "Reading & Writing: Fill in the Blanks"
    ) {
      return (
        <AiScorePopupReading
          key={`${testData.UserResponse.QuestionId}-readingwriting-fillintheblanks`}
          SmallScoreCard={AiScorePopupReadingMCMAData[0].SmallScoreCard}
          CorrectAnswers={testData.UserResponse.correctAnswers}
          selectedAnswers={testData.UserResponse.selectedAnswers}
          elapsedTime={testData.TimeTaken}
          myAttemptedQuestionsScore={getFormattedAttemptedQuestionsScore()}
          questionOptions={testData.UserResponse.OptionNames || []}
          close={close}
        />
      );
    } else if (
      category === "reading" &&
      testType === "Multiple Choice, Multiple Answers"
    ) {
      return (
        <AiScorePopupReading
          key={`${testData.UserResponse.QuestionId}-reading-multiplechoice-multipleanswers`}
          SmallScoreCard={AiScorePopupReadingMCMAData[0].SmallScoreCard}
          CorrectAnswers={testData.UserResponse.correctAnswers}
          selectedAnswers={testData.UserResponse.selectedAnswers}
          elapsedTime={testData.TimeTaken}
          myAttemptedQuestionsScore={getFormattedAttemptedQuestionsScore()}
          questionOptions={testData.UserResponse.OptionNames || []}
          close={close}
        />
      );
    } else if (category === "reading" && testType === "Re-order Paragraphs") {
      let obtainedScore = testData.UserResponse.submissionResult.score;
      let totalScore = testData.UserResponse.submissionResult.correctIndexes.length - 1;
      return (
        <AiScorePopupReadingROP
          key={`${testData.UserResponse.QuestionId}-reading-reorderparagraphs`}
          EnableSkills={[ 
            {
              component: "Pair",
              score: `${obtainedScore}/${totalScore}`,
              suggestion: "Excellent!",
            },
          ]}
          SmallScoreCard={AiScorePopupReadingMCMAData[0].SmallScoreCard}
          answerIsAList={false}
          submissionResult={testData.UserResponse.submissionResult}
          elapsedTime={testData.TimeTaken}
          close={close}
          totalScore={totalScore}
        />
      );
    } else if (
      category === "reading" &&
      testType === "Reading: Fill in the Blanks"
    ) {
      return (
        <AiScorePopupReading
          key={`${testData.UserResponse.QuestionId}-reading-fillintheblanks`}
          SmallScoreCard={AiScorePopupReadingMCMAData[0].SmallScoreCard}
          CorrectAnswers={testData.UserResponse.correctAnswers}
          selectedAnswers={testData.UserResponse.selectedAnswers}
          elapsedTime={testData.TimeTaken}
          myAttemptedQuestionsScore={getFormattedAttemptedQuestionsScore()}
          questionOptions={testData.UserResponse.OptionNames || []}
          close={close}
        />
      );
    } else if (
      category === "reading" &&
      testType === "Multiple Choice, Single Answer"
    ) {
      return (
        <AiScorePopupReading
          key={`${testData.UserResponse.QuestionId}-reading-multiplechoice-singleanswer`}
          EnableSkills={testData.UserResponse.enableSkillsData}
          SmallScoreCard={AiScorePopupReadingMCMAData[0].SmallScoreCard}
          CorrectAnswers={testData.UserResponse.correctAnswers}
          selectedAnswers={testData.UserResponse.selectedAnswers}
          elapsedTime={testData.TimeTaken}
          myAttemptedQuestionsScore={getFormattedAttemptedQuestionsScore()}
          questionOptions={testData.UserResponse.OptionNames || []}
          close={close}
        />
      );
    } else if (
      category === "listening" &&
      testType === "Summarize Spoken Text"
    ) {
      const parsedAIResponse = JSON.parse(testData.UserResponse.AI_response);
      return (
        <AiSummaryScorePopup
          key={`${testData.UserResponse.QuestionId}-listening-summarizespokentext`}
          EnableSkillsScore={parsedAIResponse}
          SmallScoreCard={AiScorePopupListeningSSTData[0].SmallScoreCard}
          UserResponse={{
            textValue:
              testData.UserResponse.UserResponse ||
              testData.UserResponse.selectedAnswers,
          }}
          elapsedTime={testData.TimeTaken}
          grammarKeyName={
            pteType === "pte-academic"
              ? "grammatical Mistakes"
              : "grammatical mistakes"
          }
          grammarIndexKeyName="grammatical mistakes indices"
          mispelledIndex="misspelled words indices"
          summaryST={true}
          pte_core={pteType === "pte-academic" ? false : true}
          close={close}
          reqIndexNum={2}
          essay={false}
          onScoreCalculated={handleScoreCalculated}
        />
      );
    } else if (
      category === "listening" &&
      testType === "Listening: Multiple Choice, Multiple Answers"
    ) {
      return (
        <AiScorePopupReadingMCMmockTest
          key={`${testData.UserResponse.QuestionId}-listening-multiplechoice-multipleanswers`}
          EnableSkills={testData.UserResponse.enableSkillsData}
          SmallScoreCard={AiScorePopupReadingMCMAData[0].SmallScoreCard}
          CorrectAnswers={testData.UserResponse.correctAnswers}
          selectedAnswers={testData.UserResponse.selectedAnswers}
          elapsedTime={testData.TimeTaken}
          myAttemptedQuestionsScore={getFormattedAttemptedQuestionsScore()}
          questionOptions={testData.UserResponse.OptionNames || []}
          close={close}
          isMCM = {true}
          checkHIW = {true}
        />
      );
    } else if (category === "listening" && testType === "Fill in the Blanks") {
      return (
        <AiScorePopupReading
          key={`${testData.UserResponse.QuestionId}-listening-fillintheblanks`}
          SmallScoreCard={AiScorePopupListeningFIBData[0].SmallScoreCard}
          CorrectAnswers={testData.UserResponse.correctAnswers}
          selectedAnswers={testData.UserResponse.selectedAnswers}
          elapsedTime={testData.TimeTaken}
          myAttemptedQuestionsScore={getFormattedAttemptedQuestionsScore()}
          questionOptions={testData.UserResponse.correctAnswers || []}
          close={close}
        />
      );
    } else if (
      category === "listening" &&
      testType === "Highlight Correct Summary"
    ) {
      return (
        <AiScorePopupReading
          key={`${testData.UserResponse.QuestionId}-listening-highlightcorrectsummary`}
          EnableSkills={testData.UserResponse.enableSkillsData}
          SmallScoreCard={AiScorePopupReadingMCMAData[0].SmallScoreCard}
          CorrectAnswers={testData.UserResponse.correctAnswers}
          selectedAnswers={testData.UserResponse.selectedAnswers}
          elapsedTime={testData.TimeTaken}
          myAttemptedQuestionsScore={getFormattedAttemptedQuestionsScore()}
          questionOptions={testData.UserResponse.OptionNames || []}
          close={close}
        />
      );
    } else if (
      category === "listening" &&
      testType === "Listening: Multiple Choice, Single Answer"
    ) {
      return (
        <AiScorePopupReading
          key={`${testData.UserResponse.QuestionId}-listening-multiplechoice-singleanswer`}
          EnableSkills={testData.UserResponse.enableSkillsData}
          SmallScoreCard={AiScorePopupReadingMCMAData[0].SmallScoreCard}
          CorrectAnswers={testData.UserResponse.correctAnswers}
          selectedAnswers={testData.UserResponse.selectedAnswers}
          elapsedTime={testData.TimeTaken}
          myAttemptedQuestionsScore={getFormattedAttemptedQuestionsScore()}
          questionOptions={testData.UserResponse.OptionNames || []}
          close={close}
        />
      );
    } else if (category === "listening" && testType === "Select Missing Word") {
      return (
        <AiScorePopupReading
          key={`${testData.UserResponse.QuestionId}-listening-selectmissingword`}
          EnableSkills={testData.UserResponse.enableSkillsData}
          SmallScoreCard={AiScorePopupReadingMCMAData[0].SmallScoreCard}
          CorrectAnswers={testData.UserResponse.correctAnswers}
          selectedAnswers={testData.UserResponse.selectedAnswers}
          elapsedTime={testData.TimeTaken}
          myAttemptedQuestionsScore={getFormattedAttemptedQuestionsScore()}
          questionOptions={testData.UserResponse.OptionNames || []}
          close={close}
        />
      );
    } else if (
      category === "listening" &&
      testType === "Highlight Incorrect Words"
    ) {
      return (
        <ScorePopupListeningHIW 
          key={`${testData.UserResponse.QuestionId}-listening-highlightincorrectwords`}
          EnableSkills={testData.UserResponse.enableSkillsData}
          SmallScoreCard={AiScorePopupListeningHIWData[0].SmallScoreCard}
          CorrectAnswers={testData.UserResponse.correctAnswers}
          selectedAnswers={testData.UserResponse.selectedAnswers}
          elapsedTime={testData.TimeTaken}
          setEnableSkillsData={setEnableSkillsData}
          setMarksObtained={setMarksObtained}
          markingFunction={markingFunction}
          myAttemptedQuestionsScore={getFormattedAttemptedQuestionsScore()}
          questionOptions={testData.UserResponse.OptionNames || []}
          close={close}
        />
      );
    } else if (
      category === "listening" &&
      testType === "Write from Dictation"
    ) {
      const parsedAIResponse = JSON.parse(testData.UserResponse.AI_response);
      return (
        <AiScorePopupListeningWFD
          key={`${testData.UserResponse.QuestionId}-listening-writefromdictation`}
          wfdScore={parsedAIResponse}
          SmallScoreCard={AiScorePopupListeningWFDData[0].SmallScoreCard}
          correctAnswer={
            testData?.UserResponse?.QuestionStatement || parsedAIResponse.correct_words ||
            "Missing Question Statement"
          }
          UserResponse={
            testData.UserResponse.UserResponse ||
            testData.UserResponse.selectedAnswers
          }
          elapsedTime={testData.TimeTaken}
          close={close}
        />
      );
    }

    return null;
  };

  return (
    <div id="scorecardd">
      {isOpen && testData && (
        <Modal open={isOpen} style={modalStyle.overlay} onClose={close}>
          <ModalContent>{getScoreCardComponent()}</ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default ScoreCard;
