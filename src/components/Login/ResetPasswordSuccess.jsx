import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import {
  MainContainerReset,
  InnerContainer,
  MainHeaderText,
  SubHeaderText,
  VerificationButton,
} from "./style";
import { IconBg } from "../Signup/style";
import SwiftUniLogo from "../../assets/images/swiftuniLogoo.svg";
import ResetSuccess from "../../assets/images/ResetSuccess.svg";
import GppBadRoundedIcon from "@mui/icons-material/GppBadRounded";
import { FlexDiv } from "../../assets/styles/style";
import useMediaQuery from "@mui/material/useMediaQuery";

const ResetPasswordSuccess = () => {
  const isScreen815 = useMediaQuery("(max-width:815px)");
  const isScreen500 = useMediaQuery("(max-width:500px)");
  const location = useLocation();
  const navigate = useNavigate();
  const { verificationStatus, verificationMessage } = location.state || {
    verificationStatus: "",
    verificationMessage: "",
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <FlexDiv style={{marginTop:'4%'}}>
      <MainContainerReset>
        <InnerContainer>
          <div>
            <img src={SwiftUniLogo} alt="" />
          </div>
          <FlexDiv
            style={{
              flexDirection: "column",
              gap: isScreen815 ? (isScreen500 ? "30x" : "30px") : "30px",
            }}
          >
            {verificationStatus === "Password Reset Successfully!" ? (
              <>
                <img src={ResetSuccess} alt="Success" />
                <FlexDiv
                  style={{
                    flexDirection: "column",
                    gap: isScreen815 ? (isScreen500 ? "9px" : "10px") : "12px",
                  }}
                >
                  <MainHeaderText>Successful password reset!</MainHeaderText>
                  <SubHeaderText>
                    You can now use your new password to login into to your
                    account
                  </SubHeaderText>
                </FlexDiv>
                <VerificationButton onClick={handleLogin}>
                  Login
                </VerificationButton>
              </>
            ) : verificationStatus === "Password reset not succeeded!" ? (
              <>
                <IconBg>
                  <GppBadRoundedIcon />
                </IconBg>
                <FlexDiv
                  style={{
                    flexDirection: "column",
                    gap: isScreen815 ? (isScreen500 ? "9px" : "10px") : "12px",
                  }}
                >
                  <MainHeaderText>Password reset not succeeded!</MainHeaderText>
                  <SubHeaderText>
                    Your password has not been reset.
                  </SubHeaderText>
                </FlexDiv>
                <VerificationButton onClick={() => navigate("/retry")}>
                  Try Again
                </VerificationButton>
              </>
            ) : null}
          </FlexDiv>
        </InnerContainer>
      </MainContainerReset>
    </FlexDiv>
  );
};

export default ResetPasswordSuccess;
