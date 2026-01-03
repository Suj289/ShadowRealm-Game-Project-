import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ height: "100vh", display: "grid", placeItems: "center" }}>
      <div className="portal" style={{ textAlign: "center" }}>

        <h1>Realm of Shadows</h1>
        <p>A dark fantasy RPG where legends are forged and fate is decided.</p>

        <button className="game-btn" onClick={() => navigate("/characters")}>
          ENTER THE REALM
        </button>

        <div className="home-buttons">
          <button className="game-btn" onClick={() => navigate("/characters")}>
            My Characters
          </button>
          <button className="game-btn" onClick={() => navigate("/quests")}>
            Quests
          </button>
        </div>

      </div>
    </div>
  );
}
