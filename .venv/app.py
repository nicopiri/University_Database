from flask import Flask
from flask_cors import CORS
import insert_data
from login_controller import api_bp
from flask import request, jsonify
import login_db
import protected_insert


app = Flask("__Database-Project__")
CORS(app)


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
    
@app.route('/insert', methods=['POST'])
def user_insert():
    data = request.get_json()
    nome = data.get('nome')
    cognome  = data.get('cognome')
    cf  = data.get('cf')
    luogo_nascita  = data.get('luogo')
    data_nascita  = data.get('nascita')
    
    ret = protected_insert.insert_utenti(nome, cognome, cf, luogo_nascita, data_nascita)
    return jsonify(ret)
