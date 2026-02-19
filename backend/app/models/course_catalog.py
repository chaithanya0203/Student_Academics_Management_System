from sqlalchemy import Column, Integer, String
from app.database import Base
from sqlalchemy.orm import relationship

class CourseCatalog(Base):
    __tablename__ = "course_catalog"
    course_id = Column(Integer, primary_key=True, autoincrement=True)
    course_name = Column(String(100), nullable=False)
    credit = Column(Integer, nullable=False)

    marks = relationship("MarksRecords", back_populates="course") # many to many realtionship
