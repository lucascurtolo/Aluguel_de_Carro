class UserDomain:
    def __init__(self, cpf, nome, data_nascimento, telefone, email, cep, endereco, numero, complemento, bairro, estado, cidade, senha ):
        self.cpf = cpf
        self.nome = nome
        self.data_nascimento = data_nascimento
        self.telefone = telefone
        self.email = email
        self.cep = cep
        self.endereco = endereco
        self.numero = numero
        self.complemento = complemento
        self.bairro = bairro
        self.estado = estado
        self.cidade = cidade
        self.senha = senha

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
        