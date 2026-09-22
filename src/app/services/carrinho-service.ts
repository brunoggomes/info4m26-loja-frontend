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
            let adicionados = this.#_itens()
            let existe = false
            adicionados.forEach(item => {
                if (item.produto === it.produto) {
                    this.aumentarQuantidade(it)
                    existe = true
                }
            })

            if (!existe) {
                this.#_itens.update(itens => [...itens, it]);
                return true
            }
        }
        return false
    }
    aumentarQuantidade(it: Item): boolean {
        if (!it) {
            return false;
        }

        let encontrado = false;

        this.#_itens.update(itens =>
            itens.map(item => {
                if (item.produto === it.produto) {
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
