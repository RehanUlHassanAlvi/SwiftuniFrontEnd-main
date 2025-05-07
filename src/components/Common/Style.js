import styled, { keyframes, css } from "styled-components";
import { TextField } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import { FormControl, Select } from "@mui/material";

export const CustomFormControl = styled(FormControl)`
  width: 130px;
  z-index: 1300;
  .MuiOutlinedInput-root {
    height: 30px;
    border-radius: 4px;
    background: var(--White-Theme-Gray---1, #f2f3f7);
    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: transparent;
    }
    .MuiOutlinedInput-notchedOutline {
      border: none;
    }
  }
  .MuiSelect-icon {
    color: ${(props) => (props.open ? "black" : "gray")};
  }
`;

export const CustomSelect = styled(Select)`
  .MuiSelect-select {
    color: var(--White-Theme-Gray---4, #9a9aaf);
    font-family: "Noto Sans";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px;
    &:focus {
      background-color: transparent;
    }
  }
  .MuiMenuItem-root {
    color: var(--White-Theme-Gray---4, #9a9aaf);
    font-family: "Noto Sans";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px;
  }
`;

const blinkAnimation = keyframes`
  // 0%, 100% {
  //   opacity: 0;
  // }
  // 50% {
  //   opacity: 1;
  // }

    50% {
    opacity: 0;
  }
`;

export const RecordingImage = styled.img`
  width: 50px;
  height: auto;
  margin-left: 5px;
  animation: ${blinkAnimation} 1.5s linear infinite;
`;

export const BlinkText = styled.div`
  animation: ${blinkAnimation} 1.5s linear infinite;
`;

export const RecordedText = styled.div`
  color: #00e6c3;
`;

export const TimeCounterText = styled.div`
  color: #996cfe;
  @media (min-width: 801px) {
    white-space: nowrap;
    display: inline;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

// export const TestDiv = styled.div`
//   width: 86%;
//   padding: 6rem 7% 1.75rem;
//   @media (max-width: 1440px) {
//     width: 90%;
//   }
//   @media (max-width: 1000px) {
//     width: 94%;
//     padding: 1rem 3% 1.75rem;
//   }
// `;

export const TestDiv = styled.div`
  width: 86%;
  padding: 1rem 7%;
  @media (max-width: 1440px) {
    width: 90%;
    padding: 1rem 5%;    
  }
  @media (max-width: 1000px) {
    width: 94%;
    padding: 0rem 3% 0.5rem;
  }
`;

export const ScrollableDiv = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  height: 101vh;
`;

export const MainLogo = styled.img`
  width: 4.625rem;
  height: 4.625rem;
  margin-top: 0.5rem;
`;

export const Heading = styled.div`
  color: var(--White-Theme-Gray---8, #2e2e3a);
  font-feature-settings: "clig" off, "liga" off;
  font-family: "Noto Sans";
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: 2.125rem; /* 121.429% */
  letter-spacing: 0.00706rem;
  margin-top: 0.3rem;
  @media (max-width: 1440px) {
    font-size: 1.25rem;
    line-height: 1.875rem;
  }
  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

export const SubHeading = styled.div`
  color: var(--White-Theme-Gray---5, #7e7e8f);
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem; /* 133.333% */
  @media (max-width: 1440px) {
    font-size: 0.9375rem;
    line-height: 1.3125rem;
  }
`;

export const SerialNo = styled.div`
  color: var(--White-Theme-Gray---8, #2e2e3a);
  font-family: "Noto Sans";
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.125rem; /* 81.818% */
  @media (max-width: 1440px) {
    font-size: 1.15rem;
  }
  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

export const SmallImgs = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.2);
  }
  @media (max-width: 600px) {
    width: 1.125rem;
    height: 1.125rem;
  }
`;

export const BookMarkImg = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.2);
  }
  @media (max-width: 600px) {
    width: 1.125rem;
    height: 1.125rem;
  }
