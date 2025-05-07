import styled from "@emotion/styled";

import { keyframes } from "styled-components";

// Create a keyframe animation for fading in
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const FadeIn = styled.span`
  display: inline-block;
  animation: ${fadeIn} 0.5s ease forwards;
  opacity: 0; // Initially hidden, then animates to opacity: 1
`;

export const MainImg = styled.img`
  width: 120px;
  height: 120px;
`;

export const Card = styled.div`
  // width: 406px;
  // height: 490px;
  min-height: 290px;
  padding: 48px;
  border-radius: 24px;
  background: #fff;
  @media (max-width: 1050px) {
    padding: 48px 36px;
  }
  @media (max-width: 990px) {
    padding: 48px 18px;
  }
  @media (max-width: 380px) {
    padding: 48px 8px;
  }
`;

export const SignUpText = styled.div`
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
  color: #996cfe;
  &:hover {
    text-decoration: underline;
  }
`;

export const HaveAnAccount = styled.div`
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
`;

export const GoogleText = styled.div`
  font-family: Inter;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: left;
`;

export const GoogleDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 408px;
  height: 40px;
  border-radius: 5px;
  background: #eee;
  box-shadow: 0px 0px 0px 0px #00062e32;
  margin-top: 24px;
  cursor: pointer;
  transition: box-shadow 0.3s ease, transform 0.3s ease, color 0.3s ease;
  &:hover {
    /* color: #996cfe; */
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : "0 8px 16px -4px rgba(0, 0, 0, 0.2)"};
    transform: ${({ disabled }) => (disabled ? "none" : "translateY(-2px)")};
  }
  @media (max-width: 500px) {
    width: 326px;
  }
`;

export const AppleDiv = styled.div`
  width: 408px;
  height: 40px;
  border-radius: 5px;
  background: #eee;
  box-shadow: 0px 0px 0px 0px #00062e32;
  margin-top: 10px;
  @media (max-width: 500px) {
    width: 326px;
  }
`;

export const OR = styled.div`
  font-family: Inter;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.05999999865889549px;
  text-align: left;
  color: #0007149f;
`;

export const Line = styled.div`
  width: 185px;
  height: 1px;
  /* top: 383px;
  left: 221px; */
  background: #00002f26;
  @media (max-width: 500px) {
    width: 145px;
  }
`;

export const ContinueDiv = styled.div`
    width: 404px;
    height: 40px;
    border-radius: 5px;
    background: #996CFE;
    margin-top:24px;
    display: flex;
    align-items; center;
    justify-content: center;
    transition: box-shadow 0.3s ease, transform 0.3s ease, color 0.3s ease;
  &:hover {
    /* color: #996cfe; */
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : "0 8px 16px -4px rgba(0, 0, 0, 0.2)"};
    transform: ${({ disabled }) => (disabled ? "none" : "translateY(-2px)")};
  }
    @media (max-width: 500px) {
        width:326px;
    }        

`;

export const ContinueText = styled.div`
  font-family: Inter;
  font-size: 16px;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: -0.009em;
  text-align: left;
  color: #fff;
`;

export const Arrow = styled.img`
  width: 16px;
  height: 16px;
`;

export const MainText = styled.div`
  color: #2b333b;
  font-family: Inter;
  font-size: 28px;
  font-weight: 700;
  line-height: 35px;
  letter-spacing: 0em;
  text-align: left;
`;

export const CredenialsText = styled.div`
  font-family: Inter;
  font-size: 14px;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
`;

export const ForgotPass = styled.div`
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: right;
  color: #996cfe;
  cursor: pointer;
  &: hover {
    text-decoration: underline;
  }
`;

export const Inputs = styled.input`
  width: 372px;
  height: 40px;
  border-radius: 5px;
  border: 1px;
  border: 1px solid #f2f3f7;
  box-shadow: 0px 0px 0px 0px #0009321f;
  color: #9a9aaf;
  font-size: 1rem;
  padding: 0px 16px;
  transition: border 0.3s ease, box-shadow 0.3s ease;
  :focus {
    outline: none;
    border: 1px solid rgba(153, 108, 254, 0.3);
    box-shadow: 0 0 8px rgba(153, 108, 254, 0.3);
  }
  @media (max-width: 500px) {
    width: 294px;
  }
`;

export const ImageDiv = styled.div`
  border-radius: 14.5px;
  width: max-content;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 2px 3px 0px #00000026, 0px 0.5px 2px 0px #00000033;
  padding: 8px;
`;

export const Book = styled.img`
  width: 38.12px;
  height: 38.12px;
  padding: 3.18px, 1.59px, 1.59px, 4.76px;
`;

export const SwiftLogoImg = styled.img`
  width: 9.25rem;
  height: 4.375rem;
  flex-shrink: 0;
  padding: 3.18px, 1.59px, 1.59px, 4.76px;
`;

export const GmailLogo = styled.img`
  width: 16px;
  height: 16px;
`;

export const MainContainer = styled.div`
  width: 676px;
  height: 705px;
  flex-shrink: 0;
  justify-content: center;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  border-radius: 32px;
  background: #fff;
  @media (max-width: 815px) {
    width: 90%;
    height: 399px;
  }
`;

export const InnerContainer = styled.div`
  width: 476px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  @media (max-width: 815px) {
    width: 90%;
    gap: 25px;
  }
