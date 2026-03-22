import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  GraduationCap,
  Loader2,
  ShieldCheck,
  User,
  Users,
} from "lucide-react";
import api from "../services/api";
import AuthLayout from "../components/common/AuthLayout";

const roles = [
  {
    id: "admin",
    label: "Admin",
    hint: "Institution controls",
    icon: ShieldCheck,
  },
  {
    id: "faculty",
    label: "Faculty",
    hint: "Classes and records",
    icon: Users,
  },
  {
    id: "student",
    label: "Student",
    hint: "Attendance and grades",
    icon: GraduationCap,
  },
];

export default function LoginPage() {
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!role) {
      setError("Please choose your role before signing in.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/login", {
        user_id: userId,
        password,
      });

      localStorage.setItem("token", response.data.access_token);

      setTimeout(() => {
        if (role === "admin") navigate("/admin");
        if (role === "faculty") navigate("/faculty");
        if (role === "student") navigate("/student");
      }, 300);
    } catch (err) {
      setIsLoading(false);
      setError(err.response?.data?.detail || "Invalid credentials. Please try again.");
    }
  };

  return (
    <AuthLayout
      eyebrow="Secure access"
      title="Sign in to your workspace"
      description="Move between administration, faculty, and student workflows through one modern academic portal."
      heroTitle="A cleaner academic portal for every role."
      heroDescription="Manage operations, records, and student experience from a single interface designed to feel credible, calm, and professional."
    >
      <div className="form-section">
        <label className="field-label">Choose your role</label>
        <div className="role-grid">
          {roles.map((roleOption) => {
            const Icon = roleOption.icon;
            const isActive = role === roleOption.id;

            return (
              <button
                key={roleOption.id}
                type="button"
                className={`role-button ${isActive ? "is-active" : ""}`}
                onClick={() => setRole(roleOption.id)}
              >
                <Icon size={20} />
                <span className="role-button__label">{roleOption.label}</span>
                <span className="role-button__hint">{roleOption.hint}</span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            className="message-banner"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="form-section form-grid">
        <div>
          <label className="field-label" htmlFor="user-id">
            User ID
          </label>
          <div className="input-icon-wrap">
            <User size={18} />
            <input
              id="user-id"
              type="text"
              required
              value={userId}
              onChange={(event) => setUserId(event.target.value)}
              placeholder="Enter your registered user ID"
            />
          </div>
        </div>

        <div>
          <label className="field-label" htmlFor="password">
            Password
          </label>
          <div className="input-icon-wrap">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
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

        <div className="form-row form-row--stack">
          <button type="button" className="button-link" onClick={() => navigate("/forgot-password")}>
            Forgot password?
          </button>
          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : "Sign in"}
          </button>
        </div>
      </form>

      <div className="form-section">
        <p>
          First time here?{" "}
          <button type="button" className="button-link" onClick={() => navigate("/signup")}>
            Create your access
          </button>
        </p>
      </div>
    </AuthLayout>
  );
}
