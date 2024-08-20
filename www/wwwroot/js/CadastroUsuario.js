const token = sessionStorage.getItem('token');

if (token == null || token === "") {
    window.location.href = '/Index';
}

const urlAPI = "https://localhost:44353/";

$(document).ready(function () {
    function desabilitarCampos() {
        $("#txtnome").prop("disabled", true);
        $("#txtemail").prop("disabled", true);
        $("#txtsenha").prop("disabled", true);
        $("#txtstatus").prop("disabled", true);
        $("#btnsalvar").prop("disabled", true);
    }

    function habilitarCampos() {
        $("#txtnome").prop("disabled", false);
        $("#txtemail").prop("disabled", false);
        $("#txtsenha").prop("disabled", false);
        $("#txtstatus").prop("disabled", false);
        $("#btnsalvar").prop("disabled", false);
    }

    if ($("#tabela").length > 0) {
        carregarUsuarios();
    } else if ($("#txtid").length > 0) {
        let params = new URLSearchParams(window.location.search);
        let id = params.get('id');
        if (id) {
            visualizar(id);
        }
    }

    $("#btnlimpar").click(function () {
        limparFormulario();
    });

    $(document).on("click", ".alterar", function (elemento) {
        let codigo = $(elemento.target).closest("tr").find(".codigo").text();
        window.location.href = "/CadastroUsuario?id=" + codigo;
    });

    $(document).on("click", ".excluir", function (elemento) {
        let codigo = $(elemento.target).closest("tr").find(".codigo").text();
        excluir(codigo);
    });

    $("#btnInativar").click(function () {
        inativarUsuario();
    });

    function validarCampos() {
        let isValid = true;
        $(".form-control").removeClass('is-invalid');
        $(".invalid-feedback").remove();

        if (!$("#txtnome").val().trim()) {
            $("#txtnome").addClass('is-invalid');
            $("#txtnome").after('<div class="invalid-feedback">O nome do usuário é obrigatório.</div>');
            isValid = false;
        }

        if (!$("#txtemail").val().trim()) {
            $("#txtemail").addClass('is-invalid');
            $("#txtemail").after('<div class="invalid-feedback">O email do usuário é obrigatório.</div>');
            isValid = false;
        }

        if (!$("#txtsenha").val().trim() || $("#txtsenha").val().length < 4) {
            $("#txtsenha").addClass('is-invalid');
            $("#txtsenha").after('<div class="invalid-feedback">A senha é obrigatória e deve conter no mínimo 4 dígitos.</div>');
            isValid = false;
        }

        return isValid;
    }

    $(".form-control").on("input", function () {
        $(this).removeClass('is-invalid');
        $(this).next(".invalid-feedback").remove();
    });

    $("#btnsalvar").click(function () {
        if (validarCampos()) {
            const obj = {
                id: $("#txtid").val(),
                nome: $("#txtnome").val(),
                email: $("#txtemail").val(),
                senha: $("#txtsenha").val(),
                status: $("#txtstatus").val()
            };

            const url = obj.id == "0" ? urlAPI + "api/Usuario/criarUsuario" : urlAPI + "api/Usuario";

            $.ajax({
                type: obj.id == "0" ? "POST" : "PUT",
                url: url,
                contentType: "application/json;charset=utf-8",
                headers: {
                    "Authorization": "Bearer " + token
                },
                data: JSON.stringify(obj),
                success: function (response) {
                    limparFormulario();
                    alert(response.message || "Dados salvos com sucesso!");
                    desabilitarCampos();
                    $("#btnInativar").prop("disabled", false); // Sempre habilitar o botão Inativar
                    if ($("#tabela").length > 0) {
                        carregarUsuarios();
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    let errorMessage = "Erro ao salvar os dados.";
                    if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
                        errorMessage = jqXHR.responseJSON.message;
                    }
                    alert(errorMessage);
                }
            });
        }
    });

    function inativarUsuario() {
        const id = $("#txtid").val();
        if (id == "0") {
            alert("Selecione um usuário para inativar.");
            return;
        }

        const statusAtual = $("#txtstatus").val();
        if (statusAtual == "0") {
            alert("O usuário já está inativo.");
            return;
        }

        $.ajax({
            type: "PUT",
            url: urlAPI + "api/Usuario/Inativar/" + id,
            contentType: "application/json;charset=utf-8",
            headers: {
                "Authorization": "Bearer " + token
            },
            success: function () {
                alert("Usuário inativado com sucesso!");
                visualizar(id); // Atualizar a tela com o registro atualizado
                desabilitarCampos();
                $("#btnInativar").prop("disabled", false); // Sempre habilitar o botão Inativar
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Erro ao inativar o usuário: " + errorThrown);
            }
        });
    }

    $("#btnNovo").click(function () {
        habilitarCampos();
        limparFormulario();
        $("#btnInativar").prop("disabled", false); // Sempre habilitar o botão Inativar
    });

    $("#btnEditar").click(function () {
        habilitarCampos();
    });

    function limparFormulario() {
        $("#txtid").val('0');
        $("#txtnome").val('');
        $("#txtemail").val('');
        $("#txtsenha").val('');
        $("#txtstatus").val('1'); // Padrão como ativo
        $(".form-control").removeClass('is-invalid');
        $(".invalid-feedback").remove();
    }

    function carregarUsuarios() {
        $.ajax({
            type: "GET",
            url: urlAPI + "api/Usuario",
            contentType: "application/json;charset=utf-8",
            headers: {
                "Authorization": "Bearer " + token
            },
            data: {},
            dataType: "json",
            success: function (jsonResult) {
                console.log(jsonResult);
                $("#tabela").empty();
                $.each(jsonResult, function (index, item) {
                    var linha = $("#linhaExemplo").clone().removeAttr("id").removeAttr("style");
                    $(linha).find(".codigo").html(item.id);
                    $(linha).find(".nome").html(item.nome);
                    $(linha).find(".email").html(item.email);
                    $(linha).find(".senha").html(item.senha);
                    $(linha).find(".status").html(item.status === 1 ? "Ativo" : "Inativo");

                    $(linha).show();
                    $("#tabela").append(linha);
                });
            },
            error: function () {
                alert("Erro ao carregar os usuários.");
            }
        });
    }

    function excluir(codigo) {
        $.ajax({
            type: "DELETE",
            url: urlAPI + "api/Usuario/" + codigo,
            contentType: "application/json;charset=utf-8",
            headers: {
                "Authorization": "Bearer " + token
            },
            success: function () {
                alert('Exclusão efetuada!');
                carregarUsuarios();
            },
            error: function (xhr, textStatus, errorThrown) {
                alert("Erro ao excluir o usuário: " + errorThrown);
            }
        });
    }

    function visualizar(codigo) {
        $.ajax({
            type: "GET",
            url: urlAPI + "api/Usuario/" + codigo,
            contentType: "application/json;charset=utf-8",
            headers: {
                "Authorization": "Bearer " + token
            },
            data: {},
            dataType: "json",
            success: function (jsonResult) {
                console.log(jsonResult);
                $("#txtid").val(jsonResult.id);
                $("#txtnome").val(jsonResult.nome);
                $("#txtemail").val(jsonResult.email);
                $("#txtsenha").val(jsonResult.senha);
                $("#txtstatus").val(jsonResult.status);
                desabilitarCampos();
                $("#btnInativar").prop("disabled", false); // Sempre habilitar o botão Inativar
            },
            error: function (response) {
                alert("Erro ao carregar os dados: " + response);
            }
        });
    }

    desabilitarCampos();
    $("#btnInativar").prop("disabled", false); // Sempre habilitar o botão Inativar
});
