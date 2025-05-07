import React, { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import InfoIcon from "../../assets/images/ph_info.svg";
import {
  ECCard,
  ECCardTitleDiv,
  ECCardTitleText,
  ECCardIconDiv,
  ToolTipText,
  ToolTipImg,
  ECCardCountdownDiv,
  ECCardTimeBox,
  ECCardTimeCountText,
  ECCardTimeText,
} from "./style";

const ExamCountdown = ({ examDate = " " }) => {
  const calculateTimeLeft = () => {
    if (!examDate) {
      return {
        Days: "00",
        Hours: "00",
        Minutes: "00",
        Seconds: "00",
      };
    }

    const difference = +new Date(examDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        Hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        Minutes: Math.floor((difference / 1000 / 60) % 60),
        Seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = {
        Days: "00",
        Hours: "00",
        Minutes: "00",
        Seconds: "00",
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <ECCard>
      <ECCardTitleDiv>
        <ECCardTitleText>Exam Countdown</ECCardTitleText>
        <div style={{ display: "flex" }}>
          {examDate ? (
            <>
              <Tooltip
                title={
                  <ToolTipText>
                    Countdown to the upcoming exam. Stay prepared and manage
                    your time effectively.
                  </ToolTipText>
                }
                arrow
              >
                <ECCardIconDiv>
                  <ToolTipImg src={InfoIcon} alt="" />
                </ECCardIconDiv>
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip
                title={
                  <ToolTipText>
                    Set Exam Date For Your Upcoming Exam!
                  </ToolTipText>
                }
                arrow
              >
                <ECCardIconDiv>
                  <ToolTipImg src={InfoIcon} alt="" />
                </ECCardIconDiv>
              </Tooltip>
            </>
          )}
        </div>
      </ECCardTitleDiv>

      {/* <ECCardCountdownDiv>
        <ECCardTimeBox>
          <ECCardTimeCountText>{DaysCount}</ECCardTimeCountText>
          <ECCardTimeText>Days</ECCardTimeText>
        </ECCardTimeBox>
        <ECCardTimeBox>
          <ECCardTimeCountText>{HoursCount}</ECCardTimeCountText>
          <ECCardTimeText>Hours</ECCardTimeText>
        </ECCardTimeBox>
        <ECCardTimeBox>
          <ECCardTimeCountText>{MinutesCount}</ECCardTimeCountText>
          <ECCardTimeText>Minutes</ECCardTimeText>
        </ECCardTimeBox>
        <ECCardTimeBox>
          <ECCardTimeCountText>{SecondsCount}</ECCardTimeCountText>
          <ECCardTimeText>Seconds</ECCardTimeText>
        </ECCardTimeBox>
      </ECCardCountdownDiv> */}

      <ECCardCountdownDiv>
        {Object.keys(timeLeft).length > 0 &&
          Object.keys(timeLeft).map((interval) => (
            <ECCardTimeBox key={interval}>
              <ECCardTimeCountText>{timeLeft[interval]}</ECCardTimeCountText>
              <ECCardTimeText>{interval}</ECCardTimeText>
            </ECCardTimeBox>
          ))}
      </ECCardCountdownDiv>
    </ECCard>
  );
};

export default ExamCountdown;
