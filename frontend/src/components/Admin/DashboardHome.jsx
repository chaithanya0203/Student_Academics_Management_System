import {
    Users,
    GraduationCap,
    BookOpen,
    School,
    Layers,
    Mail
} from "lucide-react";
import "../../styles/dashboard-admin.css";

export default function DashboardHome() {
    const stats = [
        { label: "Total Students", value: "1,240", icon: <Users size={24} />, color: "bg-blue-500" },
        { label: "Total Faculty", value: "85", icon: <GraduationCap size={24} />, color: "bg-purple-500" },
        { label: "Active Courses", value: "42", icon: <BookOpen size={24} />, color: "bg-green-500" },
        { label: "Total Sections", value: "12", icon: <Layers size={24} />, color: "bg-orange-500" },
    ];

    return (
        <div className="admin-container">
            <div style={{ marginBottom: "2rem" }}>
                <h2 className="section-title">Admin Dashboard Overview</h2>
                <p style={{ color: "var(--text-secondary)" }}>Welcome back, Admin. Here is what's happening today.</p>
            </div>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "1.5rem",
                marginBottom: "2rem"
            }}>
                {stats.map((stat, index) => (
                    <div key={index} style={{
                        background: "white",
                        padding: "1.5rem",
                        borderRadius: "1rem",
                        boxShadow: "var(--shadow-md)",
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        border: "1px solid #e2e8f0"
                    }}>
                        <div style={{
                            padding: "1rem",
                            borderRadius: "0.75rem",
                            background: "#f1f5f9",
                            color: "var(--primary-color)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            {stat.icon}
                        </div>
                        <div>
                            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "0.25rem" }}>{stat.label}</p>
                            <h3 style={{ fontSize: "1.5rem", fontWeight: "700", margin: 0, color: "var(--text-primary)" }}>{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ background: "linear-gradient(135deg, var(--primary-color), var(--accent-color))", borderRadius: "1rem", padding: "2rem", color: "white" }}>
                <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem", color: "white" }}>Quick Actions</h3>
                <p style={{ opacity: 0.9, marginBottom: "1.5rem" }}>Manage your academic institution efficiently.</p>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", background: "rgba(255,255,255,0.2)", padding: "0.5rem 1rem", borderRadius: "0.5rem" }}>
                        <School size={16} /> <span>Manage Sections</span>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", background: "rgba(255,255,255,0.2)", padding: "0.5rem 1rem", borderRadius: "0.5rem" }}>
                        <Mail size={16} /> <span>Send Alerts</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
