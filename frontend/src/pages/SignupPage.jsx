import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import bg from "../assets/background.jpg";
import "../styles/login.css"; // Reuse login styles

const SignupPage = () => {
    const [role, setRole] = useState("student");
    const [userId, setUserId] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/auth/signup", {
                role,
                user_id: userId,
                email,
                password
            });
            alert("Signup successful! Please login.");
            navigate("/");
        } catch (err) {
            alert("Signup failed: " + (err.response?.data?.detail || "Unknown error"));
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
            <div className="login-box-outer" style={{ maxWidth: "450px", margin: "auto", position: "relative", top: "80px" }}>
                <div className="right-box" style={{ width: "100%", padding: "2rem" }}>
                    <h3>First Time User? Sign Up</h3>
                    <form onSubmit={handleSubmit}>

                        <div style={{ marginBottom: "1rem" }}>
                            <label style={{ display: "block", marginBottom: "0.5rem" }}>I am a:</label>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                style={{ width: "100%", padding: "0.5rem" }}
                            >
                                <option value="student">Student</option>
                                <option value="faculty">Faculty</option>
                            </select>
                        </div>

                        <input
                            type="text"
                            placeholder={role === 'student' ? "Student ID (e.g. 100101)" : "Faculty ID (e.g. 101)"}
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email (Must match records)"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <div style={{ position: "relative" }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Create Password"
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
                        <button type="submit">Sign Up</button>
                    </form>
                    <div style={{ marginTop: "1rem", textAlign: "center" }}>
                        <Link to="/" style={{ color: "#333", textDecoration: "none" }}>Already have an account? Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
