import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import DetailAlerte from "./pages/DeatailAlerte";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/alertes/:id" element={<DetailAlerte />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;