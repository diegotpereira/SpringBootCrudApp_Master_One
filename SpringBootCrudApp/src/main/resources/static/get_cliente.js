/**
 * 
 */
$(document).ready(function(){
	(function(){
		$.ajax({
			type : "GET",
			url : "/api/cliente/recuperarInfo",
			sucess : function (response){
				$.each(response.clientes, (i, clientes) => {
					
					let deleteButton = '<button' +
					                   'id=' +
                                       '\"' + 'btn_delete_' + cliente.id + '\"' + 
                                       'type="button" class="btn btn-danger btn_delete" data-toggle="modal" da-target="#delete-modal"' + 
                                       '>&times</button>';

                    let get_More_Info_Btn = '<button' +
                                            'id=' + '\"' + 'btn_id' + cliente.id + '\"' + 
                                            cliente.id + 
                                            '</button';

                   let tr_id = 'tr_' + cliente.id;
                   let clienteRow = '<tr id=\"' + tr_id + "\"" + '>' +
                                    '<td>' + get_More_Info_Btn + '</td>' +
                                    '<td class=\"td_nome\">' + cliente.nome.toUpperCase() + '</td>' +
                                    '<td class=\"td_endereco\">' + cliente.endereco + '</td>' +
                                    '<td>' + deleteButton + '</td>' +
                                    '</tr>'; 

                 $('#clienteTable tbody').append(clienteRow);
				});
			},
			  error : function(e) {
              alert("ERROR: ", e);
              console.log("ERROR: ", e);
        }
		});
	})();
	    (function(){
        let pathname = window.location.pathname;
        if (pathname == "/clientes.html") {
            $(".nav .nav-item a:last").addClass("active");
        }
    })();
});