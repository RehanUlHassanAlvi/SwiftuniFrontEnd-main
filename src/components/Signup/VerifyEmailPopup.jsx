import React from "react";
import {
  MainContainer,
  InnerContainer,
  VerificationIcon,
  VerificationStatus,
  VerificationMessage,
  CloseIconDiv,
  VerificationButton,
} from "./style";
import EmailVerifyIcon from "../../assets/images/verify-email-icon.svg";
import CardCloseIcon from "../../assets/images/carbon_close-filled2.svg";

const VerifyEmailPopup = ({ onClose, sendEmail=()=>{} }) => {
  return (
    <>
      <MainContainer>
        <InnerContainer>
          <VerificationIcon>
            <img src={EmailVerifyIcon} alt="" />
          </VerificationIcon>
          <VerificationStatus>Verify your Email</VerificationStatus>
          <VerificationMessage>
            Please check your email for the verification link
          </VerificationMessage>
          <VerificationButton onClick={sendEmail}>
            Resend Email
          </VerificationButton>
        </InnerContainer>
        <CloseIconDiv onClick={onClose}>
          <img src={CardCloseIcon} alt="" />
        </CloseIconDiv>
      </MainContainer>
    </>
  );
};

export default VerifyEmailPopup;
