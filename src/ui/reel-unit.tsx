import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useInterval } from "../hooks";
import { Frame } from "../design";
import Reel from "./reel";
import { getIsSpinning, getLevel } from "../selectors";

const ReelUnit = () => {
  const [focus, setFocus] = useState(0);
  const isSpinning = useSelector(getIsSpinning);
  const level = useSelector(getLevel);
  const keys = ["alpha", "beta", "charlie"];

  useInterval(() => {
    setFocus((f) => (f + 1) % 3);
  }, isSpinning ? 120 : null);

  useEffect(() => {
    if (focus && !isSpinning) setFocus(0);
  }, [isSpinning, focus]);

  return (
    <Frame border="gold" color="brown" gtc="1fr 1fr 1fr" pd="1.5vmin">
      {level.map((face, index) => (
        <Reel
          face={face}
          focus={focus === index}
          id={index}
          isSpinning={isSpinning}
          key={keys[index]}
        />
      ))}
    </Frame>
  );
};

export default ReelUnit;
