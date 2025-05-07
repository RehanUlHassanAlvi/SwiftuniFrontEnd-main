import React, { useEffect } from "react";
import moment from "moment";
import useTimer from "../../hooks/useTimerSectional";

export default function RemainingTime({
  showRemainingTime,
  setShowRemainingTime,
  Category,
  step,
  questions,
  isOnWelcomePage,
  submitTriggerRef,
  // setStep,
  // incrementSSTAttemptedCount,
  // sstTimeAdded,
  // setSSTTimeAdded,
  // listeningNonSSTTime,
  // resetStopwatch,
  // sstAttemptedCount,
  // sstCount,
  // setCommulative,
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
      // if (isSST) {
      //   if (!sstTimeAdded && (sstAttemptedCount + 1 === sstCount)) {
      //     console.log(`SST done. Resetting stopwatch to leftover ${listeningNonSSTTime} minutes.`);
      //     setSSTTimeAdded(true);
      //     resetStopwatch(moment.duration(listeningNonSSTTime, "minutes").asMilliseconds());
      //     setCommulative(0);
      //   }
      //   incrementSSTAttemptedCount(); // increment sst attempt count
      // }
      // setStep((prev) => prev + 1);

      if (submitTriggerRef) {
        submitTriggerRef.current = true; // Signal auto-submit
      }

    }
  }, [timeLeft]);

  // console.log("timeLeft in Remaining Time Sectional:", timeLeft / 1000);

  return <div>Remaining Time : {moment.utc(timeLeft).format("mm:ss")}</div>;
}
