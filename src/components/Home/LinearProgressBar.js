import * as React from "react";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

const BorderLinearProgress = styled(LinearProgress)(
  ({ theme, barcolor, bgcolor, width }) => ({
    height: 6,
    width: `${width}%`,
    maxWidth: "100px",
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        bgcolor ||
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor:
        barcolor || (theme.palette.mode === "light" ? "#1a90ff" : "#308fe8"),
    },
  })
);

const divideProgressIntoChunks = (attemptedCount, totalCount, chunkCount) => {
  let attemptedCapacity = (attemptedCount / totalCount) * 100;
  const chunkCapacity = 100 / chunkCount;
  const chunks = Array.from({ length: chunkCount }, (_, index) => {
    const chunkValue = Math.min(attemptedCapacity, chunkCapacity);
    attemptedCapacity -= chunkValue;
    return chunkValue;
  });
  return chunks.concat(Array(chunkCount - chunks.length).fill(0));
};

const LinearProgressBar = ({
  attemptedCount,
  totalCount,
  chunkCount,
  barcolor,
  bgcolor,
}) => {
  const chunkValues = divideProgressIntoChunks(
    attemptedCount,
    totalCount,
    chunkCount
  );
  return (
    <div style={{ display: "flex", gap: "2.33px", flexDirection: "row" }}>
      {chunkValues.map((value, index) => (
        <BorderLinearProgress
          key={index}
          variant="determinate"
          value={(value / (100 / chunkCount)) * 100}
          barcolor={barcolor}
          bgcolor={bgcolor}
          width={100 / chunkCount}
        />
      ))}
    </div>
  );
};

export default LinearProgressBar;

// import * as React from "react";
// import { styled } from "@mui/material/styles";
// import LinearProgress, {
//   linearProgressClasses,
// } from "@mui/material/LinearProgress";

// const BorderLinearProgress = styled(LinearProgress)(
//   ({ theme, barcolor, bgcolor, width }) => ({
//     height: 6,
//     width: `${width}%`,
//     maxWidth: "100px",
//     borderRadius: 5,
//     [`&.${linearProgressClasses.colorPrimary}`]: {
//       backgroundColor:
//         bgcolor ||
//         theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
//     },
//     [`& .${linearProgressClasses.bar}`]: {
//       borderRadius: 5,
//       backgroundColor:
//         barcolor || (theme.palette.mode === "light" ? "#1a90ff" : "#308fe8"),
//     },
//   })
// );

// const divideProgressIntoChunks = (attemptedCount, totalCount, chunkCount) => {
//   const chunkCapacity = 100 / chunkCount;
//   const chunks = Array.from({ length: chunkCount }, (_, index) => {
//     const chunkValue = Math.min(attemptedCount, chunkCapacity);
//     attemptedCount -= chunkValue;
//     return chunkValue;
//   });

//   // Fill the remaining chunks with 0
//   return chunks.concat(Array(chunkCount - chunks.length).fill(0));
// };

// const LinearProgressBar = ({
//   attemptedCount,
//   totalCount,
//   chunkCount,
//   barcolor,
//   bgcolor,
// }) => {
//   const chunkValues = divideProgressIntoChunks(
//     attemptedCount,
//     totalCount,
//     chunkCount
//   );
//   return (
//     <div style={{ display: "flex", gap: "2.33px", flexDirection: "row" }}>
//       {chunkValues.map((value, index) => (
//         <BorderLinearProgress
//           key={index}
//           variant="determinate"
//           value={(value / (100 / chunkCount)) * 100}
//           barcolor={barcolor}
//           bgcolor={bgcolor}
//           width={100 / chunkCount}
//         />
//       ))}
//     </div>
//   );
// };

// export default LinearProgressBar;
