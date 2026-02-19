import mysql.connector
import os
from dotenv import load_dotenv

load_dotenv(dotenv_path="app/.env")

mydb = mysql.connector.connect(
  host=os.getenv("DB_HOST"),
  user=os.getenv("DB_USER"),
  password=os.getenv("DB_PASSWORD"),
  port=os.getenv("DB_PORT")
)

mycursor = mydb.cursor()

db_name = os.getenv("DB_NAME")
print(f"Checking if database '{db_name}' exists...")
mycursor.execute(f"CREATE DATABASE IF NOT EXISTS {db_name}")
print(f"Database '{db_name}' ensured.")

mydb.close()
