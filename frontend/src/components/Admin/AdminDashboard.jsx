import { useState } from "react";
import SidebarAdmin from "./SidebarAdmin";
import DashboardHome from "./DashboardHome"; // New Component
import AdminInfo from "./AdminInfo";
import StudentInfo from "./StudentInfo";
import FacultyInfo from "./FacultyInfo";
import Section from "./Section";
import CourseCatalog from "./CourseCatalog";
import StudentCourseMap from "./StudentCourseMap";
import FacultyCourseMap from "./FacultyCourseMap";
import SectionCourseMap from "./SectionCourseMap";
import MarksRecords from "./MarksRecords";
import AttendanceRecords from "./AttendanceRecords";
import EmailAlert from "./EmailAlert";
import UserCredentials from "./UserCredentials";
import "../../styles/dashboard-admin.css";
import DashboardLayout from "../common/DashboardLayout";

export default function AdminDashboard() {
  const [view, setView] = useState("home"); // Default to Home
  const components = {
    home: <DashboardHome />,
    studentInfo: <StudentInfo />,
    facultyInfo: <FacultyInfo />,
    adminInfo: <AdminInfo />,
    section: <Section />,
    courseCatalog: <CourseCatalog />,
    studentCourseMap: <StudentCourseMap />,
    facultyCourseMap: <FacultyCourseMap />,
    sectionCourseMap: <SectionCourseMap />,
    marks: <MarksRecords />,
    attendance: <AttendanceRecords />,
    emailAlert: <EmailAlert />,
    userCredentials: <UserCredentials />,
  };

  return (
    <DashboardLayout
      title="Administration Hub"
      subtitle="Manage records, mappings, alerts, and credentials from a single control center."
      sidebar={({ isSidebarOpen, closeSidebar }) => (
        <SidebarAdmin
          activeItem={view}
          setComponent={setView}
          isOpen={isSidebarOpen}
          closeSidebar={closeSidebar}
        />
      )}
    >
      <div className="admin-content">{components[view]}</div>
    </DashboardLayout>
  );
}
