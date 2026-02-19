// src/pages/FacultyPage.jsx
import { useState } from "react";
import SidebarFaculty from "../components/Faculty/SidebarFaculty";
import AttendanceRecords from "../components/Faculty/AttendanceRecords";
import MarksRecords from "../components/Faculty/MarksRecords";
import FacultyInfo from "../components/Faculty/FacultyInfo";
import "../styles/dashboard-faculty.css";

export default function FacultyPage() {
  const [view, setView] = useState("attendance");

  const components = {
    attendance: <AttendanceRecords />,
    marks: <MarksRecords />,
    profile: <FacultyInfo />,
  };

  return (
    <div className="faculty-dashboard">
      <SidebarFaculty setComponent={setView} />
      <div className="faculty-content">{components[view]}</div>
    </div>
  );
}
