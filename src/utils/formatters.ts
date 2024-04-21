import { FormatoData } from "../types/FormatoData.js";

export function formataMoeada(valor: number): string {
    
    return valor.toLocaleString('pt-br', {currency: 'BRL', style: 'currency'});
}

export function formataData(data: Date, formato: FormatoData = FormatoData.PADRAO): string { 
    switch(formato) {
        case formato = FormatoData.DIA_SEMANA_DIA_MES_ANO:
            return data.toLocaleDateString('pt-br', {
                weekday: 'long',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });

            break;

            case formato = FormatoData.DIA_MES:
                return data.toLocaleDateString('pt-br', {
                    day: '2-digit',
                    month: '2-digit',
                })

                break
            
                case formato = FormatoData.PADRAO:
                    return data.toLocaleDateString('pt-br');

                    break;
    }
}