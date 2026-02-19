from app.database import SessionLocal
from app.models.user_credentials import UserCredentials
from app.core import security
import sys

db = SessionLocal()
try:
    # Delete existing user
    user = db.query(UserCredentials).filter(UserCredentials.user_id == "100190").first()
    if user:
        print("Found existing user 100190. Deleting...")
        db.delete(user)
        db.commit()
        print("User deleted.")
    
    # Create new user
    print("Creating new user 100190...")
    hashed_password = security.hash_password("Admin@123")
    new_user = UserCredentials(
        user_id="100190",
        password=hashed_password,
        role="admin"
    )
    db.add(new_user)
    db.commit()
    print("User 100190 created successfully.")
    
    # Verify immediately
    print("Verifying password...")
    if security.verify_password("Admin@123", hashed_password):
        print("✅ Verification successful!")
    else:
        print("❌ Verification failed immediately after creation.")

except Exception as e:
    print(f"Error: {e}")
finally:
    db.close()
