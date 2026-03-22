import { CalendarCheck, FileText, GraduationCap, LogOut, User } from "lucide-react";

const items = [
  { label: "Attendance Records", key: "attendance", icon: CalendarCheck },
  { label: "Marks Records", key: "marks", icon: FileText },
  { label: "My Profile", key: "profile", icon: User },
];

export default function SidebarFaculty({ activeItem, setComponent, isOpen, closeSidebar }) {
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
          <div className="dashboard-sidebar__title">Faculty Workspace</div>
          <div className="dashboard-sidebar__subtitle">Teaching Operations</div>
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
