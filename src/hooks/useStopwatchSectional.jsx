import { useState, useEffect, useRef } from "react";

function useStopwatch(initialDuration) {
  const [duration, setDuration] = useState(initialDuration || null);
  const [elapsedTime, setElapsedTime] = useState(0); // Total elapsed time
  const [questionsTime, setQuestionsTime] = useState(0); // Time elapsed per question
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setElapsedTime((prev) => {
          const newElapsedTime = prev + 1000;
          if (duration && newElapsedTime >= duration) {
            clearInterval(intervalRef.current);
            setIsActive(false);
            return duration;
          }
          return newElapsedTime;
        });
        setQuestionsTime((prev) => prev + 1000);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive, duration]);



  const startStopwatch = () => {
    setIsActive(true);
    console.log("(______STARTED STOPWATCH______)");
  };

  const stopStopwatch = () => {
    setIsActive(false);
    console.log("(______STOPPED STOPWATCH______)");
  };

  // const resetElapsedTime = () => {
  //   clearInterval(intervalRef.current);
  //   setIsActive(false);
  //   setElapsedTime(0);
  // };

  const resetQuestionTimer = () => {
    setQuestionsTime(0);
    console.log("(______RESET QUESTION TIMER______)");
  };

  const resetStopwatch = (newDuration = null) => {
    if (newDuration !== null) {
      clearInterval(intervalRef.current);
      setElapsedTime(0);
      setQuestionsTime(0);
      setIsActive(false);
      setDuration(newDuration);
    }
  };

  const addTime = (seconds = 0) => {
    const milliSeconds = seconds * 1000;
    setElapsedTime((prev) => {
      const newElapsedTime = prev + milliSeconds;
      if (duration && newElapsedTime >= duration) {
        clearInterval(intervalRef.current);
        setIsActive(false);
        return duration;
      }
      return newElapsedTime;
    });
  };

  // console.log("Elapsed Time Parent:", elapsedTime / 1000);
  // console.log("Questions Time:", questionsTime / 1000);

  return {
    elapsedTime,
    questionsTime,
    isActive,
    startStopwatch,
    stopStopwatch,
    // resetElapsedTime,
    resetQuestionTimer,
    resetStopwatch,
    addTime,
  };
}

export default useStopwatch;

