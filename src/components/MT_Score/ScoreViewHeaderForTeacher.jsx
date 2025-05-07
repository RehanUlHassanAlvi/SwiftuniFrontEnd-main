import React, { useState, useEffect } from "react";
import { FlexDiv } from "../../assets/styles/style";
import {
  AnalyticsHeader,
  FeedbackHeaderTitle,
  ShareBtn,
  WhiteDiv,
} from "./style";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";

const ScoreViewHeaderForTeacher = () => {
  const isSmallScreen = useMediaQuery("(max-width:800px)");
  const isMobile = useMediaQuery("(max-width:500px)");
  const navigate = useNavigate();
  const { userId, mockTestAttemptedId, typeOfTest } = useParams();
  const location = useLocation();
  const [scoreType, setScoreType] = useState("");
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    const pathSegments = location.pathname.split("/");

    if (pathSegments.length >= 2) {
      const firstSegment = pathSegments[1].toLowerCase();

      if (firstSegment.startsWith("mt-score-full")) {
        setScoreType("full");

        if (firstSegment === "mt-score-full") {
          setActiveTab("viewScore");
        } else if (firstSegment === "mt-score-full-analytics") {
          setActiveTab("analytics");
        } else if (firstSegment === "mt-score-full-feedback") {
          setActiveTab("feedback");
        } else {
          setActiveTab("");
        }
      } else if (firstSegment.startsWith("mt-score-sectional")) {
        setScoreType("sectional");

        if (firstSegment === "mt-score-sectional") {
          setActiveTab("viewScore");
        } else if (firstSegment === "mt-score-sectional-analytics") {
          setActiveTab("analytics");
        } else if (firstSegment === "mt-score-sectional-feedback") {
          setActiveTab("feedback");
        } else {
          setActiveTab("");
        }
      } else {
        setScoreType("");
        setActiveTab("");
      }
    } else {
      setScoreType("");
      setActiveTab("");
    }
  }, [location.pathname]);

  const handleViewScore = () => {
    if (scoreType) {
      navigate(
        `/mt-score-${scoreType}/${userId}/${mockTestAttemptedId}/${typeOfTest}`
      );
    }
  };

  const handleAnalytics = () => {
    if (scoreType) {
      navigate(
        `/mt-score-${scoreType}-analytics/${userId}/${mockTestAttemptedId}/${typeOfTest}`
      );
    }
  };

  const handleFeedback = () => {
    if (scoreType) {
      navigate(
        `/mt-score-${scoreType}-feedback/${userId}/${mockTestAttemptedId}/${typeOfTest}`
      );
    }
  };

  const renderAdditionalText = () => {
    switch (activeTab) {
      case "viewScore":
        return "Score";
      case "analytics":
        return "Analytics";
      case "feedback":
        return "Feedback";
      default:
        return "";
    }
  };

  return (
    <FlexDiv
      style={{
        flexDirection: "column",
        width: "100%",
      }}
    >
      <AnalyticsHeader
        style={{
          borderRadius: "0px",
          backgroundColor: "#36454F",
          // backgroundColor: "#996cfe",
          width: "100%",
          height: isSmallScreen ? "auto" : "35px",
        }}
      >
        <FeedbackHeaderTitle
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
            width: "95vw",
            boxSizing: "border-box",
            margin: "0px",
            padding: "0px",
          }}
        >
          <div
            style={{ fontSize: "24px", fontWeight: "bold", color: "#ffffff", display: "flex", justifySelf: "center", marginTop: isSmallScreen ? "0px" : "8px" }}
          >
            {scoreType === "full" ? "FULL " : "SECTIONAL "} MOCK TEST
          </div>

          <FlexDiv
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
              marginTop: isSmallScreen ? "-1px" : "-54px",
              gap: "10px",
            }}
          >
            <ShareBtn
              onClick={handleViewScore}
              active={activeTab === "viewScore"}
              style={{
                backgroundColor:
                  activeTab === "viewScore" ? "#ffffff" : "transparent",
                color: activeTab === "viewScore" ? "#36454F" : "#ffffff",
                border: "1px solid #ffffff",
                padding: isMobile ? "0.3rem 0.7rem" : "0.5rem 1.5rem",
              }}
            >
              View Score
            </ShareBtn>
            <ShareBtn
              onClick={handleAnalytics}
              active={activeTab === "analytics"}
              style={{
                backgroundColor:
                  activeTab === "analytics" ? "#ffffff" : "transparent",
                color: activeTab === "analytics" ? "#36454F" : "#ffffff",
                border: "1px solid #ffffff",
                padding: isMobile ? "0.3rem 0.7rem" : "0.5rem 1.5rem",
              }}
            >
              Analytics
            </ShareBtn>
            <ShareBtn
              onClick={handleFeedback}
              active={activeTab === "feedback"}
              style={{
                backgroundColor:
                  activeTab === "feedback" ? "#ffffff" : "transparent",
                color: activeTab === "feedback" ? "#36454F" : "#ffffff",
                border: "1px solid #ffffff",
                padding: isMobile ? "0.3rem 0.7rem" : "0.5rem 1.5rem",
              }}
            >
              Feedback
            </ShareBtn>
          </FlexDiv>
        </FeedbackHeaderTitle>
      </AnalyticsHeader>
      <WhiteDiv></WhiteDiv>
    </FlexDiv>
  );
};

export default ScoreViewHeaderForTeacher;
