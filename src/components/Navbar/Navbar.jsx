import React, { useState, useEffect, useRef } from "react";
import {
  MegaMenuDiv,
  MobileNavMenu,
  NavArrow,
  NavDiamondImg,
  NavDiv,
  NavDivTwo,
  NavInnerDiv,
  NavLogoImg,
  NavSmallArrow,
  NavText,
  Search,
  UpgradeDiv,
  UpgradeDivBoldText,
  UpgradeDivSimpleText,
  UpgradeOuterDiv,
  UserLogo,
} from "./style";
import SwiftLogo from "../../assets/images/navlogo.svg";
import NavArrowImg from "../../assets/images/navarrow.svg";
import NavSArrow from "../../assets/images/navsmallarrow.svg";
import SearchImg from "../../assets/images/navsearch.svg";
import { Btn, FlexDiv } from "../../assets/styles/style";
import DiamondImg from "../../assets/images/navdiamond.svg";
import UserAvatar from "../../assets/images/user-avatar.png";
import MobileMenu from "../../assets/images/mobilemenu.svg";
import { useMediaQuery } from "@mui/material";
import MoreMenu from "./MoreMenu";
import MegaMenu from "./MegaMenu";
import MobileNav from "./MobileNav";
import Collapse from "@mui/material/Collapse";
import { useNavigate } from "react-router-dom";
import ProfileDropDown from "./ProfileDropDown";
import PteToggleBtn from "./PteToggleBtn";
import { Base_URL } from "../../Client/apiURL";
import { useTestQuestions } from "../../context/TestQuestionContext";

