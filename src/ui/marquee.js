import React from 'react';
import styled from "styled-components";

const Container = styled.div`
  border: 2px solid darkgrey;
  background-color: brown;
  border-radius: 1.5vmin;
  display: grid;
  place-items: center;

  :hover {
    border: 2px solid black;
    background-color: lightblue;
  }

  :active {
    border: 2px solid darkgrey;
    background-color: brown;
  }
`;

const Title = styled.div`
  color: gold;
  text-shadow: -0.8vmin 0 black, 0 0.8vmin black, 0.8vmin 0 black, 0 -0.8vmin black;
  font-size: 14.5vmin;
  font-family: impact;
`;

const Marquee = ({ onClick }) => (
  <Container onClick={onClick} >
    <Title>SPLAT-A-PAT</Title>
  </Container>
);

export default Marquee;
