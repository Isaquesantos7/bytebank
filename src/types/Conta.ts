import { Transacao } from "./Transacao.js";
import { TipoTransacao } from "./TipoTrasacao.js";

let saldo: number = 3000;

function debitar(valor: number): void {
    if(valor <= 0) {
        throw new Error('O valor a ser debitado deve ser maior que zero!');
    }

    if(valor > saldo) {
        throw new Error('Saldo insuficiente!');
    }
    saldo -= valor;
}

function depositar(valor: number): void {
    if(valor <= 0) {
        throw new Error('O valor a ser depositado dever ser maior que zero!');
    }
    saldo += valor;
}

export const Conta = {

    getSaldo() {
        return saldo;
    },

    getDataAcesso(): Date {
        return new Date();
    },

    registrarTransacao(novaTransacao: Transacao): void {
        if (novaTransacao.tipoTransacao == TipoTransacao.DEPÓSITO) {
            depositar(novaTransacao.valor);
        } else if (novaTransacao.tipoTransacao == TipoTransacao.TRANSFÊRENCIA || novaTransacao.tipoTransacao == TipoTransacao.PAGAMENTO_DE_BOLETO) {
            debitar(novaTransacao.valor);
        } else {
            throw new Error('Tipo de Transação é inválido!')
        }
    }

}