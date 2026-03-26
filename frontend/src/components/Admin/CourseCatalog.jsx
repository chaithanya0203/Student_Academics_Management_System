// src/components/admin/CourseCatalog.jsx
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function CourseCatalog() {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    course_id: "",
    course_name: "",
    credit: "",
  });
  const [editId, setEditId] = useState(null);

  const loadCourses = async () => {
    try {
      const res = await api.get("/courses/");
      setCourses(res.data);
    } catch {
      alert("Failed to fetch courses.");
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      course_name: formData.course_name,
      credit: parseInt(formData.credit),
    };

    try {
      if (editId) {
        await api.put(`/courses/${editId}`, payload);
      } else {
        await api.post("/courses/", payload);
      }
      setFormData({ course_id: "", course_name: "", credit: "" });
      setEditId(null);
      loadCourses();
    } catch {
      alert("Failed to save course.");
    }
  };

  const startEdit = (course) => {
    setEditId(course.course_id);
    setFormData(course);
  };

  const cancelEdit = () => {
    setEditId(null);
    setFormData({ course_id: "", course_name: "", credit: "" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await api.delete(`/courses/${id}`);
        loadCourses();
      } catch {
        alert("Delete failed.");
      }
    }
  };

  return (
    <div className="admin-container">
      <h2 className="section-title">Course Catalog</h2>

      <form onSubmit={handleSubmit} className="admin-form">
        <input
          name="course_name"
          placeholder="Course Name"
          value={formData.course_name}
          onChange={handleChange}
          required
        />
        <input
          name="credit"
          type="number"
          placeholder="Credit"
          value={formData.credit}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn-primary">
          {editId ? "Update" : "Create"}
        </button>
        {editId && (
          <button type="button" className="btn-cancel" onClick={cancelEdit}>
            Cancel
          </button>
        )}
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Course Name</th>
            <th>Credit</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((c) => (
            <tr key={c.course_id}>
              <td>{c.course_id}</td>
              <td>{c.course_name}</td>
              <td>{c.credit}</td>
              <td>
                <button className="btn-secondary" onClick={() => startEdit(c)}>
                  Edit
                </button>
                <button className="btn-danger" onClick={() => handleDelete(c.course_id)}>
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
