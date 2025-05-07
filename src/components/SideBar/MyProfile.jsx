import React, { useState, useEffect } from "react";
import {
  SideCardContainerProfile,
  Avatar2,
  UserIdText,
  ProfileNameSection,
  ProfileName,
  InputFieldsSection,
  InputContainer,
  InputLabel,
  InputField,
  InputFieldPhone,
  BtnsContainer,
  PasswordBtn,
  UpdateBtn,
  StyledFormControl,
  CustomAutocomplete,
  CountryCodeAndPhoneDiv,
  UsersNameID,
} from "./style";
import ProfileEditIcon from "../../assets/images/profile-edit-icon.svg";
import { TextField } from "@mui/material";
import { countryCodes } from "./data";
import SnackbarAlert from "../Login/SnackbarAlert";
import CircularProgress from "../Login/CircularLoader";
import UserAvatar from "../../assets/images/user-avatar.png";
import { styled } from "@mui/material/styles";
import Select from "react-select";
import { Base_URL } from "../../Client/apiURL";

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
      transition: "border 0.3s, box-shadow 0.3s;",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(153, 108, 254, 0.5)",
      borderWidth: "1px",
      borderStyle: "solid",
      boxShadow: "0 0 8px rgba(153, 108, 254, 0.5)",
    },
  },
}));

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: "100%",
    height: "44px",
    borderRadius: "4px",
    border: "1px solid var(--White-Theme-Gray---3, #c6cbd9)",
    boxShadow: state.isFocused ? "0 0 8px rgba(153, 108, 254, 0.5)" : "none",
    padding: "0px",
    display: "flex",
    alignItems: "center",
    transition: "border 0.3s, box-shadow 0.3s",
    color: "#9A9AAF",
    fontSize: "1rem",
    lineHeight: "normal",
    cursor: "pointer",
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 13000,
    backgroundColor: "white",
    padding: "4px 0px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    border: "1px solid #ddd",
    marginTop: "4px",
    boxShadow: "0px 4px 6px rgba(0, 0, 1, 0.1)",
  }),
  menuList: (provided) => ({
    ...provided,
    padding: "0px 3px",
    maxHeight: "170px",
    // overflowY: "auto",
    scrollbarWidth: "thin",
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "white",
      borderRadius: "30px",
    },
    "&::-webkit-scrollbar-track": {
      background: "white",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#996CFE" : "white",
    color: state.isSelected ? "#FFF" : "#9A9AAF",
    padding: "5px 5px",
    fontSize: "12px",
    fontWeight: 400,
    borderRadius: "0.25rem",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#996CFE",
      color: "#FFF",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#9A9AAF",
    fontSize: "14px",
    fontWeight: 400,
  }),
  input: (provided) => ({
    ...provided,
    fontSize: "1rem",
    lineHeight: "normal",
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: "#666",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
    transition: "transform 0.3s ease",
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
};

const MyProfile = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarVariant, setSnackbarVariant] = useState("outlined");
  const [snackbarColor, setSnackbarColor] = useState("neutral");
  const [userData, setUserData] = useState(null);
  const [loginType, setLoginType] = useState(null);
  const [email, setEmail] = useState(null);
  const [id, setId] = useState(null);
  const [country, setCountry] = useState(null);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [preImgUrl, setPreImgUrl] = useState(null);
  const [img, setImg] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedUserDataString = localStorage.getItem("userData");
    if (storedUserDataString) {
      const storedUserData = JSON.parse(storedUserDataString);
      if (storedUserData && storedUserData.UserName) {
        setUserData(storedUserData.UserName);
        setEmail(storedUserData.Email);
        setId(storedUserData.UserId);
        setPreImgUrl(storedUserData.ImageUrl);
        setName(storedUserData.UserName);
        setPhoneNumber(storedUserData.PhoneNumber);
        setCity(storedUserData.City);
        setLoginType(storedUserData.loginType)
        const countryCodeObj = countryCodes.find(
          (c) => c.dialCode === storedUserData.CountryCode
        );
        // setCountry(countryCodeObj || null);
        if (countryCodeObj) {
          setCountry({
            value: countryCodeObj.dialCode,
            label: `${countryCodeObj.label} (${countryCodeObj.dialCode})`,
          });
        }
      }
    }
  }, []);

  const handleUpdateUser = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("countrycode", country ? country.value : "");
      formData.append("phonenumber", phoneNumber);
      formData.append("city", city);
      formData.append("pre_img_url", preImgUrl);
      if (img) {
        formData.append("img", img);
      }

      const response = await fetch(
        `${Base_URL}/app/users/update-user`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      const result = await response.json();

      if (response.ok && result.responseCode === 200) {
        const updatedUserData = {
          ...JSON.parse(localStorage.getItem("userData")),
          UserName: result.response.UserName,
          Email: email,
          UserId: id,
          CountryCode: country ? country.value : "",
          PhoneNumber: result.response.PhoneNumber,
          City: result.response.City,
          ImageUrl: result.response.ImageUrl,
        };

        localStorage.setItem("userData", JSON.stringify(updatedUserData));

        setSnackbarMessage(result.message || "Profile Updated Successfully");
        setSnackbarVariant("soft");
        setSnackbarColor("success");
        setSnackbarOpen(true);
        // router.reload();
      } else {
        setSnackbarMessage(result.message || "Failed to update user data");
        setSnackbarVariant("filled");
        setSnackbarColor("error");
        setSnackbarOpen(true);
      }
    } catch (error) {
      setSnackbarMessage("Error updating user data");
      setSnackbarVariant("filled");
      setSnackbarColor("error");
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImg(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const options = countryCodes.map((country) => ({
    value: country.dialCode,
    label: `${country.label} (${country.dialCode})`,
  }));

  const handleSelectChange = (selectedOption) => {
    setCountry(selectedOption);
  };

  return (
    <>
      <SnackbarAlert
        open={snackbarOpen}
        setOpen={setSnackbarOpen}
        message={snackbarMessage}
        variant={snackbarVariant}
        color={snackbarColor}
      />
      <SideCardContainerProfile>
        <ProfileNameSection>
          <label htmlFor="fileInput">
            <Avatar2
              src={imgPreview || preImgUrl || UserAvatar}
              alt="user image"
            />
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <img
              src={ProfileEditIcon}
              alt=""
              style={{
                position: "absolute",
                left: "3.1rem",
                bottom: "0.5rem",
                cursor: "pointer",
              }}
            />
          </label>
          <UsersNameID>
            {userData ? (
              <ProfileName>{userData}</ProfileName>
            ) : (
              <ProfileName>{"loading..."}</ProfileName>
            )}
            <UserIdText>{`User #${id}`}</UserIdText>
            <UserIdText>Login Type: {loginType === 'Email Login' ? 'Email' : 'Google'}</UserIdText>
          </UsersNameID>
        </ProfileNameSection>

        <InputFieldsSection>
          <InputContainer>
            <InputLabel>Name</InputLabel>
            <InputField
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </InputContainer>

          <InputContainer>
            <InputLabel>Phone</InputLabel>
            <CountryCodeAndPhoneDiv>
              <StyledFormControl>
                <Select
                  value={country}
                  onChange={handleSelectChange}
                  options={options}
                  styles={customStyles}
                  placeholder="Country"
                />

                {/* 
                <CustomAutocomplete
                  value={country}
                  onChange={(event, newValue) => {
                    setCountry(newValue);
                  }}
                  options={countryCodes}
                  getOptionLabel={(option) =>
                    `${option.label} (${option.dialCode})`
                  }
                  isOptionEqualToValue={(option, value) =>
                    option.dialCode === value.dialCode
                  }
                  renderInput={(params) => (
                    <CustomTextField {...params} placeholder="Country" />
                  )}
                /> */}
              </StyledFormControl>
              <InputFieldPhone
                placeholder="Your Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </CountryCodeAndPhoneDiv>
          </InputContainer>

          <InputContainer>
            <InputLabel>City</InputLabel>
            <InputField
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </InputContainer>

          <InputContainer>
            <InputLabel>Email</InputLabel>
            <InputField
              placeholder="Enter Your Email"
              value={email ? email : ""}
              disabled
            />
          </InputContainer>

          {/* <InputContainer>
            <InputLabel>Password</InputLabel>
            <BtnsContainer>
              <PasswordBtn>Password</PasswordBtn>
            </BtnsContainer>
          </InputContainer> */}

          <InputContainer style={{marginTop: '1.2rem'}}>
            <InputLabel></InputLabel>
            <BtnsContainer>
              {isLoading ? (
                <UpdateBtn onClick={handleUpdateUser}>
                  <CircularProgress disableShrink size={20} />
                </UpdateBtn>
              ) : (
                <UpdateBtn onClick={handleUpdateUser}>Update</UpdateBtn>
              )}
            </BtnsContainer>
          </InputContainer>
        </InputFieldsSection>
      </SideCardContainerProfile>
    </>
  );
};

export default MyProfile;
