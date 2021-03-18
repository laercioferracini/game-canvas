class Bola {
    constructor(context) {
        this.context = context;
        this.x = 0;
        this.y = 0;
        this.velocidadeX = 0;
        this.velocidadeY = 0;

        //Atributos de desenho padrão
        this.cor = 'black';
        this.raio = 10;
    }

    atualizar() {
        var ctx = this.context;
        if (this.x < this.raio || this.x > ctx.canvas.width - this.raio)
            this.velocidadeX *= -1;

        if (this.y < this.raio || this.y > ctx.canvas.height - this.raio) {
            this.velocidadeY *= -1;
        }
        this.x += this.velocidadeX;
        this.y += this.velocidadeY;
    }

    desenhar() {
        var ctx = this.context;

        //Guardar as configurações atuais do contexto
        ctx.save();

        //Configurar o contexto de acordo com a bola
        ctx.fillStyle = this.cor;
        //ctx.strokeRect(this.x - this.raio, this.y - this.raio, this.raio * 2, this.raio * 2);
        //Desenhar
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.raio, 0, Math.PI * 2, false);
        ctx.fill();

        //Voltar as configurações anteriores
        ctx.restore();

    }

    //Interface de colisão
    retangulosColisao() {
        return [
            {
                x: this.x - this.raio, //this.x é o centro da bola
                y: this.y - this.raio, //this.y é o centro da bola
                largura: this.raio * 2,
                altura: this.raio * 2
            }
        ];
    }

    colidiuCom(sprite) {
        if (this.x < sprite.x)  // Estou na esquerda
            this.velocidadeX = -Math.abs(this.velocidadeX);  // -
        else
            this.velocidadeX = Math.abs(this.velocidadeX);   // +

        if (this.y < sprite.y)  // Estou acima
            this.velocidadeY = -Math.abs(this.velocidadeY);  // -
        else
            this.velocidadeY = Math.abs(this.velocidadeY);   // +
        // console.log(this.cor + 'colidiu com: ' + sprite);
        //this.velocidadeX *= -1;
        //this.velocidadeY *= -1;
        //this.x += this.velocidadeX;
        //this.y += this.velocidadeY;
    }
}
