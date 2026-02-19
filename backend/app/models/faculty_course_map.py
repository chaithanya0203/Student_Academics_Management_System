from sqlalchemy import Column, Integer, String, ForeignKey
from app.database import Base

class FacultyCourseMap(Base):
    __tablename__ = "faculty_course_map"
    id = Column(Integer, primary_key=True, autoincrement=True)
    faculty_id = Column(String(10), ForeignKey("faculty_info.faculty_id"))
    course_id = Column(Integer, ForeignKey("course_catalog.course_id"))
