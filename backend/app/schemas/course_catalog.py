from pydantic import BaseModel, ConfigDict


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

    model_config = ConfigDict(from_attributes=True)
