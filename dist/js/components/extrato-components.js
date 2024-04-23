import { Conta } from '../types/Conta.js';
import { FormatoData } from "../types/FormatoData.js";
import { formataMoeada, formataData } from "../utils/formatters.js";
const elementoRegistroTransacoesExtrato = document.querySelector(".extrato .registro-transacoes");
renderizarExtrato();
export function renderizarExtrato() {
    const grupoTransacoes = Conta.getGruposTransacoes();
    elementoRegistroTransacoesExtrato.innerHTML = "";
    let htmlRegistroTransacoes = "";
    for (let grupoTransacao of grupoTransacoes) {
        let htmlTransacaoItem = "";
        for (let transacao of grupoTransacao.transacoes) {
            htmlTransacaoItem += `
                <div>
                    <div class="transacao-item">
                        <div class="transacao-info">
                            <span class="tipo">${transacao.tipoTransacao}</span>
                            <strong class="valor">${formataMoeada(transacao.valor)}</strong>
                        </div>
                    </div>
                    <time class="data">${formataData(transacao.data, FormatoData.DIA_MES)}</time>
                </div>
            `;
        }
        htmlRegistroTransacoes += `
            <div class="transacoes-group">
                <strong class="mes-group">${grupoTransacao.label}</strong>
                ${htmlTransacaoItem}
            </div>
        `;
        console.log(htmlTransacaoItem);
    }
    elementoRegistroTransacoesExtrato.innerHTML = htmlRegistroTransacoes;
}
