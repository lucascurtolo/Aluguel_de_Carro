from model.user import Usuario
from service.user_service import UserService
from run import app
from flask import request, jsonify, make_response


@app.route('/user', methods=['POST'])
def criar_user():
    data = request.get_json()
    cpf = data.get('cpf')
    nome = data.get('nome')
    data_nascimento = data.get('data_nascimento')
    telefone = data.get('telefone')
    email = data.get('email')
    cep = data.get('cep')
    endereco = data.get('endereco')
    numero = data.get('numero')
    complemento = data.get('complemento')
    bairro = data.get('bairro')
    estado = data.get('estado')
    cidade = data.get('cidade')
    senha = data.get('senha')

    user = UserService.create_user(cpf, nome, data_nascimento, telefone, email,
                                   cep, endereco, numero, complemento, bairro, estado, cidade, senha)

    if not user:
        return jsonify({"message": "Campos mal preenchidos"})

    else:
        return ({"message": "Usuário cadastrado com sucesso"})


@app.route('/user/<int:id>', methods=['GET'])
def get(id):
    user = UserService.get_user(id)

    if user:
        return (jsonify({"Usuário encontrado": user}))

    else:
        return jsonify({"Não foi possível encontrar o usuário"})


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    cpf = data.get("cpf")
    senha = data.get("senha")

    result = UserService.login_user(cpf, senha)

    if result["success"]:
        return jsonify({
            "message": "Bem-vindo",
            "user": result["user"]
        }), 200

    return jsonify({"error": result["error"]}), 401
