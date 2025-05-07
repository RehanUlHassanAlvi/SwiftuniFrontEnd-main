import React, { useEffect, useState } from "react";
import TestProgress from "../components/Home/TestProgress";
import { FlexDiv } from "../assets/styles/style";
import { useParams } from 'react-router-dom';
import useMediaQuery from "@mui/material/useMediaQuery";
import { ScrollableContainer } from "./Style";
import AllAnalyticsViewHeaderForTeacher from "../components/MT_Score/AllAnalyticsViewHeaderForTeacher";

const UserAnalyticsForTeacher = () => {
  const { userId } = useParams();
  const isLaptopTwo = useMediaQuery("(max-width:1000px)");
  const isSmallScreen = useMediaQuery("(max-width:500px)");
  const [adminBarExists, setAdminBarExists] = useState(false);
  const [barExists, setBarExists] = useState(false);
  const [pteType, setPteType] = useState("pte academic"); // Default to PTE Academic

  const handlePteTypeChange = (type) => {
    setPteType(type);
  };


  return (
    <>
      <AllAnalyticsViewHeaderForTeacher onPteTypeChange={handlePteTypeChange}/>

      {!isSmallScreen && ( 
        <ScrollableContainer 
          style={{
            height: isLaptopTwo 
              ? `calc(100vh - 1.5rem${adminBarExists ? ' - 2.5rem' : ''}${barExists ? ' - 2.5rem' : ''})`
              : `calc(100vh - 5rem${adminBarExists ? ' - 2.5rem' : ''}${barExists ? ' - 2.5rem' : ''})`,
          }}
        >
          <FlexDiv style={{ padding: "1.5rem 3%" }}>
            <TestProgress userId={userId} pteType={pteType} />
          </FlexDiv>
        </ScrollableContainer>
      )}

      {isSmallScreen && (
        <>
          <FlexDiv style={{ padding: "1.5rem 3%" }}>
            <TestProgress userId={userId} pteType={pteType} />
          </FlexDiv>
        </>
      )}
    </>
  );
};

export default UserAnalyticsForTeacher;