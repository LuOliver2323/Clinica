namespace Clinica.Application.Model
{
    public class FormaPagamentoModel
    {
        public int id { get; set; }
        public String descricao { get; set; }
        public String tipo { get; set; }
        public String? taxa_cartao { get; set; }
        public int Status { get; set; }
    }
}
