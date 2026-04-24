import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle login submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("handleSubmit running");

    setLoading(true);

    try {
      const response = await loginUser(formData);

      console.log("Login Response:", response.data);

      const { token, role, userId } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", userId);

      alert("Login successful");

      // Redirect user
      if (role === "admin") {
        navigate("/admin/add-menu");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log("Login Error:", error);

      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Login</h2>

        {/* IMPORTANT: form must use onSubmit */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="identifier"
            placeholder="Enter Roll No or Admin Email"
            value={formData.identifier}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {/* IMPORTANT: button must be type submit */}
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <p>
            Don't have an account? <Link to="/signup">Signup</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
