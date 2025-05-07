import styled from "@emotion/styled";

export const ContainerDiv = styled.div`
  display: flex;
  padding: 2.5rem 2.5rem 5rem 2.5rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
  border-radius: 1rem;
  background: #fff;
  @media (max-width: 1000px) {
    padding: 1.5rem 1.5rem 3rem 1.5rem;
  }
  @media (max-width: 500px) {
    padding: 1.5rem 1.5rem 3rem 1.5rem;
  }
`;

export const TipsCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TipsCardLeftColor = styled.div`
  width: 0.75rem;
  flex-shrink: 0;
  border-radius: 0.5rem 0rem 0rem 0.5rem;
  background: var(--Brand-Purple, #996cfe);
  background: ${({ bgColor }) => bgColor};
`;

export const TipsCardContentDiv = styled.div`
  width: 100%;
  height: 8.625rem;
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

export const TipsHeader = styled.div`
  color: ${({ color }) => color};
  font-family: "Noto Sans";
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.125rem;
  @media (max-width: 500px) {
    font-size: 0.6875rem;
  }
`;

export const TipsDiscr = styled.div`
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
