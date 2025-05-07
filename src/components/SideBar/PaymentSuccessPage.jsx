import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import PaymentSuccessImg from "../../assets/images/payment-success.svg";
import PaymentFailedImg from "../../assets/images/payment-failed.png";
import { FlexDiv } from "../../assets/styles/style";
import {
  PageContainer,
  Image,
  TitleText,
  SubText,
  BackLink,
  FailedImage,
} from "./style";
import LoadingModal from "../Common/LoadingModal";
import { useMediaQuery } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Base_URL } from "../../Client/apiURL";
import Navbar from "../Navbar/Navbar";

const PaymentSuccessPage = () => {
  const isMiniLaptop = useMediaQuery("(max-width:1000px)");
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  // const [storedSubId, setStoredSubId] = useState(null);
  const [storedSubName, setStoredSubName] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const orderID = searchParams.get("O");

    if (orderID) {
      const subId = localStorage.getItem("currentSubscriptionId");
      const subName = localStorage.getItem("currentSubscriptionName");
      // setStoredSubId(subId);
      setStoredSubName(subName);

      if (subId) {
        transactionAPIsUser(orderID, subId);
      }
      
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  const transactionAPIsUser = async (orderID, subscriptionID) => {
    setIsLoading(true);
    try {
      const transactionResponse = await axios.post(
        `${Base_URL}/app/users/user-transactions/payment-success`,
        {
          order_id: orderID,
          subscription_id: subscriptionID,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (
        transactionResponse.status === 200 &&
        transactionResponse.data.responseCode === 200
      ) {
        setPaymentStatus("success");
        // toast.success("Your Subscription Payment is Successfully Added!");

        const userData = JSON.parse(localStorage.getItem("userData"));

        if (userData) {
          userData.IsSubscribed = true;
          userData.SubscriptionID = subscriptionID;
          userData.SubscriptionEndTimeUTC = transactionResponse.data.UTCTime;
          localStorage.setItem("userData", JSON.stringify(userData));
          window.dispatchEvent(new Event("userDataChanged"));
        }
      } else {
        setPaymentStatus("failed");
        toast.error("Your Subscription Payment failed!");
      }

      localStorage.removeItem("currentSubscriptionId");
      localStorage.removeItem("currentSubscriptionName");
      localStorage.removeItem("isUserTransaction");
    } catch (error) {
      handleError(error);
      setPaymentStatus("failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleError = (error) => {
    if (error.response) {
      const errorMessage = JSON.stringify({
        responseCode: error.response.status,
        message: error.response.data.message || "An error occurred",
        response: error.response.data.response || "",
      });
      console.error(`API Error: ${errorMessage}`);
    } else if (error.request) {
      console.error("API Error: No response received", error.request);
    } else {
      console.error("API Error: Request setup failed", error.message);
    }
  };

  return (
    <>
      {isLoading && <LoadingModal />}
      <Navbar />
      <FlexDiv
        style={{
          padding: isMiniLaptop ? "1.5rem 0% 2rem" : "6.5rem 3% 3.94rem",
        }}
      >
        <PageContainer>
          {paymentStatus === "success" && (
            <>
              <Image src={PaymentSuccessImg} alt="Payment Success" />
            </>
          )}

          {paymentStatus === "failed" && (
            <>
              <FailedImage src={PaymentFailedImg} alt="Payment Failed" />
            </>
          )}

          {paymentStatus === "success" && (
            <>
              <TitleText style={{ color: "green" }}>
                Your Subscription Payment is Successful
              </TitleText>
              <SubText>{storedSubName}</SubText>
            </>
          )}
          {paymentStatus === "failed" && (
            <>
              <TitleText style={{ color: "red" }}>
                Your Subscription Payment Failed
              </TitleText>
              <SubText>Please try again.</SubText>
            </>
          )}
          {paymentStatus === null && (
            <>
              <TitleText>Payment Processing...</TitleText>
              {storedSubName ? (
                <SubText>{storedSubName}</SubText>
              ) : (
                <SubText> </SubText>
              )}
            </>
          )}

          {paymentStatus === "success" && (
            <>
              <BackLink href="/">Home</BackLink>
              <BackLink
                style={{ marginTop: "0.5rem" }}
                onClick={() => {
                  navigate("/sidebar", { state: { section: "Plan Info" } });
                }}
              >
                Subscribed Plan
              </BackLink>
            </>
          )}

          {paymentStatus === "failed" && (
            <>
              <BackLink href="/">Home</BackLink>
              <BackLink
                style={{ marginTop: "0.5rem" }}
                onClick={() => {
                  navigate("/sidebar", { state: { section: "Plan Info" } });
                }}
              >
                Back To Plans
              </BackLink>
            </>
          )}

          {paymentStatus === null && (
            <>
              <BackLink href="/">Home</BackLink>
              <BackLink
                style={{ marginTop: "0.5rem" }}
                onClick={() => {
                  navigate("/sidebar", { state: { section: "Plan Info" } });
                }}
              >
                Subscription Plans
              </BackLink>
            </>
          )}
        </PageContainer>
      </FlexDiv>
    </>
  );
};

export default PaymentSuccessPage;
