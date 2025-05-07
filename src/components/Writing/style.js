import styled from "@emotion/styled";

export const OuterDiv = styled.div`
  width: 100%;
`;

export const MainOuterDiv = styled.div`
  width: 100%;
  max-width: 1880px;
`;

export const ToggleIconWrapper = styled.div`
  position: absolute;
  right: 1rem;
  cursor: pointer;
  color: white;
  display: flex;
  justify-content: center;
`;

export const CardWrapper = styled.div`
  width: 968px;
  height: 662px; //652px
  display: flex;
  flex-direction: column;
  border-radius: 8px 8px 0px 0px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: #fff;
  z-index: 1001;
  gap: 20px;
`;

export const CardHeader = styled.div`
  height: 38px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px 8px 0px 0px;
  border: 1px solid #996cfe;
  background: #996cfe;
  position: relative;
`;

export const CardHeaderText = styled.div`
  color: #fff;
  text-align: center;
  font-family: "Noto Sans";
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 120% */
  letter-spacing: 0.15px;
`;

export const EnableSkillsCard = styled.div`
  width: 768px;
  // height: 377px;
  display: flex;
  flex-direction: column;
  border-radius: 8px 8px 0px 0px;
  background: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  @media (max-width: 500px) {
    width: 100%;
  }
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

export const EnableSkillsHeader = styled.div`
  height: 38px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px 8px 0px 0px;
  border: 1px solid #996cfe;
  background: #996cfe;
`;

export const HeaderText = styled.div`
  color: #fff;
  font-family: "Noto Sans";
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px; /* 122.222% */
  letter-spacing: 0.15px;
`;

export const AiScoreSmallCard = styled.div`
  width: 140px;
  height: 160px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid;
  border-color: ${(props) => props.BorderColor || "#996CFE"};
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 12px;
  @media (max-width: 550px) {
    // width: 140px;
    // height: 160px;
    width: 100%;
  }
`;

export const AiScoreSmallCardHeader = styled.div`
  height: 35px;
  flex-shrink: 0;
  border-radius: 4px 4px 0px 0px;
  background: ${(props) => props.BgColor || "#996CFE"};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ContentWrapper1 = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const TimeWrapper1 = styled.div`
  gap: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const TimeDigitDiv = styled.div`
  gap: 4px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const TimeDigit = styled.div`
  display: flex;
  padding: 2px 6px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  background: #996cfe;
  color: white;
`;

export const TimeWrapper2 = styled.div`
  gap: 12px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ContentWrapper2 = styled.div`
  padding: 0px 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ContentWrapper3 = styled.div`
  padding: 0px 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1000px) {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
`;


export const WritingOutOfText = styled.div`
  color: #333;
  font-family: "Noto Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px; /* 150% */
`;

export const CircularProgText = styled.div`
  color: #333;
  text-align: center;
  font-family: "Noto Sans";
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.375rem; /* 122.222% */
  letter-spacing: 0.00938rem;
`;

export const CircularProgDigit = styled.div`
  width: 0.77481rem;
  height: 1.78406rem;
  flex-shrink: 0;
  color: #868eaf;
  font-family: "Noto Sans";
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const LoremCard = styled.div`
  width: 140px;
  height: 199px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid #996cfe;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 25px;
  @media (max-width: 550px) {
    width: 140px;
    height: 160px;
    gap: 14px;
  }
`;

export const LoremHeader = styled.div`
  height: 35px;
  flex-shrink: 0;
  border-radius: 4px 4px 0px 0px;
  background: #996cfe;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoremContentText = styled.div`
  color: #333;
  font-family: "Noto Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px; /* 157.143% */
  letter-spacing: 0.15px;

  white-space: normal;
  overflow-wrap: break-word;
  word-wrap: break-word;
`;

export const UserResponseCard = styled.div`
  width: 98%;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  border-radius: 10px 10px 10px 10px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  @media (max-width: 1024px) {
    width: 98%;
    height: auto;
  }
`;

export const UserResponseHeader = styled.div`
  height: 43px;
  flex-shrink: 0;
  border-radius: 10px 10px 0px 0px;
  background: #996cfe;
  border: 1px solid #996cfe;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const TCROCard = styled.div`
  width: 100%;
  border: 1px solid rgba(198, 203, 217, 0.65);
  border-radius: 8px;
  background: var(--White-Theme-Gray---0, #fff);
  box-shadow: none;
`;

export const TCROCardContent = styled.div`
  padding: 16px 16px 0px;
`;

export const TCROTypography = styled.div`
  margin-bottom: 16px;
  font-family: Noto Sans;
  font-size: 18px;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: 0em;
  color: #333;
  text-align: left;
`;

export const AiScoreParagraphCard = styled.div`
  padding: 10px;
  overflow-y: scroll;
  height: max-content;
  max-height: 20vh;
  min-height: 20vh;
  position: relative;

  /* Custom Scrollbar for Webkit browsers (Chrome, Safari) */
  &::-webkit-scrollbar {
    width: 5px; /* Width of the scrollbar */
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.1); /* Scrollbar color */
    border-radius: 10px; /* Rounded edges for scrollbar */
  }

  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.02); /* Track color */
  }

  // /* Custom Scrollbar for Firefox */
  // scrollbar-width: thin; /* Makes the scrollbar thinner */
  // scrollbar-color: rgba(0, 0, 0, 0.2) rgba(0, 0, 0, 0.05); /* Scrollbar color and track color */
