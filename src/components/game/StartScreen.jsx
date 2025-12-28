export default function StartScreen({ onStart }) {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] space-y-8">
      <h1 className="text-5xl text-purple-300 font-bold glow-text float">
      <button onClick={onStart}
        className="bg-purple-700 px-8 py-4 rounded-xl text-xl hover:scale-105 transition">
        Begin Adventure
      </button>
    </div>
  );
}
