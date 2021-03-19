
var canvas = document.getElementById('canvas_nave');
var context = canvas.getContext('2d');

// Teclado e animação (game engine)
var teclado = new Teclado(document);
var animacao = new Animacao(context);

// Sprite da nave e sua imagem
var imgNave = new Image();
imgNave.src = '../images/nave.png';
var nave = new Nave(context, teclado, imgNave);
animacao.novoSprite(nave);

teclado.disparou(ESPACO, function () {
    nave.atirar();    
})
// Quando carregar a imagem, iniciar a animação
imgNave.onload = function () {

    //Centralizar na horizontal
    nave.x = canvas.width / 2 - imgNave.width / 2;
    nave.y = canvas.height - imgNave.height;
    nave.velocidade = 5;
    animacao.ligar();
}

