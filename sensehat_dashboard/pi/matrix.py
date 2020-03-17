from sense_hat import SenseHat
import firebase_admin
from firebase_admin import credentials, firestore
import time

# constants
COLLECTION = 'raspberry_collection'
DOCUMENT = 'maarostepi_doc'

# firebase
cred = credentials.Certificate("/home/pi/Desktop/labo-3-firebase-MaartenOste/sensehat_dashboard/config/raspberry-colors-firebase-adminsdk-nzog4-17e62a4beb.json")
firebase_admin.initialize_app(cred)

# sensehat 
sense = SenseHat()
sense.set_imu_config(False, False, False)
sense.clear()

def update_sensehat(doc_snapshot, changes, read_time):
    for doc in doc_snapshot:
        doc_readable = doc.to_dict()
        if doc_readable.get('matrix').get('isOn'):
            hexColor = doc_readable.get('matrix').get('color').get('value')
            X = list(tuple(int(hexColor[i:i+2], 16) for i in (0, 2, 4)))

            matrix = [
            X, X, X, X, X, X, X, X,
            X, X, X, X, X, X, X, X,
            X, X, X, X, X, X, X, X,
            X, X, X, X, X, X, X, X,
            X, X, X, X, X, X, X, X,
            X, X, X, X, X, X, X, X,
            X, X, X, X, X, X, X, X,
            X, X, X, X, X, X, X, X,
            ]

            sense.set_pixels(matrix)
        else:
            sense.clear()

# connect firestore
db = firestore.client()
pi_ref = db.collection(COLLECTION).document(DOCUMENT)
pi_watch = pi_ref.on_snapshot(update_sensehat)

# app
while True:
    pass
