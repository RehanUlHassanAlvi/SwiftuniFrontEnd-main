import styled from "@emotion/styled";
import { FlexDiv } from "../../assets/styles/style";
import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  .fade-enter {
    opacity: 0;
    transition: opacity 300ms ease-in;
  }
  .fade-enter-active {
    opacity: 1;
  }
  .fade-exit {
    opacity: 1;
    transition: opacity 300ms ease-in;
  }
  .fade-exit-active {
    opacity: 0;
  }
`;

export const NavDiv = styled.div`
  height: 80px;
  width: 100%;
  display: flex;
  position: fixed;
  background: #fff;
  justify-content: center;
  z-index: 100;
  box-shadow: 0 5px 5px -3px #0000000d;
  @media (max-width: 1000px) {
    position: initial;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: 600px) {
    justify-content: space-between;
    align-items: center;
    height: 64px;
  }
`;

export const NavDivTwo = styled.div`
  max-width: 1780px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MainPageNavDivTwo = styled.div`
  width: 1880px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40rem;
  @media (max-width: 1980px) {
    width: 100%;
  }
  @media (max-width: 1500px) {
    gap: 30rem;
  }
  @media (max-width: 1310px) {
    gap: 24rem;
  }
  @media (max-width: 1220px) {
    gap: 13rem;
  }
  @media (max-width: 1050px) {
    gap: 6rem;
  }
  @media (max-width: 1000px) {
    gap: 0rem;
    justify-content: space-between;
  }
`;

export const NavInnerDiv = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  align-items: center;
  margin-left: 2%;
`;

export const NavLogoImg = styled.img`
  // width: 172px;
  // height: 46px;
   width: 162px;
  height: 36px;
  margin-left: 3%;
  cursor: pointer;
`;

export const NavText = styled.div`
  font-family: Noto Sans;
  font-size: 16px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: -0.009em;
  text-align: center;
  color: #7e7e8f;
  &:hover {
    color: #6b41cb;
  }
`;

export const NavArrow = styled.img`
  width: 24px;
  height: 24px;
`;

export const NavSmallArrow = styled.img`
  width: 12px;
  height: 7.41px;
`;

export const UpgradeOuterDiv = styled(FlexDiv)`
  gap: 10px;
  margin-right: 3%;
`;

export const UpgradeDiv = styled.div`
  min-width: 3.6rem;
  padding: 10px;
  border-radius: 34px;
  gap: 2px;
  background: linear-gradient(to right, #cc4499, #aa00ff, #663dff);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: box-shadow 0.3s ease, transform 0.3s ease, border 0.3s ease;
  &:hover {
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : "0 8px 16px -4px rgba(0, 0, 0, 0.3)"};
    transform: ${({ disabled }) => (disabled ? "none" : "scale(1.03)")};
  }
  @media (max-width: 1000px) {
    min-width: 4.2rem;
  }
`;

export const UpgradeDivContactUs = styled.div`
  min-width: 3.6rem;
  padding: 10px;
  border-radius: 34px;
  gap: 2px;
  color: white;
  background: linear-gradient(to left, #cc4499, #aa00ff, #663dff);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: box-shadow 0.3s ease, transform 0.3s ease, border 0.3s ease;
  &:hover {
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : "0 8px 16px -4px rgba(0, 0, 0, 0.3)"};
    transform: ${({ disabled }) => (disabled ? "none" : "scale(1.03)")};
  }
  @media (max-width: 1000px) {
    min-width: 4.2rem;
  }
`;




export const UpgradeDivBoldText = styled.div`
  font-family: Noto Sans;
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
  color: #fff;
`;

export const UpgradeDivSimpleText = styled.div`
  font-family: Noto Sans;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
  color: #fff;
`;

export const Search = styled.img`
  width: 18px;
  height: 18px;
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }

`;

export const NavDiamondImg = styled.img`
  width: 20px;
  height: 20px;
`;

export const UserLogo = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 44px;
`;

export const MobileNavMenu = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 3%;
  @media (max-width: 600px) {
    width: 16px;
    height: 16px;
  }
`;

export const MoreMenuDiv = styled.div`
  margin-top: 80px;
  z-index: 99;
  position: fixed;
  justify-content: center;
  padding: 15px 5px 25px;
  background: #fff;
  width: 100%;
  border-top: 1px solid #0000001a;
  box-shadow: 0 10px 10px #00000073;
`;

export const MegaMenuDiv = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 80px;
  z-index: 99;
  position: fixed;
  justify-content: space-between;
  padding: 20px 0rem;
  background: #fff;
  width: 100%;
  border-top: 1px solid #0000001a;
  box-shadow: 0 10px 10px #00000073;
  flex-direction: column;
`;

export const MegaMenuImg = styled.img`
  width: 44px;
  height: 44px;
`;

