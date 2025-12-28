export default function CharacterCard({ character, onBuy, onLevelUp }) {
  return (
    <div className="bg-black/50 p-6 rounded-2xl border border-purple-500/40 glow-border float hover:scale-105 transition">
      <h3 className="text-xl font-bold text-purple-300">{character.name}</h3>
      <p>Class: {character.class}</p>
      <p>Level: {character.level}</p>

      <div className="space-y-1 text-sm">
        <p>HP: {character.health}/{character.max_health}</p>
        <p>Mana: {character.mana}/{character.max_mana}</p>
        <p>STR: {character.strength} | INT: {character.intelligence} | AGI: {character.agility}</p>
      </div>

      {character.owned ? (
        <button
          onClick={() => onLevelUp(character.id)}
          className="w-full bg-purple-600 py-2 rounded-lg hover:scale-105 transition"
        >
          Level Up
        </button>
      ) : (
        <button
          onClick={() => onBuy(character.id)}
          className="w-full bg-yellow-600 py-2 rounded-lg hover:scale-105 transition"
        >
          Buy ({character.price} gold)
        </button>
      )}
    </div>
  );
}
