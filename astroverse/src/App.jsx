import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import AstroAtlas from "./pages/AstroAtlas";
import CelestialDetails from "./pages/CelestialDetails";
import CosmoScope from "./pages/CosmoScope";
import LunaBase from "./pages/LunaBase";
import Missions from "./pages/Missions";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/astroatlas" element={<AstroAtlas />} />

        <Route
  path="/astroatlas/:name"
  element={<CelestialDetails />}
/>

        <Route path="/cosmoscope" element={<CosmoScope />} />

        <Route path="/lunabase" element={<LunaBase />} />

        <Route path="/missions" element={<Missions />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;