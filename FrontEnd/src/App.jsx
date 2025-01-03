import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Create from "./pages/Create";
import Read from "./pages/Read";
import Update from "./pages/Update";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/read/:id/:source" element={<Read />} />
        <Route path="/update/:id/:source" element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
