// src/components/Admin/StudentInfo.jsx
import { useState, useEffect } from "react";
import api from "../../services/api";

export default function StudentInfo() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    student_id: "",
    name: "",
    email: "",
    phone: "",
    section_id: "",
    enrollment_year: "",
    parent_email: "",
  });
  const [editId, setEditId] = useState(null);

  const refresh = async () => {
    try {
      const { data: resp } = await api.get("/student/");
      setData(resp);
    } catch (error) {
      console.error("Failed to fetch students", error);
    }
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        section_id: parseInt(form.section_id),
        enrollment_year: parseInt(form.enrollment_year),
        parent_email: form.parent_email,
      };

      if (editId) {
        await api.put(`/student/${editId}`, payload);
      } else {
        await api.post("/student/", {
          ...payload,
        });
      }

      resetForm();
      refresh();
    } catch (err) {
      alert("Error: " + (err.response?.data?.detail || "Submission failed"));
    }
  };

  const resetForm = () => {
    setForm({
      student_id: "",
      name: "",
      email: "",
      phone: "",
      section_id: "",
      enrollment_year: "",
      parent_email: "",
    });
    setEditId(null);
  };

  const startEdit = (s) => {
    setForm({ ...s });
    setEditId(s.student_id);
  };

  const remove = async (id) => {
    if (window.confirm("Are you sure?")) {
      await api.delete(`/student/${id}`);
      refresh();
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className="admin-container">
      <h2 className="section-title">Student Management</h2>

      <form onSubmit={handleSubmit} className="admin-form">
        {/* ID is auto-generated */}
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <input
          name="section_id"
          type="number"
          placeholder="Section ID"
          value={form.section_id}
          onChange={handleChange}
          required
        />
        <input
          name="enrollment_year"
          type="number"
          placeholder="Enrollment Year"
          value={form.enrollment_year}
          onChange={handleChange}
          required
        />
        <input
          name="parent_email"
          type="email"
          placeholder="Parent Email"
          value={form.parent_email}
          onChange={handleChange}
        />

        <button className="btn-primary" type="submit">
          {editId ? "Update" : "Create"}
        </button>
        {editId && (
          <button type="button" className="btn-cancel" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Phone</th>
            <th>Section</th><th>Year</th><th>Parent Email</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((s) => (
            <tr key={s.student_id}>
              <td>{s.student_id}</td>
              <td>{s.name}</td>
              <td>{s.email || "-"}</td>
              <td>{s.phone}</td>
              <td>{s.section_id}</td>
              <td>{s.enrollment_year}</td>
              <td>{s.parent_email || "-"}</td>
              <td>
                <button className="btn-secondary" onClick={() => startEdit(s)}>Edit</button>
                <button className="btn-danger" onClick={() => remove(s.student_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
