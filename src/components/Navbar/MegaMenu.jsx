import React, { useState } from "react";
import {
  MegaMenuDivHeader,
  MegaMenuDivHeaderLine,
  MegaMenuImg,
  MegaMenuSimpleText,
  MegaMenuSmallImg,
  MegaMenuTextImg,
} from "./style";
import { Btn, FlexDiv } from "../../assets/styles/style";
import MegaMenuOne from "../../assets/images/MegaMenu1.svg";
import MegaMenuTwo from "../../assets/images/MegaMenu2.svg";
import MegaMenuThree from "../../assets/images/MegaMenu3.svg";
import MegaMenuFour from "../../assets/images/MegaMenu4.svg";
import SpeakSImg from "../../assets/images/SpeakingSmallImg.svg";
import {
  SpeakingTests,
  WritingTests,
  ReadingTests,
  ListeningTests,
} from "./data";
import ReadTextImg from "../../assets/images/ReadText.svg";
import ListenTextImg from "../../assets/images/ListenText.svg";
import WriteSImg from "../../assets/images/WritingSmallImg.svg";
import ListenSImg from "../../assets/images/ListenSmallImg.svg";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTestQuestions } from "../../context/TestQuestionContext";

const MegaMenu = ({selectedText = false, onlySelectTestName = false, setSelectedTestForSearch}) => {
  const isLaptop = useMediaQuery("(max-width:1440px)");
  const isTab = useMediaQuery("(max-width:1000px)");
  const isSTab = useMediaQuery("(max-width:750px)");
  const isMobile = useMediaQuery("(max-width:500px)");
  const navigate = useNavigate();
  const [selectedTest, setSelectedTest] = useState({title: "Read Aloud", category: "Speaking"});
  const { resetAllStates } = useTestQuestions();

  const handleTestSelection = (data, category) => {

    const testName = category === "Listening" && (data.title === "Multiple Choice, Multiple Answers" || data.title === "Multiple Choice, Single Answer")
        ? `Listening: ${data.title}` 
        : data.title;


    if (onlySelectTestName && setSelectedTestForSearch) {
      setSelectedTestForSearch({testName, category});
    } else {
      resetAllStates();
      navigate(data.link);
    }
        
    setSelectedTest({ title: testName, category });
  };
  
  const isTestSelected = (testTitle, category) => {
    const isSelected = 
      category === "Listening" && 
      (testTitle === "Multiple Choice, Multiple Answers" || testTitle === "Multiple Choice, Single Answer")
        ? selectedTest?.title === `Listening: ${testTitle}` && selectedTest?.category === "Listening"
        : selectedTest?.title === testTitle && selectedTest?.category === category;
  
    return isSelected;
  };

  return (
    <>
      <FlexDiv 
        style={{
         width: isTab ? '100%' : isLaptop ? '92%' : '84%',
         alignItems: 'flex-start', 
         flexDirection: isMobile ? 'column': '',
         justifyContent: "space-between", 
         padding: isLaptop ? isTab ? '0px' : '0px 4%' : '0px 8%', 
         gap: isTab ? '2%' : ''}} 
         id='mega-menu'
        >
      <FlexDiv
        style={{
          flexDirection: "column",
          gap: "10px",
          alignItems: "flex-start",
          marginBottom:isMobile?'0.75rem':''
        }}
      >
        <FlexDiv style={{ gap: "10px", alignItems: "center", width:'100%'}}>
          <MegaMenuImg alt="" src={MegaMenuOne} />
          {/* <MegaMenuTextImg alt="" src={SpeakTextImg} /> */}
          <FlexDiv style={{flexDirection:'column', width:'100%', alignItems:'flex-start'}}>
            <MegaMenuDivHeader style={{color:'#66E0F7'}}>Speaking</MegaMenuDivHeader>
            <MegaMenuDivHeaderLine style={{background:'#66E0F7'}}/>
          </FlexDiv>
        </FlexDiv>
        {SpeakingTests[selectedText?0:1].map((data) => (
          <>
          <FlexDiv style={{ gap: "8px", marginLeft: "48px" }} >
            <MegaMenuSmallImg src={SpeakSImg} alt="" />
            <Btn onClick={() => handleTestSelection(data, "Speaking")}>
              <MegaMenuSimpleText isSelected={isTestSelected(data.title, "Speaking") && onlySelectTestName}>
                {data.title}
              </MegaMenuSimpleText>
            </Btn>
          </FlexDiv></>
        ))}
        {isTab && !isMobile && (
          <>
            <FlexDiv style={{ gap: "10px", alignItems: "center" }}>
              <MegaMenuImg alt="" src={MegaMenuFour} />
              <MegaMenuTextImg alt="" src={ListenTextImg} />
            </FlexDiv>
            {ListeningTests[selectedText?0:1].map((data) => (
              <FlexDiv style={{ gap: "8px", marginLeft: "48px" }} >
                {data.ai && <MegaMenuSmallImg src={ListenSImg} alt="" />}
                <Btn onClick={() => handleTestSelection(data, "Listening")}>
                <MegaMenuSimpleText style={{ marginLeft:data.ai?'':'1.5rem' }} isSelected={isTestSelected(data.title, "Listening") && onlySelectTestName} >
                  {data.title}
                </MegaMenuSimpleText>
                </Btn>
              </FlexDiv>
            ))}
          </>
        )}
      </FlexDiv>
      <FlexDiv
        style={{
          flexDirection: "column",
          gap: "10px",
          alignItems: "flex-start",
          marginBottom:isMobile?'0.75rem':''
        }}
      >
        <FlexDiv style={{ gap: "10px", alignItems: "center", width:'100%' }}>
          <MegaMenuImg alt="" src={MegaMenuTwo} />
          <FlexDiv style={{flexDirection:'column', width:'100%', alignItems:'flex-start'}}>
            <MegaMenuDivHeader style={{color:'#FF5D5D'}}>Writing</MegaMenuDivHeader>
            <MegaMenuDivHeaderLine style={{background:'#FF5D5D'}}/>
          </FlexDiv>
        </FlexDiv>
        {WritingTests[selectedText?0:1].map((data) => (
          <>
          <FlexDiv style={{ gap: "8px", marginLeft: "48px", alignItems:'flex-start'}} >
            <MegaMenuSmallImg src={WriteSImg} alt="" style={{marginTop:isTab?'':'0.1rem'}}/>
            <Btn onClick={() => handleTestSelection(data, "Writing")}>
              <MegaMenuSimpleText isSelected={isTestSelected(data.title, "Writing") && onlySelectTestName}>
                {data.title}
              </MegaMenuSimpleText>
            </Btn>
          </FlexDiv></>
        ))}
        {isSTab && !isMobile && (
          <>
            <FlexDiv
              style={{ gap: "10px", alignItems: "center", marginTop: "88px" }}
            >
              <MegaMenuImg alt="" src={MegaMenuThree} />
              <MegaMenuTextImg alt="" src={ReadTextImg} />
            </FlexDiv>
            {ReadingTests.map((data) => (
              <FlexDiv style={{ gap: "8px", marginLeft: "48px" }} >
                <Btn onClick={() => handleTestSelection(data, "Reading")}>
                  <MegaMenuSimpleText style={{ width: "180px" }} isSelected={isTestSelected(data.title, "Reading") && onlySelectTestName}>
                    {data.title}
                  </MegaMenuSimpleText>
                </Btn>
              </FlexDiv>
            ))}
          </>
        )}
      </FlexDiv>
      {(!isSTab || isMobile) && (
        <FlexDiv
          style={{
            flexDirection: "column",
            gap: "10px",
            alignItems: "flex-start",
            marginBottom:isMobile?'0.75rem':''
          }}
        >
          <FlexDiv style={{ gap: "10px", alignItems: "center", width:'100%' }}>
            <MegaMenuImg alt="" src={MegaMenuThree} />
            <FlexDiv style={{flexDirection:'column', width:'100%', alignItems:'flex-start'}}>
            <MegaMenuDivHeader style={{color:'#AD826E'}}>Reading</MegaMenuDivHeader>
            <MegaMenuDivHeaderLine style={{background:'#AD826E'}}/>
            </FlexDiv>
          </FlexDiv>
          {ReadingTests.map((data) => (
            <FlexDiv style={{ gap: "8px", marginLeft: "48px" }} >
              <Btn onClick={() => handleTestSelection(data, "Reading")}>
                <MegaMenuSimpleText style={{ maxWidth: "280px" }} isSelected={isTestSelected(data.title, "Reading") && onlySelectTestName}>
                  {data.title}
                </MegaMenuSimpleText>
              </Btn>
            </FlexDiv>
          ))}
        </FlexDiv>
      )}
      {(!isTab || isMobile) && (
        <FlexDiv
          style={{
            flexDirection: "column",
            gap: "10px",
            alignItems: "flex-start",
            marginBottom:isMobile?'0.75rem':''
          }}
        >
          <FlexDiv style={{ gap: "10px", alignItems: "center", width:'100%'}}>
            <MegaMenuImg alt="" src={MegaMenuFour} />
            <FlexDiv style={{flexDirection:'column', width:'100%', alignItems:'flex-start'}}>
              <MegaMenuDivHeader style={{color:'#868EAF'}}>Listening</MegaMenuDivHeader>
              <MegaMenuDivHeaderLine style={{background:'#868EAF'}}/>
            </FlexDiv>            
          </FlexDiv>
          {ListeningTests[selectedText?0:1].map((data) => (
            <FlexDiv style={{ gap: "8px", marginLeft: "48px" }} >
              {data.ai && <MegaMenuSmallImg src={ListenSImg} alt="" />}
              <Btn onClick={() => handleTestSelection(data, "Listening")}>
                <MegaMenuSimpleText style={{ maxWidth: "280px", marginLeft:data.ai?'':'1.5rem' }} isSelected={isTestSelected(data.title, "Listening") && onlySelectTestName} >
                  {data.title}
                </MegaMenuSimpleText>
              </Btn>
            </FlexDiv>
          ))}
        </FlexDiv>
      )}
      </FlexDiv>
    </>
  );
};

export default MegaMenu;
