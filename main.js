'use strict'

const display = document.getElementById("display")
const numeros = document.querySelectorAll("[id*=tecla]")
const operadores = document.querySelectorAll("[id*=operador]")
const btnIgual = document.getElementById("igual")
const limpaDisplay = document.getElementById("limparDisplay")
const limpaCalculo = document.getElementById("limparCalculo")
const apagaTexto = document.getElementById("backspace")
const inverteSinal = document.getElementById("inverter")
const decimal = document.getElementById("decimal")

// varíavel para inserir novo número
let novoNumero = true
let operador 
let numeroAnterior

numeros.forEach((numero) => {
    numero.addEventListener("click", (e) => {
        inserirNumero(e)
    })
})

operadores.forEach((operador) => {
    operador.addEventListener("click", (e) => {
        selecionarOperador(e)
    })
})

btnIgual.addEventListener("click", () => {
    ativarIgual()
})

limpaDisplay.addEventListener("click", () => {
    limparDisplay()
})

limpaCalculo.addEventListener("click", () => {
    limparCalculo()
})

apagaTexto.addEventListener("click", () => {
    removerUltimoCaractere()
})

inverteSinal.addEventListener("click", () => {
    inverterSinal()
})

decimal.addEventListener("click", () => {
    insereVirgula()
})

function inserirNumero(e) {
    atualizarDisplay(e.target.textContent)
}

function atualizarDisplay(texto) {
    // se for inserir um novo número, ele vai "apagar" o display e inserir somente o novo numero
    // colocamos "false" em seguida pois se não, sempre ele irá ser considerado como um "novoNumero"
    // se não, ou seja, se for um primeiro numero clicado, ele vai concatenar
    if (novoNumero) {
        display.textContent = texto.toLocaleString("BR")
        novoNumero = false
    } else {
        display.textContent += texto.toLocaleString("BR")
    }
}

function selecionarOperador(e) {
    // só vamos guardar o numero anterior se ele não for o "novoNumero", se não ele vai ficar guardando na memória
    if(!novoNumero) {
        calcular()
        novoNumero = true
        operador = e.target.textContent
        // numeroAnterior vai guardar o numero anterior clicado para realizar a operação
        // usamos o replace pra ele trocar a , por . para conseguirmos fazer contas em decimais
        numeroAnterior = parseFloat(display.textContent.replace(",","."))
    }
}

// função que vai verificar se o operador é diferente de undefined, ou seja, se ele está vazio
const operacaoPendente = () => operador !== undefined

function calcular() {
    if(operacaoPendente()) {
        // usamos o replace pra ele trocar a , por . para conseguirmos fazer contas em decimais
        const numeroAtual = parseFloat(display.textContent.replace(",","."))
        novoNumero = true
        
        // USANDO O EVAL
        // usamos o metodo eval para realizar as operações no JS
        let resultado = eval (`${numeroAnterior}${operador}${numeroAtual}`)
        atualizarDisplay(resultado)

        // SEM O EVAL
        // if(operador == "+") {
        //     atualizarDisplay(numeroAnterior + numeroAtual)
        // } else if (operador == "-") {
        //     atualizarDisplay(numeroAnterior - numeroAtual)
        // } else if (operador == "*") {
        //     atualizarDisplay(numeroAnterior * numeroAtual)
        // } else if (operador == "/") {
        //     atualizarDisplay(numeroAnterior / numeroAtual)
        // }
    }
}

// FUNÇÃO PARA O BOTÃO DE IGUAL "="
function ativarIgual() {
    calcular()
    // atribuímos undefined para o operador, pois dessa maneira ele não vai tentar fazer uma nova operação quando clicarmos em qualquer outro operador
    operador = undefined
}

// FUNÇÃO PARA O BOTÃO DE APAGAR DISPLAY "CE"
function limparDisplay() {
    display.textContent = ""
}

// FUNÇÃO PARA BOTÃO DE LIMPAR O CÁLCULO "C"
function limparCalculo() {
    limparDisplay()
    // com essa função, limpa todos os campos e operações que estão sendo realizadas
    operador = undefined
    novoNumero = true
    numeroAnterior = undefined
}

// FUNÇÃO PARA O BOTÃO DE APAGAR NÚMERO
function removerUltimoCaractere() {
    // utilizando o slice ele pega o remove o último caractere, usando o -1, para ele contar de trás pra frente
    display.textContent = display.textContent.slice(0, -1)
}


// FUNÇÃO PARA O BOTÃO DE INVERTER SINAL
function inverterSinal() {
    novoNumero = true
    atualizarDisplay(display.textContent * - 1)
}

// FUNÇÃO PARA O BOTÃO DA VÍRGULA

function existeDecimal() {
    // se existe decimal, é porque ele trouxe um número diferente de -1, pois o indexOf traz -1 quando não existe e != -1 quando existe
    return display.textContent.indexOf(",") !== -1
}

function existeValor() {
    return display.textContent.length > 0 
}

// const existeDecimal = () => display.textContent.indexOf(",") !== -1
// const existeValor = () => display.textContent.length > 0

function insereVirgula() {
    if(!existeDecimal()) {
        if(existeValor()) {
            atualizarDisplay(",")
        } else {
            atualizarDisplay("0,")
        }
    }
}

// UTILIZANDO O TECLADO 

const mapaTeclado = {
    "0": "tecla0",
    "1": "tecla1",
    "2": "tecla2"
    // seria só completar com todas as teclas...
}

document.addEventListener("keydown", (e) => {
    mapearTeclado(e)
})

function mapearTeclado(e) {
    const tecla = e.key
    // pegamos o id da tecla clicada e coloca no id da teclaClicada
    const teclaClicada = document.getElementById(mapaTeclado[tecla])

    teclaClicada.click()
}

