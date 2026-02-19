import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import bg from "../assets/background.jpg";
import "../styles/login.css";

const ForgotPassword = () => {
    const [userId, setUserId] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/auth/forgot-password", {
                user_id: userId,
                new_password: newPassword
            });
            setMessage("Password reset successful. Redirecting to login...");
            setTimeout(() => navigate("/"), 2000);
        } catch (err) {
            alert("Error: " + (err.response?.data?.detail || "Request failed"));
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
            <div className="login-box-outer" style={{ maxWidth: "400px", margin: "auto", position: "relative", top: "100px" }}>
                <div className="right-box" style={{ width: "100%", padding: "2rem" }}>
                    <h3>Reset Password</h3>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="User ID"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Reset Password</button>
                    </form>
                    {message && <p style={{ color: "green", marginTop: "10px" }}>{message}</p>}
                    <div style={{ marginTop: "1rem", textAlign: "center" }}>
                        <Link to="/" style={{ color: "#333", textDecoration: "none" }}>Back to Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
