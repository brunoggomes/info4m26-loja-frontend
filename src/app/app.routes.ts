import { Routes } from '@angular/router';
import { ProdutoDetalhe } from './produto-detalhe/produto-detalhe';
import { Inicio } from './inicio/inicio';

export const routes: Routes = [
    { path: 'produtos', component: Inicio },
    { path: 'produtos/:id', component: ProdutoDetalhe },
    { path: '', redirectTo: '/produtos', pathMatch: 'full' }
];
