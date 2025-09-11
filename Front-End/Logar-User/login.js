document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login_form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); 

        const payload = {  
            email: document.getElementById("email").value,
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

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json(); 
            alert(result.message);
            window.location.href = "../HomePage/index.html"

        } catch(error) {
            console.error("Erro:", error);
            alert("Erro ao tentar logar: " + error.message);
        }
    });
});
