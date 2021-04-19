// arquivo explosao.js

const SOM_EXPLOSAO = new Audio()
SOM_EXPLOSAO.src = 'snd/explosao.mp3'
SOM_EXPLOSAO.volume = 0.1
SOM_EXPLOSAO.load()

class Explosao {
  constructor (context, imagem, x, y) {
    this.context = context
    this.imagem = imagem
    this.spritesheet = new Spritesheet(context, imagem, 1, 5)
    this.spritesheet.intervalo = 80
    this.x = x
    this.y = y

    const explosao = this
    this.fimDaExplosao = null
    this.spritesheet.fimDoCiclo = function () {
      explosao.animacao.excluirSprite(explosao)
      if (explosao.fimDaExplosao) explosao.fimDaExplosao()
    }

    SOM_EXPLOSAO.currentTime = 0.0
    SOM_EXPLOSAO.play()
  }

  atualizar () {

  }

  desenhar () {
    this.spritesheet.desenhar(this.x, this.y)
    this.spritesheet.proximoQuadro()
  }
}
