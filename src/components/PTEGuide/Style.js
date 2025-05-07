import styled from "@emotion/styled";

export const WhiteDiv = styled.div`
  width: 100%;
  max-width: 58.125rem;
  min-height: 46.8125rem;
  border-radius: 0.3125rem;
  background: var(--White-Theme-Gray---0, #fff);
`;

export const PTEScoreReport = styled.div`
  color: var(--Brand-Purple, #996cfe);
  text-align: center;
  font-family: "Noto Sans";
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.125rem; /* 90% */
  @media (max-width: 450px) {
    font-size: 1rem;
    line-height: 1.125rem;
  }
`;

export const PTEIntSS = styled.div`
  color: #333;
  text-align: center;
  font-family: "Noto Sans";
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.125rem; /* 75% */
  margin-top: 2rem;
  @media (max-width: 450px) {
    font-size: 1.25rem;
    line-height: 1.125rem;
  }
`;

export const PTEIntSSDesc = styled.div`
  width: 100%;
  max-width: 35.5625rem;
  //   height: 5.5rem;
  flex-shrink: 0;
  color: #333;
  font-family: "Noto Sans";
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.375rem; /* 146.667% */
  @media (max-width: 450px) {
    font-size: 0.875rem;
  }
`;

export const PTEGuideImage = styled.img`
  width: 100%;
  max-width: 36.5625rem;
  //   height: 28.8125rem;
  flex-shrink: 0;
  margin-top: 1.25rem;
`;
