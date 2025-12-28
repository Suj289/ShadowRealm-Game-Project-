import useInventory from "../hooks/useInventory";

const rarityColors = {
  Common: "text-gray-400",
  Uncommon: "text-green-400",
  Rare: "text-blue-400",
  Epic: "text-purple-400",
  Legendary: "text-orange-400"
};

export default function Inventory() {
  const { items, filter, setFilter, toggleEquip, deleteItem } = useInventory();

  const visible = filter === "All" ? items : items.filter(i => i.type === filter);

  return (
    <div>
      <h2 className="text-4xl text-purple-300 mb-6">Inventory</h2>

      <div className="mb-6 space-x-3">
        {["All","Weapon","Armor","Potion","Artifact","Material"].map(t => (
          <button key={t} onClick={() => setFilter(t)}
            className="bg-purple-700/40 px-4 py-2 rounded-lg">
            {t}
          </button>
        ))}
      </div>

      <div className="bg-black/50 p-5 rounded-2xl border border-purple-500/40 glow-border hover:scale-105 transition">
        {visible.map(item => (
          <div key={item.id} className="bg-black/40 p-5 rounded-xl border border-purple-500/40 space-y-2">
            <h3 className={`text-xl ${rarityColors[item.rarity]}`}>{item.name}</h3>
            <p>{item.type} • Power {item.power}</p>
            <p>Value: {item.price} gold</p>

            <div className="flex gap-3">
              <button onClick={() => toggleEquip(item.id)}
                className="bg-indigo-600 px-4 py-1 rounded">
                {item.equipped ? "Unequip" : "Equip"}
              </button>

              <button onClick={() => deleteItem(item.id)}
                className="bg-red-600 px-4 py-1 rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
