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
                
                <button id="btn-confirmar-aluguel" class="btn-alugar-grande">Confirmar Aluguel</button>
            </div>
        </div>
    `;

    // 🔹 Agora o botão existe, então adicionamos o event listener aqui dentro
    document.getElementById('btn-confirmar-aluguel').addEventListener('click', async () => {
        try {
            const usuario_id = 1; // ID do usuário logado
            const dias = 3;       // Quantos dias alugar

            const response = await fetch('http://localhost:5000/alugar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    usuario_id,
                    carro_id: carro.id,
                    dias
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert(`✅ ${data.mensagem}\nTotal: R$ ${data.valor_total}`);
            } else {
                alert(`❌ ${data.erro}`);
            }
        } catch (error) {
            console.error('Erro ao alugar carro:', error);
            alert('Erro ao tentar alugar o carro.');
        }
    });
}



// Carrega detalhes quando a página abrir
window.onload = carregarDetalhes;