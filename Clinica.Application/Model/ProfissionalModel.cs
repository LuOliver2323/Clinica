namespace Clinica.Application.Model
{
    public class ProfissionalModel
    {
        public int id { get; set; }
        public String nome { get; set; }
        public String contato { get; set; }
        public DateTime? datanascimento { get; set; }
        public String cpf { get; set; }
        public String? rg { get; set; }
        public String numeroconselho { get; set; }
        public String cep { get; set; }
        public String logradouro { get; set; }
        public String bairro { get; set; }
        public String numero { get; set; }
        public String uf { get; set; }
        public String municipio { get; set; }
        public String? referencia { get; set; }
        public String? observacoes { get; set; }
        public int Status { get; set; }

        public int idEspecialidade { get; set; }
        public EspecialidadeModel? especialidade { get; set; }

        //public int idContato { get; set; }
        //public ContatoModel contato { get; set; }
    }
}
