import { useEffect, useState } from "react";

export default function BattleSystem({ enemy, onEnd }) {
  const [playerHP, setPlayerHP] = useState(100);
  const [enemyHP, setEnemyHP] = useState(enemy.hp);

  const [inventory, setInventory] = useState(() =>
    JSON.parse(localStorage.getItem("items") || "{}")
  );

  const [damageBoost, setDamageBoost] = useState(1);
  const [resistanceBoost, setResistanceBoost] = useState(1);
  const [log, setLog] = useState([]);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(inventory));
  }, [inventory]);

  function usePotion(type) {
    if (!inventory[type] || inventory[type] <= 0) return;

    setInventory(inv => ({
      ...inv,
      [type]: inv[type] - 1,
    }));

    if (type === "hp") {
      setPlayerHP(hp => Math.min(hp + 30, 100));
      addLog("🧪 Used Health Potion (+30 HP)");
    }

    if (type === "dmg") {
      setDamageBoost(1.2);
      addLog("🔥 Damage increased for 10s");
      setTimeout(() => setDamageBoost(1), 10000);
    }

    if (type === "res") {
      setResistanceBoost(0.8);
      addLog("🛡️ Resistance increased for 10s");
      setTimeout(() => setResistanceBoost(1), 10000);
    }
  }

  function addLog(text) {
    setLog(l => [...l.slice(-6), text]);
  }

  function attack() {
    const playerDamage = Math.floor(10 * damageBoost);
    const enemyDamage = Math.floor(8 * resistanceBoost);

    setEnemyHP(hp => Math.max(hp - playerDamage, 0));
    addLog(`⚔️ You hit for ${playerDamage}`);

    setTimeout(() => {
      setPlayerHP(hp => Math.max(hp - enemyDamage, 0));
      addLog(`💀 Enemy hit for ${enemyDamage}`);
    }, 500);
  }

  useEffect(() => {
    if (enemyHP <= 0) {
      addLog("🏆 Victory!");
      setTimeout(onEnd, 1500);
    }
    if (playerHP <= 0) {
      addLog("☠️ Defeat...");
      setTimeout(onEnd, 1500);
    }
  }, [enemyHP, playerHP]);

  return (
    <div className="battle-system">
      <h2>⚔️ Battle</h2>

      <div className="battle-bars">
        <div>❤️ Player: {playerHP}</div>
        <div>👹 Enemy: {enemyHP}</div>
      </div>

      <div className="battle-actions">
        <button onClick={attack}>Attack</button>
      </div>

      <div className="battle-items">
        <h4>Potions</h4>
        <button onClick={() => usePotion("hp")} disabled={!inventory.hp}>
          🧪 HP ({inventory.hp || 0})
        </button>
        <button onClick={() => usePotion("dmg")} disabled={!inventory.dmg}>
          🔥 DMG ({inventory.dmg || 0})
        </button>
        <button onClick={() => usePotion("res")} disabled={!inventory.res}>
          🛡️ RES ({inventory.res || 0})
        </button>
      </div>

      <div className="battle-log">
        {log.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>
    </div>
  );
}
