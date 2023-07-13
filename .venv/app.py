from flask import Flask
from flask_cors import CORS
import insert_data
from login_controller import api_bp
from flask import request
import login_db


app = Flask("__Database-Project__")
CORS(app)

@app.route('/insert/<name>/<int:age>', methods=['POST'])
def insert(name, age):
    return insert_data.insert(name,age)

@app.route('/get', methods=['GET'])
def get():    
    return insert_data.get()

@app.route('/try', methods=['GET'])
def get_users():
    id = request.args.get('id')
    password = request.args.get('password')
    print(id +" : "+ password)
    value = login_db.check_password(id)
    print(value)
    if value == password:
        return "Logged in successfully"
    else:
        return "Incorrect password"