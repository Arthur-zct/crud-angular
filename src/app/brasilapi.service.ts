import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estado } from './brasilapi.models';

@Injectable({
  providedIn: 'root'
})
export class BrasilApiService { 
  baseUrl = 'https://brasilapi.com.br/api';
  constructor(private http: HttpClient) {}

  //quando retorna um dado de uma api, ele envia a requisição pra receber um objeto do tipo Observable
  listarUfs() : Observable<Estado[]> {
    return this.http.get<Estado[]>(`${this.baseUrl}/ibge/uf/v1`);
  }
}
