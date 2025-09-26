document.getElementById("cadastro_carro").addEventListener("submit", async function (event) {
    event.preventDefault(); // impede o envio padrão

    const form = document.getElementById("cadastro_carro");
    const formData = new FormData(form); 

    try {
        const url = "http://127.0.0.1:5000/car";

        const response = await fetch(url, {
            method: "POST",
            body: formData 
        });

        if (!response.ok) {
            throw new Error("Erro ao cadastrar carro");
        }

        const result = await response.json(); 
        alert(result.message || "Carro cadastrado com sucesso!");
        
        
    } catch (error) {
        console.error("Erro:", error.message);
        alert("Erro ao cadastrar carro");
    }
});
