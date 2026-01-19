import { useState, useRef } from "react";
import "../styles/balloon.css";

const MAX = 20;

const bgColors = [
  "#ffffff",
  "#fff4f8",
  "#f0fff4",
  "#f7f7ff",
  "#fffbe6",
  "#f3f8ff",
  "#fdeff4",
  "#eef7ff",
  "#fef6e4",
  "#f1f5f9",
  "#f5f3ff",
  "#fff0f3",
];

const balloonColors = [
  "#6fdc00",
  "#ff6f91",
  "#ffcc00",
  "#4dd0e1",
  "#a78bfa",
  "#ff8fab",
  "#ff9f1c",
  "#2ec4b6",
  "#e71d36",
  "#8338ec",
  "#3a86ff",
  "#ffd166",
];

function getRandom(arr, current) {
  let next;
  do {
    next = arr[Math.floor(Math.random() * arr.length)];
  } while (next === current);
  return next;
}

export default function BalloonScreen({ onFinish }) {
  const [count, setCount] = useState(1);
  const [key, setKey] = useState(0);
  const [bg, setBg] = useState(bgColors[0]);
  const [balloonColor, setBalloonColor] = useState(balloonColors[0]);
  const [showHint, setShowHint] = useState(true);

  const popSound = useRef(null);

  const popBalloon = () => {
    if (showHint) setShowHint(false);

    if (popSound.current) {
      popSound.current.currentTime = 0;
      popSound.current.play();
    }

    if (count >= MAX) {
      setTimeout(onFinish, 500);
      return;
    }

    setCount(c => c + 1);
    setKey(k => k + 1);
    setBg(prev => getRandom(bgColors, prev));
    setBalloonColor(prev => getRandom(balloonColors, prev));
  };

  return (
    <div
      className="balloon-stage"
      style={{ backgroundColor: bg }}
    >
      <audio ref={popSound} src="/pop1.mp3" preload="auto" />

      {showHint && (
        <div className="balloon-hint">
          Pop the balloon 🎈
        </div>
      )}

      <div
        key={key}
        className="balloon"
        style={{ backgroundColor: balloonColor }}
        onClick={popBalloon}
      >
        <span>{count}</span>
        <div
          className="string"
          style={{ backgroundColor: balloonColor }}
        />
      </div>
    </div>
  );
}
