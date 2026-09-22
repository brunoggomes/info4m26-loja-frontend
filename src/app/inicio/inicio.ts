import { Component, inject, signal } from '@angular/core';
import { LojaService } from '../services/loja-service';
import { CarrinhoService } from '../services/carrinho-service';
import { Produto } from '../models/produto';
import { Item } from '../models/item';
import { Carrinho } from '../carrinho/carrinho';

@Component({
  imports: [Carrinho],
  selector: 'app-inicio',
  styleUrl: './inicio.scss',
  templateUrl: './inicio.html',
})
export class Inicio {
  #loja = inject(LojaService)
  #carrinho = inject(CarrinhoService)

  protected readonly produtos = signal<Produto[]>([])

  constructor() {
    this.#loja.obterProdutos().subscribe(prods => {
      this.produtos.set(prods)
    })
  }

  adicionar(p: Produto) {
    if (p) {
      let it: Item = {
        id: p.id,
        produto: p,
        quantidade: 1
      }
      this.#carrinho.adicionarItem(it)
      console.log(this.#carrinho.itens())
      console.log(this.#carrinho.qtdItens())
    }
  }

}
