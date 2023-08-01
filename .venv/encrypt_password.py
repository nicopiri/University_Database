import bcrypt
import login_db

def encrypt_password(plain_text_password):
    # Hash the plaintext password with a randomly generated salt
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(plain_text_password.encode('utf-8'), salt)
    return hashed_password, salt

def verify_password(plain_text_password, hashed_password):
    # Check if the plaintext password matches the hashed password
    return bcrypt.checkpw(plain_text_password.encode('utf-8'), hashed_password)


def pasword_exist(id_utente):
    encrypted_pw = login_db.get_hashed_password(id_utente)
    if encrypted_pw is None:
        return True
    return False

def insert_password(id_utente, password):
    hashed_password, salt = encrypt_password(password)
    return login_db.insert_password(id_utente, hashed_password, salt)

def update_password(id_utente, old_password, new_passowd):
    
    saved_pw_bytes, salt_bytes = login_db.get_hashed_password(id_utente)
    if saved_pw_bytes is None:
        return 'User not Exist'
    saved_pw = bytes.fromhex(saved_pw_bytes[2:])
    salt = bytes.fromhex(salt_bytes[2:])
    encrypt_pw = bcrypt.hashpw(old_password.encode('utf-8'), salt)
    if saved_pw == encrypt_pw:
       login_db.update_password(id_utente, encrypt_password(new_passowd),salt)
       return 'Password Updated'
    return  'Incorrect Password'


def check_password(id_utente, password):
    saved_pw_bytes, salt_bytes = login_db.get_hashed_password(id_utente)
    print('here')
    print(id_utente)
    print(saved_pw_bytes)
    print(salt_bytes)
    if saved_pw_bytes is None or salt_bytes is None:
        return False
    print(saved_pw_bytes)
    saved_pw = bytes.fromhex(saved_pw_bytes[2:])
    salt = bytes.fromhex(salt_bytes[2:])
    encrypt_pw = bcrypt.hashpw(password.encode('utf-8'), salt)
    if saved_pw == encrypt_pw:
        return True
    return False