const Navbar = () => {
  const isLaptop = useMediaQuery("(max-width:1000px)");
  const [moreMenu, setMoreMenu] = useState(false);
  const [megaMenu, setMegaMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [urlColor, setUrlColor] = useState([false, false, false, false]);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const [storedUserImage, setStoredUserImage] = useState(null);
  const [selectedText, setSelectedText] = useState(true);
  const [active, setActive] = useState(0);
  const [showVIP, setShowVIP] = useState(false);
  const [remianingDays, setRemianingDays] = useState(null);
  const userData = JSON.parse(localStorage.getItem("userData")) || {};
  const portalData = JSON.parse(localStorage.getItem("portalData")) || {};
  const [subDays, setSubDays] = useState(0);
  const { resetAllStates } = useTestQuestions();

  useEffect(() => {
    const item = localStorage.getItem("pte-type");
    if (item === "pte academic") {
      setSelectedText(true); 
      setActive(0);
    } else {
      setSelectedText(false);
      setActive(1);
    }
  }, []);

  useEffect(() => {
    const storedUserDataString = localStorage.getItem("userData");
    if (storedUserDataString) {
      const storedUserData = JSON.parse(storedUserDataString);
      if (storedUserData && storedUserData.UserName) {
        setUserName(storedUserData.UserName);
        setStoredUserImage(storedUserData.ImageUrl);
      }
      if(storedUserData.IsSubscribed){
        setShowVIP(false);
      }else{
        setShowVIP(true);
      }
      
      const givenDateString = storedUserData.SubscriptionEndTimeUTC;
      if (givenDateString) {
        const givenDate = new Date(givenDateString);
        const currentDate = new Date();
        const timeDifference = givenDate - currentDate;
        const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        setRemianingDays(dayDifference);
      } else {
        setRemianingDays(0);
      }
      
    }
  }, []);

  // useEffect(() => {
  //   const storedUserDataString = localStorage.getItem("userData");
  //   if (storedUserDataString) {
  //     const storedUserData = JSON.parse(storedUserDataString);
  
  //     if (storedUserData && storedUserData.UserName) {
  //       setUserName(storedUserData.UserName);
  //       setStoredUserImage(storedUserData.ImageUrl);
  //     }
  
  //     if (storedUserData.IsSubscribed) {
  //       const givenDateString = storedUserData.SubscriptionEndTimeUTC;
  //       if (givenDateString) {
  //         const givenDate = new Date(givenDateString);
  //         const currentDate = new Date();
  
  //         if (currentDate > givenDate) {
  //           setShowVIP(true);
  //         } else {
  //           setShowVIP(false);
  //         }

  //         const timeDifference = givenDate - currentDate;
  //         const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  //         setRemianingDays(dayDifference);
  //       } else {
  //         setShowVIP(true);
  //         setRemianingDays(null);
  //       }
  //     } else {
  //       setShowVIP(true); 
  //     }
  //   }
  // }, []);
  

  useEffect(() => {
    const handleUserDataChange = () => {
      const storedUserDataString = localStorage.getItem("userData");
      if (storedUserDataString) {
        const storedUserData = JSON.parse(storedUserDataString);
        if (storedUserData && storedUserData.UserName) {
          setUserName(storedUserData.UserName);
          setStoredUserImage(storedUserData.ImageUrl);
        }
        if (storedUserData.IsSubscribed) {
          setShowVIP(false);
        } else {
          setShowVIP(true);
        }

        const givenDateString = storedUserData.SubscriptionEndTimeUTC;
        if (givenDateString) {
          const givenDate = new Date(givenDateString);
          const currentDate = new Date();
          const timeDifference = givenDate - currentDate;
          const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
          setRemianingDays(dayDifference);
        } else {
          setRemianingDays(null);
        }

      }
    };

    window.addEventListener('userDataChanged', handleUserDataChange);

    return () => {
      window.removeEventListener('userDataChanged', handleUserDataChange);
    };
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const response = await fetch(
        `${Base_URL}/app/users/subscriptions/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await response.json();
      if (data.responseCode === 200) {
        data.response.map((item) => {
          if(item.Id ===  userData.SubscriptionID){
            const givenDateString = userData.SubscriptionEndTimeUTC;
            const givenDate = new Date(givenDateString);
            const currentDate = new Date();
            const timeDifference = givenDate - currentDate;
            const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
            setSubDays(item.Days);
            if(item.Days > 0 && item.Days){
              setRemianingDays(dayDifference);
            }
          }
        });
      }
    } catch (error) {
      console.error("Failed to fetch subscriptions:", error);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);  

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigateTo = (url) => {
    resetAllStates();
    navigate(url)
  }

  useEffect(() => {
    const currentURL = window.location.pathname;
    const homePath = "/";
    const practicePaths = ["/reading", "/writing", "/speaking", "/listening"];
    const mockTestPath = "/MockTest";
    const morePaths = [
      "/templates",
      "/grammar",
      "/vocab-bank",
      "/score-feedback",
      "/strategy-videos",
      "mt-score",
      "/ai-study-plan",
      // "/pte-guide",
      "https://swiftuni.com/pte-guide/",
    ];

    let newColors = [false, false, false, false];

    if (currentURL === homePath) {
      newColors[0] = true;
    } else if (practicePaths.some((path) => currentURL.includes(path))) {
      newColors[1] = true;
    } else if (currentURL.includes(mockTestPath)) {
      newColors[2] = true;
    } else if (morePaths.some((path) => currentURL.includes(path))) {
      newColors[3] = true;
    }

    setUrlColor(newColors);
  }, [window.location.pathname]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const navInnerDiv = document.getElementById("nav-inner-div");
      const moreMenu = document.getElementById("more-menu");
      const megaMenu = document.getElementById("mega-menu");

      if (navInnerDiv && navInnerDiv.contains(event.target)) {
        return;
      }
      if (moreMenu && moreMenu.contains(event.target)) {
        return;
      }
      if (megaMenu && megaMenu.contains(event.target)) {
        return;
      }

      setMoreMenu(false);
      setMegaMenu(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const normalizeImageURL = (url) => {
    if (!url) return null;

    // Fix SVG URLs with '+xml'
    if (url.endsWith(".svg+xml")) {
      return url.replace(".svg+xml", ".svg");
    }

    return url; // Return other URLs unchanged
  };

  return (
    <>
      <NavDiv id="navbar">
        <NavDivTwo>
          {isLaptop && 

          <NavLogoImg alt="Logo" 
          src={portalData && portalData.portal_logo ? normalizeImageURL(portalData.portal_logo) : SwiftLogo}
          onClick={() => navigate("/")}
          />

          }
          {!isLaptop && (
            <>
              <NavInnerDiv id="nav-inner-div">
                {!isLaptop && <NavLogoImg alt="Logo" 
                  src={portalData && portalData.portal_logo ? normalizeImageURL(portalData.portal_logo)  : SwiftLogo}
                onClick={() => navigate("/")} />}
                <Btn onClick={() => navigateTo("/")}>
                  <NavText style={{ color: urlColor[0] ? "#6B41CB" : "" }}>
                    Home
                  </NavText>
                </Btn>
                <Btn
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setMoreMenu(false);
                    setMegaMenu(!megaMenu);
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "9px",
                    }}
                  >
                    <NavText style={{ color: urlColor[1] ? "#6B41CB" : "" }}>
                      Practice
                    </NavText>
                    <NavSmallArrow
                      alt=""
                      src={NavSArrow}
                      style={{ transform: megaMenu && "rotate(180deg)" }}
                    />
                  </div>
                </Btn>
                <Btn
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setMoreMenu(false);
                    setMegaMenu(false);
                    navigateTo("/MockTest");
                  }}
                >
                  <NavText
                    style={{
                      color: urlColor[2] ? "#6B41CB" : "",
                      width: "7rem",
                    }}
                  >
                    Mock Tests
                  </NavText>
                </Btn>
                <Btn
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setMegaMenu(false);
                    setMoreMenu(!moreMenu);
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "9px",
                    }}
                  >
                    <NavText style={{ color: urlColor[3] ? "#6B41CB" : "" }}>
                      More
                    </NavText>
                    <NavSmallArrow
                      alt=""
                      src={NavSArrow}
                      style={{ transform: moreMenu && "rotate(180deg)" }}
                    />
                  </div>
                </Btn>
                <Search alt="" src={SearchImg} onClick={() => navigateTo("/search")} />
              </NavInnerDiv>
              <UpgradeOuterDiv>
                {showVIP? (
                <UpgradeDiv onClick={()=> {
                  navigate("/sidebar", { state: { section:'Plan Info'} });
                }}>
                  <NavDiamondImg alt="" src={DiamondImg} />
                  <UpgradeDivBoldText>Upgrade</UpgradeDivBoldText>
                  <UpgradeDivSimpleText>VIP</UpgradeDivSimpleText>
                </UpgradeDiv>):
                (
                  <UpgradeDiv onClick={()=> {
                    navigate("/sidebar", { state: { section:'Plan Info'} });
                  }}>

                    {remianingDays !== null && (
                      <UpgradeDivBoldText>{remianingDays}</UpgradeDivBoldText>
                    )}
                    <UpgradeDivSimpleText>Days left</UpgradeDivSimpleText>
                  </UpgradeDiv>)                
                }
                <FlexDiv>
                  <PteToggleBtn active={active} setActive={setActive} />
                </FlexDiv>
                <FlexDiv style={{ cursor: "pointer" }} onClick={handleClick}>
                  <UserLogo alt="" src={storedUserImage || UserAvatar} />
                  <NavArrow
                    alt=""
                    src={NavArrowImg}
                    style={{
                      transform: open && "rotate(180deg)",
                    }}
                  />
                </FlexDiv>
                <ProfileDropDown
                  anchorEl={anchorEl}
                  open={open}
                  handleClose={handleClose}
                  userImage={storedUserImage || UserAvatar}
                  userName={userName}
                />
              </UpgradeOuterDiv>
            </>
          )}
          {isLaptop && (
            <>
              <UpgradeOuterDiv>
              {showVIP? (
                <UpgradeDiv onClick={()=> {
                  navigate("/sidebar", { state: { section:'Plan Info'} });
                }}>
                  <NavDiamondImg alt="" src={DiamondImg} />
                  <UpgradeDivBoldText>Upgrade</UpgradeDivBoldText>
                  <UpgradeDivSimpleText>VIP</UpgradeDivSimpleText>
                </UpgradeDiv>):
                (
                  <UpgradeDiv onClick={()=> {
                    navigate("/sidebar", { state: { section:'Plan Info'} });
                  }}>
                    {remianingDays !== null && (
                      <UpgradeDivBoldText>{remianingDays}</UpgradeDivBoldText>
                    )}
                    <UpgradeDivSimpleText>Days left</UpgradeDivSimpleText>
                  </UpgradeDiv>)                
                }
                <FlexDiv style={{ cursor: "pointer" }} onClick={handleClick}>
                  <UserLogo alt="" src={storedUserImage || UserAvatar} />
                  <NavArrow
                    alt=""
                    src={NavArrowImg}
                    style={{
                      transform: open && "rotate(180deg)",
                    }}
                  />
                </FlexDiv>
                <Btn
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setMobileMenu(!mobileMenu);
                  }}
                >
                  <MobileNavMenu alt="" src={MobileMenu} />
                </Btn>
              </UpgradeOuterDiv>
            </>
          )}
        </NavDivTwo>
        <ProfileDropDown
          anchorEl={anchorEl}
          open={open}
          handleClose={handleClose}
          userImage={storedUserImage || UserAvatar}
          userName={userName}
        />
      </NavDiv>
      {!isLaptop && (
        <Collapse in={moreMenu} timeout="auto" unmountOnExit>
          <MoreMenu />
        </Collapse>
      )}
      {!isLaptop && (
        <Collapse in={megaMenu} timeout="auto" unmountOnExit>
          <MegaMenuDiv>
            <MegaMenu selectedText={selectedText} />
          </MegaMenuDiv>
        </Collapse>
      )}
      {isLaptop && (
        <Collapse in={mobileMenu} timeout="auto" unmountOnExit>
          <MobileNav />
        </Collapse>
      )}
    </>
  );
};

export default Navbar;
