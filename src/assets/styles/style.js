import styled, { keyframes, css } from "styled-components";

export const FlexDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Btn = styled.button`
  display: contents;
  cursor: pointer;
`;

export const AnnouncementWrapper = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  display: flex;
  flex-direction: column; /* Ensures they stack properly */
  z-index: 1100;
`;

export const AnnouncementBar = styled.div`
  width: 100%;
  background-color: #996cfe;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
`;

export const InfoIconWrapper = styled.div`
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
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

export const InfoIconImg = styled.img`
  width: 25px;
  height: 25px;
  animation: ${blinkAnimation} 1.5s linear infinite;
`;

const marquee = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(-100%);
  }
`;

export const AnnouncementText = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  align-items: center;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 70px;
    z-index: 1;
  }

  &::before {
    left: 0;
    background: linear-gradient(to right, #FF5D5D, rgba(255, 255, 255, 0));
  }

  &::after {
    right: 0;
    background: linear-gradient(to left, #FF5D5D, rgba(255, 255, 255, 0));
  }

  span {
    display: inline-block;
    animation: ${marquee} 15s linear infinite;
  }

  &:hover span {
    animation-play-state: paused;
    cursor: default;
  }
`;

export const AnnouncementText2 = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  align-items: center;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 70px; 
    z-index: 1;
  }

  &::before {
    left: 0;
    background: linear-gradient(to right, #996cfe, rgba(255, 255, 255, 0));
  }

  &::after {
    right: 0;
    background: linear-gradient(to left, #996cfe, rgba(255, 255, 255, 0));
  }

  span {
    display: inline-block;
    animation: ${marquee} 30s linear infinite;
  }

  &:hover span {
    animation-play-state: paused;
    cursor: default;
  }
`;

export const AnnouncementTextSimple = styled.span`
  flex: 1;
  text-align: center;
  font-size: 1rem;
  font-weight: 500;
  white-space: pre-wrap;
  cursor: default;
`;

export const CloseIconWrapper = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`;

export const YouTubeOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const OverlayWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(4px);
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ThumbnailImage = styled.img`
  max-width: 80vw;
  max-height: 80vh;
  width: auto;
  height: auto;
  cursor: pointer;
  border-radius: 8px;
  object-fit: contain;

  @media (max-width: 1000px) {
    max-width: 75vw;
    max-height: 75vh;
  }

  @media (max-width: 600px) {
    max-width: 90vw;
    max-height: 60vh;
  }
`;

export const ExplanationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  border-top: 1px solid var(--White-Theme-Gray---2, #E2E2EA);
  border-bottom: 1px solid var(--White-Theme-Gray---2, #E2E2EA);
  padding: 20px 0px;
`;

export const ExplanationParagraph = styled.p`
margin: 0 0 1em 0;
text-align: justify;
text-justify: inter-word;
&:last-child {
  margin-bottom: 0;
}
`;
