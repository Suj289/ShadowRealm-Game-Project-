import useLeaderboard from "../hooks/useLeaderboard";

const medals = ["👑", "🥈", "🥉"];

export default function Leaderboard() {
  const { list } = useLeaderboard();

  return (
    <div>
      <h2 className="text-4xl text-purple-300 mb-8">Leaderboard</h2>

      <div className="space-y-4">
        {list.map((c, i) => (
          <div key={c.id}
            className={`flex justify-between p-5 rounded-2xl glow-border
            ${i < 3 ? "bg-yellow-700/20 border-yellow-400" : "bg-black/50 border-purple-500/40"}`}


            <div>
              <span className="text-xl mr-2">{medals[i]}</span>
              <strong>{c.name}</strong> — {c.class}
            </div>

            <div>
              Level {c.level} | XP {c.experience}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
