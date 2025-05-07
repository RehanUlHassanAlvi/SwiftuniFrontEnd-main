import styled from "@emotion/styled";

export const PopupHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 36.875rem;
  height: 3.5rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem 0.5rem 0rem 0rem;
  border: 1px solid var(--Brand-Purple, #996cfe);
  background: var(--Brand-Purple, #996cfe);
  @media (max-width: 650px) {
    width: 90%;
  }
`;

export const MeaningPopupHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 36.875rem;
  height: 3.5rem;
  align-items: center;
  justify-content: center;
  // border-radius: 0.5rem 0.5rem 0rem 0rem;
  // border: 1px solid var(--Brand-Purple, #996cfe);
  background: white;
  @media (max-width: 650px) {
    width: 90%;
  }
`;

export const PopupTitleText = styled.div`
  color: #333;
  font-family: "Noto Sans";
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.25rem; /* 133.333% */
  margin-top: 3rem;
  @media (max-width: 600px) {
  }
`;

export const Image = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.2);
  }
  @media (max-width: 600px) {
  }
`;

export const PopupText = styled.div`
 
  display: flex;
  justify-content: center;
  gap: 0.5rem 0.25rem;
  flex-wrap: wrap;
  text-align: center;
  padding: 0rem 1.88rem 2rem;

  color: #333;
  font-family: "Noto Sans";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.25rem; /* 142.857% */

   overflow-y: auto;

  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;

  @media (max-width: 600px) {
  }
`;

export const SingleWord = styled.div`
  color: #333;
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1rem; /* 100% */
  @media (max-width: 600px) {
  }
`;

export const PopupWhiteDiv = styled.div`
  width: 45rem;
  height: 25.3rem;

  display: inline-flex;
  padding: 1.25rem 2.5rem 2.5rem 2.5rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;

  border-radius: 0.5rem;
  background: #fff;

  @media (max-width: 1000px) {
    width: 80%;
  }
  @media (max-width: 650px) {
    width: 80%;
    height: 50rem;
  }
  @media (max-width: 550px) {
    width: 75%;
    height: 50rem;
  }
  @media (max-width: 450px) {
    width: 70%;
    height: 50rem;
  }
`;

export const Known = styled.div`
  display: flex;
  padding: 0.375rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 6.25rem;
  cursor: pointer;
  border: 1px solid ${(props) => (props.isAdded ? "white" : props.color)};

  color: ${(props) => (props.isAdded ? "white" : props.color)};
  background-color: ${(props) => (props.isAdded ? "#89DF8F" : "transparent")};
  font-family: "Noto Sans";
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.25rem; /* 153.846% */
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.07);
  }

  @media (max-width: 650px) {
    width: 90%;
  }
`;

export const SmallCard = styled.div`
  width: 21.875rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media (max-width: 650px) {
    width: 100%;
  }
`;

export const SmallCardHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 2.0625rem;
  flex-shrink: 0;
  border-radius: 0.5rem 0.5rem 0rem 0rem;
  background: #996cfe;

  @media (max-width: 650px) {
    width: 90%;
  }
`;

export const SmallCardHeaderText = styled.div`
  color: #fff;
  font-family: "Noto Sans";
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.25rem; /* 133.333% */

  @media (max-width: 650px) {
    width: 90%;
  }
`;

export const SmallCardContent = styled.div`
  overflow-y: auto;
  width: 99.7%;
  height: 18.75rem;
  border-radius: 0rem 0rem 0.25rem 0.25rem;
  border-right: 1px solid var(--Brand-Purple, #996cfe);
  border-bottom: 1px solid var(--Brand-Purple, #996cfe);
  border-left: 1px solid var(--Brand-Purple, #996cfe);
  background: #fff;
  @media (max-width: 650px) {
    width: 89.5%;
    height: 12rem;
  }
`;
