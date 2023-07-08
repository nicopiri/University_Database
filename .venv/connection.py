from flask import Flask, g
import psycopg2


db_params = {
            'host':     'localhost',
            'port':     '5432',
            'database': 'postgres',
            'user':     'postgres',
            'password': '123456'
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

