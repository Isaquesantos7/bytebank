import { TipoTransacao } from "./TipoTrasacao.js";
let saldo = JSON.parse(localStorage.getItem('saldo')) || 0.0;
const transacoes = JSON.parse(localStorage.getItem('transacoes'), (key, value) => {
    if (key === 'data') {
        return new Date(value);
    }
    return value;
}) || [];
function debitar(valor) {
    if (valor <= 0) {
        throw new Error('O valor a ser debitado deve ser maior que zero!');
    }
    if (valor > saldo) {
        throw new Error('Saldo insuficiente!');
    }
    saldo -= valor;
    localStorage.setItem('saldo', saldo.toString());
}
function depositar(valor) {
    if (valor <= 0) {
        throw new Error('O valor a ser depositado dever ser maior que zero!');
    }
    saldo += valor;
    localStorage.setItem('saldo', saldo.toString());
}
export const Conta = {
    getSaldo() {
        return saldo;
    },
    getDataAcesso() {
        return new Date();
    },
    getGruposTransacoes() {
        const gruposTransacoes = [];
        const listaTransacoes = structuredClone(transacoes);
        const transacoesOrdenadas = listaTransacoes.sort((t1, t2) => t2.data.getTime() - t1.data.getTime());
        let labelAtualGrupoTransacao = "";
        for (let transacao of transacoesOrdenadas) {
            let labelGrupoTransacao = transacao.data.toLocaleDateString("pt-br", { month: "long", year: "numeric" });
            if (labelAtualGrupoTransacao !== labelGrupoTransacao) {
                labelAtualGrupoTransacao = labelGrupoTransacao;
                gruposTransacoes.push({
                    label: labelGrupoTransacao,
                    transacoes: []
                });
            }
            gruposTransacoes.at(-1).transacoes.push(transacao);
        }
        return gruposTransacoes;
    },
    registrarTransacao(novaTransacao) {
        if (novaTransacao.tipoTransacao == TipoTransacao.DEPÓSITO) {
            depositar(novaTransacao.valor);
        }
        else if (novaTransacao.tipoTransacao == TipoTransacao.TRANSFÊRENCIA || novaTransacao.tipoTransacao == TipoTransacao.PAGAMENTO_DE_BOLETO) {
            debitar(novaTransacao.valor);
        }
        else {
            throw new Error('Tipo de Transação é inválido!');
        }
        transacoes.push(novaTransacao);
        localStorage.setItem('transacoes', JSON.stringify(transacoes));
    }
};
