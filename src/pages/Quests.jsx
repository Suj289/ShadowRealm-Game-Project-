import useQuests from "../hooks/useQuests";

export default function Quests() {
  const { quests, acceptQuest, completeQuest } = useQuests();

  return (
    <div>
      <h2 className="text-4xl text-purple-300 mb-6">Quests</h2>

      {["available", "in_progress", "completed"].map(status => (
        <div key={status} className="mb-8">
          <h3 className="text-2xl capitalize mb-3">{status.replace("_", " ")}</h3>

          <div className="space-y-4">
            {quests.filter(q => q.status === status).map(q => (
              <div key={q.id} className="bg-black/40 p-5 rounded-lg border border-purple-500/30">
                <h4 className="text-xl text-purple-200">{q.title}</h4>
                <p>{q.description}</p>
                <p className="text-sm">Difficulty: {q.difficulty}</p>
                <p className="text-yellow-400">Rewards: {q.reward_gold} gold / {q.reward_experience} XP</p>

                {status === "available" && (
                  <button onClick={() => acceptQuest(q.id)}
                    className="mt-3 bg-purple-600 px-4 py-2 rounded-lg">Accept</button>
                )}

                {status === "in_progress" && (
                  <button onClick={() => completeQuest(q.id)}
                    className="mt-3 bg-green-600 px-4 py-2 rounded-lg">Complete</button>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
