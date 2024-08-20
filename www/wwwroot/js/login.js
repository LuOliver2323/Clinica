$(document).ready(function () {
    $("#btnenviar").click(function () {
        $(".loading").show(); // Mostrar a mensagem de carregamento
        let progressBar = $(".progress-bar");
        let width = 0;

        function updateProgressBar() {
            if (width >= 100) {
                clearInterval(interval);
            } else {
                width += 10; // Incremento de 10%
                progressBar.css("width", width + "%");
            }
        }

        const interval = setInterval(updateProgressBar, 400); // Atualiza a barra a cada 400ms

        const usuario = {
            "id": 0,
            "nome": "string",
            "email": $("#txtemail").val(),
            "senha": $("#txtsenha").val()
        };

        //requisicao
        $.ajax({
            type: "POST",
            url: "https://localhost:44353/api/Usuario/validaLogin",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(usuario),
            dataType: "json",
            success: function (jsonResult) {
                console.log(jsonResult);
                sessionStorage.setItem('token', jsonResult.token);
                sessionStorage.setItem('idUsuario', jsonResult.id);
                sessionStorage.setItem('nomeUsuario', jsonResult.nome);
                window.location.href = "/HomePage";
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // Limpa mensagens de erro anteriores
                let errorMessage = "Login ou senha inválidos. Por favor, tente novamente.";
                if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
                    errorMessage = jqXHR.responseJSON.message;
                }
                $("#error-message").text(errorMessage).show();
                $(".loading").hide(); // Esconder a mensagem de carregamento
                clearInterval(interval); // Parar a atualização da barra de progresso
                progressBar.css("width", "0%"); // Resetar a barra de progresso
            }
        });
    });
});
