from domain.user_domain import UserDomain
from model.user import Usuario
from config.database import db

class UserService:
    @staticmethod
    def create_user(cpf, nome, data_nascimento, telefone, email, cep, endereco, numero, complemento, bairro, estado, cidade, senha):
        new_user = UserDomain(cpf, nome, data_nascimento, telefone, email, cep, endereco, numero, complemento, bairro, estado, cidade, senha)

        user = Usuario(
            cpf = new_user.cpf,
            nome = new_user.nome,
            data_nascimento = new_user.data_nascimento,
            telefone = new_user.telefone,
            email = new_user.email,
            cep = new_user.cep,
            endereco = new_user.endereco,
            numero = new_user.numero,
            complemento = new_user.complemento,
            bairro = new_user.bairro,
            estado = new_user.estado,
            cidade = new_user.cidade,
            senha = new_user.senha
        )

        if user:
            db.session.add(user)
            db.session.commit()
            return user.to_dict()
        else:
            return "Erro ao cadastrar usuário"
        

    @staticmethod
    def get_user(id):
        user = Usuario.query.filter_by(id = id).first()

        if user:
            return user.to_dict()
        
        else:
            return "Usuário não encontrado"
        

    @staticmethod
    def login_user(email, senha):
        user = Usuario.query.filter_by(email = email, senha = senha).first()



        if user:
            return "Bem - Vindo"
        
        else:
            return "Email ou senha incorretos"


