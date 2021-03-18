var canvas = document.getElementById('canvas_colisao');
var context = canvas.getContext('2d');

var b1 = new Bola(context);
b1.x = 200;
b1.y = 200;
b1.velocidadeX = 10;
b1.velocidadeY = -5;
b1.cor = 'blue';
b1.raio = 20;

var b2 = new Bola(context);
b2.x = 300;
b2.y = 300;
b2.velocidadeX = -5;
b2.velocidadeY = 10;
b2.cor = 'red';
b2.raio = 30;

var b3 = new Bola(context);
b3.x = 100;
b3.y = 400;
b3.velocidadeX = -3;
b3.velocidadeY = 10;
b3.cor = 'black';
b3.raio = 15;

var b4 = new Bola(context);
b4.x = 400;
b4.y = 400;
b4.velocidadeX = -1;
b4.velocidadeY = 2;
b4.cor = '#0537cc83';
b4.raio = 50;

var colisor = new Colisao();
colisor.novoSprite(b1);
colisor.novoSprite(b2);
colisor.novoSprite(b3);
colisor.novoSprite(b4);

colisor.aoColidir = function (s1, s2) {
    //console.log(s1.cor + 'colidiu com: ' + s2.cor);
    // this.velocidadeX *= -1;
    // this.velocidadeY *= -1;
    // this.x += this.velocidadeX;
    // this.y += this.velocidadeY;
};

requestAnimationFrame(animar);

function animar() {
    //limpar a tela
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    //Atualizando sprites
    b1.atualizar();
    b2.atualizar();
    b3.atualizar();
    b4.atualizar();
    //Desenhar
    b1.desenhar();
    b2.desenhar();
    b3.desenhar();
    b4.desenhar();

    colisor.processar();

    requestAnimationFrame(animar);
}