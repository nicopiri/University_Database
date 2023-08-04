import psycopg2
import connection
import bleach


def insert_utenti(nome, cognome, codice_fiscale, luogo_nascita, data_nascita):
    try:
        conn = connection.open_db()
        cursor = conn.cursor()
        query = """
                    INSERT INTO utenti (nome, cognome, codice_fiscale, luogo_nascita, data_nascita, data_immatricolazione, ruolo) 
                    VALUES (%s, %s, %s, %s, %s, CURRENT_DATE, 1)
                    RETURNING id_utente
                """
        values = (
            bleach.clean(nome),
            bleach.clean(cognome),
            bleach.clean(codice_fiscale),
            bleach.clean(luogo_nascita),
            bleach.clean(data_nascita)
        )
        cursor.execute(query, values)
        inserted_id = cursor.fetchone()[0]
        conn.commit()
        connection.close_db(conn)
        return f'Data inserted successfully! ID: {inserted_id}'

    except psycopg2.Error as e:
        return f'Error inserting data: {e}'



def insert_esame(nome, descrizione, min_prove, max_prove, docente_responsabile):
    try:
        conn = connection.open_db()
        cursor = conn.cursor()
        query = """
                INSERT INTO esami (nome, descrizione, min_prove, max_prove, docente_responsabile) 
                VALUES (%s, %s, %s, %s, %s)
                RETURNING id_esame
                """
        values = (
            bleach.clean(nome),
            bleach.clean(descrizione),
            bleach.clean(min_prove),
            bleach.clean(max_prove),
            bleach.clean(docente_responsabile)
        )
        cursor.execute(query, values)
        inserted_id = cursor.fetchone()[0]
        conn.commit()
        connection.close_db(conn)
        return f'Data inserted successfully! ID: {inserted_id}'

    except psycopg2.Error as e:
        return f'Error inserting data: {e}'

def insert_prova(appello, tipo, ricaduta_esame, opzionale, esame_appartenente):
    try:
        conn = connection.open_db()
        cursor = conn.cursor()
        query = """INSERT INTO prove (appello, tipo, ricaduta_esame, opzionale, esame_appartenente)
                VALUES (%s, %s, %s, %s, %s)
                RETURNING id_prova
                """
        values = (
            bleach.clean(appello),
            bleach.clean(tipo),
            bleach.clean(ricaduta_esame),
            opzionale,
            bleach.clean(esame_appartenente)
        )
        cursor.execute(query, values)
        inserted_id = cursor.fetchone()[0]
        conn.commit()
        connection.close_db(conn)
        return f'Data inserted successfully! ID: {inserted_id}'

    except psycopg2.Error as e:
        return f'Error inserting data: {e}'

def insert_prova_sostenuta(id_studente, id_prova, data_appello, data_superamento, data_scadenza, voto, valid):
    try:
        conn = connection.open_db()
        cursor = conn.cursor()
        query = """
                INSERT INTO prove_sostenuta (id_studente, id_prova, data_appello, data_superamento, data_scadenza, voto, valid)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                """
        values = (
            bleach.clean(id_studente),
            bleach.clean(id_prova),
            bleach.clean(data_appello),
            bleach.clean(data_superamento),
            bleach.clean(data_scadenza),
            bleach.clean(voto),
            bleach.clean(valid)
        )
        cursor.execute(query, values)
        conn.commit()
        connection.close_db(conn)
        return f'Data inserted successfully!'

    except psycopg2.Error as e:
        return f'Error inserting data: {e}'

def insert_prova_gestita(id_docente, id_prova):
    try:
        conn = connection.open_db()
        cursor = conn.cursor()
        query = """
                INSERT INTO prova_gestita (id_docente, id_prova)
                VALUES (%s, %s)
                """
        values = (
            bleach.clean(id_docente),
            bleach.clean(id_prova)
        )
        cursor.execute(query, values)
        conn.commit()
        connection.close_db(conn)
        return f'Data inserted successfully!'

    except psycopg2.Error as e:
        return f'Error inserting data: {e}'
    
def insert_esami_registrati(id_esame, id_utente, voto):
    try:
        conn = connection.open_db()
        cursor = conn.cursor()
        query = """
                INSERT INTO esami_registrati (id_esame, id_utente, voto, data)
                VALUES (%s, %s, %s, CURRENT_TIMESTAMP)
                """
        values = (
            bleach.clean(id_esame),
            bleach.clean(id_utente),
            bleach.clean(voto)
        )
        cursor.execute(query, values)
        conn.commit()
        connection.close_db(conn)
        return 'Data inserted successfully!'

    except psycopg2.Error as e:
        return f'Error inserting data: {e}'

