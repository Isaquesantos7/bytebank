import { TipoTransacao } from "../types/TipoTrasacao.js";
import { atualizarSaldo, getSaldo } from "./saldo-component.js";
const elementoFormulario = document.querySelector(".block-nova-transacao form");
elementoFormulario.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!elementoFormulario.checkValidity()) {
        alert("Por favor, preencha todos os campos da transação!");
        return;
    }
    const inputTipoTransacao = elementoFormulario.querySelector("#tipoTransacao");
    const inputValor = elementoFormulario.querySelector("#valor");
    const inputData = elementoFormulario.querySelector("#data");
    let tipoTransacao = inputTipoTransacao.value;
    let valor = inputValor.valueAsNumber;
    let data = new Date(inputData.value);
    let saldo = getSaldo();
    if (tipoTransacao == TipoTransacao.DEPÓSITO) {
        saldo += valor;
    }
    else if (tipoTransacao == TipoTransacao.TRANSFÊRENCIA || tipoTransacao == TipoTransacao.PAGAMENTO_DE_BOLETO) {
        saldo -= valor;
    }
    else {
        alert("Tipo de Transação é inválido!");
        return;
    }
    atualizarSaldo(saldo);
    const novaTransacao = {
        tipoTransacao: tipoTransacao,
        valor: valor,
        data: data,
    };
    elementoFormulario.reset();
});
