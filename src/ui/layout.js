import React from "react";
import styled from "styled-components";
import Marquee from "./marquee";
import DisplayBoard from "./display-board";
import ReelUnit from "./reel-unit";
import rules from "../rules";

const Wallpaper = styled.div`
  display: grid;
  place-items: center;
  min-height: 100vh;
  background-color: #282c34;
`;

const Console = styled.div`
  background-color: green;
  border-radius: 1.5vmin;
  height: 65vmin;
  width: 80vmin;
  padding: 1.5vmin;
  display: grid;
  grid-template-rows: 1fr 2fr;
  grid-gap: 1.5vmin;
`;

const MainGlass = styled.div`
  border: 2px solid darkgrey;
  background-color: purple;
  border-radius: 1.5vmin;
  padding: 1.5vmin;
  display: grid;
  grid-template-rows: auto 1fr;
  grid-gap: 1.5vmin;
`;

const Layout = () => {
  return (
      <Wallpaper>
        <Console>
          <Marquee onClick={() => console.log("marquee clicked")} />
          <MainGlass>
            <DisplayBoard
              answer={null}
              attempt={0}
              gameOver={true}
              isSpinning={false}
              jeff={false}
              round={0}
            />
            <ReelUnit
              answer={null}
              requestStartSpin={false}
              faces={rules[0]}
            />
          </MainGlass>
        </Console>
      </Wallpaper>
  );
}

export default Layout;