`;

export const ListStyles = styled.li`
  color: #008000;
  font-family: "Noto Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 171.429%;
  letter-spacing: 0.15px;
`;

export const UOListStyles = styled.li`
  color: #008000;
  font-family: "Noto Sans";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 171.429%;
  letter-spacing: 0.15px;
  @media (max-width: 600px) {
    font-size: 12px;
    font-weight: 400;
  }
`;

export const AiScoreParagraphText = styled.p`
  color: rgba(0, 0, 0, 0.6);
  text-align: center;
  font-family: "Noto Sans";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem;
  letter-spacing: 0.00938rem;

  span {
    color: #000;
    font-family: "Noto Sans";
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.5rem;
    display: inline;
    letter-spacing: 0.00938rem;
  }
  @media (max-width: 500px) {
    font-size: 14px;
  }
`;

export const CircularScoreProgressText = styled.div`
  color: #ff5d5d;
  font-family: "Noto Sans";
  font-size: ${({ fontSize }) => fontSize || "20.286px"};
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const StyledTableHeaderText = styled.div`
  flex-shrink: 0;
  background: #fff;
  color: rgba(0, 0, 0, 0.85);
  font-family: "Noto Sans", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px; /* 131.25% */
`;

export const StyledTableCellText = styled.div`
  color: rgba(0, 0, 0, 0.65);
  font-family: "Noto Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;

export const StyledTableCellText2 = styled.div`
  color: #333;
  font-family: "Noto Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// export const StyledTableCellText3 = styled.div`
//   color: #333;
//   font-family: "Noto Sans";
//   font-size: 14px;
//   font-style: normal;
//   font-weight: 400;
//   line-height: 21px;
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
// `;

export const StyledTableCellText3 = styled.div`
  color: #333;
  font-family: "Noto Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
`;

export const Flexed1 = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: row;
    gap: 20px;
    padding: 0px 1%;
    width:98%;
    @media (max-width: 550px) {
      gap: 13px;
      flex-direction: column;
      align-items: center;
    },
    @media (max-width: 1024px) {
      gap: 18px;
    },

`;

export const Flexed2 = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 13px;
    @media (max-width: 550px) {
      gap: 13px;
      flex-direction: row;
    },
`;

export const Flexed3 = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: row;
    gap: 20px;
    padding-left: 2%;
    // padding-right: 1%;
    width:96%;
    @media (max-width: 550px) {
      gap: 13px;
      flex-direction: column;
      align-items: center;
    },
    @media (max-width: 1024px) {
      gap: 18px;
    },
`;

export const CardWrapperRE = styled.div`
  width: 968px;
  display: flex;
  flex-direction: column;
  border-radius: 8px 8px 0px 0px;
  background: #fff;
  gap: 20px;
  padding-bottom: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1), 0 0 10px rgba(0, 0, 0, 0.1);
  @media (max-width: 1024px) {
    width: 95%;
  }
`;

export const EnableSkillsCardRE = styled.div`
  width: 100%;
  // height: 530px;
  display: flex;
  flex-direction: column;
  border-radius: 8px 8px 0px 0px;
  background: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  @media (max-width: 500px) {
    width: 100%;
  }
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

export const ListeningCard = styled.div`
  width: 140px;
  height: 160px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid #ff5d5d;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 12px;
  @media (max-width: 500px) {
    width: 140px;
    height: 157px;
  }
`;

export const ListeningHeader = styled.div`
  height: 35px;
  flex-shrink: 0;
  border-radius: 4px 4px 0px 0px;
  background: #ff5d5d;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledTextArea = styled.textarea`
  width: calc(100% - 32px);
  height: ${({ height, isMobile }) => height || (isMobile ? "370px" : "350px")};
  border-radius: 8px;
  opacity: 0.5;
  background: rgba(153, 108, 254, 0.1);
  color: #333333;
  border: 1px solid rgba(153, 108, 254, 0.1);
  font-family: "Noto Sans", sans-serif;
  font-size: 16px;
  font-weight: ${({ isMobile }) => (isMobile ? 400 : 500)};
  line-height: 28px;
  letter-spacing: 0.02em;
  padding: 16px;
  resize: none;
  text-align: left;
  box-shadow: 0px 0px 0px 0px #0009321f;
  transition: border 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    outline: none;
    border: 1px solid rgba(153, 108, 254, 0.5);
    box-shadow: 0 0 8px rgba(153, 108, 254, 0.5);
  }

  ::placeholder {
    color: #9a9aaf;
    font-size: 16px;
  }
`;

export const WordCount = styled.div`
  color: #333;
  font-family: "Noto Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  margin-top: 20px;
`;
