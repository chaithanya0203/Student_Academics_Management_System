import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import bg from "../assets/background.jpg";
import "../styles/login.css";

const LoginPage = () => {
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", {
        user_id: userId,
        password: password,
      });
      localStorage.setItem("token", res.data.access_token);
      if (role === "admin") navigate("/admin");
      else if (role === "student") navigate("/student");
      else if (role === "faculty") navigate("/faculty");
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.detail || "Unknown error"));
    }
  };

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div className="top-text">
        <h1>STUDENT ACADEMICS</h1>
        <h3>MANAGEMENT SYSTEM</h3>
      </div>

      <div className="login-header">LOGIN TO DASHBOARD</div>

      <div className="login-wrapper">
        <div className="login-box-outer">
          <div className="left-box">
            <h2>Select Role</h2>
            <select value={role} onChange={(e) => setRole(e.target.value)} required>
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
            </select>
          </div>

          <div className="right-box fade-in">
            {role && (
              <h3>{role.charAt(0).toUpperCase() + role.slice(1)} Login</h3>
            )}
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ width: "100%" }}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    fontSize: "1.2rem",
                  }}
                  role="img"
                  aria-label="toggle password visibility"
                >
                  {showPassword ? "👁️" : "🙈"}
                </span>
              </div>
              <button type="submit">Login</button>
            </form>
            <div style={{ marginTop: "10px", textAlign: "center" }}>
              <a href="/forgot-password" style={{ fontSize: "0.9rem", color: "#666", display: "block", marginBottom: "5px" }}>Forgot Password?</a>
              {role !== "admin" && (
                <a href="/signup" style={{ fontSize: "0.9rem", color: "#007bff", fontWeight: "bold" }}>First time? Sign Up Here</a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
