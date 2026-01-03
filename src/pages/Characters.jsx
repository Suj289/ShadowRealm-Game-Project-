import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CLASS_LIST = [
  { name: "Warrior", icon: "🗡️", desc: "Master of melee combat" },
  { name: "Mage", icon: "🪄", desc: "Wielder of arcane magic" },
  { name: "Rogue", icon: "⚡", desc: "Swift and deadly assassin" },
  { name: "Paladin", icon: "🛡️", desc: "Holy warrior of light" },
  { name: "Necromancer", icon: "💀", desc: "Master of death magic" }
];

const DEFAULT_SHOP = [
  { name: "Lyra", className: "Mage", icon: "🪄", price: 140 },
  { name: "Shade", className: "Rogue", icon: "⚡", price: 110 },
  { name: "Lucius", className: "Paladin", icon: "🛡️", price: 150 },
  { name: "Morveth", className: "Necromancer", icon: "💀", price: 160 }
];

export default function Characters() {
  const navigate = useNavigate();

  const [characters, setCharacters] = useState([]);
  const [shop, setShop] = useState(DEFAULT_SHOP);
  const [gold, setGold] = useState(200);
  const [activeTab, setActiveTab] = useState("my");
  const [showCreate, setShowCreate] = useState(false);
  const [loaded, setLoaded] = useState(false);

  /* ---------- LOAD SAVE ---------- */
  useEffect(() => {
    const savedChars = JSON.parse(localStorage.getItem("sr-characters"));
    const savedGold = JSON.parse(localStorage.getItem("sr-gold"));
    const savedShop = JSON.parse(localStorage.getItem("sr-shop"));

    if (Array.isArray(savedChars)) setCharacters(savedChars);
    if (typeof savedGold === "number") setGold(savedGold);
    if (Array.isArray(savedShop)) setShop(savedShop);

    setLoaded(true);
  }, []);

  /* ---------- SAVE ---------- */
  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem("sr-characters", JSON.stringify(characters));
    localStorage.setItem("sr-gold", JSON.stringify(gold));
    localStorage.setItem("sr-shop", JSON.stringify(shop));
  }, [characters, gold, shop, loaded]);

  function createCharacter(hero) {
    setCharacters(prev => [...prev, hero]);
    setShowCreate(false);
  }

  function buyCharacter(c) {
    if (gold < c.price) return;

    setGold(g => g - c.price);
    setCharacters(prev => [...prev, c]);
    setShop(prev => prev.filter(x => x !== c));
  }

  return (
    <div className="page characters-page">

      <div className="characters-header">
        <div>
          <h2>Characters</h2>
          <p>Build your roster of heroes</p>
        </div>
        <div className="currency">🪙 {gold}</div>
      </div>

      <div className="character-tabs">
        <button
          className={`tab ${activeTab === "my" ? "active" : ""}`}
          onClick={() => setActiveTab("my")}
        >
          ⚔ My Characters ({characters.length})
        </button>

        <button
          className={`tab ${activeTab === "shop" ? "active" : ""}`}
          onClick={() => setActiveTab("shop")}
        >
          🧾 Character Shop ({shop.length})
        </button>
      </div>

      <div className="character-card">

        {activeTab === "my" && (
          characters.length === 0 ? (
            <div className="empty-state">
              <h3>No Characters Owned</h3>
              <button className="create-btn" onClick={() => setShowCreate(true)}>
                + Create First Character
              </button>
            </div>
          ) : (
            <div className="hero-grid">
              {characters.map((c, i) => (
                <div key={i} className="hero-row">
                  <div className="hero-info">
                    <div className="hero-icon">{c.icon}</div>
                    <div>
                      <strong>{c.name}</strong>
                      <div className="hero-class">{c.className}</div>
                    </div>
                  </div>
                  <button
                    className="play-btn"
                    onClick={() => {
                      window.location.href = "https://realm-of-shadows-copy-aea59065.base44.app/"
                    }}
                  >
                    Play
                  </button>
                </div>
              ))}
            </div>
          )
        )}

        {activeTab === "shop" && (
          <div className="shop-grid">
            {shop.map((c, i) => (
              <div key={i} className="shop-card">
                <h3>{c.name}</h3>
                <div>{c.className}</div>
                <div className="shop-footer">
                  <span>🪙 {c.price}</span>
                  <button
                    className={gold >= c.price ? "buy-btn can-buy" : "buy-btn"}
                    disabled={gold < c.price}
                    onClick={() => buyCharacter(c)}
                  >
                    {gold >= c.price ? "Buy" : "Not Enough Gold"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {showCreate && (
        <CreateModal
          onClose={() => setShowCreate(false)}
          onCreate={createCharacter}
        />
      )}
    </div>
  );
}

/* ================= MODAL ================= */

function CreateModal({ onClose, onCreate }) {
  const [name, setName] = useState("");
  const [selected, setSelected] = useState(null);

  const canCreate = name.trim() && selected;

  return (
    <div className="modal-overlay">
      <div className="create-modal">

        <div className="modal-header">
          <h3>Create Your Hero</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <label>Character Name</label>
        <input
          className="name-input"
          placeholder="Enter a legendary name..."
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <h4>Choose Your Class</h4>

        <div className="class-grid">
          {CLASS_LIST.map(c => (
            <div
              key={c.name}
              className={`class-card ${selected?.name === c.name ? "selected" : ""}`}
            >
              <div className="class-icon">{c.icon}</div>
              <strong>{c.name}</strong>
              <span>{c.desc}</span>

              <button
                className="select-class-btn"
                onClick={() => setSelected(c)}
              >
                {selected?.name === c.name ? "Selected" : "Select"}
              </button>
            </div>
          ))}
        </div>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button
            className="confirm-btn"
            disabled={!canCreate}
            onClick={() =>
              onCreate({
                name,
                className: selected.name,
                icon: selected.icon
              })
            }
          >
            Create Character
          </button>
        </div>

      </div>
    </div>
  );
}
