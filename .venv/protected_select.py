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