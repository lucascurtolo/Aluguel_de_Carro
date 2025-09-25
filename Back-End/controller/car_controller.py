from model.car import Carro
from service.car_service import Carservice
from run import app
from flask import request, jsonify, make_response



@app.route('/car', methods=['POST'])
def post_carro():
    marca = request.form.get("marca")
    modelo = request.form.get("modelo")
    ano = request.form.get("ano")
    placa = request.form.get("placa")
    cor = request.form.get("cor")
    categoria = request.form.get("categoria")
    cambio = request.form.get("cambio")
    combustivel = request.form.get("combustivel")
    itens = request.form.get("itens")
    
    
    imagens = request.files.getlist("imagens") 





   
    caminhos_imagens = []
    for img in imagens:
        caminho = f"uploads/{img.filename}"
        img.save(caminho)
        caminhos_imagens.append(caminho)


   
    carro = Carservice.cadastra_carro(
        marca, modelo, ano, placa, cor, categoria, cambio, combustivel, itens, caminhos_imagens
    )

    if carro:
        return jsonify({"message": "Carro cadastrado"})
    
    return jsonify({"message": "Erro ao cadastrar carro"})



@app.route('/allcars', methods = ['GET'])
def get_cars():
    carros = Carservice.listar_carros()

    if carros:
        return jsonify([car.to_dict_car() for car in carros]),200
    
    return jsonify({"message": "Carros não encontrados"}),404   







