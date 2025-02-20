using Microsoft.AspNetCore.Mvc;

namespace TesteApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Transacoes : ControllerBase
    {

        private readonly ILogger<Transacoes> _logger;

        private static List<Transacao> transacoes = new List<Transacao>();

        public Transacoes(ILogger<Transacoes> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetTransacoes")]
        public IEnumerable<TesteApi.Transacao> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new Transacao
            {
                idCliente = 1,
                valor = 20,
                tipo = "teste"
            })
            .ToArray();
        }

        [HttpPost(Name = "PostTransacoes")]
        public IEnumerable<TesteApi.Transacao> Post([FromForm] Transacao transacao)
        {
            transacoes.Add(transacao);
            return transacoes;
        }
    }
}
