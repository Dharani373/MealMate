import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import plateIcon from "../assets/plate.png";
import studentIcon from "../assets/student.png";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="navbar">
      <div className="logo">
        <img src={plateIcon} alt="logo" className="logo-icon" />
        Meal Mate
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <a href="#todays-menu">Today's Menu</a>
        </li>
        <li>
          <Link to="/">Explore</Link>
        </li>
        <li>
          <Link to="/">About</Link>
        </li>
      </ul>

      <div className="nav-right">
        {!isLoggedIn && (
          <Link to="/login" className="login-btn">
            Login
          </Link>
        )}

        {isLoggedIn && (
          <div
            className="profile-circle"
            onClick={() => {
              const role = localStorage.getItem("role");
              if (role === "admin") navigate("/admin-dashboard");
              else navigate("/");
            }}
          >
            <img src={studentIcon} alt="profile" className="profile-img" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
