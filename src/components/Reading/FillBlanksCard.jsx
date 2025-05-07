import React, { useState, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import {
  FillingWordsOuterDiv,
  FillingWordsMainDiv,
  FillingWordsParagraphText,
  FillingWordsMainDiv2,
  FillingWordsText,
  FillingWordsBlankBox,
  FillingWordsWordBox,
} from "./Style";

const FillBlanksCard = ({ textValue, fillingWords, setSelectedAnswers }) => {
  const placeholderPattern = /#~#~#/g;
  const textSegments = textValue.split(placeholderPattern);
  const [availableFillingWords, setAvailableFillingWords] =
    useState(fillingWords);
  const [filledWords, setFilledWords] = useState(
    Array(textSegments.length - 1).fill(null)
  );

  useEffect(() => {
    setAvailableFillingWords(fillingWords);
  }, [fillingWords]);

  useEffect(() => {
    setSelectedAnswers(filledWords.filter((word) => word !== null));
  }, [filledWords, setSelectedAnswers]);

  const moveWord = (word, fromIndex, toIndex) => {
    let newAvailableWords = [...availableFillingWords];
    let newFilledWords = [...filledWords];

    if (fromIndex === toIndex) {
      return;
    }

    if (fromIndex !== null && toIndex !== null) {
      if (newFilledWords[toIndex] && newFilledWords[toIndex] !== word) {
        newAvailableWords.push(newFilledWords[toIndex]);
      }
      newFilledWords[toIndex] = word;
      newFilledWords[fromIndex] = null;
    } else if (fromIndex !== null && toIndex === null) {
      newAvailableWords.push(word);
      newFilledWords[fromIndex] = null;
    } else if (fromIndex === null && toIndex !== null) {
      if (newFilledWords[toIndex]) {
        newAvailableWords.push(newFilledWords[toIndex]);
      }
      newFilledWords[toIndex] = word;
      newAvailableWords = newAvailableWords.filter((w) => w !== word);
    }

    setFilledWords(newFilledWords);
    setAvailableFillingWords(newAvailableWords);
  };

  const BlankBox = ({ index }) => {
    const [{ isOver }, drop] = useDrop({
      accept: "word",
      drop: (item, monitor) => moveWord(item.word, item.fromIndex, index),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    });

    const filledWord = filledWords[index];
    const [{ isDragging }, drag, preview] = useDrag({
      type: "word",
      item: { type: "word", word: filledWord, fromIndex: index },
      canDrag: () => !!filledWord,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
      end: (item, monitor) => {
        if (!monitor.didDrop()) {
          moveWord(item.word, index, null);
        }
      },
    });

    const attachDrag = filledWord ? drag : (node) => node;
    const attachDrop = drop;

    return (
      <FillingWordsBlankBox
        ref={(node) => {
          attachDrag(node);
          attachDrop(node);
        }}
        style={{ opacity: isDragging ? 0.5 : 1 }}
        isDragging={isDragging}
      >
        {filledWord}
      </FillingWordsBlankBox>
    );
  };

  const WordBox = ({ word }) => {
    const [{ isDragging }, drag] = useDrag({
      type: "word",
      item: { word, fromIndex: null },
      end: (item, monitor) => {
        if (!monitor.didDrop()) {
          moveWord(item.word, null, null);
        }
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    });

    return (
      <FillingWordsWordBox ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}    isDragging={isDragging}>
        {word}
      </FillingWordsWordBox>
    );
  };

  return (
    <FillingWordsOuterDiv>
      <FillingWordsMainDiv>
        <FillingWordsParagraphText>
          {textSegments.map((segment, index) => (
            <React.Fragment key={index}>
              {segment}
              {index < textSegments.length - 1 && <BlankBox index={index}/>}
            </React.Fragment>
          ))}
        </FillingWordsParagraphText>
      </FillingWordsMainDiv>
      <FillingWordsMainDiv2>
        <FillingWordsText>
          {availableFillingWords.map((word, index) => (
            <WordBox key={index} word={word} />
          ))}
        </FillingWordsText>
      </FillingWordsMainDiv2>
    </FillingWordsOuterDiv>
  );
};

export default FillBlanksCard;
