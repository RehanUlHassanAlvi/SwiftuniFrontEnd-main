import styled from "@emotion/styled";
import { FlexDiv } from "../../assets/styles/style";

export const MainImg = styled.img`
  width: 120px;
  height: 120px;
`;

export const Card = styled.div`
  /* width: 406px; */
  // height: 490px;
  padding: 48px;
  border-radius: 24px;
  background: #fff;
  @media (max-width: 1050px) {
    padding: 48px 36px;
  }
  @media (max-width: 990px) {
    padding: 48px 18px;
  }
  @media (max-width: 380px) {
    padding: 48px 8px;
  }
`;

export const SignUpText = styled.div`
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
  color: #996cfe;
  &:hover {
    text-decoration: underline;
  }
`;

export const HaveAnAccount = styled.div`
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
`;

export const GoogleText = styled.div`
  font-family: Inter;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: left;
`;

export const GoogleDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 408px;
  height: 40px;
  border-radius: 5px;
  background: #eee;
  box-shadow: 0px 0px 0px 0px #00062e32;
  margin-top: 24px;
  cursor: pointer;
  transition: box-shadow 0.3s ease, transform 0.3s ease, color 0.3s ease;
  &:hover {
    /* color: #996cfe; */
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : "0 8px 16px -4px rgba(0, 0, 0, 0.2)"};
    transform: ${({ disabled }) => (disabled ? "none" : "translateY(-2px)")};
  }
  @media (max-width: 500px) {
    width: 326px;
  }
`;

export const OR = styled.div`
  font-family: Inter;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.05999999865889549px;
  text-align: left;
  color: #0007149f;
`;

export const Line = styled.div`
  width: 185px;
  //190
  height: 1px;
  display: flex;
  justify-content: center;
  align-self: center;
  /* top: 383px;
  left: 221px; */
  background: #00002f26;
  @media (max-width: 500px) {
    width: 145px;
  }
`;

export const ContinueDiv = styled.div`
  width: 404px;
  height: 40px;
  border-radius: 5px;
  background: #996cfe;
  margin-top: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: box-shadow 0.3s ease, transform 0.3s ease, color 0.3s ease;
  &:hover {
    /* color: #996cfe; */
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : "0 8px 16px -4px rgba(0, 0, 0, 0.2)"};
    transform: ${({ disabled }) => (disabled ? "none" : "translateY(-2px)")};
  }
  @media (max-width: 500px) {
    width: 326px;
  }
`;

export const ContinueText = styled.div`
  font-family: Inter;
  font-size: 16px;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: -0.009em;
  text-align: left;
  color: #fff;
`;

export const Arrow = styled.img`
  width: 16px;
  height: 16px;
`;

export const MainText = styled.div`
  color: #2b333b;
  font-family: Inter;
  font-size: 28px;
  font-weight: 700;
  line-height: 35px;
  letter-spacing: 0em;
  text-align: left;
  margin-top: 16px;
  margin-bottom: 48px;
`;

export const CredenialsText = styled.div`
  font-family: Inter;
  font-size: 14px;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
`;

export const ForgotPass = styled.div`
  font-family: Inter;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: right;
  color: #996cfe;
`;

export const ConstraintsText = styled.div`
  color: rgba(0, 0, 0, 0.5);
  leading-trim: both;
  text-edge: cap;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 160% */
  white-space: nowrap;
  // width: 180px;
`;

export const WeakText = styled.div`
  color: #e8352b;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px; /* 150% */
  white-space: nowrap;
  margin-right: 10px;
  // width: 160px;
`;

export const TermsCondText = styled.div`
  color: rgba(0, 0, 0, 0.5);
  leading-trim: both;
  text-edge: cap;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 160% */
  width: 342px;
  margin-left: 8px;
  span {
    color: #996cfe;
  }
  @media (max-width: 500px) {
    width: 294px;
  }
`;

export const TermsCondText2 = styled.div`
  color: rgba(0, 0, 0, 0.5);
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 160% */
  width: 342px;
  margin-left: 15px;
  span {
    color: #996cfe;
  }
  @media (max-width: 500px) {
    width: max-content;
    margin-left: 0px;
  }
`;

export const PowerdBySwiftuniText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  color: rgba(0, 0, 0, 0.5);
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
  padding-top: 30px;
  // margin: "50px 0px 0px 0px";
  span {
    color: #996cfe;
  }
  @media (max-width: 500px) {
    width: max-content;
    margin-left: 0px;
  }
`;

