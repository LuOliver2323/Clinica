$(document).ready(function () {
    const token = sessionStorage.getItem('token');

    if (!token) {
        window.location.href = '/Index';
        return;
    }

    const urlAPI = "https://localhost:44353/";

    if ($("#tabelaPaciente").length > 0) {
        carregarPacientes();
    } else if ($("#txtid").length > 0) {
        let params = new URLSearchParams(window.location.search);
        let id = params.get('id');
        if (id) {
            visualizar(id);
        } else {
            travarCampos(); // Inicialmente trava os campos de edição
            $("#ddlstatus").val('1'); // Define o status padrão como Ativo
        }
    }

    $("#btnNovo").click(function () {
        limparFormulario();
        liberarCampos();
        $("#ddlstatus").val('1'); // Define o status padrão como Ativo
    });

    $("#btnEditar").click(function () {
        liberarCampos();
    });

    $("#btnInativar").click(function () {
        let id = $("#txtid").val();
        if (id && id !== '0') {
            inativarPaciente(id);
        } else {
            alert("Selecione um paciente para inativar.");
        }
    });

    $(document).on("click", ".alterar", function (elemento) {
        let codigo = $(elemento.target).closest("tr").find(".codigo").text();
        window.location.href = "/CadastroPaciente?id=" + codigo;
    });

    $(document).on("click", ".excluir", function (elemento) {
        let codigo = $(elemento.target).closest("tr").find(".codigo").text();
        excluir(codigo);
    });

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

    function validarCampos() {
        let isValid = true;
        $(".form-control").removeClass('is-invalid');
        $(".invalid-feedback").remove();

        if (!$("#txtnome").val().trim()) {
            $("#txtnome").addClass('is-invalid');
            $("#txtnome").after('<div class="invalid-feedback">O nome do paciente é obrigatório.</div>');
            isValid = false;
        }

        if (!$("#txtcpf").val().trim() || !validarCPF($("#txtcpf").val().trim())) {
            $("#txtcpf").addClass('is-invalid');
            $("#txtcpf").after('<div class="invalid-feedback">O CPF é obrigatório e deve ser válido.</div>');
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

        if (!$("#txtmunicipio").val().trim()) {
            $("#txtmunicipio").addClass('is-invalid');
            $("#txtmunicipio").after('<div class="invalid-feedback">A cidade é obrigatória.</div>');
            isValid = false;
        }

        if (!$("#txtuf").val().trim()) {
            $("#txtuf").addClass('is-invalid');
            $("#txtuf").after('<div class="invalid-feedback">O estado é obrigatório.</div>');
            isValid = false;
        }

        if (!$("#txtcontato").val().trim()) {
            $("#txtcontato").addClass('is-invalid');
            $("#txtcontato").after('<div class="invalid-feedback">O telefone de contato é obrigatório.</div>');
            isValid = false;
        }

        if (!$("#txtnome_responsavel").val().trim()) {
            $("#txtnome_responsavel").addClass('is-invalid');
            $("#txtnome_responsavel").after('<div class="invalid-feedback">O nome do responsável é obrigatório.</div>');
            isValid = false;
        }

        if (!$("#txtcpf_responsavel").val().trim() || !validarCPF($("#txtcpf_responsavel").val().trim())) {
            $("#txtcpf_responsavel").addClass('is-invalid');
            $("#txtcpf_responsavel").after('<div class="invalid-feedback">O CPF do responsável é obrigatório e deve ser válido.</div>');
            isValid = false;
        }

        if (!$("#txttelefone_responsavel").val().trim()) {
            $("#txttelefone_responsavel").addClass('is-invalid');
            $("#txttelefone_responsavel").after('<div class="invalid-feedback">O telefone do responsável é obrigatório.</div>');
            isValid = false;
        }

        const dataEntrada = new Date($("#txtdataentrada").val());
        const dataSaida = new Date($("#txtdatasaida").val());
        if (dataSaida < dataEntrada) {
            $("#txtdatasaida").addClass('is-invalid');
            $("#txtdatasaida").after('<div class="invalid-feedback">A data de saída não pode ser menor que a data de entrada.</div>');
            isValid = false;
        }

        return isValid;
    }

    $(".form-control").on("input", function () {
        $(this).removeClass('is-invalid');
        $(this).next(".invalid-feedback").remove();
    });

    $("#txtdatanascimento").on("change", function () {
        const dataNascimento = new Date($(this).val());
        const hoje = new Date();
        let idade = hoje.getFullYear() - dataNascimento.getFullYear();
        const mes = hoje.getMonth() - dataNascimento.getMonth();
        if (mes < 0 || (mes === 0 && hoje.getDate() < dataNascimento.getDate())) {
            idade--;
        }
        $("#txtidade").val(idade);
    });

    $("#btnsalvar").click(function () {
        if (validarCampos()) {
            const obj = {
                id: $("#txtid").val(),
                nome: $("#txtnome").val(),
                datanascimento: $("#txtdatanascimento").val(),
                idade: $("#txtidade").val(),
                cpf: $("#txtcpf").val(),
                rg: $("#txtrg").val(),
                anoescolar: $("#txtanoescolar").val(),
                escola: $("#txtescola").val(),
                cep: $("#txtcep").val(),
                logradouro: $("#txtlogradouro").val(),
                bairro: $("#txtbairro").val(),
                numero: $("#txtnumero").val(),
                municipio: $("#txtmunicipio").val(),
                uf: $("#txtuf").val(),
                dataEntrada: $("#txtdataentrada").val(),
                dataSaida: $("#txtdatasaida").val(),
                observacoes: $("#txtobservacoes").val(),
                contato: $("#txtcontato").val(),
                nomeresponsavel: $("#txtnome_responsavel").val(),
                profissaoresponsavel: $("#txtprofissao_responsavel").val(),
                cpfresponsavel: $("#txtcpf_responsavel").val(),
                telefoneresponsavel: $("#txttelefone_responsavel").val(),
                status: $("#ddlstatus").val()
            };

            $.ajax({
                type: obj.id == "0" ? "POST" : "PUT",
                url: obj.id == "0" ? urlAPI + "api/Paciente" : urlAPI + "api/Paciente/" + obj.id,
                contentType: "application/json;charset=utf-8",
                headers: {
                    "Authorization": "Bearer " + token
                },
                data: JSON.stringify(obj),
                success: function () {
                    alert("Dados salvos com sucesso!"); // Exibe mensagem de sucesso
                    travarCampos(); // Trava os campos após salvar
                    if ($("#tabelaPaciente").length > 0) {
                        carregarPacientes();
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("Erro ao salvar os dados: " + errorThrown);
                }
            });
        }
    });

    function limparFormulario() {
        $("#txtid").val('0');
        $("#txtnome").val('');
        $("#txtdatanascimento").val('');
        $("#txtidade").val('');
        $("#txtcpf").val('');
        $("#txtrg").val('');
        $("#txtanoescolar").val('');
        $("#txtescola").val('');
        $("#txtcep").val('');
        $("#txtlogradouro").val('');
        $("#txtbairro").val('');
        $("#txtnumero").val('');
        $("#txtmunicipio").val('');
        $("#txtuf").val('');
        $("#txtdataentrada").val('');
        $("#txtdatasaida").val('');
        $("#txtobservacoes").val('');
        $("#txtcontato").val('');
        $("#txtnome_responsavel").val('');
        $("#txtprofissao_responsavel").val('');
        $("#txtcpf_responsavel").val('');
        $("#txttelefone_responsavel").val('');
        $("#ddlstatus").val('1');
        $(".form-control").removeClass('is-invalid');
        $(".invalid-feedback").remove();
    }

    function carregarPacientes() {
        $.ajax({
            url: urlAPI + "api/Paciente",
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            },
            success: function (data) {
                $("#tabela").empty();
                $.each(data, function (index, item) {
                    var linha = $("#linhaExemplo").clone().removeAttr("id").removeAttr("style");
                    $(linha).find(".codigo").html(item.id);
                    $(linha).find(".status").html(item.status == 1 ? "Ativo" : "Inativo");
                    $(linha).find(".nome").html(item.nome);
                    $(linha).find(".nomeresponsavel").html(item.nomeresponsavel);
                    $(linha).find(".contato").html(item.contato);
                    $(linha).show();
                    $("#tabela").append(linha);
                });
            },
            error: function () {
                alert("Erro ao carregar os pacientes.");
            }
        });
    }

    function excluir(codigo) {
        $.ajax({
            type: "DELETE",
            url: urlAPI + "api/Paciente/" + codigo,
            contentType: "application/json;charset=utf-8",
            headers: {
                "Authorization": "Bearer " + token
            },
            success: function () {
                alert('Exclusão efetuada!');
                location.reload();
            },
            error: function (xhr, textStatus, errorThrown) {
                alert("Erro ao excluir o paciente: " + errorThrown);
            }
        });
    }

    function inativarPaciente(id) {
        $.ajax({
            type: "GET",
            url: urlAPI + "api/Paciente/" + id,
            contentType: "application/json;charset=utf-8",
            headers: {
                "Authorization": "Bearer " + token
            },
            success: function (jsonResult) {
                if (jsonResult.status === 0) {
                    alert("O paciente já está inativo.");
                } else {
                    $.ajax({
                        type: "PUT",
                        url: urlAPI + "api/Paciente/Inativar/" + id,
                        contentType: "application/json;charset=utf-8",
                        headers: {
                            "Authorization": "Bearer " + token
                        },
                        success: function () {
                            alert("Paciente inativado com sucesso!");
                            $("#ddlstatus").val('0'); // Atualiza o status na tela
                            if ($("#tabelaPaciente").length > 0) {
                                carregarPacientes();
                            }
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            alert("Erro ao inativar o paciente: " + errorThrown);
                        }
                    });
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Erro ao verificar o status do paciente: " + errorThrown);
            }
        });
    }

    function visualizar(id) {
        $.ajax({
            type: "GET",
            url: urlAPI + "api/Paciente/" + id,
            contentType: "application/json;charset=utf-8",
            headers: {
                "Authorization": "Bearer " + token
            },
            dataType: "json",
            success: function (jsonResult) {
                $("#txtid").val(jsonResult.id);
                $("#txtnome").val(jsonResult.nome);
                $("#txtdatanascimento").val(formatDate(jsonResult.datanascimento));
                $("#txtidade").val(jsonResult.idade);
                $("#txtcpf").val(jsonResult.cpf);
                $("#txtrg").val(jsonResult.rg);
                $("#txtanoescolar").val(jsonResult.anoescolar);
                $("#txtescola").val(jsonResult.escola);
                $("#txtcep").val(jsonResult.cep);
                $("#txtlogradouro").val(jsonResult.logradouro);
                $("#txtbairro").val(jsonResult.bairro);
                $("#txtnumero").val(jsonResult.numero);
                $("#txtuf").val(jsonResult.uf);
                $("#txtmunicipio").val(jsonResult.municipio);
                $("#txtdataentrada").val(formatDate(jsonResult.dataEntrada));
                $("#txtdatasaida").val(formatDate(jsonResult.dataSaida));
                $("#txtobservacoes").val(jsonResult.observacoes);
                $("#txtcontato").val(jsonResult.contato);
                $("#txtnome_responsavel").val(jsonResult.nomeresponsavel);
                $("#txtprofissao_responsavel").val(jsonResult.profissaoresponsavel);
                $("#txtcpf_responsavel").val(jsonResult.cpfresponsavel);
                $("#txttelefone_responsavel").val(jsonResult.telefoneresponsavel);
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

    function travarCampos() {
        $(".form-control").attr("disabled", true);
        $("#btnsalvar").attr("disabled", true);
    }

    function liberarCampos() {
        $(".form-control").attr("disabled", false);
        $("#btnsalvar").attr("disabled", false);
    }
});
