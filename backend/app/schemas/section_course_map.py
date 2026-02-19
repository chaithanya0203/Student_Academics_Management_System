from pydantic import BaseModel
from typing import Optional

class SectionCourseMapCreate(BaseModel):
    section_id: int
    course_id: int

class SectionCourseMapUpdate(BaseModel):
    section_id: Optional[int] = None
    course_id: Optional[int] = None

class SectionCourseMapOut(BaseModel):
    id: int
    section_id: int
    course_id: int

    class Config:
        orm_mode = True
