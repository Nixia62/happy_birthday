import { useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import BalloonScreen from "./components/BalloonScreen";
import MainScreen from "./components/MainScreen";

export default function App() {
  const [stage, setStage] = useState("loading");

  return (
    <>
      {stage === "loading" && <LoadingScreen onFinish={() => setStage("balloons")} />}
      {stage === "balloons" && <BalloonScreen onFinish={() => setStage("main")} />}
      {stage === "main" && <MainScreen />}
    </>
  );
}
