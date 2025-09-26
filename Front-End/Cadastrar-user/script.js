document.getElementById("cadastro_form").addEventListener("submit", async function (event) {
    event.preventDefault(); 


    const data = {
        cpf: document.getElementById("cpf").value,
        nome: document.getElementById("nome").value,
        data_nascimento: document.getElementById("data_nascimento").value,
        telefone: document.getElementById("telefone").value,
        email: document.getElementById("email").value,
        cep: document.getElementById("cep").value,
        endereco: document.getElementById("endereco").value,
        numero: document.getElementById("numero").value,
        complemento: document.getElementById("complemento").value,
        bairro: document.getElementById("bairro").value,
        estado: document.getElementById("estado").value,
        cidade: document.getElementById("cidade").value,
        senha: document.getElementById("senha").value
    };

    const url = "http://127.0.0.1:5000/user";

    try {

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });


        const result = await response.json();



        alert(result.message);
        window.location.replace("../Logar-user/login.html");

    } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao cadastrar usuário");
    }
});
