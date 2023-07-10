from flask import Flask
import insert_data

app = Flask("__Database-Project__")

@app.route('/insert/<name>/<int:age>', methods=['POST'])
def insert(name, age):
    return insert_data.insert(name,age)

@app.route('/get', methods=['GET'])
def get():    
    return insert_data.get()