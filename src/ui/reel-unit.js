import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Frame } from "../design";
import Reel from "./reel";
import { getIsSpinning, getLevel } from "../selectors";

const ReelUnit = () => {
  const [focus, setFocus] = useState(0);
  const [timerId, setTimerId] = useState("");
  const isSpinning = useSelector(getIsSpinning);
  const level = useSelector(getLevel);
  const keys = ["alpha", "beta", "charlie"];

  useEffect(() => {
    if (isSpinning) {
      const id = setInterval(() => {
        setFocus(f => (f + 1) % 3);
      }, 150);
      setTimerId(id);
    } else {
      clearInterval(timerId);
    }
  }, [isSpinning]);

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
