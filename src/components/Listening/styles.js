import styled from "@emotion/styled";
import { Card, CardContent, Button } from "@mui/material";

export const HICMainDiv = styled(Card)`
  width: 100%;
  background: #fff;
  box-shadow: none;
`;

export const HICCardContent = styled(CardContent)`
  opacity: ${(props) => (props.submitted ? 1 : 1)};
  display: flex;
  align-items: flex-start;
  align-content: flex-start;
  gap: 0px 10px;
  flex-wrap: wrap;
  padding: 0px;
  &:last-child {
    padding-bottom: 0px;
  }
`;

export const HICParagraphText = styled(CardContent)`
  color: rgba(0, 0, 0, 0.65);
  font-family: "Noto Sans";
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 46px; /* 230% */
  letter-spacing: 1px;
  padding: 10px;
  &:last-child {
    padding-bottom: 10px;
  }
`;

export const HICHighlightText = styled.div`
  display: flex;
  padding: 0px 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: var(--Brand-Purple, #996cfe);
`;

export const HICCorrectWord = styled.span`
  color: #01cdce;
  // color: #09e240;
  margin-left: 5px;
  vertical-align: middle;
`;

export const HICWord = styled.span`
  cursor: ${(props) => (props.submitted ? "default" : "pointer")};
  display: inline-flex;
  padding: 5px 0px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  vertical-align: middle;
  border-radius: ${(props) =>
    props.submitted && props.isIncorrect ? "4px" : "0"};
  border: ${(props) =>
    props.submitted && props.isIncorrect
      ? // ? "1px solid var(--White-Theme-Gray---1, #F2F3F7)"
        "1px solid #7f93e4"
      : "none"};
  height: ${(props) =>
    props.submitted && props.isIncorrect ? "26px" : "auto"};
  &:last-child {
    margin-right: 0;
  }
  &:hover {
    background-color: ${(props) =>
      props.submitted ? "transparent" : "var(--Brand-Purple, #996cfe)"};
    color: ${(props) => (props.submitted ? "rgba(0, 0, 0, 0.65)" : "white")};
    padding: "1px 5px";
    // height: 20px;
    // padding: ${(props) => (props.submitted ? " 1px 5px" : "1px 5px")};
    height: ${(props) => (props.submitted ? "26px " : "20px")};
  }
  .wordText {
    display: inline-block;
    padding: ${(props) => (props.isSelected ? "2px 5px" : "2px 5px")};
    margin-right: 4px;
    line-height: ${(props) => (props.isSelected ? "130%" : "normal")};
    background-color: ${(props) =>
      props.isSelected ? "var(--Brand-Purple, #996cfe)" : "transparent"};
    color: ${(props) =>
      props.submitted
        ? props.isSelected
          ? props.isCorrect
            ? "white" // Correct and selected dark green 0r #006219
            : "white" // Incorrect but selected white
          : props.isIncorrect
          ? "red" // Incorrect and not selected
          : "inherit" // Default
        : props.isSelected
        ? "white" // Selected but not submitted
        : "inherit"}; // Not selected and not submitted
  }
`;

export const ListeningPopupWrapper = styled.div`
  width: 968px;
  display: flex;
  flex-direction: column;
  border-radius: 8px 8px 0px 0px;
  background: #fff;
  gap: 20px;
  padding-bottom: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1), 0 0 10px rgba(0, 0, 0, 0.1);
  @media (max-width: 1024px) {
    width: 95%;
  }
`;

export const EnableSkillsCard = styled.div`
  width: 100%;
  // height: 530px;
  display: flex;
  flex-direction: column;
  border-radius: 8px 8px 0px 0px;
  background: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  @media (max-width: 500px) {
    width: 100%;
  }
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

export const ResponseCard = styled.div`
  width: 98%;

  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  border-radius: 8px 8px 0px 0px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  @media (max-width: 1024px) {
    width: 98%;
    height: auto;
  }
`;

export const ResponseContentWrapper = styled.div`
  max-height: ${(props) => (props.expanded ? "20rem" : "0")};
  overflow: hidden;
  transition: max-height 0.5s ease-in-out, padding 0.5s ease-in-out;
  padding: 0px 24px 24px;
  // overflow-y: scroll;
  // height: max-content;
  max-height: 7.5rem;
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // justify-content: center;
  gap: 5px;
`;

export const ResponseContentWrapper2 = styled.div`
  padding: 20px;
  // overflow-y: scroll;
  height: max-content;
  // max-height: 25vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  @media (max-width: 1024px) {
    height: auto;
  }
`;

export const UserResListsHeading = styled.div`
  white-space: nowrap;
  // height: 35px;
  color: ${(props) => props.color || "black"};
  font-family: "Noto Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 171.429%;
  letter-spacing: 0.15px;
  @media (max-width: 600px) {
    font-size: 13px;
    font-weight: 400;
  }
  @media (max-width: 1024px) {
    line-height: 120%;
  }
`;

export const UserResListsHeadingWFD = styled.div`
  // height: 35px;
  color: ${(props) => props.color || "black"};
  font-family: "Noto Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 171.429%;
  letter-spacing: 0.15px;
  @media (max-width: 600px) {
    font-size: 13px;
    font-weight: 400;
  }
  @media (max-width: 1024px) {
    line-height: 120%;
  }
`;

export const UserResLists = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
`;

export const UserResList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  // width: 100%;
  gap: 10px;
`;

export const PopupTWs = styled.div`
  color: var(--Brand-Purple, #996cfe);
  font-family: "Noto Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 171.429% */
  letter-spacing: 0.15px;
`;

export const ClickOnText = styled.div`
  color: #666;
  text-align: center;
  font-family: "Noto Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px; /* 157.143% */
  display: flex;
  align-self: center;
`;
