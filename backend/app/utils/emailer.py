import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

EMAIL_HOST = "smtp.gmail.com"
EMAIL_PORT = 587  # TLS port
EMAIL_USER = "soloking.chaithanya@gmail.com"
EMAIL_PASS = "cawd vmwa antg eypa"

def send_email(to_email: str, subject: str, body: str, html_content=False):
    msg = MIMEMultipart()
    msg["From"] = EMAIL_USER
    msg["To"] = to_email
    msg["Subject"] = subject

    if html_content:
        msg.attach(MIMEText(body, "html"))
    else:
        msg.attach(MIMEText(body, "plain"))

    try:
        with smtplib.SMTP(EMAIL_HOST, EMAIL_PORT) as server:
            server.starttls()
            server.login(EMAIL_USER, EMAIL_PASS)
            server.send_message(msg)
        return True
    except Exception as e:
        print("Email sending failed:", e)
        return False
