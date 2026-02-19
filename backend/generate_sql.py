import sys
from sqlalchemy import create_engine
from sqlalchemy.dialects import mysql
from app.database import Base
from app.models import (
    admin_info,
    faculty_info,
    student_info,
    section,
    course_catalog,
    faculty_course_map,
    student_course_map,
    marks_records,
    attendance_records,
    section_course_map,
    user_credentials,
)
from app.core.security import hash_password

def dump(sql, *multiparams, **params):
    # This function will be called by the executor
    # We'll just write the statement to our global file handle
    compiled = sql.compile(dialect=mysql.dialect())
    sql_str = str(compiled).strip()
    # Add semicolon
    outfile.write(f"{sql_str};\n")

outfile = None

def generate_ddl():
    global outfile
    # Create a mock engine to dump DDL
    url = "mysql+mysqlconnector://mock:mock@localhost/mock"
    mock_engine = create_engine(url, strategy="mock", executor=dump)
    
    with open("database_setup.sql", "w", encoding="utf-8") as f:
        outfile = f
        f.write("-- Database Setup Script\n")
        f.write("-- Generated automatically\n")
        f.write("SET FOREIGN_KEY_CHECKS = 0;\n")
        
        print("Generating DROP statements...")
        f.write("\n-- DROP TABLES\n")
        # We manually list drops or reuse metadata.
        # But drop_all with mock engine might be tricky if not supported.
        # Let's just create_all, users should DROP DATABASE usually.
        # However, to fix "Data too long" on existing tables, we MUST drop them.
        # Let's try drop_all
        try:
            Base.metadata.drop_all(mock_engine)
        except:
            pass # Mock might fail on drops if not fully implemented

        print("Generating CREATE statements...")
        f.write("\n-- CREATE TABLES\n")
        Base.metadata.create_all(mock_engine, checkfirst=False)
        
        f.write("\n-- SEED DATA\n")
        
        # Sections
        f.write("\n-- Sections\n")
        f.write("INSERT INTO section (section_name) VALUES ('Section A');\n")
        f.write("INSERT INTO section (section_name) VALUES ('Section B');\n")
        f.write("INSERT INTO section (section_name) VALUES ('Section C');\n")

        # Courses (Optional but helpful)
        f.write("\n-- Courses\n")
        f.write("INSERT INTO course_catalog (course_name, credit) VALUES ('Mathematics', 4);\n")
        f.write("INSERT INTO course_catalog (course_name, credit) VALUES ('Physics', 3);\n")
        f.write("INSERT INTO course_catalog (course_name, credit) VALUES ('Computer Science', 4);\n")

        # Admin User
        admin_password = "Admin@123"
        hashed = hash_password(admin_password)
        f.write(f"\n-- Admin User (ID: 100190, Password: {admin_password})\n")
        f.write(f"INSERT INTO user_credentials (user_id, password, role) VALUES ('100190', '{hashed}', 'admin');\n")
        f.write(f"INSERT INTO admin_info (admin_id, name, email, phone) VALUES ('100190', 'Administrator', 'admin@example.com', '0000000000');\n")
        
        f.write("\nSET FOREIGN_KEY_CHECKS = 1;\n")

if __name__ == "__main__":
    generate_ddl()
