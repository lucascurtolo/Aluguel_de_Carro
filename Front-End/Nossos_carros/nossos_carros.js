// script.js
async function carregarCarros() {
    try{
        const response = await fetch('http://localhost:5000/allcars');
        const carros = await response.json();

        exibirCarros(carros);
    } catch(error){
        console.error("Erro ao carregar carros:", error);

    }
    
}

function alugarCarro(idCarro){
    window.location.href = `../Nossos_detalhes_carro/detalhes.html?id=${idCarro}`;

}

function exibirCarros(carros) {
    const container = document.getElementById('carros-container');
    container.innerHTML = ''; // Limpa o container
    
    carros.forEach(carro => {
        // Pega a primeira imagem do array
        const imagemPrincipal = carro.imagens.length > 0 ? carro.imagens[0] : 'imagens/default.jpg';
        
        const cardHTML = `
            <div class="card-carro">
                <img src="http://localhost:5000/${imagemPrincipal}" alt="${carro.modelo}">
                
                <ul>
                    <li>${carro.modelo}</li>
                    <li>${carro.ano}</li>
                    <li>${carro.cor}</li>
                </ul>
                
                <button class="btn-alugar" onclick="alugarCarro(${carro.id})">Alugar</button>
            </div>
        `;
        
        container.innerHTML += cardHTML;
    });
}

window.onload = carregarCarros;
