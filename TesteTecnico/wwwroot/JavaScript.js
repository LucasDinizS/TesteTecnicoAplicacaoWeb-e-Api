$(".btn-select").on("click", function () {
    let formid = $(this).attr("form")
    $(".mostrar").removeClass("mostrar")
    $(`#${formid}`).addClass("mostrar")
})

$('#cadastro').on('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    fetch('/api/Transacoes', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById("cadastro").reset();
            $("#mensagem").html('Transação cadastrada com sucesso!');
        })
        .catch(error => {
            $("#mensagem").html('Erro ao cadastrar transação.');
            console.error('Erro:', error);
        })
        .finally(() => {
            $("#mensagem").addClass("mostrar");
            setTimeout(() => {
                $("#mensagem").removeClass("mostrar");
            }, 4000);
        });
});

$("#listar").on("click", function () {
    listarTransacoes();
    $(".mostrar").removeClass("mostrar")
    $(`#tbl-listar`).addClass("mostrar")
})
function listarTransacoes() {
    const tbody = $("#tbl-listar");
    tbody.empty();
    tbody.append(`
            <tr>
                <th>ID</th>
                <th>Tipo</th>
                <th>Descrição</th>
                <th>Valor</th>
                <th>IDCliente</th>
            </tr>`)
    fetch('/api/Transacoes')
        .then(response => response.json())
        .then(lista => {
            console.log(lista)
            lista.forEach(transacao => {
                const row = `
                    <tr>
                        <td>${transacao.id}</td>
                        <td>${transacao.tipo}</td>
                        <td>${transacao.descricao}</td>
                        <td>R$ ${transacao.valor.toFixed(2)}</td>
                        <td>${transacao.idCliente}</td>
                    </tr>
                `;
                tbody.append(row);
            });
        })
        .catch(error => {
            console.error("Erro ao listar Clientes", error);
        });
}
