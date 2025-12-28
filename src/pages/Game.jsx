import { useState } from "react";
import StartScreen from "../components/game/StartScreen";
import GameUI from "../components/game/GameUI";
import GameWorld from "../components/game/GameWorld";
import BattleSystem from "../components/game/BattleSystem";

export default function Game() {
  const [started, setStarted] = useState(false);
  const [hp, setHp] = useState(100);
  const [keys, setKeys] = useState(0);
  const [location, setLocation] = useState("Village");
  const [enemy, setEnemy] = useState(null);

  const move = (loc) => {
    setLocation(loc);
    if (Math.random() > 0.6) setEnemy("Shadow Beast");
  };

  const win = () => {
    setEnemy(null);
    setKeys(k => k + 1);
  };

  const lose = () => {
    setHp(h => h - 20);
    if (hp <= 20) setStarted(false);
  };

  if (!started) return <StartScreen onStart={() => setStarted(true)} />;

  return (
    <div className="space-y-6">
      <GameUI hp={hp} keys={keys} location={location} />
      {!enemy ? <GameWorld move={move} /> : <BattleSystem enemy={enemy} onWin={win} onLose={lose} />}
    </div>
  );
}
