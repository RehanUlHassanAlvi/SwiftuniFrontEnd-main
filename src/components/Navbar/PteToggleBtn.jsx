import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToggleContainer, LeftButton, RightButton, Slider } from "./style";
import { useTestQuestions } from "../../context/TestQuestionContext";

const PteToggleBtn = ({active, setActive, isTeacher = false}) => {
  const navigate = useNavigate();
  const { resetAllStates } = useTestQuestions();

  const handleClick = (value) => {
    if(active === value){
      return;
    }

    setActive(value);

    if (!isTeacher) {
      localStorage.setItem("pte-type", value === 1 ? "pte core" : "pte academic");
      resetAllStates();
      navigate("/");
      setTimeout(() => {
        window.location.reload();
      }, 400);
    }
  };

  return (
    <ToggleContainer>
      <Slider isActive={active} />
      <LeftButton isActive={active === 0} onClick={() => handleClick(0)}>
        PTE
      </LeftButton>
      <RightButton isActive={active === 1} onClick={() => handleClick(1)}>
        PTE-Core
      </RightButton>
    </ToggleContainer>
  );
};

export default PteToggleBtn;
