import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, ShieldCheck, User, Users } from "lucide-react";
import api from "../services/api";
import AuthLayout from "../components/common/AuthLayout";

const roleOptions = [
  { value: "student", label: "Student", icon: User, hint: "Request your portal access" },
  { value: "faculty", label: "Faculty", icon: Users, hint: "Activate academic tools" },
];

export default function SignupPage() {
  const [role, setRole] = useState("student");
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      await api.post("/auth/signup", {
        role,
        user_id: userId,
        email,
        password,
      });

      setSuccess("Signup successful. Redirecting to login...");
      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      setError(err.response?.data?.detail || "Signup failed. Please verify your details.");
    }
  };

  return (
    <AuthLayout
      eyebrow="New account"
      title="Request portal access"
      description="Create your first-time access using the role and institutional details already registered in the system."
      heroTitle="Bring every academic journey into one trusted interface."
      heroDescription="From onboarding to ongoing access, the portal should feel as reliable and polished as the institution behind it."
    >
      <form onSubmit={handleSubmit} className="form-section form-grid">
        <div>
          <label className="field-label">I am registering as</label>
          <div className="role-grid">
            {roleOptions.map((option) => {
              const Icon = option.icon;
              const isActive = role === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  className={`role-button ${isActive ? "is-active" : ""}`}
                  onClick={() => setRole(option.value)}
                >
                  <Icon size={20} />
                  <span className="role-button__label">{option.label}</span>
                  <span className="role-button__hint">{option.hint}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="field-label" htmlFor="signup-user-id">
            User ID
          </label>
          <div className="input-icon-wrap">
            <ShieldCheck size={18} />
            <input
              id="signup-user-id"
              type="text"
              required
              value={userId}
              onChange={(event) => setUserId(event.target.value)}
              placeholder={role === "student" ? "Student ID" : "Faculty ID"}
            />
          </div>
        </div>

        <div>
          <label className="field-label" htmlFor="signup-email">
            Registered email
          </label>
          <div className="input-icon-wrap">
            <Mail size={18} />
            <input
              id="signup-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your registered email"
            />
          </div>
        </div>

        <div>
          <label className="field-label" htmlFor="signup-password">
            Create password
          </label>
          <div className="input-icon-wrap">
            <input
              id="signup-password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Create a strong password"
            />
            <button
              type="button"
              className="input-action"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {error ? <div className="message-banner">{error}</div> : null}
        {success ? <div className="success-message">{success}</div> : null}

        <div className="form-row form-row--stack">
          <Link className="button-link" to="/">
            Back to login
          </Link>
          <button type="submit" className="btn-primary">
            Create access
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
