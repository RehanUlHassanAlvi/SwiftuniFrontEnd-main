import React, { useEffect } from "react";
import { PurpleBtn } from "../Common/Style";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SaveExitBtn from "./SaveExitBtn";

export default function WelcomeSectional({
  Exam,
  startingCategory,
  setNextStartingCategory,
  name,
  totalTime = "00:00",
  listeningNonSSTTime = null,
  summarizeSpokenTextTime = null,
  setIsTestStarted,
  isResuming,
  questions,
  step,
}) {
  const isLaptopTwo = useMediaQuery("(max-width:1000px)");

  const navigate = useNavigate();

  function formatTimeMinsSecs(totalMinutes) {
    const mins = Math.floor(totalMinutes); // Get whole minutes
    const seconds = Math.floor((totalMinutes - mins) * 60); // Get the seconds part

    const formattedMinutes = mins < 10 ? `0${mins}` : mins;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  // Function to determine the next category
  const findNextCategory = (questions, startingCategory) => {
    if (!questions || questions.length === 0) return null;

    // Get the unique categories in the questions array in the order they appear
    const categories = [...new Set(questions.map((q) => q.Category))];

    // Map categories to their respective values
    const categoryMap = {
      Speaking: 1,
      Writing: 2,
      Reading: 3,
      Listening: 4,
    };

    // Find the index of the current category
    const currentIndex = categories.findIndex(
      (cat) => categoryMap[cat] === startingCategory
    );

    // Determine the next category (set to null if there is no next category)
    return currentIndex >= 0 && currentIndex < categories.length - 1
      ? categories[currentIndex + 1]
      : null;
  };

  const handleNext = () => {
    const nextCategory = findNextCategory(questions, startingCategory);

    // Map category names to numeric values or set to null
    const categoryMap = {
      Speaking: 1,
      Writing: 2,
      Reading: 3,
      Listening: 4,
    };
    console.log("startingCategory:", startingCategory);

    console.log(
      "nextCategory:",
      nextCategory ? categoryMap[nextCategory] : null
    );

    setNextStartingCategory(nextCategory ? categoryMap[nextCategory] : null);
    setIsTestStarted(true);
  };

  // const handleNext = () => {
  //   setStartingCategory(4);
  //   setIsTestStarted(true);
  // };

  const handleExit = () => {
    navigate("/MockTest");
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: isLaptopTwo ? "1rem 5% 2rem" : "3rem 5% 2rem",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            // height: "400px",
            width: "100%",
            borderRadius: "24px",
            position: "relative",
            overflow: "clip",
          }}
        >
          <div
            style={{
              width: "full",
              minHeight: "50vh",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <p style={{ fontSize: "50px", margin: "30px 0px" }}>{Exam}</p>
              <hr />
              {isResuming && (
                <p>
                  You Resumed The Mock Test Exam.
                  {/* <b>{name}</b> */}
                </p>
              )}

              {name === "Speaking" && (
                <>
                  <p>
                    <div style={{ display: "flex" }}>
                      <div>Starting </div>
                      <div style={{ padding: "0 4.5px", color: "#242423" }}>
                        <b>{name}</b>
                      </div>
                      <div>category of the Sectional Mock Test.</div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div style={{ width: "155px" }}>Total Time Allowed:</div>
                      <div>
                        <b>{formatTimeMinsSecs(totalTime)} minutes</b>
                      </div>
                    </div>
                  </p>
                </>
              )}

              {name === "Writing" && (
                <>
                  <p>
                    <div style={{ display: "flex" }}>
                      <div>Starting </div>
                      <div style={{ padding: "0 4.5px", color: "#242423" }}>
                        <b>{name}</b>
                      </div>
                      <div>category of the Sectional Mock Test.</div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div style={{ width: "155px" }}>Total Time Allowed:</div>
                      <div>
                        <b>{formatTimeMinsSecs(totalTime)} minutes</b>
                      </div>
                    </div>
                  </p>
                </>
              )}

              {name === "Reading" && (
                <>
                  <p>
                    <div style={{ display: "flex" }}>
                      <div>Starting </div>
                      <div style={{ padding: "0 4.5px", color: "#242423" }}>
                        <b>{name}</b>
                      </div>
                      <div>category of the Sectional Mock Test.</div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div style={{ width: "155px" }}>Total Time Allowed:</div>
                      <div>
                        <b>{formatTimeMinsSecs(totalTime)} minutes</b>
                      </div>
                    </div>
                  </p>
                </>
              )}

              {name === "Listening" && (
                <p>
                  <div style={{ display: "flex" }}>
                    <div>Starting </div>
                    <div style={{ padding: "0 4.5px", color: "#242423" }}>
                      <b>{name}</b>
                    </div>
                    <div>category of the Sectional Mock Test.</div>
                  </div>

                  <div style={{ display: "flex" }}>
                    <div style={{ width: "195px" }}>Total Time allowed:</div>
                    <div>
                      <b>{formatTimeMinsSecs(totalTime)} minutes</b>
                    </div>
                  </div>

                  <div style={{ display: "flex" }}>
                    <div style={{ width: "195px" }}>Summarize Spoken Text:</div>
                    <div>
                      <b>
                        {formatTimeMinsSecs(summarizeSpokenTextTime)} minutes
                      </b>
                    </div>
                  </div>

                  <div style={{ display: "flex" }}>
                    <div style={{ width: "195px" }}>Other Questions Time:</div>
                    <div>
                      <b>
                        {formatTimeMinsSecs(listeningNonSSTTime)} minutes
                      </b>
                    </div>
                  </div>
                </p>
              )}

              <p>
                Remember to put your headphones on before beginning the session
              </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "25px",
              }}
            >
              <SaveExitBtn handleExit={handleExit} />
              <PurpleBtn onClick={handleNext}>Next</PurpleBtn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
