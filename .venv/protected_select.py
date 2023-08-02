import psycopg2
import connection
import bleach

def get_role_from_id(id):
    try:
        conn = connection.open_db()
        cursor = conn.cursor()
        cursor.execute("SELECT ruolo FROM ruoli WHERE id = %s", (id,))
        role = cursor.fetchone()
        conn.close()
        if role:
            return role[0]
        else:
            return None
    except psycopg2.Error as e:
        print("Error querying the database:", e)
        return None
    
def get_dati_utente_from_id(id):
    try:
        conn = connection.open_db()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM utenti WHERE id_utente = %s", (id,))
        utente = cursor.fetchone()
        conn.close()
        if utente:
            return utente[0], utente[1], utente[2],utente[3], utente[4], utente[5],utente[6], utente[7]
        else:
            return None
    except psycopg2.Error as e:
        print("Error querying the database:", e)
        return None
    

def get_prove_valide(id_studente):
    try:
        conn = connection.open_db()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT ps.id_prova, ps.data_appello, ps.superato, ps.data_scadenza, ps.voto
            FROM prove_sostenuta ps
            WHERE ps.id_studente = %s AND ps.valid = true;
        """, (id_studente,))
        prove = cursor.fetchall()
        conn.close()
        return prove
    except psycopg2.Error as e:
        print("Error querying the database:", e)
        return None

def get_storico_prove(id_studente):
    try:
        conn = connection.open_db()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT ps.id_prova, ps.data_appello, ps.superato, ps.data_scadenza, ps.voto, ps.valid
            FROM prove_sostenuta ps
            WHERE ps.id_studente = %s
            ORDER BY data_appello;
        """, (id_studente,))
        storico = cursor.fetchall()
        conn.close()
        return storico
    except psycopg2.Error as e:
        print("Error querying the database:", e)
        return None


def get_libretto(id_studente):
    try:
        conn = connection.open_db()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT e.nome, er.data, er.voto
            FROM esami_registrati er
            JOIN esami e ON er.id_esame = e.id_esame
            WHERE er.id_utente = %s;
        """, (id_studente,))
        libretto = cursor.fetchall()
        conn.close()
        return libretto
    except psycopg2.Error as e:
        print("Error querying the database:", e)
        return None
