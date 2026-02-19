from pydantic import BaseModel, constr
from datetime import date
from typing import Optional

class AttendanceCreate(BaseModel):
    student_id: str
    faculty_id: str
    course_id: int
    status: constr(pattern='^(Present|Absent)$')  # restricts to Present or Absent
    date: date

class AttendanceUpdate(BaseModel):
    status: Optional[constr(pattern='^(Present|Absent)$')] = None
    date: Optional[date] = None

class AttendanceOut(BaseModel):
    id: int
    student_id: str
    faculty_id: str
    course_id: int
    status: str
    date: date

    class Config:
        orm_mode = True  # ✅ for SQLAlchemy model support
