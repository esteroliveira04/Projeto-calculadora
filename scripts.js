// seleção dos elementos

const display = document.querySelector("#displayInput");
const botaoIgual = document.querySelector(".igual");
const botaoPonto = document.querySelector(".ponto");
const botoesNumeros = document.querySelectorAll(".num");
const botoesOperadores = document.querySelectorAll(".operador");
const botaoLimpar = document.querySelector("#limpar");

// variáveis globais

let operacaoAtual = "";
let operador = null;
let valorAnterior = "";
let calculando = false;

// funções 
function atualizaDisplay() {
    display.value = operacaoAtual;
}


function insereNumero(evento) {
    if (calculando) {
        operacaoAtual = evento.target.textContent;
        calculando = false;
    } else {
        operacaoAtual += evento.target.textContent;
    }

    atualizaDisplay();
    }

function inserePonto(){
    if (operacaoAtual.indexOf(".") === -1){
        operacaoAtual += ".";
        atualizaDisplay();
    }
}

function insereOperador(evento){
    if (operacaoAtual !== ""){
        valorAnterior = operacaoAtual;
        operacaoAtual = "";
        operador = evento.target.textContent;
        /*if (!calculando){
            if (operador !== null){
                calcula();
            }
            valorAnterior = operacaoAtual;
            operacaoAtual = "";
        }
        operador = evento.target.textContent;
    }*/
}
}

function calcula(){
    let resultado = null;
    const operandoAnterior = parseFloat(valorAnterior);
    const operandoAtual = parseFloat(operacaoAtual);

    if (operador === null){
        return;
    }

    if (isNaN(operandoAnterior) || isNaN(operacaoAtual)){
        operacaoAtual = "Erro"
        atualizaDisplay();
        return;
    }

    switch(operador){
        case "+":
            resultado = parseFloat(operandoAnterior) + parseFloat(operacaoAtual);
            break;
        case "-":
            resultado = Math.round(operandoAnterior) - Math.round(operacaoAtual);
            break;
        case "*":
            resultado = operandoAnterior * operacaoAtual;
            break;
        case "/":
            if (operandoAtual === 0){
                operacaoAtual = "Erro: divisão por zero";
                atualizaDisplay();
                return;
            }

            resultado = Math.round(operandoAnterior) / Math.round(operacaoAtual);
            resultado = resultado.toFixed(2)
            break;
    }

    operacaoAtual = String(resultado);
    valorAnterior = operacaoAtual;
    calculando = true;
    atualizaDisplay();
    operador = null;

}

function limpar(){
    display.value = "";
}

// eventos

botaoPonto.addEventListener("click", inserePonto);

botoesNumeros.forEach((botao) => botao.addEventListener("click", insereNumero));

botoesOperadores.forEach((botao) => botao.addEventListener("click", insereOperador));

botaoIgual.addEventListener("click", calcula);

botaoLimpar.addEventListener("click", limpar);