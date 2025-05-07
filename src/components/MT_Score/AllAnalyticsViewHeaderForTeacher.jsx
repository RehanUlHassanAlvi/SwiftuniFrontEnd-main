import React, { useEffect, useState } from "react";
import { FlexDiv } from "../../assets/styles/style";
import PteToggleBtn from "../Navbar/PteToggleBtn";
import useMediaQuery from "@mui/material/useMediaQuery";


const AllAnalyticsViewHeaderForTeacher = ({ onPteTypeChange }) => {
  const isMobile = useMediaQuery("(max-width:500px)");
  const [active, setActive] = useState(
    localStorage.getItem("pte-type") === "pte core" ? 1 : 0
  );

  useEffect(() => {
    onPteTypeChange(active === 1 ? "pte core" : "pte academic");
  }, [active, onPteTypeChange]);

  return (
    <FlexDiv
      style={{
        justifyContent: "space-between",
        padding: "1rem 3%",
        alignItems: "center",
        backgroundColor: "#36454F",
        color: "white",
      }}
    >
      <h2>Student Analytics</h2>
      <FlexDiv
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: isMobile ? "0.3rem 0.7rem" : "0.5rem 1.5rem",
        }}
        >
         <PteToggleBtn active={active} setActive={setActive} isTeacher={true}/>
      </FlexDiv>
    </FlexDiv>
  );
};

export default AllAnalyticsViewHeaderForTeacher;