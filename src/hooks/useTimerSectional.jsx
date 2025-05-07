import { useState, useEffect, useRef } from "react";
import moment from "moment";

function useTimer(initialDurationInMinutes) {
  const [duration, setDuration] = useState(moment.duration(initialDurationInMinutes, "minutes"));
  const [timeLeft, setTimeLeft] = useState(duration.asMilliseconds());
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef(null);

  // useEffect(() => {
  //   setTimeLeft(duration.asMilliseconds());
  // }, [duration]);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1000) {
            clearInterval(intervalRef.current);
            setIsActive(false);
            return 0;
          }
          return prev - 1000;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive]);

  const startTimer = () => {
    // if (!isActive) { 
      setIsActive(true);
    // }
  };

  const stopTimer = () => {
    setIsActive(false);
  };

  const resetTimer = (newDurationInMinutes) => {
    setIsActive(false);
    const newDurationObj = moment.duration(newDurationInMinutes, "minutes");
    setDuration(newDurationObj);
    setTimeLeft(newDurationObj.asMilliseconds());
  };

  return { timeLeft, isActive, startTimer, stopTimer, resetTimer };
}

export default useTimer;
