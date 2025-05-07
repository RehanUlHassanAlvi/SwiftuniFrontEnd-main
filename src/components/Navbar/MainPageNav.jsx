import React, { useState } from "react";
import {
  MainPageNavDivTwo,
  MegaMenuDiv,
  MobileNavMenu,
  NavArrow,
  NavDiamondImg,
  NavDiv,
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

const MainPageNav = () => {
  const isLaptop = useMediaQuery("(max-width:1000px)");
  const [moreMenu, setMoreMenu] = useState(false);
  const [megaMenu, setMegaMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [storedUserImage, setStoredUserImage] = useState(null);
  const [selectedText, setSelectedText] = useState(true);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const storedUserData = JSON.parse(storedUserData);
      if (storedUserData && storedUserData.ImageUrl) {
        setStoredUserImage(storedUserData.ImageUrl);
      }
    }
  }, []);

  useEffect(() => {
    const item = localStorage.getItem("pte-type");
    if (item === "pte academic") {
      setSelectedText(true);
      // setActive(0);
    } else {
      setSelectedText(false);
      // setActive(1);
    }
  }, []);

  return (
    <>
      <NavDiv>
        <MainPageNavDivTwo>
          {isLaptop && <NavLogoImg alt="" src={SwiftLogo} />}
          {!isLaptop ? (
            <>
              <NavInnerDiv>
                {!isLaptop && <NavLogoImg alt="" src={SwiftLogo} />}
                <NavText style={{ color: "#6B41CB" }}>Home</NavText>
                <Btn
                  style={{ cursor: "pointer" }}
                  onClick={() => {
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
                    <NavText>Practice</NavText>
                    <NavSmallArrow
                      alt=""
                      src={NavSArrow}
                      style={{ transform: megaMenu && "rotate(180deg)" }}
                    />
                  </div>
                </Btn>
                <NavText style={{ width: "81.5px" }}>Mock Tests</NavText>
                <Btn
                  style={{ cursor: "pointer" }}
                  onClick={() => {
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
                    <NavText>More</NavText>
                    <NavSmallArrow
                      alt=""
                      src={NavSArrow}
                      style={{ transform: moreMenu && "rotate(180deg)" }}
                    />
                  </div>
                </Btn>
                <Search alt="" src={SearchImg} />
              </NavInnerDiv>
              <UpgradeOuterDiv>
                <UpgradeDiv>
                  <NavDiamondImg alt="" src={DiamondImg} />
                  <UpgradeDivBoldText>Upgrade</UpgradeDivBoldText>
                  <UpgradeDivSimpleText>VIP</UpgradeDivSimpleText>
                </UpgradeDiv>
                <FlexDiv>
                  <UserLogo alt="" src={storedUserImage || UserAvatar} />
                  <NavArrow alt="" src={NavArrowImg} />
                </FlexDiv>
              </UpgradeOuterDiv>
            </>
          ) : (
            <Btn
              style={{ cursor: "pointer" }}
              onClick={() => {
                setMobileMenu(!mobileMenu);
              }}
            >
              <MobileNavMenu alt="" src={MobileMenu} />
            </Btn>
          )}
        </MainPageNavDivTwo>
      </NavDiv>
      {!isLaptop && (
        <Collapse in={moreMenu} timeout="auto" unmountOnExit>
          <MoreMenu />
        </Collapse>
      )}
      {!isLaptop && (
        <Collapse in={megaMenu} timeout="auto" unmountOnExit>
          <MegaMenuDiv>
            <MegaMenu selectedText={selectedText}/>
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

export default MainPageNav;
