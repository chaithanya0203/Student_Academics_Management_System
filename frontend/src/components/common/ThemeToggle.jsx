import { Moon, SunMedium } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
      {isDark ? <SunMedium size={18} /> : <Moon size={18} />}
      <span className="theme-toggle__label">{isDark ? "Light mode" : "Dark mode"}</span>
    </button>
  );
}
