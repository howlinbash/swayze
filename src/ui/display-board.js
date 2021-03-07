import React from "react";
import styled from "styled-components";

const Board = styled.div`
  border: 2px solid black;
  background-color: lightblue;
  border-radius: 1.5vmin;
  height: 5vmin;
  padding: 0.8vmin;
  display: grid;
  place-items: center;
`;

const Message = styled.div`
  font-size: 4vmin;
  font-family: impact;
`;

const DisplayBoard = ({ answer, attempt, gameOver, isSpinning, jeff, round }) => {
  const message = "SPIN THE WHEEL"
  return (
    <Board>
      <Message>
        {jeff ? "TRIPLE JEFF - OHMIGOD!" : message}
      </Message>
    </Board>
  );
};

export default DisplayBoard;
