import React, { useState, useRef } from "react";
import CancelIcon from "../../assets/images/carbon_close-filled.svg";
import ContentCopy from "../../assets/images/content_copy.svg";
import { FlexDiv } from "../../assets/styles/style";
import {
  PopupHeader,
  PopupTitleText,
  PopupWhiteDiv,
  DeleteYesBtn,
  CTCimg3,
  CardInfoName,
} from "../SideBar/style";
import { Tooltip } from "react-tooltip";

const PaymentConfirmedPopup = ({ close, referenceNo }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const referenceRef = useRef(null);

  const copyToClipboard = (ref) => {
    const text = ref.current.innerText;
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setShowTooltip(true);
        setTimeout(() => {
          setShowTooltip(false);
        }, 1000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div id="popup-card">
      <PopupHeader style={{ padding: "0 1rem" }}>
        <FlexDiv
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <PopupTitleText style={{ color: "#fff", fontSize: "1.1rem" }}>
            Payment Confirmed
          </PopupTitleText>
          <img
            src={CancelIcon}
            alt="Close"
            style={{
              width: "20px",
              height: "20px",
              cursor: "pointer",
              position: "absolute",
              right: "0",
            }}
            onClick={() => close(false)}
          />
        </FlexDiv>
      </PopupHeader>

      <PopupWhiteDiv
        style={{
          height: "13rem",
          padding: "1rem 1rem 1.4rem 1rem",
          gap: "0.5rem",
          background: "#f7f7f7",
        }}
      >
        <PopupTitleText style={{ color: "green", marginTop: "1rem" }}>
          Your payment has been confirmed. Please note down your transaction
          reference number below or copy it for future reference in case of any
          issues:
        </PopupTitleText>

        <PopupTitleText
          style={{
            marginBottom: "-0.5rem",
            marginTop: "1rem",
          }}
        >
          Transaction Ref. No.
        </PopupTitleText>
        <FlexDiv
          style={{
            marginTop: "0.5rem",
            justifyContent: "center",
            position: "relative",
            background: "#fff",
            borderRadius: "6px",
            padding: "5px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CardInfoName
            ref={referenceRef}
            style={{
              color: showTooltip
                ? "#996CFE"
                : "var(--White-Theme-Gray---10, #16161e)",
              cursor: "pointer",
              textAlign: "center",
            }}
            onClick={() => copyToClipboard(referenceRef)}
          >
            {referenceNo}
          </CardInfoName>
          <CTCimg3
            src={ContentCopy}
            alt="Copy to clipboard"
            clicked={showTooltip}
            onClick={() => copyToClipboard(referenceRef)}
            style={{ cursor: "pointer", marginLeft: "10px" }}
            data-tooltip-id="copy-tooltip"
            data-tooltip-content="Copied!"
            data-tooltip-place="bottom"
          />
          {showTooltip && (
            <Tooltip
              id="copy-tooltip"
              isOpen={showTooltip}
              place="bottom"
              effect="solid"
            />
          )}
        </FlexDiv>
        <FlexDiv
          style={{
            gap: "1.25rem",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <DeleteYesBtn onClick={() => close(false)}>Close</DeleteYesBtn>
        </FlexDiv>
      </PopupWhiteDiv>
    </div>
  );
};

export default PaymentConfirmedPopup;
