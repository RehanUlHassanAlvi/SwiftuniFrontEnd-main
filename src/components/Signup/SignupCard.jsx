import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Btn, FlexDiv } from "../../assets/styles/style";
import LoginLabel from "../../assets/images/LoginLabel.svg";
import {
  Card,
  ContinueDiv,
  ContinueText,
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
  InputWrapper,
  ToggleText,
  ConstraintsText,
  TextProgressContainer,
  WeakText,
  TermsCondText,
  TermsCondText2,
  OuterFlexDiv,
  VerifyEmailPopUpDiv,
  InputError,
} from "./style";
import Gmail from "../../assets/images/GMail.svg";
import { useMediaQuery } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "../Login/CircularLoader";
import SnackbarAlert from "../Login/SnackbarAlert";
import VerifyEmailPopup from "./VerifyEmailPopup";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Base_URL } from "../../Client/apiURL";
import { useAuth } from "../../authentication/Auth";
import PortalName from "../Login/PortalName";

const calculatePasswordStrength = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password);

  let strength = -1;
  if (password.length >= minLength) {
    strength++;
  }

  if (hasUpperCase) strength++;
  if (hasLowerCase) strength++;
  if (hasNumber) strength++;
  if (hasSymbol) strength++;

  return strength;
};

const SignupCard = () => {
  const isLaptop = useMediaQuery("(max-width:1300px)");
  const isTab = useMediaQuery("(max-width:900px)");
  const isMobile = useMediaQuery("(max-width:500px)");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarVariant, setSnackbarVariant] = useState("outlined");
  const [snackbarColor, setSnackbarColor] = useState("neutral");
  const [isVerifyEmailPopupVisible, setIsVerifyEmailPopupVisible] =
    useState(false);
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [passwordConditions, setPasswordConditions] = useState({
    minLength: false,
    upperCase: false,
    lowerCase: false,
    digit: false,
    symbol: false,
  });
  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [data, setData] = useState(null);

  const navigate = useNavigate();

    const { login } = useAuth();

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
    const inputPassword = event.target.value;
    setPassword(inputPassword);

    setPasswordConditions({
      minLength: inputPassword.length >= 8,
      upperCase: /[A-Z]/.test(inputPassword),
      lowerCase: /[a-z]/.test(inputPassword),
      digit: /[0-9]/.test(inputPassword),
      symbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(inputPassword),
    });

    if (isSubmitAttempted && confirmPassword) {
      if (confirmPassword !== inputPassword) {
        setConfirmPasswordError("Passwords do not match.");
      } else {
        setConfirmPasswordError("");
      }
    }
    if (isSubmitAttempted) {
      if (!inputPassword) {
        setPasswordError("Password field is empty.");
      } else {
        setPasswordError("");
      }
    }
  };

  const handleConfirmPasswordChange = (event) => {
    const inputConfirmPassword = event.target.value;
    setConfirmPassword(inputConfirmPassword);
    if (isSubmitAttempted) {
      if (!inputConfirmPassword) {
        setConfirmPasswordError("Confirm Password field is empty.");
      } else if (inputConfirmPassword !== password) {
        setConfirmPasswordError("Passwords do not match.");
      } else {
        setConfirmPasswordError("");
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

  const handleSignup = async () => {
    setIsSubmitAttempted(true);
    setLoading(true);

    let hasError = false;

    const newFormErrors = {
      name: !name,
      email: !email || !emailRegex.test(email),
      password: !password,
      confirmPassword: !confirmPassword,
    };

    if (!email) {
      setEmailError("Email field is empty.");
      hasError = true;
    } else if (!emailRegex.test(email)) {
      setEmailError("Email format incorrect.");
      hasError = true;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password field is empty.");
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Confirm Password field is empty.");
      hasError = true;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match.");
      hasError = true;
    } else {
      setConfirmPasswordError("");
    }

    setFormErrors(newFormErrors);
    if (Object.values(newFormErrors).some((error) => error) || hasError) {
      setLoading(false);
      return;
    }

    if (!isTermsChecked) {
      setSnackbarMessage(
        "You must agree to the terms and conditions to sign up."
      );
      setSnackbarVariant("filled");
      setSnackbarColor("error");
      setSnackbarOpen(true);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${Base_URL}/app/users/signup-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          countrycode: "+92",
          phonenumber: "333663322",
          portal_id: 1,
        }),
      });
      const data = await response.json();
      if (data.responseCode === 200) {
        toast.success("Signup successful!");
        setIsVerifyEmailPopupVisible(true);
      } else {
        setSnackbarMessage(
          data.message || "An error occurred. Please try again."
        );
        setSnackbarVariant("filled");
        setSnackbarColor("error");
        setSnackbarOpen(true);
      }
    } catch (error) {
      setSnackbarMessage("An error occurred. Please try again.");
      setSnackbarVariant("filled");
      setSnackbarColor("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleVerifyEmailPopupClose = () => {
    setIsVerifyEmailPopupVisible(false);
  };

  const passwordStrength = calculatePasswordStrength(password);
  const progressValue = (passwordStrength / 4) * 100;
  const getProgressColor = (strength) => {
    switch (strength) {
      case 4:
        return "#4CAF50"; // Very Strong (Green)
      case 3:
        return "#4CAF50";
      case 2:
        return "#0000FF";
      default:
        return "#F44336"; // Weak (Red)
    }
  };



  const signupWithGoogle = useGoogleLogin({
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

  useEffect(() => {
    const fetchPortalInfo = async () => {
      try {
        const response = await axios.get(`${Base_URL}/app/users/portals/portal-info`, {
          params: {
            portal_url: 'https://app.swiftuni.com'
          }
        });
        setData(response.data.response);
      } catch (err) {
        console.error("Error fetching portal info:", err);
      }
    };

    fetchPortalInfo();
  }, []);
console.log(data);
  return (
    <div
      style={{ display: "flex", minHeight: "100vh", justifyContent: "center" }}
    >
      <SnackbarAlert
        open={snackbarOpen}
        setOpen={setSnackbarOpen}
        message={snackbarMessage}
        variant={snackbarVariant}
        color={snackbarColor}
      />
      {!isTab && (
        data?.landing_img ?
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
          <img src={data?.landing_img} alt="" style={{width:'100%', height:'100vh'}}/>
        </FlexDiv>
        :
        <div
          style={{
            display: "flex",
            background: "#ffff",
            width: isLaptop ? "50%" : "60%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MainImg alt="" src={LoginLabel} />
        </div>
      )}
      <FlexDiv
        style={{
          width: isLaptop ? "50%" : "40%",
          margin: "10px 0px",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card>
          <MainText style={{ marginTop: "16px" }}>
            <>
              <PortalName text='Sign up to' data={data} />
            </>
          </MainText>
          <FlexDiv
            style={{
              flexDirection: "column",
              justifyContent: "flex-start",
              textAlign: "left",
              gap: isMobile ? "24px" : "24px",
              position: "relative",
            }}
          >
            <Inputs
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (isSubmitAttempted)
                  setFormErrors((prev) => ({ ...prev, name: !e.target.value }));
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSignup();
                }
              }}
            />
            {formErrors.name && isSubmitAttempted && (
              <InputError>Name field is empty.</InputError>
            )}

            <Inputs
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSignup();
                }
              }}
            />
            {emailError && <InputError>{emailError}</InputError>}
            <InputWrapper>
              <Inputs
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSignup();
                  }
                }}
              />
              <ToggleText onClick={togglePasswordVisibility}>
                {showPassword ? "Hide" : "Show"}
              </ToggleText>
            </InputWrapper>
            {passwordError && <InputError>{passwordError}</InputError>}
            <InputWrapper>
              <Inputs
                placeholder="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSignup();
                  }
                }}
              />
              <ToggleText
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </ToggleText>
            </InputWrapper>
            {confirmPasswordError && (
              <InputError>{confirmPasswordError}</InputError>
            )}
          </FlexDiv>

          <FlexDiv
            style={{
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginTop: "15px",
            }}
          >
            <ConstraintsText>
              {/* <ul
                style={{
                  padding: "0",
                  marginLeft: "20px",
                }}
              >
                <li>8 characters minimum</li>
                <li>Upper & lower case letters</li>
                <li>A digit & a symbol</li>
              </ul> */}

              <ul style={{ padding: "0", marginLeft: "20px" }}>
                <li
                  style={{
                    color: passwordConditions.minLength ? "green" : "inherit",
                  }}
                >
                  8 characters minimum
                </li>
                <li
                  style={{
                    color:
                      passwordConditions.upperCase &&
                      passwordConditions.lowerCase
                        ? "green"
                        : "inherit",
                  }}
                >
                  Upper & lower case letters
                </li>
                <li
                  style={{
                    color:
                      passwordConditions.digit && passwordConditions.symbol
                        ? "green"
                        : "inherit",
                  }}
                >
                  A digit & a symbol
                </li>
              </ul>

              {/* <ul style={{ padding: "0", marginLeft: "20px" }}>
                 <li style={{ color: passwordConditions.minLength ? 'green' : 'inherit' }}>8 characters minimum</li>
                  <li>
                    <span style={{ color: passwordConditions.upperCase ? 'green' : 'inherit' }}>Upper case letter</span> &amp; 
                    <span style={{ color: passwordConditions.lowerCase ? 'green' : 'inherit' }}> lower case letter</span>
                  </li>
                  <li>
                      <span style={{ color: passwordConditions.digit ? 'green' : 'inherit' }}>A digit</span> &amp; 
                      <span style={{ color: passwordConditions.symbol ? 'green' : 'inherit' }}> a symbol</span>
                  </li>
             </ul> */}
            </ConstraintsText>

            <TextProgressContainer style={{ marginTop: "15px" }}>
              <WeakText style={{ color: getProgressColor(passwordStrength) }}>
                {passwordStrength === 4
                  ? "Very Strong"
                  : passwordStrength === 3
                  ? "Strong"
                  : passwordStrength === 2
                  ? "Medium"
                  : "Weak"}
              </WeakText>
              <LinearProgress
                variant="determinate"
                value={progressValue}
                sx={{
                  width: "116px",
                  borderRadius: "5px",
                  height: "8px",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: getProgressColor(passwordStrength),
                  },
                  "@media (max-width: 500px)": {
                    width: "75px",
                  },
                  // "@media (max-width: 1440px)": {
                  //   width: "75px",
                  // },
                }}
              />
            </TextProgressContainer>
          </FlexDiv>

          <FlexDiv
            style={{
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            <input
              type={"checkbox"}
              name="agree"
              value={"agree"}
              style={{ marginTop: "5px" }}
              onChange={(e) => setIsTermsChecked(e.target.checked)}
              checked={isTermsChecked}
            />
            {/* <TermsCondText>
              By clicking Sign Up, you are agreeing to the <span>T&Cs</span> and{" "}
              <span>Privacy Policy</span>
            </TermsCondText> */}
            <TermsCondText style={{marginTop: '-0.5px'}}>
              By clicking Sign Up, you are agreeing to the&nbsp;
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to="https://swiftuni.com/terms-of-use/"
                target="_blank"
              >
                <span>T&Cs</span>
              </Link>
              &nbsp;and&nbsp;
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to="https://swiftuni.com/privacy-policy/"
                target="_blank"
              >
                <span>Privacy Policy</span>
              </Link>
              .
            </TermsCondText>
          </FlexDiv>
          <Btn onClick={handleSignup}>
            <ContinueDiv>
              {loading ? (
                <CircularProgress disableShrink />
              ) : (
                <FlexDiv
                  style={{
                    height: "100%",
                    gap: "4px",
                  }}
                >
                  <ContinueText>Sign Up</ContinueText>
                </FlexDiv>
              )}
            </ContinueDiv>
          </Btn>
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
          <GoogleDiv onClick={signupWithGoogle}>
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
                <GoogleText>Sign up with Google</GoogleText>
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
            <HaveAnAccount>Already have an account?</HaveAnAccount>
            <Btn
              onClick={() => {
                navigate("/login");
              }}
            >
              <SignUpText>Login</SignUpText>
            </Btn>
          </FlexDiv>
        </Card>
        {/* <TermsCondText2>
          <div style={{ margin: "20px 0px 0px 20px", alignSelf: "flex-end" }}>
            <span>Terms of Service</span> and <span>Privacy Policy</span>
          </div>
        </TermsCondText2> */}
        <TermsCondText2>
          <div style={{ margin: "20px 0px 0px 20px", alignSelf: "flex-end" }}>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to="https://swiftuni.com/terms-of-service/"
              target="_blank"
            >
              <span>Terms of Service</span>
            </Link>
            &nbsp;and&nbsp;
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to="https://swiftuni.com/privacy-policy/"
              target="_blank"
            >
              <span>Privacy Policy</span>
            </Link>
          </div>
        </TermsCondText2>
      </FlexDiv>
      {isVerifyEmailPopupVisible && (
        <VerifyEmailPopUpDiv>
          <VerifyEmailPopup
            onClose={() => setIsVerifyEmailPopupVisible(false)}
            sendEmail={resendEmailVerification}
          />
        </VerifyEmailPopUpDiv>
      )}
    </div>
  );
};

export default SignupCard;
