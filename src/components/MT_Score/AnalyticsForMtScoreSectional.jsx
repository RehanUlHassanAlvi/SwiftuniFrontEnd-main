import React, { useState, useEffect } from "react";
import { AnalyticDivOne, MainDiv } from "./style";
import { useMediaQuery } from "@mui/material";
import AnalyticsCard2 from "../Home/AnalyticsCard2";
import { AnalyticsCard2Data } from "../Home/data";
import { FlexDiv } from "../../assets/styles/style";
import { useMockTestScore } from "../../context/MockTestScoreContext";

const AnalyticsForMtScoreSectional = ({
  counts = null,
  mockTestType,
  speakingTotScore,
  writingTotScore,
  readingTotScore,
  listeningTotScore,
  seen = true,
}) => {
  const isTab = useMediaQuery("(max-width:700px)");
  const {
    scores, 
    setScores,

    giveScores,

    getTotSpeakingScore,
    getTotReadingScore,
    getTotListeningScore,
    getTotWritingScore,

    getSpeakingData,
    getWritingData,
    getReadingData,
    getListeningData,
   } = useMockTestScore();

  useEffect(() => {
    giveScores(counts);
  }, [counts]);

  useEffect(() => {
    if (speakingTotScore) speakingTotScore(getTotSpeakingScore());
    if (readingTotScore) readingTotScore(getTotReadingScore());
    if (listeningTotScore) listeningTotScore(getTotListeningScore());
    if (writingTotScore) writingTotScore(getTotWritingScore());
  }, [scores]);

  return seen ? (
    <FlexDiv
      style={{ width: "100%", flexDirection: "column", maxWidth: "1680px" }}
    >
      <MainDiv>
        {!isTab && (
          <>
            <FlexDiv
              style={{
                marginTop: "20px",
                width: "100%",
              }}
            >
              <FlexDiv style={{ width: "100%" }}>
                {mockTestType === "Speaking" && (
                  <AnalyticsCard2
                    key={AnalyticsCard2Data[0].id}
                    imageSrc={AnalyticsCard2Data[0].imageSrc}
                    titleText={AnalyticsCard2Data[0].titleText}
                    titleTextColor={AnalyticsCard2Data[0].titleTextColor}
                    marksTextColor={AnalyticsCard2Data[0].marksTextColor}
                    barBgColor={AnalyticsCard2Data[0].barBgColor}
                    categoriesData={getSpeakingData(counts).categoriesData}
                    widthOne={"35px"}
                  />
                )}

                {mockTestType === "Reading" && (
                  <AnalyticsCard2
                    key={AnalyticsCard2Data[3].id}
                    imageSrc={AnalyticsCard2Data[3].imageSrc}
                    titleText={AnalyticsCard2Data[3].titleText}
                    titleTextColor={AnalyticsCard2Data[3].titleTextColor}
                    marksTextColor={AnalyticsCard2Data[3].marksTextColor}
                    barBgColor={AnalyticsCard2Data[3].barBgColor}
                    categoriesData={getReadingData(counts).categoriesData}
                    widthOne={"35px"}
                  />
                )}
              </FlexDiv>
              <AnalyticDivOne>
                {mockTestType === "Writing" && (
                  <AnalyticsCard2
                    key={AnalyticsCard2Data[2].id}
                    imageSrc={AnalyticsCard2Data[2].imageSrc}
                    titleText={AnalyticsCard2Data[2].titleText}
                    titleTextColor={AnalyticsCard2Data[2].titleTextColor}
                    marksTextColor={AnalyticsCard2Data[2].marksTextColor}
                    barBgColor={AnalyticsCard2Data[2].barBgColor}
                    categoriesData={getWritingData(counts).categoriesData}
                    widthOne={"35px"}
                  />
                )}

                {mockTestType === "Listening" && (
                  <AnalyticsCard2
                    key={AnalyticsCard2Data[1].id}
                    imageSrc={AnalyticsCard2Data[1].imageSrc}
                    titleText={AnalyticsCard2Data[1].titleText}
                    titleTextColor={AnalyticsCard2Data[1].titleTextColor}
                    marksTextColor={AnalyticsCard2Data[1].marksTextColor}
                    barBgColor={AnalyticsCard2Data[1].barBgColor}
                    categoriesData={getListeningData(counts).categoriesData}
                    widthOne={"35px"}
                  />
                )}
              </AnalyticDivOne>
            </FlexDiv>
          </>
        )}
      </MainDiv>
      {isTab && (
        <>
          <FlexDiv
            style={{
              marginTop: "20px",
              width: "90%",
            }}
          >
            {mockTestType === "Speaking" && (
              <AnalyticsCard2
                key={AnalyticsCard2Data[0].id}
                imageSrc={AnalyticsCard2Data[0].imageSrc}
                titleText={AnalyticsCard2Data[0].titleText}
                titleTextColor={AnalyticsCard2Data[0].titleTextColor}
                marksTextColor={AnalyticsCard2Data[0].marksTextColor}
                barBgColor={AnalyticsCard2Data[0].barBgColor}
                categoriesData={getSpeakingData(counts).categoriesData}
                keepOpen={true}
              />
            )}

            {mockTestType === "Writing" && (
              <AnalyticsCard2
                key={AnalyticsCard2Data[2].id}
                imageSrc={AnalyticsCard2Data[2].imageSrc}
                titleText={AnalyticsCard2Data[2].titleText}
                titleTextColor={AnalyticsCard2Data[2].titleTextColor}
                marksTextColor={AnalyticsCard2Data[2].marksTextColor}
                barBgColor={AnalyticsCard2Data[2].barBgColor}
                categoriesData={getWritingData(counts).categoriesData}
              />
            )}

            {mockTestType === "Reading" && (
              <AnalyticsCard2
                key={AnalyticsCard2Data[3].id}
                imageSrc={AnalyticsCard2Data[3].imageSrc}
                titleText={AnalyticsCard2Data[3].titleText}
                titleTextColor={AnalyticsCard2Data[3].titleTextColor}
                marksTextColor={AnalyticsCard2Data[3].marksTextColor}
                barBgColor={AnalyticsCard2Data[3].barBgColor}
                categoriesData={getReadingData(counts).categoriesData}
              />
            )}

            {mockTestType === "Listening" && (
              <AnalyticsCard2
                key={AnalyticsCard2Data[1].id}
                imageSrc={AnalyticsCard2Data[1].imageSrc}
                titleText={AnalyticsCard2Data[1].titleText}
                titleTextColor={AnalyticsCard2Data[1].titleTextColor}
                marksTextColor={AnalyticsCard2Data[1].marksTextColor}
                barBgColor={AnalyticsCard2Data[1].barBgColor}
                categoriesData={getListeningData(counts).categoriesData}
              />
            )}
          </FlexDiv>
        </>
      )}
    </FlexDiv>
  ) : (
    <></>
  );
};

export default AnalyticsForMtScoreSectional;
