import { useState } from "react";
import { sampleQuests } from "../data/sampleQuests";

export default function useQuests() {
  const [quests, setQuests] = useState(sampleQuests);

  const acceptQuest = (id) => {
    setQuests(qs =>
      qs.map(q => q.id === id ? { ...q, status: "in_progress" } : q)
    );
  };

  const completeQuest = (id) => {
    setQuests(qs =>
      qs.map(q => q.id === id ? { ...q, status: "completed" } : q)
    );
  };

  return { quests, acceptQuest, completeQuest };
}
