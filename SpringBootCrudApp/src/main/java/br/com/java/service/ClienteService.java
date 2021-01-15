package br.com.java.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.java.model.Cliente;
import br.com.java.repository.ClienteRepository;

@Service
public class ClienteService {
	
	@Autowired
	ClienteRepository rep;
	
	public Cliente salvarCliente(Cliente cliente) {
		return rep.save(cliente);
	}
	public List<Cliente> getClienteInfo(){
		return rep.findAll();
	}
	public Optional <Cliente>getClienteById (long id){
		return rep.findById(id);
	}
	public boolean checkExisteCliente(long id) {
		if (rep.existsById((long) id)) {
			return true;
		}
		return false;
	}
	public Cliente atualizarCliente(Cliente cliente) {
		return rep.save(cliente);
	}
	public void deletarClienteById(long id) {
		rep.deleteById(id);
	}

}
