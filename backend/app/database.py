from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Direct MySQL connection details
DATABASE_URL = "mysql+mysqlconnector://root:Naruto$555@localhost:3306/hms"
print(f"Connecting to DB: {DATABASE_URL}")

# SQLAlchemy engine
engine = create_engine(
    DATABASE_URL,
    connect_args={"connect_timeout": 5}
)

# Session and base
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Database session dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
