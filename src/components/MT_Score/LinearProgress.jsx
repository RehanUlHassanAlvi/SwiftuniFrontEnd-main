import * as React from "react";
import { CustomLinearProgress } from "./style";

export default function CustomizedProgressBars({ progressColor, score = 50 }) {
  return (
    <CustomLinearProgress
      variant="determinate"
      value={score}
      progressColor={progressColor}
      backgroundColor="transparent"
    />
  );
}
