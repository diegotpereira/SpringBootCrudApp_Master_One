package br.com.java.model;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Administrator
 *
 */
public class Mensagem {
	private String mensagem = "";
	private List<Cliente> clientes = new ArrayList<Cliente>();
	private String error = "";
	
	public Mensagem (String mensagem, List<Cliente> clientes, String error) {
		this.mensagem = mensagem;
		this.clientes = clientes;
		this.error = error;
	}
	public String getMensagem() {
		return this.mensagem;
	}
	public void setMensagem(String mensagem) {
		this.mensagem = mensagem;
	}
	public List<Cliente> getClientes(){
		return this.clientes;
	}
	public void setClientes(ArrayList<Cliente> clientes) {
		this.clientes = clientes;
	}
	public void setError(String error) {
		this.error = error;
	}
	
	public String getError() {
		return this.error;
	}
}
