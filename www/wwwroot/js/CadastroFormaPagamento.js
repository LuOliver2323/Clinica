const token = sessionStorage.getItem('token');

if (token == null || token === "") {
    window.location.href = '/Index';
}

const urlAPI = "https://localhost:44353/";

$(document).ready(function () {
    function desabilitarCampos() {
        $("#txtdescricao").prop("disabled", true);
        $("#txttipo").prop("disabled", true);
        $("#txttaxa_cartao").prop("disabled", true);
        $("#ddlstatus").prop("disabled", true);
        $("#btnsalvar").prop("disabled", true);
    }

    function habilitarCampos() {
        $("#txtdescricao").prop("disabled", false);
        $("#txttipo").prop("disabled", false);
        $("#txttaxa_cartao").prop("disabled", false);
        $("#ddlstatus").prop("disabled", false);
        $("#btnsalvar").prop("disabled", false);
    }

    $("#btnNovo").click(function () {
        habilitarCampos();
        limparFormulario();
    });

    $("#btnEditar").click(function () {
        habilitarCampos();
    });

    $("#btnInativar").click(function () {
        let id = $("#txtid").val();
        if (id == "0") {
            alert("Selecione uma forma de pagamento para inativar.");
            return;
        }
        inativarFormaPagamento(id);
    });

    $("#btnlimpar").click(function () {
        limparFormulario();
    });

    if ($("#tabelaFormaPagamento").length > 0) {
        carregarFormaPagamento();
    } else if ($("#txtid").length > 0) {
        let params = new URLSearchParams(window.location.search);
        let id = params.get('id');
        if (id) {
            visualizar(id);
        }
    }

    $(document).on("click", ".alterar", function (elemento) {
        let codigo = $(elemento.target).closest("tr").find(".codigo").text();
        window.location.href = "/CadastroFormaPagamento?id=" + codigo;
    });

    $(document).on("click", ".excluir", function (elemento) {
        let codigo = $(elemento.target).closest("tr").find(".codigo").text();
        inativarFormaPagamento(codigo);
    });

    function validarCampos() {
        let isValid = true;
        $(".form-control").removeClass('is-invalid');
        $(".invalid-feedback").remove();

        if (!$("#txtdescricao").val().trim() || $("#txtdescricao").val().length > 50) {
            $("#txtdescricao").addClass('is-invalid');
            $("#txtdescricao").after('<div class="invalid-feedback">A descrição é obrigatória.</div>');
            isValid = false;
        }

        if (!$("#txttipo").val().trim() || $("#txttipo").val().length > 50) {
            $("#txttipo").addClass('is-invalid');
            $("#txttipo").after('<div class="invalid-feedback">O tipo é obrigatório.</div>');
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
                descricao: $("#txtdescricao").val(),
                tipo: $("#txttipo").val(),
                taxa_cartao: $("#txttaxa_cartao").val(),
                status: $("#ddlstatus").val()
            };

            $.ajax({
                type: obj.id == "0" ? "POST" : "PUT",
                url: obj.id == "0" ? urlAPI + "api/FormaPagamento" : urlAPI + "api/FormaPagamento/" + obj.id,
                contentType: "application/json;charset=utf-8",
                headers: {
                    "Authorization": "Bearer " + token
                },
                data: JSON.stringify(obj),
                success: function () {
                    limparFormulario();
                    alert("Dados salvos com sucesso!");
                    desabilitarCampos();
                    if ($("#tabelaFormaPagamento").length > 0) {
                        carregarFormaPagamento();
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("Erro ao salvar os dados: " + errorThrown);
                    habilitarCampos(); // Manter campos habilitados em caso de erro
                }
            });
        }
    });

    function limparFormulario() {
        $("#txtid").val('0');
        $("#txtdescricao").val('');
        $("#txttipo").val('');
        $("#txttaxa_cartao").val('');
        $("#ddlstatus").val('1');
        $(".form-control").removeClass('is-invalid');
        $(".invalid-feedback").remove();
    }

    function carregarFormaPagamento() {
        $.ajax({
            url: urlAPI + "api/FormaPagamento",
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
                    $(linha).find(".descricao").html(item.descricao);
                    $(linha).find(".tipo").html(item.tipo);
                    $(linha).find(".alterar").attr("data-id", item.id);
                    $(linha).find(".excluir").attr("data-id", item.id);
                    $(linha).show();
                    $("#tabela").append(linha);
                });
            },
            error: function () {
                alert("Erro ao carregar as formas de pagamento.");
            }
        });
    }

    function inativarFormaPagamento(id) {
        if (id == "0") {
            alert("Selecione uma forma de pagamento para inativar.");
            return;
        }

        const obj = {
            id: id,
            descricao: $("#txtdescricao").val(),
            tipo: $("#txttipo").val(),
            taxa_cartao: $("#txttaxa_cartao").val(),
            status: 0 // Inativo
        };

        $.ajax({
            type: "PUT",
            url: urlAPI + "api/FormaPagamento/" + id,
            contentType: "application/json;charset=utf-8",
            headers: {
                "Authorization": "Bearer " + token
            },
            data: JSON.stringify(obj),
            success: function () {
                alert("Forma de pagamento inativada com sucesso!");
                $("#ddlstatus").val(0); // Atualiza o status na tela para inativo
                carregarFormaPagamento();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Erro ao inativar a forma de pagamento: " + errorThrown);
            }
        });
    }

    function excluir(codigo) {
        $.ajax({
            type: "DELETE",
            url: urlAPI + "api/FormaPagamento/" + codigo,
            contentType: "application/json;charset=utf-8",
            headers: {
                "Authorization": "Bearer " + token
            },
            success: function () {
                alert('Exclusão efetuada!');
                carregarFormaPagamento();
            },
            error: function (xhr, textStatus, errorThrown) {
                alert("Erro ao excluir a forma de pagamento: " + errorThrown);
            }
        });
    }

    function visualizar(id) {
        $.ajax({
            type: "GET",
            url: urlAPI + "api/FormaPagamento/" + id,
            contentType: "application/json;charset=utf-8",
            headers: {
                "Authorization": "Bearer " + token
            },
            data: {},
            dataType: "json",
            success: function (jsonResult) {
                console.log(jsonResult);
                $("#txtid").val(jsonResult.id);
                $("#txtdescricao").val(jsonResult.descricao);
                $("#txttipo").val(jsonResult.tipo);
                $("#txttaxa_cartao").val(jsonResult.taxa_cartao);
                $("#ddlstatus").val(jsonResult.status);
                desabilitarCampos();
            },
            error: function (response) {
                alert("Erro ao carregar os dados: " + response);
            }
        });
    }

    desabilitarCampos();
});
