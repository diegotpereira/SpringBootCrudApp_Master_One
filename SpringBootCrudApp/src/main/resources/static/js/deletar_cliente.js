$(document).ready(function () {
    let clienteId = 0;

    $(document).on("click", "#div_cliente_table table button.btn_delete", function () {
        let btn_id = (event.srcElement.id);
        clienteId = btn_id.split("_")[2];

        $("div.modal-body")
            .text("Você quer deletar um Cliente com id = " + clienteId + " ?");
        $("#model-delete-btn").css({ "display": "inline" });
    });

    $(document).on("click", "#model-delete-btn", function () {
        $.ajax({
            url: '/api/cliente/deletarById/' + clienteId,
            type: 'DELETE',
            success: function (response) {
                $("div.modal-body")
                    .text("Deletado com sucesso cliente com id = " + clienteId + "!");

                $("#model-delete-btn").css({ "display": "none" });
                $("button.btn.btn-secondary").text("Close");


                let row_id = "tr_" + clienteId;
                $("#" + row_id).remove();
                $("#div_cliente_atualizar").css({ "display": "none" });
            },
            error: function (error) {
                console.log(error);
                $("#div_cliente_atualizar").css({ "display": "none" });
                alert("Error -> " + error);
            }
        });
    });
});