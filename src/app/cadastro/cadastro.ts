import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms'
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Cliente } from './cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-cadastro',
  imports: [FlexLayoutModule, MatCardModule, FormsModule,
    MatFormFieldModule, MatInputModule, MatIcon, MatButtonModule, NgxMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss'
})
export class Cadastro implements OnInit {
  cliente: Cliente = Cliente.NewClient(); //cria novo cliente
  atualizando: boolean = false; //verifica se é para atualizar ou cadastrar


  //importa um service
  constructor(
    private service: ClienteService,
    private route: ActivatedRoute, //pega os parametros da rota
    private router: Router
  ) { }

  ngOnInit(): void {
    //pega o id da url
    //verifica se estou editando ou cadastrando
    this.route.queryParamMap.subscribe((query: any) => {
      const params = query['params'];
      const id = params['id'];
      if (id) {
        let clienteEncontrado = this.service.buscarClientePorId(id);
        if (clienteEncontrado) {
          this.atualizando = true;
          this.cliente = clienteEncontrado;
        }
      }
    })
  }

  Salvar() {
    if (!this.atualizando) {
      this.service.salvar(this.cliente);
      this.cliente = Cliente.NewClient(); //limpa o formulario
    } else {
      this.service.atualizar(this.cliente);
      this.router.navigate(['/Consulta']);
    }

  }
}
