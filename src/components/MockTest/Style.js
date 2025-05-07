// import styled from "@emotion/styled";
import styled, { keyframes } from "styled-components";

const blinkAnimation = keyframes`
  50% {
    opacity: 0;
  }
`;

export const BlinkingClockWrapper = styled.div`
  animation: ${blinkAnimation} 1.3s linear infinite;
  // display: inline-block;
  display: flex;
  alignitems: center;
  justify-content: center;
  flex-direction: row;
`;

// export const BlinkText = styled.div`
//   animation: ${blinkAnimation} 1.3s linear infinite;
// `;

export const MockBtn = styled.div`
  padding: 8px 22px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  background-color: white;
  color: #996cfe;
  &:hover {
    background-color: var(--Brand-Purple, #996cfe);
    color: white;
  }
`;

export const PurpleTextArea = styled.textarea`
  width: 99%;
  padding: 10px;
  position: relative;
  font-size: 16px;
  border: 0px;
  border-radius: 4px;
  resize: none;
  background-color: rgba(153, 108, 254, 0.1);
  border-color: rgba(153, 108, 254, 0.1);
  color: #333;
  font-family: Noto Sans;
  &:focus {
    color: black;
    outline: none !important;
  }
`;

export const EditableDiv = styled.div`
  width: 99%;
  padding: 10px;
  position: relative;
  font-size: 16px;
  border: 1px solid rgba(153, 108, 254, 0.1);
  border-radius: 4px;
  resize: none;
  background-color: rgba(153, 108, 254, 0.1);
  color: #333;
  font-family: "Noto Sans", sans-serif;
  min-height: 200px;
  outline: none;
  white-space: pre-wrap;
`;
