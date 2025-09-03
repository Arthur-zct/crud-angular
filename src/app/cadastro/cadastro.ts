import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms'
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Cliente } from './cliente';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cadastro',
  imports: [FlexLayoutModule, MatCardModule, FormsModule,
    MatFormFieldModule, MatInputModule, MatIcon, MatButtonModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss'
})
export class Cadastro {
  cliente: Cliente = Cliente.NewClient(); //cria novo cliente

  //importa um service
  constructor(private service: ClienteService) { }

  Salvar() {
    this.service.salvar(this.cliente);
    this.cliente = Cliente.NewClient(); //limpa o formulario
  }
}
