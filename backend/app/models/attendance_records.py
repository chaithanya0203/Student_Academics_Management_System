from sqlalchemy import Column, Integer, String, ForeignKey, Enum, Date
from app.database import Base

class AttendanceRecords(Base):
    __tablename__ = "attendance_records"
    id = Column(Integer, primary_key=True, autoincrement=True)
    student_id = Column(String(10), ForeignKey("student_info.student_id"))
    faculty_id = Column(String(10), ForeignKey("faculty_info.faculty_id"))
    course_id = Column(Integer, ForeignKey("course_catalog.course_id"))
    status = Column(Enum("Present", "Absent", name="attendance_status"), nullable=False)
    date = Column(Date, nullable=False)
