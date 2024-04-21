import { TipoTransacao } from "./TipoTrasacao.js";

export type Transacao = {
    tipoTransacao: TipoTransacao,
    valor: number,
    data: Date,
}