import { Injectable } from '@angular/core';
import { Cliente } from './cadastro/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  static REPO_CLIENTES = "_CLIENTES"; 

  salvar(cliente: Cliente) {
    console.log('Cliente salvo:', cliente);
  }

  obterStorage() : Cliente[] { //cliente é o que vai ser retornado
    const repositorioClientes = localStorage.getItem(ClienteService.REPO_CLIENTES);
    if (repositorioClientes) { //caso ja tenha
      const clientes: Cliente[] = JSON.parse(repositorioClientes); //parse recebe a string repositorioclientes e transforma em um array de clientes (localstorage só aceita string)
      return clientes;
    }
    //caso nao tenha
    const clientes: Cliente[] = [];
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(clientes)); //cria o item no localstorage
    return clientes;
    //retorna um storage vazio
  }
}
