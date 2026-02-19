// src/pages/StudentPage.jsx
import { useState } from "react";
import SidebarStudent from "../components/Student/SidebarStudent";
import AttendanceView from "../components/Student/AttendanceView";
import MarksView from "../components/Student/MarksView";
import CgpaView from "../components/Student/CgpaView";
import "../styles/dashboard-student.css";

export default function StudentPage() {
  const [view, setView] = useState("attendance");

  const views = {
    attendance: <AttendanceView />,
    marks: <MarksView />,
    cgpa: <CgpaView />,
  };

  return (
    <div className="student-dashboard">
      <SidebarStudent setComponent={setView} />
      <div className="student-content">{views[view]}</div>
    </div>
  );
}
