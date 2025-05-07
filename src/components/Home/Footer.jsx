import React from "react";
import {
  FooterInnerLeft,
  FooterInnerRight,
  FooterOuter,
  FooterText,
  AllRightsText,
} from "./style";
import { FlexDiv } from "../../assets/styles/style";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const isTab = useMediaQuery("(max-width:730px)");
  const navigate = useNavigate();

  const currentYear = new Date().getFullYear();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  };

  return (
    <FlexDiv
      style={{
        background: "#fff",
        width: "100%",
      }}
    >
      <FooterOuter>
        <FooterInnerLeft>
          <FlexDiv style={{ gap: "1.25rem" }}>
            <FooterText onClick={() => navigate("/contact-us")}>Contact</FooterText>
            <FooterText onClick={() => openInNewTab("https://swiftuni.com/disclaimer/")}>Disclaimer</FooterText>
            {isTab ? (
              <FooterText onClick={() => openInNewTab("https://swiftuni.com/terms-of-use/")}>
                Terms & Conditions
              </FooterText>
            ) : (
              <FooterText onClick={() => openInNewTab("https://swiftuni.com/refund-policy/")}>
                Refund & Cancellation Policy
              </FooterText>
            )}
          </FlexDiv>
          <FlexDiv style={{ gap: "1.25rem" }}>
            <FooterText onClick={() => openInNewTab("https://swiftuni.com/privacy-policy/")}>
              Privacy Policy
            </FooterText>
            {isTab ? (
              <FooterText onClick={() => openInNewTab("https://swiftuni.com/refund-policy/")}>
                Refund & Cancellation Policy
              </FooterText>
            ) : (
              <FooterText onClick={() => openInNewTab("https://swiftuni.com/terms-of-use/")}>
                Terms & Conditions
              </FooterText>
            )}
          </FlexDiv>
        </FooterInnerLeft>

        <FooterInnerRight>
          <AllRightsText>All rights reserved © SwiftUni {currentYear}</AllRightsText>
        </FooterInnerRight>
      </FooterOuter>
    </FlexDiv>
  );
};

export default Footer;
