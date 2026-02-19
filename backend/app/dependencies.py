from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError
from app.core import security

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = security.decode_access_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )
    return payload

def get_current_active_user(required_role):
    def wrapper(payload: dict = Depends(get_current_user)):
        # Handle both single role (string) and multiple roles (list)
        if isinstance(required_role, list):
            if payload.get("role") not in required_role:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Insufficient privileges"
                )
        else:
            if payload.get("role") != required_role:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Insufficient privileges"
                )
        return payload
    return wrapper

# Role-based wrappers (optional helpers)
get_current_active_student_user = get_current_active_user("student")
get_current_active_faculty_user = get_current_active_user("faculty")
get_current_active_admin_user = get_current_active_user("admin")
