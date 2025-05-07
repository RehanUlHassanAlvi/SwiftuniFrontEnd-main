import React from "react";
import {
  CardBtn,
  CardDateText,
  CardHeaderDiv,
  CardHeaderText,
  CardMainDiv,
} from "./style";
import { Btn, FlexDiv } from "../../assets/styles/style";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Delete from "../../assets/images/DeleteIcon.svg";
import toast from "react-hot-toast";

const MT_Card = ({
  id,
  headerText = "Mock Test - 1",
  dateText = "Date Taken: 01/12/24",
  onDelete,
  analyticsPath,
  feedbackPath,
  viewScorePath,
  show = true,
}) => {
  const isTab = useMediaQuery("(max-width:750px)");
  const navigate = useNavigate();

  const handleLockedClick = () => {
    toast.error("This score is locked. Please subscribe to access."); 
  };

  return (
    <>
      <CardHeaderDiv style={{ opacity: show ? "1" : "0.5" }}>
        <CardHeaderText>{headerText}</CardHeaderText>
      </CardHeaderDiv>
      <CardMainDiv>
        <CardDateText style={{ color: !show ? "#ccc" : "" }} >{dateText}</CardDateText>
        <FlexDiv
          style={{
            gap: "1rem",
            marginRight: isTab ? "" : "1.5rem",
            flexDirection: isTab ? "column" : "",
          }}
        >
          <FlexDiv style={{ gap: "1rem" }}>
            {/* <CardBtn onClick={() => navigate(`/mt-score-analytics/${id}`)}>
              Analytics
            </CardBtn>
            <Btn onClick={() => navigate(`/mt-score-feedback/${id}`)}>
              <CardBtn>Score Feedback</CardBtn>
            </Btn> */}
            <CardBtn
              onClick={show ? () => navigate(analyticsPath) : handleLockedClick}
              disabled={!show} // Disable the button if locked
              style={{ backgroundColor: !show ? "#ccc" : "" }}
            >
              Analytics
            </CardBtn>
            <Btn>
              <CardBtn
                onClick={
                  show ? () => navigate(feedbackPath) : handleLockedClick
                }
                disabled={!show}
                style={{ backgroundColor: !show ? "#ccc" : "" }}
              >
                Score Feedback
              </CardBtn>
            </Btn>
          </FlexDiv>
          <FlexDiv style={{ gap: "1rem" }}>
            {/* <CardBtn onClick={() => navigate(`/mt-score-viewscore/${id}`)}>
              View Score
            </CardBtn> */}
            <CardBtn
              onClick={show ? () => navigate(viewScorePath) : handleLockedClick}
              disabled={!show} // Disable the button if locked
              style={{ backgroundColor: !show ? "#ccc" : "" }}
            >
              View Score
            </CardBtn>
            <CardBtn
              style={{
                background: "var(--Accents-Strawberry-Red, #DB3031)",
                width: "5rem",
              }}
              onClick={onDelete}

              // style={{ backgroundColor: !show ? "#ccc" : "var(--Accents-Strawberry-Red, #DB3031)",    width: "5rem", }}
              // disabled={!show}
              // onClick={show ? onDelete : handleLockedClick}
            >
              <img alt="" src={Delete} />
            </CardBtn>
          </FlexDiv>
        </FlexDiv>
      </CardMainDiv>
    </>
  );
};

export default MT_Card;
