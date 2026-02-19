from pydantic import BaseModel

class CourseCreate(BaseModel):
    course_name: str
    credit: int


class CourseUpdate(BaseModel):
    course_name: str
    credit: int

class CourseOut(BaseModel):
    course_id: int
    course_name: str
    credit: int

    class Config:
        orm_mode = True  # Required for ORM integration
