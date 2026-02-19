from sqlalchemy import Column, String
from app.database import Base

class UserCredentials(Base):
    __tablename__ = "user_credentials"
    user_id = Column(String(10), primary_key=True)
    password = Column(String(200), nullable=False)
    role = Column(String(20), nullable=False)  # admin, faculty, student
