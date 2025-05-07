import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MainContainer,
  InnerContainer,
  MainHeaderText,
  SubHeaderText,
  Input,
  BackButton,
  VerificationButton,
} from "./style";
import SwiftUniLogo from "../../assets/images/swiftuniLogoo.svg";
import { FlexDiv } from "../../assets/styles/style";
import useMediaQuery from "@mui/material/useMediaQuery";
import CircularProgress from "./CircularLoader";
import SnackbarAlert from "./SnackbarAlert";
import { Base_URL } from "../../Client/apiURL";

const ForgetPassowrd = () => {
  const isScreen815 = useMediaQuery("(max-width:815px)");
  const isScreen500 = useMediaQuery("(max-width:500px)");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarVariant, setSnackbarVariant] = useState("outlined");
  const [snackbarColor, setSnackbarColor] = useState("neutral");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `${Base_URL}/app/users/send-password-reset-mail`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();
      if (data.responseCode === 200) {
        setSnackbarMessage(
          data.message || "A reset link has been sent to your email address."
        );
        setSnackbarVariant("soft");
        setSnackbarColor("success");
        setSnackbarOpen(true);
      } else {
        setSnackbarMessage(
          data.message || "Failed to send reset link. Please try again."
        );
        setSnackbarVariant("outlined");
        setSnackbarColor("danger");
        setSnackbarOpen(true);
      }
    } catch (error) {
      setSnackbarMessage("An error occurred. Please try again.");
      setSnackbarVariant("outlined");
      setSnackbarColor("danger");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  //   useEffect(() => {
  //     const token = searchParams.get("token");
  //     verifyEmailToken(token);
  //   }, [searchParams]);

  //   const verifyEmailToken = async (token) => {
  //     try {
  //       const response = await fetch(
  //         `${Base_URL}/app/users/send-password-reset-mail`,
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({ token: String(token) }),
  //         }
  //       );
  //       const data = await response.json();

  //       if (data.responseCode === 200) {
  //         setVerificationStatus("Verification Successful");
  //         setVerificationMessage(
  //           "Congratulations! Your email has been verified."
  //         );
  //       } else {
  //         setVerificationStatus("Verification Failed");
  //         setVerificationMessage("Your email has not been verified.");
  //       }
  //     } catch (error) {
  //       console.error("Verification error:", error);
  //       setVerificationStatus("Verification Failed. Try again.");
  //     }
  //   };

  return (
    <FlexDiv style={{marginTop:'4%'}}>
      <SnackbarAlert
        open={snackbarOpen}
        setOpen={setSnackbarOpen}
        message={snackbarMessage}
        variant={snackbarVariant}
        color={snackbarColor}
      />
      <MainContainer>
        <InnerContainer>
          <div>
            <img src={SwiftUniLogo} alt="" />
          </div>
          <FlexDiv
            style={{
              flexDirection: "column",
              gap: isScreen815 ? (isScreen500 ? "9px" : "10px") : "12px",
            }}
          >
            <MainHeaderText>Forgot Password?</MainHeaderText>
            <SubHeaderText>
              Enter your email to reset your password.
            </SubHeaderText>
          </FlexDiv>
          <FlexDiv
            style={{
              flexDirection: "column",
              gap: isScreen815 ? (isScreen500 ? "13px" : "15px") : "20px",
              width: '100%'
            }}
          >
            <Input
              required
              placeholder="Please enter you email address"
              value={email}
              onChange={handleEmailChange}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSubmit();
                }
              }}
            />

            <VerificationButton type="submit" onClick={handleSubmit}>
              {loading ? <CircularProgress /> : <div>Submit</div>}
            </VerificationButton>

            {/* <VerificationButton>Submit</VerificationButton> */}
          </FlexDiv>
          <BackButton onClick={() => navigate(-1)}>Back</BackButton>
        </InnerContainer>
      </MainContainer>
    </FlexDiv>
  );
};

export default ForgetPassowrd;
