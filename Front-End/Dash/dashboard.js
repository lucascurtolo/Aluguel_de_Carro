async function carregarDashboard() {

    try {
        // Buscar carros
        const resCarros = await fetch("http://127.0.0.1:5000/allcars");
        const carros = await resCarros.json();

        // Buscar alugueis
        const resAlugueis = await fetch("http://127.0.0.1:5000/meusalugueis");
        const alugueis = await resAlugueis.json();

        const disponiveis = carros.filter(c => c.status === "disponivel").length;
        const alugados = alugueis.filter(a => a.status === "ativo").length;
        const devolvidos = alugueis.filter(a => a.status === "finalizado").length;

        // Atualiza cards
        document.getElementById("numDispo").textContent = disponiveis;
        document.getElementById("numAlugados").textContent = alugados;
        document.getElementById("numDevolvidos").textContent = devolvidos;

        // Gráfico
        new Chart(document.getElementById("graficoStatus"), {
            type: "bar",
            data: {
                labels: ["Disponíveis", "Alugados", "Devolvidos"],
                datasets: [{
                    label: "Quantidade",
                    data: [disponiveis, alugados, devolvidos],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });

    } catch (err) {
        console.error("Erro ao carregar dashboard:", err);
    }
}

carregarDashboard();
