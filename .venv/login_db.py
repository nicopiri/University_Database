import psycopg2
import connection
import bleach

def check_password(id_utente):
    try:
        conn = connection.open_db()
        cursor = conn.cursor()
        query = "SELECT password FROM login WHERE id=%s"
        values = (id_utente,)
        cursor.execute(query, values)
        result = cursor.fetchone()
        conn.close()
        
        if result:
            password = result[0]
            return password
        else:
            return None

    except psycopg2.Error as e:
        return 'Error retrieving data: {}'.format(e)

