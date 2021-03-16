// arquivo: teclado.js
// Códigos de teclas - aqui vão todos os que forem necessários

let SETA_ESQUERDA = 37;
let SETA_DIREITA = 39;
let SETA_CIMA = 38;
let SETA_BAIXO = 40;
let ESPACO = 32;

class Teclado {
    constructor(elemento) {
        this.elemento = elemento;

        //Array com as teclas pressionadas
        this.pressionadas = [];

        //Array com as teclas disparadas
        this.disparadas = [];

        //Funções disparos
        this.funcoesDisparos = [];
        //Registrando o estado das teclas no array
        var teclado = this;

        elemento.addEventListener('keydown', function (evento) {
            var tecla = evento.keyCode;
            teclado.pressionadas[tecla] = true;

            //Disparar somente se for o primeiro jeydown da tecla
            if (teclado.funcoesDisparos[tecla] && !teclado.disparadas[tecla]) {
                teclado.disparadas[tecla] = true;
                teclado.funcoesDisparos[tecla]();
            }
        });

        elemento.addEventListener('keyup', function (evento) {
            teclado.pressionadas[evento.keyCode] = false;
            teclado.disparadas[evento.keyCode] = false;
        });

    }
    pressionada(tecla) {
        return this.pressionadas[tecla];
    }
    disparou(tecla, callback) {
        this.funcoesDisparos[tecla] = callback;
    }

}