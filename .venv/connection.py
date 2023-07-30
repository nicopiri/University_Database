import psycopg2

db_params = {
    'host': 'snuffleupagus.db.elephantsql.com',
    'port': '5432',
    'database': 'qrihrfnq',
    'user': 'qrihrfnq',
    'password': 'zjC1KpH9eZtBbH5InptE_J_v_qc3OIz1'
}

def open_db():
    try:
        return psycopg2.connect(**db_params)
    except psycopg2.Error as e:
        raise Exception('Failed to connect to the database server')

def close_db(conn):
    try:
        conn.close()
    except psycopg2.Error as e:
        raise Exception('Failed to close connection to the database')
