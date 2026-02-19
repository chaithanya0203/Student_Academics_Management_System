DROP database if exists hms;
CREATE database hms;
USE hms;

-- Database Setup Script Create tables and seed data
SET FOREIGN_KEY_CHECKS = 0;

-- DROP TABLES (Just in case, though DROP DATABASE handles it)
DROP TABLE IF EXISTS attendance_records;
DROP TABLE IF EXISTS marks_records;
DROP TABLE IF EXISTS student_course_map;
DROP TABLE IF EXISTS section_course_map;
DROP TABLE IF EXISTS faculty_course_map;
DROP TABLE IF EXISTS student_info;
DROP TABLE IF EXISTS user_credentials;
DROP TABLE IF EXISTS course_catalog;
DROP TABLE IF EXISTS section;
DROP TABLE IF EXISTS faculty_info;
DROP TABLE IF EXISTS admin_info;

-- CREATE TABLES
CREATE TABLE admin_info (
	admin_id VARCHAR(10) NOT NULL, 
	name VARCHAR(100) NOT NULL, 
	email VARCHAR(100) NOT NULL, 
	phone VARCHAR(10) NOT NULL, 
	PRIMARY KEY (admin_id), 
	UNIQUE (email)
);

CREATE TABLE faculty_info (
	faculty_id VARCHAR(10) NOT NULL, 
	name VARCHAR(100) NOT NULL, 
	email VARCHAR(100) NOT NULL, 
	phone VARCHAR(10), 
	joining_year INTEGER, 
	PRIMARY KEY (faculty_id), 
	UNIQUE (email)
);

CREATE TABLE section (
	section_id INTEGER NOT NULL AUTO_INCREMENT, 
	section_name VARCHAR(50) NOT NULL, 
	PRIMARY KEY (section_id)
);

CREATE TABLE course_catalog (
	course_id INTEGER NOT NULL AUTO_INCREMENT, 
	course_name VARCHAR(100) NOT NULL, 
	credit INTEGER NOT NULL, 
	PRIMARY KEY (course_id)
);

CREATE TABLE user_credentials (
	user_id VARCHAR(10) NOT NULL, 
	password VARCHAR(200) NOT NULL, 
	`role` VARCHAR(20) NOT NULL, 
	PRIMARY KEY (user_id)
);

CREATE TABLE student_info (
	student_id VARCHAR(10) NOT NULL, 
	name VARCHAR(100) NOT NULL, 
	email VARCHAR(100), 
	phone VARCHAR(10), 
	section_id INTEGER, 
	enrollment_year INTEGER NOT NULL, 
	parent_email VARCHAR(100), 
	PRIMARY KEY (student_id), 
	UNIQUE (email), 
	FOREIGN KEY(section_id) REFERENCES section (section_id)
);

CREATE TABLE faculty_course_map (
	id INTEGER NOT NULL AUTO_INCREMENT, 
	faculty_id VARCHAR(10), 
	course_id INTEGER, 
	PRIMARY KEY (id), 
	FOREIGN KEY(faculty_id) REFERENCES faculty_info (faculty_id), 
	FOREIGN KEY(course_id) REFERENCES course_catalog (course_id)
);

CREATE TABLE section_course_map (
	id INTEGER NOT NULL AUTO_INCREMENT, 
	section_id INTEGER, 
	course_id INTEGER, 
	PRIMARY KEY (id), 
	FOREIGN KEY(section_id) REFERENCES section (section_id), 
	FOREIGN KEY(course_id) REFERENCES course_catalog (course_id)
);

CREATE TABLE student_course_map (
	id INTEGER NOT NULL AUTO_INCREMENT, 
	student_id VARCHAR(10), 
	course_id INTEGER, 
	PRIMARY KEY (id), 
	FOREIGN KEY(student_id) REFERENCES student_info (student_id), 
	FOREIGN KEY(course_id) REFERENCES course_catalog (course_id)
);

CREATE TABLE marks_records (
	id INTEGER NOT NULL AUTO_INCREMENT, 
	student_id VARCHAR(10), 
	faculty_id VARCHAR(10), 
	course_id INTEGER, 
	ca1 INTEGER, 
	ca2 INTEGER, 
	mid_term INTEGER, 
	end_term INTEGER, 
	created_at TIMESTAMP NULL DEFAULT now(), 
	PRIMARY KEY (id), 
	FOREIGN KEY(student_id) REFERENCES student_info (student_id), 
	FOREIGN KEY(faculty_id) REFERENCES faculty_info (faculty_id), 
	FOREIGN KEY(course_id) REFERENCES course_catalog (course_id)
);

CREATE TABLE attendance_records (
	id INTEGER NOT NULL AUTO_INCREMENT, 
	student_id VARCHAR(10), 
	faculty_id VARCHAR(10), 
	course_id INTEGER, 
	status ENUM('Present','Absent') NOT NULL, 
	date DATE NOT NULL, 
	PRIMARY KEY (id), 
	FOREIGN KEY(student_id) REFERENCES student_info (student_id), 
	FOREIGN KEY(faculty_id) REFERENCES faculty_info (faculty_id), 
	FOREIGN KEY(course_id) REFERENCES course_catalog (course_id)
);

-- SEED DATA

-- Sections
INSERT INTO section (section_name) VALUES ('Section A');
INSERT INTO section (section_name) VALUES ('Section B');
INSERT INTO section (section_name) VALUES ('Section C');

-- Courses
INSERT INTO course_catalog (course_name, credit) VALUES ('Mathematics', 4);
INSERT INTO course_catalog (course_name, credit) VALUES ('Physics', 3);
INSERT INTO course_catalog (course_name, credit) VALUES ('Computer Science', 4);

-- Admin User (ID: 100190, Password: Admin@123)
-- Hash generated from bcrypt: $2b$12$X5XFPZGxRd3iSms7Cu.LVuUODXjlTUMGCf868rcEdS2oJL/4Dtpe.
INSERT INTO user_credentials (user_id, password, role) VALUES ('100190', '$2b$12$X5XFPZGxRd3iSms7Cu.LVuUODXjlTUMGCf868rcEdS2oJL/4Dtpe.', 'admin');
INSERT INTO admin_info (admin_id, name, email, phone) VALUES ('100190', 'Administrator', 'admin@example.com', '0000000000');

SET FOREIGN_KEY_CHECKS = 1;
