import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Menu from "./pages/Menu";
import AdminAddMenu from "./pages/AdminAddMenu";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/admin/add-menu" element={<AdminAddMenu />} />
    </Routes>
  );
}

export default App;
