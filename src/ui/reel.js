import React from 'react';
import styled from "styled-components";
import Face from './face';
import { pat, question } from '../faces';

const Container = styled.div`
  border: 2px solid black;
  background-color: pink;
  border-radius: 1.5vmin;
  padding: 0.8vmin;
  display: grid;
  place-items: center;

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
      <Container key={id}>
        <Img src={face} />
      </Container>
    )
  }

  return (
    <Container
      key={id}
      onClick={() => console.log("window clicked", id)}
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
