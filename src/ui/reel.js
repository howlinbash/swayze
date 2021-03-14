import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Frame } from "../design";
import faces, { question } from "../faces";
import { peek } from "../events";
import { getIsRevealed } from "../selectors";

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
  const isRevealed = useSelector(state => getIsRevealed(state, id));

  return (
    <Container
      border="black"
      center
      color="pink"
      key={id}
      onClick={peek(id)}
      pd="0.8vmin"
    >
      {isSpinning ? (
        focus === id && <Img src={faces[0]} />
      ) : (
        <Img src={isRevealed ? faces[face] : question} id={id} />
      )}
    </Container>
  )
};

export default Reel;
