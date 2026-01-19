import { useState } from "react";
import LoadingScreen from "./components/tem2_";
import BalloonScreen from "./components/tem3_";
import MainScreen from "./components/tem1_";

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
