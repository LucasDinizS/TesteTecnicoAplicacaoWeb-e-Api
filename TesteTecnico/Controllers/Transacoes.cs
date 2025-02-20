using Microsoft.AspNetCore.Mvc;

namespace TesteApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Transacoes : ControllerBase
    {

        private readonly ILogger<Transacoes> _logger;


        public Transacoes(ILogger<Transacoes> logger)
        {
            _logger = logger;
        }

        private static List<Transacao> transacoes = new List<Transacao>();
        private static int idAtual = 0;

        [HttpGet(Name = "GetTransacoes")]
        public IEnumerable<TesteApi.Transacao> Get()
        {
            return transacoes;
        }

        [HttpPost(Name = "PostTransacoes")]
        public IEnumerable<TesteApi.Transacao> Post([FromForm] Transacao transacao)
        {
            transacao.id = idAtual++;
            transacoes.Add(transacao);
            return transacoes;
        }

        [HttpDelete("{id}")]
        [AcceptVerbs("DELETE")]
        public IActionResult Delete(int id)
        {
            int i = 0;
            Console.WriteLine("Estou sendo chamado");
            foreach (var transacao in transacoes)
            {
                
                if (transacao.idCliente == id)
                
                    transacoes.Remove(transacao);

                i++;
            }
            if (i == 0)
            {
                return NotFound();
            }
            else
            {
                return NoContent();
            }
        }
        }
    }

