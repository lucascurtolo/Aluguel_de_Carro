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
    preco_por_dia = float(request.form.get("preco_por_dia") or 0.0)

    imagens = request.files.getlist("foto")
    caminhos_imagens = []
    for img in imagens:
        if img.filename != "":
            caminho = os.path.join(UPLOAD_FOLDER, img.filename)
            img.save(caminho)
            caminhos_imagens.append(caminho)

    carro = Carservice.cadastra_carro(
        marca, modelo, ano, placa, cor, categoria, cambio, combustivel, itens, caminhos_imagens, preco_por_dia
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


@app.route("/meusalugueis", methods=["GET"])
def meus_alugueis():
    usuario_id = request.args.get("usuario_id")

    if not usuario_id:
        return jsonify({"erro": "É necessário informar o usuarioID na URL"}), 400
    
    alugueis = Aluguel.query.filter_by(usuario_id=usuario_id, status="ativo").all()

    # alugueis = Aluguel.query.filter_by(usuario_id=usuario_id).all()
    # if not alugueis:
    #     return jsonify([]), 200

    resultado = []
    for aluguel in alugueis:
        carro = Carro.query.get(aluguel.carro_id)
        if carro:
            carro_dict = carro.to_dict_car()
            carro_dict["aluguel_id"] = aluguel.id
            carro_dict["data_inicio"] = aluguel.data_inicio.strftime("%Y-%m-%d") if aluguel.data_inicio else None
            carro_dict["data_fim"] = aluguel.data_fim.strftime("%Y-%m-%d") if aluguel.data_fim else None
            carro_dict["status"] = aluguel.status
            carro_dict["valor_total"] = aluguel.valor_total
            resultado.append(carro_dict)

    return jsonify(resultado), 200

@app.route("/devolver/<int:aluguel_id>", methods=["PUT"])
def devolver_carro(aluguel_id):
    resultado, status = Carservice.devolver_carro(aluguel_id)
    return jsonify(resultado), status