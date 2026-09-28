import { computed, Service, signal } from '@angular/core';
import { Item } from '../models/item';

@Service()
export class CarrinhoService {
    //signal de itens adicionados ao carrinho
    readonly  #_itens = signal<Item[]>([])
    /* signal de itens somente leitura a ser exposto para acesso externo */
    readonly itens = this.#_itens.asReadonly();

    readonly qtdItens = computed(() => {
        let quant = 0
        this.#_itens().forEach(el => {
            quant += el.quantidade
        });
        return quant
    });
 
    adicionarItem(it: Item): boolean {
        if (it) {
            if (this.itemAdicionado(it)) {
                this.aumentarQuantidade(it)
                return false
            }
       
            this.#_itens.update(itens => [...itens, it]); 
        }

        return true
    }

    itemAdicionado(item: Item): boolean {
        return this.#_itens().some(it => 
            it.produto?.id === item.produto?.id)
    }

    aumentarQuantidade(it: Item): boolean {
        if (!it) {
            return false;
        }
        let encontrado = false;

        this.#_itens.update(itens =>
            itens.map(item => {
                if (item.produto?.id === it.produto?.id) {
                    encontrado = true;

                    return {
                        ...item,
                        quantidade: item.quantidade + 1
                    };
                }

                return item;
            })
        );

        return encontrado;
    }
}
