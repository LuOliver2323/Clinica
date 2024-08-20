const token = sessionStorage.getItem('token');

if (token == null || token === "") {
    window.location.href = '/Index';
}

const urlAPI = "https://localhost:44353/";

$(document).ready(function () {
    function desabilitarCampos() {
        $("#txtnome_condicao").prop("disabled", true);
        $("#ddlstatus").prop("disabled", true);
        $("#txtparcelas").prop("disabled", true);
        $("#btnsalvar").prop("disabled", true);
    }

    function habilitarCampos() {
        $("#txtnome_condicao").prop("disabled", false);
        $("#ddlstatus").prop("disabled", false);
        $("#txtparcelas").prop("disabled", false);
        $("#btnsalvar").prop("disabled", false);
    }

    if ($("#tabela").length > 0) {
        carregarCondicaoPagamento();
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
        window.location.href = "/CondicaoPagamento?id=" + codigo;
    });

    $(document).on("click", ".excluir", function (elemento) {
        let codigo = $(elemento.target).closest("tr").find(".codigo").text();
        excluir(codigo);
    });

    function validarCampos() {
        let isValid = true;
        $(".form-control").removeClass('is-invalid');
        $(".invalid-feedback").remove();

        if (!$("#txtnome_condicao").val().trim() || $("#txtnome_condicao").val().length > 50) {
            $("#txtnome_condicao").addClass('is-invalid');
            $("#txtnome_condicao").after('<div class="invalid-feedback">O nome da condição é obrigatório.</div>');
            isValid = false;
        }

        if (!$("#txtparcelas").val().trim() || $("#txtparcelas").val() <= 0) {
            $("#txtparcelas").addClass('is-invalid');
            $("#txtparcelas").after('<div class="invalid-feedback">O número de parcelas é obrigatório e deve ser maior que 0.</div>');
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
                nome_condicao: $("#txtnome_condicao").val(),
                status: $("#ddlstatus").val(),
                parcelas: $("#txtparcelas").val()
            };

            $.ajax({
                type: obj.id == "0" ? "POST" : "PUT",
                url: urlAPI + "api/CondicaoPagamento" + (obj.id == "0" ? "" : "/" + obj.id),
                contentType: "application/json;charset=utf-8",
                headers: {
                    "Authorization": "Bearer " + token
                },
                data: JSON.stringify(obj),
                success: function () {
                    limparFormulario();
                    alert("Dados salvos com sucesso!");
                    desabilitarCampos();
                    if ($("#tabela").length > 0) {
                        carregarCondicaoPagamento();
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("Erro ao salvar os dados: " + errorThrown);
                    habilitarCampos(); // Manter campos habilitados em caso de erro
                }
            });
        }
    });

    $("#btnNovo").click(function () {
        habilitarCampos();
        limparFormulario();
    });

    $("#btnEditar").click(function () {
        habilitarCampos();
    });

    $("#btnInativar").click(function () {
        inativarCondicaoPagamento();
    });

    function inativarCondicaoPagamento() {
        const id = $("#txtid").val();
        if (id == "0") {
            alert("Selecione uma condição de pagamento para inativar.");
            return;
        }

        const obj = {
            id: id,
            nome_condicao: $("#txtnome_condicao").val(),
            status: 0, // Inativo
            parcelas: $("#txtparcelas").val()
        };

        $.ajax({
            type: "PUT",
            url: urlAPI + "api/CondicaoPagamento/" + id,
            contentType: "application/json;charset=utf-8",
            headers: {
                "Authorization": "Bearer " + token
            },
            data: JSON.stringify(obj),
            success: function () {
                alert("Condição de pagamento inativada com sucesso!");
                desabilitarCampos();
                visualizar(id); // Atualizar a tela com o registro atualizado
                if ($("#tabela").length > 0) {
                    carregarCondicaoPagamento();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Erro ao inativar a condição de pagamento: " + errorThrown);
            }
        });
    }

    function limparFormulario() {
        $("#txtid").val('0');
        $("#txtnome_condicao").val('');
        $("#ddlstatus").val('1');
        $("#txtparcelas").val('');
        $(".form-control").removeClass('is-invalid');
        $(".invalid-feedback").remove();
    }

    function carregarCondicaoPagamento() {
        $.ajax({
            url: urlAPI + "api/CondicaoPagamento",
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            },
            success: function (data) {
                $("#tabela").empty();
                $.each(data, function (index, item) {
                    var linha = $("#linhaExemplo").clone().removeAttr("id").removeAttr("style");
                    $(linha).find(".codigo").html(item.id);
                    $(linha).find(".Status").html(item.status == 1 ? "Ativo" : "Inativo");
                    $(linha).find(".nome_condicao").html(item.nome_condicao);
                    $(linha).find(".alterar").attr("data-id", item.id);
                    $(linha).find(".excluir").attr("data-id", item.id);
                    $(linha).show();
                    $("#tabela").append(linha);
                });
            },
            error: function () {
                alert("Erro ao carregar as condições de pagamento.");
            }
        });
    }

    function excluir(codigo) {
        $.ajax({
            type: "DELETE",
            url: urlAPI + "api/CondicaoPagamento/" + codigo,
            contentType: "application/json;charset=utf-8",
            headers: {
                "Authorization": "Bearer " + token
            },
            success: function () {
                alert('Exclusão efetuada!');
                carregarCondicaoPagamento();
            },
            error: function (xhr, textStatus, errorThrown) {
                alert("Erro ao excluir a condição de pagamento: " + errorThrown);
            }
        });
    }

    function visualizar(codigo) {
        $.ajax({
            type: "GET",
            url: urlAPI + "api/CondicaoPagamento/" + codigo,
            contentType: "application/json;charset=utf-8",
            headers: {
                "Authorization": "Bearer " + token
            },
            data: {},
            dataType: "json",
            success: function (jsonResult) {
                console.log(jsonResult);
                $("#txtid").val(jsonResult.id);
                $("#txtnome_condicao").val(jsonResult.nome_condicao);
                $("#ddlstatus").val(jsonResult.status);
                $("#txtparcelas").val(jsonResult.parcelas);
                desabilitarCampos();
            },
            error: function (response) {
                alert("Erro ao carregar os dados: " + response);
            }
        });
    }

    desabilitarCampos();
});
