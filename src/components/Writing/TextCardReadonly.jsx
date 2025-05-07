import React from "react";
import { TCROCard, TCROCardContent, TCROTypography } from "./style";

const TextCardReadonly = ({ textValue = "" }) => {
  const paragraphs = textValue.split("\n");

  return (
    <TCROCard>
      <TCROCardContent>
        {paragraphs.map((paragraph, index) => (
          <TCROTypography key={index} variant="body1">
            {paragraph.replace(/\\n/g, " ")}
          </TCROTypography>
        ))}
      </TCROCardContent>
    </TCROCard>
  );
};

export default TextCardReadonly;
