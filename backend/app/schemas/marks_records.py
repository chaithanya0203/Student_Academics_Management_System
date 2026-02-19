from pydantic import BaseModel, Field
from typing import Optional


class MarksCreate(BaseModel):
    student_id: str
    faculty_id: str
    course_id: int
    ca1: int = Field(..., ge=0, le=30)
    ca2: int = Field(..., ge=0, le=30)
    mid_term: int = Field(..., ge=0, le=50)
    end_term: int = Field(..., ge=0, le=50)


class MarksUpdate(BaseModel):
    ca1: Optional[float] = None
    ca2: Optional[float] = None
    mid_term: Optional[float] = None
    end_term: Optional[float] = None

class MarksOut(BaseModel):
    id: int
    student_id: str
    faculty_id: str
    course_id: int
    ca1: int
    ca2: int
    mid_term: int
    end_term: int

    class Config:
        orm_mode = True
