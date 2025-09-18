import { Component, OnInit, Inject } from '@angular/core';
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
import { MatSnackBar } from '@angular/material/snack-bar'
import { BrasilApiService } from '../brasilapi.service';
import { Municipio, Estado } from '../brasilapi.models';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  imports: [FlexLayoutModule, MatCardModule, FormsModule,
    MatFormFieldModule, MatInputModule, MatIcon, MatButtonModule, NgxMaskDirective, MatSelectModule, CommonModule],
  providers: [provideNgxMask()],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss'
})
export class Cadastro implements OnInit {
  cliente: Cliente = Cliente.NewClient(); //cria novo cliente
  atualizando: boolean = false; //verifica se é para atualizar ou cadastrar
  estados: Estado[] = [];
  municipios: Municipio[] = [];

  //importa um service
  constructor(
    private service: ClienteService,
    private route: ActivatedRoute, //pega os parametros da rota
    private router: Router,
    private snack: MatSnackBar,
    private brasilApiService: BrasilApiService,
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

    this.carregarUFs();
  }

  Salvar() {
    if (!this.atualizando) {
      this.service.salvar(this.cliente);
      this.cliente = Cliente.NewClient(); //limpa o formulario
      this.mostrarMensagem('Cliente cadastrado com sucesso!');
    } else {
      this.service.atualizar(this.cliente);
      this.router.navigate(['/Consulta']);
      this.mostrarMensagem('Cliente atualizado com sucesso!');
    }

  }

  carregarUFs() {
    //chama o serviço para listar os estados
    this.brasilApiService.listarUfs().subscribe({
      next: listaEstados => {
        this.estados = listaEstados;
      },
      error: (erro) => {
        console.error("Erro ao listar estados", erro);
      }
    })
  }

  mostrarMensagem(mensagem: string) { 
    this.snack.open(mensagem, "Ok", { duration: 3000 });
  }
}
