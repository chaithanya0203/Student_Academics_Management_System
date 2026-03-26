from pydantic import BaseModel, ConfigDict


class StudentCourseMapCreate(BaseModel):
    student_id: str
    course_id: int


class StudentCourseMapUpdate(BaseModel):
    student_id: str
    course_id: str


class StudentCourseMapOut(BaseModel):
    id: int
    student_id: str
    course_id: int

    model_config = ConfigDict(from_attributes=True)
