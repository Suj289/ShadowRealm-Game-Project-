import { useEffect, useState } from "react";

const QUESTS = [
  {
    id: 1,
    title: "Slay 5 Slimes 🟢",
    desc: "Clear the forest of slimes",
    target: 5,
    reward: 50,
    difficulty: "Easy",
    monster: "slime",
  },
  {
    id: 2,
    title: "Slay 3 Goblins 👺",
    desc: "Defeat goblin scouts",
    target: 3,
    reward: 75,
    difficulty: "Medium",
    monster: "goblin",
  },
  {
    id: 3,
    title: "Slay 1 Wolf 🐺",
    desc: "Hunt the alpha wolf",
    target: 1,
    reward: 100,
    difficulty: "Hard",
    monster: "wolf",
  },
];

export default function Quests() {
  const [gold, setGold] = useState(() => Number(localStorage.getItem("gold")) || 0);
  const [progress, setProgress] = useState(() =>
    JSON.parse(localStorage.getItem("questProgress")) || { 1: 0, 2: 0, 3: 0 }
  );

  useEffect(() => {
    localStorage.setItem("gold", gold);
    localStorage.setItem("questProgress", JSON.stringify(progress));
  }, [gold, progress]);

  function simulateKill(quest) {
    setProgress(p => ({
      ...p,
      [quest.id]: Math.min(p[quest.id] + 1, quest.target),
    }));
  }

  function claimReward(quest) {
    if (progress[quest.id] < quest.target) return;

    setGold(g => g + quest.reward);
    setProgress(p => ({ ...p, [quest.id]: 0 }));
  }

  return (
    <div className="page quests-page">
      <h1 className="quest-title">Quest Board</h1>
      <p className="quest-sub">Embark on epic adventures</p>

      <div className="quest-grid">
        {QUESTS.map(q => {
          const current = progress[q.id];
          const done = current >= q.target;
          const percent = Math.floor((current / q.target) * 100);

          return (
            <div className="quest-card" key={q.id}>
              <div className={`badge ${q.difficulty.toLowerCase()}`}>
                {q.difficulty}
              </div>

              <h2>{q.title}</h2>
              <p className="desc">{q.desc}</p>

              <p className="reward">🪙 {q.reward} Gold</p>

              <p className="progress">
                Progress: {percent}% ({current} / {q.target})
              </p>

              <div className="quest-actions">
                <button
                  className="quest-btn simulate"
                  onClick={() => simulateKill(q)}
                  disabled={done}
                >
                  Simulate Kill
                </button>

                <button
                  className={`quest-btn ${done ? "ready" : ""}`}
                  onClick={() => claimReward(q)}
                  disabled={!done}
                >
                  {done ? "Claim Reward" : "Incomplete"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="gold-display">🪙 {gold}</div>
    </div>
  );
}
