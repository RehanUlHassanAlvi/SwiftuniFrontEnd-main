
import React, { useState } from 'react';
import styled from 'styled-components';
import Previous from "../../assets/images/previous.svg";
import Next from "../../assets/images/next.svg";
import moment from 'moment';
import {
  NavigationBtn,
  Day,
  DateDiv, 
  Month,
  StyledDate,
  GridContainer,
} from "./style";

const FlexDiv = styled.div`
display: flex;
flex-direction: ${props => props.column ? 'column' : 'row'};
justify-content: space-between;
align-items: center;
width: 100%;
`;


 const getCalendar = (year, month) => {
  const startDay = moment(`${year}-${month + 1}-01`, "YYYY-MM-DD").day();
  const daysInMonth = moment(`${year}-${month + 1}`, "YYYY-MM").daysInMonth();
  let dates = Array.from({ length: 42 }, () => "");  
  for (let i = 0; i < daysInMonth; i++) {
    dates[i + startDay] = (i + 1).toString();
  }
  return {
    year,
    month,
    dates: [
      dates.slice(0, 7),
      dates.slice(7, 14),
      dates.slice(14, 21),
      dates.slice(21, 28),
      dates.slice(28, 35),
      dates.slice(35, 42)
    ],
  };
};

const Days = ["S", "M", "T", "W", "T", "F", "S"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const CustomCalendar = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const calendar = getCalendar(currentYear, currentMonth);

  const handleNext = () => {
    setCurrentMonth((currentMonth + 1) % 12);
    if (currentMonth === 11) {
      setCurrentYear(currentYear + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentMonth((currentMonth + 11) % 12);
    if (currentMonth === 0) {
      setCurrentYear(currentYear - 1);
    }
  }; 

  return (
    <FlexDiv column style={{ padding: '' }}>
      <FlexDiv style={{position: "relative", width: "90%"}}>
        <Month>{months[currentMonth] + " " + currentYear}</Month>
        <FlexDiv gap="1rem" style={{position: "absolute"}}>
          <NavigationBtn src={Previous} alt="Prev" style={{marginLeft: "11rem"}} onClick={handlePrevious}/>
          <NavigationBtn src={Next} alt="Next" onClick={handleNext}/>
        </FlexDiv>
      </FlexDiv>
      <FlexDiv style={{ width: "88%", marginTop: "17.16px", justifyContent: "space-between"}}>
      {Days.map((day, index) => (
        <Day key={`${day}-${index}`}>{day}</Day>
      ))}
      </FlexDiv>
      {calendar.dates.map((week, index) => (
        <FlexDiv key={index}>
          {week.map((date, idx) => (
            <DateDiv key={idx}  hasValue={date === ""} isToday={date === new Date().getDate().toString() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()}>
              <StyledDate>{date}</StyledDate>
            </DateDiv>
          ))}
        </FlexDiv>
      ))}
    </FlexDiv>
  );
};

export default CustomCalendar;
