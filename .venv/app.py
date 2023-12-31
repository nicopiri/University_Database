from flask import Flask
from flask_cors import CORS
from flask import request, jsonify
import login_db
import protected_insert
import protected_select
import delete_by_id
import encrypt_password


app = Flask("__Database-Project__")
CORS(app)


@app.route('/try', methods=['GET'])
def get_users():
    id = request.args.get('id')
    password = request.args.get('password')
    value = login_db.check_password(id)
    if value == password:
        return "Logged in successfully"
    else:
        return "Incorrect password"
    
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    id = data.get('id')
    password = data.get('password')

    result = encrypt_password.check_password(id, password)
    if result == False:
        return 'Incorrect Password'
    value= protected_select.get_role_from_id(id)
    if value=='Docente':
        return'Docente'
    return 'Studente'

    
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
    if encrypt_password.pasword_exist(id) is None:
        return 'Password exists for user with id : {}'.format(id)
    
    result = encrypt_password.insert_password(id, password)
    if result == 'Success':
        return 'Password inserted successfully for user with id: {}'.format(id)

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

@app.route('/insert/esame-registrato', methods=['POST'])
def esame_registrato_insert():
    data = request.get_json()
    id_esame = data.get('id_esame')
    id_utente = data.get('id_utente')
    voto = data.get('voto')

    ret =  protected_insert.insert_esami_registrati(id_esame, id_utente , voto)
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

@app.route('/insert/prova-studente', methods=['POST'])
def prova_insert_from_studenti():
    data = request.get_json()
    id_studente = data.get('id_studente')
    id_prova = data.get('id_prova')
    data_appello = data.get('data_appello')

    ret = protected_insert.insert_prova_sostenuta_studente(id_studente,id_prova,data_appello)
    return jsonify(ret)

@app.route('/insert/prova_sostenuta', methods=['POST'])
def prova_sostenuta_insert():
    data = request.get_json()
    id_studente = data.get('studente')
    id_prova = data.get('prova')
    data_appello = data.get('data_appello')  
    data_scadenza = data.get('data_scadenza')
    voto = int(data.get('voto'))  
    valid = data.get('valid')
    superato = voto > 18 
    ret = protected_insert.insert_prova_sostenuta(id_studente, id_prova, data_appello, data_scadenza, voto, valid, superato)
    return jsonify(ret)

@app.route('/insert/prova_sostenuta_short', methods=['POST'])
def prova_sostenuta_insert_short():
    data = request.get_json()
    id_studente = data.get('studente')
    id_prova = data.get('prova')
    data_scandenza = data.get('data_scadenza')
    voto = int(data.get('voto'))  
    valid = data.get('valid')
    superato = voto > 18  
    ret = protected_insert.update_prova_sostenuta_data(id_studente, id_prova, data_scandenza, voto, valid, superato)
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

@app.route('/delete/prova_sostenuta/studente/<int:id_studente>/<int:id_prova>', methods=['DELETE'])
def delete_prova_sostenuta_by_id_studente(id_studente, id_prova):
    ret = delete_by_id.delete_prova_sostenuta_by_id_studente(id_studente, id_prova)
    return jsonify(ret)

@app.route('/delete/prova_gestita/docente/<int:id_docente>/<int:id_prova>', methods=['DELETE'])
def delete_prova_gestita_by_id_docente(id_docente, id_prova):
    ret = delete_by_id.delete_prova_gestita_by_id_docente(id_docente, id_prova)
    return jsonify(ret)

@app.route('/delete/prova_gestita/prova/<int:id_prova>', methods=['DELETE'])
def delete_prova_gestita_by_id_prova(id_prova):
    ret = delete_by_id.delete_prova_gestita_by_id_prova(id_prova)
    return jsonify(ret)

@app.route('/delete/esami_registrati/<int:id_esame>/<int:id_utente>', methods=['DELETE'])
def delete_esami_registrati_by_ids(id_esame, id_utente):
    ret = delete_by_id.delete_esami_registrati_by_id_esame(id_esame, id_utente)
    return jsonify(ret)

@app.route('/delete/esami_registrati/utente/<int:id_utente>', methods=['DELETE'])
def delete_esami_registrati_by_id_utente(id_utente):
    ret = delete_by_id.delete_esami_registrati_by_id_utente(id_utente)
    return jsonify(ret)



@app.route('/get/utente/<int:id_utente>', methods=['GET'])
def get_utente(id_utente):
    val = protected_select.get_dati_utente_from_id(id_utente)
    return jsonify(val)

