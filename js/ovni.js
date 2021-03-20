//arquivo ovni.js

class Ovni {
    constructor(context, imagem) {
        this.context = context;
        this.imagem = imagem;
        this.x = 0;
        this.y = 0;
        this.velocidade = 0;
    }

    atualizar() {
        this.y += this.velocidade;
    }

    desenhar() {
        var ctx = this.context;
        var img = this.imagem;
        ctx.drawImage(img, this.x, this.y, img.width, img.height);
    }
}