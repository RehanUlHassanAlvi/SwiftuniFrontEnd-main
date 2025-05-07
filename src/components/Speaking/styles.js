import styled from "@emotion/styled";
import { Card, IconButton, Slider, Select, MenuItem } from "@mui/material";
import { createGlobalStyle } from "styled-components";

export const APStyledCard = styled.div`
  width: 98%;
  border: 1px solid rgba(198, 203, 217, 0.65);
  border-radius: 8px;
  background: var(--White-Theme-Gray---0, #fff);
  box-shadow: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding: 1%;
  @media (max-width: 1100px) {
    flex-direction: column;
    justify-content: center;
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

export const APStyledBox1 = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  @media (max-width: 1280px) {
    justify-content: center;
  }
`;

export const APStyledBox2 = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
  }
  @media (max-width: 450px) {
    margin-top: 30px;
  }
`;

export const APStyledIconBtn = styled(IconButton)`
  width: 2.5rem;
  height: 2.5rem;
  color: white;
  background-color: ${(props) => (props.disabled ? "#ccc" : "#996cfe")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  &:hover,
  &:focus {
    background-color: ${(props) => (props.disabled ? "#ccc" : "#996cfe")};
    color: #fff;
  }

  &.Mui-disabled {
    background-color: #ccc;
    color: #999;
  }
`;

export const APStyledIconBtnSV = styled(IconButton)`
  width: 2.1rem;
  height: 2.1rem;
  color: white;
  background-color: #996cfe;
  curser: pointer;
  margin-top: 0.4rem;
  margin-right: 0.5rem;
  &:hover,
  &:focus {
    background-color: #996cfe;
    color: #fff;
  }
`;

export const APStyledAudioSlider = styled(Slider)`
  width: 398px;
  height: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 16px;
  margin-right: 16px;
  border-radius: 4px;
  color: var(--Brand-Purple, #996cfe);

  & .MuiSlider-thumb {
    border-radius: 33px;
    border: 2px solid var(--Brand-Purple, #996cfe);
    background-color: #fff;
    width: 16px;
    height: 16px;
    &:hover,
    &.Mui-focusVisible {
      box-shadow: none;
    }

    &.Mui-disabled {
      background-color: #ccc;
      color: #999;
      border: 2px solid #ccc;
    }
  }
  & .MuiSlider-track {
    border-radius: 4px;
  }
  & .MuiSlider-rail {
    color: #c6cbd9;
  }
  @media (max-width: 450px) {
    width: 100%;
    height: 4px;
    margin-left: 20px;
    margin-right: 20px;
    border-radius: 2px;
    & .MuiSlider-thumb {
      border-radius: 33px;
      border: 2px solid var(--Brand-Purple, #996cfe);
      background-color: #fff;
      width: 16px;
      height: 16px;
    }
    & .MuiSlider-track {
      border-radius: 2px;
    }
    &.Mui-disabled {
      background-color: #ccc;
      color: #999;
      border: 2px solid #ccc;
    }
  }
  @media (min-width: 1281px) and (max-width: 1400px) {
    width: 300px;
    margin-left: 20px;
    margin-right: 20px;
  }
`;

export const APStyledVolumeSlider = styled(Slider)`
  width: 100px;
  height: 4px;
  margin-left: 12px;
  border-radius: 4px;
  color: var(--Brand-Purple, #996cfe);
  & .MuiSlider-thumb {
    border-radius: 33px;
    border: 2px solid var(--Brand-Purple, #996cfe);
    background-color: #fff;
    width: 16px;
    height: 16px;
    &:hover,
    &.Mui-focusVisible {
      box-shadow: none;
    }

    &.Mui-disabled {
      background-color: #ccc;
      color: #999;
      border: 2px solid #ccc;
    }
  }
  & .MuiSlider-track {
    border-radius: 4px;
  }
  & .MuiSlider-rail {
    color: #c6cbd9;
  }
  @media (max-width: 450px) {
    height: 100px;
    width: 6px;
    margin-left: 10px;
    margin-right: 10px;
    & .MuiSlider-thumb {
      width: 16px;
      height: 16px;
    }
    &.Mui-disabled {
      background-color: #ccc;
      color: #999;
      border: 2px solid #ccc;
    }
  }
  @media (min-width: 1281px) and (max-width: 1400px) {
    margin-left: 10px;
    margin-right: 10px;
  }
`;

export const SelectVoiceDiv = styled(Select)`
  color: var(--White-Theme-Gray---4, #9a9aaf);
  text-align: flex-start;
  font-family: "Noto Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  // margin-right: 16px;
  // margin-left: 16px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8.5rem;
  height: 30px;
  box-sizing: border-box;

  &.Mui-focused:hover .MuiOutlinedInput-notchedOutline {
    border-color: #996cfe;
  }

  &.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #996cfe;
  }

  & .MuiOutlinedInput-notchedOutline {
    border: 1px solid var(--White-Theme-Gray---2, #e2e2ea);
    border-radius: 4px;
    transition: border-color 0.3s ease;
  }

  & .MuiSelect-root {
    padding: 0px;
    text-align: center;
  }

  & .MuiSelect-select {
    display: flex;
    width: 100%;
    justify-content: center;
    background-color: transparent;
    padding-left: 23%;
  }
  & .MuiSelect-icon {
    display: none;
  }
  @media (max-width: 450px) {
    margin-left: ${(props) =>
      props.isSliderOpenAndNarrowScreen ? "0px" : "23px"};
  }
  @media (min-width: 1281px) and (max-width: 1400px) {
    margin-left: 10px;
    margin-right: 10px;
  }
`;

export const APStyledSelectSpeed = styled(Select)`
  color: var(--White-Theme-Gray---4, #9a9aaf);
  text-align: center;
  font-family: "Noto Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  margin-right: 16px;
  margin-left: 16px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 30px;
  box-sizing: border-box;

  &.Mui-focused:hover .MuiOutlinedInput-notchedOutline {
    border-color: #996cfe;
  }

  &.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #996cfe;
  }

  & .MuiOutlinedInput-notchedOutline {
    border: 1px solid var(--White-Theme-Gray---2, #e2e2ea);
    border-radius: 100px;
    transition: border-color 0.3s ease;
  }

  & .MuiSelect-root {
    padding: 0px;
    text-align: center;
  }

  & .MuiSelect-select {
    display: flex;
    width: 100%;
    justify-content: center;
    background-color: transparent;
    padding-left: 30%;
  }
  & .MuiSelect-icon {
    display: none;
  }
  @media (max-width: 450px) {
    margin-left: ${(props) =>
      props.isSliderOpenAndNarrowScreen ? "0px" : "23px"};
  }
  @media (min-width: 1281px) and (max-width: 1400px) {
    margin-left: 10px;
    margin-right: 10px;
  }
`;

export const APStyledSelectLanguage = styled(Select)`
  color: var(--White-Theme-Gray---4, #9a9aaf);
  text-align: center;
  font-family: "Noto Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  box-sizing: border-box;
  &.Mui-focused:hover .MuiOutlinedInput-notchedOutline {
    border-color: #996cfe;
  }

  &.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #996cfe;
  }

  & .MuiOutlinedInput-notchedOutline {
    border: 1px solid var(--White-Theme-Gray---2, #e2e2ea);
    border-radius: 100px;
    transition: border-color 0.3s ease;
  }

  & .MuiSelect-root {
    padding-left: 0px;
  }
  & .MuiSelect-icon {
    color: #9a9aaf;
  }
`;

export const StyledVolumeIconBtn = styled.div`
  width: 58px;
  height: 30px;
  border-radius: 100px;
  border: ${(props) =>
    props.disabled
      ? " 1px solid #ccc "
      : "1px solid var(--White-Theme-Gray---2, #e2e2ea)"};
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  &:hover,
  &:focus {
    border-color: ${(props) => (props.disabled ? "#ccc" : "black")};
    transition: border-color 0.3s ease;
  }
`;

export const StyledDurationBox = styled.div`
  // width: 125px;
  gap: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  @media (max-width: 450px) {
    width: 150px;
  }
  @media (max-width: 390px) {
    width: 180px;
  }
`;

export const StyledDurationDiv = styled.div`
  color: #999;
  font-family: "Noto Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  @media (max-width: 450px) {
    font-size: 15px;
  }
  @media (max-width: 390px) {
    font-size: 14px;
  }
`;

export const MenuItemsVoice = styled(MenuItem)`
  color: var(--White-Theme-Gray---4, #9a9aaf);
  text-align: flex-start;
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 100% */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.4rem;
`;

export const MenuItemsSpeed = styled(MenuItem)`
  color: var(--White-Theme-Gray---4, #9a9aaf);
  text-align: center;
  font-family: "Noto Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 100% */
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export const MenuItemsLanguage = styled(MenuItem)`
  color: var(--White-Theme-Gray---4, #9a9aaf);
  text-align: center;
  font-family: "Noto Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 100% */
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 14px;
`;

export const ImageCardMainDiv = styled.div`
width: 100%;
border: "1px solid rgba(198, 203, 217, 0.65);
border-radius: "8px",
background: var(--White-Theme-Gray---0, #FFF);
flex-shrink: 0;
display: flex;
justify-content: center;
padding: 20px;
box-shadow: none;
`;

export const ImageCardStyledImg = styled.img`
  width: 483px;
  height: 304px;
  @media (max-width: 450px) {
    width: 100%;
    height: auto;
  }
`;

export const SMCmainDiv = styled.div`
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;

export const SpeakingMicCardDiv = styled(Card)`
  width: 97%;
  height: 7.5rem;
  flex-shrink: 0;
  border-radius: 8px;
  background: rgba(153, 108, 254, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  padding: 1.5%;
  box-shadow: none;
  position: relative;
  @media (max-width: 1100px) {
    // height: auto;
    height: 9rem;
  }
`;

export const RecordingAndVisualizingDiv = styled.div`
  width: 100%;

  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5px;
`;

export const MicRoundBackground = styled(Card)`
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 39px;
  background: #996cfe;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

export const DoneText = styled.div`
  color: var(--White-Theme-Gray---8, #2e2e3a);
  text-align: center;
  font-family: "Noto Sans";
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 27px; /* 150% */
`;

export const MicInputDiv = styled.div`
  position: absolute;
  right: 10px;
  bottom: 7px;
  // width: 100%;
  // display: flex;
  right: 8px;
  }
`;

export const UseHeadSetDiv = styled.div`
  // position: absolute;
  // right: ${(props) => (props.isRecording ? "45px" : "10px")};
  transition: right 0.5s ease;
  bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 478px) {
    position: static;
  }
`;

export const UseHeadSetText = styled.div`
  color: var(--White-Theme-Gray---4, #9a9aaf);
  font-family: "Noto Sans";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 143.75%; /* 23px*/
  text-decoration-line: underline;
  margin-left: 2px;
  @media (max-width: 1300px) {
    font-size: 15px;
  }
  @media (max-width: 600px) {
    font-size: 13px;
  }
  @media (max-width: 478px) {
    font-size: 11px;
  }
`;

export const PlayRecordingCardDiv = styled(Card)`
  width: 99%;
  height: 3.8rem;
  flex-shrink: 0;
  border-radius: 8px;
  // opacity: 0.5;
  background: rgba(153, 108, 254, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  gap: 10px;
  padding: 0.5%;
  box-shadow: none;
  @media (max-width: 600px) {
    flex-direction: column;
    height: auto;
    width: 96%;
    padding: 2%;
    justify-content: center;
  }
`;

export const AudioPlayer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0px;
  overflow: hidden;
  border-radius: 10px;
  background-color: #f1f1f1;
  // background-color: #f1f3f4;
  margin-left: 0.8rem;
  animation: fadeIn 2s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: 600px) {
    margin-top: 5px;
    margin-left: 0rem;
  }
`;

export const PlayRecordingCardText = styled.div`
  color: var(--White-Theme-Gray---8, #2e2e3a);
  font-family: "Noto Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 26px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-grow: 1;
  margin-right: 0.8rem;
  @media (max-width: 600px) {
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
    padding: 0px 10px;
    margin-right: 0rem;
  }

  @media (max-width: 390px) {
    font-size: 10px;
    font-weight: 400;
    padding: 0px 10px;
    margin-right: 0rem;
  }
`;

export const WaveformContainer = styled.div`
  display: block;
  width: 100%;
  animation: fadeIn 2s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const QuestionCardMainDiv = styled.div`
  border-radius: 8px;
  border: 1px solid rgba(198, 203, 217, 0.65);
  background: var(--White-Theme-Gray---0, #fff);
  position: relative;
  width: 100%;
`;

export const QuestionCardContent = styled.div`
  padding: 16px 40px 16px 20px;
`;

export const QuestionCardText = styled.div`
  color: #333;
  font-family: "Noto Sans";
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px; /* 140% */
  @media (max-width: 600px) {
    font-size: 14px;
    font-weight: 400;
    line-height: 21px; /* 150% */
  }
`;

export const QuestionCardIconDiv = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  align-self: flex-end;
  gap: 0.5rem;
  margin-top: -10px;
  margin-bottom: 10px;
  margin-right: 10px;

  // transition: transform 0.3s ease;
  // &:hover {
  //   transform: scale(1.2);
  // }
  // transform: ${({ clicked }) => (clicked ? "scale(1.2)" : "none")};
`;

export const SpeakerIconDiv = styled.div`
  margin-top: 0.25rem;
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.2);
  }
  transform: ${({ clicked }) => (clicked ? "scale(1.2)" : "none")};
`;

// export const GlobalAudioPlayerStyles = createGlobalStyle`
//   /* General color for icons including play, pause, volume */
//   .rhap_button-clear, .rhap_volume-button {
//       color: #333333; /* Example: White color for icons */
//   }

//   /* Styling for the progress bar's filled and background part */
//   .rhap_progress-filled {
//       background-color: #ffffff; /* Example: White color for the filled part of the progress bar */
//   }

//   .rhap_progress-bar {
//       background-color: #aaaaaa; /* Example: Light gray for the background of the progress bar */
//   }

//   .rhap_progress-indicator {
//       background-color: #ffffff; /* Example: White color for the progress indicator knob */
//   }

//   /* Styling for the volume bar */
//   .rhap_volume-indicator {
//       background-color: #ffffff; /* Example: White for the volume indicator */
//   }

//   .rhap_volume-bar {
//       background-color: #aaaaaa; /* Example: Light gray for the background of the volume bar */
//   }

//   /* Hover effects for better user experience */
//   .rhap_button-clear:hover, .rhap_volume-button:hover {
//       color: #cccccc; /* Lighter color on hover for icons */
//   }

//   /* Time indicators styling */
//   .rhap_time {
//       color: #333333; /* White color for time */
//   }
// `;

export const GlobalAudioPlayerStyles = createGlobalStyle`
 

  .rhap_container {
      box-shadow: none; 
  }




`;

export const RecordingSliderDiv = styled.div`
  display: flex;
  alignitems: center;
  justify-content: flex-start;
  align-self: flex-start;
  width: 97%;
  padding: 10px 0;
  margin-bottom: -34px;
  @media (max-width: 1100px) {
    width: 95%;
    margin-bottom: -50px;
  }
  @media (max-width: 800px) {
    width: 93%;
    margin-bottom: -43px;
  }
  @media (max-width: 500px) {
    width: 91%;
    margin-bottom: -40px;
  }
  @media (max-width: 400px) {
    width: 88%;
    margin-bottom: -36px;
  }
`;

export const RecordingSlider = styled(Slider)`
  & .MuiSlider-track {
    border-radius: 4px;
    height: 12px;
    background: #996cfe;
  }

  & .MuiSlider-rail {
    border-radius: 4px;
    height: 10px;
    background: white;
  }

  & .MuiSlider-thumb {
    display: none;
  }
`;
