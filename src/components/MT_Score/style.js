import styled from "@emotion/styled";
import LinearProgress from "@mui/material/LinearProgress";
import { linearProgressClasses } from "@mui/material/LinearProgress";

export const OptionText = styled.div`
  color: var(--Brand-Purple, #996cfe);
  text-align: center;
  font-family: "Noto Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 1.125rem;
  display: flex;
  width: 5.625rem;
  align-items: center;
  justify-content: center;
  padding-bottom: 0.5rem;
  &:hover {
    border-bottom: 2px solid var(--Brand-Purple, #996cfe);
  }
`;

export const SeperatorLine = styled.div`
  height: 0.0625rem;
  width: 100%;
  background: #e8e8e8;
  margin-bottom: 1rem;
`;

export const MockTestEmpty = styled.div`
  color: #000;
  text-align: center;
  font-family: "Noto Sans";
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 1.125rem;
`;

export const MockTextBtn = styled.div`
  display: flex;
  width: 11rem;
  padding: 0.75rem 0rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.25rem;
  background: ${({ isSelected }) =>
    isSelected
      ? "var(--Brand-Purple, #996cfe)"
      : "var(--White-Theme-Gray---5, #7E7E8F)"};
  color: #fff;
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem;
  border-radius: 47px;
  transition: box-shadow 0.3s ease, transform 0.3s ease, color 0.3s ease;
  &:hover {
    /* color: #996cfe; */
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : "0 8px 16px -4px rgba(0, 0, 0, 0.2)"};
    transform: ${({ disabled }) => (disabled ? "none" : "translateY(-2px)")};
  }
  @media (max-width: 700px) {
    width: 10rem;
    font-size: 0.9375rem;
    font-style: normal;
    line-height: 1.375rem;
  }
`;

export const CardHeaderDiv = styled.div`
  display: flex;
  width: 100%;
  padding: 0.75rem 0rem;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.75rem 0.75rem 0rem 0rem;
  background: #996cfe;
`;

export const CardHeaderText = styled.div`
  color: #fff;
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.5rem; /* 120% */
  margin-left: 1.5rem;
`;

export const CardDateText = styled.div`
  color: #333;
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem; /* 133.333% */
  margin-left: 1.5rem;
`;

export const CardBtn = styled.div`
  display: flex;
  width: 8rem;
  padding: 0.75rem 0rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  color: #fff;
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem; /* 133.333% */
  border-radius: 0.25rem;
  background: var(--Brand-Purple, #996cfe);
  cursor: pointer;
  transition: box-shadow 0.3s ease, transform 0.3s ease, color 0.3s ease;
  &:hover {
    /* color: #996cfe; */
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : "0 8px 16px -4px rgba(0, 0, 0, 0.2)"};
    transform: ${({ disabled }) => (disabled ? "none" : "translateY(-2px)")};
  }
`;

export const CardMainDiv = styled.div`
  height: 5rem;
  width: 100%;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  @media (max-width: 1000px) {
    flex-direction: column;
    justify-content: center;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
    height: max-content;
    padding: 1rem 0rem;
  }
`;

export const FeedbackHeader = styled.div`
  display: flex;
  width: 100%;
  padding: 1.5rem 0rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.025rem;
  border-radius: 0.75rem 0.75rem 0rem 0rem;
  background: #996cfe;
`;

export const FeedbackHeaderTitle = styled.div`
  color: #fff;
  font-family: "Noto Sans";
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: 2rem; /* 133.333% */
  margin-left: 1.5rem;

  span {
    color: #fff; /* White color */
    font-family: "Noto Sans";
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 400; /* Normal weight */
    line-height: 2rem;
  }

  @media (max-width: 450px) {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }
`;

export const FeedbackHeaderText = styled.div`
  color: #fff;
  font-family: "Noto Sans";
  font-size: 1.0625rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem; /* 141.176% */
  margin-left: 1.5rem;
`;

export const FeedbackCardDiv = styled.div`
  width: 100%;
  height: max-content;
  padding: 1.25rem 0rem;
  background: #fff;
  display: flex;
  gap: 1.25rem;
  align-items: center;
  @media (max-width: 1000px) {
    gap: 0.5rem;
    flex-direction: column;
  }
`;

