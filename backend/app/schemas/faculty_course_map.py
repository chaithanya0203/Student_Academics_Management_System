from pydantic import BaseModel

class FacultyCourseMapCreate(BaseModel):
    faculty_id: str
    course_id: int

class FacultyCourseMapOut(BaseModel):
    id: int
    faculty_id: str
    course_id: int

    class Config:
        orm_mode = True
