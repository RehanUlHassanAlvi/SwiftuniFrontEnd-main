import styled from "@emotion/styled";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@mui/material";

export const FillingWordsOuterDiv = styled.div`
  width: 100%;
`;

export const FillingWordsMainDiv = styled.div`
  height: auto; /* Default height */
  border: 1px solid rgba(198, 203, 217, 0.65);
  border-radius: 8px 8px 0px 0px;
  background: var(--White-Theme-Gray---0, #fff);
  padding: 16px;
  @media (max-width: 1220px) {
    height: auto;
  }
  @media (max-width: 1050px) {
    height: auto;
  }
  @media (max-width: 930px) {
    height: auto;
  }
  @media (max-width: 770px) {
    height: auto;
  }
  @media (max-width: 450px) {
    height: auto;
  }
`;

export const FillingWordsParagraphText = styled.div`
  font-family: Noto Sans;
  font-size: 16px;
  font-weight: 500;
  line-height: 40px;
  font-style: normal;
  letter-spacing: 0.5px;
  word-spacing: 7.5px;
  color: var(--White-Theme-Gray---7, #535362);
  text-align: left;

  @media (max-width: 1220px) {
    font-size: 16px;
  }

  @media (max-width: 1050px) {
    font-size: 16px;
  }

  @media (max-width: 930px) {
    font-size: 16px;
  }

  @media (max-width: 770px) {
    font-size: 16px;
  }

  @media (max-width: 450px) {
    font-size: 20px;
    font-weight: 400;
  }
`;

export const FillingWordsMainDiv2 = styled.div`
  height: auto;
  border: 1px solid rgba(198, 203, 217, 0.65);
  border-radius: 0px 0px 8px 8px;
  background: var(--White-Theme-Gray---0, #fff);
  display: flex;
  align-items: center;
  padding: 10px;
  @media (max-width: 1220px) {
    height: auto;
  }

  @media (max-width: 1050px) {
    height: auto;
  }

  @media (max-width: 930px) {
    height: auto;
  }

  @media (max-width: 770px) {
    height: auto;
  }

  @media (max-width: 450px) {
    height: auto;
  }
`;

export const FillingWordsText = styled.div`
  color: #fff;
  font-family: Noto Sans;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 22.5px;
  display: inline-block;
  align-items: center;
  justify-content: center;

  @media (max-width: 1220px) {
  }

  @media (max-width: 1050px) {
  }

  @media (max-width: 930px) {
  }

  @media (max-width: 770px) {
  }

  @media (max-width: 450px) {
  }
`;

export const FillingWordsBlankBox = styled.div`
  min-width: 134px;
  height: 39px;
  border-radius: 5px;
  background: rgba(217, 217, 217, 0.2);
  margin-right: 5px;
  margin-bottom: 5px;
  vertical-align: middle;
  border: 1px solid rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: ${({ isDragging }) => (isDragging ? "grabbing" : "grab")};
`;

export const FillingWordsInputBox = styled.div`
  // display: flex;
  // justify-content: center:
  // align-items: center;
`;

export const FillingWordsWordBox = styled.div`
  width: auto;
  height: 35px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  background: #ad826e;
  margin: 0 5px;
  padding: 0 10px;
  cursor: ${({ isDragging }) => (isDragging ? "grabbing" : "grab")};
  display: inline-flex;
  align-items: center;
  margin-bottom: 0px;
  @media (max-width: 1220px) {
  }

  @media (max-width: 1050px) {
  }

  @media (max-width: 930px) {
    margin-bottom: 15px;
  }

  @media (max-width: 770px) {
    margin-bottom: 15px;
  }

  @media (max-width: 450px) {
    margin-bottom: 15px;
  }
`;

export const RRBOuterDiv = styled.div`
  width: 100%;
`;

export const RRBMainDiv = styled.div`
  border: 1px solid rgba(198, 203, 217, 0.65);
  border-radius: 8px;
  background: var(--White-Theme-Gray---0, #fff);
  padding: 0px 16px;
  // gap: 20px 8px;
  display: flex;
  align-items: flex-start;
  align-content: flex-start;

  @media (max-width: 450px) {
    padding: 0px 10px 0px 10px;
  }
`;

export const RRBParagraph = styled.p`
  /* marginBottom: 20px; */
  font-family: Noto Sans;
  font-size: 17px;
  font-weight: 400;
  line-height: 250%;
  font-style: normal;
  word-spacing: 8px;
  color: #333;
  text-align: left;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const RRBFormControl = styled(FormControl)`
  margin-left: 1px;
  margin-right: 1px;
  min-width: 120px;
  vertical-align: middle;
`;

export const RRBSelect = styled(Select)`
  width: 165px;
  font-size: 20px;
  line-height: 140%;
  text-align: center;
  font-family: "Noto Sans";
  color: #996cfe;
  border-bottom: 2px solid #996cfe;
  border-top: none;
  border-left: none;
  border-right: none;
  border-radius: 0;

  & .MuiSelect-select {
    padding: 0;
    &:focus {
      background-color: transparent;
    }
  }

  & .MuiSvgIcon-root {
    font-size: 25px;
  }

  & .MuiOutlinedInput-notchedOutline {
    border: none;
  }

  &:hover {
    border-bottom: 2px solid #996cfe;
  }
`;

export const RRBMenuItem = styled(MenuItem)`
  font-family: "Noto Sans";
`;


export const DraggableStyledCard = styled.div`
  min-height: 74px;
  flex-shrink: 0;
  border: ${({ isDragging }) => isDragging ? "2px solid #996cfe" : "1px dashed #c6cbd9"}; // Highlight selected card
   background: ${({ isDragging }) => (isDragging ? "#f0f8ff" : "#fff")}; 
  transition: opacity 0.2s ease-out, border-color 0.2s ease-out;
  cursor: ${({ isDragging }) => (isDragging ? "grabbing" : "grab")};
  display: flex;
  align-items: center;
  padding: 0px 16px;
  box-shadow: ${({ isDragging }) => isDragging ? "0px 4px 8px rgba(0, 0, 0, 0.1)" : "none"}; // Add subtle shadow when selected
`;

export const StyledCardContent = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-direction: row;
  padding: 10px 0px;
`;

export const DraggableCardText = styled.div`
  color: #333; 
  font-family: "Noto Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; //24px
  text-align: left;
`;

export const ROPmainDiv = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
`;

export const OuterDiv = styled.div`
  width: 100%;
`;

export const CorrectAnswerDiv = styled.div`
  display: flex;
  padding: 4px 10px;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 4px;
  background: #996cfe;
  color: #fff;
`;

export const CorrectAnswerDivUserRes = styled.div`
  display: flex;
  padding: 4px 10px;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 4px;
  background: ${({ isCorrect }) => (isCorrect ? "#996cfe" : "#E8352B")};
  color: #fff;
`;
