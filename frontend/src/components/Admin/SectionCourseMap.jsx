// src/components/admin/SectionCourseMap.jsx
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function SectionCourseMap() {
  const [mappings, setMappings] = useState([]);
  const [formData, setFormData] = useState({ section_id: "", course_id: "" });
  const [editId, setEditId] = useState(null);

  const loadMappings = async () => {
    try {
      const res = await api.get("/section-course-map/");
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
      section_id: parseInt(formData.section_id),
      course_id: parseInt(formData.course_id),
    };

    try {
      if (editId !== null) {
        await api.put(`/section-course-map/${editId}`, payload);
      } else {
        await api.post("/section-course-map/", payload);
      }
      setFormData({ section_id: "", course_id: "" });
      setEditId(null);
      loadMappings();
    } catch {
      alert("Failed to save mapping.");
    }
  };

  const handleEdit = (map) => {
    setFormData({ section_id: map.section_id, course_id: map.course_id });
    setEditId(map.id);
  };

  const cancelEdit = () => {
    setFormData({ section_id: "", course_id: "" });
    setEditId(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this mapping?")) {
      try {
        await api.delete(`/section-course-map/${id}`);
        loadMappings();
      } catch {
        alert("Failed to delete mapping.");
      }
    }
  };

  return (
    <div className="admin-container">
      <h2 className="section-title">Section–Course Mapping</h2>

      <form onSubmit={handleSubmit} className="admin-form">
        <input
          name="section_id"
          placeholder="Section ID"
          type="number"
          value={formData.section_id}
          onChange={handleChange}
          required
        />
        <input
          name="course_id"
          placeholder="Course ID"
          type="number"
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
            <th>Section ID</th>
            <th>Course ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mappings.map((map, index) => (
            <tr key={map.id}>
              <td>{index + 1}</td>
              <td>{map.section_id}</td>
              <td>{map.course_id}</td>
              <td>
                <button type="button" className="btn-secondary" onClick={() => handleEdit(map)}>
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
