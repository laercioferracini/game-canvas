/* eslint-disable no-undef */
/* eslint-disable space-before-function-paren */
const canvas = document.getElementById('canvas_animacao')
const context = canvas.getContext('2d')
const iniciar = document.getElementById('link_jogar')
const placar = document.getElementById('score')

let imagens, animacao, teclado, colisor, nave, espaco, estrelas, nuvens, inimigo, painel
let totalImagens = 0
let carregadas = 0
let musicaAcao

carregarImagens()
carregarMusicas()

function carregarImagens() {
  // Objeto com o nomedas imagens
  imagens = {
    espaco: 'fundo-espaco.png',
    estrelas: 'fundo-estrelas.png',
    nuvens: 'fundo-nuvens.png',
    nave: 'nave-spritesheet.png',
    ovni: 'ovni.png',
    explosao: 'explosao.png'
  }

  for (const i in imagens) {
    const img = new Image()
    img.src = 'images/' + imagens[i]
    img.onload = carregando
    totalImagens++

    imagens[i] = img
  }
}
function carregarMusicas () {
  musicaAcao = new Audio()
  musicaAcao.src = 'snd/musica-acao.mp3'
  musicaAcao.load()
  musicaAcao.volume = 0.8
  musicaAcao.loop = true
}

function carregando() {
  context.save()
  context.drawImage(imagens.espaco, 0, 0, canvas.width, canvas.height)
  mensagem('Carregando...')
  carregadas++
  const tamanhoTotal = 300
  const tamanho = (carregadas / totalImagens) * tamanhoTotal
  context.fillStyle = 'yellow'
  context.fillRect(100, 250, tamanho, 50)
  context.restore()

  if (carregadas === totalImagens) {
    iniciarObjetos()
    mostrarLinkJogar()
  }
}

function iniciarObjetos() {
  // Objetos principais
  animacao = new Animacao(context)
  teclado = new Teclado(document)
  colisor = new Colisor()
  espaco = new Fundo(context, imagens.espaco)
  estrelas = new Fundo(context, imagens.estrelas)
  nuvens = new Fundo(context, imagens.nuvens)
  nave = new Nave(context, teclado, imagens.nave, imagens.explosao)
  painel = new Painel(context, nave)

  // Ligações entre objetos
  animacao.novoSprite(espaco)
  animacao.novoSprite(estrelas)
  animacao.novoSprite(nuvens)
  animacao.novoSprite(nave)
  animacao.novoSprite(painel)
  colisor.novoSprite(nave)
  animacao.novoProcessamento(colisor)

  init()
}

function init() {
  // Fundos
  espaco.velocidade = 75
  estrelas.velocidade = 150
  nuvens.velocidade = 500

  // Nave
  nave.posicionar()
  nave.velocidade = 350

  // Pausa
  teclado.disparou(ENTER, pausarJogo)

  criarInimigo()

  // Game over
  nave.acabaramVidas = () => {
    ativarTiro(false)
    animacao.desligar()

    musicaAcao.pause()
    musicaAcao.currentTime = 0.0
    teclado.disparou(ENTER, null)
    context.drawImage(imagens.espaco, 0, 0, canvas.width, canvas.height)
    mensagem('GAME OVER')
    mostrarLinkJogar()

    // Restaurar as condições da nave
    nave.vidasExtras = 3
    nave.posicionar()
    animacao.novoSprite(nave)
    colisor.novoSprite(nave)
    removerInimigos()
  }

  // Pontuação
  colisor.aoColidir = (o1, o2) => {
    // Tiro com Ovni
    if ((o1 instanceof Tiro && o2 instanceof Ovni) || (o1 instanceof Ovni && o2 instanceof Tiro)) {
      painel.pontuacao += 10
      placar.innerHTML = painel.pontuacao
    }
  }
}

iniciar.onclick = iniciarJogo

function mostrarLinkJogar() {
  iniciar.style.display = 'block'
}

function iniciarJogo() {
  iniciar.style.display = 'none'
  painel.pontuacao = 0
  placar.innerHTML = painel.pontuacao
  inimigo.ultimoOvni = new Date().getTime()
  ativarTiro(true)
  musicaAcao.play()
  animacao.ligar()
}

function criarInimigo() {
  inimigo = {

    ultimoOvni: new Date().getTime(),

    processar: function () {
      const agora = new Date().getTime()
      const decorrido = agora - this.ultimoOvni

      if (decorrido > 1000) {
        novoOvni()
        this.ultimoOvni = agora
      }
    }
  }

  animacao.novoProcessamento(inimigo)
}

function novoOvni() {
  const imgOvni = imagens.ovni
  const ovni = new Ovni(context, imgOvni, imagens.explosao)
  // Mínimo: 5 máximo: 20
  ovni.velocidade = aleatorio(500, 700) * animacao.decorrido / 1000// Math.floor(5 + Math.random() * (20 - 5 + 1))
  // Mínimo: 0
  // máximo: largura do canvas - largura do ovni
  ovni.x = aleatorio(0, context.canvas.width - imgOvni.width + 1)// Math.floor(Math.random() * (context.canvas.width - imgOvni.width + 1))

  // Descontar a altura
  ovni.y = -imgOvni.height

  animacao.novoSprite(ovni)
  colisor.novoSprite(ovni)
}

function removerInimigos() {
  for (const i in animacao.sprites) {
    if (animacao.sprites[i] instanceof Ovni) { animacao.excluirSprite(animacao.sprites[i]) }
  }
}

function aleatorio(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1))
}

function atirar() {
  nave.atirar()
}
function pausarJogo() {
  if (animacao.ligado) {
    animacao.desligar()
    musicaAcao.pause()
    ativarTiro(false)
    animacao.mensagem('Pausado')
  } else {
    inimigo.ultimoOvni = new Date().getTime()
    animacao.ligar()
    musicaAcao.play()
    ativarTiro(true)
  }
}

function ativarTiro(ativar) {
  if (ativar) {
    teclado.disparou(ESPACO, atirar)
  } else {
    teclado.disparou(ESPACO, null)
  }
}

function mensagem(msg) {
  context.save()
  context.font = '55px palatino'
  context.fillStyle = 'white'
  context.strokeStyle = 'rgba(100,50,50,0.4)'
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  const w = context.canvas.width / 2
  const h = context.canvas.height / 3

  context.fillText(msg, w, h)
  context.strokeText(msg, w, h)

  context.restore()
}