@app.route('/get/prove_valide/<int:id_studente>', methods=['GET'])
def get_prove_valide(id_studente):
    try:
        prove_valide = protected_select.get_prove_valide(id_studente)
        if prove_valide is not None:
            return jsonify(prove_valide)
        else:
            return jsonify({"error": "Error querying the database"})
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route('/get/storico_prove/<int:id_studente>', methods=['GET'])
def get_storico_prove(id_studente):
    try:
        storico_prove = protected_select.get_storico_prove(id_studente)
        if storico_prove is not None:
            return jsonify(storico_prove)
        else:
            return jsonify({"error": "Error querying the database"})
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route('/get/libretto/<int:id_studente>', methods=['GET'])
def get_libretto(id_studente):
    try:
        libretto = protected_select.get_libretto(id_studente)
        if libretto is not None:
            return jsonify(libretto)
        else:
            return jsonify({"error": "Error querying the database"})
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route('/get/esami/<int:docente_responsabile>', methods=['GET'])
def get_esami_by_docente_responsabile(docente_responsabile):
    try:
        esami = protected_select.get_esami_by_docente_responsabile(docente_responsabile)
        if esami is not None:
            return jsonify(esami)
        else:
            return jsonify({"error": "Error querying the database"})
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route('/get/esami_registrati/<int:docente_responsabile>', methods=['GET'])
def get_esami_registrati_by_docente_responsabile(docente_responsabile):
    try:
        esami = protected_select.get_esami_registrati_by_docente_responsabile(docente_responsabile)
        if esami is not None:
            return jsonify(esami)
        else:
            return jsonify({"error": "Error querying the database"})
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route('/get/esami', methods=['GET'])
def get_exams():
    try:
        exams = protected_select.get_all_esami()
        if exams is not None:
            return jsonify(exams)
        else:
            return jsonify({"error": "Error querying the database"})
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route('/get/prove_gestite/<int:id_docente>', methods=['GET'])
def get_prove_gestite(id_docente):
    try:
        prove_gestite = protected_select.get_prove_gestite_by_id_docente(id_docente)
        if prove_gestite is not None:
            return jsonify(prove_gestite)
        else:
            return jsonify({"error": "Error querying the database"})
    except Exception as e:
        return jsonify({"error": str(e)})


@app.route('/update/password', methods=['POST'])
def password_update():
    data = request.get_json()
    id = data.get('id')
    vecchia_password = data.get('vecchia_password')
    nuova_password = data.get('nuova_password')
    
    result = encrypt_password.update_password(id, vecchia_password, nuova_password)
    return result

@app.route('/get/studenti_registrabili/<int:id_esame>', methods=['GET'])
def get_students_registrabili_by_id_esame(id_esame):
    try:
        studenti = protected_select.get_studenti_registrabili_by_id_esame(id_esame)
        if studenti is not None:
            return jsonify(studenti)
        else:
            return jsonify({"error": "Error querying the database"})
    except Exception as e:
        return jsonify({"error": str(e)})
    
@app.route('/get/prove/docente/<int:id_utente>', methods=['GET'])
def get_prove_by_docente_responsabile(id_utente):
    try:
        prove = protected_select.get_prove_by_docente_responsabile(id_utente)
        if prove is not None:
            return jsonify(prove)
        else:
            return jsonify({"error": "Error querying the database"})
    except Exception as e:
        return jsonify({"error": str(e)})
    
@app.route('/get/students_by_prova_superata/<int:prova_id>', methods=['GET'])
def get_students_by_prova(prova_id):
    students = protected_select.get_students_by_prova_id(prova_id)
    if students is not None:
        return jsonify(students)
    else:
        return jsonify({"error": "Error querying the database"})
    
@app.route('/get/prove-by-esame/<int:esame_id>/<int:student_id>', methods=['GET'])
def get_prove_by_id_esame(esame_id, student_id):
    prove = protected_select.get_prove_by_esame(esame_id, student_id)
    if prove is not None: 
        return jsonify(prove)
    else:
        return jsonify({"error": "Nessuna prova trovata "})

@app.route('/get/student-id-from-prova-id/<int:prova_id>', methods=['GET'])
def get_students_by_prova_id(prova_id):
    prove = protected_select.get_students_by_prova_id(prova_id)
    if prove is not None: 
        return jsonify(prove)
    else:
        return jsonify({"error": "Nessuna prova trovata "})
    
@app.route('/get/prove-sostenute-docente/<int:id_docente>', methods=['GET'])
def get_prove_sostenute_docente(id_docente):
    ret = protected_select.get_prove_sostenute_docente(id_docente)
    if ret is not None: 
        return jsonify(ret)
    else:
        return jsonify({"error": "Nessuna prova trovata "})