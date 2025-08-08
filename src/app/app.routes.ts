import { Routes } from '@angular/router';
import { Cadastro } from './cadastro/cadastro';
import { Consulta } from './consulta/consulta';

export const routes: Routes = [
    { path: 'Cadastro', component: Cadastro },
    { path: 'Consulta', component: Consulta }
];
