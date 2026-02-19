from sqlalchemy import Column, Integer, ForeignKey
from app.database import Base

class SectionCourseMap(Base):
    __tablename__ = "section_course_map"
    id = Column(Integer, primary_key=True, autoincrement=True)
    section_id = Column(Integer, ForeignKey("section.section_id"))
    course_id = Column(Integer, ForeignKey("course_catalog.course_id"))