export const FeedbackScoreCard = styled.div`
  display: inline-flex;
  padding: 1.5rem 1rem 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 1.5rem;
  background: #996cfe;
  gap: 0.25rem;
  min-width: 8.5rem;
  margin-left: 1.25rem;
`;

export const FeedbackScoreCardTitle = styled.div`
  color: #fff;
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.5rem; /* 150% */
`;

export const FeedbackScoreCardScore = styled.div`
  color: #fff;
  font-family: "Noto Sans";
  font-size: 4.375rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const FeedbackCardText = styled.div`
  color: #333;
  font-family: "Noto Sans";
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem; /* 160% */
  letter-spacing: 0.00938rem;
  margin-right: 1.25rem;
  @media (max-width: 1000px) {
    text-align: center;
    margin: 0rem 1rem;
  }
`;

export const ViewScoreHeader = styled.div`
  display: flex;
  width: 100%;
  padding: 1.5rem 0rem;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.025rem;
  border-radius: 0.75rem 0.75rem 0rem 0rem;
  background: #996cfe;
`;

export const Avatar = styled.div`
  width: 6.25rem;
  height: 6.25rem;
  flex-shrink: 0;
  border-radius: 50%;
  background: #d9d9d9;

  @media (max-width: 550px) {
    width: 5rem;
    height: 5rem;
  }
`;

export const ViewScoreHeaderDiv = styled.div`
  margin-left: 1.5rem;
  display: flex;
  justify-content: center;
  //   align-items: center;
  flex-direction: row;
  @media (max-width: 550px) {
    flex-direction: column;
    margin-left: 1rem;
  }
`;

export const OverallScoreDisplay = styled.div`
  display: flex;
  padding: 10px 16px 41px 17px;
  flex-direction: column;
  align-items: center;
  gap: 1.125rem;
  border-radius: 12px 12px 100px 100px;
  background: #fff;
  margin-right: 1.35rem;

  @media (max-width: 550px) {
    padding: 0.625rem 0.53125rem 1.4375rem 0.46875rem;
    gap: 1rem;
    margin-right: 1rem;
  }
`;

export const OverallScoreText = styled.div`
  color: #333;
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.5rem; /* 150% */
  white-space: nowrap;
  @media (max-width: 550px) {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
`;

export const OverallScoreDigit = styled.div`
  color: #996cfe;
  leading-trim: both;
  text-edge: cap;
  font-family: "Noto Sans";
  font-size: 5rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  height: 57px;
  display: flex;
  align-items: center;
  @media (max-width: 550px) {
    font-size: 3.5rem;
  }
`;

export const ViewScoreTitle = styled.div`
  color: #fff;
  font-family: "Noto Sans";
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: 2rem; /* 133.333% */
  margin-left: 1rem;
  @media (max-width: 550px) {
    margin-left: 0rem;
    margin-top: 1rem;
    width: 12.5rem;
  }
`;

export const ViewScoreHeaderTest = styled.div`
  color: #fff;
  font-family: "Noto Sans";
  font-size: 1.0625rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem; /* 141.176% */
  margin-left: 1rem;
  @media (max-width: 550px) {
    margin-left: 0rem;
    margin-top: 0.75rem;
  }
`;

export const ViewScoreHeaderText = styled.div`
  color: #fff;
  font-family: "Noto Sans";
  font-size: 1.0625rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem; /* 141.176% */
  margin-left: 1rem;
  @media (max-width: 550px) {
    margin-left: 0rem;
  }
`;

export const ShareBtn = styled.div`
  display: flex;
  padding: 0.5rem 1.5rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.25rem;
  border: 1px solid #fff;
  width: max-content;
  margin-left: 1rem;
  margin-top: 1rem;
  cursor: pointer;

  color: #fff;
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem; /* 150% */
  transition: box-shadow 0.3s ease, transform 0.3s ease, color 0.3s ease;
  &:hover {
    /* color: black; */
    /* border: 1px solid black; */
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : "0 8px 16px -4px rgba(0, 0, 0, 0.2)"};
    transform: ${({ disabled }) => (disabled ? "none" : "translateY(-2px)")};
  }

  @media (max-width: 550px) {
    margin-left: 0rem;
    margin-right: 0.62rem;
  }
