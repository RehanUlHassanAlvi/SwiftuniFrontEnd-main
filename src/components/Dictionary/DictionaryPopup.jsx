import React, { useState, useEffect } from "react";
import { PopupHeaderText, PopupWhiteDiv } from "../notes/style";
import CancelIcon from "../../assets/images/carbon_close-filled.svg";
import { FlexDiv } from "../../assets/styles/style";
import { PopupHeader, PopupTitleText, PopupText } from "./style";
import Modal from "react-modal";
import WordMeaningPopup from "./WordMeaningPopup";

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

const DictionaryPopup = ({ close, paragraphText, arrayText }) => {
  const [open, setOpen] = useState(false);
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState([]);
  const [examples, setExamples] = useState([]);

  const handleWordClick = async (word) => {
    const cleanedWord = word.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
    setWord(cleanedWord);
    setDefinition([]);
    setExamples([]);

    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${cleanedWord}`
      );
      const data = await response.json();
      const wordData = data[0];
      // const def = wordData.meanings[0]?.definitions[0]?.definition;
      // const exs = wordData.meanings[0]?.definitions[0]?.example;
      
      const defs = wordData.meanings.map(meaning => meaning.definitions.map(def => def.definition)).flat();
      const exs = wordData.meanings.map(meaning => meaning.definitions.map(def => def.example)).flat().filter(ex => ex != null);

      // setDefinition(def ? [def] : []);
      // setExamples(exs ? [exs] : []);
      setDefinition(defs);
      setExamples(exs);
      setOpen(true);
    } catch (error) {
      console.error("Error fetching the word data", error);
      setDefinition([]);
      setExamples([]);
    }
  };

  const renderTextWithHover = (text) => {
    if (Array.isArray(text)) {
      return (
        <ul style={{ textAlign: "left" }}>
          <PopupTitleText style={{ marginTop: "0rem" }}>
            Options:{" "}
          </PopupTitleText>
          {text.map((item, index) => (
            <li key={index}>{renderTextWithHover(item)}</li>
          ))}
        </ul>
      );
    }

    return text.split(" ").map((word, index) => (
      <span
        key={index}
        style={{
          cursor: "pointer",
          backgroundColor: word === "" ? "transparent" : "inherit",
        }}
        onClick={() => handleWordClick(word)}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#996CFE")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
      >
        {word}{" "}
      </span>
    ));
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const scorecardElement = document.getElementById("scorecard");
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
      {open && (
        <Modal isOpen={open} style={modalStyle}>
          <WordMeaningPopup
            close={setOpen}
            word={word}
            definition={definition}
            examples={examples}
          />
        </Modal>
      )}
      <div id="">
        <PopupHeader>
          <FlexDiv style={{ width: "95%", justifyContent: "flex-end" }}>
            <img
              src={CancelIcon}
              alt=""
              style={{ width: "20px", height: "20px", cursor: "pointer" }}
              onClick={() => close(false)}
            />
          </FlexDiv>
          <PopupHeaderText>Dictionary</PopupHeaderText>
        </PopupHeader>
        <PopupWhiteDiv>
          <PopupTitleText>Click words to check dictionary</PopupTitleText>
          <PopupText>
            {paragraphText && renderTextWithHover(paragraphText)}
            {arrayText && renderTextWithHover(arrayText)}
          </PopupText>
        </PopupWhiteDiv>
      </div>
    </>
  );
};

export default DictionaryPopup;
