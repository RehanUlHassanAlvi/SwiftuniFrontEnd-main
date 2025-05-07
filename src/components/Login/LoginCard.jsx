import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Btn, FlexDiv } from "../../assets/styles/style";
import Modal from "react-modal";
import LoginLabel from "../../assets/images/LoginLabel.svg";
import {
  Arrow,
  Card,
  ContinueDiv,
  ContinueText,
  CredenialsText,
  ForgotPass,
  GmailLogo,
  GoogleDiv,
  GoogleText,
  HaveAnAccount,
  Inputs,
  Line,
  MainImg,
  MainText,
  OR,
  SignUpText,
  SwiftLogoImg,
} from "./style";
import {
  InputErrorLogin,
  PowerdBySwiftuniText,
  TermsCondText2,
} from "../Signup/style";
import { InputWrapper, ToggleText } from "../Signup/style";
import SwiftLogo from "../../assets/images/navlogo.svg";
import ArrowImg from "../../assets/images/ContinueArrow.svg";
import Gmail from "../../assets/images/GMail.svg";
import { useMediaQuery } from "@mui/material";
import CircularProgress from "./CircularLoader";
import SnackbarAlert from "./SnackbarAlert";
import { useAuth } from "../../authentication/Auth";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Base_URL } from "../../Client/apiURL";
import VerifyEmailPopup from "../Signup/VerifyEmailPopup";
import { VerifyEmailPopUpDiv } from "../Signup/style";
import VerifyPortalPopup from "../Signup/VerifyPortalPopup";
import PortalName from "./PortalName";
import toast from "react-hot-toast";

const LoginCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarVariant, setSnackbarVariant] = useState("outlined");
  const [snackbarColor, setSnackbarColor] = useState("neutral");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);
  const navigate = useNavigate();
  const isLaptop = useMediaQuery("(max-width:1300px)");
  const isTab = useMediaQuery("(max-width:900px)");
  const [isVerifyEmailPopupVisible, setIsVerifyEmailPopupVisible] = useState(false);
  const [data, setData] = useState(null);
  const [isOtherPortal, setIsOtherPortal] = useState(null);
  const [isVerifyPortalPopupVisible, setIsVerifyPortalPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");


useEffect(() => {
  const fetchPortalInfo = async () => {
    try {
      let portalURL = window.location.origin;

      if (
        portalURL.includes("localhost") ||
        portalURL === "https://staging.swiftuni.com" ||
        portalURL === "https://app.swiftuni.com"
      ) {
        setIsOtherPortal(false);
      } else {
        setIsOtherPortal(true);
      }

      if (
        portalURL.includes("localhost") || portalURL === "https://staging.swiftuni.com"
      ) {
        portalURL = "https://app.swiftuni.com";
      }

      const response = await axios.get(
        `${Base_URL}/app/users/portals/portal-info`,
        {
          params: {
            portal_url: portalURL,
          },
        }
      );

      if (response.data.responseCode === 200) {
        const portalData = response.data.response;
        setData(portalData);
        localStorage.setItem("portalData", JSON.stringify(portalData));
      } else {
        setSnackbarMessage(response.data.message + '. Recheck your Portal URL.' || "An unexpected error occurred.");
        setSnackbarVariant("soft");
        setSnackbarColor("danger");
        setSnackbarOpen(true);

      }
    } catch (err) {
      console.error("Error fetching portal info:", err);
      toast.error("Failed to fetch portal information. Please try again later.");
    }
  };

  fetchPortalInfo();
}, []);

  const emailRegex = /\S+@\S+\.\S+/;
  const handleEmailChange = (event) => {
    const emailInput = event.target.value;
    setEmail(emailInput);
    setEmailError("");
    if (isSubmitAttempted) {
      if (!emailInput) {
        setEmailError("Email field is empty.");
      } else if (!emailRegex.test(emailInput)) {
        setEmailError("Email format incorrect.");
      } else {
        setEmailError("");
      }
    }
  };

  const handlePasswordChange = (event) => {
    const passwordInput = event.target.value;
    setPassword(passwordInput);
    setPasswordError("");
    if (isSubmitAttempted) {
      if (!passwordInput) {
        setPasswordError("Password field is empty.");
      } else {
        setPasswordError("");
      }
    }
  };

  const resendEmailVerification = async () => {
    try {
      await axios.post(`${Base_URL}/app/users/resend-email-verification`, {
        email: email,
      });
      setSnackbarMessage("Email Sent");
      setSnackbarVariant("soft");
      setSnackbarColor("success");
      setSnackbarOpen(true);
      setIsVerifyEmailPopupVisible(false);
    } catch (error) {
      console.error(
        "Error resending email verification link:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleForgetPassword = () => {
    navigate("/forget-password");
  };

  const { login } = useAuth();

  const handleLogin = async () => {
    setIsSubmitAttempted(true);

    let hasErrors = false;

    if (!email) {
      setEmailError("Email field is empty.");
      hasErrors = true;
    } else if (!emailRegex.test(email)) {
      setEmailError("Email format incorrect.");
      hasErrors = true;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password field is empty.");
      hasErrors = true;
    } else {
      setPasswordError("");
    }

    if (hasErrors) {
      setLoading(false);
      return;
    }

    setLoading(true);

    const portalid = data?.id;

    if (!portalid) {
      console.error("No valid portal id found.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${Base_URL}/app/users/login-user`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          portal_id: portalid,
        }),
      });
      const data = await response.json();

      if (response.ok && data.responseCode === 200) {
        localStorage.setItem("loggedIn", "true");

        const loggedInData = data.response;
        const loginType = 'Email Login';

        const userDataWithPortalId = {
          ...loggedInData,
          PortalId: portalid,
          loginType: loginType,
        };

        login(userDataWithPortalId);

        navigate("/");
      } else {
        if (data.message && data.message.includes("User exists in")) {
          const portalLink = data.message.split("User exists in")[1].trim();
          const conflictMessage = `This user exists in ${portalLink} & If you want to log in to a new portal, please contact the existing portal team to remove you from their system.`;
          setPopupMessage(conflictMessage);
          setIsVerifyPortalPopupVisible(true);
          return;
        }

        switch (data.responseCode) {
          case 400:
            setSnackbarMessage("Bad request. Please check your input.");
            break;
          case 401:
            setSnackbarMessage("Unauthorized. Invalid credentials.");
            break;
          case 403:
            setSnackbarMessage("Forbidden. You don't have access.");
            break;
          case 404:
            setSnackbarMessage("Endpoint not found.");
            break;
          case 500:
            setSnackbarMessage(
              "Server error. Please try again later or contact the team."
            );
            break;
          default:
            setSnackbarMessage(data.message || "An unexpected error occurred.");
        }

        setSnackbarVariant("soft");
        setSnackbarColor("danger");
        setSnackbarOpen(true);

        if (data.message === "Your Email is not verified") {
          setIsVerifyEmailPopupVisible(true);
        }
      }
    } catch (error) {
      setSnackbarMessage("An error occurred. Please try again.");
      setSnackbarVariant("soft");
      setSnackbarColor("danger");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${Base_URL}/app/users/user-google-response`,
          { access_token: tokenResponse.access_token },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const googleUser = response.data.response;

        const portalid = data?.id;

        if (!portalid) {
          console.error("No valid portal id found.");
          setLoading(false);
          return;
        }

        const backendResponse = await fetch(
          `${Base_URL}/app/users/signup-with-auth`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", 
            body: JSON.stringify({
              name: googleUser.name,
              email: googleUser.email,
              google_id: googleUser.id,
              portal_id: portalid,
            }),
          }
        );
        
        const resData = await backendResponse.json();

        if (resData.responseCode === 200) {
          setSnackbarMessage(resData.message || "Login successful");
          setSnackbarVariant("soft");
          setSnackbarColor("success");
          setSnackbarOpen(true);
          setTimeout(() => {
            login(resData.response);
            navigate("/");
          }, 1000);
        } else {
          setSnackbarMessage(resData.message || "An error occurred. Please try again.");
          setSnackbarVariant("outlined");
          setSnackbarColor("danger");
          setSnackbarOpen(true);
        }
      } catch (error) {
        console.error("Error during Google Sign-In:", error);
        setSnackbarMessage("An error occurred. Please try again.");
        setSnackbarVariant("outlined");
        setSnackbarColor("danger");
        setSnackbarOpen(true);
      } finally {
        setIsLoading(false);
      }
    },
    onError: (error) => console.log("Login Failed:", error),
    flow: "implicit",
    scope: "profile email",
    cookiePolicy: "single_host_origin",
  });

  const modalStyle = {
    overlay: {
      zIndex: 1002,
      backdropFilter: "blur(5px)",
      WebkitBackdropFilter: "blur(5px)",
      background: "rgba(0, 0, 0, 0.5)",
    },
    content: {
      border: "none",
      background: "transparent",
      inset: "0px",
      padding: "20px 1%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const scorecardElement = document.getElementById("VerifyEmailPopup");
      if (scorecardElement && !scorecardElement.contains(event.target)) {
        setIsVerifyEmailPopupVisible(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const scorecardElement = document.getElementById("VerifyPortalPopup");
      if (scorecardElement && !scorecardElement.contains(event.target)) {
        setIsVerifyPortalPopupVisible(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <FlexDiv
      style={{
        height: "100vh",
      }}
    >
      <SnackbarAlert
        open={snackbarOpen}
        setOpen={setSnackbarOpen}
        message={snackbarMessage}
        variant={snackbarVariant}
        color={snackbarColor}
        // fromTop=""
      />

      {/* <div id="VerifyEmailPopup"> */}
      <Modal isOpen={isVerifyEmailPopupVisible} style={modalStyle}>
        <VerifyEmailPopup
          onClose={() => setIsVerifyEmailPopupVisible(false)}
          sendEmail={resendEmailVerification}
        />
      </Modal>
      {/* </div> */}

      {/* <div id="VerifyPortalPopup"> */}
      <Modal isOpen={isVerifyPortalPopupVisible} style={modalStyle}>
        <VerifyPortalPopup
          onClose={() => setIsVerifyPortalPopupVisible(false)}
          message={popupMessage}
        />
      </Modal>
      {/* </div> */}

      {!isTab &&
        (data?.landing_img ? (
          <FlexDiv
            style={{
              backgroundImage: `url(${data?.landing_img})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              height: "100%",
              width: isLaptop ? "50%" : "60%",
            }}
          >
            <img
              src={data?.landing_img}
              alt=""
              style={{ width: "100%", height: "100vh" }}
            />
          </FlexDiv>
        ) : (
          <FlexDiv
            style={{
              background: "#ffff",
              height: "100%",
              width: isLaptop ? "50%" : "60%",
            }}
          ></FlexDiv>
        ))}
      <FlexDiv
        style={{
          width: isLaptop ? "50%" : "40%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card>
          {isOtherPortal === null ? null : !isOtherPortal ? (
            <>
              {/* <ImageDiv> */}
              <SwiftLogoImg alt="" src={SwiftLogo} />
              {/* </ImageDiv> */}
            </>
          ) : (
            <>
              {data?.portal_logo && (
                <>
                  <SwiftLogoImg alt="" src={data?.portal_logo} />
                </>
              )}
            </>
          )}

          {/* Sign in to */}
          <MainText style={{ marginTop: "16px" }}>
            <>
              <PortalName text='Sign in to' data={data} />
            </>
          </MainText>
          
          <CredenialsText style={{ marginTop: "40px", marginBottom: "8px" }}>
            Email
          </CredenialsText>
          <Inputs
            placeholder="Your email address"
            value={email}
            onChange={handleEmailChange}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleLogin();
              }
            }}
          />
          {emailError && (
            <InputErrorLogin style={{ marginBottom: "-15px" }}>
              {emailError}
            </InputErrorLogin>
          )}
          <FlexDiv
            style={{
              alignItems: "flex-end",
              // gap: isMobile ? "130px" : "208px",
              justifyContent: "space-between",
            }}
          >
            <CredenialsText style={{ marginTop: "16px" }}>
              Password
            </CredenialsText>
            <ForgotPass onClick={handleForgetPassword}>
              Forgot your password?
            </ForgotPass>
          </FlexDiv>
          <InputWrapper style={{ marginTop: "8px" }}>
            <Inputs
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleLogin();
                }
              }}
            />
            <ToggleText onClick={togglePasswordVisibility}>
              {showPassword ? "Hide" : "Show"}
            </ToggleText>
          </InputWrapper>
          {passwordError && (
            <InputErrorLogin style={{ marginBottom: "-15px" }}>
              {passwordError}
            </InputErrorLogin>
          )}
          <Btn onClick={handleLogin}>
            <ContinueDiv>
              {loading ? (
                <CircularProgress />
              ) : (
                <FlexDiv
                  style={{
                    height: "100%",
                    gap: "4px",
                  }}
                >
                  <ContinueText>Continue</ContinueText>
                  <Arrow alt="" src={ArrowImg} />
                </FlexDiv>
              )}
            </ContinueDiv>
          </Btn>
          {isOtherPortal === null
            ? null
            : !isOtherPortal && (
                <>
                  <FlexDiv
                    style={{
                      marginTop: "16px",
                      gap: "8px",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Line />
                    <OR>OR</OR>
                    <Line />
                  </FlexDiv>
                  <GoogleDiv onClick={loginWithGoogle}>
                    {isloading ? (
                      <CircularProgress color={"black"} />
                    ) : (
                      <FlexDiv
                        style={{
                          height: "100%",
                          gap: "8px",
                        }}
                      >
                        <GmailLogo alt="" src={Gmail} />
                        <GoogleText>Sign in with Google</GoogleText>
                      </FlexDiv>
                    )}
                  </GoogleDiv>
                  <FlexDiv
                    style={{
                      marginTop: "20px",
                      gap: "4px",
                      justifyContent: "flex-start",
                    }}
                  >
                    <HaveAnAccount>Don’t have an account?</HaveAnAccount>
                    <Btn
                      onClick={() => {
                        navigate("/signup");
                      }}
                    >
                      <SignUpText>Sign Up</SignUpText>
                    </Btn>
                  </FlexDiv>
                </>
              )}
        </Card>

        {isOtherPortal === null ? null : !isOtherPortal ? (
          <>
            <TermsCondText2>
              <div
                style={{
                  margin: "20px 0px 0px 0px",
                  alignSelf: "flex-end",
                }}
              >
                <Link
                  style={{ display: "contents" }}
                  // to="/terms-and-conditions"
                  to="https://swiftuni.com/terms-of-use/"
                  target="_blank"
                >
                  <span>Terms & Conditions</span>
                </Link>{" "}
                and{" "}
                <Link
                  style={{ display: "contents" }}
                  // to="/refund-policy"
                  to="https://swiftuni.com/refund-policy/"
                  target="_blank"
                >
                  <span>Refund Policy</span>
                </Link>
              </div>
            </TermsCondText2>
          </>
        ) : (
          <FlexDiv>
            <PowerdBySwiftuniText>
              <div>Powerd by</div>
              <Link
                style={{ display: "contents", color: "#996cfe" }}
                to="https://swiftuni.com"
                target="_blank"
              >
                Swiftuni
              </Link>
            </PowerdBySwiftuniText>
          </FlexDiv>
        )}
      </FlexDiv>
    </FlexDiv>
  );
};

export default LoginCard;
