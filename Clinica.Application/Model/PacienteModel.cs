namespace Clinica.Application.Model
{
    public class PacienteModel
    {
        public int id { get; set; }
        public string nome { get; set; }
        public DateTime? datanascimento { get; set; }
        public string? idade { get; set; }
        public string cpf { get; set; }
        public string? rg { get; set; }
        public string? anoescolar { get; set; }
        public string? escola { get; set; }
        public string cep { get; set; }
        public string logradouro { get; set; }
        public string bairro { get; set; }
        public string numero { get; set; }
        public string municipio { get; set; }
        public string uf { get; set; }
        public DateTime? DataEntrada { get; set; }
        public DateTime? DataSaida { get; set; }
        public string? observacoes { get; set; }
        public string contato { get; set; }
        public string nomeresponsavel { get; set; }
        public string? profissaoresponsavel { get; set; }
        public string cpfresponsavel { get; set; }
        public string telefoneresponsavel { get; set; }
        public int? Status { get; set; }

        //public int idLogradouro { get; set; }
        //public LogradouroModel logradouro { get; set; }

        //public int idContato { get; set; }
        //public virtual Contato contato { get; set; }

        //public int idResponsavel { get; set; }
        //public virtual Responsavel responsavel { get; set; }
    }
}