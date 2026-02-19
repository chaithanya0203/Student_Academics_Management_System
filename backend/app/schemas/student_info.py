from pydantic import BaseModel, EmailStr, constr
from typing import Optional

class StudentCreate(BaseModel):
    student_id: Optional[str] = None
    name: str
    email: Optional[EmailStr] = None
    phone: constr(min_length=10, max_length=10, pattern=r'^\d+$')
    section_id: int
    enrollment_year: int
    parent_email: Optional[EmailStr] = None

class StudentUpdate(BaseModel):
    name: str
    email: EmailStr
    phone: constr(min_length=10, max_length=10, pattern=r'^\d+$')
    section_id: Optional[int] = None
    enrollment_year: Optional[int] = None
    parent_email: Optional[EmailStr] = None

class StudentOut(BaseModel):
    student_id: str
    name: str
    email: Optional[EmailStr]
    phone: str
    section_id: int
    enrollment_year: int
    parent_email: Optional[EmailStr]

    class Config:
        orm_mode = True
