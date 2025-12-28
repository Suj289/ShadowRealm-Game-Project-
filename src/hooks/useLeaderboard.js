import { useState } from "react";
import { sampleLeaderboard } from "../data/sampleLeaderboard";

export default function useLeaderboard() {
  const [list] = useState(
    [...sampleLeaderboard].sort(
      (a, b) => b.level * 1000 + b.experience - (a.level * 1000 + a.experience)
    )
  );

  return { list };
}
