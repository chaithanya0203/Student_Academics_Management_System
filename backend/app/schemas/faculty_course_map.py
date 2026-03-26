from pydantic import BaseModel, ConfigDict


class FacultyCourseMapCreate(BaseModel):
    faculty_id: str
    course_id: int


class FacultyCourseMapOut(BaseModel):
    id: int
    faculty_id: str
    course_id: int

    model_config = ConfigDict(from_attributes=True)
