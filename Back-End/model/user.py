from config.database import db

class Usuario(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    cpf = db.Column(db.String(11), unique=True, nullable=False)
    nome = db.Column(db.String(100), nullable=False)
    data_nascimento = db.Column(db.Date, nullable=False)
    telefone = db.Column(db.String(15), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    cep = db.Column(db.String(10), nullable=False)
    endereco = db.Column(db.String(150), nullable=False)
    numero = db.Column(db.String(10), nullable=False)
    complemento = db.Column(db.String(100))
    bairro = db.Column(db.String(100), nullable=False)
    estado = db.Column(db.String(2), nullable=False)
    cidade = db.Column(db.String(100), nullable=False)
    senha = db.Column(db.String(255), nullable=False)




    def to_dict(self):
        return{
        "cpf": self.cpf,
        "nome": self.nome,
        "data_nascimento": self.data_nascimento,
        "telefone": self.telefone,
        "email": self.email,
        "cep": self.cep,
        "endereco": self.endereco,
        "numero": self.numero,
        "complemento": self.complemento,
        "bairro": self.bairro,
        "estado": self.estado,
        "cidade": self.cidade,
        "senha": self.senha

    }




