import { useState } from "react";
import { sampleItems } from "../data/sampleItems";

export default function useInventory() {
  const [items, setItems] = useState(sampleItems);
  const [filter, setFilter] = useState("All");

  const toggleEquip = (id) => {
    setItems(list =>
      list.map(i => i.id === id ? { ...i, equipped: !i.equipped } : i)
    );
  };

  const deleteItem = (id) => {
    setItems(list => list.filter(i => i.id !== id));
  };

  return { items, filter, setFilter, toggleEquip, deleteItem };
}
