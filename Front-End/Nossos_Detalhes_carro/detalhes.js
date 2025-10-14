// detalhes.js

const precosCarros = {
    'Gol': { diaria: 89.90, categoria: 'Econômico' },
    'Onix': { diaria: 95.00, categoria: 'Econômico' },
    'HB20': { diaria: 99.90, categoria: 'Econômico' },
    'Civic': { diaria: 189.90, categoria: 'Executivo' },
    'Corolla': { diaria: 199.90, categoria: 'Executivo' },
    'Kicks': { diaria: 149.90, categoria: 'SUV' },
    'Compass': { diaria: 229.90, categoria: 'SUV' },
    'Tucson': { diaria: 219.90, categoria: 'SUV' },
    'Cruze': { diaria: 169.90, categoria: 'Executivo' }
};

async function carregarDetalhes() {
    const urlParams = new URLSearchParams(window.location.search);
    const idCarro = urlParams.get('id');
    
    console.log('🔍 ID do carro:', idCarro); // DEBUG
    
    if (!idCarro) {
        alert('Carro não encontrado!');
        return;
    }
    
    try {
        const response = await fetch(`http://localhost:5000/allcars`);
        const carros = await response.json();
        
        console.log('📦 Carros recebidos:', carros); // DEBUG
        
        const carro = carros.find(c => c.id == idCarro);
        
        console.log('🚗 Carro encontrado:', carro); // DEBUG
        
        if (carro) {
            exibirDetalhes(carro);
        } else {
            alert('Carro não encontrado!');
        }
        
    } catch (error) {
        console.error('❌ Erro ao carregar detalhes:', error);
    }
}

function exibirDetalhes(carro) {
    const container = document.getElementById('carro-detalhes');
    
    const precoCarro = precosCarros[carro.modelo] || { diaria: 0, categoria: 'N/A' };
    const diasPadrao = 1;
    const valorTotal = precoCarro.diaria * diasPadrao;
    
    console.log('💰 Preço encontrado:', precoCarro); // DEBUG
    
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
                
                <div class="preco-destaque">
                    <div class="preco-diaria">
                        <span class="valor">R$ ${precoCarro.diaria.toFixed(2)}</span>
                        <span class="periodo">/diária</span>
                    </div>
                    
                    <div class="seletor-dias">
                        <label for="dias-aluguel">Quantos dias?</label>
                        <div class="controle-dias">
                            <button type="button" id="btn-menos" class="btn-quantidade">-</button>
                            <input type="number" id="dias-aluguel" value="1" min="1" max="365">
                            <button type="button" id="btn-mais" class="btn-quantidade">+</button>
                        </div>
                    </div>
                    
                    <div class="calculo-dias">
                        <span id="texto-total">1 diária = <strong>R$ ${valorTotal.toFixed(2)}</strong></span>
                    </div>
                </div>
                
                <p><strong>Ano:</strong> ${carro.ano}</p>
                <p><strong>Cor:</strong> ${carro.cor}</p>
                <p><strong>Placa:</strong> ${carro.placa}</p>
                <p><strong>Categoria:</strong> ${carro.categoria}</p>
                <p><strong>Câmbio:</strong> ${carro.cambio}</p>
                <p><strong>Combustível:</strong> ${carro.combustivel}</p>
                <p><strong>Itens:</strong> ${carro.itens}</p>
                
                <button id="btn-confirmar-aluguel" class="btn-alugar-grande">
                    Confirmar Aluguel - R$ ${valorTotal.toFixed(2)}
                </button>
            </div>
        </div>
    `;

    // Elementos para controlar os dias
    const inputDias = document.getElementById('dias-aluguel');
    const btnMenos = document.getElementById('btn-menos');
    const btnMais = document.getElementById('btn-mais');
    const textoTotal = document.getElementById('texto-total');
    const btnConfirmar = document.getElementById('btn-confirmar-aluguel');

    console.log('🔘 Botão encontrado:', btnConfirmar); // DEBUG

    // Função para atualizar o valor total
    function atualizarTotal() {
        const dias = parseInt(inputDias.value) || 1;
        const total = precoCarro.diaria * dias;
        const textoPlural = dias === 1 ? 'diária' : 'diárias';
        
        textoTotal.innerHTML = `${dias} ${textoPlural} = <strong>R$ ${total.toFixed(2)}</strong>`;
        btnConfirmar.textContent = `Confirmar Aluguel - R$ ${total.toFixed(2)}`;
    }

    // Eventos dos botões + e -
    btnMenos.addEventListener('click', () => {
        console.log('➖ Clicou em menos');
        if (inputDias.value > 1) {
            inputDias.value = parseInt(inputDias.value) - 1;
            atualizarTotal();
        }
    });

    btnMais.addEventListener('click', () => {
        console.log('➕ Clicou em mais');
        inputDias.value = parseInt(inputDias.value) + 1;
        atualizarTotal();
    });

    inputDias.addEventListener('input', atualizarTotal);

    // Botão de confirmar aluguel
    btnConfirmar.addEventListener('click', async () => {
        console.log('🎯 BOTÃO CLICADO!'); // DEBUG CRÍTICO
        
        try {
            const usuario_id = 1;
            const dias = parseInt(inputDias.value) || 1;

            console.log('📝 Dados do aluguel:', { usuario_id, carro_id: carro.id, dias }); // DEBUG

            if (dias < 1) {
                alert('⚠️ Selecione pelo menos 1 dia de aluguel.');
                return;
            }

            console.log('🌐 Enviando requisição...'); // DEBUG

            const response = await fetch('http://localhost:5000/alugar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    usuario_id,
                    carro_id: carro.id,
                    dias
                })
            });

            console.log('📨 Resposta recebida:', response.status); // DEBUG

            const data = await response.json();
            
            console.log('📦 Dados da resposta:', data); // DEBUG

            // if (response.ok) {
            //     alert(`✅ ${data.mensagem}\nDias: ${dias}\nTotal: R$ ${data.valor_total}`);
            // } else {
            //     alert(`❌ ${data.erro}`);
            // }
            if (response.ok) {
                alert('✅ Carro alugado com sucesso!');
            } else if (response.status === 400) {
                alert('❌ Carro já alugado!');
            } else {
                alert('⚠️ Ocorreu um erro ao tentar alugar o carro.');
            }
        } catch (error) {
            console.error('❌ ERRO COMPLETO:', error); // DEBUG
            alert('Erro ao tentar alugar o carro: ' + error.message);
        }
    });
}

window.onload = carregarDetalhes;