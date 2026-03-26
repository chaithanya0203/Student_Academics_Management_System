from datetime import date
from typing import Optional

from pydantic import BaseModel, ConfigDict, constr


class AttendanceCreate(BaseModel):
    student_id: str
    faculty_id: str
    course_id: int
    status: constr(pattern="^(Present|Absent)$")
    date: date


class AttendanceUpdate(BaseModel):
    status: Optional[constr(pattern="^(Present|Absent)$")] = None
    date: Optional[date] = None


class AttendanceOut(BaseModel):
    id: int
    student_id: str
    faculty_id: str
    course_id: int
    status: str
    date: date

    model_config = ConfigDict(from_attributes=True)
