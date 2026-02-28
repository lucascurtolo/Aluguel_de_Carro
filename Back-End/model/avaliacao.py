from config.database import db
from datetime import datetime

class Avaliacao(db.Model):
    __tablename__ = "avaliacoes"

    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, nullable=False)
    
    # ⚠️ IMPORTANTE: sua tabela do carro é "cars"
    carro_id = db.Column(db.Integer, db.ForeignKey("cars.id"), nullable=False)

    nota = db.Column(db.Integer, nullable=False)
    comentario = db.Column(db.String(255))
    data = db.Column(db.DateTime, default=datetime.utcnow)

    carro = db.relationship("Carro", backref="avaliacoes")