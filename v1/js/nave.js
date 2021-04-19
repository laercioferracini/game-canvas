
// class Nave
// Códigos únicos para as direções
const DIRECAO_DIREITA = 2
const OFFSET = 5
class Nave {
  constructor (context, teclado, imagem, imgExplosao) {
    this.name = 'nave1'
    this.context = context
    this.teclado = teclado
    this.imagem = imagem
    this.x = 0
    this.y = 0
    this.velocidade = 13

    // Direção padrão
    this.direcao = DIRECAO_DIREITA

    this.spritesheet = new Spritesheet(context, imagem, 3, 2)
    this.spritesheet.linha = 0
    this.spritesheet.intervalo = 1000

    this.imgExplosao = imgExplosao

    this.acabaramVidas = null
    this.vidasExtras = 3
  }

  atualizar () {
    const incremento = this.velocidade * this.animacao.decorrido / 1000

    if (this.teclado.pressionada(SETA_ESQUERDA) && this.x - OFFSET > 0) this.x -= incremento
    if (this.teclado.pressionada(SETA_DIREITA) && this.x < this.context.canvas.width - 40) this.x += incremento
    if (this.teclado.pressionada(SETA_CIMA) && this.y - OFFSET > 0) this.y -= incremento
    if (this.teclado.pressionada(SETA_BAIXO) && this.y + OFFSET < this.context.canvas.height - 40) this.y += incremento
  }

  desenhar () {
    if (this.teclado.pressionadas[17] && this.teclado.pressionadas[18] && this.teclado.pressionadas[86] && this.teclado.pressionadas[45]) this.vidasExtras++
    // this.context.drawImage(this.imagem, this.x, this.y, this.imagem.width, this.imagem.height);

    if (this.teclado.pressionada(SETA_ESQUERDA)) this.spritesheet.linha = 1
    else if (this.teclado.pressionada(SETA_DIREITA)) this.spritesheet.linha = 2
    else this.spritesheet.linha = 0

    this.spritesheet.desenhar(this.x, this.y)
    this.spritesheet.proximoQuadro()
  }

  atirar () {
    // Forma dinâmica
    // const angle = Math.atan2(y1 - this.x, x1 - this.y);
    // const velocity = { x: Math.cos(angle) * 6, y: Math.sin(angle) * 6 };
    // var t = new Tiro(this.context, this, 'green', velocity);
    // TODO criar bônus para aumentar os tiros e deixá-los mais rápidos
    const t = new Tiro(this.context, this, 'red', { x: 0, y: -500 })
    // var t2 = new Tiro(this.context, this, 'red', { x: -120, y: -500 });
    // var t3 = new Tiro(this.context, this, 'red', { x: 120, y: -500 });
    // var t4 = new Tiro(this.context, this, 'white', { x: -170, y: -400 });
    // var t5 = new Tiro(this.context, this, 'white', { x: 170, y: -400 });
    this.animacao.novoSprite(t)
    this.colisor.novoSprite(t)
    // this.animacao.novoSprite(t2);
    // this.colisor.novoSprite(t2);
    // this.animacao.novoSprite(t3);
    // this.colisor.novoSprite(t3);
    // this.animacao.novoSprite(t4);
    // this.colisor.novoSprite(t4);
    // this.animacao.novoSprite(t5);
    // this.colisor.novoSprite(t5);
  }

  posicionar () {
    this.x = this.context.canvas.width / 2 - (this.imagem.width / 2) / 2
    this.y = this.context.canvas.height - this.imagem.height / 3
  }

  retangulosColisao () {
    // Estes valores vão sendo ajustados aos poucos
    const rets =
            [
              { x: this.x + 2, y: this.y + 19, largura: 9, altura: 13 },
              { x: this.x + 13, y: this.y + 3, largura: 10, altura: 33 },
              { x: this.x + 25, y: this.y + 19, largura: 9, altura: 13 }
            ]
    // Desenhando os retângulos para visualização
    // var ctx = this.context;
    // for (var i in rets) {
    //     ctx.save();
    //     ctx.strokeStyle = 'yellow';
    //     ctx.strokeRect(rets[i].x, rets[i].y, rets[i].largura, rets[i].altura);
    //     ctx.restore();
    // }
    return rets
  }

  colidiuCom (outro) {
    // Se colidir com o ovni, game over
    if (outro instanceof Ovni) {
      this.animacao.excluirSprite(this)
      this.animacao.excluirSprite(outro)

      this.colisor.excluirSprite(this)
      this.colisor.excluirSprite(outro)

      const explosao1 = new Explosao(this.context, this.imgExplosao, this.x, this.y)
      const explosao2 = new Explosao(this.context, this.imgExplosao, outro.x, outro.y)
      this.animacao.novoSprite(explosao1)
      this.animacao.novoSprite(explosao2)

      const nave = this
      explosao1.fimDaExplosao = function () {
        nave.vidasExtras--
        if (nave.vidasExtras < 0) {
          if (nave.acabaramVidas) nave.acabaramVidas()
        } else {
          // recolocar a nave no tela
          nave.colisor.novoSprite(nave)
          nave.animacao.novoSprite(nave)
          nave.posicionar()
        }
      }
    }
  }
}
