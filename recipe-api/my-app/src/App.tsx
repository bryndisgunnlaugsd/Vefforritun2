import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import { Recipedetail } from "./pages/Recipedetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/recipes/:recipeId" element={<Recipedetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
