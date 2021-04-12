const canvas = document.getElementById('canvas_animacao');
const context = canvas.getContext('2d');
const iniciar = document.getElementById('iniciar');

let imagens, animacao, teclado, colisor, nave, espaco, estrelas, nuvens, inimigo;
let totalImagens = 0, carregadas = 0;
let musicaAcao;



function carregarImagens() {
    //Objeto com o nomedas imagens
    imagens = {
        espaco: 'fundo-espaco.png',
        estrelas: 'fundo-estrelas.png',
        nuvens: 'fundo-nuvens.png',
        nave: 'nave-spritesheet.png',
        ovni: 'ovni.png',
        explosao: 'explosao.png'
    };

    for (const i in imagens) {
        var img = new Image();
        img.src = 'images/' + imagens[i];
        img.onload = carregando;
        totalImagens++;

        imagens[i] = img;
    }
}
function carregarMusicas() {
    musicaAcao = new Audio();
    musicaAcao.src = 'snd/musica-acao.mp3';
    musicaAcao.load();
    musicaAcao.volume = 0.8;
    musicaAcao.loop = true;
     
    
}
iniciar.onclick = function(){
    carregarImagens();
    carregarMusicas();
    musicaAcao.play();
}
function carregando() {
    carregadas++;
    if (carregadas == totalImagens) iniciarObjetos();
}

function iniciarObjetos() {
    //Objetos principais
    animacao = new Animacao(context);
    teclado = new Teclado(document);
    colisor = new Colisor();
    espaco = new Fundo(context, imagens.espaco);
    estrelas = new Fundo(context, imagens.estrelas);
    nuvens = new Fundo(context, imagens.nuvens);
    nave = new Nave(context, teclado, imagens.nave, imagens.explosao);

    // Ligações entre objetos
    animacao.novoSprite(espaco);
    animacao.novoSprite(estrelas);
    animacao.novoSprite(nuvens);
    animacao.novoSprite(nave);
    colisor.novoSprite(nave);
    animacao.novoProcessamento(colisor);
    init();

}

function init() {
    //Fundos
    espaco.velocidade = 75;
    estrelas.velocidade = 150;
    nuvens.velocidade = 500;

    //Nave
    nave.x = canvas.width / 2 - (imagens.nave.width / 2) / 2;
    nave.y = canvas.height - imagens.nave.height / 3;
    nave.velocidade = 350;

    //Tiro
    ativarTiro(true);

    //Pausa
    teclado.disparou(ENTER, pausarJogo);

    animacao.ligar();

    criarInimigo();

}

function criarInimigo() {
    inimigo = {

        ultimoOvni: new Date().getTime(),

        processar: function () {
            let agora = new Date().getTime();
            let decorrido = agora - this.ultimoOvni;

            if (decorrido > 1000) {
                novoOvni();
                this.ultimoOvni = agora;
            }
        }
    };

    animacao.novoProcessamento(inimigo);
}

function novoOvni() {
    var imgOvni = imagens.ovni;
    var ovni = new Ovni(context, imgOvni, imagens.explosao);
    // Mínimo: 5; máximo: 20
    ovni.velocidade = aleatorio(500, 700) * animacao.decorrido / 1000;//Math.floor(5 + Math.random() * (20 - 5 + 1));
    // Mínimo: 0;
    // máximo: largura do canvas - largura do ovni
    ovni.x = aleatorio(0, context.canvas.width - imgOvni.width + 1);// Math.floor(Math.random() * (context.canvas.width - imgOvni.width + 1));

    // Descontar a altura
    ovni.y = -imgOvni.height;

    animacao.novoSprite(ovni);
    colisor.novoSprite(ovni);
}

function aleatorio(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

function atirar() {
    nave.atirar();
}
function pausarJogo() {
    if (animacao.ligado) {
        animacao.desligar();
        ativarTiro(false);
        mensagem("Pausado");

    }
    else {
        inimigo.ultimoOvni = new Date().getTime();
        animacao.ligar();
        ativarTiro(true);
    }
}

function ativarTiro(ativar) {
    if (ativar) {
        teclado.disparou(ESPACO, atirar);
    } else {
        teclado.disparou(ESPACO, null);
    }
}

function mensagem(msg) {

    context.save();
    context.font = '50px palatino';
    context.fillStyle = 'white';
    context.strokeStyle = 'rgba(100,50,50,0.4)';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    var w = context.canvas.width / 2;
    var h = context.canvas.height / 2;

    context.fillText(msg, w, h);
    context.strokeText(msg, w, h);

    context.restore();

}