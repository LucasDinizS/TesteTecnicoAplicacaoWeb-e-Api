using Microsoft.AspNetCore.Mvc;

namespace TesteApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Clientes : ControllerBase
    {

        private readonly ILogger<Clientes> _logger;

        public Clientes(ILogger<Clientes> logger)
        {
            _logger = logger;
        }

        private static List<Cliente> clientes = new List<Cliente>();
        private static int idAtual = 0;

        [HttpGet(Name = "GetClientes")]
        public IEnumerable<TesteApi.Cliente> Get()
        {
            return clientes;
        }

        [HttpPost(Name = "PostClientes")]
        public IEnumerable<TesteApi.Cliente> Post([FromForm] Cliente cliente)
        {
            cliente.id = idAtual++;
            cliente.saldo = 0;
            clientes.Add(cliente);
            return clientes;
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var cliente = clientes.FirstOrDefault(c => c.id == id);
            if (cliente == null)
            {
                return NotFound();
            }

            return Ok(cliente);
        }

        [HttpDelete("{id}")]
        [AcceptVerbs("DELETE")]
        public IActionResult Delete(int id)
        {
            var cliente = clientes.FirstOrDefault(c => c.id == id);
            if (cliente == null)
            {
                return NotFound();
            }

            clientes.Remove(cliente);
            return NoContent();
        }


    }
}
