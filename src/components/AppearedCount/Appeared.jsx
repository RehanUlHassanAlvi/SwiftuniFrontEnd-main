import React, { useState, useEffect } from "react";
import { AppearedDiv } from "./style";
import Modal from "react-modal";
import AddAppearedPopup from "./AddAppearedPopup";
import AlreadyAppearedPopup from "./AlreadyAppearedPopup";
import { Base_URL } from "../../Client/apiURL";

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

const Appeared = ({ appearedCount, questionId }) => {
  const [open, setOpen] = useState(false);
  const [appearedData, setAppearedData] = useState(null);
  const [isAlreadyAppeared, setIsAlreadyAppeared] = useState(false);

  const GetAppearedQuestion = async () => {
    try {
      const response = await fetch(
        `${Base_URL}/app/users/appeared-questions?question_id=${questionId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const responseData = await response.json();
      if (responseData.responseCode === 200) {
        setAppearedData(responseData.response);
        setIsAlreadyAppeared(true);
      } else {
        setIsAlreadyAppeared(false);
      }
    } catch (error) {
      console.error(error.message);
      setIsAlreadyAppeared(false);
    }
  };

  useEffect(() => {
    if (open) {
      GetAppearedQuestion();
    }
  }, [open]);

  const handleOpenAddPopup = () => {
    setIsAlreadyAppeared(false);
  };

  const removeAppearanceById = (id) => {
    const updatedData = appearedData.filter(
      (item) => item.AppearedQuestionId !== id
    );
    setAppearedData(updatedData);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const scorecardElement = document.getElementById("popup-card");
      if (scorecardElement && !scorecardElement.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <Modal isOpen={open && isAlreadyAppeared} style={modalStyle}>
        <AlreadyAppearedPopup
          close={setOpen}
          questionId={questionId}
          appearedData={appearedData}
          removeAppearance={removeAppearanceById}
          openAddPopup={handleOpenAddPopup}
        />
      </Modal>
      <Modal isOpen={open && !isAlreadyAppeared} style={modalStyle}>
        <AddAppearedPopup close={setOpen} questionId={questionId} />
      </Modal>
      <AppearedDiv onClick={() => setOpen(true)}>
        Appeared ({appearedCount})
      </AppearedDiv>
    </>
  );
};

export default Appeared;
