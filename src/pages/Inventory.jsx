import { useState, useEffect } from "react";

const SHOP_ITEMS = [
  { id: "hp", name: "Health Potion", price: 30, desc: "Restore 30 HP" },
  { id: "dmg", name: "Damage Potion", price: 50, desc: "+20% Damage for next battle" },
  { id: "res", name: "Resistance Potion", price: 40, desc: "Take 20% less damage" },
];

export default function Inventory() {
  const [gold, setGold] = useState(() => Number(localStorage.getItem("gold") || 0));
  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem("items") || "{}"));

  useEffect(() => {
    localStorage.setItem("gold", gold);
    localStorage.setItem("items", JSON.stringify(items));
  }, [gold, items]);

  function buy(item) {
    if (gold < item.price) return;

    setGold(g => g - item.price);
    setItems(inv => ({
      ...inv,
      [item.id]: (inv[item.id] || 0) + 1,
    }));
  }

  return (
    <div className="page inventory-page">
      <h2>Inventory Shop</h2>
      <p>Gold: 🪙 {gold}</p>

      <div className="inventory-grid">
        {SHOP_ITEMS.map(item => (
          <div key={item.id} className="inventory-card">
            <h3>{item.name}</h3>
            <p>{item.desc}</p>
            <p>Price: 🪙 {item.price}</p>

            <button
              onClick={() => buy(item)}
              disabled={gold < item.price}
              className={gold < item.price ? "disabled" : ""}
            >
              {gold < item.price ? "Not Enough Gold" : "Buy"}
            </button>

            <p>Owned: {items[item.id] || 0}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
