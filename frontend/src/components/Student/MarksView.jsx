// src/components/Student/MarksView.jsx
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function MarksView() {
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    api.get("/marks/my")
      .then(res => setMarks(res.data))
      .catch(() => alert("Failed to fetch marks."));
  }, []);

  return (
    <div className="student-container">
      <h2>My Marks</h2>
      <table className="student-table">
        <thead>
          <tr>
            <th>Course</th><th>CA1</th><th>CA2</th><th>Mid</th><th>End</th>
          </tr>
        </thead>
        <tbody>
          {marks.map((m, idx) => (
            <tr key={idx}>
              <td>{m.course_id}</td>
              <td>{m.ca1}</td>
              <td>{m.ca2}</td>
              <td>{m.mid_term}</td>
              <td>{m.end_term}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
