from sqlalchemy import Column, String, Integer, ForeignKey
from app.database import Base

class StudentInfo(Base):
    __tablename__ = "student_info"
    student_id = Column(String(10), primary_key=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True)
    phone = Column(String(10))
    section_id = Column(Integer, ForeignKey("section.section_id"))
    enrollment_year = Column(Integer, nullable=False)
    parent_email = Column(String(100))
