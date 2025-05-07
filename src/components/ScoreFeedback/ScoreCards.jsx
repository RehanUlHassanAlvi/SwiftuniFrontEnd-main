import React, { useState, useEffect } from "react";
import { ScoreCardScore, ScoreCardText, ScoreCardsDiv } from "./Style";
import SettingsIcon from "@mui/icons-material/Settings";
import Modal from "react-modal";
import SetTargetPopup from "../Home/SetTargetPopup";

const modalStyle = {
  overlay: {
    zIndex: 1002,
    backdropFilter: "blur(5px)",
    WebkitBackdropFilter: 'blur(5px)',
    background: "none",
  },
  content: {
    border: "none",
    background: "transparent",
    inset: "0px",
    padding: "20px 1%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
};

const ScoreCards = ({
  score = "--",
  text = "",
  bg = "var(--Brand-Purple, #996CFE)",
  width = "100%",
  setScore = "",
  targetPopup = false,
  setTargetRange = null,
}) => {
  const [open, setOpen] = useState(false);
  const [startValue, setStartValue] = useState(79);
  const [endValue, setEndValue] = useState(90);

  // const handleInputChange = (event) => {
  //   const value = event.target.value.trim();

  //   if (/^\d+$/.test(value) || value === "") {
  //     if (value === "") {
  //       event.target.value = "";
  //       if (setScore) {
  //         setScore(null);
  //       }
  //     } else {
  //       const parsedValue = parseInt(value, 10);
  //       if (setScore) {
  //         setScore(parsedValue);
  //       }
  //     }
  //   } else {
  //     event.target.value = "";
  //     if (setScore) {
  //       setScore(null);
  //     }
  //   }
  // };

  const handleInputChange = (event) => {
    const value = event.target.value.trim();

    if (value === "") {
      event.target.value = "";
      if (setScore) {
        setScore(null);
      }
    } else if (/^\d+$/.test(value) && value.length <= 2) {
      const parsedValue = parseInt(value, 10);
      if (setScore) {
        setScore(parsedValue);
      }
    } else {
      event.target.value = value.slice(0, 2);
    }
  };

  const handleInputBlur = (event) => {
    const value = event.target.value.trim();
    const parsedValue = parseInt(value, 10);

    if (!isNaN(parsedValue)) {
      const clampedValue = Math.min(90, Math.max(10, parsedValue));
      event.target.value = clampedValue;
      if (setScore) {
        setScore(clampedValue);
      }
    } else {
      event.target.value = "";
      if (setScore) {
        setScore(null);
      }
    }
  };

  const openTargetPopup = () => {
    setOpen(true);
  }; 

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const scorecardElement = document.getElementById("targetcard");
      if (scorecardElement && !scorecardElement.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleSetTarget = (start, end) => {
    setTargetRange(`${start}-${end}`);
    setStartValue(start);
    setEndValue(end);
    // setOpen(false);
  };

  return (
    <>
      {open && (
        <Modal isOpen={open} style={modalStyle}>
          <SetTargetPopup
            close={setOpen}
            startValue={startValue}
            endValue={endValue}
            handleSetTarget={handleSetTarget}
          />
        </Modal>
      )}
      <ScoreCardsDiv style={{ background: bg, width: width }}>
        {targetPopup ? ( 
          <>
            {endValue === 90 ? (
              <ScoreCardText style={{ fontSize: "1.5rem" }}>
                {startValue}+
              </ScoreCardText>
            ) : (
              <ScoreCardText style={{ fontSize: "1.5rem" }}>
                {startValue} - {endValue}
              </ScoreCardText>
            )}
          </>
        ) : (
          <>
            <ScoreCardScore
              placeholder="--"
              type="tel"
              onInput={handleInputChange}
              onBlur={handleInputBlur}
            />
          </>
        )}

        <ScoreCardText>{text}</ScoreCardText>
        {targetPopup && (
          <SettingsIcon
            onClick={openTargetPopup}
            alt="Set Target"
            sx={{
              color: "white",
              position: "absolute",
              right: "1.25rem",
              top: "1.25rem",
              cursor: "pointer",
              transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",

              "&:hover": {
                transform: "scale(1.2)",
                boxShadow: "0 8px 16px -4px rgba(0, 0, 0, 0.2)"
              }
            }}
          />
        )}
      </ScoreCardsDiv>
    </>
  );
};

export default ScoreCards;
