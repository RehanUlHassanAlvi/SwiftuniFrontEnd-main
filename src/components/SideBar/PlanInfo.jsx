import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  SideCardContainer,
  PlanInfoHeading,
  CancelSubDiv,
  CancelSubText,
  VIPDiv,
  VIPSubDiv1,
  VIPText,
  ActiveDiv,
  ActiveText,
  StartTestBtn,
  AllPlansTextDiv,
  AllPlansText,
  TabsTextDiv,
  PlanDetailsDiv,
  PlanDetailsHeading,
  PlanDetailsDesc,
  PriceDiv,
  PriceText,
  ActualPriceText,
  PlanNameDiv as UpgradeBtnDiv,
  DetailsListDiv as PremiumFeaturesDiv,
  DetailsListText as PremiumFeaturesListText,
  PurchasedText,
  VIPTextDiv,
  PlanDetailsOuterDiv,
  StyledDiscountedStar,
} from "./style";
import { FlexDiv } from "../../assets/styles/style";
import CheckCircle from "../../assets/images/check_circle.svg";
import ActiveDot from "../../assets/images/active-dot.svg";
import CheckCircleFilled from "../../assets/images/check-circle-filled.svg";
import CancelCircleFilled from "../../assets/images/cancel-circle-filled.svg";
// import { SubscriptionsData } from "./data";
import ProgressBar from "./ProgressBar";
import Modal from "react-modal";
import CancelSubscriptionPopup from "./CancelSubscriptionPopup";
import LoadingModal from "../Common/LoadingModal";
// const CryptoJS = require("crypto-js");
import DiscountStar from "./DiscountStar";
import { Base_URL } from "../../Client/apiURL";
import {
  NavDiamondImg,
  UpgradeDiv,
  UpgradeDivBoldText,
  UpgradeDivContactUs,
  UpgradeDivSimpleText,
} from "../Navbar/style";
import { getCurrencyForCountry, getCurrencySymbol } from "./data";

