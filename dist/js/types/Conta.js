import { TipoTransacao } from "./TipoTrasacao.js";
let saldo = 3000;
export const Conta = {
    getSaldo() {
        return saldo;
    },
    getDataAcesso() {
        return new Date();
    },
    registrarTransacao(novaTransacao) {
        if (novaTransacao.tipoTransacao == TipoTransacao.DEPÓSITO) {
            saldo += novaTransacao.valor;
        }
        else if (novaTransacao.tipoTransacao == TipoTransacao.TRANSFÊRENCIA || novaTransacao.tipoTransacao == TipoTransacao.PAGAMENTO_DE_BOLETO) {
            saldo -= novaTransacao.valor;
        }
        else {
            alert("Tipo de Transação é inválido!");
            return;
        }
    }
};
