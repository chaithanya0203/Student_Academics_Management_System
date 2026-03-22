import { Award, Calendar, GraduationCap, LogOut, TrendingUp } from "lucide-react";

const items = [
  { label: "My Attendance", key: "attendance", icon: Calendar },
  { label: "My Marks", key: "marks", icon: Award },
  { label: "My CGPA", key: "cgpa", icon: TrendingUp },
];

export default function SidebarStudent({ activeItem, setComponent, isOpen, closeSidebar }) {
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
          <div className="dashboard-sidebar__title">Student Portal</div>
          <div className="dashboard-sidebar__subtitle">Progress Dashboard</div>
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
