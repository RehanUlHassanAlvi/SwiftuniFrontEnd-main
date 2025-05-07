import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  SidebarContainer,
  SidebarNameSection,
  SidebarSection,
  Avatar,
  Name,
  SectionItem,
  SectionIcon,
  SectionText,
  ContentArea,
} from "./style";
import { FlexDiv } from "../../assets/styles/style";
import SidebarMyProfileImg from "../../assets/images/sidebar-myprofile.svg";
import SidebarAnnouncementImg from "../../assets/images/sidebar-announcement.svg";
import SidebarPlaninfoImg from "../../assets/images/sidebar-planinfo.svg";
import SidebarPaymenthistoryImg from "../../assets/images/sidebar-paymenthistory.svg";
import SidebarHelpImg from "../../assets/images/sidebar-contactus.svg";
import SidebarContactusImg from "../../assets/images/sidebar-contactus.svg";
import SidebarLogoutImg from "../../assets/images/sidebar-logout.svg";
import FAQs from "./FAQs";
import PlanInfo from "./PlanInfo";
import MyProfile from "./MyProfile";
import Announcement from "./Announcement";
import PaymentHistory from "./PaymentHistory";
import useMediaQuery from "@mui/material/useMediaQuery";
import Navbar from "../Navbar/Navbar";
import UserAvatar from "../../assets/images/user-avatar.png";
import { useAuth } from "../../authentication/Auth";
import { useNavigate, useLocation } from "react-router-dom";
import SnackbarAlert from "../Login/SnackbarAlert";
import DeleteIcon from "../../assets/images/DeleteAccount.svg";
import Modal from "react-modal";
import SureToDeletePopup from "./SureToDeletePopup";
import LoadingModal from "../Common/LoadingModal";
import { Base_URL } from "../../Client/apiURL";

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

