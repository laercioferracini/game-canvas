/**
 * PADRONIZANDO A CODIFICAÇÃO
 *  Vamos sempre adotar a seguinte sequência de codificação ao criar novos aplicativos:
 *  • Primeiro, carregamos as imagens, pois os objetos do jogo dependem delas;
 *  • Em seguida, instanciamos os objetos do game engine (animação, teclado, colisor) e os sprites, usando as imagens quando necessário;
 *  • Por último, criamos as funções de inicialização, que só devem executar quando as imagens estiverem completamente carregadas.
 */
var imgEspaco = new Image();
var imgEstrelas = new Image();
var imgNuvens = new Image();
var imgNave = new Image();
var imgOvni = new Image();

imgEspaco.src = '../images/fundo-espaco.png';
imgEstrelas.src = '../images/fundo-estrelas.png';
imgNuvens.src = '../images/fundo-nuvens.png';
imgNave.src = '../images/nave.png';
imgOvni.src = '../images/ovni.png';

imgEspaco.onload = carregando;
imgEstrelas.onload = carregando;
imgNuvens.onload = carregando;
imgNave.onload = carregando;
imgOvni.onload = carregando;

//carregar o canvas
var context = document.getElementById('canvas_space').getContext('2d');
var teclado = new Teclado(document);
var animacao = new Animacao(context);

//instanciar as imagens de Fundo
var fundoEspaco = new Fundo(context, imgEspaco);
var fundoEstrelas = new Fundo(context, imgEstrelas);
var fundoNuvens = new Fundo(context, imgNuvens);
//atribuir a velocidade de cada fundo
fundoEspaco.velocidade = 1;
fundoEstrelas.velocidade = 5;
fundoNuvens.velocidade = 7;

var nave = new Nave(context, teclado, imgNave);
animacao.novoSprite(fundoEspaco);
animacao.novoSprite(fundoEstrelas);
animacao.novoSprite(fundoNuvens);
animacao.novoSprite(nave);

teclado.disparou(ESPACO, function () {
    nave.atirar();
});
var colisor = new Colisor(context);
colisor.novoSprite(nave);
var carregadas = 0;
var total = 5;

function carregando() {
    carregadas++;
    if (carregadas == total) iniciar();
}


//funcao iniciar
function iniciar() {

    //Centralizar na horizontal
    nave.x = context.canvas.width / 2 - imgNave.width / 2;
    nave.y = context.canvas.height - imgNave.height;
    nave.velocidade = 5;
    animacao.ligar();

    setInterval(novoOvni, 1000);
}


// Criação dos inimigos
function novoOvni() {
    var ovni = new Ovni(context, imgOvni);
    // Mínimo: 5; máximo: 20
    ovni.velocidade = aleatorio(5, 15);//Math.floor(5 + Math.random() * (20 - 5 + 1));
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