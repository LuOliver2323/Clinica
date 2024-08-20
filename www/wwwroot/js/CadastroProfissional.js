$(document).ready(function () {
    const token = sessionStorage.getItem('token');

    if (!token) {
        window.location.href = '/Index';
        return;
    }

    const urlAPI = "https://localhost:44353/";

    if ($("#tabelaProfissional").length > 0) {
        carregarProfissional();
    } else if ($("#txtid").length > 0) {
        let params = new URLSearchParams(window.location.search);
        let id = params.get('id');
        if (id) {
            visualizar(id);
        }
        travarCampos(); // Inicialmente trava os campos de edição
    }

    $("#btnNovo").click(function () {
        limparFormulario();
        liberarCampos();
    });

    $("#btnEditar").click(function () {
        liberarCampos();
    });

    $("#btnInativar").click(function () {
        inativarProfissional();
    });

    $(document).on("click", ".alterar", function (elemento) {
        let codigo = $(elemento.target).closest("tr").find(".codigo").text();
        window.location.href = "/CadastroProfissional?id=" + codigo;
    });

    $(document).on("click", ".excluir", function (elemento) {
        let codigo = $(elemento.target).closest("tr").find(".codigo").text();
        excluir(codigo);
    });

    function validarCampos() {
        let isValid = true;
        $(".form-control").removeClass('is-invalid');
        $(".invalid-feedback").remove();

        if (!$("#txtnome").val().trim()) {
            $("#txtnome").addClass('is-invalid');
            $("#txtnome").after('<div class="invalid-feedback">O nome do profissional é obrigatório.</div>');
            isValid = false;
        }

        if (!$("#especialidade").val()) {
            $("#especialidade").addClass('is-invalid');
            $("#especialidade").after('<div class="invalid-feedback">A especialidade é obrigatória.</div>');
            isValid = false;
        }

        if (!$("#txtcontato").val().trim()) {
            $("#txtcontato").addClass('is-invalid');
            $("#txtcontato").after('<div class="invalid-feedback">O telefone é obrigatório.</div>');
            isValid = false;
        }

        if (!$("#txtdatanascimento").val().trim()) {
            $("#txtdatanascimento").addClass('is-invalid');
            $("#txtdatanascimento").after('<div class="invalid-feedback">A data de nascimento é obrigatória.</div>');
            isValid = false;
        }

        if (!$("#txtrg").val().trim() || $("#txtrg").val().length < 7 || !validarRG($("#txtrg").val().trim())) {
            $("#txtrg").addClass('is-invalid');
            $("#txtrg").after('<div class="invalid-feedback">O RG deve ser válido e ter pelo menos 7 dígitos.</div>');
            isValid = false;
        }

        if (!$("#txtcpf").val().trim() || !validarCPF($("#txtcpf").val().trim())) {
            $("#txtcpf").addClass('is-invalid');
            $("#txtcpf").after('<div class="invalid-feedback">O CPF é obrigatório e deve ser válido.</div>');
            isValid = false;
        }

        if (!$("#txtnumeroconselho").val().trim()) {
            $("#txtnumeroconselho").addClass('is-invalid');
            $("#txtnumeroconselho").after('<div class="invalid-feedback">O número do conselho é obrigatório.</div>');
            isValid = false;
        }

        if (!$("#txtcep").val().trim()) {
            $("#txtcep").addClass('is-invalid');
            $("#txtcep").after('<div class="invalid-feedback">O CEP é obrigatório.</div>');
            isValid = false;
        }

        if (!$("#txtlogradouro").val().trim()) {
            $("#txtlogradouro").addClass('is-invalid');
            $("#txtlogradouro").after('<div class="invalid-feedback">O logradouro é obrigatório.</div>');
            isValid = false;
        }

        if (!$("#txtbairro").val().trim()) {
            $("#txtbairro").addClass('is-invalid');
            $("#txtbairro").after('<div class="invalid-feedback">O bairro é obrigatório.</div>');
            isValid = false;
        }

        if (!$("#txtnumero").val().trim()) {
            $("#txtnumero").addClass('is-invalid');
            $("#txtnumero").after('<div class="invalid-feedback">O número é obrigatório.</div>');
            isValid = false;
        }

        if (!$("#txtuf").val().trim()) {
            $("#txtuf").addClass('is-invalid');
            $("#txtuf").after('<div class="invalid-feedback">O estado é obrigatório.</div>');
            isValid = false;
        }

        if (!$("#txtmunicipio").val().trim()) {
            $("#txtmunicipio").addClass('is-invalid');
            $("#txtmunicipio").after('<div class="invalid-feedback">A cidade é obrigatória.</div>');
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
                idEspecialidade: $("#especialidade").val(),
                contato: $("#txtcontato").val(),
                datanascimento: $("#txtdatanascimento").val(),
                cpf: $("#txtcpf").val(),
                rg: $("#txtrg").val(),
                numeroconselho: $("#txtnumeroconselho").val(),
                cep: $("#txtcep").val(),
                logradouro: $("#txtlogradouro").val(),
                bairro: $("#txtbairro").val(),
                numero: $("#txtnumero").val(),
                uf: $("#txtuf").val(),
                municipio: $("#txtmunicipio").val(),
                referencia: $("#txtreferencia").val(),
                observacoes: $("#txtobservacoes").val(),
                status: $("#ddlstatus").val()
            };

            $.ajax({
                type: obj.id == "0" ? "POST" : "PUT",
                url: urlAPI + "api/Profissional" + (obj.id == "0" ? "" : "/" + obj.id),
                contentType: "application/json;charset=utf-8",
                headers: {
                    "Authorization": "Bearer " + token
                },
                data: JSON.stringify(obj),
                success: function () {
                    limparFormulario();
                    $("#success-message").fadeIn().delay(3000).fadeOut();
                    alert("Dados salvos com sucesso!");
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("Erro ao salvar os dados: " + errorThrown);
                }
            });
        }
    });

    function carregarEspecialidade() {
        $.ajax({
            type: "GET",
            url: urlAPI + "api/Especialidade",
            contentType: "application/json;charset=utf-8",
            headers: {
                "Authorization": "Bearer " + token
            },
            dataType: "json",
            success: function (jsonResult) {
                $("#especialidade").empty();
                var option = $("<option>", { value: "", text: "Selecione uma especialidade" });
                $("#especialidade").append(option);
                $.each(jsonResult, function (index, item) {
                    var option = $("<option>", { value: item.id, text: item.nome_especialidade });
                    $("#especialidade").append(option);
                });
            },
            failure: function (response) {
                alert("Erro ao carregar os dados: " + response);
            }
        });
    }

    function inativarProfissional() {
        const id = $("#txtid").val();
        if (id == "0") {
            alert("Selecione um profissional para inativar.");
            return;
        }

        $.ajax({
            type: "GET",
            url: urlAPI + "api/Profissional/" + id,
            contentType: "application/json;charset=utf-8",
            headers: {
                "Authorization": "Bearer " + token
            },
            success: function (jsonResult) {
                if (jsonResult.status === 0) {
                    alert("O profissional já está inativo.");
                } else {
                    $.ajax({
                        type: "PUT",
                        url: urlAPI + "api/Profissional/Inativar/" + id,
                        contentType: "application/json;charset=utf-8",
                        headers: {
                            "Authorization": "Bearer " + token
                        },
                        success: function () {
                            $("#inactivate-message").fadeIn().delay(3000).fadeOut();
                            visualizar(id);
                            desabilitarCampos();
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            alert("Erro ao inativar o profissional: " + errorThrown);
                        }
                    });
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Erro ao verificar o status do profissional: " + errorThrown);
            }
        });
    }

    function limparFormulario() {
        $("#txtid").val('0');
        $("#txtnome").val('');
        $("#especialidade").val('');
        $("#txtcontato").val('');
        $("#txtdatanascimento").val('');
        $("#txtcpf").val('');
        $("#txtrg").val('');
        $("#txtnumeroconselho").val('');
        $("#txtcep").val('');
        $("#txtlogradouro").val('');
        $("#txtbairro").val('');
        $("#txtnumero").val('');
        $("#txtuf").val('');
        $("#txtmunicipio").val('');
        $("#txtreferencia").val('');
        $("#txtobservacoes").val('');
        $("#ddlstatus").val('1');
        $(".form-control").removeClass('is-invalid');
        $(".invalid-feedback").remove();
    }

    function carregarProfissional() {
        $.ajax({
            url: urlAPI + "api/Profissional",
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            },
            success: function (data) {
                $("#tabela").empty();
                $.each(data, function (index, item) {
                    var linha = $("#linhaExemplo").clone().removeAttr("id").removeAttr("style");
                    $(linha).find(".codigo").html(item.id);
                    $(linha).find(".nome").html(item.nome);
                    $(linha).find(".status").html(item.status == 1 ? "Ativo" : "Inativo");
                    $(linha).find(".numeroconselho").html(item.numeroconselho);
                    $(linha).find(".contato").html(item.contato);
                    $(linha).show();
                    $("#tabela").append(linha);
                });
            },
            error: function () {
                alert("Erro ao carregar os Profissionais.");
            }
        });
    }

    function excluir(codigo) {
        $.ajax({
            type: "DELETE",
            url: urlAPI + "api/Profissional/" + codigo,
            contentType: "application/json;charset=utf-8",
            headers: {
                "Authorization": "Bearer " + token
            },
            success: function () {
                alert('Exclusão efetuada!');
                location.reload();
            },
            error: function (xhr, textStatus, errorThrown) {
                alert("Erro ao excluir o Profissional: " + errorThrown);
            }
        });
    }

    function visualizar(id) {
        $.ajax({
            type: "GET",
            url: urlAPI + "api/Profissional/" + id,
            contentType: "application/json;charset=utf-8",
            headers: {
                "Authorization": "Bearer " + token
            },
            dataType: "json",
            success: function (jsonResult) {
                $("#txtid").val(jsonResult.id);
                $("#txtnome").val(jsonResult.nome);
                $("#especialidade").val(jsonResult.idEspecialidade);
                $("#txtcontato").val(jsonResult.contato);
                $("#txtdatanascimento").val(formatDate(jsonResult.datanascimento));
                $("#txtcpf").val(jsonResult.cpf);
                $("#txtrg").val(jsonResult.rg);
                $("#txtnumeroconselho").val(jsonResult.numeroconselho);
                $("#txtcep").val(jsonResult.cep);
                $("#txtlogradouro").val(jsonResult.logradouro);
                $("#txtbairro").val(jsonResult.bairro);
                $("#txtnumero").val(jsonResult.numero);
                $("#txtuf").val(jsonResult.uf);
                $("#txtmunicipio").val(jsonResult.municipio);
                $("#txtreferencia").val(jsonResult.referencia);
                $("#txtobservacoes").val(jsonResult.observacoes);
                $("#ddlstatus").val(jsonResult.status);
                travarCampos();
            },
            error: function (response) {
                alert("Erro ao carregar os dados: " + response);
            }
        });
    }

    function formatDate(dateString) {
        if (!dateString) return "";
        var date = new Date(dateString);
        var day = ("0" + date.getDate()).slice(-2);
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var year = date.getFullYear();
        return year + "-" + month + "-" + day;
    }

    function validarCPF(cpf) {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf.length !== 11) return false;
        if (/^(\d)\1+$/.test(cpf)) return false;
        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let resto = 11 - (soma % 11);
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.charAt(9))) return false;
        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        resto = 11 - (soma % 11);
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.charAt(10))) return false;
        return true;
    }

    function validarRG(rg) {
        rg = rg.replace(/[^\d]+/g, '');
        if (rg.length < 7 || rg.length > 9) return false;
        if (/^(\d)\1+$/.test(rg)) return false;
        return true;
    }

    function travarCampos() {
        $(".form-control").attr("disabled", true);
        $("#btnsalvar").attr("disabled", true);
    }

    function liberarCampos() {
        $(".form-control").attr("disabled", false);
        $("#btnsalvar").attr("disabled", false);
    }

    carregarEspecialidade();
});
