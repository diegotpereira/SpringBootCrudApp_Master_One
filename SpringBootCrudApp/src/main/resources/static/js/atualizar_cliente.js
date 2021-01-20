$(document).ready(function(){
    $("#atualizar_cliente_form").submit(function(evt) {
        evt.preventDefault();
        try {
            let clienteId = $("#cliente_id").val();

            
            let formData = {
                nome : $("#cleinte_nome").val(),
                sobrenome :  $("#cliente_sobrenome").val(),
                endereco: $("#cliente_endereco").val(),
                idade: $("#cliente_idade").val()
            }
            
            $.ajax({
                url: '/api/cliente/atualizarById/' + clienteId + "/",
                type: 'PUT',
                contentType : "application/json",
                data: JSON.stringify(formData),
                dataType : 'json',
                async: false,
                cache: false,
                success: function (response) {
                    let cliente = response.clientes[0];
                    let customerString = "{nome:" + cliente.nome + 
                                                " ,sobrenome:" + cliente.sobrenome + 
                                                ", endereco:" + cliente.endereco + 
                                                ", idade:" + cliente.idade  + "}"
                    let successAlert = '<div class="alert alert-success alert-dismissible">' + 
                                            '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
                                            '<strong>' + response.mensagem + '</strong> Cliente\'s Info = ' + customerString;
                                        '</div>'

                    
                    $("#tr_" + clienteId + " td.td_nome").text(cliente.nome.toUpperCase());
                    $("#tr_" + clienteId + " td.td_endereco").text(cliente.endereco.toUpperCase());

                    $("#response").empty();
                    $("#response").append(successAlert);
                    $("#response").css({"display": "block"});
                },

                error: function (response) {
                    let errorAlert = '<div class="alert alert-danger alert-dismissible">' + 
                                        '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
                                        '<strong>' + response.mensagem + '</strong>' + ' ,Error: ' + mensagem.error + 
                                    '</div>';

                    $("#response").empty();                                    
                    $("#response").append(errorAlert);
                    $("#response").css({"display": "block"});
                }
            });
        } catch(error){
            console.log(error);
            alert(error);
        }
    });

    $(document).on("click", "table button.btn_id", function(){
        let id_of_button = (event.srcElement.id);
        let clienteId = id_of_button.split("_")[2];
  
        $.ajax({
            url: '/api/cliente/buscarCliente/' + clienteId,
            type: 'GET',
            success: function(response) {
                let cliente = response.clientes[0];                
                $("#cliente_id").val(cliente.id);
                $("#cliente_nome").val(cliente.nome);
                $("#cliente_sobrenome").val(cliente.sobrenome);
                $("#cliente_endereco").val(cliente.endereco);
                $("#cliente_idade").val(cliente.idade);
                $("#div_cliente_atualizar").css({"display": "block"});
            },
            error: function(error){
                console.log(error);
                alert("Error -> " + error);
            }
        });        
    });
});