import bcrypt
import login_db

# Encrypt a password and check if it matches the hashed password
def check_and_encrypt_password(id_utente, password):
    hashed_password = login_db.get_hashed_password(id_utente)

    if hashed_password:
        return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))
    else:
        return False

# Encrypt a password
def encrypt_password(password):
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password.decode('utf-8')  # Convert the hashed password bytes to a string

def insert_password(id_utente, password):
    return login_db.insert_password(id_utente, encrypt_password(password))

def update_password(id_utente, password):
    return login_db.update_password(id_utente, encrypt_password(password))
