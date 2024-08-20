namespace Clinica.Application.Model
{
    public class ContasPagarModel
    {
        public int id { get; set; }
        public String dataemissao { get; set; }
        public String datavencimento { get; set; }
        public String valor { get; set; }
        public String parcelas { get; set; }
        public String fornecedor { get; set; }
        public String documento { get; set; }
        public String? valordesconto { get; set; }
        public String? valorpago { get; set; }
        public String? juros { get; set; }
        public String? multas { get; set; }
        public String? observacoes { get; set; }
        public int Status { get; set; }


        //public int idFormaPagamento { get; set; }
        //public FormaPagamentoModel? formapagamento { get; set; }

        //public int idCondicaoPagamento { get; set; }
        //public CondicaoPagamentoModel? condicaopagamento { get; set; }
    }
}
