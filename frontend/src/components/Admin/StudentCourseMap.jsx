// src/components/admin/StudentCourseMap.jsx
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function StudentCourseMap() {
  const [mappings, setMappings] = useState([]);
  const [formData, setFormData] = useState({ student_id: "", course_id: "" });
  const [editId, setEditId] = useState(null);

  const loadMappings = async () => {
    try {
      const res = await api.get("/student-course-map/");
      setMappings(res.data);
    } catch {
      alert("Failed to load mappings.");
    }
  };

  useEffect(() => {
    loadMappings();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      student_id: formData.student_id,
      course_id: parseInt(formData.course_id),
    };

    try {
      if (editId !== null) {
        await api.put(`/student-course-map/${editId}`, payload);
      } else {
        await api.post("/student-course-map/", payload);
      }
      setFormData({ student_id: "", course_id: "" });
      setEditId(null);
      loadMappings();
    } catch {
      alert("Failed to save mapping.");
    }
  };

  const startEdit = (map) => {
    setFormData({ student_id: map.student_id, course_id: map.course_id });
    setEditId(map.id);
  };

  const cancelEdit = () => {
    setFormData({ student_id: "", course_id: "" });
    setEditId(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this mapping?")) {
      try {
        await api.delete(`/student-course-map/${id}`);
        loadMappings();
      } catch {
        alert("Failed to delete mapping.");
      }
    }
  };

  return (
    <div className="admin-container">
      <h2 className="section-title">Student–Course Mapping</h2>

      <form onSubmit={handleSubmit} className="admin-form">
        <input
          name="student_id"
          placeholder="Student ID"
          value={formData.student_id}
          onChange={handleChange}
          required
        />
        <input
          name="course_id"
          type="number"
          placeholder="Course ID"
          value={formData.course_id}
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
            <th>No.</th>
            <th>Student ID</th>
            <th>Course ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mappings.map((map, index) => (
            <tr key={map.id}>
              <td>{index + 1}</td>
              <td>{map.student_id}</td>
              <td>{map.course_id}</td>
              <td>
                <button type="button" className="btn-secondary" onClick={() => startEdit(map)}>
                  Edit
                </button>
                <button type="button" className="btn-danger" onClick={() => handleDelete(map.id)}>
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
