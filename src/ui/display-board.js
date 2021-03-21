import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Frame } from "../design";
import { getMessage } from "../selectors";

const Message = styled.div`
  font-family: impact;
  font-size: 4vmin;
  @media (orientation: portrait) {
    font-size: 6vmin;
  }
`;

const DisplayBoard = () => {
  const message = useSelector(getMessage);

  return (
    <Frame border="black" center color="lightblue" pd="0.8vmin">
      <Message>{message}</Message>
    </Frame>
  );
};

export default DisplayBoard;
