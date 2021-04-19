// Arquivo fundo.js

class Fundo {
  // contrutor
  constructor (context, imagem) {
    this.context = context
    this.imagem = imagem
    this.velocidade = 0
    this.posicaoEmenda = 0
  }

  atualizar () {
    // atualizar a posição de emenda
    this.posicaoEmenda += this.velocidade * this.animacao.decorrido / 1000

    // Emenda passou da posição
    if (this.posicaoEmenda > this.imagem.height) {
      this.posicaoEmenda = 0
    }
  }

  desenhar () {
    const img = this.imagem

    // primeira cópia
    let posicaoY = this.posicaoEmenda - img.height
    this.context.drawImage(img, 0, posicaoY, img.width, img.height)

    // segunda cópia
    posicaoY = this.posicaoEmenda
    this.context.drawImage(img, 0, posicaoY, img.width, img.height)
  }
}
