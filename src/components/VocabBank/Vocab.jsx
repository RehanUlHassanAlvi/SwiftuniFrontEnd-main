import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import { Btn, FlexDiv } from "../../assets/styles/style";
import SeperatingHeader from "../Common/SeperatingHeader";
import {
  DeleteBtn,
  DeleteImg,
  Input,
  InputDiv,
  KnownUnknown,
  OptionText,
  PronounceBtn,
  VocabDiv,
  VocabText,
  WhiteDiv,
  WhiteDivText,
} from "./Style";
import Magnify from "../../assets/images/magnify.svg";
import DeleteRed from "../../assets/images/delete-red.svg";
import SpeakerIcon from "../../assets/images/fluent_speaker-2.svg";
import { Options } from "./data";
import WordMeaningPopup from "../Dictionary/WordMeaningPopup";
import Modal from "react-modal";
import LoadingModal from "../Common/LoadingModal";
import { Base_URL } from "../../Client/apiURL";
const synth = window.speechSynthesis;

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

const Vocab = () => {
  const isTab = useMediaQuery("(max-width:1000px)");
  const [selectedOption, setSelectedOption] = useState("All");
  const [vocabData, setVocabData] = useState([]);
  const [wordId, setWordId] = useState(null);
  const [open, setOpen] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState([]);
  const [examples, setExamples] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [utterance, setUtterance] = useState(null);
  const voices = synth.getVoices();

  useEffect(() => {
    const getVocab = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${Base_URL}/app/users/vocab`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const data = await response.json();

        if (data.responseCode === 200 && data.response) {
          setVocabData(data.response);
          // setIsUpdated(false);
        } else if (data.responseCode === 300) {
          setVocabData([]);
        }
      } catch (error) {
        console.error("Error fetching vocabs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getVocab();
  }, []);

  useEffect(() => {
    const getVocab = async () => {
      try {
        const response = await fetch(
          `${Base_URL}/app/users/vocab`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const data = await response.json();

        if (data.responseCode === 200 && data.response) {
          setVocabData(data.response);
          setIsUpdated(false);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching vocabs:", error);
      }
    };
    if (isUpdated) {
      getVocab();
    }
  }, [isUpdated]);

  const handleDelete = async (vocabId) => {
    try {
      const response = await fetch(
        `${Base_URL}/app/users/vocab/delete?vocab_bank_id=${vocabId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();

      if (data.responseCode === 200) {
        setVocabData((prevData) =>
          prevData.filter((vocab) => vocab.Id !== vocabId)
        );
      } else {
        console.error("Error deleting vocab:", data.message);
      }
    } catch (error) {
      console.error("Error deleting vocab:", error);
    }
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

  const handleVocabClick = async (vocab) => {
    setDefinition([]);
    setExamples([]);
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${vocab.Name}`
      );
      const data = await response.json();
      const wordData = data[0];
      const defs = wordData.meanings.map(meaning => meaning.definitions.map(def => def.definition)).flat();
      const exs = wordData.meanings.map(meaning => meaning.definitions.map(def => def.example)).flat().filter(ex => ex != null);
      setDefinition(defs);
      setExamples(exs);
      setWord(vocab.Name);
      setWordId(vocab.Id);
      setOpen(true);
    } catch (error) {
      console.error("Error fetching the word data", error);
      setDefinition([]);
      setExamples([]);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredVocabData =
    selectedOption === "All"
      ? vocabData.filter((vocab) =>
          vocab.Name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : vocabData.filter(
          (vocab) =>
            vocab.Type === selectedOption.toLowerCase() &&
            vocab.Name.toLowerCase().includes(searchQuery.toLowerCase())
        );

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

  const toggleSpeech = (word) => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      utterance.text = word;
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  return (
    <>
      {open && (
        <Modal isOpen={open} style={modalStyle}>
          <WordMeaningPopup
            close={setOpen}
            word={word}
            wordId={wordId}
            definition={definition}
            examples={examples}
            setIsUpdated={setIsUpdated}
          />
        </Modal>
      )}

      <FlexDiv style={{ width: "100%" }}>
        <FlexDiv
          style={{
            flexDirection: "column",
            padding: isTab ? "1.5rem 2% 0rem" : "6.5rem 3% 0rem",
            maxWidth: "1680px",
            width: "100%",
          }}
        >
          <SeperatingHeader title="Vocab Bank" />
          <FlexDiv
            style={{
              justifyContent: "space-between",
              width: "100%",
              marginBottom: "1.63rem",
            }}
          >
            <FlexDiv style={{ gap: isTab ? "1rem" : "2rem" }}>
              {Options.map((option) => (
                <Btn
                  key={option.id}
                  onClick={() => {
                    setSelectedOption(option.text);
                  }}
                >
                  <OptionText
                    style={{
                      color:
                        option.text === selectedOption
                          ? "var(--Brand-Purple, #996CFE)"
                          : "",
                      borderBottom:
                        option.text === selectedOption
                          ? "1px solid var(--Brand-Purple, #996CFE)"
                          : "",
                    }}
                  >
                    {option.text}
                  </OptionText>
                </Btn>
              ))}
            </FlexDiv>
            <InputDiv>
              <Input placeholder="Search" onChange={handleSearch} />
              <img alt="" src={Magnify} />
            </InputDiv>
          </FlexDiv>
          <WhiteDiv style={{ alignItems: "flex-start", gap: "0.5rem" }}>
            {isLoading ? (
              <LoadingModal />
            ) : (
              <>
                {vocabData.length === 0 ? (
                  <>
                    <FlexDiv
                      style={{
                        alignSelf: "center",
                        flexDirection: "column",
                        justifySelf: "center",
                      }}
                    >
                      <WhiteDivText>Record Not Found</WhiteDivText>
                      <WhiteDivText>
                        Watch How to use the Vocab Bank Function
                      </WhiteDivText>
                    </FlexDiv>
                  </>
                ) : (
                  <>
                    <FlexDiv
                      style={{
                        width: "100%",
                        flexDirection: "column",
                        gap: "1.25rem",
                      }}
                    >
                      {filteredVocabData.map((vocab, index) => (
                        <VocabDiv
                          key={vocab.id}
                          onClick={() => handleVocabClick(vocab)}
                        >
                          <FlexDiv style={{ marginLeft: "1rem" }}>
                            <VocabText color={"#996CFE"}>
                              {index + 1}.
                            </VocabText>
                            <VocabText
                              style={{
                                marginLeft: "0.75rem",
                                minWidth: "7rem",
                              }}
                            >
                              {vocab.Name}
                            </VocabText>
                            {vocab.Type !== null && (
                              <>
                                {vocab.Type === "known" && (
                                  <KnownUnknown>Known</KnownUnknown>
                                )}
                                {vocab.Type === "unknown" && (
                                  <KnownUnknown bg={"#FF5D5D"}>
                                    Unknown
                                  </KnownUnknown>
                                )}
                              </>
                            )}
                          </FlexDiv>
                          <FlexDiv
                            style={{ marginRight: "1rem" }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <PronounceBtn
                              src={SpeakerIcon}
                              alt="Pronounce"
                              onClick={() => toggleSpeech(vocab.Name)}
                            />
                            <DeleteBtn
                              src={DeleteRed}
                              alt="Delete"
                              onClick={() => handleDelete(vocab.Id)}
                            />
                          </FlexDiv>
                        </VocabDiv>
                      ))}
                    </FlexDiv>
                  </>
                )}
              </>
            )}
          </WhiteDiv>
        </FlexDiv>
      </FlexDiv>
    </>
  );
};

export default Vocab;