export const MegaMenuTextImg = styled.img`
  width: 152px;
  height: 34px;
`;

export const MegaMenuSpeakingLine = styled.div`
  width: 10.5rem;
  height: 0.125rem;
  background: #66e0f7;
  margin-left: 3rem;
`;

export const MegaMenuwritingLine = styled.div`
  width: 10rem;
  height: 0.125rem;
  background: #ff5d5d;
  margin-left: 3rem;
`;

export const MegaMenuSmallImg = styled.img`
  width: 16px;
  height: 16px;
`;

export const MegaMenuDivHeader = styled.div`
  font-family: "Noto Sans";
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
  margin-bottom: 10px;
`;

export const MegaMenuDivHeaderLine = styled.div`
  height: 2px;
  background: #66e0f7;
  width: 100%;
`;

export const MegaMenuSimpleText = styled.div`
  font-family: Noto Sans;
  font-size: clamp(13px, 1vw, 16px);
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: left;
  &:hover {
    color: var(--Brand-Purple, #996cfe);
  }
  
  ${({ isSelected }) => isSelected && `
    color: var(--Brand-Purple, #996cfe);
    font-weight: bold;
  `}
`;

export const NewDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ff5d5d;
  color: white;
  font-family: Poppins;
  border-radius: 5px;
  padding: 0.15em 0.4em;
  font-size: 75%;
  animation: scaleAnimation 3s ease-out infinite;
  @keyframes scaleAnimation {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
`;

export const MobileMenuDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 99;
  background: #fff;
  border-top: 1px solid #0000001a;
  box-shadow: 0px 2px 4px 0px #00000013;
  gap: 16px;
  padding: 3%;
`;

export const PTEAcademicDiv = styled.div`
  color: #000;
  width: 150px;
  text-align: center;
  border-radius: 5px;
  font-weight: 600;
  font-family: Poppins;
  cursor: pointer;
  border: 1px solid #996cfe;
  font-size: 1rem;
  padding: 5px 0px;
  &:hover {
    background: #996cfe;
    color: #fff;
  }
`;

export const PTECoreDiv = styled.div`
  color: #000;
  width: 150px;
  padding: 5px 0px;
  text-align: center;
  border-radius: 5px;
  font-weight: 600;
  font-family: Poppins;
  cursor: pointer;
  border: 1px solid #ff5d5d;
  font-size: 1rem;
  &:hover {
    background: #ff5d5d;
    color: #fff;
  }
`;

export const ToggleContainer = styled.div`
  display: inline-flex;
  padding: 0.25rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.4375rem;
  border: 1px solid #c6cbd9;
  background-color: white;
  position: relative;
  height: 2rem;
  flex-wrap: nowrap;
  width: 150px;
  gap: 0.25rem;
  transition: box-shadow 0.3s ease, transform 0.3s ease, border 0.3s ease;
  &:hover {
    border: 1px solid #996cfe;
    box-shadow: 0 8px 16px -4px rgba(0, 0, 0, 0.3);
    transform: scale(1.01);
  }
  @media (max-width: 450px) {
    width: 100%;
  }
`;

export const StyledButton = styled.button`
  height: 2rem;
  padding: 0.25rem 0.625rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  font-family: "Noto Sans";
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1rem;
  flex-wrap: nowrap;
  background: none;
  border: none;
  color: ${(props) => (props.isActive ? "white" : "black")};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
`;

export const LeftButton = styled(StyledButton)`
  width: 60px;
  @media (max-width: 450px) {
    width: 50%;
    justify-content: center;
  }
`;

export const RightButton = styled(StyledButton)`
  width: 90px;
  @media (max-width: 450px) {
    width: 50%;
    justify-content: center;
  }
`;

export const Slider = styled.div`
  position: absolute;
  height: 2rem;
  border-radius: 0.3375rem;
  background-color: #996cfe;
  top: 10%;
  z-index: 0;
  transition: left 0.4s, width 0.4s;
  width: ${(props) => (props.isActive === 0 ? "60px" : "90px")};
  left: ${(props) => (props.isActive === 0 ? "2%" : "calc(100% - 90px - 2%)")};
  @media (max-width: 450px) {
    width: ${(props) =>
      props.isActive === 0 ? "calc(50% - 0.125rem)" : "calc(50% - 0.125rem)"};
    left: ${(props) => (props.isActive === 0 ? "1%" : "calc(50%)")};
  }

  //   @media (max-width: 450px) {
  //   width: ${(props) =>
    props.isActive === 0 ? "calc(50% - 0.125rem)" : "calc(50% - 0.125rem)"};
  //   left: ${(props) =>
    props.isActive === 0 ? "0.125rem" : "calc(50% + 0.125rem)"};
  // }
`;
