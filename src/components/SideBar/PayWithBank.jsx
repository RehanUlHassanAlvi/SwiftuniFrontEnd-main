import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FlexDiv } from "../../assets/styles/style";
import SeperatingHeader from "../Common/SeperatingHeader";
import { Typography, useMediaQuery } from "@mui/material";
import PayCardIcon from "../../assets/images/paycard-icon.svg";
import CheckCircleFilled from "../../assets/images/incl.svg";
import CancelCircleFilled from "../../assets/images/not-incl.svg";
import InfoBlueIcon from "../../assets/images/info-blue.svg";
import ContentCopy from "../../assets/images/content_copy.svg";
import CustomTooltip from "../Common/CustomTooltip";
import CancelIcon from "../../assets/images/icons8-cancel.svg";
import SnackbarAlert from "../Login/SnackbarAlert";
import CircularProgress from "../Login/CircularLoader";

import {
  DetailsListDiv as PremiumFeaturesDiv,
  DetailsListTextCI,
  InputDiv,
  InputFieldSearch,
  PaymentCard,
  PaymentCardBtn,
  PaymentCardText,
  PaymentCardTitle,
  PurpleBtn,
  VIPSubDiv1,
  HelpBottomDiv,
  PaymentCardWhiteBtn,
  PaymentCardPWB,
  PayWithBankDiv,
  CardInfoDiv,
  CardInfo,
  CardInfoTitle,
  CardInfoName,
  InputDiv2,
  CardInfoText,
  ReferenceCodeShow,
  CTCimg,
  CTCimg2,
  HelpBottomText,
  HelpBottomLink,
  UploadReceiptBtn,
  CancelIconImg,
  HelpLink,
} from "./style";
import axios from "axios";
import AreYouSurePopup from "../Common/AreYouSurePopup";
import Modal from "react-modal";
import LoadingModal from "../Common/LoadingModal";
import PaymentConfirmedPopup from "./PaymentConfirmedPopup";
import { Base_URL } from "../../Client/apiURL";

