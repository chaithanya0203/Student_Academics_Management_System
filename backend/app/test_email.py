import smtplib
from email.mime.text import MIMEText

EMAIL_USER = "mylpujourney@gmail.com"
EMAIL_PASS = "sswo juhi iwio xtsw"

msg = MIMEText("This is a test email from your backend project")
msg["Subject"] = "SMTP Test"
msg["From"] = EMAIL_USER
msg["To"] = "your_target_email@gmail.com"

with smtplib.SMTP("smtp.gmail.com", 587) as server:
    server.starttls()
    server.login(EMAIL_USER, EMAIL_PASS)
    server.send_message(msg)

print("Email sent successfully!")