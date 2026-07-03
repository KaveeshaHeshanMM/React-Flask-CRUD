from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

db = mysql.connector.connect(
    host="127.0.0.1",
    port=3307,
    user="root",
    password="",
    database="crud_db"
)

@app.route("/")
def home():
    return "Flask Backend Connected to MySQL!"


@app.route("/add", methods=["POST"])
def add_user():
    data = request.get_json()

    name = data["name"]
    age = data["age"]

    cursor = db.cursor()

    sql = "INSERT INTO users (name, age) VALUES (%s, %s)"
    values = (name, age)

    cursor.execute(sql, values)
    db.commit()

    cursor.close()

    return jsonify({"message": "User Added Successfully!"})


@app.route("/users", methods=["GET"])
def get_users():
    cursor = db.cursor(dictionary=True)

    cursor.execute("SELECT * FROM users")

    users = cursor.fetchall()

    cursor.close()

    return jsonify(users)

@app.route("/update/<int:id>", methods=["PUT"])
def update_user(id):
    data = request.get_json()

    name = data["name"]
    age = data["age"]

    cursor = db.cursor()

    sql = "UPDATE users SET name=%s, age=%s WHERE id=%s"
    values = (name, age, id)

    cursor.execute(sql, values)
    db.commit()

    cursor.close()

    return jsonify({"message": "User Updated Successfully!"})

@app.route("/delete/<int:id>", methods=["DELETE"])
def delete_user(id):

    cursor = db.cursor()

    sql = "DELETE FROM users WHERE id=%s"

    cursor.execute(sql, (id,))
    db.commit()

    cursor.close()

    return jsonify({"message": "User Deleted Successfully!"})
    

if __name__ == "__main__":
    app.run(debug=True)