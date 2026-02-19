import {
  Users,
  GraduationCap,
  ShieldCheck,
  Layers,
  BookOpen,
  Network,
  UserPlus,
  Map,
  Trash2,
  Mail,
  Key,
  LogOut,
  LayoutDashboard
} from "lucide-react";
import "../../styles/sidebar-admin.css";

export default function SidebarAdmin({ setComponent }) {
  const items = [
    { label: "Dashboard", key: "home", icon: <LayoutDashboard size={20} /> },
    { label: "Students", key: "studentInfo", icon: <Users size={20} /> },
    { label: "Faculty", key: "facultyInfo", icon: <GraduationCap size={20} /> },
    { label: "Admins", key: "adminInfo", icon: <ShieldCheck size={20} /> },
    { label: "Sections", key: "section", icon: <Layers size={20} /> },
    { label: "Courses", key: "courseCatalog", icon: <BookOpen size={20} /> },
    { label: "Student–Course", key: "studentCourseMap", icon: <Network size={20} /> },
    { label: "Faculty–Course", key: "facultyCourseMap", icon: <UserPlus size={20} /> },
    { label: "Section–Course", key: "sectionCourseMap", icon: <Map size={20} /> },
    { label: "Marks (Delete)", key: "marks", icon: <Trash2 size={20} /> },
    { label: "Attendance (Delete)", key: "attendance", icon: <Trash2 size={20} /> },
    { label: "Email Alert", key: "emailAlert", icon: <Mail size={20} /> },
    { label: "Credentials", key: "userCredentials", icon: <Key size={20} /> },
  ];

  return (
    <div className="sidebar-admin">
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "2rem 1.5rem", background: "rgba(0,0,0,0.1)" }}>
        <div style={{ width: "32px", height: "32px", background: "white", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#1e293b", fontWeight: "bold" }}>A</div>
        <h2 style={{ fontSize: "1.25rem", margin: 0, padding: 0, border: "none", background: "transparent" }}>Admin Panel</h2>
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