const modalStyle = {
  overlay: {
    backdropFilter: "blur(3px)",
    WebkitBackdropFilter: "blur(3px)",
    background: "none",
    zIndex: 2000,
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

const generateRandomString = (length) => {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
};

const PayWithBank = () => {
  const location = useLocation();
  const {
    plan,
    discount,
    planPriceFinal,
    promoCode = "",
  } = location.state || {};
  const isMiniLaptop = useMediaQuery("(max-width:1000px)");
  const isLaptop1270 = useMediaQuery("(max-width:1270px)");
  const isLaptop = useMediaQuery("(max-width:1070px)");
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();
  const accountNoRef = useRef(null);
  const referenceCodeRef = useRef(null);
  const [accountTooltipOpen, setAccountTooltipOpen] = useState(false);
  const [referenceTooltipOpen, setReferenceTooltipOpen] = useState(false);
  const [accountClicked, setAccountClicked] = useState(false);
  const [referenceClicked, setReferenceClicked] = useState(false);
  const [filePreview, setFilePreview] = useState(null);
  const [file, setFile] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarVariant, setSnackbarVariant] = useState("outlined");
  const [snackbarColor, setSnackbarColor] = useState("neutral");
  const [isLoading, setIsLoading] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [isTransactionDetailLoading, setIsTransactionDetailLoading] = useState(false);
  const [savedReferenceNo, setSavedReferenceNo] = useState("");
  const [isPaymentConfirmedPopupOpen, setIsPaymentConfirmedPopupOpen] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState({
    title: "",
    bank_name: "",
    acc_no: "",
    iban: "",
    whatsapp_link: "",
    support_email: "",
  });
  const [referenceNo, setReferenceNo] = useState("");
  const [referenceNoLength, setReferenceNoLength] = useState(10);

  useEffect(() => {
    const refNo = generateRandomString(referenceNoLength);
    setReferenceNo(refNo);
  }, []);

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      setIsTransactionDetailLoading(true);
      try {
        const response = await axios.get(
          `${Base_URL}/app/admin/get-transaction-details`,
          { withCredentials: true }
        );
        const data = response.data;

        if (data?.response?.TransactionDetails) {
          const parsedDetails = JSON.parse(data.response.TransactionDetails);
          setTransactionDetails(parsedDetails);
        } else {
          console.error("Failed to fetch transaction details.");
        }
      } catch (error) {
        console.error("Error fetching transaction details:", error);
      } finally {
        setIsTransactionDetailLoading(false);
      }
    };

    fetchTransactionDetails();
  }, []);

  const handleTooltipClose = (setter) => {
    setter(false);
  };

  const copyToClipboard = (ref, tooltipSetter, setClicked) => {
    const text = ref.current.innerText;
    navigator.clipboard
      .writeText(text)
      .then(() => {
        tooltipSetter(true);
        setClicked(true);
        setTimeout(() => {
          tooltipSetter(false);
          setClicked(false);
        }, 1000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileTypes = ["image/jpeg", "image/png", "application/pdf"];
      if (fileTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result);
          setFile(file);
        };
        reader.readAsDataURL(file);
      } else {
        setSnackbarMessage("Only JPG, PNG, and PDF files are allowed");
        setSnackbarVariant("soft");
        setSnackbarColor("danger");
        setSnackbarOpen(true);
      }
    }
  };

  const handleBack = () => {
    const planData = JSON.parse(sessionStorage.getItem("plan"));
    navigate(
      "/checkout",
      { state: { plan: planData, promoCode, discount } },
      { replace: true }
    );
  };

  const parsePrice = (priceStr) => {
    if (typeof priceStr === "string") {
      return parseInt(priceStr.replace(/[^\d]/g, ""), 10) || 0;
    }
    return 0;
  };

  const handleRemoveFile = () => {
    setFilePreview(null);
    setFile(null);
  };

  let planPrice = 0,
    PremiumPrice = 0; 
  if (plan) {
    planPrice = parsePrice(plan.price);
    PremiumPrice = parsePrice(plan.premiumAccessPrice);
  }

  const handlePromoCodeSubtraction = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `${Base_URL}/app/users/promo-codes/check-promocode?promocode_id=${promoCode}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.data.responseCode === 200) {
        //success
      } else if (response.data.responseCode === 300) {
        console.error("Promo code not valid:", response.data.message);
        //promo code not valid
      }
    } catch (error) {
      console.error("Error validating promo code:", error);
      setIsLoading(false);
      return;
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    if (promoCode.trim() !== "") {
      await handlePromoCodeSubtraction();
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        // const locationPart = `${latitude}-${longitude}`;
        const locationPart = "Pakistan";

        const formData = new FormData();
        formData.append("subscription_id", plan.id);
        formData.append("reference_number", referenceNo);
        if (file) {
          formData.append("image", file);
        }

        if (promoCode.trim() !== "") {
          formData.append("promocode_id", promoCode);
        }
        formData.append("location", `${locationPart}`);

        try {
          const response = await axios.post(
            `${Base_URL}/app/users/user-transactions/bank-details`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
    
          if (response.data.responseCode === 200) {
            setSnackbarMessage("Payment confirmed successfully!");
            setSnackbarVariant("soft");
            setSnackbarColor("success");
            setSnackbarOpen(true);
            setFilePreview(null);
            setFile(null);
            setOpenPopup(false);
  
            setSavedReferenceNo(referenceNo);
            setIsPaymentConfirmedPopupOpen(true);
  
            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.delete("promoCode");
            currentUrl.searchParams.delete("discount");
            window.history.replaceState({}, "", currentUrl);
  
            const refNo = generateRandomString(referenceNoLength);
            setReferenceNo(refNo);
          } else {
            setSnackbarMessage("Failed to confirm payment. Please try again.");
            setSnackbarVariant("soft");
            setSnackbarColor("danger");
            setSnackbarOpen(true);
          }
        } catch (error) {
          console.error("Error submitting form:", error);
          setSnackbarMessage("Failed to confirm payment. Please try again.");
          setSnackbarVariant("soft");
          setSnackbarColor("danger");
          setSnackbarOpen(true);
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        console.error("Error fetching location:", error);
        handleFallbackSubmit();
      }
    );
  };
  
  const handleFallbackSubmit = async () => {
    const formData = new FormData();
    formData.append("subscription_id", plan.id);
    formData.append("reference_number", referenceNo);
    if (file) {
      formData.append("image", file);
    }
    if (promoCode.trim() !== "") {
      formData.append("promocode_id", promoCode);
    }
    formData.append("location", "Pakistan");
  
    try {
      const response = await axios.post(
        `${Base_URL}/app/users/user-transactions/bank-details`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if (response.data.responseCode === 200) {
        setSnackbarMessage("Payment confirmed successfully!");
        setSnackbarVariant("soft");
        setSnackbarColor("success");
        setSnackbarOpen(true);
        setFilePreview(null);
        setFile(null);
        setOpenPopup(false);
  
        setSavedReferenceNo(referenceNo);
        setIsPaymentConfirmedPopupOpen(true);
  
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.delete("promoCode");
        currentUrl.searchParams.delete("discount");
        window.history.replaceState({}, "", currentUrl);
  
        const refNo = generateRandomString(referenceNoLength);
        setReferenceNo(refNo);
      } else {
        setSnackbarMessage("Failed to confirm payment. Please try again.");
        setSnackbarVariant("soft");
        setSnackbarColor("danger");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSnackbarMessage("Failed to confirm payment. Please try again.");
      setSnackbarVariant("soft");
      setSnackbarColor("danger");
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const openAreYouSurePopup = () => {
    setOpenPopup(true);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const scorecardElement = document.getElementById("popup-card");
      if (scorecardElement && !scorecardElement.contains(event.target)) {
        setOpenPopup(false);
        setIsPaymentConfirmedPopupOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const discountTrue = discount > 0;

  const marginTop = () => {
    if (isLaptop1270 && discountTrue) return "13.4rem";
    if (isLaptop1270) return "11.1rem";
    if (discountTrue) return "15rem";
    return "11.5rem";
  };

  const formatWhatsAppLink = (link) => {
    return link.replace(/\s+/g, "").replace("+", "");
  };

  return (
    <>
      {savedReferenceNo && (
        <Modal isOpen={isPaymentConfirmedPopupOpen} style={modalStyle}>
          <PaymentConfirmedPopup
            close={setIsPaymentConfirmedPopupOpen}
            referenceNo={savedReferenceNo}
          />
        </Modal>
      )}
      {isTransactionDetailLoading && <LoadingModal />}
      <Modal isOpen={openPopup} style={modalStyle}>
        <AreYouSurePopup
          close={setOpenPopup}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </Modal>
      <SnackbarAlert
        open={snackbarOpen}
        setOpen={setSnackbarOpen}
        message={snackbarMessage}
        variant={snackbarVariant}
        color={snackbarColor}
      />
      <FlexDiv style={{ width: "100%" }}>
        <FlexDiv
          style={{
            flexDirection: "column",
            padding: isMiniLaptop ? "1.5rem 0% 2rem" : "6.5rem 3% 3.94rem",
            maxWidth: "75rem",
            width: isMiniLaptop ? "96%" : "100%",
          }}
        >
          <FlexDiv
            style={{
              flexDirection: isMiniLaptop ? " column" : "row",
              justifyContent: "space-between",
              width: "100%",
              alignItems: isMiniLaptop ? "center" : "flex-start",
              marginTop: "0.5rem",
              gap: "1.75rem",
              background: "white",
              borderRadius: "0.75rem",
            }}
          >
            <FlexDiv
              style={{
                flexDirection: "column",
                justifyContent: isMiniLaptop ? "center" : "space-between",
                width: "100%",
                // maxWidth: "33rem",
                alignItems: isMiniLaptop ? "center" : "flex-start",
                gap: "1.25rem",
                // padding: "1.25rem"
              }}
            >
              <PayWithBankDiv>
                <span>Bank Transfer</span>
                Make transfer to the account details provided
              </PayWithBankDiv>

              <CardInfoDiv>
                <FlexDiv style={{ gap: "0.8rem" }}>
                  <CardInfo>
                    <CardInfoTitle>Title</CardInfoTitle>
                    <CardInfoName>{transactionDetails.title}</CardInfoName>
                  </CardInfo>
                  <CardInfo>
                    <CardInfoTitle>Bank Name</CardInfoTitle>
                    <CardInfoName>{transactionDetails.bank_name}</CardInfoName>
                  </CardInfo>
                </FlexDiv>
                <FlexDiv style={{ gap: "0.8rem" }}>
                  <CardInfo>
                    <CardInfoTitle>Account No</CardInfoTitle>
                    <CardInfoName
                      ref={accountNoRef}
                      clicked={accountClicked}
                      style={{
                        color: accountClicked
                          ? "#996CFE"
                          : "var(--White-Theme-Gray---10, #16161e)",
                      }}
                    >
                      {transactionDetails.acc_no}
                    </CardInfoName>
                    <CustomTooltip
                      title="Copied!"
                      open={accountTooltipOpen}
                      onClose={() => handleTooltipClose(setAccountTooltipOpen)}
                    >
                      <CTCimg
                        src={ContentCopy}
                        alt="Copy to clipboard"
                        onClick={() =>
                          copyToClipboard(
                            accountNoRef,
                            setAccountTooltipOpen,
                            setAccountClicked
                          )
                        }
                        clicked={accountClicked}
                      />
                    </CustomTooltip>
                  </CardInfo>
                  <CardInfo>
                    <CardInfoTitle>IBAN</CardInfoTitle>
                    <CardInfoName>{transactionDetails.iban}</CardInfoName>
                  </CardInfo>
                </FlexDiv>
              </CardInfoDiv>

              {!isMiniLaptop && (
                <FlexDiv
                  style={{
                    width: "92.2%",
                    maxWidth: "45rem",
                    marginTop: marginTop(),
                    marginLeft: "1.25rem",
                  }}
                >
                  <HelpBottomDiv>
                    <HelpBottomText>
                      If you are facing any issue, please let us know on{" "}
                    </HelpBottomText>
                    <HelpBottomLink
                      href={`mailto:${transactionDetails.support_email}`}
                    >
                      {transactionDetails.support_email}
                    </HelpBottomLink>
                  </HelpBottomDiv>
                </FlexDiv>
              )}
            </FlexDiv>

            <FlexDiv
              style={{
                margin: isMiniLaptop ? "0rem 3.5rem 0rem" : "0rem",
                padding: isMiniLaptop ? "0rem" : "0rem 3rem 0rem 0rem",
              }}
            >
              <PaymentCardPWB>
                <img src={PayCardIcon} alt="" />
                <PaymentCardTitle>{plan.heading}</PaymentCardTitle>
                {/* <FlexDiv
                  style={{
                    justifyContent: "space-between",
                    width: "100%",
                    marginTop: "2.5rem",
                  }}
                >
                  <PaymentCardText>Premium Access 10 Days</PaymentCardText>
                  <PaymentCardText>{plan.premiumAccessPrice}</PaymentCardText>
                </FlexDiv> */}
                <FlexDiv
                  style={{
                    justifyContent: "space-between",
                    width: "100%",
                    marginTop: "1rem",
                  }}
                >
                  <PaymentCardText>Subtotal</PaymentCardText>
                  <PaymentCardText>{plan.price}</PaymentCardText>
                </FlexDiv>
                {discount > 0 && (
                  <FlexDiv
                    style={{
                      justifyContent: "space-between",
                      width: "100%",
                      marginTop: "1rem",
                      alignItems: "flex-start",
                    }}
                  >
                    <PaymentCardText style={{ color: "green" }}>
                      Discount
                    </PaymentCardText>
                    <PaymentCardText
                      style={{
                        color: "green",
                      }}
                    >
                      PKR {discount}
                    </PaymentCardText>
                  </FlexDiv>
                )}
                <FlexDiv
                  style={{
                    justifyContent: "space-between",
                    width: "100%",
                    marginTop: "1.5rem",
                  }}
                >
                  <PaymentCardText style={{ color: "#996CFE" }}>
                    Total
                  </PaymentCardText>
                  <PaymentCardText style={{ color: "#996CFE" }}>
                    {`PKR ${planPriceFinal}`}
                  </PaymentCardText>
                </FlexDiv>
                <FlexDiv
                  style={{
                    justifyContent: "space-between",
                    width: "100%",
                    marginTop: "1.5rem",
                  }}
                >
                  <PaymentCardText>Reference</PaymentCardText>
                </FlexDiv>
                <FlexDiv
                  style={{
                    justifyContent: "space-between",
                    width: "100%",
                    marginTop: "0.37rem",
                  }}
                >
                  <InputDiv2>
                    <ReferenceCodeShow
                      ref={referenceCodeRef}
                      clicked={referenceClicked}
                      style={{
                        color: referenceClicked
                          ? "#996CFE"
                          : "var(--White-Theme-Gray---10, #16161e)",
                      }}
                    >
                      {referenceNo}
                    </ReferenceCodeShow>
                    <CustomTooltip
                      title="Copied!"
                      open={referenceTooltipOpen}
                      onClose={() =>
                        handleTooltipClose(setReferenceTooltipOpen)
                      }
                    >
                      <CTCimg2
                        src={ContentCopy}
                        alt="Copy to clipboard"
                        onClick={() =>
                          copyToClipboard(
                            referenceCodeRef,
                            setReferenceTooltipOpen,
                            setReferenceClicked
                          )
                        }
                        clicked={referenceClicked}
                      />
                    </CustomTooltip>
                  </InputDiv2>
                </FlexDiv>
                {filePreview && (
                  <FlexDiv
                    style={{
                      position: "relative",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      marginBottom: "0.5rem",
                      marginTop: "1rem",
                    }}
                  >
                    {filePreview.includes("application/pdf") ? (
                      <embed
                        src={filePreview}
                        type="application/pdf"
                        width="100%"
                        height="300px"
                      />
                    ) : (
                      <img
                        src={filePreview}
                        alt="File preview"
                        style={{ maxWidth: "100%", maxHeight: "300px" }}
                      />
                    )}
                    <CancelIconImg
                      src={CancelIcon}
                      alt="Remove file"
                      onClick={handleRemoveFile}
                    />
                  </FlexDiv>
                )}

                <UploadReceiptBtn
                  style={{ marginTop: "0.62rem" }}
                  onClick={handleButtonClick}
                >
                  Upload receipt
                </UploadReceiptBtn>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  accept=".jpeg,.png,.pdf"
                />

                <FlexDiv
                  style={{
                    justifyContent: "flex-start",
                    width: "100%",
                    // maxWidth: "33rem",
                    alignItems: "flex-start",
                    gap: "0.31rem",
                    // padding: "1.25rem"
                    marginTop: "1rem",
                    flexDirection: "column",
                  }}
                >
                  <FlexDiv
                    style={{
                      justifyContent: "flex-start",
                      width: "100%",
                      alignItems: "flex-start",
                      gap: "0.31rem",
                    }}
                  >
                    <img
                      src={InfoBlueIcon}
                      alt=""
                      style={{ width: "1.25rem" }}
                    />
                    <CardInfoText>
                      Only JPG, PNG, and PDF files are allowed.
                    </CardInfoText>
                  </FlexDiv>
                  <FlexDiv
                    style={{
                      justifyContent: "flex-start",
                      width: "100%",
                      alignItems: "flex-start",
                      gap: "0.31rem",
                    }}
                  >
                    <img
                      src={InfoBlueIcon}
                      alt=""
                      style={{ width: "1.25rem" }}
                    />
                    <CardInfoText>
                      Put the reference code in the Bank Transfer or Transfer
                      the payment receipt on <d />{" "}
                      <HelpLink
                        href={`https://wa.me/${formatWhatsAppLink(
                          transactionDetails.whatsapp_link
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        WhatsApp ( {transactionDetails.whatsapp_link} )
                      </HelpLink>{" "}
                      or
                      <HelpLink
                        href={`mailto:${transactionDetails.support_email}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Email ({transactionDetails.support_email})
                      </HelpLink>
                    </CardInfoText>
                  </FlexDiv>
                </FlexDiv>

                <PaymentCardBtn
                  style={{ marginTop: "1.5rem" }}
                  onClick={openAreYouSurePopup}
                >
                  Confirm payment
                  {/* <>
                    {isLoading ? (
                      <CircularProgress color={"white"} />
                    ) : (
                      <FlexDiv
                        style={{
                          height: "100%",
                          gap: "8px",
                        }}
                      >
                        Confirm payment
                      </FlexDiv>
                    )}
                  </> */}
                </PaymentCardBtn>
                <PaymentCardWhiteBtn
                  style={{ marginTop: "0.75rem" }}
                  onClick={handleBack}
                >
                  Back to payment methods
                </PaymentCardWhiteBtn>
              </PaymentCardPWB>
            </FlexDiv>

            {isMiniLaptop && (
              <FlexDiv
                style={{
                  width: "96%",
                  maxWidth: "75rem",
                  marginTop: "1rem",
                  paddingBottom: "1rem",
                }}
              >
                <HelpBottomDiv>
                  <HelpBottomText>
                    If you are facing any issue, please let us know on{" "}
                  </HelpBottomText>
                  <HelpBottomLink
                    href={`mailto:${transactionDetails.support_email}`}
                  >
                    {transactionDetails.support_email}
                  </HelpBottomLink>
                </HelpBottomDiv>
              </FlexDiv>
            )}
          </FlexDiv>
        </FlexDiv>
      </FlexDiv>
    </>
  );
};

export default PayWithBank;
