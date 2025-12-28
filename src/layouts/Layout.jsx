import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      <header className="p-6 flex justify-between border-b border-purple-500/40 backdrop-blur-lg glow-border">
        <h1 className="text-purple-400 font-bold text-2xl glow-text">🌙 ShadowRealm</h1>
        <nav className="space-x-6 text-purple-200">
            <a className="hover:text-purple-400 transition" href="/">Home</a>
            <a className="hover:text-purple-400 transition" href="/characters">Characters</a>
            <a className="hover:text-purple-400 transition" href="/quests">Quests</a>
            <a className="hover:text-purple-400 transition" href="/inventory">Inventory</a>
            <a className="hover:text-purple-400 transition" href="/leaderboard">Leaderboard</a>
            <a className="hover:text-purple-400 transition" href="/game">Game</a>
        </nav>
      </header>

        <h1 className="text-2xl font-bold text-purple-400 glow">🌙 ShadowRealm</h1>
        <nav className="space-x-6">
          <Link to="/">Home</Link>
          <Link to="/characters">Characters</Link>
        </nav>
      </header>

      <main className="p-10">{children}</main>
    </div>
  );
}
