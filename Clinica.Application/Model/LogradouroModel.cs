namespace Clinica.Application.Model
{
    public class LogradouroModel
    {
        public int id { get; set; }
        public String cep {  get; set; }
        public String logradouro { get; set; }
        public String bairro { get; set; }
        public String numero { get; set; }
        public String uf { get; set; }
        public String municipio { get; set; }
        public String? complemento { get; set; }

    }

}
