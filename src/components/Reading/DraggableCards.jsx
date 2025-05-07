import { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import {
  DraggableStyledCard,
  DraggableCardText,
  StyledCardContent,
} from "./Style";

const DraggableCard = ({ id, text, index, moveCard, originalIndex }) => {
  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: "CARD",
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (
        (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) ||
        (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)
      ) {
        return;
      }

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: () => {
      return { id, index };
    },
    end: () => {
    
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <DraggableStyledCard
      ref={ref}
      isDragging={isDragging}
      style={{
        transform: isDragging ? "scale(1.01)" : "scale(1)",
        transition: "transform 0.2s ease, border-color 0.2s ease",
        cursor: isDragging ? "grabbing" : "grab",
      }}
      data-handler-id={handlerId}
    >
      <StyledCardContent>
        {`${originalIndex + 1})`}
        <DraggableCardText>{text}</DraggableCardText>
      </StyledCardContent>
    </DraggableStyledCard>
  );
};

export default DraggableCard;