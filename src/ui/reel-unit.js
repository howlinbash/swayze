import React from "react";
import { Frame } from "../design";
import Reel from "./reel";

const ReelUnit = ({ answer, requestStartSpin, faces }) => {
const focus = "";
  const isSpinning = false;

  return (
    <Frame border="gold" color="brown" gtc="1fr 1fr 1fr" pd="1.5vmin">
      {faces.map((face, index) => (
        <Reel
          answer={answer}
          face={face}
          focus={focus}
          id={index}
          isSpinning={isSpinning}
          key={face}
        />
      ))}
    </Frame>
  );
};

export default ReelUnit;
