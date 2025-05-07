import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { FlexDiv } from "../../assets/styles/style";
import SeperatingHeader from "../Common/SeperatingHeader";
import { useMediaQuery } from "@mui/material";
import PayCardIcon from "../../assets/images/paycard-icon.svg";
import {
  DetailsListDiv,
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
  HelpBottomText,
  HelpBottomLink,
  RemoveBtn,
} from "./style";
import CheckCircleFilled from "../../assets/images/incl.svg";
import CancelCircleFilled from "../../assets/images/not-incl.svg";
import ReactAlfaPayment from "react-alfa-payment";
import "./style.css";
import SnackbarAlert from "../Login/SnackbarAlert";
import CircularProgress from "../Login/CircularLoader";
import { Base_URL } from "../../Client/apiURL";

function addDaysToUTC(days) {
  const now = new Date();
  now.setUTCDate(now.getUTCDate() + days);
  return now.toISOString();
}

function updateUserData(updates) {
  const userDataString = localStorage.getItem('userData');

  if (!userDataString) {
    return;
  }

  const userData = JSON.parse(userDataString);
  const updatedUserData = {
    ...userData,
    ...updates,
  };

  localStorage.setItem('userData', JSON.stringify(updatedUserData));
}

const CheckoutInitial = () => {
  const location = useLocation();
  const { plan, transactionDetails } = location.state || {};
  const navigate = useNavigate();
  const isLaptop1100 = useMediaQuery("(max-width:1100px)");
  const isLaptop = useMediaQuery("(max-width:1250px)");
  const isMiniLaptop = useMediaQuery("(max-width:1000px)");
  const isTab = useMediaQuery("(max-width:750px)");
  const isMobile = useMediaQuery("(max-width:500px)");
  const [selected, setSelected] = useState(2);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isPaymentBtnLoading, setIsPaymentBtnLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarVariant, setSnackbarVariant] = useState("outlined");
  const [snackbarColor, setSnackbarColor] = useState("neutral");
  const [transactionRefNumber, setTransactionRefNumber] = useState("");
  const [finalTransactionRefNumber, setFinalTransactionRefNumber] =  useState("");
  const [freeSubscription, setFreeSubscription] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("https://app.swiftuni.com/payment-success/");
  const [isStripePaymentLoading, setIsStripePaymentLoading] = useState(false);
  const [isPakistan, setIsPakistan] = useState(false);
  const [planPrice, setPlanPrice] = useState(0);
  const [planPriceFinal, setPlanPriceFinal] = useState(0);

  useEffect(() => {
    if (plan?.id) {
      localStorage.setItem("currentSubscriptionId", plan.id);
      localStorage.setItem("currentSubscriptionName", plan.heading);
      setIsPakistan(plan.UsersCountry === "PK");
    }
  }, [plan]);

  useEffect(() => {
    if (plan?.id) {
      setPlanPrice(plan.price);
      setPlanPriceFinal(plan.price - discount);
    }
  }, [plan, discount]);

  useEffect(() => {
    if (typeof window !== "undefined") {
        setRedirectUrl(`${window.location.origin}/payment-success/`);
    }
  }, []);

  useEffect(() => {
    let currentPlan = location.state?.plan;
    if (!currentPlan) {
      const storedPlan = sessionStorage.getItem("plan");
      currentPlan = storedPlan ? JSON.parse(storedPlan) : null;
    }
    setSelected(currentPlan);
  }, [location.state]);

  const handlePromoCodeSubmit = async () => {
    if (!promoCode) {
      setSnackbarMessage("Please enter promo code.");
      setSnackbarVariant("soft");
      setSnackbarColor("danger");
      setSnackbarOpen(true);
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${Base_URL}/app/users/promo-codes/get-promocode?promocode_id=${promoCode}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (
        response.data &&
        response.data.responseCode === 200 &&
        response.data.response
      ) {
        const { Percentage = null, FixedAmount = 0 } = response.data.response;
        let discountAmount = 0;
        if (Percentage !== null) {
          discountAmount = (planPrice * Percentage) / 100;
          if(Percentage === 100){
            setFreeSubscription(true);
          }
        } else if (FixedAmount !== 0) {
          discountAmount = FixedAmount;
        }
        
        setDiscount(discountAmount);

        setSnackbarMessage("Promo code applied successfully!");
        setSnackbarVariant("soft");
        setSnackbarColor("success");
        setSnackbarOpen(true);
      } else {
        setSnackbarMessage("Promo code is not valid!");
        setSnackbarVariant("soft");
        setSnackbarColor("danger");
        setSnackbarOpen(true);
        setDiscount(0);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching promo code:", error);
      setDiscount(0);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (location.state) {
      const { promoCode: statePromoCode, discount: stateDiscount } = location.state;
      if (statePromoCode) setPromoCode(statePromoCode);
      if (stateDiscount) setDiscount(stateDiscount);
    }
  }, [location.state]);

  const handleRemovePromoCode = () => {
    setPromoCode("");
    setDiscount(0);
    setSnackbarMessage("Promo code removed.");
    setSnackbarVariant("soft");
    setSnackbarColor("info");
    setSnackbarOpen(true);
    setFreeSubscription(false);
  };

  const handleFreeSubscription = async () => {
    try {      
      const url = `${Base_URL}/app/users/user-transactions/free-subscription`;
      
      const payload = {
        subscription_id: plan.id,
        promocode_id: promoCode,
      };
      setIsPaymentBtnLoading(true);
      await axios.post(url, payload, {
        withCredentials: true,
      });
      setIsPaymentBtnLoading(false);
      updateUserData({
        SubscriptionEndTimeUTC: addDaysToUTC(plan.days? plan.days: 0),
        IsSubscribed: true,
        SubscriptionID: plan.id,
      });
      setSnackbarMessage("Subscribed Successfully");
      setSnackbarVariant("soft");
      setSnackbarColor("success");
      setSnackbarOpen(true);      
      setTimeout(() => {
        window.location.reload();
      }, 2000); 
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  const handlePayWithBankAcc = () => {
    sessionStorage.setItem("plan", JSON.stringify(plan));

    const stateData = {
      plan,
      discount,
      planPriceFinal: planPriceFinal,
    };

    if (promoCode.trim() !== "" && discount > 0) {
      stateData.promoCode = promoCode;
    }

    navigate(`/checkout-pay-with-bank-account`, {
      state: stateData,
      replace: true,
    });
  };

  useEffect(() => {
    const generateTransactionRefNumber = () => {
      let result = "";
      for (let i = 0; i < 24; i++) {
        result += Math.floor(Math.random() * 10);
      }
      return result;
    };

    setTransactionRefNumber(generateTransactionRefNumber());
  }, [plan]);

  useEffect(() => {
    if (finalTransactionRefNumber) {
      const hiddenButton = document.querySelector(".credit-debit-card-btn");
      if (hiddenButton) {
        localStorage.setItem("isUserTransaction", true);
        hiddenButton.click();
      }
    }
  }, [finalTransactionRefNumber]);

  const handlePromoCodeAndTriggerPayment = async () => {
    setIsPaymentBtnLoading(true);

    if (promoCode) {
      try {
        const response = await axios.get(
          `${Base_URL}/app/users/promo-codes/check-promocode?promocode_id=${promoCode}`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        if (response.data.responseCode === 200) {
          setFinalTransactionRefNumber(`${transactionRefNumber}-${promoCode}-Pakistan`);
        } else if (response.data.responseCode === 300) {
          console.error("Promo code not valid:", response.data.message);
          setFinalTransactionRefNumber(`${transactionRefNumber}--Pakistan`);
        }
      } catch (error) {
        console.error("Error validating promo code:", error);
        setIsPaymentBtnLoading(false);
        return;
      }
    } else {
      setFinalTransactionRefNumber(`${transactionRefNumber}--Pakistan`);
    }
  };

  const handleStripePaymentClick = async () => {
    setIsStripePaymentLoading(true);

    try {
      const payload = {
        subscription_id: plan?.id,
        stripe_product_id: process.env.REACT_APP_STRIPE_PRODUCT_USER_SUBSCRIPTION_ID,
        amount: planPriceFinal,
        currency: plan?.currencyCode,
      };

      if (promoCode) {
        payload.promocode_id = promoCode;
      }
  
      const response = await axios.post(
        `${Base_URL}/app/users/user-transactions/stripe-create-checkout-session`,
        payload
      );
  
      const { url } = response.data.response;
  
      if (url) {
        window.location.href = url;
      } else {
        setIsStripePaymentLoading(false);
        throw new Error('No URL found in the response.');
      }
    } catch (error) {
      setIsStripePaymentLoading(false);
      console.error('Error:', error);
    }
  };


  return (
    <FlexDiv style={{ width: "100%" }}>
      <SnackbarAlert
        open={snackbarOpen}
        setOpen={setSnackbarOpen}
        message={snackbarMessage}
        variant={snackbarVariant}
        color={snackbarColor}
      />
      <FlexDiv
        style={{
          flexDirection: "column",
          padding: isMiniLaptop ? "1.5rem 2% 2rem" : "6.5rem 3% 3.94rem",
          maxWidth: "75rem",
          width: "100%",
        }}
      >
        <SeperatingHeader title="Features:" />

        <FlexDiv
          style={{ flexDirection: "column", width: "100%" }}
        >
          <FlexDiv
            style={{
              flexDirection: isTab ? " column" : "row",
              justifyContent: "space-between",
              width: "100%",
              alignItems: isTab ? "center" : "flex-start",
              marginTop: "0.5rem",
              gap: "1.75rem",
            }}
          >
            <FlexDiv
              style={{
                width: "100%",
                flexDirection: "column",
                position: "relative",
              }}
            >
              {plan && plan.premiumFeatures && (
                <>
                  {isMiniLaptop && !isTab && (
                    <FlexDiv
                      style={{
                        flexDirection: isMiniLaptop ? "column" : "row",
                        justifyContent: "space-between",
                        width: "40%",
                        maxWidth: "33rem",
                        alignItems: "flex-start",
                        gap: isMiniLaptop ? "1rem" : "2rem",
                        alignSelf: "flex-start",
                      }}
                    >
                      <DetailsListDiv>
                        {plan.premiumFeatures
                          .slice(0, 4)
                          .map((pf, index) => (
                            <VIPSubDiv1 key={index}>
                              <img
                                src={
                                  pf.included
                                    ? CheckCircleFilled
                                    : CancelCircleFilled
                                }
                                alt=""
                              />
                              <DetailsListTextCI
                                isIncluded={pf.included}
                                isSelected={selected === plan.id}
                              >
                                {pf.text}
                              </DetailsListTextCI>
                            </VIPSubDiv1>
                          ))}
                      </DetailsListDiv>

                      <DetailsListDiv>
                        {plan.premiumFeatures.slice(4).map((pf, index) => (
                          <VIPSubDiv1 key={index}>
                            <img
                              src={
                                pf.included
                                  ? CheckCircleFilled
                                  : CancelCircleFilled
                              }
                              alt=""
                            />
                            <DetailsListTextCI
                              isIncluded={pf.included}
                              isSelected={selected === plan.id}
                            >
                              {pf.text}
                            </DetailsListTextCI>
                          </VIPSubDiv1>
                        ))}
                      </DetailsListDiv>
                    </FlexDiv>
                  )}

                  {!isMiniLaptop && !isTab && (
                    <FlexDiv
                      style={{
                        flexDirection: isMiniLaptop ? "column" : "row",
                        justifyContent: "space-between",
                        width: "40%",
                        maxWidth: "33rem",
                        alignItems: "flex-start",
                        gap: isMiniLaptop ? "1rem" : "2rem",
                        alignSelf: isTab ? "center" : "flex-start",
                      }}
                    >
                      <DetailsListDiv>
                        {plan.premiumFeatures
                          .slice(0, 4)
                          .map((pf, index) => (
                            <VIPSubDiv1 key={index}>
                              <img
                                src={
                                  pf.included
                                    ? CheckCircleFilled
                                    : CancelCircleFilled
                                }
                                alt=""
                              />
                              <DetailsListTextCI
                                isIncluded={pf.included}
                                isSelected={selected === plan.id}
                              >
                                {pf.text}
                              </DetailsListTextCI>
                            </VIPSubDiv1>
                          ))}
                      </DetailsListDiv>

                      <DetailsListDiv>
                        {plan.premiumFeatures.slice(4).map((pf, index) => (
                          <VIPSubDiv1 key={index}>
                            <img
                              src={
                                pf.included
                                  ? CheckCircleFilled
                                  : CancelCircleFilled
                              }
                              alt=""
                            />
                            <DetailsListTextCI
                              isIncluded={pf.included}
                              isSelected={selected === plan.id}
                            >
                              {pf.text}
                            </DetailsListTextCI>
                          </VIPSubDiv1>
                        ))}
                      </DetailsListDiv>
                    </FlexDiv>
                  )}

                  {isTab && (
                    <FlexDiv
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "100%",
                        maxWidth: "29rem",
                        alignItems: "flex-start",
                        gap: isMobile ? "1rem" : "2rem",
                        alignSelf: "center",
                      }}
                    >
                      <DetailsListDiv>
                        {plan.premiumFeatures
                          .slice(0, 4)
                          .map((pf, index) => (
                            <VIPSubDiv1 key={index}>
                              <img
                                src={
                                  pf.included
                                    ? CheckCircleFilled
                                    : CancelCircleFilled
                                }
                                alt=""
                              />
                              <DetailsListTextCI
                                isIncluded={pf.included}
                                isSelected={selected === plan.id}
                              >
                                {pf.text}
                              </DetailsListTextCI>
                            </VIPSubDiv1>
                          ))}
                      </DetailsListDiv>

                      <DetailsListDiv>
                        {plan.premiumFeatures.slice(4).map((pf, index) => (
                          <VIPSubDiv1 key={index}>
                            <img
                              src={
                                pf.included
                                  ? CheckCircleFilled
                                  : CancelCircleFilled
                              }
                              alt=""
                            />
                            <DetailsListTextCI
                              isIncluded={pf.included}
                              isSelected={selected === plan.id}
                            >
                              {pf.text}
                            </DetailsListTextCI>
                          </VIPSubDiv1>
                        ))}
                      </DetailsListDiv>
                    </FlexDiv>
                  )}
                </>
              )}
            </FlexDiv>

            <FlexDiv>
              <PaymentCard>
                <img src={PayCardIcon} alt="" />
                <PaymentCardTitle>{plan.heading}</PaymentCardTitle>
                {/* <FlexDiv
                style={{
                  justifyContent: "space-between",
                  width: "100%",
                  marginTop: "1.5rem",
                }}
              >
                <PaymentCardText>Premium Access 10 Days</PaymentCardText>
                <PaymentCardText>{plan.premiumAccessPrice}</PaymentCardText>
              </FlexDiv> */}
                <FlexDiv
                  style={{
                    marginTop: "1rem",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <PaymentCardText>Subtotal</PaymentCardText>
                  <PaymentCardText>{plan.currencySymbol}{plan.price}</PaymentCardText>
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
                      {plan?.currencySymbol}{plan?.UsersCountry === 'PK' ? Math.round(discount) : Number(discount).toFixed(2)}
                    </PaymentCardText>
                  </FlexDiv>
                )}
                <FlexDiv
                  style={{
                    marginTop: "1rem",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <PaymentCardText style={{ color: "#996CFE" }}>
                    Total
                  </PaymentCardText>
                  <PaymentCardText style={{ color: "#996CFE" }}>
                    {plan?.currencySymbol}{plan?.UsersCountry === 'PK' ? Math.round(planPriceFinal) : Number(planPriceFinal).toFixed(2)}
                  </PaymentCardText>
                </FlexDiv>
                <FlexDiv
                  style={{
                    justifyContent: "space-between",
                    width: "100%",
                    marginTop: "1rem",
                  }}
                >
                  <PaymentCardText style={{ marginTop: "1rem" }}>
                    Promo Code
                  </PaymentCardText>
                </FlexDiv>
                {/* <FlexDiv
                  style={{
                    justifyContent: "space-between",
                    width: "100%",
                    marginTop: "0.37rem",
                  }}
                >
                  <InputDiv>
                    <InputFieldSearch
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                  </InputDiv>
                  <PurpleBtn
                    onClick={handlePromoCodeSubmit}
                    disabled={isLoading}
                  >
                    {" "}
                    {isLoading ? (
                      <>
                        <CircularProgress />
                      </>
                    ) : (
                      "Apply"
                    )}
                  </PurpleBtn>
                </FlexDiv> */}
                <FlexDiv
                  style={{
                    justifyContent: "space-between",
                    width: "100%",
                    marginTop: "0.37rem",
                  }}
                >
                  <InputDiv>
                    <InputFieldSearch
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                  </InputDiv>
                  {discount > 0 ? (
                    <RemoveBtn
                      onClick={() => {
                        handleRemovePromoCode();
                      }}
                      disabled={isLoading}
                    >
                      Remove
                    </RemoveBtn>
                  ) : (
                    <PurpleBtn
                      onClick={handlePromoCodeSubmit}
                      disabled={isLoading}
                    >
                      {isLoading ? <CircularProgress /> : "Apply"}
                    </PurpleBtn>
                  )}                  
                </FlexDiv>
                {freeSubscription?
                  <PaymentCardBtn
                    style={{ marginTop: "1.5rem"}}
                    onClick={handleFreeSubscription}
                    disabled={isPaymentBtnLoading}
                  >
                    {isPaymentBtnLoading ? (
                      <>
                        <CircularProgress />
                      </>
                    ) : (
                      "Activate Subscription"
                    )}
                  </PaymentCardBtn>
                :
                  <>
                    {isPakistan ? (
                      <>
                        <PaymentCardBtn
                          style={{ marginTop: "1.5rem", marginBottom: "-4rem" }}
                          onClick={handlePromoCodeAndTriggerPayment}
                          disabled={isPaymentBtnLoading}
                        >
                          {isPaymentBtnLoading ? (
                            <CircularProgress />
                          ) : (
                            "Credit / Debit Card"
                          )}
                        </PaymentCardBtn>
                        <ReactAlfaPayment
                          alfaConfig={{
                            merchantId: process.env.REACT_APP_MERCHANT_ID,
                            storeId: process.env.REACT_APP_STORE_ID,
                            channelId: process.env.REACT_APP_CHANNEL_ID,
                            merchantHash: process.env.REACT_APP_MERCHANT_HASH,
                            merchantUsername: process.env.REACT_APP_MERCHANT_USERNAME,
                            merchantPassword: process.env.REACT_APP_MERCHANT_PASSWORD,
                            redirectUrl: redirectUrl,
                            secretKey1: process.env.REACT_APP_SECRET_KEY1,
                            secretKey2: process.env.REACT_APP_SECRET_KEY2,
                            transactionReferenceNumber: finalTransactionRefNumber,
                            transactionAmount: planPriceFinal,
                          }}
                          message="Credit / Debit Card"
                          className="credit-debit-card-btn"
                        />
                      </>
                      ) : (
                      <PaymentCardBtn
                        style={{ marginTop: "1.5rem" }}
                        onClick={handleStripePaymentClick}
                        disabled={isStripePaymentLoading}
                      >
                        {isStripePaymentLoading ? (
                          <CircularProgress />
                        ) : (
                          "Stripe Payment"
                        )}
                      </PaymentCardBtn>
                    )}
                  </>
                }   
              </PaymentCard>
            </FlexDiv>
          </FlexDiv>

          {!isMiniLaptop && (
            <FlexDiv
              style={{
                width: isLaptop ? (isLaptop1100 ? "52%" : "56%") : "60%",
                alignSelf: "flex-start",
                marginTop: isLaptop1100 ? "-5.4rem " : "-3.9rem",
              }}
            >
              <HelpBottomDiv style={{height: '1.5rem'}}>
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

        {isMiniLaptop && (
          <FlexDiv
            style={{ width: "100%", maxWidth: "75rem", marginTop: "1.7rem" }}
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
  );
};

export default CheckoutInitial;
