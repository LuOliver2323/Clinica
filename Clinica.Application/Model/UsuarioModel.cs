namespace Clinica.Application.Model
{
    public class UsuarioModel
    {
        public int id { get; set; }
        public required String nome { get; set; }
        public required String email { get; set; }
        public required String senha { get; set; }
        public int Status { get; set; }
        public String? Imagem { get; set; }
    }
}
