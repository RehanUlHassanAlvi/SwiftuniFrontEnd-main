import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MainContainer,
  InnerContainer,
  VerificationIcon,
  VerificationStatus,
  VerificationMessage,
  VerificationButton,
  IconBg,
} from "./style";
import EmailSuccessIcon from "../../assets/images/email-success-icon.svg";
import GppBadRoundedIcon from "@mui/icons-material/GppBadRounded";
import { FlexDiv } from "../../assets/styles/style";
import { Base_URL } from "../../Client/apiURL";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState("Verifying...");
  const [verificationMessage, setVerificationMessage] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    verifyEmailToken(token);
  }, [searchParams]);

  const verifyEmailToken = async (token) => {
    try {
      const response = await fetch(
        `${Base_URL}/app/users/verify-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: String(token) }),
        }
      );
      const data = await response.json();

      if (data.responseCode === 200) {
        setVerificationStatus("Verification Successful");
        setVerificationMessage(
          "Congratulations! Your email has been verified."
        );
      } else {
        setVerificationStatus("Verification Failed");
        setVerificationMessage("Your email has not been verified.");
      }
    } catch (error) {
      console.error("Verification error:", error);
      setVerificationStatus("Verification Failed. Try again.");
    }
  };

  return (
    <FlexDiv>
      <MainContainer>
        <InnerContainer>
          <VerificationIcon>
            {verificationStatus === "Verification Successful" ? (
              <img src={EmailSuccessIcon} alt="Success" />
            ) : verificationStatus === "Verification Failed" ? (
              <IconBg>
                <GppBadRoundedIcon />
              </IconBg>
            ) : null}
          </VerificationIcon>

          <VerificationStatus>{verificationStatus}</VerificationStatus>

          <VerificationMessage>{verificationMessage}</VerificationMessage>

          {verificationStatus === "Verification Successful" ? (
            <VerificationButton onClick={() => navigate("/login")}>
              Continue
            </VerificationButton>
          ) : verificationStatus === "Verification Failed" ? (
            <VerificationButton onClick={() => navigate("/retry")}>
              Try Again
            </VerificationButton>
          ) : null}
        </InnerContainer>
      </MainContainer>
    </FlexDiv>
  );
};

export default VerifyEmail;
