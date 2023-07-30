from flask import Flask
from flask_cors import CORS
from login_controller import api_bp
from flask import request, jsonify
import encrypt_password
import protected_insert
import delete_by_id


app = Flask("__Database-Project__")
CORS(app)


    
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

@app.route('/insert/password', methods=['POST'])
def password_insert():
    data = request.get_json()
    id = data.get('id')
    password = data.get('password')

    if encrypt_password.check_and_encrypt_password(id, password):
        return 'Password already exists for user with id: {}'.format(id)

    result = encrypt_password.insert_password(id, password)
    if result == 'Success':
        return 'Password inserted successfully for user with id: {}'.format(id)
    else:
        return result  # Return the error message in case of an error during insertion

@app.route('/update/password', methods=['POST'])
def password_update():
    data = request.get_json()
    id = data.get('id')
    password = data.get('password')

    result = encrypt_password.update_password(id, password)
    return result




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


@app.route('/delete/utente/<int:id_utente>', methods=['DELETE'])
def delete_utente(id_utente):
    ret = delete_by_id.delete_utente_by_id(id_utente)
    return jsonify(ret)

@app.route('/delete/esame/<int:id_esame>', methods=['DELETE'])
def delete_esame(id_esame):
    ret = delete_by_id.delete_esame_by_id(id_esame)
    return jsonify(ret)

@app.route('/delete/prova/<int:id_prova>', methods=['DELETE'])
def delete_prova(id_prova):
    ret = delete_by_id.delete_prova_by_id(id_prova)
    return jsonify(ret)

@app.route('/delete/prova_sostenuta/studente/<int:id_studente>', methods=['DELETE'])
def delete_prova_sostenuta_by_id_studente(id_studente):
    ret = delete_by_id.delete_prova_sostenuta_by_id_studente(id_studente)
    return jsonify(ret)

@app.route('/delete/prova_gestita/docente/<int:id_docente>', methods=['DELETE'])
def delete_prova_gestita_by_id_docente(id_docente):
    ret = delete_by_id.delete_prova_gestita_by_id_docente(id_docente)
    return jsonify(ret)

@app.route('/delete/prova_sostenuta/prova/<int:id_prova>', methods=['DELETE'])
def delete_prova_sostenuta_by_id_prova(id_prova):
    ret = delete_by_id.delete_prova_sostenuta_by_id_prova(id_prova)
    return jsonify(ret)

@app.route('/delete/prova_gestita/prova/<int:id_prova>', methods=['DELETE'])
def delete_prova_gestita_by_id_prova(id_prova):
    ret = delete_by_id.delete_prova_gestita_by_id_prova(id_prova)
    return jsonify(ret)