`;

export const MainContainerResetPswd = styled.div`
  width: 676px;
  height: 705px;
  flex-shrink: 0;
  justify-content: center;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  border-radius: 32px;
  background: #fff;
  @media (max-width: 815px) {
    width: 383px;
    height: 600px;
  }
  @media (max-width: 500px) {
    width: 383px;
    height: 550px;
  }
  @media (max-width: 390px) {
    width: 335px;
    height: 500px;
  }
`;

export const MainHeaderText = styled.div`
  color: #2b333b;
  text-align: center;
  font-family: "Noto Sans";
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: 34px; /* 121.429% */
  @media (max-width: 815px) {
    font-size: 26px;
  }
  @media (max-width: 500px) {
    font-size: 25px;
  }
  @media (max-width: 390px) {
    font-size: 22px;
  }
`;

export const SubHeaderText = styled.div`
  max-width: 335px;
  color: #9a9aaf;
  text-align: center;
  font-family: "Noto Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 17px; /* 121.429% */
  span {
    color: #996cfe;
    cursor: pointer;
  }
  @media (max-width: 815px) {
    font-size: 13px;
  }
  @media (max-width: 500px) {
    font-size: 12px;
  }
  @media (max-width: 390px) {
    font-size: 12px;
  }
`;

export const InputWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
`;

export const TermsCondInputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
`;

export const Input = styled.input`
  width: 460px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #f2f3f7;
  box-shadow: 0px 0px 0px 0px #0009321f;
  color: #9a9aaf;
  font-size: 1rem;
  padding: 0px 16px;
  display: flex;
  align-items: center;
  transition: border 0.3s ease, box-shadow 0.3s ease;

  :focus {
    outline: none;
    border: 1px solid rgba(153, 108, 254, 0.5);
    box-shadow: 0 0 8px rgba(153, 108, 254, 0.5);
  }

  ::placeholder {
    color: #9a9aaf;
    font-family: "Noto Sans", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
  }
  @media (max-width: 815px) {
    width: 97%;
    padding: 0px 1.5%;
    font-size: 14px;
  }

  @media (max-width: 500px) {
    font-size: 13px;
  }
  @media (max-width: 390px) {
    font-size: 12px;
  }
`;

export const VerificationButton = styled.button`
  display: flex;
  width: 496px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: var(--Brand-Purple, #996cfe);
  color: #fff;
  text-align: center;
  font-family: "Noto Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px; /* 137.5% */
  border: none;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  @media (max-width: 815px) {
    width: 100%;
    font-size: 14px;
  }
`;

export const BackButton = styled.div`
  color: var(--Brand-Purple, #996cfe);
  font-family: "Noto Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 17px; /* 121.429% */
  cursor: pointer;
  margin-top: 30px;

  @media (max-width: 500px) {
    margin-top: 20px;
  }
  @media (max-width: 500px) {
    margin-top: 10px;
  }
  &:hover {
    text-decoration: underline;
  }
`;

export const ResendButton = styled.div`
  color: #9a9aaf;
  font-family: "Noto Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 17px; /* 121.429% */
  cursor: pointer;
  margin-top: 30px;

  span {
    color: #996cfe;
  }

  @media (max-width: 815px) {
  }
  @media (max-width: 500px) {
    margin-top: 20px;
  }
  @media (max-width: 500px) {
    margin-top: 10px;
  }
`;

export const VerificationIcon = styled.div`
  font-size: 48px;
  @media (max-width: 815px) {
    font-size: 40px;
  }
  @media (max-width: 500px) {
    font-size: 30px;
  }
`;

export const VerificationStatus = styled.div`
  color: #000;
  font-family: "Noto Sans";
  font-size: 18px;
  font-weight: 600;
  line-height: 16px;
  @media (max-width: 815px) {
    font-size: 17px;
  }
  @media (max-width: 500px) {
    font-size: 15px;
  }
`;

export const VerificationMessage = styled.div`
  color: #7e7e8f;
  font-family: "Noto Sans";
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  @media (max-width: 815px) {
    font-size: 13px;
  }
  @media (max-width: 500px) {
    font-size: 11px;
  }
`;

export const MainContainerReset = styled.div`
  width: 676px;
  height: 705px;
  flex-shrink: 0;
  justify-content: center;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  border-radius: 32px;
  background: #fff;
  @media (max-width: 815px) {
    width: 383px;
    height: 500px;
  }
  @media (max-width: 500px) {
    width: 383px;
    height: 500px;
  }
  @media (max-width: 390px) {
    width: 335px;
    height: 400px;
  }
`;

export const PswConstraints = styled.div`
  color: #9a9aaf;
  font-family: "Noto Sans";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 17px; /* 141.667% */
  display: flex;
  justify-items: flex-start;
  width: 100%;
  @media (max-width: 815px) {
  }
  @media (max-width: 500px) {
  }
  @media (max-width: 390px) {
  }
`;

export const TermsCondTextPswd = styled.div`
  color: #9a9aaf;
  font-family: "Noto Sans";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 116.667%;
  leading-trim: both;
  text-edge: cap;
  width: 250px;
  margin-left: 8px;
  span {
    color: #996cfe;
  }
  @media (max-width: 815px) {
  }
  @media (max-width: 500px) {
  }
  @media (max-width: 390px) {
  }
`;

export const ErrorText = styled.div`
  font-family: "Noto Sans";
  color: red;
  width: 100%;
  font-size: 12px;
  margin: -18px 0px;
  text-align: left !important;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
