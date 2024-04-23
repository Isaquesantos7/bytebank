import { TipoTransacao } from "../types/TipoTrasacao.js";
import { Transacao } from "../types/Transacao.js";
import { Conta } from '../types/Conta.js';
import { saldoComponent } from "./saldo-component.js";
import { renderizarExtrato } from "./extrato-components.js";

const elementoFormulario = document.querySelector(".block-nova-transacao form") as HTMLFormElement;

elementoFormulario.addEventListener("submit", function(event) {
    try {
        event.preventDefault();

        if (!elementoFormulario.checkValidity()) {
            alert("Por favor, preencha todos os campos da transação!");
            return;
        }

        const inputTipoTransacao = elementoFormulario.querySelector("#tipoTransacao") as HTMLSelectElement;
        const inputValor = elementoFormulario.querySelector("#valor") as HTMLInputElement;
        const inputData = elementoFormulario.querySelector("#data") as HTMLInputElement;

        let tipoTransacao: TipoTransacao = inputTipoTransacao.value as TipoTransacao;
        let valor: number = inputValor.valueAsNumber;
        let data: Date = new Date(inputData.value);

        const novaTransacao: Transacao = {
            tipoTransacao: tipoTransacao,
            valor: valor,
            data: data,
        };

        Conta.registrarTransacao(novaTransacao);
        saldoComponent.atualizar();
        elementoFormulario.reset();
        renderizarExtrato();
    } catch (erro) {
        alert(erro.message);
    }
});