import React from "react";
import styled from "styled-components";
import { spin } from "../events";
import { Frame } from "../design";
import Marquee from "./marquee";
import DisplayBoard from "./display-board";
import ReelUnit from "./reel-unit";

const Wallpaper = styled.div`
  display: grid;
  place-items: center;
  min-height: 100vh;
  background-color: #282c34;
`;

const Container = styled(Frame)`
  width: 80vmin;
  height: 65vmin;
  @media (orientation: portrait) {
    width: 90vmin;
    height: 80vmin;
  }
`;

const Layout = () => (
  <Wallpaper>
    <Container color="green" gtr="1fr 2fr" pd="1.5vmin">
      <Marquee onClick={spin()} />
      <Frame border="darkgrey" color="purple" gtr="auto 1fr" pd="1.5vmin">
        <DisplayBoard />
        <ReelUnit />
      </Frame>
    </Container>
  </Wallpaper>
);

export default Layout;
