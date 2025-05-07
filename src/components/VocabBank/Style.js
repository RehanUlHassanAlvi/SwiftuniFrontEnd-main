import styled from "@emotion/styled";

export const OptionText = styled.div`
  color: var(--White-Theme-Gray---4, #9a9aaf);
  font-family: "Noto Sans";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2.875rem; /* 328.571% */
  &:hover {
    color: var(--Brand-Purple, #996cfe);
    border-bottom: 1px solid var(--Brand-Purple, #996cfe);
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

export const InputDivSearch = styled.div`
  display: flex;
  width: 30%;
  padding: 0.625rem 0.75rem;
  justify-content: space-between;
  align-items: center;
  border-radius: 1.25rem;
  border: 1px solid white;
  background: #fff;
    @media (max-width: 1000px) {
    width: 50%;
  }
  @media (max-width: 600px) {
    width: 60%;
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
  justify-content: flex-start;
  flex-direction: column;
  margin-bottom: 2rem;
  padding: 2rem 0rem 1rem;
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

export const VocabDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 97%;
  height: 3.5rem;
  flex-shrink: 0;
  border-radius: 0.5rem;
  border: 1px solid #996cfe;
  background: #fff;
  transition: transform 0.2s ease;
  &:hover {
    background: #d5caeb;
    transform: scale(1.005);
  }
  cursor: pointer;
  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

export const VocabText = styled.div`
  color: ${(props) => (props.color ? props.color : "#333")};
  font-family: "Noto Sans";
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.375rem; /* 146.667% */
  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

export const KnownUnknown = styled.div`
  display: inline-flex;
  padding: 0.375rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.25rem;
  //   background: #008000;
  background: ${(props) => (props.bg ? props.bg : "#008000")};
  color: #fff;
  font-family: "Noto Sans";
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.25rem; /* 153.846% */
  cursor: pointer;
  transition: box-shadow 0.3s ease, transform 0.3s ease, color 0.3s ease;
  &:hover {
    /* color: #996cfe; */
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : "0 8px 16px -4px rgba(0, 0, 0, 0.2)"};
    transform: ${({ disabled }) => (disabled ? "none" : "translateY(-2px)")};
  }
  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

export const DeleteBtn = styled.img`
  //   color: ${(props) => (props.color ? props.color : "#333")};
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  cursor: pointer;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.2);
  }
  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

export const PronounceBtn = styled.img`
  //   color: ${(props) => (props.color ? props.color : "#333")};
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  cursor: pointer;
  margin-right: 0.25rem;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.2);
  }
  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;
