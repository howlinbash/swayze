import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Frame } from "../design";
import Reel from "./reel";
import { getIsSpinning } from "../selectors";

const ReelUnit = ({ answer, requestStartSpin, faces }) => {
  const [focus, setFocus] = useState(0);
  const [timerId, setTimerId] = useState("");
  const isSpinning = useSelector(getIsSpinning);
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
      {faces.map((face, index) => (
        <Reel
          answer={answer}
          face={face}
          focus={focus}
          id={index}
          isSpinning={isSpinning}
          key={keys[index]}
        />
      ))}
    </Frame>
  );
};

export default ReelUnit;
