import React, { useState } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import CancelIcon from "../../assets/images/carbon_close-filled.svg";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { PurpleBtn } from "../Common/Style";
import { CircularDiv } from "../MT_Score/style";
import { CircularProgText, ContentWrapper1 } from "../Writing/style";
import CircularScoreProgress from "../Writing/CircularScoreProgress";
import { Btn } from "../../assets/styles/style";

const CircularScoreData = [
  {
    key: "Overall",
    HeaderBgColor: "#996CFE",
    Title: "Overall",
    score: "8",
    totalScore: "10",
    progressColorFilled: "#996CFE",
    progressColorUnfilled: "#E5DAFF",
    scoreColor: "#996CFE",
  },
];

const SetTargetPopup = ({ startValue, endValue, handleSetTarget, close }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const initialDataSets = {
    set1: { start: 35, end: 49 },
    set2: { start: 50, end: 64 },
    set3: { start: 65, end: 78 },
    set4: { start: 79, end: 90 },
  };

  const [selectedDataSet, setSelectedDataSet] = useState("set4");

  const handleButtonClick = (dataSet) => {
    setSelectedDataSet(dataSet);
    // handleSetTarget(
    //   initialDataSets[dataSet].start,
    //   initialDataSets[dataSet].end
    // );
  };

  

  const handleSave = () => {
    handleSetTarget(
      initialDataSets[selectedDataSet].start,
      initialDataSets[selectedDataSet].end
    );
    close(false);
  };

  const renderRangeButtons = () => {
    const options = [
      { label: "35 - 49", value: "set1" },
      { label: "50 - 64", value: "set2" },
      { label: "65 - 78", value: "set3" },
      { label: "79+", value: "set4" },
    ];

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
          height: "32px",
          borderRadius: "40px",
          cursor: "pointer",
          ":hover": {
            backgroundColor: "var(--Brand-Purple, #996CFE)",
          },
          ":active": {
            backgroundColor: "var(--Brand-Purple, #996CFE)",
          },
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
          }}
        >
          {option.label}
        </Typography>
      </Button>
    ));
  };

  return (
    <>
      <Card
        id="targetcard"
        sx={{
          width: isSmallScreen ? "90%" : "520px",
          height: "23rem",
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
            alignItems: "center",
            position: "relative",
            width: "100%",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#996CFE",
              padding: "0.6875rem 0.9375rem 1.3125rem 0.9375rem",
              borderRadius: "8px 8px 0 0",
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
                marginLeft: "1rem",
              }}
            >
              Set Target
            </Typography>
            <div style={{ cursor: "pointer" }} onClick={() => close(false)}>
              <img
                src={CancelIcon}
                alt=""
                style={{ width: "20px", height: "20px", marginRight: "1rem" }}
              />
            </div>
          </div>
          <Box
            sx={{
              padding: "20px",
              gap: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "90%",
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
                alignSelf: "flex-start",
              }}
            >
              Score Target
            </Typography>

            <div
              style={{ display: "flex", gap: "10px", alignSelf: "flex-start" }}
            >
              {renderRangeButtons()}
            </div>

            <CircularDiv>
              <ContentWrapper1>
                <CircularScoreProgress
                  start={initialDataSets[selectedDataSet].start}
                  end={initialDataSets[selectedDataSet].end}
                  score={initialDataSets[selectedDataSet].start}
                  totalScore={90}
                  progressColorFilled={CircularScoreData[0].progressColorFilled}
                  progressColorUnfilled={
                    CircularScoreData[0].progressColorUnfilled
                  }
                  scoreColor={CircularScoreData[0].scoreColor}
                  circleSize={85}
                  fontSize={"1.2rem"}
                />
                <CircularProgText>
                  {CircularScoreData[0].Title}
                </CircularProgText>
              </ContentWrapper1>
            </CircularDiv>

            <div style={{ display: "flex", alignSelf: "flex-end" }}>
              <PurpleBtn
                bgColor="transparent"
                onClick={() => close(false)}
                style={{ marginRight: "0.5rem" }}
              >
                cancel
              </PurpleBtn>
              <PurpleBtn onClick={handleSave}>Save</PurpleBtn>
            </div>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default SetTargetPopup;
