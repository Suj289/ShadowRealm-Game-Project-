import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Characters from "./pages/Characters";
import Quests from "./pages/Quests";
import NavBar from "./components/NavBar";
import Inventory from "./pages/Inventory";


export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/quests" element={<Quests />} />
        <Route path="/inventory" element={<Inventory />} />
      </Routes>
    </>
  );
}
