const token = sessionStorage.getItem('token');

if (token == null || token === "") {
    window.location.href = '/Index';
}

const urlAPI = "https://localhost:44353/";
let mostrarInativos = false;

$(document).ready(function () {
    function desabilitarCampos() {
        $("#txtnome_especialidade").prop("disabled", true);
        $("#ddlstatus").prop("disabled", true);
        $("#btnsalvar").prop("disabled", true);
    }

    function habilitarCampos() {
        $("#txtnome_especialidade").prop("disabled", false);
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

    $("#toggleInativos").click(function () {
        mostrarInativos = !mostrarInativos;
        const buttonText = mostrarInativos ? "Mostrar todos" : "Mostrar apenas inativos";
        $("#toggleInativos").text(buttonText);
        carregarEspecialidade();
    });

    $("#btnInativar").click(function () {
        let id = $("#txtid").val();
        if (id && id !== '0') {
            inativarEspecialidade(id);
        } else {
            alert("Selecione uma especialidade para inativar.");
        }
    });

    $("#btnlimpar").click(function () {
        limparFormulario();
    });

    if ($("#tabelaEspecialidade").length > 0) {
        carregarEspecialidade();
    } else if ($("#txtid").length > 0) {
        let params = new URLSearchParams(window.location.search);
        let id = params.get('id');
        if (id) {
            visualizar(id);
        }
    }

    $(document).on("click", ".alterar", function () {
        let codigo = $(this).closest("tr").find(".codigo").text();
        window.location.href = "/CadastroEspecialidade?id=" + codigo;
    });

    $(document).on("click", ".excluir", function () {
        let codigo = $(this).closest("tr").find(".codigo").text();
        inativarEspecialidade(codigo);
    });

    function validarCampos() {
        let isValid = true;
        $(".form-control").removeClass('is-invalid');
        $(".invalid-feedback").remove();

        if (!$("#txtnome_especialidade").val().trim() || $("#txtnome_especialidade").val().length > 50) {
            $("#txtnome_especialidade").addClass('is-invalid');
            $("#txtnome_especialidade").after('<div class="invalid-feedback">O nome da especialidade é obrigatório.</div>');
            isValid = false;
        }

        return isValid;
    }

    $(".form-control").on("input", function () {
        $(this).removeClass('is-invalid');
        $(this).next(".invalid-feedback").remove();
    });
    $("#toggleStatus").click(function () {
        mostrarInativos = !mostrarInativos;
        const buttonText = mostrarInativos ? "Mostrar Ativos" : "Mostrar Inativos";
        $(this).text(buttonText);
        carregarEspecialidade();
    });

    $(document).ready(function () {
        $("#btnsalvar").click(function () {
            if (validarCampos()) {
                const obj = {
                    id: $("#txtid").val(),
                    nome_especialidade: $("#txtnome_especialidade").val(),
                    status: $("#ddlstatus").val()
                };

                $.ajax({
                    type: obj.id == "0" ? "POST" : "PUT",
                    url: obj.id == "0" ? urlAPI + "api/Especialidade" : urlAPI + "api/Especialidade/" + obj.id,
                    contentType: "application/json;charset=utf-8",
                    headers: {
                        "Authorization": "Bearer " + token
                    },
                    data: JSON.stringify(obj),
                    success: function () {
                        limparFormulario();
                        $("#success-message").fadeIn().delay(1000).fadeOut();
                        desabilitarCampos();
                        if ($("#tabelaEspecialidade").length > 0) {
                            carregarEspecialidade();
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        alert("Erro ao salvar os dados: " + errorThrown);
                    }
                });
            }
        });
    });


    function limparFormulario() {
        $("#txtid").val('0');
        $("#txtnome_especialidade").val('');
        $("#ddlstatus").val('1');
        $(".form-control").removeClass('is-invalid');
        $(".invalid-feedback").remove();
    }

    function carregarEspecialidade() {
        $.ajax({
            url: urlAPI + "api/Especialidade",
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            },
            success: function (data) {
                $("#tabela").empty();
                $.each(data, function (index, item) {
                    if (mostrarInativos && item.status == 1) return;
                    if (!mostrarInativos && item.status != 1) return;

                    var linha = $("#linhaExemplo").clone().removeAttr("id").removeAttr("style");
                    $(linha).find(".codigo").html(item.id);
                    $(linha).find(".status").html(item.status == 1 ? "Ativo" : "Inativo");
                    $(linha).find(".nome_especialidade").html(item.nome_especialidade);
                    $(linha).show();
                    $("#tabela").append(linha);
                });
            },
            error: function () {
                alert("Erro ao carregar as especialidades.");
            }
        });
    }

    function inativarEspecialidade(id) {
        const obj = {
            id: id,
            nome_especialidade: $("#txtnome_especialidade").val(),
            status: 0 // Inativo
        };

        $.ajax({
            type: "PUT",
            url: urlAPI + "api/Especialidade/" + id,
            contentType: "application/json;charset=utf-8",
            headers: {
                "Authorization": "Bearer " + token
            },
            data: JSON.stringify(obj),
            success: function () {
                $("#inactivate-message").fadeIn().delay(1000).fadeOut();
                carregarEspecialidade();
                if ($("#txtid").val() == id) {
                    $("#ddlstatus").val('0');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Erro ao inativar a especialidade: " + errorThrown);
            }
        });
    }

    function visualizar(id) {
        $.ajax({
            type: "GET",
            url: urlAPI + "api/Especialidade/" + id,
            contentType: "application/json;charset=utf-8",
            headers: {
                "Authorization": "Bearer " + token
            },
            data: {},
            dataType: "json",
            success: function (jsonResult) {
                console.log(jsonResult);
                $("#txtid").val(jsonResult.id);
                $("#txtnome_especialidade").val(jsonResult.nome_especialidade);
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
