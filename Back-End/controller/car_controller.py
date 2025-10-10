import os
from model.car import Carro
from service.car_service import Carservice
from model.aluguel import Aluguel
from run import app
from flask import request, jsonify

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  


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



@app.route("/alugar", methods=["POST"])
def alugar_carro():
    data = request.get_json()
    usuario_id = data.get("usuario_id")
    carro_id = data.get("carro_id")
    dias = data.get("dias", 1)  # padrão 1 dia se não informado

    if not usuario_id or not carro_id:
        return jsonify({"erro": "usuario_id e carro_id são obrigatórios"}), 400

    resposta, status = Carservice.alugar_carro(usuario_id, carro_id, dias)
    return jsonify(resposta), status
