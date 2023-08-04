import psycopg2
import connection
import bleach

def get_role_from_id(id):
    try:
        conn = connection.open_db()
        cursor = conn.cursor()
        cursor.execute("""
                       SELECT r.ruolo FROM ruoli r JOIN utenti u ON (r.id=u.ruolo) WHERE u.id_utente = %s
                       """, (id,))
        role = cursor.fetchone()
        conn.close()
        print(role)
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
            SELECT e.nome, ps.id_prova, ps.data_appello, ps.superato, ps.data_scadenza, ps.voto
            FROM prove_sostenuta ps
            JOIN prove p on ps.id_prova = p.id_prova
            JOIN esami e on p.esame_appartenente = e.id_esame
            WHERE ps.id_studente = %s
            AND ps.valid = true
            ORDER BY data_appello;
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
            SELECT e.nome, ps.id_prova, ps.data_appello, ps.superato, ps.data_scadenza, ps.voto, ps.valid
            FROM prove_sostenuta ps
            JOIN prove p on ps.id_prova = p.id_prova
            JOIN esami e on p.esame_appartenente = e.id_esame
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

def get_esami_by_docente_responsabile(docente_responsabile):
    try:
        conn = connection.open_db()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT *
            FROM esami
            WHERE docente_responsabile = %s;
        """, (docente_responsabile,))
        exams = cursor.fetchall()
        conn.close()
        return exams
    except psycopg2.Error as e:
        print("Error querying the database:", e)
        return None

def get_all_esami():
    try:
        conn = connection.open_db()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM esami")
        esami = cursor.fetchall()
        conn.close()
        return esami
    except psycopg2.Error as e:
        print("Error querying the database:", e)
        return None

def get_prove_gestite_by_id_docente(id_docente):
    try:
        conn = connection.open_db()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT p.*
            FROM prova_gestita pg
            JOIN prove p ON pg.id_prova = p.id_prova
            WHERE pg.id_docente = %s;
        """, (id_docente,))
        prove_gestite = cursor.fetchall()
        conn.close()
        return prove_gestite
    except psycopg2.Error as e:
        print("Error querying the database:", e)
        return None

def get_esami_registrati_by_docente_responsabile(docente_responsabile):
    try:
        conn = connection.open_db()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT er.id_esame,e.nome, er.id_utente, u.nome, u.cognome, er.voto, er.data
            FROM esami e
            JOIN esami_registrati er ON e.id_esame = er.id_esame
            JOIN utenti u ON u.id_utente = er.id_utente
            WHERE e.docente_responsabile = %s;
        """, (docente_responsabile,))
        exams = cursor.fetchall()
        conn.close()
        return exams
    except psycopg2.Error as e:
        print("Error querying the database:", e)
        return None

def get_studenti_registrabili_by_id_esame(id_esame):
    try:
        conn = connection.open_db()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT u.id_utente, u.nome, u.cognome
            FROM utenti u
            INNER JOIN prove_sostenuta ps ON u.id_utente = ps.id_studente
            INNER JOIN prove p ON ps.id_prova = p.id_prova
            INNER JOIN esami e ON p.esame_appartenente = e.id_esame
            WHERE p.opzionale = FALSE
            AND ps.valid = TRUE
            AND e.id_esame = %s
            AND p.ricaduta_esame = 'media'
            GROUP BY u.id_utente, u.nome, u.cognome, e.min_prove
            HAVING COUNT(ps.id_prova) >= e.min_prove
            AND AVG(ps.voto) >= 18;
        """, (id_esame,))
        students = cursor.fetchall()
        conn.close()
        return students
    except psycopg2.Error as e:
        print("Error querying the database:", e)
        return None    
    
    