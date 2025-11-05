async function carregarMinhasReservas() {
    try {
        // 🔑 pega o ID do usuário logado salvo no login
        const usuario_id = localStorage.getItem("usuario_id");

        if (!usuario_id) {
            alert("Você precisa estar logado para ver suas reservas.");
            window.location.href = "../Logar-user/login.html"; // redireciona pro login
            return;
        }

        // 🔄 busca as reservas do usuário
       const response = await fetch(`http://127.0.0.1:5000/meusalugueis?usuario_id=${usuario_id}`);

        if (!response.ok) {
            throw new Error("Erro ao buscar suas reservas");
        }

        const alugueis = await response.json();
        console.log("📦 Reservas recebidas:", alugueis);

        exibirReservas(alugueis);
    } catch (erro) {
        console.error("❌ Erro ao carregar reservas:", erro);
        alert("Erro ao carregar suas reservas.");
    }
}

// 🧩 função que mostra as reservas na tela
function exibirReservas(alugueis) {
    const container = document.getElementById("lista-carros");

    if (!alugueis || alugueis.length === 0) {
        container.innerHTML = `<p class="sem-carros">Você ainda não fez nenhuma reserva.</p>`;
        return;
    }

    container.innerHTML = alugueis.map(aluguel => {
        const primeiraImagem = aluguel.imagens && aluguel.imagens.length > 0
            ? `http://localhost:5000/${aluguel.imagens[0]}`
            : "img/carro-placeholder.png";

        return `
            <div class="card-carro">
                <img src="${primeiraImagem}" alt="${aluguel.marca} ${aluguel.modelo}" class="imagem-carro">
                <div class="info-carro">
                    <h3>${aluguel.marca} ${aluguel.modelo}</h3>
                    <p><strong>Ano:</strong> ${aluguel.ano}</p>
                    <p><strong>Período:</strong> ${aluguel.data_inicio} até ${aluguel.data_fim}</p>
                    <p><strong>Preço por dia:</strong> R$ ${aluguel.preco_por_dia.toFixed(2)}</p>
                </div>
            </div>
        `;
    }).join("");
}

// 🔄 chama a função quando a página abre
window.onload = carregarMinhasReservas;
