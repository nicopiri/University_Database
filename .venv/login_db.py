import psycopg2
import connection

def get_hashed_password(id_utente):
    try:
        conn = connection.open_db()
        cursor = conn.cursor()
        query = "SELECT password, salt FROM login WHERE id=%s"
        values = (id_utente,)
        cursor.execute(query, values)
        result = cursor.fetchone()
        conn.close()
        if result:
            return result[0], result[1]  # Return both hashed password and salt
        else:
            return None, None

    except psycopg2.Error as e:
        print('Error retrieving data:', e)
        return None, None

def update_password(id_utente, hashed_password, salt):
    try:
        conn = connection.open_db()
        cursor = conn.cursor()
        query = "UPDATE login SET password=%s, salt=%s WHERE id=%s"
        values = (hashed_password, salt, id_utente)
        cursor.execute(query, values)
        conn.commit()
        cursor.close()
        conn.close()
        return 'Password updated successfully for user with id: {}'.format(id_utente)
    except Exception as e:
        return 'Error updating password: {}'.format(str(e))
def insert_password(id_utente, hashed_password, salt):
    try:
        conn = connection.open_db()
        cursor = conn.cursor()
        query = "INSERT INTO login(id, password, salt) VALUES (%s, %s, %s)"
        values = (id_utente, hashed_password, salt)
        cursor.execute(query, values)
        conn.commit()
        cursor.close()
        conn.close()
        return 'Success'

    except psycopg2.Error as e:
        return 'Error saving data in login db: {}'.format(e)

