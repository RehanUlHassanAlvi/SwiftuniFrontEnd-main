import React, { useEffect } from "react";
import { PurpleBtn } from "../Common/Style";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import SaveExitBtn from "./SaveExitBtn";

export default function WelcomeWriting({
  Exam,
  startingCategory,
  setNextStartingCategory,
  name,
  writingTime = null,
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
  //   setNextStartingCategory(startingCategory + 1);
  //   setIsTestStarted(true);
  // };

  const handleExit = () => {
    navigate("/MockTest");
  };

  const writingSubcategories =
    questions && questions.length > 0
      ? [
          ...new Set(
            questions
              .filter(
                (q) =>
                  q.Category &&
                  q.Category.toLowerCase() === "writing" &&
                  q.SubCategory
              )
              .map((q) => q.SubCategory)
          ),
        ]
      : [];

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

              {name === "Writing" && (
                <>
                  {/* <p>Be ready!</p> */}
                  <p>
                    <div style={{ display: "flex" }}>
                      <div style={{ width: "50px" }}>
                        <b>Time:</b>
                      </div>
                      <div>
                        <b>{formatTimeMinsSecs(writingTime)} minutes</b>
                      </div>
                    </div>
                  </p>
                </>
              )}

              {name === "Writing" ? (
                <p>
                  {writingSubcategories.length > 0 && (
                    <div>
                      <ul style={{paddingLeft: '16px', paddingTop: '0'}}>
                        {writingSubcategories.map((subcat, index) => (
                          <li key={index}>{subcat}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </p>
              ) : (
                <p>
                  Remember to put your headphones on before beginning the
                  session
                </p>
              )}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "25px",
              }}
            >
              <SaveExitBtn handleExit={handleExit} />
              {name === "Writing" ? (
                <PurpleBtn onClick={handleNext}>Continue</PurpleBtn>
              ) : (
                <PurpleBtn onClick={handleNext}>Next</PurpleBtn>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
