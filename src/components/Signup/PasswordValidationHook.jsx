import { useState } from "react";

const PasswordValidationHook = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [passwordConditions, setPasswordConditions] = useState({
    minLength: false,
    upperCase: false,
    lowerCase: false,
    digit: false,
    symbol: false,
  });
  const [passwordStrengthDetails, setPasswordStrengthDetails] = useState({
    minLength: false,
    upperCase: false,
    lowerCase: false,
    digit: false,
    symbol: false,
  });

  const validatePassword = (inputPassword) => {
    setPasswordConditions({
      minLength: inputPassword.length >= 8,
      upperCase: /[A-Z]/.test(inputPassword),
      lowerCase: /[a-z]/.test(inputPassword),
      digit: /[0-9]/.test(inputPassword),
      symbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(inputPassword),
    });
    setPasswordStrengthDetails({
      minLength: inputPassword.length >= 8,
      upperCase: /[A-Z]/.test(inputPassword),
      lowerCase: /[a-z]/.test(inputPassword),
      digit: /[0-9]/.test(inputPassword),
      symbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(inputPassword),
    });
  };

  const handlePasswordChange = (event) => {
    const inputPassword = event.target.value;
    setPassword(inputPassword);
    validatePassword(inputPassword);
    setPasswordError("");
  };

  const handleConfirmPasswordChange = (event) => {
    const inputConfirmPassword = event.target.value;
    setConfirmPassword(inputConfirmPassword);
    if (password !== inputConfirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return {
    password,
    confirmPassword,
    showPassword,
    showConfirmPassword,
    passwordError,
    confirmPasswordError,
    passwordStrengthDetails,
    passwordConditions,
    setPasswordError,
    setConfirmPasswordError,
    handlePasswordChange,
    handleConfirmPasswordChange,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
  };
};

export default PasswordValidationHook;
