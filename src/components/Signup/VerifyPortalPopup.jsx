import React from "react";
import {
  PopupWrapper,
  PopupContent,
  PopupIcon,
  PopupTitle,
  PopupMessage,
  CloseButtonContainer,
  PopupActionButton,
} from "./style";
import PortalVerifyIcon from "../../assets/images/portal-conflict.png";
import CardCloseIcon from "../../assets/images/carbon_close-filled2.svg";

const VerifyPortalPopup = ({ onClose, message }) => {

  const fallbackMessage = message || "This user exists in another portal. Please contact the relevant portal team for assistance.";

  const extractPortalLink = (message) => {
    const regex = /(https?:\/\/[^\s]+)/;
    const match = message.match(regex);
    return match ? match[0] : null;
  };

  const portalLink = extractPortalLink(fallbackMessage);
  const messageWithLink = portalLink
    ? fallbackMessage.replace(portalLink,`<a href="${portalLink}" target="_blank" rel="noopener noreferrer">${portalLink}</a>`)
    : fallbackMessage;

  return (
    <PopupWrapper>
      <PopupContent>
        <PopupIcon>
          <img
            src={PortalVerifyIcon}
            alt="Verify Portal"
            style={{ width: 150 }}
          />
        </PopupIcon>
        <PopupTitle>Portal Conflict</PopupTitle>
        <PopupMessage dangerouslySetInnerHTML={{ __html: messageWithLink }} />
        <PopupActionButton onClick={onClose}>Close</PopupActionButton>
      </PopupContent>
      {/* <CloseButtonContainer onClick={onClose}>
        <img src={CardCloseIcon} alt="Close" />
      </CloseButtonContainer> */}
    </PopupWrapper>
  );
};

export default VerifyPortalPopup;
