document.getElementById("cadastro_carro").addEventListener("submit", async function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const form = document.getElementById("cadastro_carro");
    const formData = new FormData(form);

    // Validação rápida (exemplo)
    const preco = parseFloat(formData.get("preco_por_dia"));
    if (isNaN(preco) || preco <= 0) {
        alert("Por favor, insira um preço válido para o aluguel diário.");
        return;
    }

    try {
        const response = await fetch("http://127.0.0.1:5000/car", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message || "Carro cadastrado com sucesso!");
            form.reset(); // limpa o formulário
        } else {
            alert(result.message || "Erro ao cadastrar carro");
        }

        console.log("Resposta do servidor:", result);

    } catch (error) {
        console.error("Erro:", error);
        alert("Ocorreu um erro ao cadastrar o carro. Verifique o console.");
    }
});
