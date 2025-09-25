# run.py
from flask import Flask
from flask_cors import CORS
from config.database import init_db, db
from model.user import Usuario
from model.car import Carro

def create_app():
    app = Flask(__name__)
    
   
    init_db(app)
    
    
    CORS(app, resources={r"/*": {"origins": "*"}})
    
    
    with app.app_context():
        db.drop_all()   
        db.create_all()
    
    return app

app = create_app()
