import { useLocation, useNavigate } from "react-router-dom";

const routes = ["home", "characters", "quests", "inventory"];

export default function NavBar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const active = pathname === "/" ? "home" : pathname.replace("/", "");

  const underlineOffset = routes.indexOf(active) * 110;

  return (
    <div className="nav-bar">
      {routes.map(route => (
        <button
          key={route}
          className={`nav-btn ${active === route ? "active" : ""}`}
          onClick={() => navigate(route === "home" ? "/" : `/${route}`)}
        >
          {route === "home" && "🏠 "}
          {route === "characters" && "⚔ "}
          {route === "quests" && "📜 "}
          {route === "inventory" && "🎒 "}
          {route.charAt(0).toUpperCase() + route.slice(1)}
        </button>
      ))}

      <div
        className="nav-underline"
        style={{transform: `translateX(${underlineOffset}px)` }}
      />
    </div>
  );
}
