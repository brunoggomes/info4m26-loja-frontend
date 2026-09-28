import { Produto } from "./produto"

export class Item {
    produto: Produto | undefined
    quantidade: number

    constructor(prod: Produto |undefined, 
                qtd: number) {
        this.produto = prod
        this.quantidade = qtd
    }
}