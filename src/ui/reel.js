import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Frame } from "../design";
import faces, { question } from "../faces";
import { peek } from "../events";
import { getIsRevealed } from "../selectors";

const Container = styled(Frame)`
  position relative;
  :active {
    border: 2px solid black;
    background-color: lightblue;
  }
`;
const Div = styled.div`
  position absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: grid;
  place-items: center;
`;

const Img = styled.img`
  max-height: 100%;
  width: 100%;
  object-fit: contain;
  ${({ hide }) => hide && "opacity: 0"};
`;

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
      <Div>
        <Img
          id={id}
          hide={isSpinning || isRevealed}
          src={question}
        />
      </Div>
      <Div>
        <Img
          id={id}
          hide={!isSpinning || !focus}
          src={faces[0]}
        />
      </Div>
      <Div>
        <Img
          id={id}
          hide={!isRevealed}
          src={faces[face]}
        />
      </Div>
    </Container>
  );
};

export default Reel;
