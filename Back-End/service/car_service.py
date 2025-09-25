from domain.car_domain import CarDomain
from model.car import Carro
from config.database import db
import json


class Carservice:
    def cadastra_carro(marca, modelo, ano, placa, cor, categoria, cambio, combustivel, itens, imagens):

        imagens_como_string = json.dumps(imagens)

        new_car = CarDomain(marca, modelo, ano, placa, cor, categoria, cambio, combustivel, itens, imagens_como_string)

        car = Carro(
            marca = new_car.marca,
            modelo = new_car.modelo,
            ano = new_car.ano,
            placa = new_car.placa,
            cor = new_car.cor,
            categoria = new_car.categoria,
            cambio = new_car.cambio,
            combustivel = new_car.combustivel,
            itens = new_car.itens,
            imagens = new_car.imagens
        )


        db.session.add(car)
        db.session.commit()
        return car



    def listar_carros():
        return Carro.query.all()
        
