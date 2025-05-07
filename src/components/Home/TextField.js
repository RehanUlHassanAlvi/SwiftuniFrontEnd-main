// import React from "react";
// import { OuterDiv } from "./style";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import { Margin } from "@mui/icons-material";

// const TextAreaInput = () => {
//   const isMobile = useMediaQuery("(max-width:450px)");

//   const Outer = {
//     width: "100%",
//   };

//   const TextDivStyles = {
//     display: "flex",
//     width: "96%",
//     height: "198px",
//     padding: "2%",
//     flexDirection: "column",
//     alignItems: "flex-start",
//     gap: "2px",
//     flexShrink: 0,
//     borderRadius: "5px",
//     border: "1px solid var(--White-Theme-Gray---3, #C6CBD9)",
//     background: "rgba(153, 108, 254, 0.10)",
//     color: "#666666",
//     fontFamily: "Noto Sans",
//     fontSize: isMobile ? "11px" : "12px",
//     fontWeight: isMobile ? 400 : 400,
//     lineHeight: "28px",
//     letterSpacing: "0.02em",
//     textAlign: "left",
//     outline: "none",
//   };

//   return (
//     <div style={Outer}>
//       <div style={TextDivStyles}>
//         Your speaking skills are clear and concise, effectively conveying your
//         message. You also demonstrate a good command of language, making your
//         communication both engaging and easy to understand.
//       </div>
//     </div>
//   );
// };

// export default TextAreaInput;

import React, { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

const TextAreaInput = () => {
  const [textValue, setTextValue] = useState("");

  const Outer = {
    width: "100%",
  };

  const TextAreaStyles = {
    display: "flex",
    width: "96%",
    height: "220px",
    padding: "2%",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "2px",
    flexShrink: 0,
    borderRadius: "5px",
    border: "1px solid var(--White-Theme-Gray---3, #C6CBD9)",
    resize: "none",
  };

  const handleInputChange = (event) => {
    const inputText = event.target.value;
    setTextValue(inputText);
  };

  return (
    <>
      <div style={Outer}>
        <textarea
          placeholder="Your speaking skills are clear and concise, effectively conveying your message."
          style={TextAreaStyles}
          value={textValue}
          onChange={handleInputChange}
          onFocus={(e) => (e.target.style.borderColor = "blue")}
          onBlur={(e) => (e.target.style.borderColor = "blue")}
          disabled={true}
        />
      </div>
    </>
  );
};

export default TextAreaInput;