`;

export const AppearedDiv = styled.div`
  display: inline-flex;
  padding: 0.1875rem 0.375rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.25rem;
  border: 1px solid var(--White-Theme-Gray---3, #c6cbd9);
  color: var(--White-Theme-Gray---4, #9a9aaf);
  text-align: center;
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem; /* 133.333% */
  @media (max-width: 1440px) {
    font-size: 0.9375rem;
    line-height: 1.375rem;
  }
  @media (max-width: 600px) {
    font-size: 0.8125rem;
  }
`;

export const QuestionNoDiv = styled.div`
  display: flex;
  border-bottom: 1px solid var(--White-Theme-Gray---2, #e2e2ea);
  justify-content: space-between;
  padding: 2rem 0rem 1rem;
`;

export const RemainingTimeText = styled.div`
  // color: #f66;
  color: #fd3c65;
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem;
  @media (min-width: 801px) {
    white-space: nowrap;
    display: inline;
  }
  @media (max-width: 1440px) {
    font-size: 0.9375rem;
  }
  @media (max-width: 600px) {
    font-size: 0.8125rem;
    width: 6.9rem;
  }
`;

export const NewDiv = styled.div`
  display: inline-flex;
  padding: 0.1875rem 0.375rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.25rem;
  background: rgba(0, 230, 195, 0.1);
  color: #00e6c3;
  text-align: center;
  font-family: "Noto Sans";
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem;
  @media (max-width: 1440px) {
    font-size: 1rem;
    line-height: 1.375rem;
  }
  @media (max-width: 600px) {
    font-size: 0.8125rem;
  }
`;

export const PredictionDiv = styled.div`
  display: inline-flex;
  padding: 0.1875rem 0.375rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.25rem;
  background: rgba(253, 60, 101, 0.1);
  color: #fd3c65;
  text-align: center;
  font-family: "Noto Sans";
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem;
  @media (max-width: 1440px) {
    font-size: 1rem;
    line-height: 1.375rem;
  }
  @media (max-width: 600px) {
    font-size: 0.8125rem;
  }
`;

export const PracticedDiv = styled.div`
  display: inline-flex;
  padding: 0.1875rem 0.375rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.25rem;
  background: rgba(153, 108, 254, 0.1);
  color: var(--Brand-Purple, #996cfe);
  text-align: center;
  font-family: "Noto Sans";
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem;
  @media (max-width: 1440px) {
    font-size: 1rem;
    line-height: 1.375rem;
  }
  @media (max-width: 600px) {
    font-size: 0.8125rem;
  }
`;

export const MockTextBtn = styled.div`
  display: flex;
  width: 11rem;
  padding: 0.75rem 0rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.25rem;
  background: var(--Brand-Purple, #996cfe);
  color: #fff;
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem;
  &:hover {
    opacity: 0.8;
  }
  @media (max-width: 700px) {
    width: 10rem;
    font-size: 0.9375rem;
    font-style: normal;
    line-height: 1.375rem;
  }
`;

export const ResetPurpleBtn = styled.div`
  height: 1rem;
  width: 2rem;
  display: inline-flex;
  padding: 0.75rem 1.375rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.25rem;
  background: ${({ bgColor }) => bgColor || "var(--Brand-Purple, #996cfe)"};
  color: ${({ bgColor }) =>
    bgColor === "transparent" ? "var(--Brand-Purple, #996cfe)" : "#fff"};
  border: ${({ bgColor }) =>
    bgColor === "transparent" ? "1px solid #996cfe" : "none"};
  text-align: center;
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.125rem;
  cursor: pointer;
  transition: box-shadow 0.3s ease, transform 0.3s ease;

  &:hover {
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : "0 4px 8px rgba(0, 0, 0, 0.2)"};
    transform: ${({ disabled }) => (disabled ? "none" : "translateY(-2px)")};
  }

  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  background: ${({ disabled, bgColor }) =>
    disabled ? "#C6CBD9" : bgColor || "var(--Brand-Purple, #996cfe)"};
  color: ${({ disabled, bgColor }) =>
    disabled
      ? "#fff"
      : bgColor === "transparent"
      ? "var(--Brand-Purple, #996cfe)"
      : "#fff"};

  @media (max-width: 1400px) {
    font-size: 0.875rem;
    line-height: 1rem;
  }
  @media (max-width: 600px) {
    padding: 0.625rem 0.75rem;
  }
`;

export const PurpleBtn = styled.div`
  display: inline-flex;
  padding: 0.75rem 1.375rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.25rem;
  background: ${({ bgColor }) => bgColor || "var(--Brand-Purple, #996cfe)"};
  color: ${({ bgColor }) =>
    bgColor === "transparent" ? "var(--Brand-Purple, #996cfe)" : "#fff"};
  border: ${({ bgColor }) =>
    bgColor === "transparent" ? "1px solid #996cfe" : "none"};
  text-align: center;
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.125rem;
  cursor: pointer;
  transition: box-shadow 0.3s ease, transform 0.3s ease;

  &:hover {
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : "0 4px 8px rgba(0, 0, 0, 0.2)"};
    transform: ${({ disabled }) => (disabled ? "none" : "translateY(-2px)")};
  }

  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  background: ${({ disabled, bgColor }) =>
    disabled ? "#C6CBD9" : bgColor || "var(--Brand-Purple, #996cfe)"};
  color: ${({ disabled, bgColor }) =>
    disabled
      ? "#fff"
      : bgColor === "transparent"
      ? "var(--Brand-Purple, #996cfe)"
      : "#fff"};

  @media (max-width: 1400px) {
    font-size: 0.875rem;
    line-height: 1rem;
  }
  @media (max-width: 600px) {
    padding: 0.625rem 0.75rem;
  }
`;

export const PurpleCopyPasteBtn = styled.div`
  display: inline-flex;
  padding: 0.3rem 0.7rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.25rem;
  background: ${({ bgColor }) => bgColor || "var(--Brand-Purple, #996cfe)"};
  color: ${({ bgColor }) =>
    bgColor === "transparent" ? "var(--Brand-Purple, #996cfe)" : "#fff"};
  border: ${({ bgColor }) =>
    bgColor === "transparent" ? "1px solid #996cfe" : "none"};
  text-align: center;
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.125rem;
  cursor: pointer;
  transition: box-shadow 0.3s ease, transform 0.3s ease;

  &:hover {
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : "0 4px 8px rgba(0, 0, 0, 0.2)"};
    transform: ${({ disabled }) => (disabled ? "none" : "translateY(-2px)")};
  }

  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  background: ${({ disabled, bgColor }) =>
    disabled ? "#C6CBD9" : bgColor || "var(--Brand-Purple, #996cfe)"};
  color: ${({ disabled, bgColor }) =>
    disabled
      ? "#fff"
      : bgColor === "transparent"
      ? "var(--Brand-Purple, #996cfe)"
      : "#fff"};

  @media (max-width: 1400px) {
    font-size: 0.875rem;
    line-height: 1rem;
  }
  @media (max-width: 600px) {
    padding: 0.625rem 0.75rem;
  }
`;

export const ResetPracticeBtn = styled.div`
  white-space: nowrap;
  display: inline-flex;
  width: 80%;
  padding: 0.37rem 0.6rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.25rem;
  background: ${({ bgColor }) => bgColor || "var(--Brand-Purple, #996cfe)"};
  color: ${({ bgColor }) =>
    bgColor === "transparent" ? "var(--Brand-Purple, #996cfe)" : "#fff"};
  border: ${({ bgColor }) =>
    bgColor === "transparent" ? "1px solid #996cfe" : "none"};
  text-align: center;
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.125rem;
  cursor: pointer;
  transition: box-shadow 0.3s ease, transform 0.3s ease;

  &:hover {
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : "0 4px 8px rgba(0, 0, 0, 0.2)"};
    transform: ${({ disabled }) => (disabled ? "none" : "scale(1.03)")};
  }

  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  background: ${({ disabled, bgColor }) =>
    disabled ? "#b3a1fe" : bgColor || "var(--Brand-Purple, #996cfe)"};
  color: ${({ disabled, bgColor }) =>
    disabled
      ? "#ddd"
      : bgColor === "transparent"
      ? "var(--Brand-Purple, #996cfe)"
      : "#fff"};

  @media (max-width: 1400px) {
    font-size: 0.875rem;
    line-height: 1rem;
  }
  @media (max-width: 600px) {
    padding: 0.5rem 0.75rem;
  }
`;

export const AnswerBtn = styled.div`
  display: inline-flex;
  padding: 0.7rem 1.375rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.25rem;
  background: var(--Brand-Purple, #996cfe);
  color: #fff;
  text-align: center;
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.125rem;
  cursor: pointer;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  }
  @media (max-width: 1400px) {
    font-size: 0.875rem;
    line-height: 1rem;
  }
  @media (max-width: 600px) {
    padding: 0.6rem 0.75rem;
  }
`;

export const ButtonListDiv = styled.div`
  padding: 0rem 7% 1.75rem;
  width: 86%;
  @media (max-width: 1440px) {
    padding: 0rem 5% 1.75rem;
    width: 90%;
  }
  @media (max-width: 1000px) {
    padding: 0rem 3% 1.75rem;
    width: 94%;
  }
`;

// const fadeIn = keyframes`
//   from {
//     opacity: 0;
//   }
//   to {
//     opacity: 1;
//   }
// `;

export const MyScoreText = styled.div`
  color: var(--White-Theme-Gray---4, #9a9aaf);
  font-family: "Noto Sans";
  font-size: 1.0625rem;
  font-style: normal;
  font-weight: 500;
  line-height: 3rem;
  cursor: pointer;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -6px;
    left: 50%;
    width: 112px;
    height: 1px;
    background-color: var(--Brand-Purple, #996cfe);
    transform: translateX(-50%);
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s, opacity 0.5s linear;
  }

  ${(props) =>
    props.selected &&
    css`
      &::after {
        visibility: visible;
        opacity: 1;
        animation: ${fadeIn} 0.5s forwards;
      }
    `}

  @media (max-width: 1400px) {
    font-size: 0.9375rem;
    line-height: 2.875rem;
  }
  @media (max-width: 450px) {
    font-size: 13px;
    line-height: 282.353%;
  }
`;

export const BookmarksText = styled.div`
  color: var(--White-Theme-Gray---4, #9a9aaf);
  font-family: "Noto Sans";
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 3rem; /* 282.353% */
  cursor: pointer;
  @media (max-width: 450px) {
    font-size: 13px;
    line-height: 353.846%;
  }
`;

export const GrayLineDiv = styled.div`
  background: #e8e8e8;
  display: flex;
  height: 0.125rem;
  width: 100%;
  margin-top: 5px;
`;

export const GrayLineDiv2 = styled.div`
  background: #e8e8e8;
  display: flex;
  height: 0.05rem;
  width: 100%;
  margin-left: -20px;
`;

export const PurpleLineDiv = styled.div`
  background: var(--Brand-Purple, #996cfe);
  height: 0.125rem;
  width: 7rem;
`;

export const ShowScoreDiv = styled.div`
  min-height: 4.875rem;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

export const HistoryAndComments = styled.div`
  // min-height: 4.875rem;
  border-radius: 0.5rem;
  background: #fff;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 1.25rem;
`;

export const MyWorkImg = styled.img`
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  @media (max-width: 800px) {
    width: 2rem;
    height: 2rem;
  }
`;

export const MyWorkUserName = styled.div`
  color: var(--White-Theme-Gray---7, #535362);
  font-family: "Noto Sans";
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  @media (max-width: 800px) {
    font-size: 0.8125rem;
  }
  @media (max-width: 400px) {
    font-size: 0.75rem;
  }
`;

export const MyWorkTime = styled.div`
  // color: var(--White-Theme-Gray---7, #535362);
  color: rgba(0, 0, 0, 0.65);
  font-family: "Noto Sans";
  font-size: 0.9rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1rem; /* 100% */
  @media (max-width: 800px) {
    font-size: 0.8125rem;
  }
  @media (max-width: 400px) {
    font-size: 0.7125rem;
  }
`;

export const ActionBtn = styled.img`
  width: 1.75rem;
  height: 1.75rem;
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.2);
  }
  transform: ${({ clicked }) => (clicked ? "scale(1.2)" : "none")};
  @media (max-width: 800px) {
    width: 1rem;
    height: 1rem;
  }
