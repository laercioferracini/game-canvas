const canvas = document.getElementById('canvas_animacao');
const context = canvas.getContext('2d');

var imagens, animacao, teclado, colisor, nave, criacaoInimigos;
var totalImagens = 0, carregadas = 0;

carregarImagens();

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
    teclado.disparou(ESPACO, function () {
        nave.atirar();
    });

    animacao.ligar();

    criacaoInimigos();

}

function criacaoInimigos() {
    var inimigo = {
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