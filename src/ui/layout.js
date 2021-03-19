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

const Layout = () => (
  <Wallpaper>
    <Frame color="green" gtr="1fr 2fr" h="65vmin" pd="1.5vmin" w="80vmin">
      <Marquee onClick={spin()} />
      <Frame border="darkgrey" color="purple" gtr="auto 1fr" pd="1.5vmin">
        <DisplayBoard />
        <ReelUnit />
      </Frame>
    </Frame>
  </Wallpaper>
);

export default Layout;
