import psycopg2
import connection

def insert_studente(id_utente, nome, cognome, codice_fiscale, luogo_nascita, data_nascita, data_immatricolazione, ruolo):
    try:
        conn = connection.open_db()
        cursor = conn.cursor()
        query = "INSERT INTO utenti (id_utente, nome, cognome, codice_fiscale, luogo_nascita, data_nascita, data_immatricolazione, ruolo) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
        values = (id_utente, nome, cognome, codice_fiscale, luogo_nascita, data_nascita, data_immatricolazione, ruolo)
        cursor.execute(query, values)
        conn.commit()
        connection.close_db(exception=None)
        return 'Data inserted successfully!'

    except psycopg2.Error as e:
        return 'Error inserting data: {}'.format(e)

def insert_ruolo(id, ruolo):
    try:
        conn = connection.open_db()
        cursor = conn.cursor()
        query = "INSERT INTO ruoli (id, ruolo) VALUES (%s, %s)"
        values = (id, ruolo)
        cursor.execute(query, values)
        conn.commit()
        connection.close_db(exception=None)
        return 'Data inserted successfully!'

    except psycopg2.Error as e:
        return 'Error inserting data: {}'.format(e)

def insert_esame(id_esame, nome, descrizione, min_prove, max_prove, docente_responsabile):
    try:
        conn = connection.open_db()
        cursor = conn.cursor()
        query = "INSERT INTO esami (id_esame, nome, descrizione, min_prove, max_prove, docente_responsabile) VALUES (%s, %s, %s, %s, %s, %s)"
        values = (id_esame, nome, descrizione, min_prove, max_prove, docente_responsabile)
        cursor.execute(query, values)
        conn.commit()
        connection.close_db(exception=None)
        return 'Data inserted successfully!'

    except psycopg2.Error as e:
        return 'Error inserting data: {}'.format(e)

def insert_prova(id_prova, appello, tipo, ricaduta_esame, opzionale, esame_appartenente):
    try:
        conn = connection.open_db()
        cursor = conn.cursor()
        query = "INSERT INTO prove (id_prova, appello, tipo, ricaduta_esame, opzionale, esame_appartenente) VALUES (%s, %s, %s, %s, %s, %s)"
        values = (id_prova, appello, tipo, ricaduta_esame, opzionale, esame_appartenente)
        cursor.execute(query, values)
        conn.commit()
        connection.close_db(exception=None)
        return 'Data inserted successfully!'

    except psycopg2.Error as e:
        return 'Error inserting data: {}'.format(e)

def insert_prova_sostenuta(id_studente, id_prova, data_appello, data_superamento, data_scadenza, voto):
    try:
        conn = connection.open_db()
        cursor = conn.cursor()
        query = "INSERT INTO prove_sostenuta (id_studente, id_prova, data_appello, data_superamento, data_scadenza, voto) VALUES (%s, %s, %s, %s, %s, %s)"
        values = (id_studente, id_prova, data_appello, data_superamento, data_scadenza, voto)
        cursor.execute(query, values)
        conn.commit()
        connection.close_db(exception=None)
        return 'Data inserted successfully!'

    except psycopg2.Error as e:
        return 'Error inserting data: {}'.format(e)

def insert_prova_gestita(id_docente, id_prova):
    try:
        conn = connection.open_db()
        cursor = conn.cursor()
        query = "INSERT INTO prova_gestita (id_docente, id_prova) VALUES (%s, %s)"
        values = (id_docente, id_prova)
        cursor.execute(query, values)
        conn.commit()
        connection.close_db(exception=None)
        return 'Data inserted successfully!'

    except psycopg2.Error as e:
        return 'Error inserting data: {}'.format(e)
