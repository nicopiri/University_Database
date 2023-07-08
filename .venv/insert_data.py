import psycopg2
import connection

def insert(name , age):
    try:
        conn = connection.open_db()
        cursor = conn.cursor()
        query = "INSERT INTO mytable (name, age) VALUES (%s,%s)"
        values = (name, age)
        cursor.execute(query,values)
        conn.commit()
        connection.close_db(exception=None)
        return 'Data inserted successfully!'
    
    except psycopg2.Error as e:
        return 'Error inserting data: {}'.format(e)