const Sidebar = () => {
  const isSmallScreen = useMediaQuery("(max-width:1000px)");
  const location = useLocation();
  const navigate = useNavigate();
  const { section } = location.state || {};
  const [activeSection, setActiveSection] = useState(section);
  const [userData, setUserData] = useState(null);
  const [storedUserImage, setStoredUserImage] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarVariant, setSnackbarVariant] = useState("outlined");
  const [snackbarColor, setSnackbarColor] = useState("neutral");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();

  useEffect(() => {
    const storedUserDataString = localStorage.getItem("userData");
    if (storedUserDataString) {
      const storedUserData = JSON.parse(storedUserDataString);
      if (storedUserData && storedUserData.UserName) {
        setUserData(storedUserData);
        setStoredUserImage(storedUserData.ImageUrl);
      }
    }
  }, []);


  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const orderID = searchParams.get("O");
    if (orderID) {
      const storedPlanId = localStorage.getItem("currentSubscriptionId");
      if (storedPlanId) {
        transactionAPIs(orderID, storedPlanId);
        navigate(location.pathname);
      }
    }
  }, [location]);

  const transactionAPIs = async (orderID, subscriptionID) => {
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

      console.log(
        "transactionResponse.data: ",
        transactionResponse.data
      );

      if (
        transactionResponse.status === 200 &&
        transactionResponse.data.responseCode === 200
      ) {
        console.log(
          "Success: Payment success recorded",
          transactionResponse.data
        );
      } else {
        console.error(
          "Failed: Payment success recording",
          transactionResponse.data
        );
      }

      localStorage.removeItem("currentSubscriptionId");
    } catch (error) {
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
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const openSureToDeletePopup = () => {
    setOpen(true);
  };

  const handleDeleteProfile = async () => {
    setLoading(true);
    setTimeout(async () => {
      await deleteProfile();
      setLoading(false);
      setOpen(false);
      window.location.reload();
    }, 2000);
  };

  const deleteProfile = async () => {
    try {
      const response = await fetch(
        `${Base_URL}/app/users/delete-user-permanently`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (data.responseCode === 200) {
        localStorage.removeItem("userData");
        localStorage.removeItem("pte-type");
        navigate("/login");
        setSnackbarMessage(data.message || "Profile Deleted Successfully");
        setSnackbarVariant("outlined");
        setSnackbarColor("danger");
        setSnackbarOpen(true);
      } else {
        console.error("Failed to delete profile:", data.message);
      }
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };

  const handleContactUs = () => {
    navigate("/contact-us");
  };



  const sections = [
    { icon: SidebarMyProfileImg, text: "My Profile", card: MyProfile },
    {
      icon: SidebarAnnouncementImg,
      text: "Announcement",
      card: Announcement,
    },
    { icon: SidebarPlaninfoImg, text: "Plan Info", card: PlanInfo },
    {
      icon: SidebarPaymenthistoryImg,
      text: "Payment History",
      card: PaymentHistory,
    },
    { icon: SidebarHelpImg, text: "Help (Q&A)", card: FAQs },
    { icon: SidebarContactusImg, text: "Contact Us", card: handleContactUs },
    { icon: DeleteIcon, text: "Delete Account", card: openSureToDeletePopup },
    { icon: SidebarLogoutImg, text: "Log Out", card: handleLogout },
  ];

  const renderActiveCard = () => {
    const activeItem = sections.find(
      (section) => section.text === activeSection
    );
    if (!activeItem || !activeItem.card) return null;
    const ActiveCardComponent = activeItem.card;
    return typeof ActiveCardComponent === "string" ? null : (
      <ActiveCardComponent />
    );
  };

  const handleSectionClick = (sectionText, text) => {
    if (sectionText !== "Delete Account") {
      setActiveSection(activeSection === sectionText ? text : sectionText);
    } else if (sectionText === "Delete Account") {
      openSureToDeletePopup();
    }
  };

  const renderSidebarSections = () => {
    return sections.map((section, index) => (
      <SectionItem
        tabIndex="0"
        key={index}
        onClick={() =>
          handleSectionClick(section.text, isSmallScreen ? null : section.text)
        }
        style={{
          display:
            isSmallScreen && activeSection && activeSection !== section.text
              ? "none"
              : "flex",
        }}
      >
        <SectionIcon src={section.icon} alt={section.text} />
        <SectionText>{section.text}</SectionText>
      </SectionItem>
    ));
  };

  const baseHeight = isSmallScreen && activeSection ? 40 : 65;
  const sectionHeight = isSmallScreen && activeSection ? 0 : 55;
  const totalSections = sections.length;
  const dynamicHeight =
    isSmallScreen && activeSection
      ? baseHeight + sectionHeight
      : baseHeight + sectionHeight * totalSections;

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const scorecardElement = document.getElementById("sure-to-delete");
      if (scorecardElement && !scorecardElement.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <SnackbarAlert
        open={snackbarOpen}
        setOpen={setSnackbarOpen}
        message={snackbarMessage}
        variant={snackbarVariant}
        color={snackbarColor}
      />
      {loading && <LoadingModal />}
      <Modal isOpen={open} style={modalStyle}>
        <SureToDeletePopup close={setOpen} onDelete={handleDeleteProfile} subscription={userData?.IsSubscribed} />
      </Modal>
      <Navbar />
      <FlexDiv style={{ justifyContent: "center" }}>
        <FlexDiv
          style={{
            flexDirection: isSmallScreen ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isSmallScreen ? "center" : "flex-start",
            width: "90%",
            maxWidth: "1680px",
            padding: isSmallScreen ? "1.5rem 0rem 1rem" : "6.5rem 0rem 1rem",
          }}
        >
          <SidebarContainer
            style={{
              height: `${dynamicHeight}px`,
              // marginRight: isSmallScreen ? "0" : "40px",
            }}
          >
            {!isSmallScreen && (
              <>
                <SidebarNameSection>
                  <Avatar src={storedUserImage || UserAvatar} alt="user" />
                  {userData && <Name>{userData?.UserName}</Name>}
                </SidebarNameSection>
                <hr />
              </>
            )}
            <SidebarSection as="nav">{renderSidebarSections()}</SidebarSection>
          </SidebarContainer>
          {(isSmallScreen && activeSection) || !isSmallScreen ? (
            <ContentArea style={{ width: isSmallScreen ? "100%" : "80%" }}>
              {renderActiveCard()}
            </ContentArea>
          ) : null}
        </FlexDiv>
      </FlexDiv>
    </>
  );
};

export default Sidebar;
