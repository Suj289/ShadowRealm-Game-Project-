import useCharacters from "../hooks/useCharacters";
import CharacterCard from "../components/characters/CharacterCard";

export default function Characters() {
  const { gold, characters, buyCharacter, levelUp } = useCharacters();

  return (
    <div>
      <h2 className="text-4xl text-purple-300 mb-6">Characters</h2>
      <p className="mb-6 text-yellow-400">Gold: {gold}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {characters.map(c => (
          <CharacterCard
            key={c.id}
            character={c}
            onBuy={buyCharacter}
            onLevelUp={levelUp}
          />
        ))}
      </div>
    </div>
  );
}
