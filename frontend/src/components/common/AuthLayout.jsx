import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import bg from "../../assets/background.jpg";
import ThemeToggle from "./ThemeToggle";

const defaultStats = [
  { value: "15+", label: "Academic workflows managed" },
  { value: "24/7", label: "Access for admins, faculty, and students" },
  { value: "1", label: "Unified portal experience" },
];

export default function AuthLayout({
  eyebrow,
  title,
  description,
  heroTitle,
  heroDescription,
  heroStats = defaultStats,
  children,
}) {
  return (
    <div className="app-shell">
      <div className="auth-shell">
        <section className="auth-showcase">
          <div className="auth-showcase__image">
            <img src={bg} alt="Academic campus" />
          </div>

          <div className="auth-showcase__content">
            <motion.div
              className="auth-brand"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <div className="auth-brand__badge">
                <GraduationCap size={26} />
              </div>
              <div>
                <div className="auth-brand__title">SAMS Portal</div>
                <div className="auth-brand__subtitle">Student Academics Management System</div>
              </div>
            </motion.div>

            <motion.div
              className="auth-showcase__headline"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
            >
              <h1>{heroTitle}</h1>
              <p>{heroDescription}</p>
            </motion.div>

            <motion.div
              className="auth-showcase__stats"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16 }}
            >
              {heroStats.map((stat) => (
                <div key={stat.label} className="auth-stat">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="auth-panel">
          <motion.div
            className="auth-panel__inner auth-card"
            initial={{ opacity: 0, x: 22 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="auth-card__topbar">
              <span className="eyebrow">{eyebrow}</span>
              <ThemeToggle />
            </div>
            <h2>{title}</h2>
            <p>{description}</p>
            {children}
          </motion.div>
        </section>
      </div>
    </div>
  );
}
