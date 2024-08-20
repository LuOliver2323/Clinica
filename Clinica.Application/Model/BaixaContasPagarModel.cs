namespace Clinica.Application.Model
{
    public class BaixaContasPagarModel
    {
        public int id { get; set; }
        public DateTime datapagamento { get; set; }
        public decimal? valordesconto { get; set; }
        public decimal? valormultas { get; set; }
        public decimal? valorjuros { get; set; }
        public decimal valortotal { get; set; }


        public int idContasPagar { get; set; }
        public int idFormaPagamento { get; set; }
        public int idCondicaoPagamento { get; set; }
        public ContasPagarModel? contaspagar { get; set; }
        public FormaPagamentoModel? formapagamento { get; set; }
        public CondicaoPagamentoModel? condicaopagamento { get; set; }

    }
}
