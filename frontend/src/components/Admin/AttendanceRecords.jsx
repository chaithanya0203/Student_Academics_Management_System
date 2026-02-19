// src/components/admin/AttendanceRecords.jsx
import { useEffect, useState } from "react";
import api from "../../services/api";
import "../../styles/dashboard-admin.css";

export default function AttendanceRecords() {
  const [records, setRecords] = useState([]);

  const loadRecords = async () => {
    try {
      const res = await api.get("/attendance/", {
        params: { section_id: "", course_id: "", date: "" },
      });
      setRecords(res.data);
    } catch {
      alert("Failed to fetch attendance records.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await api.delete(`/attendance/${id}`);
        loadRecords();
      } catch {
        alert("Delete failed.");
      }
    }
  };

  useEffect(() => {
    loadRecords();
  }, []);

  return (
    <div className="admin-container">
      <h2 className="section-title">Attendance Records (Delete Only)</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Student</th>
            <th>Faculty</th>
            <th>Course</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.student_id}</td>
              <td>{r.faculty_id}</td>
              <td>{r.course_id}</td>
              <td>{r.status}</td>
              <td>{r.date}</td>
              <td>
                <button className="btn-danger" onClick={() => handleDelete(r.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
