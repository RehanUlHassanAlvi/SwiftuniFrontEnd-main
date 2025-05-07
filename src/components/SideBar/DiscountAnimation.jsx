import React from "react";
import Lottie from "lottie-react";
import animationData from "../../assets/images/discount-animation-2.json";

const DiscountAnimation = () => {
  return (
    <Lottie
      animationData={animationData}
      loop={true}
      autoplay={true}
      style={{ width: 150, height: 150 }}
    />
  );
};

export default DiscountAnimation;
