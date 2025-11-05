document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login_form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const payload = {
            cpf: document.getElementById("cpf").value,
            senha: document.getElementById("senha").value
        };

        const url = "http://127.0.0.1:5000/login";

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (response.ok) {
                // ✅ salva o ID do usuário logado no localStorage
                if (result.user && result.user.id) {
                    localStorage.setItem("usuario_id", result.user.id);
                    console.log("Usuário logado, ID salvo:", result.user.id);
                } else {
                    console.warn("⚠️ Resposta do servidor não contém 'user.id':", result);
                }

                alert(result.message || "Login realizado com sucesso!");
                window.location.href = "../HomePage/index.html";
            } else {
                alert(result.error || "Falha no login");
            }

        } catch (error) {
            console.error("Erro:", error);
            alert("Erro ao tentar logar: " + error.message);
        }
    });
});
