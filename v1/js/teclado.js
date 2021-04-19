// arquivo: teclado.js
// Códigos de teclas - aqui vão todos os que forem necessários

const SETA_ESQUERDA = 37
const SETA_DIREITA = 39
const SETA_CIMA = 38
const SETA_BAIXO = 40
const ESPACO = 32
const ENTER = 13

class Teclado {
  constructor (elemento) {
    this.elemento = elemento

    // Array com as teclas pressionadas
    this.pressionadas = []

    // Array com as teclas disparadas
    this.disparadas = []

    // Funções disparos
    this.funcoesDisparos = []

    // Registrando o estado das teclas no array
    const teclado = this

    elemento.addEventListener('keydown', function (evento) {
      const tecla = evento.keyCode
      teclado.pressionadas[tecla] = true

      // Disparar somente se for o primeiro keydown da tecla
      if (teclado.funcoesDisparos[tecla] && !teclado.disparadas[tecla]) {
        teclado.disparadas[tecla] = true
        teclado.funcoesDisparos[tecla]()
      }
    })

    elemento.addEventListener('keyup', function (evento) {
      teclado.pressionadas[evento.keyCode] = false
      teclado.disparadas[evento.keyCode] = false
    })
  }

  pressionada (tecla) {
    return this.pressionadas[tecla]
  }

  disparou (tecla, callback) {
    this.funcoesDisparos[tecla] = callback
  }
}
