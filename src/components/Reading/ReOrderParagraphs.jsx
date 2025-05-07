import React, { useState, useEffect, useCallback } from "react";
import DraggableCard from "./DraggableCards";
import { ROPmainDiv } from "./Style";

const ReOrderParagraphs = ({ OptionNames, setUserOrder, triggerReset = false }) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (OptionNames) {
      const optionNamesWithIds = OptionNames.map((text, index) => ({
        id: `option-${index}`,
        text: text,
        originalIndex: index,
      }));
      setCards(optionNamesWithIds);
    }
  }, [OptionNames]);

  useEffect(() => {
    setCards(
      OptionNames.map((text, index) => ({
        id: `option-${index}`,
        text: text,
        originalIndex: index,
      }))
    );
    setUserOrder([]);
  }, [triggerReset, OptionNames, setUserOrder]);

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = cards[dragIndex];
      const newCards = [...cards];
      newCards.splice(dragIndex, 1);
      newCards.splice(hoverIndex, 0, dragCard);
      setCards(newCards);
    },
    [cards]
  );

  useEffect(() => {
    const newUserOrder = cards.map((card) => OptionNames.indexOf(card.text));
    setUserOrder(newUserOrder);
  }, [cards, OptionNames, setUserOrder]);

  return (
    <ROPmainDiv>
      {cards.map((card, index) => (
        <div key={card.id}>
          <DraggableCard
            id={card.id}
            text={card.text}
            index={index}
            moveCard={moveCard}
            originalIndex={card.originalIndex}
          />
        </div>
      ))}
    </ROPmainDiv>
  );
};

export default ReOrderParagraphs;