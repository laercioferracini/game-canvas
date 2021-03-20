

var teclado = new Teclado(document);

var imgEspaco = new Image();
var imgEstrelas = new Image();
var imgNuvens = new Image();
var imgNave = new Image();

imgEspaco.src = '../images/fundo-espaco.png';
imgEstrelas.src = '../images/fundo-estrelas.png';
imgNuvens.src = '../images/fundo-nuvens.png';
imgNave.src = '../images/nave.png';

var carregadas = 0;
var total = 4;

imgEspaco.onload = carregando;
imgEstrelas.onload = carregando;
imgNuvens.onload = carregando;
imgNave.onload = carregando;

function carregando() {
    carregadas++;
    if (carregadas == total) iniciar();
}


//funcao inciar
function iniciar() {
    //carregar o canvas
    var context = document.getElementById('canvas_space').getContext('2d');

    //instanciar as imagens de Fundo
    var fundoEspaco = new Fundo(context, imgEspaco);
    var fundoEstrelas = new Fundo(context, imgEstrelas);
    var fundoNuvens = new Fundo(context, imgNuvens);
    var nave = new Nave(context, teclado, imgNave);
    var colisor = new Colisor();
    colisor.novoSprite(nave);
    //atribuir a velocidade de cada fundo
    fundoEspaco.velocidade = 1;
    fundoEstrelas.velocidade = 5;
    fundoNuvens.velocidade = 7;

    //adicionar as imagens na animacao().novoSprite
    var animacao = new Animacao(context);
    animacao.novoSprite(fundoEspaco);
    animacao.novoSprite(fundoEstrelas);
    animacao.novoSprite(fundoNuvens);
    animacao.novoSprite(nave);

    //Centralizar na horizontal
    nave.x = context.canvas.width / 2 - imgNave.width / 2;
    nave.y = context.canvas.height - imgNave.height;
    nave.velocidade = 5;


    teclado.disparou(ESPACO, function () {
        nave.atirar();
    })

    animacao.ligar();
}

