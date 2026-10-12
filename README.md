# User Management – React + Flask + MySQL

A small full-stack CRUD app I built to practise connecting a React frontend to a Python backend and a MySQL database. You can add, view, update and delete users.

## Built with

- **Frontend:** React 19, Vite
- **Backend:** Python, Flask, Flask-CORS
- **Database:** MySQL (`mysql-connector-python`)

## API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | Get all users |
| POST | `/add` | Add a user (`name`, `age`) |
| PUT | `/update/<id>` | Update a user |
| DELETE | `/delete/<id>` | Delete a user |

## Run it

**Database**
```sql
CREATE DATABASE crud_db;
USE crud_db;
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  age INT
);
```

**Backend**
```bash
cd backend
pip install flask flask-cors mysql-connector-python
python app.py
```
Update the host, port, user and password in `app.py` to match your MySQL setup.

**Frontend**
```bash
cd frontend
npm install
npm run dev
```
