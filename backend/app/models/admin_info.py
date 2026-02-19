from sqlalchemy import Column, String
from app.database import Base

class AdminInfo(Base):
    __tablename__ = "admin_info"
    admin_id = Column(String(10), primary_key=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    phone = Column(String(10), nullable=False)
