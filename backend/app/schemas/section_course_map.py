from typing import Optional

from pydantic import BaseModel, ConfigDict


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

    model_config = ConfigDict(from_attributes=True)