export const InputWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
`;

export const Inputs = styled.input`
  /* width: 372px; */
  width: 93%;
  height: 40px;
  border-radius: 5px;
  border: 1px;
  border: 1px solid #f2f3f7;
  box-shadow: 0px 0px 0px 0px #0009321f;
  color: #9a9aaf;
  padding: 0px 16px;
  transition: border 0.3s ease, box-shadow 0.3s ease;
  :focus {
    outline: none;
    border: 1px solid rgba(153, 108, 254, 0.3);
    box-shadow: 0 0 8px rgba(153, 108, 254, 0.3);
  }
  @media (max-width: 500px) {
    width: 294px;
  }
`;

export const ToggleText = styled.span`
  color: rgba(0, 0, 0, 0.6);
  text-align: center;
  text-edge: cap;
  // font-family: Montserrat;
  font-family: Inter;
  font-style: normal;
  line-height: 23px; /* 143.75% */
  position: absolute;
  right: 10px;
  cursor: pointer;
  user-select: none;
  leading-trim: both;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
  @media (max-width: 500px) {
    font-size: 13px;
  }
`;

export const ImageDiv = styled.div`
  border-radius: 14.5px;
  width: max-content;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 2px 3px 0px #00000026, 0px 0.5px 2px 0px #00000033;
  padding: 8px;
`;

export const Book = styled.img`
  width: 38.12px;
  height: 38.12px;
  padding: 3.18px, 1.59px, 1.59px, 4.76px;
`;

export const GmailLogo = styled.img`
  width: 16px;
  height: 16px;
`;

export const OuterFlexDiv = styled(FlexDiv)`
  min-height: 100vh;
  // @media (max-height: 815px) {
  //   height: 120vh;
  // }
  // @media (max-height: 680px) {
  //   height: 135vh;
  // }
`;

// export const MainContainer = styled.div`
//   width: 500px;
//   height: 400px;
//   // padding: 105px 96px;
//   // padding: 2%;
//   justify-content: center;
//   display: flex;
//   align-items: center;
//   flex-shrink: 0;
//   border-radius: 12px;
//   background: #fefefe;
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   z-index: 10001;
//   @media (max-width: 815px) {
//     width: 400px;
//     height: 360px;
//   }
//   @media (max-width: 500px) {
//     width: 330px;
//     height: 290px;
//   }
//   @media (max-width: 360px) {
//     width: 300px;
//     height: 270px;
//   }
// `;

// export const RelativeContainer = styled.div`
//   position: relative;
// `;

// export const InnerContainer = styled.div`
//   width: 309px;
//   // height: 128px;
//   flex-shrink: 0;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 12px;
//   @media (max-width: 815px) {
//     width: 290px;
//     height: 130px;
//   }
//   @media (max-width: 500px) {
//     width: 300px;
//     height: 160px;
//   }
//   @media (max-width: 360px) {
//     width: 280px;
//     height: 150px;
//   }
// `;

// export const VerificationIcon = styled.div`
//   font-size: 48px;
//   @media (max-width: 815px) {
//     font-size: 40px;
//   }
//   @media (max-width: 500px) {
//     font-size: 30px;
//   }
// `;

// export const VerificationStatus = styled.div`
//   color: #000;
//   font-family: "Noto Sans";
//   font-size: 18px;
//   font-weight: 600;
//   line-height: 16px;
//   @media (max-width: 815px) {
//     font-size: 17px;
//   }
//   @media (max-width: 500px) {
//     font-size: 15px;
//   }
// `;

// export const VerificationMessage = styled.div`
//   color: #7e7e8f;
//   font-family: "Noto Sans";
//   font-size: 14px;
//   font-weight: 400;
//   line-height: 16px;
//   @media (max-width: 815px) {
//     font-size: 13px;
//   }
//   @media (max-width: 500px) {
//     font-size: 11px;
//   }
// `;

// export const VerificationButton = styled.button`
//   display: inline-flex;
//   padding: 10px 22px;
//   justify-content: center;
//   align-items: center;
//   gap: 10px;
//   border-radius: 4px;
//   background: #996cfe;
//   border: none;
//   cursor: pointer;
//   margin-top: 12px;
//   color: #fff;
//   text-align: center;
//   font-family: "Noto Sans";
//   font-size: 14px;
//   font-style: normal;
//   font-weight: 500;
//   line-height: 128.571%;
//   @media (max-width: 815px) {
//     padding: 9px 20px;
//   }
//   @media (max-width: 500px) {
//     padding: 7px 16px;
//   }
// `;

// Wrapper for the entire popup modal



