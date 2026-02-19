from sqlalchemy import Column, String, Integer
from app.database import Base

class FacultyInfo(Base):
    __tablename__ = "faculty_info"
    faculty_id = Column(String(10), primary_key=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    phone = Column(String(10), nullable=True)
    joining_year = Column(Integer)
