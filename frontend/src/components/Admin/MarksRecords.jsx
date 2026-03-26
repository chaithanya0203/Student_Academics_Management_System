// src/components/admin/MarksRecords.jsx
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function MarksRecords() {
  const [marks, setMarks] = useState([]);

  const loadMarks = async () => {
    try {
      const res = await api.get("/marks/", {
        params: { section_id: "", course_id: "" },
      });
      setMarks(res.data);
    } catch {
      alert("Failed to fetch marks.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await api.delete(`/marks/${id}`);
        loadMarks();
      } catch {
        alert("Delete failed.");
      }
    }
  };

  useEffect(() => {
    loadMarks();
  }, []);

  return (
    <div className="admin-container">
      <h2 className="section-title">Marks Records (Delete Only)</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Student</th>
            <th>Faculty</th>
            <th>Course</th>
            <th>CA1</th>
            <th>CA2</th>
            <th>Mid</th>
            <th>End</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {marks.map((m, index) => (
            <tr key={m.id}>
              <td>{index + 1}</td>
              <td>{m.student_id}</td>
              <td>{m.faculty_id}</td>
              <td>{m.course_id}</td>
              <td>{m.ca1}</td>
              <td>{m.ca2}</td>
              <td>{m.mid_term}</td>
              <td>{m.end_term}</td>
              <td>
                <button className="btn-danger" onClick={() => handleDelete(m.id)}>
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
