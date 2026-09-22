import { Produto } from "./produto"

export type Item = {
    id?: number
    produto?: Produto
    quantidade: number
}