async function carregarDetalhes() {
    const urlParams = new URLSearchParams(window.location.search);
    const idCarro = urlParams.get('id');
    
    console.log('🔍 ID do carro:', idCarro);
    
    if (!idCarro) {
        alert('Carro não encontrado!');
        return;
    }
    
    try {
        const response = await fetch(`http://localhost:5000/allcars`);
        const carros = await response.json();
        
        console.log('📦 Carros recebidos:', carros);
        
        const carro = carros.find(c => c.id == idCarro);
        
        console.log('🚗 Carro encontrado:', carro);
        
        if (carro) {
            exibirDetalhes(carro);
        } else {
            alert('Carro não encontrado!');
        }
        
    } catch (error) {
        console.error('❌ Erro ao carregar detalhes:', error);
    }
}

async function excluirCarro() {
    const confirmar = confirm("Tem certeza que deseja excluir este carro?");
    if (!confirmar) return;

    const urlParams = new URLSearchParams(window.location.search);
    const idCarro = urlParams.get('id');

    try {
        const response = await fetch(`http://localhost:5000/car/${idCarro}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (response.ok) {
            alert("🚗 Carro excluído com sucesso!");
            window.location.href = "../HomePage/index.html";
        } else {
            alert("❌ " + data.erro);
        }

    } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao excluir o carro.");
    }
}

function exibirDetalhes(carro) {
    const container = document.getElementById('carro-detalhes');
    
    const precoPorDia = carro.preco_por_dia || 0;
    const diasPadrao = 1;
    const valorTotal = precoPorDia * diasPadrao;
    
    // Status de disponibilidade
    const statusClass = carro.disponivel ? 'disponivel' : 'indisponivel';
    const statusTexto = carro.disponivel ? 'Disponível' : 'Alugado';
    
    console.log('💰 Preço do carro vindo do backend:', precoPorDia);
    
    let imagensHTML = '';
    carro.imagens.forEach(img => {
        imagensHTML += `<img src="http://localhost:5000/${img}" alt="${carro.modelo}">`;
    });
    
    container.innerHTML = `
        <div class="detalhes-carro">
            <div class="galeria-imagens">
                ${imagensHTML}

                <div class="avaliacao-box">
                    <h3>Avaliação</h3>

                    <div class="media-avaliacao">
                        <span id="media-estrelas">☆☆☆☆☆</span>
                        <span id="media-numero">(0.0)</span>
                    </div>

                    <div class="estrelas-selecao">
                        <span onclick="selecionarNota(1)">★</span>
                        <span onclick="selecionarNota(2)">★</span>
                        <span onclick="selecionarNota(3)">★</span>
                        <span onclick="selecionarNota(4)">★</span>
                        <span onclick="selecionarNota(5)">★</span>
                    </div>

                    <button class="btn-enviar-avaliacao" onclick="enviarAvaliacao(${carro.id})">
                        Enviar Avaliação
                    </button>
            </div>

        </div>
            
            <div class="info-carro">
                <h2>
                    ${carro.marca} - ${carro.modelo}
                    <span class="status-badge-detalhes">
                        <span class="status-indicator ${statusClass}"></span>
                        <span class="status-texto">${statusTexto}</span>
                    </span>
                </h2>
                
                ${carro.disponivel ? `
                <div class="preco-destaque">
                    <div class="preco-diaria">
                        <span class="valor">R$ ${precoPorDia.toFixed(2)}</span>
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
                ` : `
                <div class="alerta-indisponivel">
                    <span class="icone-alerta">⚠️</span>
                    <p><strong>Este carro está alugado no momento.</strong></p>
                    <p>Volte mais tarde para verificar a disponibilidade.</p>
                </div>
                `}
                
                <p><strong>Ano:</strong> ${carro.ano}</p>
                <p><strong>Cor:</strong> ${carro.cor}</p>
                <p><strong>Placa:</strong> ${carro.placa}</p>
                <p><strong>Categoria:</strong> ${carro.categoria}</p>
                <p><strong>Câmbio:</strong> ${carro.cambio}</p>
                <p><strong>Combustível:</strong> ${carro.combustivel}</p>
                <p><strong>Itens:</strong> ${carro.itens}</p>
                
                ${carro.disponivel ? `
                <button id="btn-confirmar-aluguel" class="btn-alugar-grande">
                    Confirmar Aluguel - R$ ${valorTotal.toFixed(2)}
                </button>
                ` : `
                <button class="btn-alugar-grande btn-indisponivel" disabled>
                    Carro Indisponível
                </button>
                `}
            </div>
        </div>
    `;

    atualizarMedia(carro.id);                    
    if (carro.disponivel) {
        configurarControlesAluguel(carro, precoPorDia);
    }
}

function configurarControlesAluguel(carro, precoPorDia) {
    const inputDias = document.getElementById('dias-aluguel');
    const btnMenos = document.getElementById('btn-menos');
    const btnMais = document.getElementById('btn-mais');
    const textoTotal = document.getElementById('texto-total');
    const btnConfirmar = document.getElementById('btn-confirmar-aluguel');

    function atualizarTotal() {
        const dias = parseInt(inputDias.value) || 1;
        const total = precoPorDia * dias;
        const textoPlural = dias === 1 ? 'diária' : 'diárias';
        
        textoTotal.innerHTML = `${dias} ${textoPlural} = <strong>R$ ${total.toFixed(2)}</strong>`;
        btnConfirmar.textContent = `Confirmar Aluguel - R$ ${total.toFixed(2)}`;
    }

    btnMenos.addEventListener('click', () => {
        if (inputDias.value > 1) {
            inputDias.value = parseInt(inputDias.value) - 1;
            atualizarTotal();
        }
    });

    btnMais.addEventListener('click', () => {
        inputDias.value = parseInt(inputDias.value) + 1;
        atualizarTotal();
    });

    inputDias.addEventListener('input', atualizarTotal);

    btnConfirmar.addEventListener('click', async () => {
        try {
            const usuario_id = 1;
            const dias = parseInt(inputDias.value) || 1;

            if (dias < 1) {
                alert('⚠️ Selecione pelo menos 1 dia de aluguel.');
                return;
            }

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
                alert(`✅ Carro alugado com sucesso!\nTotal: R$ ${(precoPorDia * dias).toFixed(2)}`);
                // Recarrega a página para mostrar o novo status
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            } else if (response.status === 400) {
                alert('❌ Carro já alugado!');
                window.location.reload();
            } else {
                alert('⚠️ Ocorreu um erro ao tentar alugar o carro.');
            }
        } catch (error) {
            console.error('❌ ERRO COMPLETO:', error);
            alert('Erro ao tentar alugar o carro: ' + error.message);
        }
    });
}

let notaSelecionada = 0;

function selecionarNota(nota) {
    notaSelecionada = nota;

    const estrelas = document.querySelectorAll(".estrelas-selecao span");

    estrelas.forEach((estrela, index) => {
        if (index < nota) {
            estrela.classList.add("ativa");
        } else {
            estrela.classList.remove("ativa");
        }
    });
}

async function enviarAvaliacao(carroId) {

    if (notaSelecionada === 0) {
        alert("Selecione uma nota!");
        return;
    }

    try {
        const response = await fetch("http://127.0.0.1:5000/avaliar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                usuario_id: 1,
                nota: notaSelecionada,
                carro_id: carroId
            })
        });

        if (response.ok) {
            alert("⭐ Avaliação enviada!");
            notaSelecionada = 0;
            atualizarMedia(carroId);
        }

    } catch (error) {
        console.error("Erro ao enviar avaliação:", error);
    }
}

async function atualizarMedia(carroId) {

    try {
        const response = await fetch(`http://127.0.0.1:5000/carros/${carroId}/media`);
        const data = await response.json();

        mostrarMedia(data.media);

    } catch (error) {
        console.error("Erro ao buscar média:", error);
    }
}

function mostrarMedia(media) {

    const estrelasContainer = document.getElementById("media-estrelas");
    const numeroContainer = document.getElementById("media-numero");

    estrelasContainer.innerHTML = "";

    for (let i = 1; i <= 5; i++) {
        if (i <= Math.round(media)) {
            estrelasContainer.innerHTML += "★";
        } else {
            estrelasContainer.innerHTML += "☆";
        }
    }

    numeroContainer.innerHTML = `(${media.toFixed(1)})`;
}

// Atualiza os detalhes a cada 5 segundos para verificar disponibilidade
setInterval(carregarDetalhes, 5000);

window.onload = carregarDetalhes;