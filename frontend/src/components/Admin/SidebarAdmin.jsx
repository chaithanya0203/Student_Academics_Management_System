import {
  BookOpen,
  GraduationCap,
  Key,
  Layers,
  LayoutDashboard,
  LogOut,
  Mail,
  Map,
  Network,
  ShieldCheck,
  Trash2,
  UserPlus,
  Users,
} from "lucide-react";

const items = [
  { label: "Dashboard", key: "home", icon: LayoutDashboard },
  { label: "Students", key: "studentInfo", icon: Users },
  { label: "Faculty", key: "facultyInfo", icon: GraduationCap },
  { label: "Admins", key: "adminInfo", icon: ShieldCheck },
  { label: "Sections", key: "section", icon: Layers },
  { label: "Courses", key: "courseCatalog", icon: BookOpen },
  { label: "Student-Course", key: "studentCourseMap", icon: Network },
  { label: "Faculty-Course", key: "facultyCourseMap", icon: UserPlus },
  { label: "Section-Course", key: "sectionCourseMap", icon: Map },
  { label: "Marks", key: "marks", icon: Trash2 },
  { label: "Attendance", key: "attendance", icon: Trash2 },
  { label: "Email Alert", key: "emailAlert", icon: Mail },
  { label: "Credentials", key: "userCredentials", icon: Key },
];

export default function SidebarAdmin({ activeItem, setComponent, isOpen, closeSidebar }) {
  const handleSelect = (key) => {
    setComponent(key);
    closeSidebar();
  };

  return (
    <aside className={`dashboard-sidebar ${isOpen ? "is-open" : ""}`}>
      <div className="dashboard-sidebar__brand">
        <div className="dashboard-sidebar__logo">
          <GraduationCap size={20} />
        </div>
        <div>
          <div className="dashboard-sidebar__title">SAMS Admin</div>
          <div className="dashboard-sidebar__subtitle">Management Console</div>
        </div>
      </div>

      <nav className="dashboard-sidebar__nav">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.key;

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => handleSelect(item.key)}
              className={`nav-button ${isActive ? "is-active" : ""}`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="dashboard-sidebar__footer">
        <button
          type="button"
          className="btn-danger"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          <LogOut size={18} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
