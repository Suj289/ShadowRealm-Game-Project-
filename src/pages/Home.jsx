import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="text-center space-y-10">
      <h2 className="text-5xl font-extrabold text-purple-300 drop-shadow-lg">
        Realm of Shadows
      </h2>

      <p className="text-gray-300 max-w-xl mx-auto">
        A dark fantasy RPG where heroes rise, gold flows, and legends are forged.
      </p>

      <Link
        to="/characters"
        className="inline-block px-8 py-4 bg-purple-600 rounded-xl shadow-lg hover:scale-105 transition"
      >
        ENTER THE REALM
      </Link>
    </div>
  );
}
