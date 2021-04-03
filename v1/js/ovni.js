//arquivo ovni.js

class Ovni {
    constructor(context, imagem) {
        this.name = 'marte1';
        this.context = context;
        this.imagem = imagem;
        this.x = 0;
        this.y = 0;
        this.velocidade = 0;
    }
    atirar() {
        //var t = new Tiro(this.context, this);
        //this.animacao.novoSprite(t);
        //this.colisor.novoSprite(t);
    }
    atualizar() {
        this.y += this.velocidade;

        if (this.y > this.context.canvas.height) {
            this.animacao.excluirSprite(this);
            this.colisor.excluirSprite(this);
        }
    }

    desenhar() {
        var ctx = this.context;
        var img = this.imagem;
        ctx.drawImage(img, this.x, this.y, img.width, img.height);
    }

    retangulosColisao() {
        //var largura
        var rets =
            [
                { x: this.x + 15, y: this.y + 1, largura: 35, altura: 10 },
                { x: this.x, y: this.y + 11, largura: 65, altura: 15 },
                { x: this.x + 15, y: this.y + 23, largura: 35, altura: 7 },
            ];

        // Desenhando os retângulos para visualização
        var ctx = this.context;
        // for (var i in rets) {
        //     ctx.save();
        //     ctx.strokeStyle = 'yellow';
        //     ctx.strokeRect(rets[i].x, rets[i].y, rets[i].largura, rets[i].altura);
        //     ctx.restore();
        // }

         ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = 'yellow';
        ctx.lineWidth = 1.5;   
        //ctx.arc(this.x+ this.imagem.width/2, this.y+this.imagem.height/2, this.imagem.height * 0.9, 0, Math.PI * 2);
        ctx.ellipse(this.x + this.imagem.width / 2, this.y + this.imagem.height / 2, this.imagem.width * 0.45, this.imagem.height * 0.5, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        return rets;
    }
    colidiuCom(outro) {
        //Se colidir com um Tiro, os dois desaparecem
        if (outro instanceof Tiro) {
            this.animacao.excluirSprite(this);
            this.colisor.excluirSprite(this);
            this.animacao.excluirSprite(outro);
            this.colisor.excluirSprite(outro);
        }
    }
}