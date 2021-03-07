import React from "react";
import styled from "styled-components";
import { Frame } from "../design";

const Message = styled.div`
  font-size: 4vmin;
  font-family: impact;
`;

const DisplayBoard = ({ answer, attempt, gameOver, isSpinning, jeff, round }) => {
  const message = "SPIN THE WHEEL"
  return (
    <Frame border="black" center color="lightblue" h="5vmin" pd="0.8vmin">
      <Message>
        {jeff ? "TRIPLE JEFF - OHMIGOD!" : message}
      </Message>
    </Frame>
  );
};

export default DisplayBoard;
