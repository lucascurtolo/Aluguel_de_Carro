async function carregarCarros() {
    try {
        const response = await fetch('http://localhost:5000/allcars');
        const carros = await response.json();
        
        console.log('📦 Carros recebidos:', carros);
        
        exibirCarros(carros);
    } catch (error) {
        console.error('❌ Erro ao carregar carros:', error);
        alert('Erro ao carregar os carros. Verifique se o servidor está rodando.');
    }
}

function exibirCarros(carros) {
    const container = document.getElementById('lista-carros');
    
    if (carros.length === 0) {
        container.innerHTML = '<p class="sem-carros">Nenhum carro disponível no momento.</p>';
        return;
    }
    
    container.innerHTML = carros.map(carro => {
        const primeiraImagem = carro.imagens && carro.imagens.length > 0 
            ? `http://localhost:5000/${carro.imagens[0]}` 
            : 'img/carro-placeholder.png';
        
        // Define a cor da bolinha baseado na disponibilidade
        const statusClass = carro.disponivel ? 'disponivel' : 'indisponivel';
        const statusTexto = carro.disponivel ? 'Disponível' : 'Alugado';
        
        return `
            <div class="card-carro ${!carro.disponivel ? 'carro-indisponivel' : ''}">
                <div class="status-badge">
                    <span class="status-indicator ${statusClass}"></span>
                    <span class="status-texto">${statusTexto}</span>
                </div>
                
                <img src="${primeiraImagem}" alt="${carro.marca} ${carro.modelo}" class="imagem-carro">
                
                <div class="info-carro">
                    <h3>${carro.marca} ${carro.modelo}</h3>
                    <p class="ano-carro">${carro.ano}</p>
                    <p class="preco-carro">R$ ${carro.preco_por_dia.toFixed(2)}/dia</p>
                    
                    <div class="detalhes-rapidos">
                        <span>🎨 ${carro.cor}</span>
                        <span>⚙️ ${carro.cambio}</span>
                        <span>⛽ ${carro.combustivel}</span>
                    </div>
                    
                    <button 
                        onclick="verDetalhes(${carro.id})" 
                        class="btn-detalhes"
                        ${!carro.disponivel ? 'disabled' : ''}
                    >
                        ${carro.disponivel ? 'Ver Detalhes' : 'Indisponível'}
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function verDetalhes(id) {
    window.location.href = `../Nossos_Detalhes_carro/detalhes.html?id=${id}`;
}

// Atualiza a lista de carros a cada 5 segundos
setInterval(carregarCarros, 5000);

window.onload = carregarCarros;