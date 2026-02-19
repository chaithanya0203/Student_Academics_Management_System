from sqlalchemy import Column, Integer, String, ForeignKey, TIMESTAMP
from sqlalchemy.sql import func
from app.database import Base
from sqlalchemy.orm import relationship

class MarksRecords(Base):
    __tablename__ = "marks_records"
    id = Column(Integer, primary_key=True, autoincrement=True)
    student_id = Column(String(10), ForeignKey("student_info.student_id"))
    faculty_id = Column(String(10), ForeignKey("faculty_info.faculty_id"))
    course_id = Column(Integer, ForeignKey("course_catalog.course_id"))
    

    ca1 = Column(Integer)  # out of 30
    ca2 = Column(Integer)  # out of 30
    mid_term = Column(Integer)  # out of 50
    end_term = Column(Integer)  # out of 50

    course = relationship("CourseCatalog", back_populates="marks")

    created_at = Column(TIMESTAMP, server_default=func.now())
