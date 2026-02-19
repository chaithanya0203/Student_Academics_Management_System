// src/components/Faculty/SidebarFaculty.jsx
import { CalendarCheck, FileText, User, LogOut } from "lucide-react";
import "../../styles/dashboard-faculty.css";

export default function SidebarFaculty({ setComponent }) {
  const items = [
    { label: "Attendance Records", key: "attendance", icon: <CalendarCheck size={20} /> },
    { label: "Marks Records", key: "marks", icon: <FileText size={20} /> },
    { label: "My Profile", key: "profile", icon: <User size={20} /> },
  ];

  return (
    <div className="sidebar-faculty">
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "2rem 1.5rem", background: "rgba(0,0,0,0.1)" }}>
        <div style={{ width: "32px", height: "32px", background: "rgba(255,255,255,0.2)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "bold" }}>F</div>
        <h2 style={{ fontSize: "1.25rem", margin: 0, padding: 0, border: "none", background: "transparent" }}>Faculty Panel</h2>
      </div>

      <nav>
        <ul>
          {items.map((item) => (
            <li key={item.key}>
              <button
                onClick={() => setComponent(item.key)}
                style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div style={{ marginTop: "auto", padding: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.1)", background: "rgba(0,0,0,0.1)" }}>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
          style={{
            width: "100%",
            padding: "0.75rem",
            background: "rgba(239, 68, 68, 0.1)",
            color: "#fca5a5",
            border: "1px solid rgba(239, 68, 68, 0.2)",
            borderRadius: "0.5rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            transition: "all 0.2s"
          }}
          onMouseOver={(e) => { e.currentTarget.style.background = "#ef4444"; e.currentTarget.style.color = "white"; }}
          onMouseOut={(e) => { e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)"; e.currentTarget.style.color = "#fca5a5"; }}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
