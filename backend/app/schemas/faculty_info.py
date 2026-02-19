from pydantic import BaseModel, EmailStr, constr
from typing import Optional

class FacultyCreate(BaseModel):
    faculty_id: Optional[str] = None
    name: str
    email: EmailStr
    phone: constr(min_length=10, max_length=10, pattern=r'^\d+$')
    joining_year: Optional[int] = None

class FacultyUpdate(BaseModel):
    name: str
    email: EmailStr
    phone: constr(min_length=10, max_length=10, pattern=r'^\d+$')

class FacultyOut(BaseModel):
    faculty_id: str
    name: str
    email: EmailStr
    phone: str
    joining_year: Optional[int]

    class Config:
        orm_mode = True
