import { TextField, Card,SvgIcon } from "@mui/material";
import { ReactComponent as SettingsIcon } from '../../assets/images/ep_setting.svg';

import styled, { keyframes } from "styled-components";

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

export const TransitionDiv = styled.div`
  width: 100%;
  transition: opacity 200ms ease-in-out;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
`;

export const MainDiv = styled.div`
  width: max-content;
  height: max-content;
  border-radius: 16px;
  background: #fff;
  padding: 2%;
  width: 96%;
  @media (max-width: 700px) {
    padding: 4%;
    width: 92%;
  }
`;

export const RefreshDiv = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #6b41cb1a;
  min-width: 148px;
  min-height: 20px;
  padding: 10px;
  gap: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: box-shadow 0.3s ease, transform 0.3s ease, border 0.3s ease;
  &:hover {
    border: 1px solid #996cfe;
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : "0 8px 16px -4px rgba(0, 0, 0, 0.2)"};
    transform: ${({ disabled }) => (disabled ? "none" : "translateY(-2px)")};
  }
  @media (max-width: 450px) {
    padding: 5px;
    gap: 5px;
    min-width: 122px;
  }
`;

export const RefreshDivText = styled.div`
  font-family: Noto Sans;
  font-size: 14px;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
  color: #996cfe;
  @media (max-width: 450px) {
    font-size: 13px;
    font-weight: 400;
  }
`;

export const RefreshImg = styled.img`
  width: 20px;
  height: 20px;
`;

export const AnalyticDivOne = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
`;

export const AverageScoreText = styled.div`
  color: var(--White-Theme-Gray---10, #16161e);
  font-style: normal;
  font-family: Noto Sans;
  font-size: 18px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: left;
  // padding-top: 120px;
  padding-top: 1rem;
  width: 100%;
  max-width: 1680px;
  @media (max-width: 700px) {
    text-align: center;
  }
`;

export const MainOuterDiv = styled.div`
  width: 100%;
  max-width: 1880px;
`;

export const OuterDiv = styled.div`
  width: 100%;
  max-width: 1880px;
  margin-top: 100px;
  display: inline-flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: row;
  padding: 20px;
  gap: 20px;
  border-radius: 16px;
  background: #fff;

  @media (max-width: 770px) {
    width: 90%;
    padding: 10px;
  }
  @media (max-width: 450px) {
    width: 90%;
    padding: 20px 10px;
    margin-top: 30px;
    flex-direction: column;
  }
`;

export const TodayTaskDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  // @media (max-width: 1500px) {
  //   width: 90%;
  //   justify-content: space-between;
  // }
  // @media (max-width: 600px) {
  //   width: 80%;
  //   justify-content: center;
  // }
  // @media (max-width: 450px) {
  //   width: 95%;
  // }