`;

export const ShareBtnDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const VSWhiteDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: #fff;
  max-width: 1680px;
  gap: 1.25rem;
`;

export const WhiteDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: #fff;
  max-width: 1680px;
  gap: 1.25rem;
`;

export const ViewScoreSubTitle = styled.div`
  color: #333;
  font-family: "Noto Sans";
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.75rem; /* 140% */
  display: flex;
  justify-content: flex-start;
  align-self: flex-start;
  width: 100%;
  // margin-left: 1.5rem;
`;

export const CircularProgDiv = styled.div`
  width: 100%;
  height: 11.875rem;
  flex-shrink: 0;
  border-radius: 0.75rem;
  border: 1px solid rgba(51, 51, 51, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 5rem;
  @media (max-width: 1000px) {
    gap: 3rem;
  }
  @media (max-width: 650px) {
    gap: 2rem;
  }
  @media (max-width: 550px) {
    flex-direction: column;
    height: auto;
    gap: 1rem;
    padding: 1.25rem 0rem;
  }
`;

export const CircularDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5rem;
  @media (max-width: 1000px) {
    gap: 3rem;
  }
  @media (max-width: 650px) {
    gap: 2rem;
  }
  @media (max-width: 550px) {
    gap: 2.5rem;
  }
`;

export const SkillsBreakdownDiv = styled.div`
  position: relative;
  width: 100%;
  // height: 39.375rem;
  flex-shrink: 0;
  border-radius: 0.75rem;
  border: 1px solid rgba(51, 51, 51, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1.25rem;
  padding: 3.12rem 0rem 2rem;
  @media (max-width: 550px) {
    gap: 1rem;
  }
`;

export const TestTypeText = styled.div`
  // width: 100%;
  color: #333;
  font-family: "Noto Sans";
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.375rem; /* 122.222% */
  letter-spacing: 0.00938rem;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  @media (max-width: 550px) {
    font-size: 1rem;
  }
`;

export const SkillsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const TestTypeDiv = styled.div`
  width: 20rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 1.88rem;
  margin-right: 0.81rem;
  @media (max-width: 1000px) {
    gap: 2.5rem;
    width: 25rem;
  }

  @media (max-width: 550px) {
    gap: 2.5rem;
    width: 25rem;
  }
  @media (max-width: 400px) {
    gap: 2.5rem;
    width: 30rem;
  }
`;

export const VerticalOverallDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: 60%;
  top: 2%;
  @media (max-width: 550px) {
    left: 70%;
  }
`;

export const VerticalOverallText = styled.div`
  color: #996cfe;
  text-align: right;
  font-family: "Noto Sans";
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.375rem; /* 122.222% */
  letter-spacing: 0.00938rem;
  margin-bottom: 0.5rem;
`;
export const VerticalOverall = styled.div`
  width: 0.3125rem;
  height: 29.125rem;
  // transform: rotate(-90deg);
  flex-shrink: 0;
  border-radius: 6.25rem;
  background: #996cfe;
  @media (max-width: 1000px) {
    height: 31.125rem;
  }

  @media (max-width: 550px) {
    gap: 2.5rem;
    height: 27.5rem;
  }
`;

export const EndText = styled.div`
  color: #333;
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem; /* 150% */
  letter-spacing: 0.00938rem;
  margin-left: 1.88rem;
  margin-right: 1.88rem;
  @media (max-width: 550px) {
    font-size: 0.875rem;
    line-height: 1.375rem;
  }
`;

export const CustomLinearProgress = styled(LinearProgress, {
  shouldForwardProp: (prop) =>
    prop !== "progressColor" && prop !== "backgroundColor",
})(({ progressColor, backgroundColor }) => ({
  height: "10px",
  "border-radius": "5px",
  width: "100%",
  [`&.${linearProgressClasses.colorPrimary}`]: {
    "background-color": backgroundColor,
  },
  [`& .${linearProgressClasses.bar}`]: {
    "border-radius": "5px",
    "background-color": progressColor,
  },
  "@media (max-width: 550px)": {
    height: "6px",
  },
}));

export const TestTypesDiv = styled.div`
  width: 100%;
  height: 4.25rem;
  flex-shrink: 0;
  border: 1px solid var(--White-Theme-Gray---2, #e2e2ea);
  border-bottom: 2px solid var(--White-Theme-Gray---2, #e2e2ea);
  border-radius: 0.75rem 0.75rem 0rem 0rem;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;

  positin: relative;

  @media (max-width: 700px) {
  }
`;

export const TestImgAndTextDiv = styled.div`
  margin-top: 0.25rem;
  width: 25%;
  height: 4.09rem;
  flex-shrink: 0;
  border: none;
  background: #fff;
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: transparent;
  border-bottom: ${(props) =>
    props.isSelected ? `3px solid ${props.borderColor}` : "none"};
  /* &:hover {
    border-bottom: 2px solid ${(props) => props.borderColor};
  } */
  transition: box-shadow 0.3s ease, transform 0.3s ease, color 0.3s ease;
  &:hover {
    transform: ${(props) => (props.isSelected ? "none" : "scale(1.05)")};
  }
  @media (max-width: 700px) {
    width: ${(props) => (props.isSelected ? `40%` : "20%")};
    margin-top: ${(props) => (props.isSelected ? `.5rem` : "")};
  }
  @media (max-width: 450px) {
    gap: 0.5rem;
  }
`;

export const TestTypeImgs = styled.img`
  width: 3.25rem;
  height: 3.1875rem;
  flex-shrink: 0;
  @media (max-width: 550px) {
    width: 2.45194rem;
    height: 2.5rem;
    flex-shrink: 0;
  }
`;

export const Testext = styled.div`
  color: ${(props) => props.textColor || "#49D7F2"};
  text-align: center;
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem; /* 150% */
  text-transform: uppercase;
  @media (max-width: 550px) {
    font-size: 0.9375rem;
  }
`;

export const TestScoresDiv = styled.div`
  width: 100%;
  border-radius: 0rem 0rem 0.75rem 0.75rem;
  border: 1px solid var(--White-Theme-Gray---2, #e2e2ea);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-bottom: 1rem;
`;

export const EndScoreCardText = styled.div`
  color: #fff;
  leading-trim: both;
  text-edge: cap;
  font-family: "Noto Sans";
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  position: absolute;
  z-index: 5;
`;

export const SearchedQuestionsCard = styled.div`
  width: 96%;
  height: auto;
  min-height: 4rem;
  flex-shrink: 0;
  // border-radius: 0.625rem;
  // border-bottom: 1px solid var(--White-Theme-Gray---2, #e2e2ea);
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin-top: 1rem;
  @media (max-width: 1000px) {
    flex-direction: column;
    gap: 0;
  }
  @media (max-width: 500px) {
    flex-direction: column;
    justify-content: center;
    // height: 7.3rem;
  }
`;

export const EndScoreCard = styled.div`
  width: 98%;
  height: auto;
  min-height: 5.3rem;
  flex-shrink: 0;
  border-radius: 0.625rem;
  border: 1px solid var(--White-Theme-Gray---2, #e2e2ea);
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin-top: 1rem;
  @media (max-width: 1000px) {
    flex-direction: column;
    gap: 0;
  }
  @media (max-width: 500px) {
    flex-direction: column;
    justify-content: center;
    height: 7.3rem;
  }
`;

export const EndScoreImgDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  margin-left: 1rem;
  position: relative;
  gap: 1.19rem;
  @media (max-width: 1000px) {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`;

export const EndScoreImgDiv2 = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  margin-left: 1rem;
  position: relative;
  // gap: 1.19rem;
  @media (max-width: 1000px) {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`;

export const EndScoreIdText = styled.div`
  width: 6.125rem;
  height: 1.4375rem;
  flex-shrink: 0;
  color: #49d7f2;
  font-family: "Noto Sans";
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.35rem; /* 120% */
  @media (max-width: 550px) {
    font-size: 13px;
  }
`;

export const BlueDivsQText = styled.div`
  // width: 6.125rem;
  // height: 1.4375rem;
  flex-shrink: 0;
  color: #49d7f2;
  font-family: "Noto Sans";
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.35rem;
  white-space: nowrap;
  @media (max-width: 550px) {
    font-size: 13px;
    // width: 4.125rem;
    // height: 1.4375rem;
  }
`;

export const BlueDivsQTextSubCat = styled.div`
  // width: 6.125rem;
  // height: 1.4375rem;
  // margin: 0.09rem 0rem 0rem 0.5rem;
  flex-shrink: 0;
  color: #49d7f2;
  font-family: "Noto Sans";
  font-size: 0.8rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.35rem;
  white-space: nowrap;
  @media (max-width: 550px) {
    white-space: wrap;
    font-size: 13px;
    // width: 4.125rem;
    // height: 1.4375rem;
  }
`;

export const EndScoreQuestionText = styled.div`
  color: #333;
  font-family: "Noto Sans";
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  white-space: nowrap;
  line-height: 1.35rem; /* 120% */
  @media (max-width: 550px) {
    font-size: 13px;
  }
`;

export const EndScoreQuestionSubCat = styled.div`
  color: #333;
  font-family: "Noto Sans";
  font-size: 0.8rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.35rem; /* 120% */
  margin: 0.09rem 0rem 0rem 0.3rem;
  @media (max-width: 550px) {
    font-size: 13px;
  }
`;

export const EndScoreScoresDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
  gap: 8px;
  margin-right: 1rem;
  @media (max-width: 1000px) {
    margin-bottom: 1rem;
  }
  @media (max-width: 600px) {
    // margin-top: 1rem;
    flex-direction: column;
    gap: 0.75rem;
    justify-content: flex-end;
    align-items: flex-end;
  }
`;

export const FlexDivForBlueDivsOnly = styled.div`
  gap: 1.5rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  @media (max-width: 600px) {
    gap: 0.75rem;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 400px) {
    // gap: 0.rem;
    justify-content: space-between;
    align-items: center;
  }
`;

export const MyWorkBlueDiv = styled.div`
  color: ${(props) => props.color};
  background: ${(props) => props.background};
  display: flex;
  width: 5.3rem;
  height: 2.0625rem;
  border: 1px solid ${(props) => props.borderColor};
  border-radius: 2.5rem;
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
  transform: ${({ clicked }) => (clicked ? "scale(1.1)" : "none")};

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0rem 0.5rem 0rem 0.25rem;

  @media (max-width: 550px) {
    width: 5.125rem;
    height: 1.8125rem;
    border-radius: 1.90788rem;
    border: 0.763px solid #49d7f2;
  }
`;

export const MyWorkSmallBlueDiv = styled.div`
  width: 1.75rem;
  height: 1.75rem;
  color: #ffffff;
  background: ${(props) => props.background};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Montserrat;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem;
  text-transform: capitalize;
  @media (max-width: 550px) {
    width: 1.52631rem;
    height: 1.52631rem;
    flex-shrink: 0;
    font-size: 0.8125rem;
  }
`;

export const MyWorkBlueDivText = styled.div`
  display: flex;
  align-self: center;
  color: ${(props) => props.color};
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.125rem;
  @media (max-width: 550px) {
    font-size: 0.8125rem;
  }
`;

export const MyWorkBlueDivImg = styled.img`
  width: 1.75rem;
  height: 1.75rem;
  @media (max-width: 550px) {
    width: 0.75rem;
    height: 0.75rem;
    flex-shrink: 0;
  }
`;

export const MyWorkBlueDivAi = styled.div`
  color: white;
  background: #2d2966;
  display: flex;
  width: 7rem;
  height: 2.0625rem;
  border: 1px solid #2d2966;
  border-radius: 2.5rem;
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
  transform: ${({ clicked }) => (clicked ? "scale(1.1)" : "none")};

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0rem 0.5rem 0rem 0.25rem;

  @media (max-width: 550px) {
    width: 5.75rem;
    height: 1.8125rem;
    flex-shrink: 0;
    border-radius: 1.90788rem;
  }
`;

export const MyWorkSmallBlueDivAi = styled.div`
  width: 1.75rem;
  height: 1.75rem;
  color: #ffffff;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 550px) {
    width: 1.3125rem;
    height: 1.3125rem;
    flex-shrink: 0;
  }
`;

export const AnalyticsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1.5rem 0rem;
  border-radius: 0.75rem 0.75rem 0rem 0rem;
  background: #996cfe;
  @media (max-width: 450px) {
    padding: 1rem 0rem;
  }
`;

export const TestCard = styled.div`
  width: 100%;
  max-width: 22.1875rem;
  min-width: 18rem;
  @media (max-width: 600px) {
    max-width: 98%;
  }
`;

export const TestCardHeader = styled.div`
  display: flex;
  padding: 0.9375rem 0rem;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 0.38rem;
  border-radius: 0.75rem 0.75rem 0rem 0rem;
  background: #49d7f2;
  color: #fff;
  font-family: "Noto Sans";
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.875rem;
  @media (max-width: 450px) {
    padding: 0.5625rem 0rem;
    gap: 0.625rem;
    font-size: 1rem;
  }
`;

export const TestCardContent = styled.div`
  height: 6.3125rem;
  flex-shrink: 0;
  padding: 0rem 2.5rem;
  border-radius: 0rem 0rem 0.625rem 0.625rem;
  border: 1px solid var(--White-Theme-Gray---2, #e2e2ea);
  background: #fff;
  box-shadow: 0px 0px 6px 0px rgba(211, 211, 211, 0.24);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4.2rem;
  @media (max-width: 450px) {
    gap: 2rem;
  }
`;

export const TestCardContentText = styled.div`
  color: #49d7f2;
  text-align: center;
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem; /* 150% */
  // white-space: nowrap;
  @media (max-width: 450px) {
    font-size: 0.9375rem;
  }
`;

export const TestCardContentDigit = styled.div`
  color: #000;
  text-align: center;
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem; /* 150% */
  @media (max-width: 450px) {
    font-size: 0.9375rem;
  }
`;

export const TestCard2 = styled.div`
  width: 100%;
  max-width: 50%;

  @media (max-width: 600px) {
    max-width: 100%;
  }
`;
export const TestCardHeader2 = styled.div`
  display: flex;
  padding: 0.9375rem 1.5rem;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  gap: 0.38rem;
  border-radius: 0.75rem 0.75rem 0rem 0rem;
  background: #49d7f2;
  color: #fff;
  font-family: "Noto Sans";
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.875rem; /* 150% */
  @media (max-width: 450px) {
    padding: 0.5625rem 1rem;
    gap: 0.625rem;
    font-size: 1rem;
  }
`;

export const TestCardContent2 = styled.div`
  flex-shrink: 0;
  border-radius: 0rem 0rem 0.625rem 0.625rem;
  border: 1px solid var(--White-Theme-Gray---2, #e2e2ea);
  background: #fff;
  box-shadow: 0px 0px 6px 0px rgba(211, 211, 211, 0.24);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  padding: 1.75rem 0rem;

  height: 13.75rem;
  overflow-y: auto;
  overflow-x: hidden;


  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1; 
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;

  @media (max-width: 600px) {
    height: auto;
    overflow-y: visible;
  }
`;

export const TestCardContentText2 = styled.div`
  color: #212529;
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.25rem; /* 125% */
  @media (max-width: 450px) {
    font-size: 0.9375rem;
  }
`;

export const TestCardContentDigit2 = styled.div`
  color: #212529;
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.25rem; /* 125% */
  @media (max-width: 450px) {
    font-size: 0.9375rem;
  }
`;

export const CircleDiv = styled.div`
  width: 100%;
  max-width: 19.6875rem;
  height: 20.5rem;
  flex-shrink: 0;
  border-radius: 0.75rem;
  background: var(--Background-color-light, #fff);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2.5rem;
`;

export const CircleScoresDiv = styled.div`
  display: flex;
  max-width: 17.8125rem;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
`;

export const PointImg = styled.img`
  width: 0.5rem;
  height: 0.5rem;
`;

export const ScoreDigit = styled.div`
  color: ${(props) => props.color};
  font-feature-settings: "clig" off, "liga" off;
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const PointAndScore = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.25rem;
`;

export const ImgAndLine = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1.12rem;
`;

export const AnalyticDivOne = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
`;

export const MainDiv = styled.div`
  width: max-content;
  height: max-content;
  border-radius: 16px;
  background: #fff;
  padding: 0 0 2%;
  width: 96%;
  @media (max-width: 700px) {
    padding: 4%;
    width: 92%;
  }
`;

export const ModalContent = styled.div`
  border: none;
  background: transparent;
  padding: 0;
  margin: 0;
  box-shadow: none;
  outline: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: 90vh;
  max-width: 90vw;
  overflow-y: auto;
  overflow-x: hidden;

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;
