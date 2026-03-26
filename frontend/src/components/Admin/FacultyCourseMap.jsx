// src/components/admin/FacultyCourseMap.jsx
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function FacultyCourseMap() {
  const [mappings, setMappings] = useState([]);
  const [formData, setFormData] = useState({ faculty_id: "", course_id: "" });
  const [editId, setEditId] = useState(null);

  const loadMappings = async () => {
    try {
      const res = await api.get("/faculty-course-map/");
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
      faculty_id: formData.faculty_id,
      course_id: parseInt(formData.course_id),
    };

    try {
      if (editId !== null) {
        // No update endpoint, so emulate with delete + create
        await api.delete(`/faculty-course-map/${editId}`);
        await api.post("/faculty-course-map/", payload);
      } else {
        await api.post("/faculty-course-map/", payload);
      }
      setFormData({ faculty_id: "", course_id: "" });
      setEditId(null);
      loadMappings();
    } catch {
      alert("Failed to save mapping.");
    }
  };

  const startEdit = (map) => {
    setFormData({ faculty_id: map.faculty_id, course_id: map.course_id });
    setEditId(map.id);
  };

  const cancelEdit = () => {
    setFormData({ faculty_id: "", course_id: "" });
    setEditId(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this mapping?")) {
      try {
        await api.delete(`/faculty-course-map/${id}`);
        loadMappings();
      } catch {
        alert("Failed to delete mapping.");
      }
    }
  };

  return (
    <div className="admin-container">
      <h2 className="section-title">Faculty–Course Mapping</h2>

      <form onSubmit={handleSubmit} className="admin-form">
        <input
          name="faculty_id"
          placeholder="Faculty ID"
          value={formData.faculty_id}
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
            <th>Faculty ID</th>
            <th>Course ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mappings.map((map, index) => (
            <tr key={map.id}>
              <td>{index + 1}</td>
              <td>{map.faculty_id}</td>
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
