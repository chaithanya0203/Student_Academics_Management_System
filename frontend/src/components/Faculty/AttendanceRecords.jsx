// src/components/Faculty/AttendanceRecords.jsx
import { useState, useEffect } from "react";
import api from "../../services/api";

export default function AttendanceRecords() {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({
    student_id: "",
    faculty_id: "", // get this from JWT ideally
    course_id: "",
    status: "Present",
    date: "",
  });
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    try {
      const res = await api.get("/attendance/");
      setRecords(res.data);
    } catch {
      alert("Failed to load attendance.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/attendance/${editId}`, form);
      } else {
        await api.post("/attendance/", form);
      }
      setForm({ student_id: "", faculty_id: "", course_id: "", status: "Present", date: "" });
      setEditId(null);
      fetchData();
    } catch {
      alert("Error saving attendance.");
    }
  };

  const startEdit = (r) => {
    setEditId(r.id);
    setForm(r);
  };

  const cancelEdit = () => {
    setEditId(null);
    setForm({ student_id: "", faculty_id: "", course_id: "", status: "Present", date: "" });
  };

  return (
    <div className="faculty-container">
      <h2>Attendance Records</h2>
      <form onSubmit={handleSubmit} className="faculty-form">
        <input name="student_id" placeholder="Student ID" value={form.student_id} onChange={handleChange} required />
        <input name="faculty_id" placeholder="Faculty ID" value={form.faculty_id} onChange={handleChange} required />
        <input name="course_id" placeholder="Course ID" value={form.course_id} onChange={handleChange} required />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
        <input type="date" name="date" value={form.date} onChange={handleChange} required />
        <button type="submit" className="btn-primary">{editId ? "Update" : "Add"}</button>
        {editId && <button type="button" onClick={cancelEdit} className="btn-cancel">Cancel</button>}
      </form>

      <table className="faculty-table">
        <thead>
          <tr><th>No.</th><th>Student</th><th>Course</th><th>Status</th><th>Date</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {records.map((r, index) => (
            <tr key={r.id}>
              <td>{index + 1}</td>
              <td>{r.student_id}</td>
              <td>{r.course_id}</td>
              <td>{r.status}</td>
              <td>{r.date}</td>
              <td>
                <button type="button" className="btn-secondary" onClick={() => startEdit(r)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
