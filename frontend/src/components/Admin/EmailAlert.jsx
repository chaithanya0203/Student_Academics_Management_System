// src/components/admin/EmailAlert.jsx
import { useState } from "react";
import api from "../../services/api";
import "../../styles/dashboard-admin.css";

export default function EmailAlert() {
  const [studentId, setStudentId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await api.post("/email/notify", { student_id: studentId });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.detail || "Failed to send email.");
    }
    setLoading(false);
  };

  return (
    <div className="admin-container">
      <h2 className="section-title">Notify Parent via Email</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <input
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          required
        />
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Sending..." : "Send Email"}
        </button>
      </form>

      {message && <p style={{ marginTop: "10px", fontWeight: "bold" }}>{message}</p>}
    </div>
  );
}
