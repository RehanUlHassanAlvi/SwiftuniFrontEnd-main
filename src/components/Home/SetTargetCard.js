import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Box, Button, Grid } from "@mui/material";
import CancelIcon from "../../assets/images/carbon_close-filled.svg";
import CustomIconDatePicker from "./DatePicker";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { STCOverallBtnsDiv, STCCardsContainer, STCsmallCards } from "./style";
import { PurpleBtn } from "../Common/Style";
import dayjs from "dayjs";

const SetTargetCard = ({
  setExamDate,
  setExamTarget,
  setExamTargetRange,
  onSubmit,
  onClose,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isLessThan500px = useMediaQuery("(max-width:500px)");

  const initialDataSets = {
    set1: {
      overall: "35",
      speaking: "35",
      writing: "35",
      reading: "35",
      listening: "35",
    },
    set2: {
      overall: "50",
      speaking: "50",
      writing: "50",
      reading: "50",
      listening: "50",
    },
    set3: {
      overall: "65",
      speaking: "65",
      writing: "65",
      reading: "65",
      listening: "65",
    },
    set4: {
      overall: "79+",
      speaking: "79+",
      writing: "79+",
      reading: "79+",
      listening: "79+",
    },
  };

  const [selectedDataSet, setSelectedDataSet] = useState("set1");
  const [dateInput, setDateInput] = useState("");
  const [inputData, setInputData] = useState(initialDataSets[selectedDataSet]);
  const [focusedInput, setFocusedInput] = useState("overall");

  useEffect(() => {
    const initialRange = buttonOptions.find(option => option.value === selectedDataSet).label;
    setExamTargetRange(initialRange);

    if (dayjs(dateInput).isValid() || inputData.overall.trim() !== "") {
      setExamDate(dateInput);
      setExamTarget(inputData); 
    
    }
  }, [selectedDataSet, inputData, dateInput]);

  const handleDateChange = (newDate) => {
    setDateInput(newDate);
  };

  const handleButtonClick = (dataSet) => {
    setSelectedDataSet(dataSet);
    setInputData(initialDataSets[dataSet]);
    // const selectedOption = buttonOptions.find(option => option.value === dataSet);
    // setExamTargetRange(selectedOption.label);
    setExamTargetRange(buttonOptions.find(option => option.value === dataSet).label);

  };

  const handleInputChange = (e, aspect) => {
    setInputData((prevData) => ({
      ...prevData,
      [aspect]: e.target.value,
    }));
  };

  const handleInputFocus = (aspect) => {
    setFocusedInput(aspect);
  };

  const handleInputBlur = () => {
    setFocusedInput(null);
  };

  const renderButtons = (options) => {
    return options.map((option) => (
      <Button
        key={option.label}
        sx={{
          color: selectedDataSet === option.value ? "white" : "black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textTransform: "none",
          backgroundColor:
            selectedDataSet === option.value
              ? "var(--Brand-Purple, #996CFE)"
              : "#F2F3F7",
          width: "100%",
          maxWidth: "100px",
          height: "32px",
          borderRadius: "40px",
          cursor: "pointer",
          ":hover": {
            backgroundColor: "var(--Brand-Purple, #996CFE)",
          },
          ":active": {
            backgroundColor: "var(--Brand-Purple, #996CFE)",
          },
          // "@media (max-width: 450px)": {
          //   width: "85px", //small
          // },
        }}
        onClick={() => handleButtonClick(option.value)}
        tabIndex="0"
      >
        <Typography
          sx={{
            textAlign: "center",
            fontFamily: "Noto Sans",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "20px",
            letterSpacing: "0.113px",
            // "@media (max-width: 450px)": {
            //   fontSize: "12px", //small
            // },
          }}
        >
          {option.label}
        </Typography>
      </Button>
    ));
  };

  const buttonOptions = [
    { label: "35 - 49", value: "set1" },
    { label: "50 - 64", value: "set2" },
    { label: "65 - 78", value: "set3" },
    { label: "79+", value: "set4" },
  ];

  const inputStyle = {
    color: "#996CFE",
    backgroundColor: "white",
    width: "100%",
    padding: "0px 0px",
    height: "32px",
    borderRadius: "5px",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #996CFE1A",
  };

  const getInputDivsStyle = (aspect) => {
    const isLessThan600px = useMediaQuery("(max-width:450px)");
    const width = isLessThan600px && aspect === "overall" ? "155px" : "65px";

    return {
      color: focusedInput === aspect ? "#FFFFFF" : "#535362",
      width: "100%",
      maxWidth: width,
      height: "90px",
      backgroundColor: focusedInput === aspect ? "#996CFE" : "#F2F3F7",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: "15px",
      padding: "0px 10px",
      "@media (max-width: 450px)": {},
    };
  };

  return (
    <>
      {" "}
      <Card
        id="target-card"
        sx={{
          width: isSmallScreen ? "90%" : "520px",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          borderRadius: "8px",
          backgroundColor: "#FFFFFF",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          zIndex: 1001,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-center",
            position: "relative",
          }}
        >
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                height: "25px",
                backgroundColor: "#996CFE",
                padding: "15px 15px 25px 15px  ",
                borderRadius: "8px 8px 0 0",
                // paddingBottom: "15px",
              }}
            >
              <Typography
                sx={{
                  color: "#FFFFFF",
                  fontFamily: "Noto Sans",
                  fontStyle: "normal",
                  fontSize: "16px",
                  fontWeight: "600",
                  lineHeight: "16px",
                }}
              >
                Set Target
              </Typography>
              <div style={{ cursor: "pointer" }} onClick={(e) => onClose(e)}>
                <img
                  src={CancelIcon}
                  alt=""
                  style={{ width: "20px", height: "20px" }}
                />
              </div>
            </div>
            <Box
              sx={{
                padding: "30px",
                gap: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              {/* Exam Date Div */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  gap: "15px",
                }}
              >
                <Typography
                  sx={{
                    color: "#333333",
                    fontFamily: "Noto Sans",
                    fontStyle: "normal",
                    fontSize: "14px",
                    fontWeight: "600",
                    lineHeight: "16px",
                  }}
                >
                  Exam Date
                </Typography>
                <Box>
                  <CustomIconDatePicker
                    value={dateInput}
                    onChange={handleDateChange}
                    label="Exam Date"
                  />
                </Box>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  gap: "20px",
                }}
              >
                <Typography
                  sx={{
                    color: "#333333",
                    fontFamily: "Noto Sans",
                    fontStyle: "normal",
                    fontSize: "14px",
                    fontWeight: "600",
                    lineHeight: "16px",
                  }}
                >
                  Score Target
                </Typography>

                <STCOverallBtnsDiv>
                  {renderButtons(buttonOptions).map((button, index) => (
                    <div key={index} style={{ marginTop: "4px" }}>
                      {button}
                    </div>
                  ))}
                </STCOverallBtnsDiv>

                <STCCardsContainer>
                  {[
                    "Overall",
                    "Speaking",
                    "Writing",
                    "Reading",
                    "Listening",
                  ].map((aspect, index) => (
                    <div
                      style={getInputDivsStyle(aspect.toLowerCase())}
                      key={index}
                      onClick={() => handleInputFocus(aspect.toLowerCase())}
                    >
                      <input
                        type="text"
                        value={inputData[aspect.toLowerCase()]}
                        onChange={(e) =>
                          handleInputChange(e, aspect.toLowerCase())
                        }
                        onFocus={() => handleInputFocus(aspect.toLowerCase())}
                        onBlur={handleInputBlur}
                        style={inputStyle}
                      />
                      <Typography
                        sx={{
                          textAlign: "center",
                          fontFamily: "Noto Sans",
                          fontSize: "12px",
                          fontStyle: "normal",
                          fontWeight: "400",
                          lineHeight: "16px",
                        }}
                      >
                        {aspect}
                      </Typography>
                    </div>
                  ))}
                </STCCardsContainer>
              </div>
              <div style={{ display: "flex", alignSelf: "flex-end" }}>
                <PurpleBtn onClick={onSubmit}>Submit</PurpleBtn>
              </div>
            </Box>
          </>
        </Box>
      </Card>
    </>
  );
};

export default SetTargetCard;
