/**
 * 
 */
$(document).ready(function() {
	$("#add_novo_cliente").submit(function(evt) {

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
			dataType: 'json',
			async: false,
			cache: false,
			sucess: function(response) {
				let cliente = response.cliente[0];
				let clienteString = "{ nome : " + cliente.nome + " " + cliente.sobrenome +
					",  endereco: " + cliente.endereco +
					", idade: " + cliente.idade + " } "

				let sucessAlert = '<div class="alert alert-sucess alert-dismissible">' +
					'<button type="button" class="close" data-dismiss="alert">&times;</button>' +
					'<strong>' + response.message + '</strong> Cliente\'s Info = ' + clienteString;

				'</div>'

				$("#response").append(sucessAlert);
				$("#response").css({ "display": "block" });

				resetUploadForm();

			},

			error: function(response) {
				let errorAlert = '<div class="alert alert-danger alert-dismissible">' +
					'<button type="button" class="close" data-dismiss="alert">&times;</button>' +
					'<strong>' + reposnse.message + '</strong>' + ',Error:' + message.error +
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

	(function() {
		let pathname = window.location.pathname;
		if (pathname === "/") {
			$(".nav .nav-item a:first").addClass("active");
		} else if (pathname == "/cliente.html") {
			$(".nav .nav-item a:last").addClass("active");
		}
	})();
});