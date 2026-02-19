from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.dependencies import get_current_active_user
from app.models.student_info import StudentInfo
from app.models.marks_records import MarksRecords
from app.utils.cgpa_calculator import compute_cgpa
from app.utils.emailer import send_email
from app.schemas.email_alerts import StudentNotifyRequest

router = APIRouter(prefix="/email", tags=["Email"])

@router.post("/notify", dependencies=[Depends(get_current_active_user(["admin", "faculty"]))])
def notify_parent_about_performance(payload: StudentNotifyRequest, db: Session = Depends(get_db)):
    student_id = payload.student_id

    student = db.query(StudentInfo).filter_by(student_id=student_id).first()
    if not student or not student.parent_email:
        raise HTTPException(status_code=404, detail="Student or parent email not found.")

    marks = db.query(MarksRecords).filter_by(student_id=student_id).all()
    if not marks:
        raise HTTPException(status_code=404, detail="No marks found for this student.")

    cgpa = compute_cgpa(marks)
    subject = f"Academic Performance Report for {student.name}"

    # Build HTML email body
    body = f"""
    <html>
    <body>
    <p>Dear Parent,</p>

    <p>We are sharing the academic performance report of your child: <b>{student.name}</b>.</p>

    <div style="text-align: center; font-size: 28px; color: #28a745; font-weight: bold; margin: 20px;">
        CGPA: {cgpa:.2f}
    </div>

    <p><b>Detailed Marks:</b></p>

    <table border="1" cellpadding="6" cellspacing="0" style="border-collapse: collapse;">
      <tr>
        <th>Course ID</th>
        <th>CA1</th>
        <th>CA1 Weighted</th>
        <th>CA2</th>
        <th>CA2 Weighted</th>
        <th>Mid</th>
        <th>Mid Weighted</th>
        <th>End</th>
        <th>End Weighted</th>
        <th>Total Weighted</th>
      </tr>
    """

    for m in marks:
        ca1_weight = m.ca1 * (25 / 30)
        ca2_weight = m.ca2 * (25 / 30)
        ca_avg = (m.ca1 + m.ca2) / 2
        ca_score = ca_avg * (25 / 30)
        mid_weight = m.mid_term * (25 / 50)
        end_weight = m.end_term
        total_score = ca_score + mid_weight + end_weight

        body += f"""
        <tr>
            <td>{m.course_id}</td>
            <td>{m.ca1}/30</td>
            <td>{ca1_weight:.2f}</td>
            <td>{m.ca2}/30</td>
            <td>{ca2_weight:.2f}</td>
            <td>{m.mid_term}/50</td>
            <td>{mid_weight:.2f}</td>
            <td>{m.end_term}/50</td>
            <td>{end_weight:.2f}</td>
            <td><b>{total_score:.2f}/100</b></td>
        </tr>
        """

    body += """
    </table>

    <p>Regards,<br>Academic Office</p>
    </body>
    </html>
    """

    success = send_email(
        to_email=student.parent_email,
        subject=subject,
        body=body,
        html_content=True
    )

    if not success:
        raise HTTPException(status_code=500, detail="Email failed to send.")

    return {"message": f"Email sent successfully to {student.parent_email}"}
