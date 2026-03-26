// src/components/Faculty/MarksRecords.jsx
import { useState, useEffect } from "react";
import api from "../../services/api";

export default function MarksRecords() {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({
    student_id: "",
    faculty_id: "",
    course_id: "",
    ca1: "",
    ca2: "",
    mid_term: "",
    end_term: "",
  });
  const [editId, setEditId] = useState(null);
  const [sectionId, setSectionId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchData = async () => {
    try {
      setError("");
      const params = new URLSearchParams();
      if (sectionId) params.set("section_id", sectionId);
      if (courseId) params.set("course_id", courseId);
      const query = params.toString();
      const res = await api.get(`/marks/${query ? `?${query}` : ""}`);
      setRecords(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to fetch marks.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // auto-load only once

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setSuccess("");
      // Validation
      if (
        (parseInt(form.ca1) > 20) ||
        (parseInt(form.ca2) > 20) ||
        (parseInt(form.mid_term) > 50) ||
        (parseInt(form.end_term) > 50)
      ) {
        alert("Invalid Marks: CA1/CA2 must be <= 20, and Mid/End Term must be <= 50.");
        return;
      }

      if (editId) {
        await api.put(`/marks/${editId}`, form);
      } else {
        const res = await api.post("/marks/", form);
        setRecords((prev) => [res.data, ...prev]);
      }
      setForm({
        student_id: "",
        faculty_id: "",
        course_id: "",
        ca1: "",
        ca2: "",
        mid_term: "",
        end_term: "",
      });
      setEditId(null);
      setSuccess(`Marks ${editId ? "updated" : "created"} successfully.`);
      if (editId || sectionId || courseId) {
        fetchData();
      }
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to save marks.");
    }
  };

  const startEdit = (r) => {
    setEditId(r.id);
    setForm(r);
  };

  const cancelEdit = () => {
    setEditId(null);
    setForm({
      student_id: "",
      faculty_id: "",
      course_id: "",
      ca1: "",
      ca2: "",
      mid_term: "",
      end_term: "",
    });
  };

  return (
    <div className="faculty-container">
      <h2 className="section-title">Marks Management</h2>
      {error ? <div className="error-message">{error}</div> : null}
      {success ? <div className="success-message">{success}</div> : null}

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Section ID"
          value={sectionId}
          onChange={(e) => setSectionId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Course ID"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
        />
        <button type="button" onClick={fetchData} className="btn-secondary">Load Marks</button>
      </div>

      <form onSubmit={handleSubmit} className="faculty-form">
        <input name="student_id" placeholder="Student ID" value={form.student_id} onChange={handleChange} required />
        <input name="faculty_id" placeholder="Faculty ID" value={form.faculty_id} onChange={handleChange} required />
        <input name="course_id" placeholder="Course ID" value={form.course_id} onChange={handleChange} required />
        <input name="ca1" placeholder="CA1" value={form.ca1} onChange={handleChange} type="number" required />
        <input name="ca2" placeholder="CA2" value={form.ca2} onChange={handleChange} type="number" required />
        <input name="mid_term" placeholder="Mid Term" value={form.mid_term} onChange={handleChange} type="number" required />
        <input name="end_term" placeholder="End Term" value={form.end_term} onChange={handleChange} type="number" required />
        <button type="submit" className="btn-primary">{editId ? "Update" : "Create"}</button>
        {editId && <button type="button" onClick={cancelEdit} className="btn-cancel">Cancel</button>}
      </form>

      <table className="faculty-table">
        <thead>
          <tr>
            <th>No.</th><th>Student</th><th>Course</th><th>CA1</th><th>CA2</th><th>Mid</th><th>End</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r, index) => (
            <tr key={r.id}>
              <td>{index + 1}</td>
              <td>{r.student_id}</td>
              <td>{r.course_id}</td>
              <td>{r.ca1}</td>
              <td>{r.ca2}</td>
              <td>{r.mid_term}</td>
              <td>{r.end_term}</td>
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
