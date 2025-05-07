import React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import DiscountAnimation from "./DiscountAnimation";
import { DiscountText } from "./style";

const StyledDiscountBadge = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "-3.2rem",
  right: "-2.5rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const DiscountStar = ({ discount }) => (
  <>
    <StyledDiscountBadge>
      <DiscountText>
        <span
          style={{
            color: "black",
            fontSize: "1.1rem",
            fontWeight: "bold",
          }}
        >
          {discount}%
        </span>
        <span
          style={{
            color: "black",
            fontSize: "0.8rem",
            fontWeight: "bold",
            marginTop: '-0.4rem'
          }}
        >
          OFF
        </span>
      </DiscountText>
      <DiscountAnimation />
    </StyledDiscountBadge>
  </>
);

export default DiscountStar;
