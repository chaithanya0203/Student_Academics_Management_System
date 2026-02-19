from passlib.context import CryptContext
try:
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    print("Hashing 'test'...")
    hash = pwd_context.hash("test")
    print(f"Hash: {hash}")
    print("Verifying 'test'...")
    valid = pwd_context.verify("test", hash)
    print(f"Valid: {valid}")
except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()
