import { Injectable } from '@angular/core';
import { Cliente } from './cadastro/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  static REPO_CLIENTES = "_CLIENTES"; 

  salvar(cliente: Cliente) {
    const storage = this.obterStorage(); //pega o storage atual
    storage.push(cliente);
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage));
  }

  pesquisarClientes(nomeBusca: string) : Cliente[] {
    const clientes = this.obterStorage();
    if(!nomeBusca) {
      return clientes;
    }

    return clientes.filter(c => c.nome?.indexOf(nomeBusca) !== -1);
  }

  private obterStorage() : Cliente[] { //cliente é o que vai ser retornado
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
