import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Frame } from "../design";
import { getMessage } from "../selectors";

const Message = styled.div`
  font-size: 4vmin;
  font-family: impact;
`;

const DisplayBoard = () => {
  const message = useSelector(getMessage);

  return (
    <Frame border="black" center color="lightblue" h="5vmin" pd="0.8vmin">
      <Message>{message}</Message>
    </Frame>
  );
};

export default DisplayBoard;
