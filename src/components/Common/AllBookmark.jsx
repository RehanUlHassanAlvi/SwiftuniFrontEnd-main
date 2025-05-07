import React, { useEffect, useState } from "react";
import {
  GrayLineDiv,
  BookmarksText as AllText,
  BookmarksText as BookmarkText,
  BookmarksText as PredictionText,
  PurpleLineDiv2 as AllTextUnderline,
  PurpleLineDiv2 as BookmarkTextUnderline,
  PurpleLineDiv2 as PredictionTextUnderline,
  QuestionsCountText,
  AllBookmarkPredDiv,
} from "./Style";
import { FlexDiv } from "../../assets/styles/style";
import { useMediaQuery } from "@mui/material";
import Ellipse2 from "../../assets/images/SP_Ellipse2.svg";

const AllBookmarkPrediction = ({
  QuestionsCount,
  onFilterChange,
  onPredictionChange,
  filterBookmarked,
  filterPrediction
}) => {
  const [activeTab, setActiveTab] = useState(filterPrediction ? "Prediction" : filterBookmarked ? "Bookmark" : "All");
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    setActiveTab(filterPrediction ? "Prediction" : filterBookmarked ? "Bookmark" : "All");
  }, [filterBookmarked, filterPrediction]);

  const handleBookmarkClick = () => {
    setActiveTab("Bookmark");
    onFilterChange(true);
    onPredictionChange(false);
  };

  const handleAllClick = () => {
    setActiveTab("All");
    onFilterChange(false);
    onPredictionChange(false);
  };

  const handlePredictionClick = () => {
    setActiveTab("Prediction");
    onPredictionChange(true);
    onFilterChange(false);
  };

  return (
    // <ButtonListDiv>
    <>
      <FlexDiv
        style={{
          width: "100%",
          flexDirection: "column",
        }}
      >
        <FlexDiv
          style={{
            justifyContent: "space-between",
            gap: "1rem",
            width: "100%",
            "@media (max-width: 450px)": {
              width: "90%",
              // justifyContent: "center",
            },
          }}
        >
          <AllBookmarkPredDiv>
            <AllText
              style={{
                marginLeft: "1.25rem",
                color:
                  activeTab === "All" ? "var(--Brand-Purple, #996CFE)" : "#000",
              }}
              onClick={handleAllClick}
            >
              All
            </AllText>
            <BookmarkText
              style={{
                color:
                  activeTab === "Bookmark"
                    ? "var(--Brand-Purple, #996CFE)"
                    : "#000",
              }}
              onClick={handleBookmarkClick}
            >
              Bookmark
            </BookmarkText>
            <PredictionText
              style={{
                color:
                  activeTab === "Prediction"
                    ? "var(--Brand-Purple, #996CFE)"
                    : "#000",
              }}
              onClick={handlePredictionClick}
            >
              Prediction
            </PredictionText>
          </AllBookmarkPredDiv>
          <FlexDiv>
            <img src={Ellipse2} alt="" />
            <QuestionsCountText>{QuestionsCount} Questions</QuestionsCountText>
          </FlexDiv>
        </FlexDiv>
        <FlexDiv
          style={{
            width: "100%",
          }}
        >
          <GrayLineDiv>
            <AllTextUnderline
              style={{
                background:
                  activeTab === "All"
                    ? "var(--Brand-Purple, #996CFE)"
                    : "#E8E8E8",
              }}
            />
            <BookmarkTextUnderline
              width={"5rem"}
              style={{
                marginLeft: isMobile ? "-0.3rem" : "0.85rem",

                background:
                  activeTab === "Bookmark"
                    ? "var(--Brand-Purple, #996CFE)"
                    : "#E8E8E8",
              }}
            />
            <PredictionTextUnderline
              width={"5rem"}
              style={{
                marginLeft: isMobile ? "0.5rem" : "2.35rem",

                background:
                  activeTab === "Prediction"
                    ? "var(--Brand-Purple, #996CFE)"
                    : "#E8E8E8",
              }}
            />
          </GrayLineDiv>
        </FlexDiv>
      </FlexDiv>
    </>
    // </ButtonListDiv>
  );
};

export default AllBookmarkPrediction;
