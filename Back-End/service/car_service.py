from domain.car_domain import CarDomain
from model.car import Carro
from model.aluguel import Aluguel
from config.database import db
import json
from datetime import datetime, timedelta


class Carservice:

    # ------------------ CADASTRAR ------------------
    def cadastra_carro(marca, modelo, ano, placa, cor, categoria, cambio, combustivel, itens, imagens, preco_por_dia):
        imagens_como_string = json.dumps(imagens)

        new_car = CarDomain(
            marca, modelo, ano, placa, cor, categoria,
            cambio, combustivel, itens, imagens_como_string
        )

        car = Carro(
            marca=new_car.marca,
            modelo=new_car.modelo,
            ano=new_car.ano,
            placa=new_car.placa,
            cor=new_car.cor,
            categoria=new_car.categoria,
            cambio=new_car.cambio,
            combustivel=new_car.combustivel,
            itens=new_car.itens,
            imagens=new_car.imagens,
            disponivel=True,
            preco_por_dia=preco_por_dia
        )

        db.session.add(car)
        db.session.commit()
        return car


    # ------------------ LISTAR ------------------
    def listar_carros():
        return Carro.query.all()


    # ------------------ ALUGAR ------------------
    def alugar_carro(usuario_id, carro_id, dias=1):
        car = Carro.query.filter_by(id=carro_id).first()

        if not car:
            return {"erro": "Carro não encontrado"}, 404

        if not car.disponivel:
            return {"erro": "Carro já alugado"}, 400

        valor_total = getattr(car, "preco_por_dia", 100) * dias
        data_inicio = datetime.utcnow()
        data_fim = data_inicio + timedelta(days=dias)

        # ✅ Cria um novo aluguel toda vez
        aluguel = Aluguel(
            usuario_id=usuario_id,
            carro_id=carro_id,
            data_inicio=data_inicio,
            data_fim=data_fim,
            valor_total=valor_total,
            status="ativo"
        )

        car.disponivel = False
        db.session.add(aluguel)
        db.session.commit()

        return {
            "mensagem": "Carro alugado com sucesso!",
            "aluguel_id": aluguel.id,  # 🔑 retorna o ID correto
            "valor_total": valor_total,
            "carro": car.modelo,
            "data_inicio": data_inicio.strftime("%Y-%m-%d"),
            "data_fim": data_fim.strftime("%Y-%m-%d")
        }, 201


    # ------------------ DEVOLVER ------------------
    def devolver_carro(aluguel_id):
        aluguel = Aluguel.query.filter_by(id=aluguel_id).first()

        if not aluguel:
            return {"erro": "Aluguel não encontrado"}, 404

        # ⚠️ REMOVE o bloqueio que impedia devolução após novo aluguel
        if aluguel.status == "finalizado":
            return {"erro": "Este aluguel já foi devolvido"}, 400

        car = Carro.query.filter_by(id=aluguel.carro_id).first()
        if not car:
            return {"erro": "Carro não encontrado"}, 404

        aluguel.status = "finalizado"
        aluguel.data_fim = datetime.utcnow()

        # ✅ Libera o carro para um novo aluguel
        car.disponivel = True

        db.session.commit()

        return {"mensagem": "Carro devolvido e disponível novamente!"}, 200
