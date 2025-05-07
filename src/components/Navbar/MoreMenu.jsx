import React, { forwardRef } from "react";
import { MoreMenuDiv } from "./style";
import { FlexDiv } from "../../assets/styles/style";
import CardBottom from "../Home/CardBottom";
import { CardBottomData } from "../Home/data";
import { useMediaQuery } from "@mui/material";

const MoreMenu = () => {
  const isTab = useMediaQuery("(max-width:1000px)");

  return (
    <MoreMenuDiv id='more-menu'>
      <FlexDiv
        style={{
          gap: "22px",
          margin: isTab ? "0rem" : "0rem 6rem",
          width: isTab ? "100%" : "",
        }}
      >
        <CardBottom
          key={CardBottomData[0].id}
          imageSrc={CardBottomData[0].imageSrc}
          text={CardBottomData[0].text}
          text_borderColor={CardBottomData[0].text_borderColor}
          backgroundColor={CardBottomData[0].backgroundColor}
          url={CardBottomData[0].url}
        />
        <CardBottom
          key={CardBottomData[1].id}
          imageSrc={CardBottomData[1].imageSrc}
          text={CardBottomData[1].text}
          text_borderColor={CardBottomData[1].text_borderColor}
          backgroundColor={CardBottomData[1].backgroundColor}
          url={CardBottomData[1].url}
        />
        <CardBottom
          key={CardBottomData[2].id}
          imageSrc={CardBottomData[2].imageSrc}
          text={CardBottomData[2].text}
          text_borderColor={CardBottomData[2].text_borderColor}
          backgroundColor={CardBottomData[2].backgroundColor}
          url={CardBottomData[2].url}
        />
        <CardBottom
          key={CardBottomData[3].id}
          imageSrc={CardBottomData[3].imageSrc}
          text={CardBottomData[3].text}
          text_borderColor={CardBottomData[3].text_borderColor}
          backgroundColor={CardBottomData[3].backgroundColor}
          url={CardBottomData[3].url}
        />
      </FlexDiv>
      <FlexDiv
        style={{
          gap: "22px",
          margin: isTab ? "1rem 0rem 0rem" : "1rem 6rem 0rem",
        }}
      >
        <CardBottom
          key={CardBottomData[4].id}
          imageSrc={CardBottomData[4].imageSrc}
          text={CardBottomData[4].text}
          text_borderColor={CardBottomData[4].text_borderColor}
          backgroundColor={CardBottomData[4].backgroundColor}
          url={CardBottomData[4].url}
        />
        <CardBottom
          key={CardBottomData[5].id}
          imageSrc={CardBottomData[5].imageSrc}
          text={CardBottomData[5].text}
          text_borderColor={CardBottomData[5].text_borderColor}
          backgroundColor={CardBottomData[5].backgroundColor}
          url={CardBottomData[5].url}
        />
        <CardBottom
          key={CardBottomData[6].id}
          imageSrc={CardBottomData[6].imageSrc}
          text={CardBottomData[6].text}
          text_borderColor={CardBottomData[6].text_borderColor}
          backgroundColor={CardBottomData[6].backgroundColor}
          url={CardBottomData[6].url}
        />
        <CardBottom
          key={CardBottomData[7].id}
          imageSrc={CardBottomData[7].imageSrc}
          text={CardBottomData[7].text}
          text_borderColor={CardBottomData[7].text_borderColor}
          backgroundColor={CardBottomData[7].backgroundColor}
          url={CardBottomData[7].url}
        />
      </FlexDiv>
    </MoreMenuDiv>
  );
};

export default MoreMenu;
