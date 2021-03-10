import React from "react";
import styled from "styled-components";
import { Frame } from "../design";
import Face from "./face";
import { pat, question } from "../faces";
import { peek } from "../events";

const Container = styled(Frame)`
  :active {
    border: 2px solid black;
    background-color: lightblue;
  }
`;

const Img = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
  margin: -4vmin;
`;

const Reel = ({ face, focus, id, isSpinning }) => {
  const guessMade = false;

  if (guessMade) {
    return (
      <Container border="black" center color="pink" key={id} pd="0.8vmin">
        <Img src={face} />
      </Container>
    )
  }

  return (
    <Container
      border="black"
      center
      color="pink"
      key={id}
      onClick={peek(id)}
      pd="0.8vmin"
    >
      {isSpinning && !guessMade ? (
        focus === id ? <Face face={pat} id={id} /> : null
      ) : (
        <Img src={question} />
      )}
    </Container>
  )
};

export default Reel;
