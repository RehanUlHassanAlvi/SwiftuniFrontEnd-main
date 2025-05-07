import styled from "@emotion/styled";

export const OptionText = styled.div`
  color: var(--White-Theme-Gray---4, #9a9aaf);
  font-family: "Noto Sans";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2.875rem; /* 328.571% */
  transition: transform 0.2s ease, color 0.2s ease, border-bottom 0.2s ease;
  
  &:hover {
    color: var(--Brand-Purple, #996cfe);
    // border-bottom: 1px solid var(--Brand-Purple, #996cfe);
    transform: translateY(-3px) scale(1.05);
  }
`;

export const InputDiv = styled.div`
  display: flex;
  width: 12.65rem;
  padding: 0.625rem 0.75rem;
  justify-content: space-between;
  align-items: center;
  border-radius: 1.25rem;
  background: #fff;
  @media (max-width: 600px) {
    width: 8.65rem;
  }
`;

export const Input = styled.input`
  border: none;
  outline: none;
  width: 70%;
  color: var(--Brand-Purple, #996cfe);
  font-family: "Noto Sans";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1rem; /* 114.286% */
`;

export const WhiteDiv = styled.div`
  border-radius: 0.75rem;
  background: #fff;
  min-height: 56rem;
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 2rem;
`;

export const WhiteDivText = styled.div`
  color: #333;
  font-family: "Noto Sans";
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem; /* 133.333% */
  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

export const StretegyVideosDesc = styled.div`
  color: #333;
  font-family: "Noto Sans";
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem; /* 133.333% */
  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

export const VideosWhiteDiv = styled.div`
  border-radius: 0.75rem;
  background: #fff;
  min-height: 56rem;
  display: flex;
  width: 100%;
  justify-content: flex-start;
  margin-bottom: 2rem;
  @media (max-width: 600px) {
    justify-content: center;
    align-items: center;
    height: auto;
    min-height: auto;
  }
`;

export const VideosDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  align-self: flex-start;
  gap: 2.47rem;
  padding: 2rem;

  flex-direction: row;
  @media (max-width: 600px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
  }
`;


export const VideoCard = styled.div`
  width: 16rem;
  height: 16.75rem;
  flex-shrink: 0;
  border-radius: 0.3125rem;
  background: #fff;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  @media (max-width: 500px) {
    // width: 100%;
  }
`;

export const VideoArea = styled.div`
  width: 16.03125rem;
  height: 8.75rem;
  flex-shrink: 0;
  border-radius: 0.3125rem;
  background: url(${(props) => props.imagePath}) lightgray 50% / cover no-repeat;
`;

export const VideoInfoDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0.625rem;
`;

export const VideoInfoText = styled.div`
  color: #333;
  font-family: "Noto Sans";
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.625rem;
  padding-left: 0.62rem;
`;

export const VideoPlayButton = styled.img`
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
  padding-right: 0.62rem;
`;

export const VideoAuthorText = styled.div`
  color: #333;
  font-family: "Noto Sans";
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5rem;
  display: flex;
  align-self: flex-start;
  margin-left: 0.62rem;
`;

export const SpeakingButton = styled.div`
  display: flex;
  padding: 0.1875rem 0.625rem;
  align-self: flex-start;
  align-items: center;
  //   margin-left: 0.62rem;
  position: absolute;
  bottom: 10px;
  left: 10px;
  gap: 0.625rem;
  border-radius: 0.3125rem;
  background: rgba(73, 215, 242, 0.1);
  color: #49d7f2;
  font-family: "Noto Sans";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem; /* 171.429% */
`;
