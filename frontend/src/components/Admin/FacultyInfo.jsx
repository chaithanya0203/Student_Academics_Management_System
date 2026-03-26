// src/components/admin/FacultyInfo.jsx
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function FacultyInfo() {
  const [facultyList, setFacultyList] = useState([]);
  const [formData, setFormData] = useState({
    faculty_id: "",
    name: "",
    email: "",
    phone: "",
    joining_year: "",
  });
  const [editId, setEditId] = useState(null);

  const fetchFaculty = async () => {
    try {
      const res = await api.get("/faculty/");
      setFacultyList(res.data);
    } catch {
      alert("Failed to fetch faculty data.");
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/faculty/${editId}`, {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        });
      } else {
        // Remove faculty_id from the payload for POST request
        const { faculty_id, ...postData } = formData;

        // Convert empty string joining_year to null (or omit it)
        if (!postData.joining_year) {
          postData.joining_year = null;
        }

        await api.post("/faculty/", postData);
      }
      setFormData({
        faculty_id: "",
        name: "",
        email: "",
        phone: "",
        joining_year: "",
      });
      setEditId(null);
      fetchFaculty();
    } catch (err) {
      alert("Error: Operation failed.");
    }
  };

  const startEdit = (faculty) => {
    setFormData(faculty);
    setEditId(faculty.faculty_id);
  };

  const cancelEdit = () => {
    setEditId(null);
    setFormData({
      faculty_id: "",
      name: "",
      email: "",
      phone: "",
      joining_year: "",
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this faculty?")) {
      try {
        await api.delete(`/faculty/${id}`);
        fetchFaculty();
      } catch {
        alert("Failed to delete.");
      }
    }
  };

  return (
    <div className="admin-container">
      <h2 className="section-title">Faculty Management</h2>

      <form onSubmit={handleSubmit} className="admin-form">
        {/* ID is auto-generated */}
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        {!editId && (
          <input
            name="joining_year"
            type="number"
            placeholder="Joining Year (optional)"
            value={formData.joining_year}
            onChange={handleChange}
          />
        )}
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
            <th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Joining Year</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {facultyList.map((f) => (
            <tr key={f.faculty_id}>
              <td>{f.faculty_id}</td>
              <td>{f.name}</td>
              <td>{f.email}</td>
              <td>{f.phone}</td>
              <td>{f.joining_year || "-"}</td>
              <td>
                <button className="btn-secondary" onClick={() => startEdit(f)}>Edit</button>
                <button className="btn-danger" onClick={() => handleDelete(f.faculty_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
