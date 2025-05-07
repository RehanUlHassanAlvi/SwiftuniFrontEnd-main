import React from "react";
import { TTCard, TTCardImg, TTCardText } from "./style";
const TodayTaskCard = ({
  borderColor,
  imageSrc,
  text,
  textColor,
  isSelected,
  onClick, 
}) => {
  const backgroundColor = isSelected ? borderColor : "transparent";
  const finalTextColor = isSelected ? "#FFFFFF" : textColor;

  return (
    <TTCard isSelected={isSelected} borderColor={borderColor} backgroundColor={backgroundColor} onClick={onClick}>
      <TTCardImg src={imageSrc} alt="icon" />
      <TTCardText textColor={finalTextColor}>{text}</TTCardText>
    </TTCard>
  );
};

export default TodayTaskCard;
