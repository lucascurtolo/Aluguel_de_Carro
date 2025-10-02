// detalhes.js
async function carregarDetalhes() {
    // Pega o ID da URL
    const urlParams = new URLSearchParams(window.location.search);
    const idCarro = urlParams.get('id');
    
    if (!idCarro) {
        alert('Carro não encontrado!');
        return;
    }
    
    try {
        // Busca os detalhes do carro na API
        const response = await fetch(`http://localhost:5000/allcars`);
        const carros = await response.json();
        
        // Encontra o carro específico
        const carro = carros.find(c => c.id == idCarro);
        
        if (carro) {
            exibirDetalhes(carro);
        } else {
            alert('Carro não encontrado!');
        }
        
    } catch (error) {
        console.error('Erro ao carregar detalhes:', error);
    }
}

function exibirDetalhes(carro) {
    const container = document.getElementById('carro-detalhes');
    
    // Monta o HTML com todas as imagens
    let imagensHTML = '';
    carro.imagens.forEach(img => {
        imagensHTML += `<img src="http://localhost:5000/${img}" alt="${carro.modelo}">`;
    });
    
    container.innerHTML = `
        <div class="detalhes-carro">
            <div class="galeria-imagens">
                ${imagensHTML}
            </div>
            
            <div class="info-carro">
                <h2>${carro.marca} - ${carro.modelo}</h2>
                <p><strong>Ano:</strong> ${carro.ano}</p>
                <p><strong>Cor:</strong> ${carro.cor}</p>
                <p><strong>Placa:</strong> ${carro.placa}</p>
                <p><strong>Categoria:</strong> ${carro.categoria}</p>
                <p><strong>Câmbio:</strong> ${carro.cambio}</p>
                <p><strong>Combustível:</strong> ${carro.combustivel}</p>
                <p><strong>Itens:</strong> ${carro.itens}</p>
                
                <button class="btn-alugar-grande">Confirmar Aluguel</button>
            </div>
        </div>
    `;
}

// Carrega quando a página abrir
window.onload = carregarDetalhes;