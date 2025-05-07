import styled from "@emotion/styled";

export const NoteImgs = styled.img`
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
  width: 36.875rem;
  max-height: 15rem;
  justify-content: center;
  align-items: center;
  background: #fff;
  padding: 0rem 0rem 1rem;
  gap: 0.5rem;

  // overflow-y: auto;
   
  // ::-webkit-scrollbar {
  //   width: 0;
  //   height: 0;
  // }
  // scrollbar-width: thin;
  // scrollbar-color: transparent transparent;

  @media (max-width: 650px) {
    width: 90%;
  }
`;

export const PopupBtn = styled.div`
  display: flex;
  width: 95%;
  height: 2.375rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.25rem;
  background: ${(props) =>
    props.backgroundColor || "var(--Brand-Purple, #996CFE)"};
  color: #fff;
  text-align: center;
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.125rem;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

export const PopupTextArea = styled.textarea`
  border-radius: 0.25rem;
  border: 1px solid #e8e8e8;
  width: 93%;
  height: 10.375rem;
  padding: 0.625rem 1%;
  resize: none;
  margin: 1.5rem 0rem;
`;
