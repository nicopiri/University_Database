import psycopg2
import connection

def get_hashed_password(id_utente):
    try:
        conn = connection.open_db()
        cursor = conn.cursor()
        query = "SELECT password FROM login WHERE id=%s"
        values = (id_utente,)
        cursor.execute(query, values)
        result = cursor.fetchone()
        conn.close()

        if result:
            return result[0]
        else:
            return None

    except psycopg2.Error as e:
        print('Error retrieving data:', e)
        return None

def update_password(id_utente, password):
    try:
        conn = connection.open_db()
        cursor = conn.cursor()
        query = "UPDATE login SET password=%s WHERE id=%s"
        values = (password, id_utente)
        cursor.execute(query, values)
        conn.commit()
        cursor.close()
        conn.close()
        return 'Password updated successfully for user with id: {}'.format(id_utente)

    except psycopg2.Error as e:
        return 'Error updating password in pw db: {}'.format(e)


def insert_password(id_utente, password):
    try:
        conn = connection.open_db()
        cursor = conn.cursor()
        query = "INSERT INTO login(id, password) VALUES (%s, %s)"
        values = (id_utente, password)
        cursor.execute(query, values)
        conn.commit()
        cursor.close()
        conn.close()
        return 'Password inserted successfully for user with id: {}'.format(id_utente)

    except psycopg2.Error as e:
        return 'Error saving data in pw db: {}'.format(e)
