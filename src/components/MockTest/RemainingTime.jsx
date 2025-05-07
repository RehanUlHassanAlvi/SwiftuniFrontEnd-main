import React, { useEffect } from "react";
import moment from "moment";
import useTimer from "../../hooks/useTimerSectional";
import { BlinkingClockWrapper } from "./Style";
import { CLOCK, CLOCKRED } from "../../constants/Mocktests";

export default function RemainingTime({
  showRemainingTime,
  setShowRemainingTime,
  Category,
  step,
  questions,
  isOnWelcomePage,
  submitTriggerRef, 
}) {
  const { timeLeft, isActive, startTimer, stopTimer, resetTimer } = useTimer(showRemainingTime);

  const isSST = (Category === "Listening" && questions[step - 1]?.SubCategory === "Summarize Spoken Text");

  useEffect(() => {
    stopTimer();
    resetTimer(showRemainingTime);
    if (!isOnWelcomePage && (Category === "Writing" || isSST)) {
      startTimer();
    }
  }, [isOnWelcomePage, step, showRemainingTime, Category]);

  useEffect(() => {
    if (timeLeft === 0 || timeLeft < 0 || timeLeft === 1000) {
      stopTimer();
      setShowRemainingTime(null);

      if (submitTriggerRef) {
        submitTriggerRef.current = true; // Signal auto-submit
      }

    }
  }, [timeLeft]);

  const isLast30Seconds = timeLeft <= 30000 && showRemainingTime !== null; 

  console.log("TimeLeft in RemainingTime.jsx Full Mock Test:", timeLeft / 1000);

  // return (
  //   <div
  //     style={{
  //       display: "flex",
  //       alignItems: "center",
  //       justifyContent: "center",
  //       flexDirection: "row",
  //       gap: "10px",
  //       color: isLast30Seconds ? "red" : "inherit",
  //     }}
  //   >
  //     {isLast30Seconds ? (
  //       <BlinkingClockWrapper>{CLOCKRED}</BlinkingClockWrapper>
  //     ) : (
  //       CLOCK
  //     )}
  //     <span style={{ marginBottom: "2px" }}>
  //       Remaining Time: {moment.utc(timeLeft).format("mm:ss")}
  //     </span>
  //   </div>
  // );

   return <div>Remaining Time : {moment.utc(timeLeft).format("mm:ss")}</div>;
}            