`;

export const TitleText = styled.div`
  color: var(--White-Theme-Gray---10, #16161e);
  font-family: Noto Sans;
  font-style: normal;
  font-size: 1rem;
  font-weight: 600;
  line-height: 20px;
  @media (max-width: 1000px) {
    font-size: 14px;
  }
`;

export const ToolTipText = styled.div`
  max-width: 200px;
  padding: 10px;
  color: #fff;
  font-family: Noto Sans;
  font-style: normal;
  font-size: 12px;
  font-weight: 400;
  line-height: normal;
`;

export const ToolTipImg = styled.img`
  width: 20px;
  height: 20px;
  @media (max-width: 390px) {
    width: 16px;
    height: 16px;
  }
`;

export const RemarksTitleDiv = styled.div`
  width: 100%;
  // max-width: 288px;
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-bottom: 15px;
  // gap: "30px";
  justify-content: space-between;
  // @media (max-width: 600px) {
  //   width: 80%;
  // }
`;

export const AiSPCard = styled.div`
  width: 100%;
  // max-width: 360px;
  height: auto;
  box-shadow: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  // margin-bottom: 20px;
  // @media (max-width: 600px) {
  //   justify-content: center;
  //   align-items: center;
  // }
  // @media (max-width: 390px) {
  //   width: 100%;
  //   align-items: center;
  //   justify-content: center;
  // }
  // @media (max-width: 450px) {
  //   width: 100%;
  //   align-items: center;
  //   justify-content: center;
  // }
`;

export const AiSPCardTitle = styled.div`
  color: var(--White-Theme-Gray---10, #16161e);
  font-family: "Noto Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  margin-bottom: 10px;
  @media (max-width: 1000px) {
    font-size: 14px;
  }
`;

export const AiSPCardBox = styled.div`
  width: 100%;
  height: 7.25rem;
  border-radius: 16px;
  background: rgba(153, 108, 254, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  position: relative;
  padding: 1% 0px;
  // @media (max-width: 600px){
  //   width:90%;
  // }
`;

export const AiSPCardText1 = styled.div`
  color: var(--Brand-Purple, #996cfe);
  font-family: "Noto Sans";
  font-size: 2rem;
  font-style: normal;
  font-weight: 500;
  line-height: 38.871px; /* 97.177% */
  @media (max-width: 600px) {
    font-size: 24px;
    line-height: 32px; /* 133.333% */
  }
`;

export const AiSPCardText2 = styled.div`
  color: var(--Brand-Purple, #996cfe);
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 80% */
  letter-spacing: -0.18px;
  @media (max-width: 600px) {
    font-size: 16px;
    line-height: 16px; /* 100% */
    letter-spacing: -0.144px;
  }
`;

export const AiSPCardSettingsIconDiv = styled.div`
  display: flex;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  @media (max-width: 450px) {
  }
`;

// export const AiSPCardIcon = styled.img`
//   width: 20px;
//   height: 20px;
//   flex-shrink: 0;
//   cursor: pointer;
//   transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, filter 0.3s ease-in-out;

// &:hover {
//   transform: scale(1.2);
//   filter: invert(45%) sepia(85%) saturate(3657%) hue-rotate(240deg) brightness(99%) contrast(101%);
 
// }
//   @media (max-width: 390px) {
//     width: 16px;
//     height: 16px;
//   }
// `;

export const StyledSettingsIcon = styled(SettingsIcon)`
  width: 20px;
  height: 20px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out, filter 0.3s ease-in-out;

  &:hover {
    transform: scale(1.2);
    filter: invert(45%) sepia(85%) saturate(10657%) hue-rotate(240deg) brightness(99%) contrast(101%);
  }

  @media (max-width: 390px) {
    width: 16px;
    height: 16px;
  }
`;

export const AiSPCardPopupDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  @media (max-width: 450px) {
  }
`;

export const ECCard = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // flex-wrap: wrap;
  box-shadow: none;
`;

export const ECCardTitleDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // gap: 1rem;
  // @media (max-width: 600px) {
  //   justify-content: center;
  // }
  // @media (max-width: 390px) {
  //   width: 326px;
  // }
`;

export const ECCardTitleText = styled.div`
  color: var(--White-Theme-Gray---10, #16161e);
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  @media (max-width: 1000px) {
    font-size: 14px;
  }
`;

export const ECCardIconDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  gap: 10px;
  @media (max-width: 390px) {
    padding: 10px;
    gap: 10px;
  }
`;

export const ECCardCountdownDiv = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  // gap: 53px;
  margin-top: 5px;
  justify-content: space-between;
  // @media (max-width: 600px) {
  //   justify-content: center;
  // }
  // @media (max-width: 390px) {
  //   width: 326px;
  //   align-items: center;
  // }
`;

export const ECCardTimeBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 450px) {
  }
`;

export const ECCardTimeCountText = styled.div`
  color: var(--Brand-Purple, #996cfe);
  text-align: center;
  font-feature-settings: "clig" off, "liga" off;
  font-family: "Noto Sans";
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 30px
  letter-spacing: 0.113px;
  @media (max-width: 1000px) {
    font-size: 20px;
  }
`;

export const ECCardTimeText = styled.div`
  color: var(--White-Theme-Gray---10, #16161e);
  text-align: center;
  font-family: "Noto Sans";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  @media (max-width: 1000px) {
    font-size: 10px;
  }
`;

export const CustomCalendar = styled.div`
  & .MuiDateCalendar-root {
    width: 100%;
    // max-width: 320px;
  }
  @media (max-width: 390px) {
    & .MuiDateCalendar-root {
      width: 100%;
    }
  }
`;

export const TTCard = styled.div`
  width: 100%;
  height: max-content;
  // max-width: 200px;
  padding: 2% 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  border-radius: 5px;
  justifycontent: center;
  border: 1px solid ${(props) => props.borderColor};
  background: ${(props) => props.backgroundColor};
  cursor: pointer;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 8px 16px -4px rgba(0, 0, 0, 0.2);
  }

  // box-shadow: ${(props) =>
    props.isSelected ? "0px 6px 12px rgba(0, 0, 0, 0.15)" : "none"};
`;

export const TTCardText = styled.div`
  color: ${(props) => props.textColor};
  font-family: "Noto Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  margin-bottom: 2%;
  // transition: transform 0.3s;

  ${TTCard}:hover & {
    // transform: scale(1.2);
  }
`;

export const TTCardImg = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  margin-top: 2%;

  // transition: transform 0.3s;

  ${TTCard}:hover & {
    // transform: scale(1.1);
  }
`;

export const StyledTextField = styled(TextField)`
  display: flex;
  width: 288px;
  height: 292px;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid var(--White-Theme-Gray---3, #c6cbd9);

  // width: 100% !important;
  // max-width: 288px !important;
  // & .MuiOutlinedInput-input {
  //   height: 218px !important;
  // }
  // & .MuiInputBase-root {
  //   border-radius: 5px;
  //   background-color: white;
  //   transition: box-shadow 0.2s ease;
  //   width: 100% !important;
  // }
  // @media (max-width: 390px) {
  //   max-width: 100%;
  // }
`;

export const STCOverallBtnsDiv = styled.div`
  gap: 8px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const STCCardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: nowrap;
  gap: 10px;
  @media (max-width: 600px) {
    flex-wrap: wrap;
  }
`;

export const FooterOuter = styled.div`
  display: flex;
  height: 5rem;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  width: 100%;
  max-width: 100rem;
  @media (max-width: 1000px) {
    flex-direction: column;
    justify-content: center;
    gap: 0.75rem;
  }
  @media (max-width: 730px) {
    padding: 1rem 0rem;
    gap: 1rem;
  }
`;

export const FooterInnerLeft = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1.25rem;
  flex-shrink: 0;
  @media (max-width: 1000px) {
    align-self: flex-start;
  }
  @media (max-width: 730px) {
    flex-direction: column;
    align-self: flex-start;
    gap: 0.75rem;
  }
`;

export const FooterInnerRight = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1.25rem;
  flex-shrink: 0;
  @media (max-width: 1000px) {
    align-self: flex-end;
  }
`;

export const FooterText = styled.div`
  color: var(--White-Theme-Gray---7, #535362);
  text-align: center;
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.25rem;
  cursor: pointer;
  @media (max-width: 400px) {
    font-size: 0.875rem;
  }
  &:hover {
    text-decoration: underline;
  }
`;

export const AllRightsText = styled.div`
  color: var(--White-Theme-Gray---7, #535362);
  text-align: center;
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.25rem;
  @media (max-width: 400px) {
    font-size: 0.875rem;
  }
`;

export const Month = styled.div`
  color: #1c2025;
  font-family: "Noto Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  white-space: nowrap;
`;

export const Day = styled.div`
  color: rgba(0, 0, 0, 0.6);
  text-align: center;
  font-family: "Noto Sans";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 15.469px;
  letter-spacing: 0.311px;
  margin-bottom: 15.06px;
  @media (max-width: 1000px) {
    font-size: 10px;
  }
`;

export const StyledDate = styled.div`
  color: rgba(0, 0, 0, 0.87);
  text-align: center;
  font-family: "Noto Sans";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 15.469px;
  letter-spacing: 0.311px;
  @media (max-width: 1000px) {
    font-size: 10px;
  }
`;

export const DateDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 27.956px;
  border-radius: 25%;
  padding: 0.25rem;
  font-weight: ${(props) => (props.isToday ? "bold" : "normal")};
  background: ${(props) =>
    props.isToday ? "var(--Brand-Purple, #996CFE)" : "transparent"};
  ${StyledDate} {
    color: ${(props) => (props.isToday ? "#fff" : "")};
  }
  &:hover {
    ${(props) =>
      !props.hasValue ? "background: var(--Brand-Purple, #996CFE)" : ""};
    ${(props) => (!props.hasValue ? "cursor: pointer" : "")};
    ${StyledDate} {
      color: #fff;
    }
  }
  margin-bottom: 1%;
`;

export const NavigationBtn = styled.img`
  width: 18.637px;
  height: 18.637px;
  cursor: pointer;
  background: none;
  border: none;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
`;


