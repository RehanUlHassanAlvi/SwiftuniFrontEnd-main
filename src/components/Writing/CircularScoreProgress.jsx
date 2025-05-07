import * as React from "react";
import { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";
import { CircularScoreProgressText } from "./style";

const CircularScoreProgress = ({
  score = null,
  totalScore = null,
  progressColorFilled,
  progressColorUnfilled,
  scoreColor,
  circleSize = 65,
  fontSize,
  start = null,
  end = null,
}) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const requestRef = useRef();
  const targetProgress = totalScore > 0 ? (score / totalScore) * 100 : 0;
  const animateProgress = (startTime) => {
    const duration = 300;
    const animate = (time) => {
      const timeFraction = (time - startTime) / duration;
      if (timeFraction < 1) {
        const progress = Math.min(
          targetProgress * timeFraction,
          targetProgress
        );
        setAnimatedProgress(progress);
        requestRef.current = requestAnimationFrame(animate);
      } else {
        setAnimatedProgress(targetProgress);
      }
    };
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const startTime = performance.now();
    animateProgress(startTime);
    return () => cancelAnimationFrame(requestRef.current);
  }, [targetProgress]);

  function dynamicPrecision(score) {
    const decimalPart = score % 1;
    if (decimalPart < 0.1 || decimalPart > 0.9) {
      return Math.round(score);
    }
    return score.toFixed(1);
  }

  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={100}
        size={circleSize}
        thickness={4}
        sx={{
          color: progressColorUnfilled,
        }}
      />
      <CircularProgress
        variant="determinate"
        value={animatedProgress}
        size={circleSize}
        thickness={4}
        sx={{
          color: progressColorFilled,
          position: "absolute",
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {start && end ? (
          <>
            {end === 90 ? (
              <>
                <CircularScoreProgressText
                  variant="caption"
                  fontSize={fontSize}
                  style={{ color: scoreColor }}
                >
                  {start}+
                </CircularScoreProgressText>
              </>
            ) : (
              <>
                <CircularScoreProgressText
                  variant="caption"
                  fontSize={fontSize}
                  style={{ color: scoreColor }}
                >
                  {start} - {end}
                </CircularScoreProgressText>
              </>
            )}
          </>
        ) : (
          <>
            <CircularScoreProgressText
              variant="caption"
              fontSize={fontSize}
              style={{ color: scoreColor }}
            >
              {/* {`${
                Number.isInteger((animatedProgress / 100) * totalScore)
                  ? (animatedProgress / 100) * totalScore
                  : ((animatedProgress / 100) * totalScore).toFixed(2)
              }`} */}

              {/* {Math.round((animatedProgress / 100) * totalScore)} */}

              {dynamicPrecision((animatedProgress / 100) * totalScore)}
            </CircularScoreProgressText>
          </>
        )}
      </Box>
    </Box>
  );
};

export default CircularScoreProgress;