`;

export const MyWorkRedDiv = styled.div`
  display: flex;
  width: 8rem;
  height: 2.375rem;
  border-radius: 2.5rem;
  /* border: 1px solid #ff5d5d; */
  border: 1px solid ${({ color }) => (color ? color : "black")};
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
  transform: ${({ clicked }) => (clicked ? "scale(1.1)" : "none")};
  @media (max-width: 800px) {
    width: 3.19738rem;
    height: 1.10456rem;
    border-radius: 1.16269rem;
    border: 0.708px solid ${({ color }) => (color ? color : "black")};
  }
`;

export const MyScoreShowDiv = styled.div`
  display: flex;
  // width: 8.1rem;
  width: ${({ ai_score }) => (ai_score ? "8.25rem" : "6.5rem")};
  height: 2.375rem;
  border-radius: 2.5rem;
  position: relative;
  border: 1px solid ${({ color }) => (color ? color : "black")};
  @media (max-width: 800px) {
    width: 3.39738rem;
    height: 1.10456rem;
    border-radius: 1.16269rem;
    border: 0.708px solid ${({ color }) => (color ? color : "black")};
  }
`;

export const MyWorkSmallRedDiv = styled.div`
  width: 2rem;
  height: 1.8rem;
  border-radius: 6.25rem;
  background: ${({ color }) => (color ? color : "black")};
  color: #fff;
  font-family: Montserrat;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.625rem; /* 144.444% */
  text-transform: capitalize;
  margin: 0.19rem 0.88rem 0rem 0.13rem;
  text-align: center;
  padding-top: 0.2rem;
  @media (max-width: 800px) {
    padding-top: 0rem;
    margin: 0.19rem 0.35rem 0rem 0.13rem;
    width: 0.81388rem;
    height: 0.81388rem;
    color: #fff;
    leading-trim: both;
    text-edge: cap;
    font-family: Montserrat;
    font-size: 0.40688rem;
    font-style: normal;
    font-weight: 400;
    line-height: 0.86419rem;
    text-transform: capitalize;
  }