export const MainContainer = styled.div`
  width: 500px;
  height: 400px;
  justify-content: center;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  border-radius: 12px;
  background: #fefefe;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10001;

  /* Keep original sizes on larger screens */
  @media (max-width: 815px) {
    width: 400px;
    height: 360px;
  }

  @media (max-width: 500px) {
    width: 330px;
    height: 290px;
  }

  @media (max-width: 360px) {
    width: 300px;
    height: 270px;
  }
`;

export const RelativeContainer = styled.div`
  position: relative;
`;

export const InnerContainer = styled.div`
  width: 309px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  /* Keep original dimensions on large screens */
  @media (max-width: 815px) {
    width: 290px;
    /* Slight height adjustments only if needed */
    /* height: 130px; // uncomment if desired */
  }

  @media (max-width: 500px) {
    width: 300px;
    /* height: 160px; // uncomment if desired */
  }

  @media (max-width: 360px) {
    width: 280px;
    /* height: 150px; // uncomment if desired */
  }
`;

export const VerificationIcon = styled.div`
  font-size: 48px;

  @media (max-width: 815px) {
    font-size: 40px;
  }

  @media (max-width: 500px) {
    font-size: 30px;
  }
`;

export const VerificationStatus = styled.div`
  color: #000;
  font-family: "Noto Sans";
  font-size: 18px;
  font-weight: 600;
  line-height: 16px;

  @media (max-width: 815px) {
    font-size: 17px;
  }

  @media (max-width: 500px) {
    font-size: 15px;
  }
`;

export const VerificationMessage = styled.div`
  color: #7e7e8f;
  font-family: "Noto Sans";
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;

  @media (max-width: 815px) {
    font-size: 13px;
  }

  @media (max-width: 500px) {
    font-size: 11px;
  }
`;

export const VerificationButton = styled.button`
  display: inline-flex;
  padding: 10px 22px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  background: #996cfe;
  border: none;
  cursor: pointer;
  margin-top: 12px;
  color: #fff;
  text-align: center;
  font-family: "Noto Sans";
  font-size: 14px;
  font-weight: 500;
  line-height: 128.571%;

  @media (max-width: 815px) {
    padding: 9px 20px;
  }

  @media (max-width: 500px) {
    padding: 7px 16px;
    font-size: 13px;
  }
`;


export const PopupWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10001;
  box-sizing: border-box;

  /* Make it responsive */
  width: 90vw;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 20px;

  @media (max-width: 500px) {
    padding: 15px;
  }
`;

// Container for all content inside the popup
export const PopupContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(10px, 3vw, 20px);
  text-align: center;
`;

// Icon section for the popup
export const PopupIcon = styled.div`
  font-size: clamp(16px, 4vw, 20px);
  color: #007bff;
`;

// Title for the popup heading
export const PopupTitle = styled.h2`
  color: #333;
  font-family: "Noto Sans", sans-serif;
  font-size: clamp(16px, 4vw, 20px);
  font-weight: 600;
  line-height: 1.2;
  margin: 0;
`;

// Message text content in the popup
export const PopupMessage = styled.div`
  color: #7e7e8f;
  font-family: "Noto Sans", sans-serif;
  font-size: clamp(12px, 3vw, 14px);
  line-height: 1.5;
  font-weight: 400;
  overflow-wrap: break-word;

  a {
    color: #007bff;
    text-decoration: none;
    word-break: break-all;
    &:hover {
      text-decoration: underline;
    }
  }
`;

// Close button container (optional)
export const CloseButtonContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  width: 20px;
  height: 20px;
  background: #f1f1f1;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: #e0e0e0;
  }
`;

// Button to close or perform actions
export const PopupActionButton = styled.button`
  padding: 10px 20px;
  background-color: #996cfe;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-size: clamp(14px, 4vw, 16px);
  cursor: pointer;
  transition: box-shadow 0.3s ease, transform 0.3s ease, color 0.3s ease;

  &:hover {
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : "0 8px 16px -4px rgba(0, 0, 0, 0.2)"};
    transform: ${({ disabled }) => (disabled ? "none" : "translateY(-2px)")};
  }
  &:focus {
    outline: none;
  }
`;

export const CloseIconDiv = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
`;

export const VerifyEmailPopUpDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const IconBg = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%; /* To make it a circle */
  background: lightgray 50% / cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const InputError = styled.div`
  font-family: "Noto Sans";
  color: red;
  width: 100%;
  font-size: 12px;
  margin: -20px 0px;
  text-align: left !important;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute:
  left: 0px;
`;

export const InputErrorLogin = styled.div`
  font-family: "Noto Sans";
  color: red;
  width: 100%;
  font-size: 12px;
  // margin: -20px 0px;
  text-align: left !important;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute:
  left: 0px;
`;

export const TextProgressContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
