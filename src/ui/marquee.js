import React from "react";
import styled from "styled-components";
import { Frame } from "../design";

const Container = styled(Frame)`
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
  <Container border="darkgrey" center color="brown" onClick={onClick}>
    <Title>SPLAT-A-PAT</Title>
  </Container>
);

export default Marquee;
