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
  max-height: 100%;
  width: 100%;
  object-fit: contain;
  margin: -4vmin;
  // will-change: opacity;
  ${({ hide }) => hide && "opacity: 0"};
`;

const imgSwitch = (face, focus, isSpinning, isRevealed) => {
  if (isSpinning) {
    return focus ? faces[0] : undefined;
  }
  return isRevealed ? faces[face] : question;
};

const Reel = ({ face, focus, id, isSpinning }) => {
  const isRevealed = useSelector((state) => getIsRevealed(state, id));

  return (
    <Container
      border="black"
      center
      color="pink"
      key={id}
      onClick={peek(id)}
      pd="0.8vmin"
    >
      <Img
        id={id}
        hide={isSpinning && !focus}
        src={imgSwitch(face, focus, isSpinning, isRevealed)}
      />
    </Container>
  );
};

export default Reel;
