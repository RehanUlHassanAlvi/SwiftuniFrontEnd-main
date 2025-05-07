import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MainContainerResetPswd,
  InnerContainer,
  MainHeaderText,
  SubHeaderText,
  Input,
  InputWrapper,
  ResendButton,
  PswConstraints,
  TermsCondInputWrapper,
  TermsCondTextPswd,
  VerificationButton,
  ErrorText,
} from "./style";
import { ToggleText } from "../Signup/style";
import SwiftUniLogo from "../../assets/images/swiftuniLogoo.svg";
import { FlexDiv } from "../../assets/styles/style";
import useMediaQuery from "@mui/material/useMediaQuery";
import PasswordValidationHook from "../Signup/PasswordValidationHook";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import SnackbarAlert from "./SnackbarAlert";
import { Tooltip } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { Box } from "@mui/material";
import { Base_URL } from "../../Client/apiURL";

const ResetPassowrd = () => {
  const isScreen815 = useMediaQuery("(max-width:815px)");
  const isScreen500 = useMediaQuery("(max-width:500px)");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState("");
  const [verificationMessage, setVerificationMessage] = useState("");
  const [token, setToken] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarVariant, setSnackbarVariant] = useState("outlined");
  const [snackbarColor, setSnackbarColor] = useState("neutral");

  const {
    password,
    confirmPassword,
    showPassword,
    showConfirmPassword,
    passwordError,
    confirmPasswordError,
    passwordStrengthDetails,
    setPasswordError,
    setConfirmPasswordError,
    handlePasswordChange,
    handleConfirmPasswordChange,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
  } = PasswordValidationHook();

  useEffect(() => {
    const tokenFromParams = searchParams.get("token");
    if (tokenFromParams) {
      setToken(tokenFromParams);
    }
  }, [searchParams]);

  // const displayPasswordCondition = (condition, text) => (
  //   <li style={{ color: condition ? "green" : "inherit" }}>{text}</li>
  // );

  const ResetPassword = async () => {
    setPasswordError("");
    setConfirmPasswordError("");

    if (!password) {
      setPasswordError("Password cannot be empty.");
      return;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Confirm Password cannot be empty.");
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      return;
    }

    if (!isTermsChecked) {
      setSnackbarMessage(
        "You must agree to the terms and conditions to proceed."
      );
      setSnackbarVariant("soft");
      setSnackbarColor("success");
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await fetch(
        `${Base_URL}/app/users/verify-password-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: String(token), password: password }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.responseCode === 200) {
        navigate("/reset-password-status", {
          state: {
            verificationStatus: "Password Reset Successfully!",
            verificationMessage:
              "Congratulations! Your email has been verified.",
          },
        });
      } else {
        if (data.responseCode === 5000 && data.message === "Invalid token") {
          navigate("/reset-password-status", {
            state: {
              verificationStatus: "Password reset not succeeded!",
              verificationMessage:
                "The password reset link has expired. Please request a new one.",
            },
          });
        } else {
          navigate("/reset-password-status", {
            state: {
              verificationStatus: "Password reset not succeeded! Try again.",
              verificationMessage: error.message || "An error occurred.",
            },
          });
        }
      }
    } catch (error) {
      navigate("/reset-password-status", {
        state: {
          verificationStatus: "Password reset not succeeded! Try again.",
          verificationMessage: error.message || "An error occurred.",
        },
      });
    }
  };

  const getProgressBarColor = (conditionMet) => {
    return conditionMet ? "#4CAF50" : "#e0e0e0"; // Green when condition is met, light grey otherwise
  };

  return (
    <FlexDiv style={{marginTop:'4%'}}>
      <SnackbarAlert
        open={snackbarOpen}
        setOpen={setSnackbarOpen}
        message={snackbarMessage}
        variant={snackbarVariant}
        color={snackbarColor}
      />
      <MainContainerResetPswd>
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
            <MainHeaderText>Setup New Password</MainHeaderText>
            <SubHeaderText>
              Have you already reset the password? <span>Sign In</span>
            </SubHeaderText>
          </FlexDiv>
          <FlexDiv
            style={{
              flexDirection: "column",
              gap: isScreen815 ? (isScreen500 ? "13px" : "15px") : "20px",
            }}
          >
            <InputWrapper>
              <Input
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    ResetPassword();
                  }
                }}
              />
              <ToggleText onClick={togglePasswordVisibility}>
                {showPassword ? (
                  <VisibilityRoundedIcon
                    style={{
                      fontSize: "20px",
                      color: "rgba(0, 0, 0, 0.2)",
                      marginTop: "5px",
                    }}
                  />
                ) : (
                  <VisibilityOffRoundedIcon
                    style={{
                      fontSize: "20px",
                      color: "rgba(0, 0, 0, 0.2)",
                      marginTop: "5px",
                    }}
                  />
                )}
              </ToggleText>
            </InputWrapper>
            {/* <Box sx={{ display: 'flex', flexDirection: "column", gap: 2, mt: 2 }}>
              <LinearProgress variant="determinate" value={passwordStrengthDetails.minLength ? 100 : 0} sx={{ width: '20%', bgcolor: 'background.paper', borderRadius: 1, '.MuiLinearProgress-bar': { bgcolor: passwordStrengthDetails.minLength ? '#4CAF50' : '#e0e0e0' } }} />
              <LinearProgress variant="determinate" value={passwordStrengthDetails.upperCase ? 100 : 0} sx={{ width: '20%', bgcolor: 'background.paper', borderRadius: 1, '.MuiLinearProgress-bar': { bgcolor: passwordStrengthDetails.upperCase ? '#4CAF50' : '#e0e0e0' } }} />
              <LinearProgress variant="determinate" value={passwordStrengthDetails.lowerCase ? 100 : 0} sx={{ width: '20%', bgcolor: 'background.paper', borderRadius: 1, '.MuiLinearProgress-bar': { bgcolor: passwordStrengthDetails.lowerCase ? '#4CAF50' : '#e0e0e0' } }} />
              <LinearProgress variant="determinate" value={passwordStrengthDetails.digit ? 100 : 0} sx={{ width: '20%', bgcolor: 'background.paper', borderRadius: 1, '.MuiLinearProgress-bar': { bgcolor: passwordStrengthDetails.digit ? '#4CAF50' : '#e0e0e0' } }} />
              <LinearProgress variant="determinate" value={passwordStrengthDetails.symbol ? 100 : 0} sx={{ width: '20%', bgcolor: 'background.paper', borderRadius: 1, '.MuiLinearProgress-bar': { bgcolor: passwordStrengthDetails.symbol ? '#4CAF50' : '#e0e0e0' } }} />
            </Box> */}
            {passwordError && <ErrorText>{passwordError}</ErrorText>}

            <PswConstraints>
              Use 8 or more characters wit mix of letters, numbers and symbols.
            </PswConstraints>
            {/* <ul>
              {displayPasswordCondition(passwordConditions.minLength, "8 characters minimum")}
              {displayPasswordCondition(passwordConditions.upperCase && passwordConditions.lowerCase, "Upper & lower case letters")}
              {displayPasswordCondition(passwordConditions.digit, "A digit")}
              {displayPasswordCondition(passwordConditions.symbol, "A symbol")}
            </ul> */}

            <InputWrapper>
              <Input
                placeholder="Repeat Password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    ResetPassword();
                  }
                }}
              />
              <ToggleText onClick={toggleConfirmPasswordVisibility}>
                {showConfirmPassword ? (
                  <VisibilityRoundedIcon
                    style={{
                      fontSize: "20px",
                      color: "rgba(0, 0, 0, 0.2)",
                      marginTop: "5px",
                    }}
                  />
                ) : (
                  <VisibilityOffRoundedIcon
                    style={{
                      fontSize: "20px",
                      color: "rgba(0, 0, 0, 0.2)",
                      marginTop: "5px",
                    }}
                  />
                )}
              </ToggleText>
            </InputWrapper>
            {confirmPasswordError && (
              <ErrorText>{confirmPasswordError}</ErrorText>
            )}

            <TermsCondInputWrapper>
              <input
                type={"checkbox"}
                name="agree"
                value={"agree"}
                style={{ marginTop: "0px" }}
                onChange={(e) => setIsTermsChecked(e.target.checked)}
                checked={isTermsChecked}
              />
              <TermsCondTextPswd>
                I accept the <span>terms & conditions</span>
              </TermsCondTextPswd>
            </TermsCondInputWrapper>

            <VerificationButton onClick={ResetPassword}>
              Submit
            </VerificationButton>
          </FlexDiv>
          {/* <ResendButton>
            Didn’t get the code? <span>Resend</span>
          </ResendButton> */}
        </InnerContainer>
      </MainContainerResetPswd>
    </FlexDiv>
  );
};

export default ResetPassowrd;
