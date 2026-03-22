import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function DashboardLayout({
  title,
  subtitle,
  sidebar,
  children,
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1100) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="app-shell">
      <div className={`sidebar-overlay ${isSidebarOpen ? "is-open" : ""}`} onClick={() => setIsSidebarOpen(false)} />
      <div className="dashboard-shell">
        {sidebar({ isSidebarOpen, closeSidebar: () => setIsSidebarOpen(false) })}

        <main className="dashboard-main">
          <div className="dashboard-topbar">
            <div className="dashboard-actions">
              <button
                type="button"
                className="mobile-menu-button"
                onClick={() => setIsSidebarOpen((open) => !open)}
                aria-label="Toggle navigation"
              >
                {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
              <div className="dashboard-topbar__title">
                <h1>{title}</h1>
                <p>{subtitle}</p>
              </div>
            </div>

            <div className="dashboard-actions">
              <ThemeToggle />
            </div>
          </div>

          <div className="content-surface">{children}</div>
        </main>
      </div>
    </div>
  );
}
