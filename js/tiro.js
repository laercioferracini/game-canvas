// arquivo: tiro.js
class Tiro {
    constructor(context, nave) {
        this.context = context;
        this.nave = nave;

        //posicionar o tiro no bico da nave
        this.largura = 4;
        this.altura = 20;
        this.x = nave.x + nave.imagem.width / 2 - this.largura / 2;
        this.y = nave.y - this.altura;
        this.velocidade = 10;

        //Atributos de desenho padrão
        this.cor = 'red';
    }

    atualizar() {
        this.y -= this.velocidade;
    }

    desenhar() {
        var ctx = this.context;

        //Guardar as configurações atuais do contexto
        ctx.save();

        //Configurar o contexto de acordo com a bola
        ctx.fillStyle = this.cor;
        
        //Desenhar
        ctx.fillRect(this.x,this.y, this.largura, this.altura);
        //ctx.strokeRect(this.x - this.raio, this.y - this.raio, this.raio * 2, this.raio * 2);
        //ctx.arc(this.x, this.y, this.raio, 0, Math.PI * 2, false);

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
