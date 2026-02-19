// src/components/Student/AttendanceView.jsx
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AttendanceView() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    api.get("/attendance/my")
      .then(res => setRecords(res.data))
      .catch(() => alert("Failed to fetch attendance."));
  }, []);

  return (
    <div className="student-container">
      <h2>My Attendance</h2>
      <table className="student-table">
        <thead>
          <tr><th>Date</th><th>Course</th><th>Status</th></tr>
        </thead>
        <tbody>
          {records.map((r, idx) => (
            <tr key={idx}>
              <td>{r.date}</td>
              <td>{r.course_id}</td>
              <td>{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
