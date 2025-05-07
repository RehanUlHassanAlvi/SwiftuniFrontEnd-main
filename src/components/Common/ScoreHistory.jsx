import React from "react";
import {
  MyWorkImg,
  MyWorkUserName,
  MyWorkTime,
  ShowScoreDiv,
  ActionBtn,
  LikeActionBtn,
  MyScoreShowDiv,
  MyWorkSmallRedDiv,
  MyWorkRedDivText,
  MyWorkBlueDiv,
  MyWorkSmallBlueDiv,
  MyWorkBlueDivImg,
  MyWorkBlueDivText,
} from "./Style";
import { FlexDiv } from "../../assets/styles/style";
import UserAvatar from "../../assets/images/user-avatar.png";
import AI_Score from "../../assets/images/WritingAIScore.svg";
import AI_Score_Disabled from "../../assets/images/WritingAIScoreDisabled.svg";
import Download from "../../assets/images/download-icon.svg";
import Delete from "../../assets/images/Delete.svg";
import Comment from "../../assets/images/Comment.svg";
import Like from "../../assets/images/Like.svg";

function ScoreHistory({
  score,
  isMobile,
  bg,
  formateScore,
  totalScore,
  ScoreLetter,
  handleMyScoreClick,
  handleDelete,
  setCommentCardOpen,
  setParentCommentId,
  toggleLikeScoreHistory,
  ai_score,
  renderDownloadIcon,
  selectedSection,
  testSubmissionInProcess,
}) {
  const fullDate = new Date(`${score.CreatedAt}Z`);
  const displayDate = fullDate.toLocaleDateString("en-PK", {
    timeZone: "Asia/Karachi",
  });

  const displayTime = fullDate.toLocaleTimeString("en-PK", {
    timeZone: "Asia/Karachi",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  // const formatMarks = (marks) => {
  //   // If marks already contain a decimal point, return them as is
  //   if (marks.toString().includes('.')) {
  //     return marks;
  //   }
  //   // Add '.00' to single-digit or two-digit marks
  //   if (marks < 100) {
  //     return `${marks}.00`;
  //   }
  //   // Return marks as is if they are three digits or more
  //   return marks;
  // };

  const formatMarks = (marks) => {
    // Convert to a number to handle decimal cases
    let formattedMarks = parseFloat(marks).toFixed(2);
    return formattedMarks;
  };

  return (
    <ShowScoreDiv>
      <FlexDiv
        style={{
          gap: isMobile ? "0.5rem" : "0.63rem",
          marginLeft: isMobile ? "0.75rem" : "1.25rem",
        }}
      >
        <MyWorkImg alt="User Image" src={score.UserImage || UserAvatar} />
        <div>
          <MyWorkUserName>{score.UserName}</MyWorkUserName>
          {isMobile ? (
            <>
              <MyWorkTime>{displayDate},</MyWorkTime>
              <MyWorkTime>{displayTime}</MyWorkTime>
            </>
          ) : (
            <>
              <MyWorkTime>
                {new Date(`${score.CreatedAt}Z`).toLocaleString("en-PK", {
                  timeZone: "Asia/Karachi",
                })}
              </MyWorkTime>
            </>
          )}
        </div>
      </FlexDiv>

      {ai_score ? (
        <FlexDiv
          style={{
            gap: isMobile ? "0.45rem" : "0.63rem",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <MyScoreShowDiv color={bg} ai_score={ai_score}>
            <MyWorkSmallRedDiv color={bg}>
              {ScoreLetter || "L"}
            </MyWorkSmallRedDiv>
            <MyWorkRedDivText color={bg}>
              {formateScore ? (
                <>
                  {" "}
                  {formatMarks(score.MarksObtained)}/{formatMarks(totalScore)}
                </>
              ) : (
                <>
                  {" "}
                  {score.MarksObtained}/{totalScore}
                </>
              )}
            </MyWorkRedDivText>
          </MyScoreShowDiv>
          <MyWorkBlueDiv
            onClick={() => handleMyScoreClick(score)}
            ai_score={ai_score}
            disabled={testSubmissionInProcess}
          >
            <MyWorkSmallBlueDiv>
              {testSubmissionInProcess ? (
                <MyWorkBlueDivImg alt="" src={AI_Score_Disabled} />
              ) : (
                <MyWorkBlueDivImg alt="" src={AI_Score} />
              )}
            </MyWorkSmallBlueDiv>
            <MyWorkBlueDivText disabled={true}>AI Score</MyWorkBlueDivText>
          </MyWorkBlueDiv>
        </FlexDiv>
      ) : (
        <FlexDiv
          style={{
            gap: isMobile ? "0.5rem" : "0.63rem",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <FlexDiv
            style={{
              gap: isMobile ? "0.5rem" : "0.63rem",
            }}
          >
            <MyScoreShowDiv color={bg}>
              <MyWorkSmallRedDiv color={bg}>
                {ScoreLetter || "L"}
              </MyWorkSmallRedDiv>
              <MyWorkRedDivText color={bg}>
                {formateScore ? (
                  <>
                    {" "}
                    {formatMarks(score.MarksObtained)}/{formatMarks(totalScore)}
                  </>
                ) : (
                  <>
                    {" "}
                    {score.MarksObtained}/{totalScore}
                  </>
                )}
              </MyWorkRedDivText>
            </MyScoreShowDiv>
            <MyWorkBlueDiv
              style={{
                color: bg,
                background: bg,
              }}
              onClick={() => handleMyScoreClick(score)}
            >
              <MyWorkSmallBlueDiv> SC</MyWorkSmallBlueDiv>
              <MyWorkBlueDivText>Score</MyWorkBlueDivText>
            </MyWorkBlueDiv>
          </FlexDiv>
        </FlexDiv>
      )}
      <FlexDiv
        style={{
          gap: isMobile ? "0.5rem" : "0.63rem",
          marginRight: isMobile ? "0.75rem" : "1.25rem",
        }}
      >
        {/* {renderDownloadIcon && <ActionBtn alt="" src={Download} />} */}

        {selectedSection === "My Work" && (
          <ActionBtn
            alt=""
            src={Delete}
            onClick={() => handleDelete(score.AttemptedQuestionId)}
          />
        )}

        <ActionBtn
          alt=""
          src={Comment}
          onClick={() => {
            setCommentCardOpen(true);
            setParentCommentId(score.AttemptedQuestionId);
          }}
        />

        <LikeActionBtn
          alt={score.IsLiked ? "Unlike Comment" : "Like Comment"}
          src={Like}
          liked={score.IsLiked}
          onClick={() =>
            toggleLikeScoreHistory(score.AttemptedQuestionId, score.IsLiked)
          }
        />

        {score.TotalLikes > 0 && <MyWorkTime> {score.TotalLikes} </MyWorkTime>}
        
      </FlexDiv>
    </ShowScoreDiv>
  );
}

export default ScoreHistory;
