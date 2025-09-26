import os
from model.car import Carro
from service.car_service import Carservice
from run import app
from flask import request, jsonify

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # cria a pasta se não existir

@app.route('/car', methods=['POST'])
def post_carro():
    marca = request.form.get("marca")
    modelo = request.form.get("modelo")
    ano = int(request.form.get("ano") or 0)
    placa = request.form.get("placa")
    cor = request.form.get("cor")
    categoria = request.form.get("categoria")
    cambio = request.form.get("cambio")
    combustivel = request.form.get("combustivel")
    itens = request.form.get("itens") or ""

    
    imagens = request.files.getlist("foto")

    caminhos_imagens = []
    for img in imagens:
        if img.filename != "":
            caminho = os.path.join(UPLOAD_FOLDER, img.filename)
            img.save(caminho)
            caminhos_imagens.append(caminho)

    carro = Carservice.cadastra_carro(
        marca, modelo, ano, placa, cor, categoria, cambio, combustivel, itens, caminhos_imagens
    )

    if carro:
        return jsonify({"message": "Carro cadastrado"}), 201

    return jsonify({"message": "Erro ao cadastrar carro"}), 400


@app.route('/allcars', methods=['GET'])
def get_cars():
    carros = Carservice.listar_carros()

    if carros:
        return jsonify([car.to_dict_car() for car in carros]), 200
    
    return jsonify({"message": "Carros não encontrados"}), 404
