import React from "react";
import { useSelector } from "react-redux";
import styled, { css, keyframes } from "styled-components";
import { Frame } from "../design";
import { getIsNotStarted } from "../selectors";

const hint = keyframes`
  0% {
    background-color: brown;
  }
  50% {
    background-color: lightblue;
  }
  100% {
    background-color: brown;
  }
`;

const Container = styled(Frame)`
  background-color: brown;
  :hover {
    border: 2px solid black;
    background-color: lightblue;
  }

  :active {
    border: 2px solid darkgrey;
    background-color: brown;
  }
  ${({ isNotStarted }) => isNotStarted && css`animation: ${hint} 2s ease-in 3s`};
`;

const Title = styled.div`
  color: gold;
  text-shadow: -0.8vmin 0 black, 0 0.8vmin black, 0.8vmin 0 black,
    0 -0.8vmin black;
  font-size: 14.5vmin;
  font-family: impact;
`;

const Marquee = ({ onClick }) => {
  const isNotStarted = useSelector(getIsNotStarted);
  return (
    <Container
      border="darkgrey"
      center
      isNotStarted={isNotStarted}
      onClick={onClick}
    >
      <Title>SPLAT-A-PAT</Title>
    </Container>
  );
};

export default Marquee;
