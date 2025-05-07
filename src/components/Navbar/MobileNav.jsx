import React, { useState, useEffect } from "react";
import {
  MobileMenuDiv,
  NavText,
  NavSmallArrow,
  ToggleContainer,
  Slider,
  StyledButton,
} from "./style";
import { Btn, FlexDiv } from "../../assets/styles/style";
import NavSArrow from "../../assets/images/navsmallarrow.svg";
import CardBottom from "../Home/CardBottom";
import { CardBottomData } from "../Home/data";
import { useMediaQuery } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import MegaMenu from "./MegaMenu";
import PteToggleBtn from "./PteToggleBtn";
import { useNavigate } from "react-router-dom";
import { useTestQuestions } from "../../context/TestQuestionContext";

const MobileNav = () => {
  const isTab = useMediaQuery("(max-width:770px)");
  const isMobile = useMediaQuery("(max-width:450px)");
  const [isMoreMenu, setIsMoreMenu] = useState(false);
  const isBMobile = useMediaQuery("(max-width:1000px)");
  const [isMegaMenu, setIsMegaMenu] = useState(false);
  const [selectedText, setSelectedText] = useState(true);
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const { resetAllStates } = useTestQuestions();

  useEffect(() => {
    const item = localStorage.getItem("pte-type");
    if (item === "pte academic") {
      setSelectedText(true);
      setActive(0);
    } else {
      setSelectedText(false);
      setActive(1);
    }
  }, []);

  const navigateTo = (url) => {
    resetAllStates();  
    navigate(url)
  }

  return (
    <MobileMenuDiv>
      <FlexDiv style={{ alignSelf: "center", width: isMobile ? "100%" : "" }}>
        <PteToggleBtn active={active} setActive={setActive} />
      </FlexDiv>
      <NavText
        style={{ color: "#6B41CB", cursor: "pointer" }}
        onClick={() => navigateTo("/")}
      >
        Home
      </NavText>
      <Btn
        onClick={() => {
          setIsMegaMenu(!isMegaMenu);
          if (isMoreMenu) {
            setIsMoreMenu(false);
          }
        }}
      >
        <FlexDiv style={{ gap: "4px" }}>
          <NavText>Practice</NavText>
          <NavSmallArrow alt="" src={NavSArrow} />
        </FlexDiv>
      </Btn>
      <Collapse in={isMegaMenu} timeout="auto" unmountOnExit>
        <FlexDiv
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "8px",
            flexDirection: isBMobile ? "column" : "",
          }}
        >
          <MegaMenu selectedText={selectedText} />
        </FlexDiv>
      </Collapse>
      <NavText
        style={{ cursor: "pointer" }}
        onClick={() => {
          setIsMoreMenu(false);
          setIsMegaMenu(false);
          navigateTo("/MockTest");
        }}
      >
        Mock Tests
      </NavText>
      <Btn
        onClick={() => {
          setIsMoreMenu(!isMoreMenu);
          if (isMegaMenu) {
            setIsMegaMenu(false);
          }
        }}
      >
        <FlexDiv style={{ gap: "4px" }}>
          <NavText>More</NavText>
          <NavSmallArrow
            alt=""
            src={NavSArrow}
            style={{ transform: isMoreMenu && "rotate(180deg)" }}
          />
        </FlexDiv>
      </Btn>
      {!isTab ? (
        <Collapse
          in={isMoreMenu}
          timeout="auto"
          unmountOnExit
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <FlexDiv
            style={{
              gap: "22px",
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
              marginTop: "16px",
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
        </Collapse>
      ) : (
        <Collapse
          in={isMoreMenu}
          timeout="auto"
          unmountOnExit
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "10px",
            width: "100%",
          }}
        >
          <FlexDiv
            style={{
              justifyContent: "space-between",
              width: "100%",
              gap: "2%",
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
          </FlexDiv>
          <FlexDiv
            style={{
              justifyContent: "space-between",
              width: "100%",
              marginTop: "16px",
              gap: "2%",
            }}
          >
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
              justifyContent: "space-between",
              width: "100%",
              marginTop: "16px",
              gap: "2%",
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
          </FlexDiv>
          <FlexDiv
            style={{
              justifyContent: "space-between",
              width: "100%",
              marginTop: "16px",
              gap: "2%",
            }}
          >
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
        </Collapse>
      )}
    </MobileMenuDiv>
  );
};

export default MobileNav;
