import styled from "@emotion/styled";

export const PurpleHeaderDiv = styled.div`
  display: flex;
  width: 100%;
  padding: 0.875rem 0rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.75rem 0.75rem 0rem 0rem;
  background: #996cfe;
  color: #fff;
  font-family: "Noto Sans";
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.5rem;
  max-width: 1680px;
`;

export const TargetScore = styled.div`
  background: #996cfe;
  color: #fff;
  font-family: "Noto Sans";
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.5rem;
  border-radius: 3rem;
  padding: .5% 2%;
  margin-bottom: 1rem;
`;

export const WhiteDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: #fff;
  padding: 1rem 0rem 3.5rem;
  max-width: 1680px;
`;

export const ExamText = styled.div`
  color: #333;
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.5rem;
`;

export const ExamUpperDiv = styled.div`
  display: flex;
  width: 100%;
  padding: 0.625rem 0rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.75rem 0.75rem 0rem 0rem;
  border: 1px solid var(--Brand-Purple, #996cfe);
  background: #fff;
  color: var(--Brand-Purple, #996cfe);
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.5rem;
`;

export const ExamBottomDiv = styled.div`
  display: flex;
  width: 100%;
  height: 7.125rem;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
  border-radius: 0rem 0rem 0.75rem 0.75rem;
  border-right: 1px solid var(--Brand-Purple, #996cfe);
  border-bottom: 1px solid var(--Brand-Purple, #996cfe);
  border-left: 1px solid var(--Brand-Purple, #996cfe);
  background: #fff;
  @media (max-width: 1100px) {
    gap: 0.5rem;
  }
`;

export const ExamInnerDiv = styled.div`
  display: flex;
  width: 10rem;
  padding: 0.625rem 0rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 2rem;
  background: var(--Brand-Purple, #996cfe);
  color: #fff;
  border: 1px solid var(--Brand-Purple, #996cfe);
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem; /* 150% */
  cursor: pointer;
  transition: box-shadow 0.3s ease, transform 0.3s ease, color 0.3s ease;
  &:hover {
    /* color: #996cfe; */
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : "0 8px 16px -4px rgba(0, 0, 0, 0.2)"};
    transform: ${({ disabled }) => (disabled ? "none" : "translateY(-2px)")};
  }
`;

export const ScoreCardsDiv = styled.div`
  display: flex;
  height: 161px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  border-radius: 1.25rem;
  position: relative;
`;

export const SettingImg = styled.img`
  position: absolute;
  right: 1.25rem;
  top: 1.25rem;
  cursor: pointer;
`;

export const ScoreCardScore = styled.input`
  color: #fff;
  width: 40px;
  background: transparent;
  border: none;
  font-family: "Noto Sans";
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.5rem;
  text-align: center;
  &::placeholder {
    color: #fff;
    font-size: 2.25rem;
    font-style: normal;
    font-weight: 600;
    text-align: center;
  }
  &:focus {
    border: none;
    outline: none;
  }
`;

export const ScoreCardText = styled.div`
  color: #fff;
  font-family: "Noto Sans";
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.5rem; /* 160% */
`;

export const SubmitBtn = styled.div`
  display: flex;
  width: 10rem;
  padding: 0.75rem 0.625rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.25rem;
  background: var(--Brand-Purple, #996cfe);
  color: #fff;
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.375rem;
  transition: box-shadow 0.3s ease, transform 0.3s ease, color 0.3s ease;
  &:hover {
    /* color: #996cfe; */
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : "0 8px 16px -4px rgba(0, 0, 0, 0.2)"};
    transform: ${({ disabled }) => (disabled ? "none" : "translateY(-2px)")};
  }
`;

export const FeedbackOuterDiv = styled.div`
  width: 95%;
  display: flex;
  // padding: 2.5rem 2.5rem 2.5rem 2.5rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
  // border-radius: 1rem;
  // background: #fff;
  // @media (max-width: 1000px) {
  //   padding: 1.5rem 1.5rem 3rem 1.5rem;
  // }
  // @media (max-width: 500px) {
  //   padding: 1.5rem 1.5rem 3rem 1.5rem;
  // }
`;

export const FeedbackCard = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FeedbackCardContent = styled.div`
  width: 100%;
  min-height: 8.625rem;
  flex-shrink: 0;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: row;
  gap: 1.13rem;
  @media (max-width: 500px) {
    height: 13.125rem;
    padding: 0rem 1rem 0rem 0rem;
  }
`;

export const FeedbackCardLeftColor = styled.div`
  width: 0.75rem;
  flex-shrink: 0;
  border-radius: 0.5rem 0rem 0rem 0.5rem;
  background: var(--Brand-Purple, #996cfe);
  background: ${({ bgColor }) => bgColor};
`;

export const FeedbackHeader = styled.div`
  color: ${({ color }) => color};
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.125rem;
  margin-bottom: 0.25rem;
  @media (max-width: 500px) {
    font-size: 0.6875rem;
  }
`;

export const FeedbackComment = styled.div`
  color: #333;
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem;
  @media (max-width: 500px) {
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.375rem;
  }
`;
