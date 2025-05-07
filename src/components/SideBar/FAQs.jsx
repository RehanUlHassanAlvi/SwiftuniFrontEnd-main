import React, { useState } from "react";
import { SideCardContainer, FAQsHeading, Tab1, TabsTextDiv } from "./style";
import { SideBarFAQsCardData } from "./data";
import FAQsCard from "./FAQsCard";
import { Btn } from "../../assets/styles/style";

const FAQs = () => {
  const [faqType, setFaqType] = useState(0);

  return (
    <>
      <SideCardContainer>
        <FAQsHeading>FAQs</FAQsHeading>
        <hr
          style={{ height: "2px", background: "#996cfe", width: "100%" }}
        ></hr>
        <TabsTextDiv>
          <Btn onClick={()=>{setFaqType(0)}}>
          <Tab1 style={{borderBottom:faqType===0?'2px solid #6b41cb':'2px solid transparent'}}>PTE Academic</Tab1>
          </Btn>
          <Btn onClick={()=>{setFaqType(1)}}>
          <Tab1 style={{borderBottom:faqType===1?'2px solid #6b41cb':'2px solid transparent'}}>Practice Tests</Tab1>
          </Btn>
        </TabsTextDiv>
        <>
          {SideBarFAQsCardData[faqType].map((item, index) => (
            <FAQsCard
              key={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </>
      </SideCardContainer>
    </>
  );
};

export default FAQs;
