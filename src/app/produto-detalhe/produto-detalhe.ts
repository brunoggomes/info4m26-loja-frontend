import { Component, inject, input, OnInit, signal } from '@angular/core';
import { LojaService } from '../services/loja-service';
import { Produto } from '../models/produto';
import { CarrinhoService } from '../services/carrinho-service';
import { Item } from '../models/item';

@Component({
  imports: [],
  selector: 'app-produto-detalhe',
  styleUrl: './produto-detalhe.scss',
  templateUrl: './produto-detalhe.html',
})
export class ProdutoDetalhe implements OnInit {
  id = input.required<number>();
  produto = signal<Produto | undefined>(undefined)

  readonly #lojaService = inject(LojaService)
  readonly #carrinho = inject(CarrinhoService)
  ngOnInit(): void {
    this.detalharProduto()
  }

  detalharProduto() {
    this.#lojaService.obterProdutoPorId(this.id()).subscribe(prod => {
      this.produto.set(prod)
    })
  }

  adicionar() {
    if (this.produto() != undefined) {
      let it: Item = new Item(this.produto(), 1)
      this.#carrinho.adicionarItem(it)
    }
    console.log(this.#carrinho.itens())
  }
}
