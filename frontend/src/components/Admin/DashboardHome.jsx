import {
  ArrowUpRight,
  BookOpen,
  CalendarRange,
  GraduationCap,
  Layers,
  Mail,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardHome() {
  const stats = [
    { label: "Total Students", value: "1,240", note: "Enrollment is trending upward this semester.", icon: Users },
    { label: "Faculty Members", value: "85", note: "Teaching capacity is stable across departments.", icon: GraduationCap },
    { label: "Active Courses", value: "42", note: "Course catalog is live and synchronized.", icon: BookOpen },
    { label: "Sections Running", value: "12", note: "All core sections are currently mapped.", icon: Layers },
  ];

  const activity = [
    { label: "Security posture", value: "Strong", detail: "Admin access and credential flows are active.", icon: ShieldCheck },
    { label: "Alerts pipeline", value: "Ready", detail: "Institution-wide notifications can be sent instantly.", icon: Mail },
    { label: "Term operations", value: "On schedule", detail: "Attendance and marks workflows are fully available.", icon: CalendarRange },
  ];

  const quickActions = [
    "Review student records",
    "Map courses to sections",
    "Send academic alerts",
  ];

  return (
    <div className="admin-home">
      <motion.section
        className="admin-hero"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <div className="admin-hero__content">
          <div className="admin-hero__badge">
            <Sparkles size={16} />
            <span>Institution command center</span>
          </div>
          <h2>Lead academic operations from one refined dashboard.</h2>
          <p>
            Monitor growth, keep records clean, and move across administrative workflows with
            a layout that feels more like a real product and less like a demo screen.
          </p>

          <div className="admin-hero__actions">
            {quickActions.map((action) => (
              <button key={action} type="button" className="admin-hero__action">
                <span>{action}</span>
                <ArrowUpRight size={16} />
              </button>
            ))}
          </div>
        </div>

        <div className="admin-hero__panel">
          <span className="admin-hero__panel-label">Today at a glance</span>
          <div className="admin-hero__panel-value">98.4%</div>
          <p>Operational availability across core academic workflows and dashboard services.</p>
          <div className="admin-hero__metrics">
            <div>
              <strong>312</strong>
              <span>Recent record updates</span>
            </div>
            <div>
              <strong>08</strong>
              <span>Pending admin tasks</span>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="admin-stats"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.45 }}
      >
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <article key={stat.label} className="admin-stat-card">
              <div className="admin-stat-card__icon">
                <Icon size={20} />
              </div>
              <div>
                <span className="admin-stat-card__label">{stat.label}</span>
                <strong className="admin-stat-card__value">{stat.value}</strong>
                <p>{stat.note}</p>
              </div>
            </article>
          );
        })}
      </motion.section>

      <section className="admin-panels">
        <motion.article
          className="admin-panel admin-panel--primary"
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.18, duration: 0.45 }}
        >
          <div className="admin-panel__header">
            <div>
              <span className="admin-panel__eyebrow">Operational focus</span>
              <h3>Keep the institution flowing smoothly</h3>
            </div>
          </div>

          <div className="admin-timeline">
            <div className="admin-timeline__item">
              <strong>Student management</strong>
              <span>Create, review, and update records with less visual clutter.</span>
            </div>
            <div className="admin-timeline__item">
              <strong>Academic mappings</strong>
              <span>Connect sections, faculty, and courses through one consistent workflow.</span>
            </div>
            <div className="admin-timeline__item">
              <strong>Credentials and communication</strong>
              <span>Handle access and alerts from the same control surface.</span>
            </div>
          </div>
        </motion.article>

        <motion.article
          className="admin-panel"
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.24, duration: 0.45 }}
        >
          <div className="admin-panel__header">
            <div>
              <span className="admin-panel__eyebrow">System status</span>
              <h3>Services overview</h3>
            </div>
          </div>

          <div className="admin-status-list">
            {activity.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="admin-status-item">
                  <div className="admin-status-item__icon">
                    <Icon size={18} />
                  </div>
                  <div className="admin-status-item__content">
                    <div className="admin-status-item__row">
                      <strong>{item.label}</strong>
                      <span>{item.value}</span>
                    </div>
                    <p>{item.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.article>
      </section>
    </div>
  );
}
