using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace Clinica.Application.Model
{
    public class CondicaoPagamentoModel
    {
        public int id { get; set; }
        public string nome_condicao { get; set; }
        public string? parcelas { get; set; }
        public int Status { get; set; }
    }
}