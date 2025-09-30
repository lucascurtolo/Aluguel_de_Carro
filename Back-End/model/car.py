from config.database import db
import json


class Carro(db.Model):
    __tablename__ = "cars"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    marca = db.Column(db.String(15), nullable=False)
    modelo = db.Column(db.String(20), nullable=False)
    ano = db.Column(db.String(15), nullable=False)
    placa = db.Column(db.String(15), nullable=False)
    cor = db.Column(db.String(15), nullable=False)
    categoria = db.Column(db.String(15), nullable=False)
    cambio = db.Column(db.String(15), nullable=False)
    combustivel = db.Column(db.String(15), nullable=False)
    itens = db.Column(db.String(200), nullable=False)
    imagens = db.Column(db.Text, nullable=True)

    def to_dict_car(self):
        return {
            "id": self.id,
            "marca": self.marca,
            "modelo": self.modelo,
            "ano": self.ano,
            "placa": self.placa,
            "cor": self.cor,
            "categoria": self.categoria,
            "cambio": self.cambio,
            "combustivel": self.combustivel,
            "itens": self.itens,
            "imagens": json.loads(self.imagens) if self.imagens else []
        }
