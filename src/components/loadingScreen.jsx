import { useEffect, useState } from "react";
import "../styles/loading.css";

const lines = [
  "Blowing balloons",
  "Decorating room with balloons",
  "Unboxing cake",
  "Placing candles on the cake",
  "(~￣³￣)~ (~￣³￣)~ (~￣³￣)~ (~￣³￣)~"
];

export default function LoadingScreen({ onFinish }) {
  const [text, setText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (lineIndex >= lines.length) {
      setTimeout(onFinish, 1000);
      return;
    }

    if (charIndex < lines[lineIndex].length) {
      const timeout = setTimeout(() => {
        setText(prev => prev + lines[lineIndex][charIndex]);
        setCharIndex(charIndex + 1);
      }, 80);

      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => {
        setText(prev => prev + "\n");
        setLineIndex(lineIndex + 1);
        setCharIndex(0);
      }, 600);
    }
  }, [charIndex, lineIndex]);

  return (
    <div className="loading">
      <pre>{text}</pre>
    </div>
  );
}
