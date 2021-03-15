// arquivo: teclado.js
// Códigos de teclas - aqui vão todos os que forem necessários

let SETA_ESQUERDA = 37;
let SETA_DIREITA = 39;
let SETA_CIMA = 38;
let SETA_BAIXO = 40;

class Teclado {
    constructor(elemento) {
        this.elemento = elemento;

        //Array com as teclas pressionadas
        this.pressionadas = [];
        //Registrando o estado das teclas no array
        var teclado = this;
        elemento.addEventListener('keydown', function (evento) {
            teclado.pressionadas[evento.keyCode] = true;
        });

        elemento.addEventListener('keyup', function (evento) {
            teclado.pressionadas[evento.keyCode] = false;
        });

    }
    pressionada(tecla) {
        return this.pressionadas[tecla];
    }

}