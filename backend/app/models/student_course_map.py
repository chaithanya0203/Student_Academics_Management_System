from sqlalchemy import Column, Integer, String, ForeignKey
from app.database import Base

class StudentCourseMap(Base):
    __tablename__ = "student_course_map"
    id = Column(Integer, primary_key=True, autoincrement=True)
    student_id = Column(String(10), ForeignKey("student_info.student_id"))
    course_id = Column(Integer, ForeignKey("course_catalog.course_id"))
