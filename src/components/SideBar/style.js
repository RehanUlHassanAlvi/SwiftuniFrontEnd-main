import styled, { css } from "styled-components";
import { 
  Slider, 
  Autocomplete,   
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper, 
} from "@mui/material";
import Select from "react-select";

export  const StyledTableContainer = styled(TableContainer)`
  &.MuiPaper-root {
    border-radius: 5px;
    box-shadow: none;
  }
  // height: 682px;
  // min-height: 682px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const PHColumnsContainer = styled(TableHead)`
  background: #996cfe;
  position: sticky;
  top: 0;
`;

export const PHContentContainer = styled(TableRow)`
  background: var(--White-Theme-Gray---0, #fff);
  display: table;
  width: 100%;
  table-layout: fixed;
`;

// export const PHColumnsContainer = styled.div`
//   display: flex;
//   padding: 16px 36px;
//   justify-content: space-between;
//   align-items: center;
//   border-radius: 12px 12px 0px 0px;
//   background: #996cfe;
// `;

// export const PHContentContainer = styled.div`
//   background: var(--White-Theme-Gray---0, #fff);
//   padding: 16px 36px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   @media (max-width: 700px) {
//   }
// `;

export const WarningText = styled.p`
  color: red;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
  justify-content: center;
  width: 100%;
`;
export const PopupHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 23.1875rem;
  height: 3.5rem;
  // padding: 1.25rem 5.625rem 1.3125rem 5.6875rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem 0.5rem 0rem 0rem;
  border: 1px solid var(--Brand-Purple, #996cfe);
  background: var(--Brand-Purple, #996cfe);
  flex-shrink: 0;
  @media (max-width: 650px) {
    width: 90%;
  }
`;

export const CancelIconImg = styled.img`
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  transition: transform 0.3s ease;
  // background: white;
  // border-radius: 50%;

  &:hover {
    transform: scale(1.2);
  }
`;

export const PopupWhiteDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 23.1875rem;
  height: 13.9375rem;
  justify-content: center;
  align-items: center;
  border-radius: 0rem 0rem 0.5rem 0.5rem;
  background: #fff;
  // padding: 4.25rem 5.625rem 4.3125rem 5.6875rem;
  gap: 1.5rem;
  box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.2);

  @media (max-width: 650px) {
    width: 90%;
  }
`;

export const PopupTitleText = styled.div`
  color: #333;
  font-family: "Noto Sans";
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.25rem;
  // display: flex;
  // justify-content: center;
  text-align: center;
  @media (max-width: 600px) {
  }
`;

export const StyledFormControl = styled.div`
  width: 150px;
  display: flex;
  flex-direction: column;
  @media (max-width: 700px) {
    width: 60%;
  }
`;

export const DeleteNoBtn = styled.div`
  display: flex;
  width: 5rem;
  padding: 0.75rem 1.375rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.25rem;
  border: 1px solid rgba(0, 0, 0, 0.35);
  color: #333;
  text-align: center;
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.125rem;
  cursor: pointer;
  transition: box-shadow 0.3s ease, transform 0.3s ease, color 0.3s ease;
  &:hover {
    /* color: #996cfe; */
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : "0 8px 16px -4px rgba(0, 0, 0, 0.2)"};
    transform: ${({ disabled }) => (disabled ? "none" : "translateY(-2px)")};
  }
  @media (max-width: 650px) {
  }
`;

export const DeleteYesBtn = styled.div`
  max-height: 1.3rem;
  display: flex;
  width: 5rem;
  padding: 0.75rem 1.375rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.25rem;
  background: var(--Brand-Purple, #996cfe);
  color: #fff;
  text-align: center;
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.125rem;
  cursor: pointer;
  transition: box-shadow 0.3s ease, transform 0.3s ease, color 0.3s ease;
  &:hover {
    /* color: #996cfe; */
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : "0 8px 16px -4px rgba(0, 0, 0, 0.2)"};
    transform: ${({ disabled }) => (disabled ? "none" : "translateY(-2px)")};
  }
  @media (max-width: 650px) {
  }
`;

export const CustomAutocomplete = styled(Autocomplete)`
  & .MuiInputBase-root {
    width: 100%;
    height: 44px;
    border-radius: 4px;
    border: 1px solid var(--White-Theme-Gray---3, #c6cbd9);
    box-shadow: 0px 0px 0px 0px #0009321f;
    color: #9a9aaf;
    padding: 0px;
    display: flex;
    align-items: center;
    transition: border 0.3s, box-shadow 0.3s;
    font-size: 1rem;
    line-height: normal;

    margin-left: 0px;

    & input {
      font-size: 1rem;
      line-height: normal;
      height: calc(100% - 12px);
      padding: 6px 12px;
      width: 100%;
      border: none;
      box-shadow: none;
      box-sizing: border-box;
    }

    &::placeholder {
      color: #9a9aaf;
      font-size: 14px;
    }
    &:focus-within {
      outline: none;
      border: 1px solid rgba(153, 108, 254, 0.5);
      box-shadow: 0 0 8px rgba(153, 108, 254, 0.5);
    }
  }

  @media (max-width: 1085px) {
    & .MuiInputBase-root {
      // margin-left: -15px;
    }
  }

  @media (max-width: 768px) {
    & .MuiInputBase-root {
      padding: 0 10px;
      font-size: 0.9rem;
      margin-left: 0px;
    }
  }
`;

export const SidebarContainer = styled.div`
  width: 18%;
  height: auto;
  flex-shrink: 0;
  background: white;
  @media (max-width: 1000px) {
    width: 100%;
    min-width: 188px;
  }
`;

export const SideCardContainer = styled.div`
  width: 100%;
  min-height: 600px;
  border-radius: 5px;
  background: var(--White-Theme-Gray---0, #fff);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 700px) {
    padding: 10px 2.5%;
    width: 100%;
  }
`;

export const SideCardContainerProfile = styled.div`
  width: 100%;
  border-radius: 5px;
  background: var(--White-Theme-Gray---0, #fff);
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 48px;

  @media (max-width: 1200px) {
    padding: 30px;
    gap: 40px;
  }

  @media (max-width: 900px) {
    max-width: 95%;
  }

  @media (max-width: 700px) {
    padding: 20px;
    gap: 20px;
    width: 100%;
  }

  @media (max-width: 500px) {
    padding: 15px;
    width: 100%;
  }

  @media (max-width: 400px) {
    padding: 15px;
    width: 100%;
  }
`;

export const InputFieldsSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 2.5rem;

  @media (max-width: 700px) {
    gap: 20px;
    width: 100%;
  }
`;

export const FAQsCardContainer = styled.div`
  min-height: 53px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid #996cfe;
  background: #fff;
  padding: 0 16px;
  transition: border-color 0.3s;
  &:hover,
  &:focus {
    // border-color: #5932a1;F
    background: #d5caeb;
  }
`;

export const SidebarNameSection = styled.div`
  height: 65px;
  display: flex;
  align-items: center;
  gap: 20px;
  padding-left: 10px;
  background: white;
`;

export const Avatar = styled.img`
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  border-radius: 44px;
  background: var(
    --Userpic-16,
    url(<path-to-image>) lightgray 50% / cover no-repeat
  );
`;

export const Name = styled.div`
  color: #333;
  font-family: "Noto Sans";
  font-size: 16px;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: -0.144px;
`;

export const SidebarSection = styled.div`
  height: 40px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media (max-width: 700px) {
    width: 100%;
  }
`;

export const SectionItem = styled.button`
  background: white;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8.371px;
  width: 100%;
  padding: 10px 0;
  padding-left: 20px;
  cursor: pointer;
  &:hover,
  &:focus {
    border-right: 2px solid #6b41cb;
    background: rgba(107, 65, 203, 0.1);
  }
  @media (max-width: 700px) {
    // justify-content: space-between;
  },
`;

export const SectionIcon = styled.img`
  width: 20px;
  height: 20px;
  fill: currentColor;

  ${SectionItem}:hover &,
  ${SectionItem}:focus & {
    filter: brightness(0) saturate(100%) invert(29%) sepia(95%) saturate(3437%)
      hue-rotate(247deg) brightness(92%) contrast(88%);
  }
`;

export const SectionText = styled.span`
  color: rgba(0, 0, 0, 0.65);
  font-family: "Noto Sans";
  font-size: 15px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: -0.135px;
  ${SectionItem}:hover &,
  ${SectionItem}:focus & {
    color: #996cfe;
    // font-size: 16px;
    letter-spacing: -0.144px;
  }
`;

export const FAQsHeading = styled.div`
  color: var(--Brand-Purple, #996cfe);
  text-align: center;
  font-family: "Noto Sans";
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px; /* 100% */
  display: flex;
  self-align: flex-start;
`;

export const TabsTextDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 50px;
  @media (max-width: 700px) {
    gap: 30px;
  },
`;

export const Tab1 = styled.div`
  width: max-content;
  height: 30px;
  color: #999;
  text-align: center;
  font-family: "Noto Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  cursor: pointer;
  // border-bottom: 2px solid transparent;
  border-bottom: 2px solid #6b41cb;
  &:hover,
  &:focus {
    border-bottom: 2px solid #6b41cb;
    color: var(--Brand-Purple, #996cfe);
  }
  @media (max-width: 700px) {
    width: 90%;
    font-size: 14px;
  },
`;

export const Tab2 = styled.div`
  width: max-content;
  height: 30px;
  color: #999;
  text-align: center;
  font-family: "Noto Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  &:hover,
  &:focus {
    border-bottom: 2px solid #6b41cb;
    color: var(--Brand-Purple, #996cfe);
  }
  @media (max-width: 700px) {
    width: 90%;
    font-size: 14px;
  },
`;

export const Tab3 = styled.div`
  width: max-content;
  height: 30px;
  color: #999;
  text-align: center;
  font-family: "Noto Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  &:hover,
  &:focus {
    border-bottom: 2px solid #6b41cb;
    color: var(--Brand-Purple, #996cfe);
  }
  @media (max-width: 700px) {
    width: 90%;
    font-size: 14px;
  },
`;

export const FAQsQuestionText = styled.div`
  color: #333;
  font-family: "Noto Sans";
  font-size: 15px;
  font-weight: 400;
  line-height: 22px;
  text-align: left;
  // flex-grow: 1;
`;

export const FAQsAnswerText = styled.div`
  color: #333;
  font-family: "Noto Sans";
  font-size: 13px;
  font-weight: 400;
  line-height: 22px;
  padding: 0px 0px 15px 0px;
  text-align: left;
`;

export const ToggleIcon = styled.div`
  cursor: pointer;
`;

// export const ContentArea = styled.div`
//   padding: 0px;
//   @media (max-width: 700px) {
//     display: flex;
//     justify-content: center;
//     padding: 16px 0px;
//     width:100%;
//   },
// `;

export const ContentArea = styled.div`
  padding: 0px;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  @media (max-width: 700px) {
    padding: 16px 0px;
    width: 100%;
  }
`;

export const CollapsibleContent = styled.div`
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
`;

export const PlanInfoHeading = styled.div`
width: max-content;
  color: var(--White-Theme-Gray---10, #16161E);
  text-align: center;
  font-family: "Noto Sans";
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 33px; 
  display: flex;
  self-align: flex-start;
  cursor: pointer;
  white-space: nowrap;
  // border-bottom: 2px solid transparent;
  border-bottom: 2px solid var(--Brand-Purple, #996cfe);
  &:hover,
  &:focus {
    border-bottom: 2px solid #6b41cb;
    border-color: var(--Brand-Purple, #996cfe);
  }
  @media (max-width: 500px) {
    font-size: 15px;
  },
`;

export const CancelSubDiv = styled.div`
  display: inline-flex;
  padding: 10px 2.51%;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  border: 1px solid var(--White-Theme-Gray---3, #c6cbd9);
  cursor: pointer;
  transition: box-shadow 0.3s ease, transform 0.3s ease, color 0.3s ease;
  &:hover {
    /* color: #996cfe; */
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : "0 8px 16px -4px rgba(0, 0, 0, 0.2)"};
    transform: ${({ disabled }) => (disabled ? "none" : "translateY(-2px)")};
  }
`;

export const CancelSubText = styled.div`
  color: var(--White-Theme-Gray---8, #2e2e3a);
  text-align: center;
  font-family: "Noto Sans";
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px; /* 120% */
  white-space: nowrap;
  @media (max-width: 500px) {
    font-size: 13px;
  },
`;

export const VIPDiv = styled.div`
  height: 98px;
  flex-shrink: 0;
  border-radius: 5px;
  background: #f9f8fc;
  padding: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const VIPSubDiv1 = styled.div`
  width: 100%;
  // max-width: 737px;
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const VIPText = styled.div`
  color: var(--White-Theme-Gray---10, #16161e);
  font-family: "Noto Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 26px; 
  @media (max-width: 400px) {
    font-weight: 500;
    line-height: 22px; 
  },
`;

export const VIPTextDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex-shrink: 0;
  width: 100%;
  // max-width: 737px;
`;

export const PurchasedText = styled.div`
  color: var(--White-Theme-Gray---5, #7e7e8f);
  font-family: "Noto Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  @media (max-width: 400px) {
    font-weight: 400;
    line-height: 20px; 
  },
`;

export const ActiveDiv = styled.div`
  display: inline-flex;
  padding: 6px 12px;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  border: 1px solid var(--White-Theme-Gray---8, #2e2e3a);
`;

export const ActiveText = styled.div`
  color: var(--White-Theme-Gray---8, #2e2e3a);
  text-align: right;
  font-family: "Noto Sans";
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 153.846% */
`;

export const StartTestBtn = styled.div`
  display: inline-flex;
  padding: 6px 12px;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  background: var(--Brand-Purple, #996cfe);
  color: var(--White-Theme-Gray---0, #fff);
  text-align: right;
  font-family: "Noto Sans";
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 153.846% */
  cursor: pointer;
  white-space: nowrap;
  transition: box-shadow 0.3s ease, transform 0.3s ease, color 0.3s ease;
  &:hover {
    /* color: #996cfe; */
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : "0 4px 8px rgba(0, 0, 0, 0.2)"};
    transform: ${({ disabled }) => (disabled ? "none" : "translateY(-2px)")};
  }
`;

export const AllPlansTextDiv = styled.div`
  width: 110px;
  height: 30px;
  border-bottom: ${({ isSelected }) =>
    isSelected ? "2px solid #6b41cb" : "2px solid transparent"};
  z-index: 1;
  display: flex;
  justify-content: center;
  &:hover,
  &:focus {
  }
`;

export const AllPlansText = styled.div`
color: var(--White-Theme-Gray---10, #16161E);
font-family: "Noto Sans";
font-size: 18px;
font-style: normal;
font-weight: 600;
line-height: 28px; 
cursor: pointer;
  @media (max-width: 700px) {

  },
`;

// export const PlanDetailsDiv = styled.div`
// display: flex;
// // max-width: 297px;
// max-width: 238px;
// padding: 24px 20px;
// flex-direction: column;
// align-items: flex-start;
// gap: 30px;
// flex-shrink: 0;
// border-radius: 4px;
// border: 1px solid var(--White-Theme-Gray---2, #E2E2EA);
// background: var(--Shades-White, #FFF);
//   cursor: pointer;
// ${(props) =>
//   props.isSelected &&
//   css`
//     border-radius: 12px;
//     background: var(--Brand-Purple, #996cfe);
//     box-shadow: 0px 10px 25px 0px #ccd9ff;
//   `}
// @media (max-width: 700px) {
// },
// `;

export const PlanDetailsOuterDiv = styled.div`
  justify-content: space-between;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 700px) {
    justify-content: center;
    gap: 1rem;
  }
`;

export const StyledDiscountedStar = styled.img`
  width: 3.65rem;
  /* filter: ${(props) =>
    !props.isSelected
      ? "invert(100%) brightness(300%)  hue-rotate(220deg)"
      : ""}; */
`;

export const PlanDetailsDiv = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  flex-shrink: 0;
  border-radius: 4px;
  border: 1px solid var(--White-Theme-Gray---2, #e2e2ea);
  background: var(--Shades-White, #fff);
  padding: 24px 20px;
  width: 28%;
  height: 37rem;
  ${(props) =>
    props.isSelected &&
    css`
      border-radius: 12px;
      background: var(--Brand-Purple, #996cfe);
      box-shadow: 0px 10px 25px 0px #ccd9ff;
    `}
  @media (max-width: 1140px) {
    // width: 32.5%;
    width: 15.6rem;
  }
  @media (max-width: 500px) {
    width: 90%;
  }
  @media (max-width: 400px) {
    width: 88%;
  }
`;

export const PlanNameDiv = styled.div`
display: flex;
width: 225px;
// height: 44px;
min-height: 40px;
padding: 6px 12px;
justify-content: center;
align-items: center;
gap: 4px;
border-radius: 4px;
border: 1.5px solid var(--Brand-Purple, #996CFE);
align-self: center;
cursor: pointer;
background: ${(props) =>
  props.isSelected ? "var(--Shades-White, #FFF)" : "transparent"};

color: var(--Brand-Purple, #996CFE);
text-align: center;
font-feature-settings: 'clig' off, 'liga' off;
font-family: "Noto Sans";
font-size: 15px;
font-style: normal;
font-weight: 600;
line-height: normal;
transition: box-shadow 0.3s ease, transform 0.3s ease, color 0.3s ease;
  &:hover {
    /* color: #996cfe; */
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : "0 8px 16px -4px rgba(0, 0, 0, 0.2)"};
    transform: ${({ disabled }) => (disabled ? "none" : "translateY(-2px)")};
  }
@media (max-width: 700px) {

},
`;

export const PlanDetailsHeading = styled.div`
color: ${(props) =>
  props.isSelected
    ? "var(--Shades-White, #FFF)"
    : " var(--White-Theme-Gray---10, #16161E)"};
font-family: "Noto Sans";
font-size: 20px;
font-style: normal;
font-weight: 700;
line-height: normal;
@media (max-width: 700px) {
},
`;

export const PlanDetailsDesc = styled.div`
  color: ${(props) =>
    props.isSelected ? "#F7F8F9" : " var(--Neutral-500, #64748B)"};
  font-family: "Noto Sans";
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 0.2rem;
`;

export const PriceText = styled.div`
  color: ${(props) =>
    props.isSelected
      ? "var(--Shades-White, #FFF)"
      : " var(--White-Theme-Gray---10, #16161E)"};
  font-family: "Noto Sans";
  font-size: 38px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  @media (max-width: 1500px) {
    font-size: 30px;
  }
`;

export const ActualPriceText = styled.div`
  position: relative;
  color: ${(props) =>
    props.isSelected
      ? "var(--Shades-White, #FFF)"
      : " var(--White-Theme-Gray---10, #16161E)"};
  font-family: "Noto Sans";
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration-line: line-through;
  @media (max-width: 1500px) {
    font-size: 22px;
  }
`;

export const PlanNameText = styled.div`
color: var(--Brand-Purple, #996CFE);
text-align: center;
font-feature-settings: 'clig' off, 'liga' off;
font-family: "Noto Sans";
font-size: 15px;
font-style: normal;
font-weight: 600;
line-height: normal;
@media (max-width: 700px) {

},
`;

export const DetailsListText = styled.div`
  color: ${(props) =>
    props.isSelected
      ? "white"
      : props.isIncluded
      ? "var(--White-Theme-Gray---10, #16161e)"
      : "#A0ABBB"};
  font-family: "Noto Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const DetailsListTextCI = styled.div`
  color: var(--White-Theme-Gray---10, #16161e);
  font-family: "Noto Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  white-space: nowrap;
  @media (max-width: 500px) {
    margin-left: -10px;
  }
`;

export const DetailsListDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  @media (max-width: 500px) {
    gap: 10px;
  }
`;

export const PriceDiv = styled.div`
  display: flex;
  // flex-direction: column;
  align-items: center;
  gap: 10px;
  // margin-top: 2rem;
`;

export const StyledSlider = styled(Slider)`
  width: 398px;
  height: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 16px;
  margin-right: 16px;
  border-radius: 4px;
  color: var(--Brand-Purple, #996cfe);
  // & .MuiSlider-thumb {
  //   border-radius: 33px;
  //   border: 2px solid var(--Brand-Purple, #996cfe);
  //   background-color: #fff;
  //   width: 16px;
  //   height: 16px;
  //   &:hover,
  //   &.Mui-focusVisible {
  //     box-shadow: none;
  //   }
  // }
  & .MuiSlider-track {
    border-radius: 4px;
  }
  & .MuiSlider-rail {
    color: #c6cbd9;
  }
  @media (max-width: 450px) {
    width: 100%;
    height: 4px;
    margin-left: 20px;
    margin-right: 20px;
    border-radius: 2px;
    & .MuiSlider-thumb {
      border-radius: 33px;
      border: 2px solid var(--Brand-Purple, #996cfe);
      background-color: #fff;
      width: 16px;
      height: 16px;
    }
    & .MuiSlider-track {
      border-radius: 2px;
    }
  }
  @media (min-width: 1281px) and (max-width: 1400px) {
    width: 300px;
    margin-left: 20px;
    margin-right: 20px;
  }
`;

export const Avatar2 = styled.img`
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  border-radius: 12px;
  background: var(
    --Userpic-16,
    url(<path-to-image>) lightgray 50% / cover no-repeat
  );
  cursor: pointer;
`;

export const UserIdText = styled.div`
color: var(--White-Theme-Gray---6, #656575);
font-family: "Noto Sans";
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 20px; /* 142.857% */
@media (max-width: 700px) {

},
`;

export const ProfileName = styled.div`
  color: var(--Brand-Purple, #996cfe);
  font-family: "Noto Sans";
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px; /* 160% */
`;

export const ProfileNameSection = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
  @media (max-width: 700px) {
  }
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 36px;
  // gap: 10%;

  // @media (max-width: 1300px) {
  //   gap: 8%;
  // }

  // @media (max-width: 1200px) {
  //   gap: 7%;
  // }

  // @media (max-width: 900px) {
  //   gap: 20px;
  // }
`;

export const InputLabel = styled.span`
  width: 75px;
  color: var(--White-Theme-Gray---10, #16161e);
  font-family: "Noto Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 27.648px;

  @media (max-width: 900px) {
    font-size: 15px;
  }
`;

export const InputField = styled.input`
  width: 100%;
  max-width: 546px;
  height: 44px;
  border-radius: 4px;
  border: 1px solid var(--White-Theme-Gray---3, #c6cbd9);
  box-shadow: 0px 0px 0px 0px #0009321f;
  color: #9a9aaf;
  padding: 0 12px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  transition: border 0.3s, box-shadow 0.3s;

  &:focus {
    outline: none;
    border: 1px solid rgba(153, 108, 254, 0.5);
    box-shadow: 0 0 8px rgba(153, 108, 254, 0.5);
  }

  ::placeholder {
    color: #9a9aaf;
    font-size: 14px;
  }

  @media (max-width: 768px) {
    padding: 0 10px;
    font-size: 0.9rem;
  }
`;

export const CustomSelect = styled(Select)`
  width: 150px;
  .react-select__control {
    min-height: 44px;
    height: 44px;
    ...
  }
  .react-select__value-container { // Adjust the container that holds the value
    height: 44px;
    padding: 0; // Adjust padding if necessary
  }
  .react-select__single-value { // If you're using a single value select
    line-height: 44px; // Center the text vertically
  }
  .react-select__placeholder {
    line-height: 44px; // Center the placeholder vertically
  }
  .react-select__dropdown-indicator, .react-select__clear-indicator {
    height: 44px;
    padding: 0;
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const InputFieldCountryCode = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 150px;
  height: 44px;
  padding: 0 12px;
  border-radius: 4px;
  border: 1px solid var(--White-Theme-Gray---3, #c6cbd9);
  transition: border 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:focus-within {
    outline: none;
    border: 1px solid rgba(153, 108, 254, 0.5);
    box-shadow: 0 0 8px rgba(153, 108, 254, 0.5);
  }

  svg {
    color: var(--icon-color, #9a9aaf);
    margin-left: 70px;
  }
`;

export const InputFieldPhone = styled.input`
  // width: 380px;
  width: 100%;
  max-width: 380px;
  height: 44px;
  border-radius: 4px;
  border: 1px solid var(--White-Theme-Gray---3, #c6cbd9);
  box-shadow: 0px 0px 0px 0px #0009321f;
  color: #9a9aaf;
  padding: 0 12px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  transition: border 0.3s, box-shadow 0.3s;

  &:focus {
    outline: none;
    border: 1px solid rgba(153, 108, 254, 0.5);
    box-shadow: 0 0 8px rgba(153, 108, 254, 0.5);
  }

  ::placeholder {
    color: #9a9aaf;
    font-size: 14px;
  }

  // @media (max-width: 1000px) {
  //   width: 380px;
  // }

  // @media (max-width: 850px) {
  //   width: 100%;
  // }

  // @media (max-width: 768px) {
  //   padding: 0 10px;
  //   font-size: 0.9rem;
  //   width: 100%;
  // }

  // @media (max-width: 700px) {
  //   padding: 0 10px;
  //   font-size: 0.9rem;
  //   // width:  273px;
  // }
`;

export const PasswordBtn = styled.div`
  width: 160px;
  height: 44px;
  flex-shrink: 0;
  border-radius: 5px;
  background: var(--White-Theme-Gray---5, #7e7e8f);

  color: var(--White-Theme-Gray---0, #fff);
  text-align: center;
  font-family: "Noto Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 114.286% */
  letter-spacing: -0.126px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: box-shadow 0.3s ease, transform 0.3s ease, color 0.3s ease;
  &:hover {
    /* color: #996cfe; */
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : "0 4px 8px rgba(0, 0, 0, 0.2)"};
    transform: ${({ disabled }) => (disabled ? "none" : "translateY(-2px)")};
  }
`;

export const UpdateBtn = styled.div`
  width: 160px;
  height: 44px;
  flex-shrink: 0;
  border-radius: 4px;
  background: var(--Brand-Purple, #996cfe);

  color: var(--White-Theme-Gray---0, #fff);
  text-align: center;
  font-family: "Noto Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 114.286% */
  letter-spacing: -0.126px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: -20px;
  transition: box-shadow 0.3s ease, transform 0.3s ease, color 0.3s ease;
  &:hover {
    /* color: #996cfe; */
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : "0 4px 8px rgba(0, 0, 0, 0.2)"};
    transform: ${({ disabled }) => (disabled ? "none" : "translateY(-2px)")};
  }
  @media (max-width: 700px) {
    margin-top: 0px;
  }
`;

export const BtnsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;

  margin-left: 0px;

  @media (max-width: 1000px) {
    margin-left: -10px;
  }
  @media (max-width: 900px) {
    margin-left: -12px;
  }
  @media (max-width: 800px) {
    margin-left: -15px;
  }
  @media (max-width: 700px) {
    margin-left: -17px;
  }

  @media (max-width: 600px) {
    margin-left: -19px;
  }

  @media (max-width: 500px) {
    margin-left: -21px;
  }
  @media (max-width: 400px) {
    margin-left: -26px;
  }

  @media (max-width: 390px) {
    margin-left: -29px;
  }
`;

export const BtnsOuterContainer = styled.div`
  display: flex;
  gap: 100px;
  margin-top: 20px;
`;

export const Avatar3 = styled.img`
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  fill: #d9d9d9;

  @media (max-width: 400px) {
    width: 40px;
    height: 40px;
  },
`;

export const AnnunceMainDiv = styled.div`
  width: 96%;
  height: 68px;
  flex-shrink: 0;
  border-radius: 5px;
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
  padding: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 700px) {
    width: 93%;
  }

  @media (max-width: 450px) {
    width: 90%;
  }
`;

export const AnnunceSubDiv = styled.div`
  width: 100%;
  // max-width: 737px;
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const AnnounceDateText = styled.div`
  color: var(--White-Theme-Gray---5, #7e7e8f);
  text-align: right;
  font-family: "Noto Sans";
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px; /* 161.538% */
  white-space: nowrap;
  @media (max-width: 400px) {
    font-size: 12px;
    font-weight: 400;
    line-height: 18px; 
  },
`;



export const ColumnsText = styled.div`
  color: #fff;
  font-family: "Noto Sans";
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  text-align: center;
`;

export const PHBasicText = styled.div`
  color: #64748b;
  font-family: "Noto Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px; /* 137.5% */
  text-align: center;
`;

export const PHPaymentStatusText = styled.div`
  display: inline-flex;
  padding: 6px 18px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  background: ${(props) => (props.status === "Paid" ? "#008000" : "#ff5d5d")};
  color: var(--White-Theme-Gray---0, #fff);
  font-family: "Noto Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 171.429% */
`;

export const PHAmountText = styled.div`
  color: var(--White-Theme-Gray---10, #16161e);
  font-family: "Noto Sans";
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px; /* 100% */
`;

export const CountryCodeAndPhoneDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  width: 575px;
  @media (max-width: 1035px) {
    width: 100%;
  }
`;

export const UsersNameID = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  margin-top: -10px;
`;

export const PaymentCard = styled.div`
  width: 23.75rem;
  // height: 27.9375rem;
  flex-shrink: 0;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  border-radius: 0.75rem;
  background: #fff;
  padding: 2.5rem;
  @media (max-width: 500px) {
    width: 20rem;
    padding: 1.5rem;
  }
`;

export const PaymentCardPWB = styled.div`
  width: 100%;
  // max-width: 28.75rem;
  // height: 40.125rem;
  // height: 35.125rem;
  height: 100%;
  flex-shrink: 0;
  border-left: 1px solid #e2e2ea;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;

  background: #fff;
  padding: 2.5rem;
  @media (max-width: 1000px) {
    border: 1px solid #e2e2ea;
    border-radius: 0.5rem;
  }
  @media (max-width: 500px) {
    border: 1px solid #e2e2ea;
    border-radius: 0.5rem;
    padding: 1.5rem;
  }
`;

export const PaymentCardTitle = styled.div`
  color: var(--Brand-Purple, #996cfe);
  font-family: "Noto Sans";
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.125rem; /* 75% */
  margin-top: 1.25rem;
  @media (max-width: 650px) {
    // width: 100%;
  }
`;

export const PaymentCardText = styled.div`
  color: var(--White-Theme-Gray---10, #16161e);
  text-align: left;
  font-family: "Noto Sans";
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem; /* 133.333% */
  // margin-top: 1rem;
  @media (max-width: 650px) {
    // width: 100%;
  }
`;

export const PayWithVoucher = styled.div`
  color: var(--White-Theme-Gray---10, #16161e);
  text-align: left;
  font-family: "Noto Sans";
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem;
  transition: opacity 0.5s ease, transform 0.5s ease;

  &:hover,
  &:focus {
    opacity: 0.8;
    transform: scale(1.05);
  }
  @media (max-width: 650px) {
  }
`;

export const UploadReceiptBtn = styled.div`
  width: 100%;
  // height: 2.5rem;
  display: inline-flex;
  padding: 0.75rem 0rem 0.75rem 0rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.3125rem;
  background: #e8e8e8;
  color: #07070c;
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1rem;
  letter-spacing: -0.009rem;
  white-space: nowrap;
  cursor: pointer;
  transition: box-shadow 0.3s ease, transform 0.3s ease, color 0.3s ease;
  &:hover {
    color: #996cfe;
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : "0 4px 8px rgba(0, 0, 0, 0.2)"};
    transform: ${({ disabled }) => (disabled ? "none" : "translateY(-2px)")};
  }
  @media (max-width: 650px) {
  }
`;

export const PaymentCardBtn = styled.div`
  width: 100%;
  max-height: 1.1rem;
  display: inline-flex;
  padding: 0.75rem 0rem 0.75rem 0rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.3125rem;
  background: var(--Brand-Purple, #996cfe);
  color: var(--White-Theme-Gray---0, #fff);
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1rem;
  letter-spacing: -0.009rem;
  white-space: nowrap;
  cursor: pointer;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  &:hover,
  &:focus {
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : "0 4px 8px rgba(0, 0, 0, 0.2)"};
    transform: ${({ disabled }) => (disabled ? "none" : "translateY(-2px)")};
  }
`;

export const PaymentCardWhiteBtn = styled.div`
  width: 100%;
  // height: 2.5rem;
  display: inline-flex;
  padding: 0.75rem 0rem 0.75rem 0rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.3125rem;
  border: 1px solid #e8e8e8;

  color: var(--White-Theme-Gray---11, #07070c);
  text-align: center;
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1rem; /* 100% */
  letter-spacing: -0.009rem;

  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1rem;
  letter-spacing: -0.009rem;
  white-space: nowrap;
  cursor: pointer;
  transition: box-shadow 0.3s ease, transform 0.3s ease, color 0.3s ease;
  &:hover {
    color: #996cfe;
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : "0 4px 8px rgba(0, 0, 0, 0.2)"};
    transform: ${({ disabled }) => (disabled ? "none" : "translateY(-2px)")};
  }
  @media (max-width: 650px) {
  }
`;

export const InputDiv = styled.div`
  display: flex;
  width: 100%;
  max-width: 16.875rem;
  height: 2.625rem;
  border-radius: 0.5rem;
  background: #fff;
  @media (max-width: 600px) {
    width: 12.4375rem;
    height: 2.25rem;
  }
`;

export const InputDiv2 = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  height: 2.625rem;
  border-radius: 0.5rem;
  background: #fff;
  @media (max-width: 600px) {
    // width: 12.4375rem;
    height: 2.25rem;
  }
`;

export const InputFieldSearch = styled.input`
  border: none;
  outline: none;
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #e8e8e8;

  color: #16161e;
  font-family: "Noto Sans";
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem;

  &::placeholder {
    color: var(--White-Theme-Gray---4, #9a9aaf);
    font-family: "Noto Sans";
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem; /* 133.333% */
    opacity: 0.5;
  }
`;

export const ReferenceCodeShow = styled.div`
  border: none;
  outline: none;
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #e8e8e8;

  color: #16161e;
  font-family: "Noto Sans";
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem;

  &::placeholder {
    color: var(--White-Theme-Gray---4, #9a9aaf);
    font-family: "Noto Sans";
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem; /* 133.333% */
    opacity: 0.5;
    transition: transform 0.2s ease;
    transform: ${({ clicked }) => (clicked ? "scale(1.05)" : "scale(1)")};
  }
`;

// export const ReferenceCodeText = styled.div`

//   color: #16161e;
//   font-family: "Noto Sans";
//   font-size: 1.125rem;
//   font-style: normal;
//   font-weight: 400;
//   line-height: 1.5rem;
//   transition: transform 0.2s ease;
//   transform: ${({ clicked }) => (clicked ? 'scale(1.05)' : 'scale(1)')};
//   margin-right: ${({ clicked }) => (clicked ? '-3rem' : '0rem')};
//   transform-origin: center;

//   // &::placeholder {
//   //   color: var(--White-Theme-Gray---4, #9a9aaf);
//   //   font-family: "Noto Sans";
//   //   font-size: 1.125rem;
//   //   font-style: normal;
//   //   font-weight: 400;
//   //   line-height: 1.5rem; /* 133.333% */
//   //   opacity: 0.5;

//   // }

// `;

// export const PurpleBtn = styled.div`
//   display: inline-flex;
//   padding: 0.75rem 1.375rem;
//   justify-content: center;
//   align-items: center;
//   gap: 0.625rem;
//   border-radius: 0.25rem;
//   background: var(--Brand-Purple, #996cfe);
//   color: #fff;
//   text-align: center;
//   font-family: "Noto Sans";
//   font-size: 1rem;
//   font-style: normal;
//   font-weight: 500;
//   line-height: 1.125rem;
//   cursor: pointer;
//   transition: box-shadow 0.3s ease, transform 0.3s ease;

//   &:hover {
//     box-shadow: ${({ disabled }) =>
//       disabled ? "none" : "0 4px 8px rgba(0, 0, 0, 0.2)"};
//     transform: ${({ disabled }) => (disabled ? "none" : "translateY(-2px)")};
//   }

//   cursor: ${({ disabled }) => (disabled ? "initial" : "pointer")};
//   background: ${({ disabled }) =>
//     disabled ? "#b3a1fe" : "var(--Brand-Purple, #996cfe)"};
//   color: ${({ disabled }) => (disabled ? "#ddd" : "#fff")} @media
//     (max-width: 1400px) {
//     font-size: 0.875rem;
//     line-height: 1rem;
//   }
//   @media (max-width: 600px) {
//     padding: 0.625rem 0.75rem;
//   }
// `;

export const RemoveBtn = styled.div`
  display: inline-flex;
  height: 2.5rem;
  width: 5.5rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  flex-shrink: 0;
  border-radius: 0.3125rem;
  background: #ff474d;
  color: #fff;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: "Noto Sans";
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem;
  cursor: pointer;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  &:hover,
  &:focus {
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : "0 4px 8px rgba(0, 0, 0, 0.2)"};
    transform: ${({ disabled }) => (disabled ? "none" : "translateY(-2px)")};
  }
`;

export const PurpleBtn = styled.div`
  display: inline-flex;
  height: 2.5rem;
  width: 5.5rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  flex-shrink: 0;
  border-radius: 0.3125rem;
  background: var(--Brand-Purple, #996cfe);
  color: #fff;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: "Noto Sans";
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem;
  cursor: pointer;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  &:hover,
  &:focus {
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : "0 4px 8px rgba(0, 0, 0, 0.2)"};
    transform: ${({ disabled }) => (disabled ? "none" : "translateY(-2px)")};
  }
`;

export const HelpBottomDiv = styled.div`
  display: flex;
  width: 100%;
  padding: 1.25rem;
  align-items: center;
  background: rgba(153, 108, 254, 0.1);
  border-radius: 0.5rem;
  gap: 0.625rem;
  @media (max-width: 750px) {
  }
`;

export const HelpBottomText = styled.div`
  color: var(--White-Theme-Gray---10, #16161e);
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem;
`;

export const HelpBottomLink = styled.a`
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  line-height: 1.5rem;
  color: var(--Brand-Purple, #996cfe);
  cursor: pointer;
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.5s ease, transform 0.5s ease;
  animation: fadeIn 0.5s ease forwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &:hover,
  &:focus {
    opacity: 0.8;
    transform: scale(1.05);
  }
`;

export const PayWithBankDiv = styled.div`
  display: flex;
  width: 100%;
  padding: 1.25rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
  border-bottom: 1px solid #e2e2ea;

  color: var(--White-Theme-Gray---6, #656575);
  font-family: "Noto Sans";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.5rem;

  span {
    color: var(--Brand-Purple, #996cfe);
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.125rem;
  }

  @media (max-width: 750px) {
    width: 90%;
  }
`;

export const CardInfoDiv = styled.div`
  display: inline-flex;
  padding: 1.25rem;
  margin-left: 1.25rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
  border-radius: 0.5rem;
  background: rgba(153, 108, 254, 0.1);
  @media (max-width: 750px) {
    // width: 79%;
    margin-left: 0rem;
  }
`;

export const CardInfo = styled.div`
  display: flex;
  width: 13.3125rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  position: relative;
  @media (max-width: 550px) {
    width: 11.3125rem;
  }
  @media (max-width: 450px) {
    width: 10.3125rem;
  }
  @media (max-width: 400px) {
    width: 10rem;
  }
`;

export const CTCimg = styled.img`
  position: absolute;
  right: 2.5rem;
  bottom: 0.2rem;
  cursor: pointer;
  // transition: transform 0.2s ease;
  // transform: ${({ clicked }) => (clicked ? "scale(1.1)" : "scale(1)")};
  filter: ${({ clicked }) =>
    clicked
      ? "invert(35%) sepia(91%) saturate(6562%) hue-rotate(238deg) brightness(70%) contrast(110%)"
      : "none"};

  @media (max-width: 450px) {
    right: 1.5rem;
  }
`;

export const CTCimg2 = styled.img`
  position: absolute;
  right: 0.69rem;
  bottom: 0.69rem;
  width: 1.25rem;
  cursor: pointer;
  // transition: transform 0.2s ease;
  // transform: ${({ clicked }) => (clicked ? "scale(1.2)" : "scale(1)")};
  filter: ${({ clicked }) =>
    clicked
      ? "invert(35%) sepia(91%) saturate(6562%) hue-rotate(238deg) brightness(70%) contrast(110%)"
      : "none"};
`;

export const CTCimg3 = styled.img`
  // position: absolute;
  // right: 0.69rem;
  // bottom: 0.69rem;
  width: 1.25rem;
  cursor: pointer;
  // transition: transform 0.2s ease;
  // transform: ${({ clicked }) => (clicked ? "scale(1.2)" : "scale(1)")};
  filter: ${({ clicked }) =>
    clicked
      ? "invert(35%) sepia(91%) saturate(6562%) hue-rotate(238deg) brightness(70%) contrast(110%)"
      : "none"};
`;

export const CardInfoTitle = styled.div`
  color: var(--White-Theme-Gray---6, #656575);
  font-family: "Noto Sans";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem; /* 171.429% */
  @media (max-width: 550px) {
    font-size: 0.8rem;
  }
`;

export const CardInfoName = styled.div`
  color: var(--White-Theme-Gray---10, #16161e);
  text-align: right;
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.5rem; /* 150% */
  white-space: nowrap;

  // transition: transform 0.2s ease;
  // transform: ${({ clicked }) => (clicked ? "scale(1.05)" : "scale(1)")};
  @media (max-width: 550px) {
    font-size: 0.8rem;
  }
`;

export const CardInfoText = styled.div`
  color: var(--White-Theme-Gray---6, #656575);
  font-family: "Noto Sans";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem; /* 171.429% */

  // span {
  //   color: var(--Brand-Purple, #996cfe);
  //   font-family: "Noto Sans";
  //   font-size: 0.875rem;
  //   font-style: normal;
  //   font-weight: 600;
  //   line-height: 1.5rem;
  //   cursor: pointer;
  //   transition: opacity 0.5s ease, transform 0.5s ease;

  //   &:hover,
  //   &:focus {
  //     opacity: 0.8;
  //     transform: scale(1.05);
  //   }
  // }

  @media (max-width: 750px) {
    // width: 100%;
  }
`;

export const HelpLink = styled.a`
  color: var(--Brand-Purple, #996cfe);
  font-family: "Noto Sans";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.5rem;
  cursor: pointer;
  text-decoration: none;
  padding: 0.3rem;
  transition: opacity 0.5s ease, transform 0.5s ease;

  &:hover,
  &:focus {
    opacity: 0.8;
    transform: scale(1.05);
  }
`;

export const DiscountText = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 10,
  position: "absolute",
  top: "3rem",
  left: "3.59rem",
});

export const PageContainer = styled("div")({
  width: "90%",
  maxWidth: "75rem",
  height: "49.75rem",
  flexShrink: 0,
  borderRadius: "0.75rem",
  backgroundColor: "#FFF",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  margin: "0 auto",
  boxSizing: "border-box",
});

export const Image = styled("img")({
  width: "7.5rem",
  height: "7.5rem",
  flexShrink: 0,
  marginBottom: "2rem",
});

export const FailedImage = styled("img")({
  width: "10rem",
  maxWidth: "100%", // Ensures the image doesn't overflow its container
  height: "auto", // Maintains the aspect ratio
  flexShrink: 0,
  marginBottom: "2rem",
  display: "block", // Makes the image a block-level element
  marginLeft: "auto",
  marginRight: "auto", // Centers the image horizontally
  objectFit: "contain",
});

export const TitleText = styled("p")({
  color: "#16161E",
  fontFamily: "Noto Sans",
  fontSize: "1.5rem",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "1.5rem",
  marginBottom: "1rem",
  textAlign: "center",
});

export const SubText = styled("p")({
  color: "#656575",
  fontFamily: "Noto Sans",
  fontSize: "0.875rem",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "1.5rem",
  marginBottom: "2rem",
  textAlign: "center",
});

export const BackLink = styled("a")({
  color: "#996CFE",
  fontFamily: "Noto Sans",
  fontSize: "0.875rem",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "1.5rem",
  textDecoration: "underline",
  cursor: "pointer",
  transition: "color 0.3s ease-out, transform 0.3s ease-out",
  "&:hover": {
    color: "#7A4ECB",
    transform: "scale(1.05)",
  },
});
