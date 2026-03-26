// src/components/admin/Section.jsx
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function Section() {
  const [sections, setSections] = useState([]);
  const [formData, setFormData] = useState({
    section_id: "",
    section_name: "",
  });
  const [editId, setEditId] = useState(null);

  const loadData = async () => {
    try {
      const res = await api.get("/section/");
      setSections(res.data);
    } catch {
      alert("Failed to load sections.");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/section/${editId}`, {
          name: formData.section_name,
        });
      } else {
        await api.post("/section/", {
          section_name: formData.section_name,
        });
      }
      setFormData({ section_id: "", section_name: "" });
      setEditId(null);
      loadData();
    } catch {
      alert("Failed to save section.");
    }
  };

  const startEdit = (section) => {
    setEditId(section.section_id);
    setFormData(section);
  };

  const cancelEdit = () => {
    setEditId(null);
    setFormData({ section_id: "", section_name: "" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this section?")) {
      try {
        await api.delete(`/section/${id}`);
        loadData();
      } catch {
        alert("Delete failed.");
      }
    }
  };

  return (
    <div className="admin-container">
      <h2 className="section-title">Section Management</h2>

      <form onSubmit={handleSubmit} className="admin-form">
        <input
          name="section_name"
          placeholder="Section Name"
          value={formData.section_name}
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
            <th>Section Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sections.map((sec) => (
            <tr key={sec.section_id}>
              <td>{sec.section_id}</td>
              <td>{sec.section_name}</td>
              <td>
                <button className="btn-secondary" onClick={() => startEdit(sec)}>Edit</button>
                <button className="btn-danger" onClick={() => handleDelete(sec.section_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
