$(".btn-select").on("click", function() {
    let formid = $(this).attr("form")
    $(".mostrar").removeClass("mostrar")
    $(`#${formid}`).addClass("mostrar")
})

$('#cadastro').on('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    fetch('/api/Clientes', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            $("#mensagem").html('Cliente cadastrado com sucesso!');
        })
        .catch(error => {
            $("#mensagem").html('Erro ao cadastrar cliente.');
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
    listarClientes();
    $(".mostrar").removeClass("mostrar")
    $(`#listar-td`).addClass("mostrar")
})
function listarClientes() {
    const tbody = $("#listar-td");
    tbody.empty();
    tbody.append(`
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Idade</th>
                <th>Dinheiro</th>
            </tr>`)
    fetch('/api/Clientes')
        .then(response => response.json())
        .then(lista => {
            lista.forEach(cliente => {
                const row = `
                    <tr>
                        <td>${cliente.id}</td>
                        <td>${cliente.nome}</td>
                        <td>${cliente.idade}</td>
                        <td>R$ ${cliente.saldo.toFixed(2)}</td>
                    </tr>
                `;
                tbody.append(row);
            });
        })
        .catch(error => {
            console.error("Erro ao listar Clientes", error);
        });
}
$('#btn-deletar').on("click", function (e) {

    let id = $("#id-delete").val();
        $.ajax({
            url: `/api/Clientes/${id}`,
            method: "DELETE",
            success: function () {
                $("#mensagem").html('Cliente removido com sucesso');
                $("#mensagem").addClass("mostrar");
                setTimeout(() => {
                    $("#mensagem").removeClass("mostrar");
                }, 4000);
            },
            error: function (xhr, status, error) {
                console.error("Erro ao remover cliente:", error);
                $("#mensagem").html('Erro ao remover o cliente');
                $("#mensagem").addClass("mostrar");
                setTimeout(() => {
                    $("#mensagem").removeClass("mostrar");
                }, 4000);
            }
        });
    });
