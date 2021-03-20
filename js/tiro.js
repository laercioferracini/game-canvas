// arquivo: tiro.js
class Tiro {
    constructor(context, nave) {
        this.name = 'tiro1';
        this.context = context;
        this.nave = nave;

        //posicionar o tiro no bico da nave
        this.largura = 4;
        this.altura = 10;
        this.x = nave.x + nave.imagem.width / 2 - this.largura / 2;
        this.y = nave.y - this.altura;
        this.velocidade = 5;

        //Atributos de desenho padrão
        this.cor = 'red';
    }

    atualizar() {
        this.y -= this.velocidade;
        // Excluir o tiro quando sumir da tela
        if (this.y < -this.altura) {
            this.animacao.excluirSprite(this);
            this.colisor.excluirSprite(this);
        }
    }

    desenhar() {
        var ctx = this.context;

        //Guardar as configurações atuais do contexto
        ctx.save();

        //Configurar o contexto de acordo com a bola
        ctx.fillStyle = this.cor;

        //Desenhar
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
        //ctx.strokeRect(this.x - this.raio, this.y - this.raio, this.raio * 2, this.raio * 2);
        //ctx.arc(this.x, this.y, this.raio, 0, Math.PI * 2, false);

        //Voltar as configurações anteriores
        ctx.restore();

    }

    //Interface de colisão
    retangulosColisao() {
        var rets = [
            {
                x: this.x,
                y: this.y,
                largura: this.largura,
                altura: this.altura
            }
        ];
        // var ctx = this.context;
        // for (var i in rets) {
        //     ctx.save();
        //     ctx.strokeStyle = 'yellow';
        //     ctx.strokeRect(rets[i].x, rets[i].y, rets[i].largura, rets[i].altura);
        //     ctx.restore();
        // }
        return rets;
    }

    colidiuCom(outro) {

    }
}
