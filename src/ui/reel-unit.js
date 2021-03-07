import React from "react";
import { Frame } from "../design";
import Reel from "./reel";

const ReelUnit = ({ answer, requestStartSpin, faces }) => {
  const focus = "";
  const isSpinning = false;
  const windows = [
    {id: "alpha"},
    {id: "beta"},
    {id: "charlie"}
  ];

  return (
    <Frame border="gold" color="brown" gtc="1fr 1fr 1fr" pd="1.5vmin">
      {windows.map(({id}) => (
        <Reel
          answer={answer}
          face={faces[id]}
          focus={focus}
          id={id}
          isSpinning={isSpinning}
          key={id}
        />
      ))}
    </Frame>
  );
};

export default ReelUnit;
