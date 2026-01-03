import { useEffect, useRef, useState } from "react";

export default function Game() {
  const canvasRef = useRef(null);
  const keys = useRef({});

  const [player, setPlayer] = useState({ x: 500, y: 350, hp: 100 });
  const [enemies, setEnemies] = useState([]);
  const [nearEnemy, setNearEnemy] = useState(null);
  const [currentEnemy, setCurrentEnemy] = useState(null);
  const [inBattle, setInBattle] = useState(false);

  // Spawn enemies
  useEffect(() => {
    const spawn = [];
    for (let i = 0; i < 6; i++) {
      spawn.push({
        id: i,
        x: Math.random() * 1400 + 200,
        y: Math.random() * 900 + 200,
        hp: 40,
        type: "Shadow Beast",
        sprite: "👹",
      });
    }
    setEnemies(spawn);
  }, []);

  // Input handling
  useEffect(() => {
    const down = e => (keys.current[e.key] = true);
    const up = e => (keys.current[e.key] = false);

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);

    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  // Main game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function update() {
      let { x, y } = player;

      if (keys.current.w || keys.current.ArrowUp) y -= 4;
      if (keys.current.s || keys.current.ArrowDown) y += 4;
      if (keys.current.a || keys.current.ArrowLeft) x -= 4;
      if (keys.current.d || keys.current.ArrowRight) x += 4;

      setPlayer(p => ({ ...p, x, y }));

      let close = null;
      for (const e of enemies) {
        const dx = x - e.x;
        const dy = y - e.y;
        if (Math.hypot(dx, dy) < 60) {
          close = e;
          break;
        }
      }
      setNearEnemy(close);
    }

    function draw() {
      const g = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 200,
        canvas.width / 2, canvas.height / 2, 900
      );
      g.addColorStop(0, "#1a0633");
      g.addColorStop(1, "#050010");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Player
      ctx.fillStyle = "#a87bff";
      ctx.beginPath();
      ctx.arc(player.x, player.y, 20, 0, Math.PI * 2);
      ctx.fill();

      // Enemies
      ctx.fillStyle = "#ff4444";
      enemies.forEach(e => {
        ctx.beginPath();
        ctx.arc(e.x, e.y, 18, 0, Math.PI * 2);
        ctx.fill();
      });

      if (nearEnemy) {
        ctx.fillStyle = "white";
        ctx.font = "16px Arial";
        ctx.fillText("Press E to fight", player.x - 40, player.y - 30);
      }
    }

    function loop() {
      update();
      draw();
      requestAnimationFrame(loop);
    }

    loop();
  }, [player, enemies, nearEnemy]);

  // Battle trigger
  useEffect(() => {
    const handle = e => {
      if (e.key === "e" && nearEnemy && !inBattle) {
        setCurrentEnemy(nearEnemy);
        setInBattle(true);
      }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [nearEnemy, inBattle]);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
        }}
      />

      {inBattle && currentEnemy && (
        <BattleSystem
          enemy={currentEnemy}
          player={player}
          onPlayerDamage={dmg => setPlayer(p => ({ ...p, hp: p.hp - dmg }))}
          onBattleEnd={() => setInBattle(false)}
        />
      )}
    </>
  );
}
