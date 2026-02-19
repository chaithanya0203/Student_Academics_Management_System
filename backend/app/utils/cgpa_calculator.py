def calculate_grade(total_marks: float) -> str:
    if total_marks >= 90:
        return "O"
    elif total_marks >= 81:
        return "A+"
    elif total_marks >= 71:
        return "A"
    elif total_marks >= 61:
        return "B+"
    elif total_marks >= 51:
        return "B"
    elif total_marks >= 41:
        return "C"
    elif total_marks == 40:
        return "D"
    else:
        return "F"

GRADE_VALUES = {
    "O": 10,
    "A+": 9,
    "A": 8,
    "B+": 7,
    "B": 6,
    "C": 5,
    "D": 4,
    "F": 0,
}

def compute_cgpa(marks: list) -> float:
    total_weighted_score = 0
    total_credit = 0

    for mark in marks:
        ca_score = ((mark.ca1 + mark.ca2) / 2) * (25 / 30)
        midterm_score = mark.mid_term * (25 / 50)
        endterm_score = mark.end_term  # Already out of 50

        total_score = ca_score + midterm_score + endterm_score

        grade = calculate_grade(total_score)
        grade_point = GRADE_VALUES[grade]

        credit = mark.course.credit
        total_weighted_score += grade_point * credit
        total_credit += credit

    if total_credit == 0:
        return 0.0

    return round(total_weighted_score / total_credit, 2)
