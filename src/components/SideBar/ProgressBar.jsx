import * as React from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

const BorderLinearProgress = styled(LinearProgress)`
  height: 6px;
  border-radius: 10px;
  flex-shrink: 0;
  width: 89%;
  background-color: #fff;
  & .${linearProgressClasses.bar} {
    border-radius: 10px;
    background-color: var(--Brand-Purple, #996cfe);
  }
  &.${linearProgressClasses.colorPrimary} {
    background-color: #fff;
  }
  @media (max-width: 1050px) {
    width: 85%;
  }
  @media (max-width: 750px) {
    width: 80%;
  }
  @media (max-width: 650px) {
    width: 75%;
  }
  @media (max-width: 550px) {
    width: 70%;
  }
  @media (max-width: 450px) {
    width: 65%;
  }
`;

export default function CustomizedProgressBars({ value }) {
  return (
    <Stack spacing={2} sx={{ flexGrow: 1 }}>
      <BorderLinearProgress variant="determinate" value={value} />
    </Stack>
  );
}