const modalStyle = {
  overlay: {
    zIndex: 1002,
    backdropFilter: "blur(5px)",
    WebkitBackdropFilter: "blur(5px)",
    background: "none",
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

const premiumFeatureslist3 = [
  { text: "AI Scoring", included: true },
  { text: "Prediction Files", included: true },
  { text: "Templates", included: true },
  { text: "Strategy Videos", included: true },
  { text: "Ai Study-Plan", included: true },
  { text: "Full Mock Tests", included: true },
  { text: "Sectional Mock Tests", included: true },
];

const extractDigits = (text) => {
  const match = text?.match(/\d+/); 
  return match ? match[0] : "";
};

const extractPlanCountry = (planName) => {
  const match = planName?.match(/ - ([A-Z]{2})$/);
  return match ? match[1] : null;
};

const formatPriceUpto2Decimals = (price) => {
  const rounded = Math.round(price * 100) / 100;
  const parts = rounded.toString().split('.');
  if (parts.length === 1) {
    return `${parts[0]}.00`;
  } else if (parts[1].length === 1) {
    return `${parts[0]}.${parts[1]}0`;
  } else {
    return rounded.toFixed(2);
  }
};


const PlanInfo = () => {
  const [allOrMock, setAllOrMock] = useState("all");
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [subscriptions, setSubscriptions] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [remianingDays, setRemianingDays] = useState(0);
  const [subDays, setSubDays] = useState(0);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [selected, setSelected] = useState(userData.SubscriptionId);
  const [UsersCountry, setUsersCountry] = useState(false);
  const [locationLoading, setLocationLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLoading, setShowLoading] = useState(true);
  const [transactionDetails, setTransactionDetails] = useState({
    title: "",
    bank_name: "",
    acc_no: "",
    iban: "",
    whatsapp_link: "",
    support_email: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => setShowLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const checkLocation = async () => {
      try {
        setLocationLoading(true);
        setError(null);
        
        const response = await fetch("https://ipinfo.io/json?token=2dfb2f8164b3ac");
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setUsersCountry(data.country);
      } catch (error) {
        console.error("Error fetching location:", error);
        setError(error.message || "Failed to fetch location");
      } finally {
        setLocationLoading(false);
      }
    }

    checkLocation();
  }, []);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      if (UsersCountry === false && !locationLoading) return;
  
      setIsLoading(true);
      try {
        const response = await fetch(`${Base_URL}/app/users/subscriptions/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        
        const data = await response.json();
  
        if (data.responseCode === 200) {
          const allPlans = data.response;
          const countrySpecificPlans = {};
          let usPlans = [];
  
          allPlans.forEach(plan => {
            const planCountry = extractPlanCountry(plan.Name);
            
            if (planCountry) {
              if (!countrySpecificPlans[planCountry]) {
                countrySpecificPlans[planCountry] = [];
              }
              countrySpecificPlans[planCountry].push(plan);
              
              if (planCountry === 'US') {
                usPlans.push(plan);
              }
            }
          });
  
          let plansToShow = [];
          
          if (UsersCountry) {
            if (countrySpecificPlans[UsersCountry]) {
              plansToShow = countrySpecificPlans[UsersCountry];
            } 
            else {
              plansToShow = usPlans;
            }
          } else {
            plansToShow = usPlans;
          }
  
          const mappedData = plansToShow.map(plan => {
            const planCountry = extractPlanCountry(plan.Name);
            const currencyCode = getCurrencyForCountry(planCountry || 'US');
            const currencySymbol = getCurrencySymbol(currencyCode || 'USD');
    
            const discountedPriceInit = plan.Discount > 0 ? plan.PricePKR * (1 - plan.Discount / 100) : plan.PricePKR;
            const discountedPrice = UsersCountry === 'PK' ? Math.round(discountedPriceInit) : formatPriceUpto2Decimals(discountedPriceInit);
  
            if (userData.SubscriptionID && plan.Id === userData.SubscriptionID) {
              const givenDateString = userData.SubscriptionEndTimeUTC;
              const givenDate = new Date(givenDateString);
              const currentDate = new Date();
              const timeDifference = givenDate - currentDate;
              const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
              setSubDays(plan.Days);
              if (plan.Days > 0 && plan.Days) {
                setRemianingDays((dayDifference / plan.Days).toFixed(2));
              } else {
                setRemianingDays(0);
              }
            } else if (userData.PlanID) {
              const givenDateString = userData.SubscriptionEndTimeUTC;
              const givenDate = new Date(givenDateString);
              const currentDate = new Date();
              const timeDifference = givenDate - currentDate;
              const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  
              if (dayDifference > 0) {
                setRemianingDays(dayDifference);
              } else {
                setRemianingDays(0);
              }
            }
            return {
              id: plan.Id,
              heading: plan.Name.replace(planCountry ? ` - ${planCountry}` : '', ''),
              description: plan.Description,
              price: discountedPrice,
              actualPrice: plan.Discount > 0 ? plan.PricePKR : null,
              Discount: plan.Discount,
              days: plan.Days,
              activeStatus: plan.InActive,
              planName: "Purchase",
              premiumFeatures: premiumFeatureslist3,
              UsersCountry: UsersCountry,
              currencyCode: currencyCode,
              currencySymbol: currencySymbol,
            };
          });
  
          setSubscriptions(mappedData);
        }
      } catch (error) {
        console.error("Failed to fetch subscriptions:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchSubscriptions();
    setSelected(userData.SubscriptionID);
  }, [UsersCountry, error]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const scorecardElement = document.getElementById("sure-to-cancel");
      if (scorecardElement && !scorecardElement.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const fetchTransactionDetails = async () => {
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
      }
    };

    fetchTransactionDetails();
  }, []);

  const handleCheckout = (plan) => {
    if (!userData?.IsSubscribed) {
      navigate("/checkout", { state: { plan, transactionDetails } });
    }
  };


  return (
    <>
      {(isLoading || locationLoading || showLoading) && <LoadingModal />}

      {!isLoading && !locationLoading && !showLoading && (
        <SideCardContainer>
          {/* <FlexDiv style={{ justifyContent: "space-between", gap: "10px" }}>
            {" "}
            <PlanInfoHeading>Current subscription</PlanInfoHeading>
            <CancelSubDiv>
              <CancelSubText
                onClick={() => {
                  setOpen(true);
                }}
              >
                Cancel my subscription
              </CancelSubText>
            </CancelSubDiv>
          </FlexDiv> */}
          <VIPDiv >
            <VIPSubDiv1>
              <img src={CheckCircle} alt="" />
              {userData?.IsSubscribed && userData?.PlanID !== null ? (
                // Case 1: User is subscribed and has a PlanID
                <VIPTextDiv>
                  <VIPText>VIP {extractDigits(userData?.PlanName)} Days Subscription</VIPText>
                  <ProgressBar value={Math.min(remianingDays, 100)} />
                  {remianingDays > 0 && (
                    <VIPText>{remianingDays} Day(s) left</VIPText>
                  )}
                </VIPTextDiv>
              ) : userData?.IsSubscribed && userData?.SubscriptionID !== null ? (
                // Case 2: User is subscribed and has a SubscriptionID but no PlanID
                <VIPTextDiv>
                  <VIPText>
                    VIP {userData.IsSubscribed ? subDays : "0"} Days Subscription
                  </VIPText>
                  <ProgressBar value={remianingDays * 100} />
                  {remianingDays > 0 && (
                    <VIPText>
                      {(subDays * remianingDays).toFixed(0)} Day(s) left
                    </VIPText>
                  )}
                </VIPTextDiv>
              ) : (
                // Case 3: User is neither subscribed nor has a SubscriptionID
                <VIPTextDiv>
                  <VIPText>No Active Subscription</VIPText>
                  <ProgressBar value={remianingDays * 100} />
                </VIPTextDiv>
              )}
            </VIPSubDiv1>

            <ActiveDiv>
              <ActiveText>{remianingDays > 0 ? "Active" : "Inactive"}</ActiveText>
              <img src={ActiveDot} alt="" />
            </ActiveDiv>
          </VIPDiv>

          {/*   <VIPDiv>
            <VIPSubDiv1>
              <img src={CheckCircle} alt="" />
              <div>
                <VIPText>Mock Test - 100</VIPText>
                <PurchasedText>Purchased</PurchasedText>
              </div>
            </VIPSubDiv1>
            <StartTestBtn>Start Test</StartTestBtn>
          </VIPDiv> */}

          {/* (userData?.IsSubscribed && userData?.SubscriptionID && userData?.PlanID === null) ||
          (!userData?.IsSubscribed && userData?.SubscriptionID === null && userData?.PlanID === null)  */}
          

          {userData?.PortalId === 1 ? (
            <>
              {userData?.IsSubscribed && userData?.PlanID !== null ? (
                <FlexDiv
                  style={{
                    justifySelf: "center",
                    alignSelf: "center",
                    marginTop: "0.55rem",
                    padding: "20px",
                    backgroundColor: "#f9f8fc",
                    borderRadius: "8px",
                    width: "96%",
                    height: "60vh",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                      justifySelf: "center",
                      alignSelf: "center",
                      textAlign: "center",
                      padding: "20px",
                    }}
                  >
                    <>
                      <div style={{ marginBottom: "10px" }}>
                        <UpgradeDivBoldText
                          style={{
                            fontSize: "14px",
                            color: "#666",
                            alignItems: "center",
                            justifySelf: "center",
                            alignSelf: "center",
                            textAlign: "center",
                          }}
                        >
                          Your subscription has been activated.
                        </UpgradeDivBoldText>
                        <div
                          style={{
                            fontSize: "14px",
                            color: "#666",
                            alignItems: "center",
                            justifySelf: "center",
                            alignSelf: "center",
                            textAlign: "center",
                          }}
                        >
                          You have full access to all features. Thank you for
                          being a valued member.
                        </div>
                      </div>
                      <UpgradeDivContactUs
                        onClick={() => window.open("/contact-us", "_blank")}
                        style={{
                          width: "40%",
                          borderRadius: "4px",
                          marginTop: "10px",
                          alignItems: "center",
                          justifySelf: "center",
                          alignSelf: "center",
                          textAlign: "center",
                        }}
                      >
                        Contact Support
                      </UpgradeDivContactUs>
                    </>
                  </div>
                </FlexDiv>
              ) : (
                <div>
                  <>
                    <div style={{ position: "relative" }}>
                      <TabsTextDiv>
                        <AllPlansTextDiv
                          isSelected={allOrMock === "all"}
                          onClick={() => setAllOrMock("all")}
                        >
                          <AllPlansText>All Plans</AllPlansText>
                        </AllPlansTextDiv>
                        {/* <AllPlansTextDiv
                          isSelected={allOrMock === "mock"}
                          onClick={() => setAllOrMock("mock")}
                        >
                          <AllPlansText>Mock Test</AllPlansText>
                        </AllPlansTextDiv> */}
                      </TabsTextDiv>

                      <hr
                        style={{
                          height: "1px",
                          background: "#E8E8E8",
                          width: "100%",
                          position: "absolute",
                          top: "22px",
                        }}
                      ></hr>
                    </div>
                    <PlanDetailsOuterDiv style={{ marginTop: "25px" }}>
                      {subscriptions.map((plan, index) => (
                        <PlanDetailsDiv
                          key={plan.id}
                          isSelected={selected === plan.id}
                          style={{
                            marginTop: index >= 3 ? "20px" : "0px",
                            position: "relative",
                          }}
                        >
                          {plan.Discount > 0 && (
                            <DiscountStar discount={plan.Discount} />
                          )}
                          <div>
                            <PlanDetailsHeading isSelected={selected === plan.id}>
                              {plan.heading}
                            </PlanDetailsHeading>
                            <PlanDetailsDesc isSelected={selected === plan.id}>
                              {plan.description}
                            </PlanDetailsDesc>
                          </div>
                          {/* <FlexDiv
                            style={{
                              flexDirection: "column",
                              // alignItems: "flex-start",
                              gap: "30px",
                              // position: "absolute",
                              // top: "8rem", 
                            }}
                          > */}
                          <PriceDiv>
                            <PriceText isSelected={selected === plan.id}>
                            {plan.currencySymbol}{plan.price}
                            </PriceText>
                            {plan.actualPrice && (
                              <ActualPriceText isSelected={selected === plan.id}>
                              {plan.currencySymbol}{plan.actualPrice}
                              </ActualPriceText>
                            )}
                          </PriceDiv>
                          <UpgradeBtnDiv
                            isSelected={selected === plan.id}
                            onClick={() => handleCheckout(plan)}
                            disabled={["Purchased", "Locked"].includes(
                              userData.IsSubscribed
                                ? selected === plan.id
                                  ? "Purchased"
                                  : "Locked"
                                : plan.planName
                            )}
                          >
                            {userData.IsSubscribed
                              ? selected === plan.id
                                ? "Purchased"
                                : "Locked"
                              : plan.planName}
                          </UpgradeBtnDiv>
                          <PremiumFeaturesDiv>
                            {plan.premiumFeatures.map((detail, index) => (
                              <VIPSubDiv1 key={index}>
                                <img
                                  src={
                                    detail.included
                                      ? CheckCircleFilled
                                      : CancelCircleFilled
                                  }
                                  alt=""
                                />
                                <PremiumFeaturesListText
                                  isIncluded={detail.included}
                                  isSelected={selected === plan.id}
                                >
                                  {detail.text}
                                </PremiumFeaturesListText>
                              </VIPSubDiv1>
                            ))}
                          </PremiumFeaturesDiv>
                          {/* </FlexDiv> */}
                        </PlanDetailsDiv>
                      ))}
                    </PlanDetailsOuterDiv>
                  </>
                </div>
              )}
            </>
          ) : (
            <>
              <FlexDiv
                style={{
                  justifySelf: "center",
                  alignSelf: "center",
                  marginTop: "0.55rem",
                  padding: "20px",
                  backgroundColor: "#f9f8fc",
                  borderRadius: "8px",
                  width: "96%",
                  height: "60vh",
                  
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    justifySelf: "center",
                    alignSelf: "center",
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  {userData?.IsSubscribed && userData?.PlanID ? (
                    <>
                      <div style={{ marginBottom: "10px" }}>
                        <UpgradeDivBoldText
                          style={{
                            fontSize: "14px",
                            color: "#666",
                            alignItems: "center",
                            justifySelf: "center",
                            alignSelf: "center",
                            textAlign: "center",
                          }}
                        >
                          Your subscription has been activated.
                        </UpgradeDivBoldText>
                        <div
                          style={{
                            fontSize: "14px",
                            color: "white",
                            alignItems: "center",
                            justifySelf: "center",
                            alignSelf: "center",
                            textAlign: "center",
                          }}
                        >
                          You have full access to all features. Thank you for
                          being a valued member.
                        </div>
                      </div>
                      <UpgradeDivContactUs
                        onClick={() => window.open("/contact-us", "_blank")}
                        style={{
                          width: "40%",
                          borderRadius: "4px",
                          marginTop: "10px",
                          alignItems: "center",
                          justifySelf: "center",
                          alignSelf: "center",
                          textAlign: "center",
                          color: "white",

                        }}
                      >
                        Contact Support
                      </UpgradeDivContactUs>
                    </>
                  ) : (
                    <div>
                      <div
                        style={{
                          fontSize: "14px",
                          color: "#666",
                          alignItems: "center",
                          justifySelf: "center",
                          alignSelf: "center",
                          textAlign: "center",
                        }}
                      >
                        Upgrading your plan will provide you with full access to
                        premium features. Reach out to our support team for more
                        information.
                      </div>
                      <UpgradeDivContactUs
                        onClick={() => window.open("/contact-us", "_blank")}
                        style={{
                          width: "40%",
                          borderRadius: "4px",
                          marginTop: "10px",
                          alignItems: "center",
                          justifySelf: "center",
                          alignSelf: "center",
                          textAlign: "center",
                          color: "white",
                        }}
                      >
                        Please contact us to upgrade your subscription plan.
                      </UpgradeDivContactUs>
                    </div>
                  )}
                </div>
              </FlexDiv>
            </>
          )}
        </SideCardContainer>
      )}

      <Modal isOpen={open} style={modalStyle}>
        <CancelSubscriptionPopup
          close={() => {
            setOpen(false);
          }}
          setReason={setReason}
          onSubmit={() => {
            // submitCancelationRequest();
            console.log("Cancel Request Submit");
          }}
        />
      </Modal>
    </>
  );
};

export default PlanInfo;
