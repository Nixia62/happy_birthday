import { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";
import cardImg from "../assets/card2.jpg";
import giftClosed from "../assets/gift-closed.png";
import giftOpen from "../assets/gift-open.png";
import music from "/birthday-music.mp3";
import "../styles/main.css";

export default function MainScreen() {

  const [showConfetti, setShowConfetti] = useState(true);
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });


  const [opened, setOpened] = useState([false, false, false]);
  const [activeGift, setActiveGift] = useState(null);


  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(music);
    audioRef.current.volume = 0.4;
    audioRef.current.loop = true;
    audioRef.current.play().catch(() => {});

    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 60000);

    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const openGift = (index) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    setOpened(prev =>
      prev.map((val, i) => (i === index ? true : val))
    );
    setActiveGift(index);
  };

  const closeModal = () => {
    setActiveGift(null);

    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  };

  return (
    <div className="main">
      {showConfetti && (
        <Confetti
          width={size.width}
          height={size.height}
          numberOfPieces={200}
          gravity={0.2}
          recycle={true}
        />
      )}

      <div className="card-container">
        <img src={cardImg} alt="Birthday Card" />
      </div>

   
      <div className="gifts">
        {opened.map((isOpen, i) => (
          <img
            key={i}
            src={isOpen ? giftOpen : giftClosed}
            alt="Gift box"
            className={`gift ${isOpen ? "opened" : ""}`}
            onClick={() => openGift(i)}
          />
        ))}
      </div>

  
      {activeGift !== null && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={closeModal}>
              ✕
            </button>

            {activeGift === 0 && (
              <video
                src="/Minecraft.mp4"
                controls
                autoPlay
                style={{
                  width: "100%",
                  maxHeight: "70vh",
                  borderRadius: "3px"
                }}
              />
            )}



            {activeGift === 1 && (
  <div className="poem">
    <p>
      when the calendar exhales and shifts,<br />
      this day steps forward, one that lifts,<br />
      not loudly marked but briefly known,<br />
      as time acknowledges what has grown,
    </p>

    <p>
      no grand declarations fill the space,<br />
      no borrowed warmth, no hurried grace,<br />
      only the ease of moments known<br />
      to pass complete, and stand alone,
    </p>

    <p>
      so let this turn of light and year,<br />
      arrive unburdened, clear and sincere,<br />
      a quiet wish the moment brings,<br />
      renewal in small, steady things,
    </p>

    <p>
      may this new orbit treat you kind,<br />
      may clarity outpace your wise mind,<br />
      and may each fleeting hour you meet<br />
      arrive in balance, bright and complete,
    </p>
  </div>
)}

            {activeGift === 2 && <p>✨ Gift 3 content goes here</p>}
          </div>
        </div>
      )}
    </div>
  );
}
