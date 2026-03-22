import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { KeyRound, ShieldCheck } from "lucide-react";
import api from "../services/api";
import AuthLayout from "../components/common/AuthLayout";

export default function ForgotPassword() {
  const [userId, setUserId] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      await api.post("/auth/forgot-password", {
        user_id: userId,
        new_password: newPassword,
      });

      setMessage("Password reset successful. Redirecting to login...");
      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      setError(err.response?.data?.detail || "Unable to reset password right now.");
    }
  };

  return (
    <AuthLayout
      eyebrow="Password recovery"
      title="Reset your password"
      description="Recover access securely by verifying your portal ID and setting a new password."
      heroTitle="Keep access secure without slowing people down."
      heroDescription="Recovery flows should feel simple, trustworthy, and consistent with the rest of the product."
    >
      <form onSubmit={handleSubmit} className="form-section form-grid">
        <div>
          <label className="field-label" htmlFor="reset-user-id">
            User ID
          </label>
          <div className="input-icon-wrap">
            <ShieldCheck size={18} />
            <input
              id="reset-user-id"
              type="text"
              required
              value={userId}
              onChange={(event) => setUserId(event.target.value)}
              placeholder="Enter your user ID"
            />
          </div>
        </div>

        <div>
          <label className="field-label" htmlFor="reset-password">
            New password
          </label>
          <div className="input-icon-wrap">
            <KeyRound size={18} />
            <input
              id="reset-password"
              type="password"
              required
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              placeholder="Choose a new password"
            />
          </div>
        </div>

        {error ? <div className="message-banner">{error}</div> : null}
        {message ? <div className="success-message">{message}</div> : null}

        <div className="form-row form-row--stack">
          <Link className="button-link" to="/">
            Back to login
          </Link>
          <button type="submit" className="btn-primary">
            Reset password
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
