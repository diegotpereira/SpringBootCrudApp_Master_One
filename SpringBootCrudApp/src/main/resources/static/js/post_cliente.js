$(document).ready(function () {
    $("#add_novo_cliente").submit(function (evt) {
        evt.preventDefault();

        let formData = {
            nome: $("#nome").val(),
            sobrenome: $("#sobrenome").val(),
            endereco: $("#endereco").val(),
            idade: $("#idade").val()
        }

        $.ajax({
            url: '/api/cliente/criar',
            type: 'POST',
            contentType: "application/json",
            data: JSON.stringify(formData),
            dataType: 'json',
            async: false,
            cache: false,
            success: function (response) {
                let cliente = response.clientes[0];
                let customerString = "{ nome: " + cliente.nome + " " + cliente.sobrenome +
                    ", endereco: " + cliente.endereco +
                    ", idade: " + cliente.idade + " }"
                let successAlert = '<div class="alert alert-success alert-dismissible">' +
                    '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
                    '<strong>' + response.mensagem + '</strong> Cliente\'s Info = ' + customerString;
                '</div>'
                $("#response").append(successAlert);
                $("#response").css({ "display": "block" });

                resetUploadForm();
            },
            error: function (response) {
                let errorAlert = '<div class="alert alert-danger alert-dismissible">' +
                    '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
                    '<strong>' + response.mensagem + '</strong>' + ' ,Error: ' + mensagem.error +
                    '</div>'
                $("#response").append(errorAlert);
                $("#response").css({ "display": "block" });

                resetUploadForm();
            }
        });
    });

    function resetUploadForm() {
        $("#nome").val("");
        $("#sobrenome").val("");
        $("#endereco").val("");
        $("#idade").val("");
    }

    (function () {
        let pathname = window.location.pathname;
        if (pathname === "/") {
            $(".nav .nav-item a:first").addClass("active");
        } else if (pathname == "/clientes.html") {
            $(".nav .nav-item a:last").addClass("active");
        }
    })();
});