`;

export const MyWorkRedDivText = styled.div`
  color: ${({ color }) => (color ? color : "black")};
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.125rem; /* 112.5% */
  /* margin-top: 0.54rem; */
  display: flex;
  align-items: center;
  text-align: center;
  align-self: center;
  position: absolute;
  left: 62%;
  transform: translateX(-50%);
  @media (max-width: 800px) {
    font-size: 0.40694rem;
    font-style: normal;
    font-weight: 400;
    line-height: 0.46506rem;
  }
`;

export const MyWorkBlueDiv = styled.div`
  display: flex;
  width: ${({ ai_score }) => (ai_score ? "7.3125rem" : "6.65rem")};
  height: 2.375rem;
  border-radius: 2.5rem;
  // background: ${({ color }) => (color ? color : "#2d2966")};
  background: ${({ disabled, color }) =>
    disabled ? "#C6CBD9" : color ? color : "#2d2966"};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  transition: transform 0.3s ease;
  &:hover {
    // transform: scale(1.1);
    transform: ${({ disabled }) => (disabled ? "none" : "scale(1.1)")};
  }

  @media (max-width: 800px) {
    width: 3.1975rem;
    height: 1.10456rem;
    border-radius: 1.16275rem;
  }
`;

export const MyWorkSmallBlueDiv = styled.div`
  width: 1.75rem;
  height: 1.75rem;
  background: #fff;
  border-radius: 50%;
  margin: 0.31rem 0.75rem 0rem 0.31rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Montserrat;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem;
  text-transform: capitalize;
  @media (max-width: 800px) {
    margin: 0.15rem 0.35rem 0rem 0.15rem;
    width: 0.81394rem;
    height: 0.81394rem;
    font-size: 0.5rem;
  }
`;

export const MyWorkBlueDivImg = styled.img`
  width: 1rem;
  height: 1rem;
  @media (max-width: 800px) {
    width: 0.46506rem;
    height: 0.46506rem;
  }
`;

export const MyWorkBlueDivText = styled.div`
  // color: ${({ disabled }) => (disabled ? "black" : "#fff")};
  color: #fff;
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.125rem;
  display: flex;
  align-items: center;
  text-align: center;
  align-self: center;
  @media (max-width: 800px) {
    font-size: 0.40694rem;
    font-style: normal;
    font-weight: 400;
    line-height: 0.46506rem;
  }
