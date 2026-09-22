import { Component, computed, effect, inject } from '@angular/core';
import { CarrinhoService } from '../services/carrinho-service';

@Component({
  imports: [],
  selector: 'app-carrinho',
  styleUrl: './carrinho.scss',
  templateUrl: './carrinho.html',
})
export class Carrinho {
  protected carrinhoService = inject(CarrinhoService)
  quantidade = this.carrinhoService.qtdItens()
}
