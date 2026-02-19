from app.database import SessionLocal
from app.models.user_credentials import UserCredentials
from app.core import security
import sys

db = SessionLocal()
try:
    user = db.query(UserCredentials).filter(UserCredentials.user_id == "10001").first()
    if user:
        print(f"User found: {user.user_id}")
        print(f"Role: {user.role}")
        print(f"Stored Password (len={len(user.password)}): {user.password}")
        
        try:
            is_valid = security.verify_password("Admin@123", user.password)
            print(f"Password verification result: {is_valid}")
        except Exception as e:
            print(f"Verification failed with error: {e}")
    else:
        print("User 10001 not found")
finally:
    db.close()