`;

export const SPParentDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SPToogleIcon = styled.button`
  margin-right: -30px;
  position: absolute;
  top: 50vh;
  left: -30px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: none;
  background-image: linear-gradient(to left, white 50%, #996cfe 50%);

  cursor: pointer;
  z-index: 1000;
  transition: left 0.5s ease-in-out, opacity 0.2s ease-in-out;
  &:hover {
    opacity: 0.8;
  }
  @media (max-width: 1000px) {
    width: 50px;
    height: 50px;
    left: -25px;
  }
  @media (max-width: 500px) {
    width: 45px;
    height: 45px;
    left: -22.5px;
  }
`;

export const SPMainDiv = styled.div`
  position: relative;
  width: 75vw;
  height: 100vh;
  border-radius: 5px;
  background: #fff;
  display: flex;
  flex-direction: column;
  // padding: 30px;
  padding: 2.5%;
  gap: 20px;
  position: fixed;
  z-index: 2000;
  right: 0;
  top: 0;
  transition: transform 0.7s ease;
  transform: ${(props) =>
    props.isOpen ? "translateX(0)" : "translateX(100%)"};
  @media (max-width: 1000px) {
    padding: 3%;
  }
  @media (max-width: 500px) {
    padding: 3.5%;
  }
`;

export const SPHeading = styled.div`
  color: var(--White-Theme-Gray---8, #2e2e3a);
  font-family: "Noto Sans";
  font-size: 1.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: 2.125rem;
  @media (max-width: 1440px) {
    font-size: 1.25rem;
    line-height: 1.875rem;
  }
  @media (max-width: 800px) {
    font-size: 1.2rem;
    line-height: 1.3rem;
  }

  @media (max-width: 500px) {
    font-size: 0.95rem;
    line-height: 1rem;
  }
`;

export const InputDiv = styled.div`
  display: flex;
  width: 18.75rem;
  height: 2.625rem;
  border-radius: 0.5rem;
  background: #fff;
  @media (max-width: 600px) {
    width: 12.4375rem;
    height: 2.25rem;
  }
`;

export const InputField = styled.input`
  border: none;
  outline: none;
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.5rem;
`;

export const SearchInputField = styled.input`
  border-radius: 2rem;
  border: 1px solid var(--White-Theme-Gray---3, #c6cbd9);
  outline: none;
  width: 100%;
  padding: 0.5rem;
  color: black;
  font-family: Noto Sans;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: var(--White-Theme-Gray---3, #996cfe);
  }

  @media (max-width: 550px) {
    font-size: 11px;
  }
`;

export const SearchContainer = styled.div`
  min-width: 256px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  @media (max-width: 550px) {
    min-width: 200px;
  }

  @media (max-width: 500px) {
    min-width: 160px;
  }

  @media (max-width: 450px) {
    min-width: 160px;
  }
`;

export const PurpleLineDiv2 = styled.div`
  background: var(--Brand-Purple, #996cfe);
  height: 0.125rem;
  width: ${(props) => props.width || "4rem"};
`;

export const QuestionsCountText = styled.div`
  color: var(--Brand-Purple, #996cfe);
  font-family: "Noto Sans";
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 106.667%;
  margin-left: 2px;
  display: flex;
  @media (max-width: 450px) {
    font-size: 13px;
  }
`;

export const SortByText = styled.div`
  color: var(--White-Theme-Gray---4, #9a9aaf);
  font-family: "Noto Sans";
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 46px; /* 306.667% */
  @media (max-width: 500px) {
    font-size: 13px;
  }
`;

export const TestsDiv = styled.div`
  overflow-y: auto;
  padding: 1rem 0rem 1rem 0rem;
  max-height: 51vh;

  @media (max-width: 1480px) {
    max-height: 60vh;
  }

  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-track {
    // background: #f1f1f1;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #996cfe;
  }

  scrollbar-width: thin;
  // scrollbar-color: #996cfe #f1f1f1;
  scrollbar-color: #996cfe transparent;
`;

export const TopicsCard = styled.div`
  width: 100%;
  height: 60px;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0) 5%,
    rgba(255, 255, 255, 0) 95%,
    rgba(255, 255, 255, 1) 100%
  );
  position: relative;
  border-radius: 8px;
  transition: all 0.2s ease;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${props => props.isSelected ? 'rgba(0, 0, 0, 0.05)' : 'transparent'};
    border-radius: 8px;
    z-index: -1;
  }

  &:hover {
    transform: ${props => props.isSelected ? '' : 'translateY(-2px)'};
    opacity: ${props => props.isSelected ? '' : '0.6'};
  }

  @media (max-width: 650px) {
    flex-direction: column;
    justify-content: flex-start;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 0) 5%,
      rgba(255, 255, 255, 0) 95%,
      rgba(255, 255, 255, 1) 100%
    );
  }

  @media (max-width: 600px) {
    margin-top: 1rem;
  }
`;

export const SelectedTopicsCard = styled(TopicsCard)`
  border: 2px solid #996CFE;
  background-color: rgba(153, 108, 254, 0.05);
`;

export const TopicsDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  gap: 40px;
  @media (max-width: 650px) {
  }
`;

export const TopicsBoxesDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
  gap: 8px;
  @media (max-width: 650px) {
    margin: auto;
    gap: 5px;
  }
`;

export const TopicIdText = styled.div`
  min-width: 2.5rem;
  display: flex;
  align-self: flex-start;
  color: var(--White-Theme-Gray---8, #2e2e3a);
  font-family: "Noto Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 125% */
  @media (max-width: 900px) {
    min-width: 2.3rem;
  }
  @media (max-width: 800px) {
    min-width: 2rem;
  }
  @media (max-width: 500px) {
    font-size: 13px;
    min-width: 1.2rem;
  }
`;

export const TopicText = styled.div`
  color: var(--White-Theme-Gray---8, #2e2e3a);
  font-family: "Noto Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 125% */
  @media (max-width: 500px) {
    font-size: 13px;
  }
`;

export const TopicTextDiv = styled.div`
  display: inline-flex;
  padding: 3px 6px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  background: ${({ background }) => background};
  color: ${({ color }) => color};
  ${({ border }) => border && `border: ${border};`}
  text-align: center;
  font-family: "Noto Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  flex-wrap: nowrap;
  @media (max-width: 500px) {
    font-size: 12px;
  }
  @media (max-width: 400px) {
    font-size: 11px;
  }
`;

export const AreYouSureText = styled.div`
  // display: inline-flex;
  padding: 3px 6px;
  justify-content: center;
  align-items: center;
  color: ${({ color }) => color};
  text-align: center;
  font-family: "Noto Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  flex-wrap: nowrap;
  @media (max-width: 500px) {
    font-size: 12px;
  }
  @media (max-width: 400px) {
    font-size: 11px;
  }
`;

export const ReadingAnswerDiv = styled.div`
  padding: 0rem 7% 1.75rem;
  width: 86%;
  @media (max-width: 1440px) {
    padding: 0rem 5% 1.75rem;
    width: 90%;
  }
  @media (max-width: 1000px) {
    padding: 0rem 3% 1.75rem;
    width: 94%;
  }
`;

export const ReadingAnswerHeader = styled.div`
  color: var(--White-Theme-Gray---10, #16161e);
  font-family: "Noto Sans";
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  margin-right: 20px;
`;

export const ReadingAnswerText = styled.div`
  color: ${({ color }) => (color ? color : "var(--Brand-Purple, #996cfe)")};
  font-family: "Noto Sans";
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
`;

export const ScriptText = styled.div`
  color: var(--White-Theme-Gray---7, #535362);
  font-family: "Noto Sans";
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.75rem; /* 140% */
`;

export const NoRecordText1 = styled.div`
  textalign: center;
  font-weight: bold;
  margin: 20px 20px 5px 20px;
  font-size: 17px;
  color: #666;

  @media (max-width: 1000px) {
    font-size: 16px;
  }

  @media (max-width: 500px) {
    font-size: 13px;
  }
`;

export const NoRecordText2 = styled.div`
  font-weight: bold;
  font-size: 15px;
  color: rgb(169 158 158);

  @media (max-width: 1000px) {
    font-size: 14px;
  }

  @media (max-width: 500px) {
    font-size: 10px;
  }
`;

export const AllBookmarkPredDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: space-start;
  gap: 44px;
  @media (max-width: 600px) {
    gap: 20px;
  }
`;

export const StyledArrowForwardIosIcon = styled(ArrowForwardIosIcon)`
  position: absolute;
  left: 7px;
  color: white;
  font-size: 24px;
  z-index: 1000;
  /* transition: transform 1s ease-in-out; */
  transform: ${(props) => (props.isOpen ? "rotate(0deg)" : "rotate(180deg)")};
  @media (max-width: 1000px) {
    left: 4px;
    font-size: 22px;
  }
  @media (max-width: 500px) {
    left: 3px;
    font-size: 21px;
  }
`;

export const TermsHeaderDiv = styled.div`
  display: flex;
  width: 90%;
  padding: 50px 0px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 30px;
  border-radius: 16px;
  margin-bottom: 20px;
  background: var(
    --gradient,
    linear-gradient(319deg, #663dff 0%, #a0f 37%, #c49 100%)
  );
  @media (max-width: 600px) {
    margin-bottom: 6px;
    margin-top: 20px;
  }
`;

export const TermsHeaderTitle = styled.div`
  color: #fff;
  text-align: center;
  font-family: "Noto Sans";
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: 44px;
  @media (max-width: 600px) {
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 34.602px;
  }
`;

export const TermsHeaderDescription = styled.div`
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  font-family: "Noto Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  @media (max-width: 600px) {
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px;
  }
`;

export const TermsHeaderText = styled.div`
  color: rgba(0, 0, 0, 0.65);
  font-family: "Noto Sans";
  width: 88%;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 27px;
  margin-top: 20px;
  @media (max-width: 600px) {
    width: 85%;
    margin-top: 14px;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
  }
`;

export const TermsHeaderTextList = styled.li`
  font-family: "Noto Sans";
  color: rgba(0, 0, 0, 0.65);
  width: 90%;
  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

export const ShowMoreBtn = styled.div`
  margin-top: 15px;
  display: inline-flex;
  padding: 0.75rem 1.375rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.25rem;
  background: var(--Brand-Purple, #996cfe);
  color: #fff;
  line-height: 1.125rem;
  cursor: pointer;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  &:hover {
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : "0 4px 8px rgba(0, 0, 0, 0.2)"};
    transform: ${({ disabled }) => (disabled ? "none" : "translateY(-2px)")};
  }

  cursor: ${({ disabled }) => (disabled ? "initial" : "pointer")};
  background: ${({ disabled }) =>
    disabled ? "#b3a1fe" : "var(--Brand-Purple, #996cfe)"};
  color: ${({ disabled }) => (disabled ? "#ddd" : "#fff")} @media
    (max-width: 1400px) {
    font-size: 0.875rem;
    line-height: 1rem;
  }
  @media (max-width: 600px) {
    padding: 0.625rem 0.75rem;
  }
`;

export const ShowMoreBtnDiv = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SeperatingHeaderTitle = styled.div`
  color: #996cfe;
  text-align: center;
  font-family: "Noto Sans";
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.125rem; /* 100% */
  margin-bottom: 0.625rem;
  @media (max-width: 600px) {
    font-size: 1rem;
    font-weight: 600;
  }
`;

export const SeperatingHeaderLine = styled.div`
  width: 100%;
  height: 0.125rem;
  background: #996cfe;
`;

export const WhiteContainerDiv = styled.div`
  display: flex;
  width: 100%;
  height: 5rem;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  box-shadow: 0px 4px 10px 0px rgba(51, 51, 51, 0.08);
  margin-bottom: 0.05rem;
`;

export const WhiteContainerText = styled.div`
  color: #333;
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.375rem;
  margin-left: 1.25rem;
  @media (max-width: 600px) {
    font-size: 0.875rem;
    margin-left: 1rem;
    width: 197px;
  }
`;

export const WhiteContainerBtn = styled.div`
  display: flex;
  height: max-content;
  padding: 0.75rem 0rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.25rem;
  background: var(--Brand-Purple, #996cfe);
  color: #fff;
  text-align: center;
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.125rem; /* 112.5% */
  margin-right: 1.25rem;
  width: 7.625rem;
  cursor: pointer;
  @media (max-width: 600px) {
    font-size: 0.875rem;
    margin-right: 1rem;
    width: 6.5rem;
  }
  transition: box-shadow 0.3s ease, transform 0.3s ease, color 0.3s ease;
  &:hover {
    /* color: #996cfe; */
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : "0 8px 16px -4px rgba(0, 0, 0, 0.2)"};
    transform: ${({ disabled }) => (disabled ? "none" : "translateY(-2px)")};
  }
`;

export const WhiteContainerBtnText = styled.div`
  color: #fff;
  text-align: center;
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.125rem; /* 112.5% */
  @media (max-width: 600px) {
    font-size: 0.875rem;
  }
`;

export const SeperatingHeaderText = styled.div`
  color: #333;
  margin: 0.5rem 0rem 1rem;
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.375rem;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  // background: rgba(153, 108, 254, 0.1);

  // position: absolute;
  // bottom: 4.6rem;
  // left: 0;
  // right: 0;
  // padding: 1.5rem 0;

  @media (max-width: 650px) {
    flex-direction: column;
    margin-top: 15px;
  }

  @media (max-width: 400px) {
    flex-direction: column;
    margin-top: -15px;
  }
`;

export const PageBtn = styled.button`
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
  border-radius: 0.25rem;
  border: 1px solid var(--White-Theme-Gray---3, #c6cbd9);
  background: #fff;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  display: flex;
  justify-content: center;
  align-items: center;

  transition: transform 0.3s ease;

  &:hover {
    // background: #e6e6e6;
    border-color: #b0b0b0;
    transform: scale(1.2);
  }

  &:disabled {
    background: #f5f5f5;
    cursor: not-allowed;
    &:hover {
      background: #f5f5f5;
      border-color: var(--White-Theme-Gray---3, #c6cbd9);
    }
  }

  @media (max-width: 500px) {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export const PageNumberBtn = styled(PageBtn)`
  background: ${(props) =>
    props.active ? "rgba(153, 108, 254, 0.1)" : "#FFF"};

  border: 1px solid
    ${(props) =>
      props.active
        ? "var(--Brand-Purple, #996CFE)"
        : "var(--White-Theme-Gray---3, #C6CBD9)"};

  color: ${(props) =>
    props.active
      ? "var(--Brand-Purple, #996CFE)"
      : "var(--White-Theme-Gray---10, #16161e)"};

  text-align: center;
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.875rem; /* 187.5% */
  @media (max-width: 500px) {
    color: var(--White-Theme-Gray---10, #16161e);
    text-align: center;
    leading-trim: both;
    text-edge: cap;
    font-family: "Noto Sans";
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.875rem; /* 250% */
  }
`;

export const PageNumInput = styled.input`
  max-width: 3.125rem;
  height: 1.78rem;
  flex-shrink: 0;
  border-radius: 0.25rem;
  border: 1px solid var(--White-Theme-Gray---3, #c6cbd9);
  background: #fff;
  text-align: center;
  outline: none;

  &:focus {
    border-color: var(--Brand-Purple, #996cfe);
    outline: none;
  }

  @media (max-width: 500px) {
    width: 3rem;
    height: 1.875rem;
  }
`;

export const GoToText = styled.div`
  margin-left: 10px;
  margin-right: 5px;

  color: var(--White-Theme-Gray---10, #16161e);
  text-align: center;
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2rem; /* 200% */

  @media (max-width: 500px) {
    color: var(--White-Theme-Gray---10, #16161e);
    font-family: "Noto Sans";
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 2rem; /* 228.571% */
  }
`;

export const GoToContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 10px;
  @media (max-width: 650px) {
    margin-top: 20px;
  }
  @media (max-width: 400px) {
    margin-top: 11px;
  }
`;

export const PreNextImg = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 650px) {
  }
`;

export const SidePannelBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  z-index: 1001;
  opacity: 0;
  animation: ${(props) =>
    props.isOpen
      ? css`
          ${fadeIn} 0.3s ease-out forwards
        `
      : css`
          ${fadeOut} 0.5s ease-out forwards
        `};
`;

export const ForumPurpleDiv = styled.div`
  width: 100%;
  // height: auto;
  padding: 0.7rem 0rem 1rem 0rem;
  // min-height: 20.375rem;
  min-height: 3rem;
  border-radius: 1.25rem;
  background: rgba(153, 108, 254, 0.15);
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const CommentSubBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 0.63rem;
  width: 6.25rem;
  height: 2rem;
  flex-shrink: 0;
  border-radius: 1.25rem;
  background: var(--Brand-Purple, #996cfe);
  color: #fff;
  text-align: center;
  font-family: "Noto Sans";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.25rem; /* 142.857% */

  transition: box-shadow 0.3s ease, transform 0.3s ease;
  &:hover {
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : "0 4px 8px rgba(0, 0, 0, 0.2)"};
    transform: ${({ disabled }) => (disabled ? "none" : "translateY(-2px)")};
  }

  cursor: ${({ disabled }) => (disabled ? "initial" : "pointer")};
  background: ${({ disabled }) =>
    disabled ? "#b3a1fe" : "var(--Brand-Purple, #996cfe)"};
  color: ${({ disabled }) => (disabled ? "#ddd" : "#fff")} @media
    (max-width: 1400px) {
    font-size: 0.875rem;
    line-height: 1rem;
  }
`;

export const CancelSubscriptionBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 0.63rem;
  width: 94%;
  height: 2.5rem;
  flex-shrink: 0;
  border-radius: 0.3125rem;
  background: var(--Brand-Purple, #996cfe);
  color: #fff;
  text-align: center;
  font-family: "Noto Sans";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.25rem; /* 142.857% */

  transition: box-shadow 0.3s ease, transform 0.3s ease;
  &:hover {
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : "0 4px 8px rgba(0, 0, 0, 0.2)"};
    transform: ${({ disabled }) => (disabled ? "none" : "translateY(-2px)")};
  }

  cursor: ${({ disabled }) => (disabled ? "initial" : "pointer")};
  background: ${({ disabled }) =>
    disabled ? "#b3a1fe" : "var(--Brand-Purple, #996cfe)"};
  color: ${({ disabled }) => (disabled ? "#ddd" : "#fff")} @media
    (max-width: 1400px) {
    font-size: 0.875rem;
    line-height: 1rem;
  }
`;

export const CategoryButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 0.63rem;
  width: 6.25rem;
  height: 2rem;
  flex-shrink: 0;
  border-radius: 1.25rem;
  background: ${({ selected, color }) =>
    selected ? color.active : "transparent"};
  color: ${({ selected, color }) => (selected ? "#fff" : color.default)};
  border: ${({ selected, color }) =>
    selected ? "none" : `1px solid ${color.default}`};
  text-align: center;
  font-family: "Noto Sans";
  font-size: 0.875rem;
  transition: background-color 0.5s ease, transform 0.5s ease, opacity 0.5s ease;
  opacity: ${({ selected }) => (selected ? 1 : 0.6)};
  transform: ${({ selected }) => (selected ? "scale(1.05)" : "scale(1)")};

  &:hover {
    background-color: ${({ color }) => color.active};
    color: #fff;
    opacity: 1;
    transform: scale(1.05);
  }
`;

export const ShowCommentDiv = styled.div`
  width: 96%;
  min-height: 3.5rem;
  border-radius: 0.5rem;
  background: #fff;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 1.25rem;
  padding: 0.5rem 0rem;
`;

export const ReplyContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: column;
  margin-top: 0.5rem;
  position: relative;
`;

export const PopupHeader = styled.div`
  width: 100%;
  height: 2.375rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem 0.5rem 0rem 0rem;
  border: 1px solid var(--Brand-Purple, #996cfe);
  background: var(--Brand-Purple, #996cfe);
  @media (max-width: 650px) {
    width: 90%;
  }
`;

export const SubscriptionPopupHeader = styled.div`
  width: 100%;
  height: 3.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem 0.5rem 0rem 0rem;
  border: 1px solid var(--Brand-Purple, #996cfe);
  background: var(--Brand-Purple, #996cfe);
  @media (max-width: 650px) {
    width: 90%;
  }
`;

export const PopupHeaderText = styled.div`
  color: var(--White-Theme-Gray---0, #fff);
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1rem; /* 100% */
  margin-top: -1.1rem;
`;

export const PopupWhiteDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 15rem;
  justify-content: center;
  align-items: center;
  background: #fff;
  padding: 0rem 0rem 1rem;
  gap: 0.5rem;
  @media (max-width: 650px) {
    width: 90%;
  }
`;

export const PopupTextArea = styled.textarea`
  display: flex;
  width: 90%;
  height: 10.375rem;
  padding: 0.625rem;
  // margin-top: 1rem;
  align-items: flex-start;
  gap: 0.625rem;
  flex-shrink: 0;
  border-radius: 0.25rem;
  border: 1px solid #e8e8e8;
  resize: none;
  box-shadow: 0px 0px 0px 0px #0009321f;
  transition: border 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    outline: none;
    // border: 1px solid rgba(153, 108, 254, 0.5);
    // box-shadow: 0 0 8px rgba(153, 108, 254, 0.5);
  }

  ::placeholder {
    color: #333;
    font-family: "Noto Sans";
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.25rem; /* 142.857% */
  }
`;

export const CommentPopupCard = styled.div`
  width: 46.875rem;
  min-height: 21.625rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 650px) {
    width: 90%;
  }
`;

export const ReasonText = styled.div`
  color: #333;
  font-family: "Noto Sans";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.152rem; /* 131.657% */
  display: flex;
  align-self: flex-start;
  margin: 1rem 0rem -0.35rem 0.85rem;
  @media (max-width: 450px) {
    font-size: 0.775rem;
    margin: 1rem 0rem -0.35rem 0.5rem;
  }
`;

export const CancelInfoText = styled.div`
  color: #333;
  font-family: "Noto Sans";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.152rem; /* 131.657% */
  display: flex;
  align-self: flex-start;
  margin: 0.2rem 0rem 0rem 0rem;
  @media (max-width: 650px) {
    font-size: 0.775rem;
  }
`;

export const CancelSubscriptionPopupCard = styled.div`
  width: 31.25rem;
  min-height: 22.8125rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 650px) {
    width: 90%;
  }
`;

export const CategoryDiv = styled.div`
  padding: 0rem 1.5rem;
  display: flex;
  align-self: flex-start;
  justify-content: center;
  align-items: center;
  gap: 0.62rem;
`;

export const CategoryText = styled.div`
  color: #333;
  font-family: "Noto Sans";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.25rem; /* 142.857% */
`;

export const AttachFileDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  display: flex;
  width: 76%;
  height: 2rem;
  padding: 0rem 0.625rem;
  align-items: center;
  gap: 0.375rem;
  flex-shrink: 0;
  border-radius: 0.25rem;
  border: 1px solid #e8e8e8;
  background: #fff;
  margin-top: 0.5rem;
  cursor: pointer;
`;

export const CommentPreviewImg = styled.img`
  display: flex;
  align-self: flex-start;
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  border-radius: 12px;
  border: 1px solid green;
  background: transparent;
  padding: 0.3rem;
`;

export const CommentPreviewDiv = styled.div`
  margin: 0.5rem 0rem 0rem 1.5rem;
  display: flex;
  align-self: flex-start;
  flex-shrink: 0;
  background: transparent;
  position: relative;
`;

export const RemoveFileImg = styled.img`
  position: absolute;
  top: 0.1rem;
  right: 0.1rem;
  cursor: pointer;
  width: 1.25rem;
`;

export const CommentImg = styled.img`
  display: flex;
  align-self: flex-start;
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 12px;
  border: 1px solid grey;
  background: transparent;
  padding: 0.3rem;
  margin-top: 0.3rem;
  cursor: pointer;

  transition: transform 0.5s ease, width 0.6s ease, height 0.6s ease,
    opacity 0.6s ease;

  &:hover {
    opacity: 0.6;
    z-index: 1;
  }

  &.enlarged {
    width: 200px;
    height: 200px;
    z-index: 1;
    border: none;
  }
`;

export const CommentText = styled.div`
  color: rgba(0, 0, 0, 0.65);
  font-family: "Noto Sans";
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.125rem; /* 150% */
`;

export const CommentUserName = styled.div`
  width: max-content;
  color: #333;
  font-family: "Noto Sans";
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.40625rem; /* 150% */
  @media (max-width: 800px) {
    font-size: 0.8125rem;
  }
`;

export const CommentTime = styled.div`
  color: rgba(0, 0, 0, 0.65);
  font-family: "Noto Sans";
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.125rem; /* 150% */
  @media (max-width: 800px) {
    font-size: 0.8125rem;
  }
`;

export const CommentUserImg = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  @media (max-width: 800px) {
    width: 1.75rem;
    height: 1.75rem;
  }
`;

export const CommentActionBtn = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.2);
    // filter: brightness(0) saturate(100%) invert(29%) sepia(67%) saturate(4997%)
    //   hue-rotate(223deg) brightness(110%) contrast(90%);
  }
  transform: ${({ clicked }) => (clicked ? "scale(1.2)" : "none")};
  @media (max-width: 800px) {
    width: 1rem;
    height: 1rem;
  }
`;

export const LikeActionBtn = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  transition: transform 0.3s ease;
  filter: ${({ liked }) =>
    liked
      ? "invert(27%) sepia(95%) saturate(6382%) hue-rotate(203deg) brightness(90%) contrast(89%)"
      : "grayscale(1)"};
  &:hover {
    transform: scale(1.2);
    // filter: brightness(0) saturate(100%) invert(29%) sepia(67%) saturate(4997%)
    //   hue-rotate(223deg) brightness(110%) contrast(90%);
  }
  transform: ${({ clicked }) => (clicked ? "scale(1.2)" : "none")};
  @media (max-width: 800px) {
    width: 1rem;
    height: 1rem;
  }
`;

export const ShowCategory = styled.div`
  border-radius: 1.25rem;
  background: ${({ bg }) => bg || "#fd3c65"};
  display: inline-flex;
  padding: 0.25rem 0.75rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  color: #fff;
  text-align: center;
  font-family: "Noto Sans";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.25rem; /* 142.857% */
  @media (max-width: 800px) {
    padding: 0.25rem 0.75rem;
  }
`;

export const ViewAllBtn = styled.div`
  margin-left: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  cursor: pointer;
  margin-top: 0.63rem;
  width: 4.25rem;
  height: 1.5rem;
  flex-shrink: 0;
  border-radius: 1.25rem;
  background: #e8e8e8;
  color: black;
  text-align: center;
  font-family: "Noto Sans";
  font-size: 0.775rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.25rem; /* 142.857% */
  transition: transform 0.5s ease;
  &:hover {
    // transform: scale(1.1);
    background: #c6cbd9;
  }
`;

export const AnimatedOrderByImg = styled.img`
  width: 24px;
  height: 24px;
  transition: opacity 0.3s ease-in-out;
  cursor: pointer;
`;

/* export const AnimatedOrderByImg = styled.img`
  width: 24px;
  height: 24px;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  cursor: pointer;
  transform: ${({ active }) => active ? 'rotate(180deg)' : 'rotate(0deg)'};
`; */

export const AnimatedFrequentImg = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: filter 0.3s ease-in-out;
  filter: ${({ active }) =>
    active
      ? `brightness(0) saturate(100%) invert(63%) sepia(82%) saturate(6000%) hue-rotate(250deg) brightness(102%) contrast(101%)`
      : "none"};
`;

export const TokenDiv = styled.div`
  color: rgb(255, 102, 102);
  border: 1px solid rgb(255, 102, 102);
  background-color: rgb(250, 250, 250);
  height: 32px;
  padding: 0 8px;
  gap: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;
`;
