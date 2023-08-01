import psycopg2
import connection

def delete_utente_by_id(id_utente):
    try:
        conn = connection.open_db()
        cursor = conn.cursor()
        query = """
                DELETE FROM utenti
                WHERE id_utente = %s
                """
        values = (id_utente,)
        cursor.execute(query, values)
        conn.commit()
        connection.close_db(conn)
        return f'Data with ID {id_utente} deleted from "utenti" table successfully!'

    except psycopg2.Error as e:
        return f'Error deleting data: {e}'

def delete_esame_by_id(id_esame):
    try:
        conn = connection.open_db()
        cursor = conn.cursor()
        query = """
                DELETE FROM esami
                WHERE id_esame = %s
                """
        values = (id_esame,)
        cursor.execute(query, values)
        conn.commit()
        connection.close_db(conn)
        return f'Data with ID {id_esame} deleted from "esami" table successfully!'

    except psycopg2.Error as e:
        return f'Error deleting data: {e}'


def delete_prova_by_id(id_prova):
    try:
        conn = connection.open_db()
        cursor = conn.cursor()
        query = """
                DELETE FROM prove
                WHERE id_prova = %s
                """
        values = (id_prova,)
        cursor.execute(query, values)
        conn.commit()
        connection.close_db(conn)
        return f'Data with ID {id_prova} deleted from "prove" table successfully!'

    except psycopg2.Error as e:
        return f'Error deleting data: {e}'


def delete_prova_sostenuta_by_id_studente(id_studente):
    try:
        conn = connection.open_db()
        cursor = conn.cursor()
        query = """
                DELETE FROM prove_sostenuta
                WHERE id_studente = %s
                """
        values = (id_studente,)
        cursor.execute(query, values)
        conn.commit()
        connection.close_db(conn)
        return f'Data with ID {id_studente} deleted from "prove_sostenuta" table successfully!'

    except psycopg2.Error as e:
        return f'Error deleting data: {e}'

def delete_prova_sostenuta_by_id_prova(id_prova):
    try:
        conn = connection.open_db()
        cursor = conn.cursor()
        query = """
                DELETE FROM prove_sostenuta
                WHERE id_prova = %s
                """
        values = (id_prova,)
        cursor.execute(query, values)
        conn.commit()
        connection.close_db(conn)
        return f'Data with ID {id_prova} deleted from "prove_sostenuta" table successfully!'

    except psycopg2.Error as e:
        return f'Error deleting data: {e}'

def delete_prova_gestita_by_id_prova(id_prova):
    try:
        conn = connection.open_db()
        cursor = conn.cursor()
        query = """
                DELETE FROM prova_gestita
                WHERE id_prova = %s
                """
        values = (id_prova,)
        cursor.execute(query, values)
        conn.commit()
        connection.close_db(conn)
        return f'Data with ID {id_prova} deleted from "prova_gestita" table successfully!'

    except psycopg2.Error as e:
        return f'Error deleting data: {e}'

def delete_prova_gestita_by_id_docente(id_docente):
    try:
        conn = connection.open_db()
        cursor = conn.cursor()
        query = """
                DELETE FROM prova_gestita
                WHERE id_docente = %s
                """
        values = (id_docente,)
        cursor.execute(query, values)
        conn.commit()
        connection.close_db(conn)
        return f'Data with ID {id_docente} deleted from "prova_gestita" table successfully!'

    except psycopg2.Error as e:
        return f'Error deleting data: {e}'

def delete_esami_registrati_by_id_esame(id_esame):
    try:
        conn = connection.open_db()
        cursor = conn.cursor()
        query = """
                DELETE FROM esami_registrati
                WHERE id_esame = %s
                """
        values = (id_esame,)
        cursor.execute(query, values)
        conn.commit()
        connection.close_db(conn)
        return f'Data with ID {id_esame} deleted from "esami_registrati" table successfully!'

    except psycopg2.Error as e:
        return f'Error deleting data: {e}'


def delete_esami_registrati_by_id_utente(id_utente):
    try:
        conn = connection.open_db()
        cursor = conn.cursor()
        query = """
                DELETE FROM esami_registrati
                WHERE id_utente = %s
                """
        values = (id_utente,)
        cursor.execute(query, values)
        conn.commit()
        connection.close_db(conn)
        return f'Data with student ID {id_utente} deleted from "esami_registrati" table successfully!'

    except psycopg2.Error as e:
        return f'Error deleting data: {e}'
