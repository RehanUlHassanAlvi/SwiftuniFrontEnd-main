import styled from "@emotion/styled";

export const SocialDiv = styled.div`
  display: flex;
  height: 17.8125rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  background: #fff;
  flex-direction: column;
  @media (max-width: 600px) {
    height: 13.125rem;
  }
`;

export const SocialDivTitle = styled.div`
  color: #2f88ff;
  text-align: center;
  font-family: "Noto Sans";
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.125rem; /* 90% */
  text-transform: uppercase;
  margin-bottom: 0.75rem;
  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

export const SocialDivText = styled.div`
  color: #2f88ff;
  text-align: center;
  font-family: "Noto Sans";
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem; /* 133.333% */
  &: hover {
    text-decoration: underline;
  }
  @media (max-width: 600px) {
    font-size: 0.75rem;
  }
`;

export const ContactDiv = styled.div`
  display: inline-flex;
  height: 5.6875rem;
  width: 100%;
  align-items: center;
  gap: 1rem;
  border-radius: 0.625rem;
  border: 1px solid rgba(0, 0, 0, 0);
  background: #fff;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);
`;

export const ContactDivLink = styled.a`
  color: #333;
  font-family: "Noto Sans";
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.625rem;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s ease;
  &:hover {
    color: #2f88ff;
  }
`;

export const ContactDivText = styled.div`
  color: #333;
  font-family: "Noto Sans";
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.625rem; /* 130% */
`;
