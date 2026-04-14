import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Menu from "./pages/Menu";
import AdminAddMenu from "./pages/AdminAddMenu";
import Orders from "./pages/Orders";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/admin/add-menu" element={<AdminAddMenu />} />
      <Route path="/orders" element={<Orders />} />
    </Routes>
  );
}

export default App;
