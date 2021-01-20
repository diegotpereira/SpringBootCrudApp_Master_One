$(document).ready(function(){
    (function(){
        $.ajax({
            type : "GET",
            url : "/api/cliente/recuperarInfo",
            success: function(response){
              $.each(response.clientes, (i, cliente) => {  

                let deleteButton = '<button ' +
                                        'id=' +
                                        '\"' + 'btn_delete_' + cliente.id + '\"'+
                                        ' type="button" class="btn btn-danger btn_delete" data-toggle="modal" data-target="#delete-modal"' +
                                        '>&times</button>';

                let get_More_Info_Btn = '<button' +
                                            ' id=' + '\"' + 'btn_id_' + cliente.id + '\"' +
                                            ' type="button" class="btn btn-info btn_id">' + 
                                            cliente.id +
                                            '</button>';
                
                let tr_id = 'tr_' + cliente.id;
                let customerRow = '<tr id=\"' + tr_id + "\"" + '>' +
                          '<td>' + get_More_Info_Btn + '</td>' +
                          '<td class=\"td_nome\">' + cliente.nome.toUpperCase() + '</td>' +
                          '<td class=\"td_endereco\">' + cliente.endereco + '</td>' +
                          '<td>' + deleteButton + '</td>' +
                          '</tr>';                
                $('#clienteTable tbody').append(customerRow);
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
        if (pathname == "/cliente.html") {
            $(".nav .nav-item a:last").addClass("active");
        }
    })();
});