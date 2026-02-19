from sqlalchemy import Column, Integer, String
from app.database import Base

class Section(Base):
    __tablename__ = "section"
    section_id = Column(Integer, primary_key=True, autoincrement=True)
    section_name = Column(String(50), nullable=False)
