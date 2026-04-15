async function carregarMinhasReservas() {
    try {
        // 🔑 pega o ID do usuário logado salvo no login
        const usuario_id = 1;
        

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

    const reservasAtivas = alugueis.filter(aluguel => aluguel.status === "ativo");

    if (!reservasAtivas || reservasAtivas.length === 0) {
        container.innerHTML = `<p class="sem-carros">Você não tem reservas ativas.</p>`;
        return;
    }

    // if (!alugueis || alugueis.length === 0) {
    //     container.innerHTML = `<p class="sem-carros">Você ainda não fez nenhuma reserva.</p>`;
    //     return;
    // }

    container.innerHTML = reservasAtivas.map(aluguel => {
        const primeiraImagem = aluguel.imagens && aluguel.imagens.length > 0
            ? `http://localhost:5000/${aluguel.imagens[0]}`
            : "img/carro-placeholder.png";

        // Se o aluguel estiver finalizado, mostra “Devolvido” em vez do botão
        const botao = aluguel.status === "finalizado"
            ? `<button class="btn-devolvido" disabled>Devolvido</button>`
            : `<button class="btn-devolver" onclick="devolverCarro(${aluguel.aluguel_id})">Devolver</button>`;

        return `
            <div class="card-carro" id="card-${aluguel.aluguel_id}">
                <img src="${primeiraImagem}" alt="${aluguel.marca} ${aluguel.modelo}" class="imagem-carro">
                <div class="info-carro">
                    <h3>${aluguel.marca} ${aluguel.modelo}</h3>
                    <p><strong>Ano:</strong> ${aluguel.ano}</p>
                    <p><strong>Período:</strong> ${aluguel.data_inicio} até ${aluguel.data_fim}</p>
                    <p><strong>Preço por dia:</strong> R$ ${aluguel.preco_por_dia.toFixed(2)}</p>
                    ${botao}
                </div>
            </div>
        `;
    }).join("");
}

// 🆕 Função atualizada
async function devolverCarro(aluguelId) {
    try {
        const response = await fetch(`http://127.0.0.1:5000/devolver/${aluguelId}`, {
            method: "PUT",
        });

        const resultado = await response.json();

        if (!response.ok) {
            alert(resultado.erro || "Erro ao devolver o carro");
            return;
        }

        alert(resultado.mensagem || "Carro devolvido com sucesso!");

        // 🧩 Atualiza o botão para "Devolvido" sem recarregar
        const card = document.querySelector(`#card-${aluguelId}`);
        if (card) {
            const botao = card.querySelector("button");
            if (botao) {
                botao.textContent = "Devolvido";
                botao.classList.remove("primary", "btn-devolver");
                botao.classList.add("btn-devolvido");
                botao.disabled = true;
            }
        }

        // Remove o carro da página "Minhas Reservas"
        setTimeout(() => {
            card.remove();
        }, 1000);

    } catch (erro) {
        console.error("❌ Erro ao devolver carro:", erro);
        alert("Erro ao devolver o carro.");
    }
}

// 🔄 chama a função quando a página abre
window.onload = carregarMinhasReservas;
