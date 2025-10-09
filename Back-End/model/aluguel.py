from config.database import db
from datetime import datetime

class Aluguel(db.Model):
    __tablename__ = "aluguel"

    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, nullable=False)
    carro_id = db.Column(db.Integer, db.ForeignKey("cars.id"), nullable=False)
    data_inicio = db.Column(db.DateTime, default=datetime.utcnow)
    data_fim = db.Column(db.DateTime, nullable=True)
    valor_total = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(20), default="ativo")
