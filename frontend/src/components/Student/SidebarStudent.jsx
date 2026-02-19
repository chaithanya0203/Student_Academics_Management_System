// src/components/Student/SidebarStudent.jsx
import { Calendar, Award, TrendingUp, LogOut } from "lucide-react";
import "../../styles/dashboard-student.css";

export default function SidebarStudent({ setComponent }) {
  const items = [
    { label: "My Attendance", key: "attendance", icon: <Calendar size={20} /> },
    { label: "My Marks", key: "marks", icon: <Award size={20} /> },
    { label: "My CGPA", key: "cgpa", icon: <TrendingUp size={20} /> },
  ];

  return (
    <div className="sidebar-student">
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "2rem 1.5rem", background: "rgba(0,0,0,0.1)" }}>
        <div style={{ width: "32px", height: "32px", background: "rgba(255,255,255,0.2)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "bold" }}>S</div>
        <h2 style={{ fontSize: "1.25rem", margin: 0, padding: 0, border: "none", background: "transparent" }}>Student Portal</h2>
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
