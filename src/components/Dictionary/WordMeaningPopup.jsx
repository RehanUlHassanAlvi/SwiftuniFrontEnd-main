import React, { useState, useEffect } from "react";
import BackIcon from "../../assets/images/back-icon.svg";
import SpeakerIcon from "../../assets/images/fluent_speaker.svg";
import { FlexDiv } from "../../assets/styles/style";
import {
  Image,
  SingleWord,
  PopupWhiteDiv,
  Known,
  SmallCardHeader,
  SmallCardContent,
  SmallCard,
  SmallCardHeaderText,
} from "./style";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Base_URL } from "../../Client/apiURL";
const synth = window.speechSynthesis;

const WordMeaningPopup = ({
  close,
  word = "",
  wordId = null,
  definition,
  examples,
  setIsUpdated,
}) => {
  const isMiniTab = useMediaQuery("(max-width:650px)");
  const voices = synth.getVoices();
  const [isAdded, setIsAdded] = useState(false);

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [utterance, setUtterance] = useState(null);

  useEffect(() => {
    const speechUtterance = new SpeechSynthesisUtterance();
    for (let i = 0; i < voices.length; i++) speechUtterance.voice = voices[107];
    for (let i = 0; i < voices.length; i++) {
      const option = document.createElement("option");
      option.textContent = `${voices[i].name} (${voices[i].lang})`;

      if (voices[i].default) {
        option.textContent += " — DEFAULT";
      }

      option.setAttribute("data-lang", voices[i].lang);
      option.setAttribute("data-name", voices[i].name);
    }
    speechUtterance.onend = () => setIsSpeaking(false);
    speechUtterance.onerror = (event) => {
      console.error("SpeechSynthesisUtterance error:", event.error);
      setIsSpeaking(false);
    };
    setUtterance(speechUtterance);
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const toggleSpeech = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      utterance.text = word;
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const AddToVocab = async () => {
    try {
      const response = await fetch(
        `${Base_URL}/app/users/vocab/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: word,
            description: "Word Description",
          }),
          credentials: "include",
        }
      );
      const data = await response.json();

      if (data.responseCode === 200) {
        // fetchNote();
        console.log(data.message || "Vocab Added Successfully");
        setIsAdded(true);
      }
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const updateVocab = async (wordId, type) => {
    try {
      const response = await fetch(
        `${Base_URL}/app/users/vocab/update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            vocab_bank_id: wordId,
            type: type,
          }),
          credentials: "include",
        }
      );
      const data = await response.json();

      if (data.responseCode === 200) {
        // fetchNote();
        console.log(data.message || "Vocab Added Successfully");
        setIsUpdated(true);
      }
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  return (
    <>
      <PopupWhiteDiv id="scorecard">
        <FlexDiv style={{ width: "100%", justifyContent: "space-between" }}>
          <FlexDiv style={{ gap: "0.5rem" }}>
            <Image
              src={BackIcon}
              alt="Back Icon"
              onClick={() => close(false)}
            />
            <SingleWord>{word}</SingleWord>
            <Image
              src={SpeakerIcon}
              alt="Speaker Icon"
              onClick={toggleSpeech}
            />
          </FlexDiv>
          <FlexDiv style={{ gap: "0.38rem" }}>
            {wordId ? (
              <>
                <Known
                  color={"#008000"}
                  onClick={() => updateVocab(wordId, "known")}
                >
                  Known
                </Known>
                <Known
                  color={"#333333"}
                  onClick={() => updateVocab(wordId, "unknown")}
                >
                  Unknown
                </Known>
              </>
            ) : (
              <>
                {" "}
                <Known color={"#008000"} onClick={AddToVocab} isAdded={isAdded}>
                  {isAdded ? "Added" : "Add to Vocab"}
                </Known>
              </>
            )}
          </FlexDiv>
        </FlexDiv>

        <FlexDiv
          style={{
            flexDirection: isMiniTab ? "column" : "row",
            width: "100%",
            gap: "1.25rem",
          }}
        >
          <SmallCard>
            <SmallCardHeader>
              <SmallCardHeaderText>Definition</SmallCardHeaderText>
            </SmallCardHeader>
            <SmallCardContent>
              {definition.length ? (
                <ol>
                  {definition.map((definition, index) => (
                    <li key={index}>{definition}</li>
                  ))}
                </ol>
              ) : (
                <FlexDiv style={{ marginTop: "1rem" }}>
                  No definition found
                </FlexDiv>
              )}
            </SmallCardContent>
          </SmallCard>

          <SmallCard>
            <SmallCardHeader>
              <SmallCardHeaderText>Examples</SmallCardHeaderText>
            </SmallCardHeader>
            <SmallCardContent>
              {examples.length ? (
                <ol>
                  {examples.map((example, index) => (
                    <li key={index}>{example}</li>
                  ))}
                </ol>
              ) : (
                <FlexDiv style={{ marginTop: "1rem" }}>
                  No examples found
                </FlexDiv>
              )}
            </SmallCardContent>
          </SmallCard>
        </FlexDiv>
      </PopupWhiteDiv>
    </>
  );
};

export default WordMeaningPopup;
