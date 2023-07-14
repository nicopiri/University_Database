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
    
@app.route('/insert/utente', methods=['POST'])
def user_insert():
    data = request.get_json()
    nome = data.get('nome')
    cognome  = data.get('cognome')
    cf  = data.get('cf')
    luogo_nascita  = data.get('luogo')
    data_nascita  = data.get('nascita')
    
    ret = protected_insert.insert_utenti(nome, cognome, cf, luogo_nascita, data_nascita)
    return jsonify(ret)

@app.route('/insert/esame', methods=['POST'])
def esame_insert():
    data = request.get_json()
    nome = data.get('nome')
    descrizione = data.get('descrizione')
    min_prove = data.get('min')
    max_prove = data.get('max')
    docente_responsabile = data.get('docente')

    ret =  protected_insert.insert_esame(nome, descrizione, min_prove, max_prove, docente_responsabile)
    return jsonify(ret)


@app.route('/insert/prova', methods=['POST'])
def prova_insert():
    data = request.get_json()
    appello = data.get('appello')
    tipo = data.get('tipo')
    ricaduta_esame = data.get('ricaduta')
    opzionale = data.get('opzionale')
    esame_appartenente = data.get('esame')

    ret = protected_insert.insert_prova(appello, tipo, ricaduta_esame, opzionale, esame_appartenente)
    return jsonify(ret)


@app.route('/insert/prova_sostenuta', methods=['POST'])
def prova_sostenuta_insert():
    data = request.get_json()
    id_studente = data.get('studente')
    id_prova = data.get('prova')
    data_appello = data.get('appello')
    data_superamento = data.get('superamento')
    data_scadenza = data.get('scadenza')
    voto = data.get('voto')

    ret = protected_insert.insert_prova_sostenuta(id_studente, id_prova, data_appello, data_superamento, data_scadenza, voto)
    return jsonify(ret)


@app.route('/insert/prova_gestita', methods=['POST'])
def prova_gestita_insert():
    data = request.get_json()
    id_docente = data.get('docente')
    id_prova = data.get('prova')

    ret = protected_insert.insert_prova_gestita(id_docente, id_prova)
    return jsonify(ret)

