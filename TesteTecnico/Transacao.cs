namespace TesteApi
{
    public class Transacao
    {
        public int id { get; set; }
        public string descricao { get; set; }
        public int idCliente { get; set; }

        public double valor { get; set; }

        public string tipo { get; set; }
    }
}
