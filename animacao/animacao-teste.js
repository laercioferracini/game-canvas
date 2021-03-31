var canvas = document.getElementById('canvas_anim');
var context = canvas.getContext('2d');

//criando sprites
var b1 = new Bola(context);
b1.x = 100;
b1.y = 200;
b1.velocidadeX = 2;
b1.velocidadeY = -10;
b1.cor = 'red';
b1.raio = 20;

var b2 = new Bola(context);
b2.x = 200;
b2.y = 100;
b2.velocidadeX = -5;
b2.velocidadeY = 10;
b2.cor = 'purple';
b2.raio = 30;

var b3 = new Bola(context);
b3.x = 1;
b3.y = 10;
b3.velocidadeX = -1;
b3.velocidadeY = 11;
b3.cor = 'blue';
b3.raio = 1;

/**
 * Procure fazer com que uma classe receba de fora e guarde em atributos tudo que ela precisa para executar seu trabalho, de forma que ela fique
 * completamente desacoplada do meio externo. Depender diretamente da variável context do aplicativo é mau negócio! Este princípio chama-se
 * 'injeção de dependências'.
 */
//criando o loop de animação
var animacao = new Animacao(context);
animacao.novoSprite(b1);
animacao.novoSprite(b2);
animacao.novoSprite(b3);

//"Ligar" a animação
animacao.ligar();


var cLigar = document.getElementById('ligar');
cLigar.onclick = function () {
    if (cLigar.checked) animacao.ligar();
    else animacao.desligar();
}

var cLimpaTela = document.getElementById('limpaTela');
cLimpaTela.onclick = function () {
    animacao.limpaTela = cLimpaTela.checked;
}