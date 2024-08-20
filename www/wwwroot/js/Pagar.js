const token = sessionStorage.getItem('token');

if (token == null || token === "") {
    window.location.href = '/Index';
}

const urlAPI = "https://localhost:44353/";

$(document).ready(function () {
    if ($("#tabela").length > 0) {
        carregarPagar();
    } else if ($("#txtid").length > 0) {
        let params = new URLSearchParams(window.location.search);
        let id = params.get('id');
        if (id) {
            visualizar(id);
        }
        travarCampos(); // Trava os campos ao carregar a página
    }

    $("#btnNovo").click(function () {
        limparFormulario();
        liberarCampos(); // Destrava os campos ao clicar em "Novo"
    });

    $("#btnEditar").click(function () {
        liberarCampos();
    });

    $("#btnInativar").click(function () {
        inativarPagar();
    });

    $("#btnlimpar").click(function () {
        limparFormulario();
    });

    $(document).on("click", ".alterar", function (elemento) {
        let codigo = $(elemento.target).closest("tr").find(".codigo").text();
        window.location.href = "/ContasPagar?id=" + codigo;
    });

    $(document).on("click", ".excluir", function (elemento) {
        let codigo = $(elemento.target).closest("tr").find(".codigo").text();
        excluir(codigo);
    });

    $(document).on("click", ".baixar", function (elemento) {
        let codigo = $(elemento.target).closest("tr").find(".codigo").text();
        window.location.href = "/BaixaContasPagar?id=" + codigo;
    });

    $("#btnBaixar").click(function () {
        let id = $("#txtid").val();
        if (id == "0") {
            alert("Selecione uma conta a pagar para baixar.");
            return;
        }
        window.location.href = "/BaixaContasPagar?id=" + id;
    });

    function validarCampos() {
        let isValid = true;
        $(".form-control").removeClass('is-invalid');
        $(".invalid-feedback").remove();

        if (!$("#txtdataemissao").val().trim()) {
            $("#txtdataemissao").addClass('is-invalid');
            $("#txtdataemissao").after('<div class="invalid-feedback">A data de emissão é obrigatória.</div>');
            isValid = false;
        }

        if (!$("#txtdatavencimento").val().trim()) {
            $("#txtdatavencimento").addClass('is-invalid');
            $("#txtdatavencimento").after('<div class="invalid-feedback">A data de vencimento é obrigatória.</div>');
            isValid = false;
        } else {
            let dataEmissao = new Date($("#txtdataemissao").val());
            let dataVencimento = new Date($("#txtdatavencimento").val());

            if (dataVencimento < dataEmissao) {
                $("#txtdatavencimento").addClass('is-invalid');
                $("#txtdatavencimento").after('<div class="invalid-feedback">A data de vencimento não pode ser menor que a data de emissão.</div>');
                isValid = false;
            }
        }

        if (!$("#txtvalor").val().trim() || parseFloat($("#txtvalor").val()) <= 0) {
            $("#txtvalor").addClass('is-invalid');
            $("#txtvalor").after('<div class="invalid-feedback">O valor deve ser maior que zero.</div>');
            isValid = false;
        }

        if (!$("#txtparcelas").val().trim()) {
            $("#txtparcelas").addClass('is-invalid');
            $("#txtparcelas").after('<div class="invalid-feedback">As parcelas são obrigatórias.</div>');
            isValid = false;
        }

        if (!$("#txtfornecedor").val().trim()) {
            $("#txtfornecedor").addClass('is-invalid');
            $("#txtfornecedor").after('<div class="invalid-feedback">O fornecedor é obrigatório.</div>');
            isValid = false;
        }

        if (!$("#txtdocumento").val().trim()) {
            $("#txtdocumento").addClass('is-invalid');
            $("#txtdocumento").after('<div class="invalid-feedback">O documento é obrigatório.</div>');
            isValid = false;
        }

        return isValid;
    }

    $(".form-control").on("input", function () {
        $(this).removeClass('is-invalid');
        $(this).next(".invalid-feedback").remove();
    });

    $("#txtparcelas").on("input", function () {
        gerarParcelas();
    });

    function gerarParcelas() {
        let valor = parseFloat($("#txtvalor").val()) || 0;
        let parcelasInfo = $("#txtparcelas").val().split("/");
        let numParcelas = parseInt(parcelasInfo[1]) || 0;

        $("#parcelasGeradas").empty();

        if (numParcelas > 0) {
            let valorParcela = (valor / numParcelas).toFixed(2);
            for (let i = 1; i <= numParcelas; i++) {
                $("#parcelasGeradas").append(`<li class="list-group-item">Parcela ${i}: R$ ${valorParcela}</li>`);
            }
        }
    }

    $("#btnsalvar").click(function () {
        if (validarCampos()) {
            let id = $("#txtid").val();
            if (id == "0") {
                criarNovasParcelas();
            } else {
                atualizarParcelaExistente(id);
            }
        }
    });

    function criarNovasParcelas() {
        let dataEmissao = $("#txtdataemissao").val();
        let dataVencimento = $("#txtdatavencimento").val();
        let valor = $("#txtvalor").val();
        let parcelasInfo = $("#txtparcelas").val().split("/");
        let numParcelas = parseInt(parcelasInfo[1]) || 0;

        for (let i = 1; i <= numParcelas; i++) {
            const obj = {
                id: "0",
                dataemissao: dataEmissao,
                datavencimento: calcularDataVencimento(dataVencimento, i),
                valor: (valor / numParcelas).toFixed(2),
                parcelas: `${i}/${numParcelas}`,
                fornecedor: $("#txtfornecedor").val(),
                documento: $("#txtdocumento").val(),
                valordesconto: $("#txtvalordesconto").val(),
                valorpago: $("#txtvalorpago").val(),
                juros: $("#txtjuros").val(),
                multas: $("#txtmultas").val(),
                observacoes: $("#txtobservacoes").val(),
                status: 1 // Considerando que um novo registro está ativo por padrão
            };

            const url = urlAPI + "api/ContasPagar";

            $.ajax({
                type: "POST",
                url: url,
                contentType: "application/json;charset=utf-8",
                headers: {
                    "Authorization": "Bearer " + token
                },
                data: JSON.stringify(obj),
                success: function () {
                    if (i === numParcelas) {
                        limparFormulario();
                        alert("Dados salvos com sucesso!");
                        carregarPagar();
                        travarCampos(); // Trava os campos após salvar
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("Erro ao salvar os dados: " + errorThrown);
                }
            });
        }
    }

    function atualizarParcelaExistente(id) {
        const obj = {
            id: id,
            dataemissao: $("#txtdataemissao").val(),
            datavencimento: $("#txtdatavencimento").val(),
            valor: $("#txtvalor").val(),
            parcelas: $("#txtparcelas").val(),
            fornecedor: $("#txtfornecedor").val(),
            documento: $("#txtdocumento").val(),
            valordesconto: $("#txtvalordesconto").val(),
            valorpago: $("#txtvalorpago").val(),
            juros: $("#txtjuros").val(),
            multas: $("#txtmultas").val(),
            observacoes: $("#txtobservacoes").val(),
            status: 1 // Atualizar o status conforme necessário
        };

        const url = urlAPI + "api/ContasPagar/" + id;

        $.ajax({
            type: "PUT",
            url: url,
            contentType: "application/json;charset=utf-8",
            headers: {
                "Authorization": "Bearer " + token
            },
            data: JSON.stringify(obj),
            success: function () {
                alert("Dados atualizados com sucesso!");
                carregarPagar();
                travarCampos(); // Trava os campos após atualizar
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Erro ao atualizar os dados: " + errorThrown);
            }
        });
    }

    function inativarPagar() {
        let id = $("#txtid").val();
        if (id == "0") {
            alert("Selecione uma conta a pagar para inativar.");
            return;
        }

        $.ajax({
            type: "PUT",
            url: urlAPI + "api/ContasPagar/Inativar/" + id,
            contentType: "application/json;charset=utf-8",
            headers: {
                "Authorization": "Bearer " + token
            },
            success: function () {
                alert("Conta a pagar inativada com sucesso!");
                carregarPagar();
                visualizar(id); // Recarrega os dados do registro atualizado
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Erro ao inativar a conta a pagar: " + errorThrown);
            }
        });
    }

    function limparFormulario() {
        $("#txtid").val('0');
        $("#txtdataemissao").val('');
        $("#txtdatavencimento").val('');
        $("#txtvalor").val('');
        $("#txtparcelas").val('');
        $("#txtfornecedor").val('');
        $("#txtdocumento").val('');
        $("#txtvalordesconto").val('');
        $("#txtvalorpago").val('');
        $("#txtjuros").val('');
        $("#txtmultas").val('');
        $("#txtobservacoes").val('');
        $("#parcelasGeradas").empty();
        $(".form-control").removeClass('is-invalid');
        $(".invalid-feedback").remove();
    }

    function carregarPagar() {
        $.ajax({
            type: "GET",
            url: urlAPI + "api/ContasPagar",
            contentType: "application/json;charset=utf-8",
            headers: {
                "Authorization": "Bearer " + token
            },
            success: function (jsonResult) {
                console.log(jsonResult);
                $("#tabela").empty();
                $.each(jsonResult, function (index, item) {
                    var linha = $("#linhaExemplo").clone().removeAttr("id").removeAttr("style");
                    $(linha).find(".codigo").html(item.id);
                    $(linha).find(".Status").html(item.status === 1 ? "Ativo" : "Inativo");
                    $(linha).find(".dataemissao").html(item.dataemissao);
                    $(linha).find(".fornecedor").html(item.fornecedor);
                    $(linha).find(".valor").html(item.valor);
                    $(linha).find(".datavencimento").html(item.datavencimento);
                    $(linha).show();
                    $("#tabela").append(linha);
                });
            },
            error: function (xhr, textStatus, errorThrown) {
                alert("Erro ao carregar as contas a pagar: " + errorThrown);
            }
        });
    }

    function excluir(codigo) {
        $.ajax({
            type: "DELETE",
            url: urlAPI + "api/ContasPagar/" + codigo,
            contentType: "application/json;charset=utf-8",
            headers: {
                "Authorization": "Bearer " + token
            },
            success: function () {
                alert('Exclusão efetuada!');
                carregarPagar();
            },
            error: function (xhr, textStatus, errorThrown) {
                alert("Erro ao excluir a conta a pagar: " + errorThrown);
            }
        });
    }

    function visualizar(codigo) {
        $.ajax({
            type: "GET",
            url: urlAPI + "api/ContasPagar/" + codigo,
            contentType: "application/json;charset=utf-8",
            headers: {
                "Authorization": "Bearer " + token
            },
            dataType: "json",
            success: function (jsonResult) {
                console.log(jsonResult);
                $("#txtid").val(jsonResult.id);
                $("#txtdataemissao").val(jsonResult.dataemissao.substring(0, 10));
                $("#txtdatavencimento").val(jsonResult.datavencimento.substring(0, 10));
                $("#txtvalor").val(jsonResult.valor);
                $("#txtparcelas").val(jsonResult.parcelas);
                $("#txtfornecedor").val(jsonResult.fornecedor);
                $("#txtdocumento").val(jsonResult.documento);
                $("#txtvalordesconto").val(jsonResult.valordesconto);
                $("#txtvalorpago").val(jsonResult.valorpago);
                $("#txtjuros").val(jsonResult.juros);
                $("#txtmultas").val(jsonResult.multas);
                $("#txtobservacoes").val(jsonResult.observacoes);
                travarCampos(); // Trava os campos ao visualizar
                $("#ddlstatus").val(jsonResult.status); // Atualiza o status na tela
            },
            error: function (response) {
                alert("Erro ao carregar os dados: " + response);
            }
        });
    }

    function calcularDataVencimento(dataVencimento, parcela) {
        let data = new Date(dataVencimento);
        data.setMonth(data.getMonth() + (parcela - 1));
        let dia = ("0" + data.getDate()).slice(-2);
        let mes = ("0" + (data.getMonth() + 1)).slice(-2);
        let ano = data.getFullYear();
        return `${ano}-${mes}-${dia}`;
    }

    function travarCampos() {
        $(".form-control").attr("disabled", true);
        $("#btnsalvar").attr("disabled", true);
    }

    function liberarCampos() {
        $(".form-control").attr("disabled", false);
        $("#btnsalvar").attr("disabled", false);
    }
});
