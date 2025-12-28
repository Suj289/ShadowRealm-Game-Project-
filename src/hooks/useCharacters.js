import { useState } from "react";
import { premadeCharacters } from "../data/sampleCharacters";

export default function useCharacters() {
  const [gold, setGold] = useState(500);
  const [characters, setCharacters] = useState(premadeCharacters);

  const buyCharacter = (id) => {
    const char = characters.find(c => c.id === id);
    if (gold < char.price) return;

    setGold(gold - char.price);
    setCharacters(chars =>
      chars.map(c => c.id === id ? { ...c, owned: true } : c)
    );
  };

  const levelUp = (id) => {
    setCharacters(chars =>
      chars.map(c =>
        c.id === id
          ? {
              ...c,
              level: c.level + 1,
              max_health: c.max_health + 10,
              max_mana: c.max_mana + 5,
              strength: c.strength + 2,
              intelligence: c.intelligence + 2,
              agility: c.agility + 2
            }
          : c
      )
    );
  };

  return { gold, characters, buyCharacter, levelUp };
}
