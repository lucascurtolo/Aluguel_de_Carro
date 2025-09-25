class CarDomain: 
    def __init__(self, marca, modelo, ano, placa, cor, categoria, cambio, combustivel, itens, imagens=None):
        self.marca = marca
        self.modelo = modelo
        self.ano = ano
        self.placa = placa
        self.cor = cor
        self.categoria = categoria
        self.cambio = cambio
        self.combustivel = combustivel
        self.itens = itens
        self.imagens = imagens or [] 

    def to_dict_car(self):
        return{
            "marca": self.marca,
            "modelo": self.modelo,
            "ano": self.ano,
            "placa": self.placa,
            "cor": self.cor,
            "categoria": self.categoria,
            "cambio": self.cambio,
            "combustivel": self.combustivel,
            "itens": self.itens,
            "imagens": self.imagens
        }