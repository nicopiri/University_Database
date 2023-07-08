from flask import Flask
import connection
import insert_data

app = Flask("__Database-Project__")

@app.route('/insert/<name>/<int:age>', methods=['POST'])
def insert(name, age):
    return insert_data.insert(name,age)
    