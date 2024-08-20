const token = sessionStorage.getItem('token');

if (token == null || token === "") {
    window.location.href = '/Index';
}

const urlAPI = "https://localhost:44353/";
const id = new URLSearchParams(window.location.search).get('id');

$(document).ready(function () {
    carregarDadosConta(id);
    carregarFormasPagamento();
    carregarCondicoesPagamento();

    $('#btnConfirmarBaixa').click(function () {
        baixarConta(id);
    });

    $('#btnCancelar').click(function () {
        // Redireciona para a página de edição da conta a pagar com o mesmo ID
        window.location.href = '/ContasPagar?id=' + id;
    });

    $('#valordesconto, #valormultas, #valorjuros').on('input', function () {
        $('#valorTotal').val(calcularValorTotal());
    });
});

function carregarDadosConta(id) {
    $.ajax({
        type: "GET",
        url: urlAPI + "api/ContasPagar/" + id,
        headers: {
            "Authorization": "Bearer " + token
        },
        dataType: "json",
        success: function (data) {
            $('#nomeFornecedor').val(data.fornecedor);
            $('#valorLancamento').val(data.valor);
            $('#valorTotal').val(data.valor);
        },
        error: function () {
            alert("Erro ao carregar os dados da conta.");
        }
    });
}

function carregarFormasPagamento() {
    $.ajax({
        type: "GET",
        url: urlAPI + "api/FormaPagamento",
        headers: {
            "Authorization": "Bearer " + token
        },
        dataType: "json",
        success: function (data) {
            $('#formaPagamento').append(new Option("Selecione uma forma de pagamento", ""));
            data.forEach(function (item) {
                $('#formaPagamento').append(new Option(item.descricao, item.id));
            });
        },
        error: function () {
            alert("Erro ao carregar as formas de pagamento.");
        }
    });
}

function carregarCondicoesPagamento() {
    $.ajax({
        type: "GET",
        url: urlAPI + "api/CondicaoPagamento",
        headers: {
            "Authorization": "Bearer " + token
        },
        dataType: "json",
        success: function (data) {
            $('#condicaoPagamento').append(new Option("Selecione uma condição de pagamento", ""));
            data.forEach(function (item) {
                $('#condicaoPagamento').append(new Option(item.nome_condicao, item.id));
            });
        },
        error: function () {
            alert("Erro ao carregar as condições de pagamento.");
        }
    });
}

function baixarConta(id) {
    const baixaConta = {
        idFormaPagamento: $('#formaPagamento').val(),
        idCondicaoPagamento: $('#condicaoPagamento').val(),
        datapagamento: $('#datapagamento').val(),
        valordesconto: parseFloat($('#valordesconto').val()) || 0,
        valormultas: parseFloat($('#valormultas').val()) || 0,
        valorjuros: parseFloat($('#valorjuros').val()) || 0,
        valortotal: calcularValorTotal()
    };

    $.ajax({
        type: "PUT",
        url: urlAPI + "api/ContasPagar/Baixar/" + id,
        contentType: "application/json;charset=utf-8",
        headers: {
            "Authorization": "Bearer " + token
        },
        data: JSON.stringify(baixaConta),
        success: function () {
            alert('Conta baixada com sucesso!');
            window.location.href = '/PesquisaContasPagar';
        },
        error: function () {
            alert("Erro ao baixar a conta.");
        }
    });
}

function calcularValorTotal() {
    const valorLancamento = parseFloat($('#valorLancamento').val()) || 0;
    const valordesconto = parseFloat($('#valordesconto').val()) || 0;
    const valormultas = parseFloat($('#valormultas').val()) || 0;
    const valorjuros = parseFloat($('#valorjuros').val()) || 0;

    return (valorLancamento - valordesconto + valormultas + valorjuros).toFixed(2);
}
