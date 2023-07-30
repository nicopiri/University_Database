from flask import Flask, g
import psycopg2


db_params = {
            'host':     'snuffleupagus.db.elephantsql.com',
            'port':     '5432',
            'database': 'qrihrfnq',
            'user':     'qrihrfnq',
            'password': 'zjC1KpH9eZtBbH5InptE_J_v_qc3OIz1'
            }

def open_db():
    try:
        if 'db' not in g:
            g.db = psycopg2.connect(**db_params)
        return g.db
    except psycopg2.Error as e:
        Exception('Failed to connect to database server')
        
        
def close_db(exception=None):
    try:
        db=g.pop('db', None)
        if db is not None:
            db.close()
    except psycopg2.Error as e:
        Exception('Failed to close connection to database')

