import styled from "@emotion/styled";

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
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 1440px) {
    font-size: 0.9375rem;
    line-height: 1.375rem;
  }
  @media (max-width: 600px) {
    font-size: 0.8125rem;
  }
`;

export const PopupHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 40.875rem;
  height: 3.5rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem 0.5rem 0rem 0rem;
  border: 1px solid var(--Brand-Purple, #996cfe);
  background: var(--Brand-Purple, #996cfe);
  @media (max-width: 750px) {
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
  display: flex;
  flex-direction: column;
  width: 40.875rem;
  justify-content: center;
  align-items: center;
  background: #fff;
  padding: 0rem 0rem 1.25rem;
  min-height: 80px;
  @media (max-width: 650px) {
    width: 90%;
  }
`;

export const WhiteDivText = styled.div`
    color: #333
    font-family: "Noto Sans";
    font-size: 0.9375rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.44rem;
    width: 90%;
    margin-top: 1.25rem;
`;

export const InputHeader = styled.div`
    color: #333
    font-family: "Noto Sans";
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.152rem;
`;

export const Input = styled.input`
  height: 2rem;
  border-radius: 0.25rem;
  border: 1px solid #e8e8e8;
  width: 100%;
`;

export const TextArea = styled.textarea`
  height: 4.3125rem;
  border-radius: 0.25rem;
  border: 1px solid #e8e8e8;
  width: 100%;
  resize: none;
`;

export const CancelBtn = styled.div`
  width: 10.875rem;
  height: 2.375rem;
  border-radius: 0.25rem;
  border: 1px solid rgba(0, 0, 0, 0.35);
  background: #fff;
  display: flex;
  justify-content: center;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.5);
  text-align: center;
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.375rem;
  align-items: center;
  &:hover {
    opacity: 0.8;
  }
`;

export const SaveBtn = styled.div`
  width: 11.1875rem;
  height: 2.375rem;
  border-radius: 0.25rem;
  background: var(--Brand-Purple, #996cfe);
  color: var(--White-Theme-Gray---0, #fff);
  text-align: center;
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.375rem; /* 137.5% */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

export const AppearedText = styled.div`
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

export const SubscribePopupBtn = styled.div`
  height: 30px;
  border: 1px solid #996cfe;
  border-radius: 0.25rem;
  padding: 0rem 1rem;
  font-family: "Noto Sans";
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1.25rem;  
  cursor: pointer;
  &:hover {
   background: #996cfe;
   color: #fff;
  }  
`;