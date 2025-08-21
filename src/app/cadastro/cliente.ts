import {v4 as uuid} from 'uuid';

export class Cliente {
    id?: string;
    nome?: string;
    cpf?: string;
    dataNascimento?: string;
    email?: string;

    //criar um cliente vazio
    static NewClient(): Cliente {
        const cliente = new Cliente();
        cliente.id = uuid(); //gera um id unico para o cliente
        return cliente;
    }
}