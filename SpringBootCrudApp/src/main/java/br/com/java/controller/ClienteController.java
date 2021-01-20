package br.com.java.controller;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.java.model.Cliente;
import br.com.java.model.Mensagem;
import br.com.java.service.ClienteService;

@RestController
@RequestMapping("/api/cliente")
public class ClienteController {
	
	@Autowired
	ClienteService service;
	
	@PostMapping("/criar")
	public ResponseEntity<Mensagem> salvarNovoCliente(@RequestBody Cliente cliente){
		try {
			Cliente retornaCliente = service.salvarCliente(cliente);
			
			return new ResponseEntity<Mensagem>(new Mensagem("Salvo com sucesso!",
					Arrays.asList(retornaCliente), ""), HttpStatus.OK);
		} catch (Exception e) {
			// TODO: handle exception
			return new ResponseEntity<Mensagem>(new Mensagem("Falha ao cadastrar cliente!", 
					null, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	@GetMapping("/buscarCliente/{id}")
	public ResponseEntity<Mensagem> getClienteById(@PathVariable long id){
		try {
			Optional<Cliente> optCliente  = service.getClienteById(id);
			
			if (optCliente.isPresent()) {
				return new ResponseEntity<Mensagem>(new Mensagem("Sucesso! Recupere um cliente por id = " + id, 
						Arrays.asList(optCliente.get()), ""), HttpStatus.OK);
			}else {
				return new ResponseEntity<Mensagem>(new Mensagem("Falha -> Cliente não encontado pelo di = " + id,
						Arrays.asList(optCliente.get()), ""), HttpStatus.OK);
			}
		} catch (Exception e) {
			// TODO: handle exception
			return new ResponseEntity<Mensagem>(new Mensagem("Falha",
					null, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	@GetMapping("/recuperarInfo")
	public ResponseEntity<Mensagem> recuperarClienteInfo(){
		try {
			List<Cliente> clienteInfos = service.getClienteInfo();
			return new ResponseEntity<Mensagem>(new Mensagem("Buscar Cliente' Informação!", 
					clienteInfos, ""), HttpStatus.OK);
		} catch (Exception e) {
			// TODO: handle exception
			return new ResponseEntity<Mensagem>(new Mensagem("Falha",
					null, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	@DeleteMapping("/deletarById/{id}")
	public ResponseEntity<Mensagem> deletarClienteById(@PathVariable long id){
		try {
			if (service.checkExisteCliente(id)) {
				service.deletarClienteById(id);
				
				return new ResponseEntity<Mensagem>(new Mensagem("Sucesso! Deletado cliente com id = " + id,
						null, ""), HttpStatus.OK);
			}else {
				return new ResponseEntity<Mensagem>(new Mensagem("Falha! não foi possível deletar o cliente" 
						+ "com id = " + id, null, ""), HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			// TODO: handle exception
			return new ResponseEntity<Mensagem>(new Mensagem ("Falha", 
					null, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	@PutMapping("/atualizarById/{id}")
	public ResponseEntity<Mensagem> atualizarClienteById(@RequestBody Cliente _cliente, @PathVariable long id){
		try {
			if (service.checkExisteCliente(id)) {
				Cliente cliente = service.getClienteById(id).get();
				cliente.setNome(_cliente.getNome());
				cliente.setSobrenome(_cliente.getSobrenome());
				cliente.setEndereco(_cliente.getEndereco());
				cliente.setIdade(_cliente.getIdade());
				
				service.atualizarCliente(cliente);
				
				return new ResponseEntity<Mensagem>(new Mensagem("Sucesso! cliente atualizado com sucesso" 
						+ "com id = " + id, 
						Arrays.asList(cliente), ""), HttpStatus.OK);
			}else {
				return new ResponseEntity<Mensagem>(new Mensagem ("Falha! Não foi possível atualizar cliente"
						+ "com id = " + id,
						null, ""), HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			// TODO: handle exception
			return new ResponseEntity<Mensagem>(new Mensagem("Falha",
					null, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
