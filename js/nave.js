
//class Nave
// Códigos únicos para as direções
const DIRECAO_ESQUERDA = 1;
const DIRECAO_DIREITA = 2;
const DIRECAO_CIMA = 3;
const DIRECAO_BAIXO = 4;
const OFFSET = 5
class Nave {
    constructor(context, teclado, imagem) {
        this.name = 'nave1';
        this.context = context;
        this.teclado = teclado;
        this.imagem = imagem
        this.x = 0;
        this.y = 0;
        this.velocidade = 13;
        this.energia = 3;

        // Direção padrão
        this.direcao = DIRECAO_DIREITA;
    }

    atualizar() {
        if (this.teclado.pressionada(SETA_ESQUERDA) && this.x - OFFSET > 0) {

            this.x -= this.velocidade;
        } if (this.teclado.pressionada(SETA_DIREITA) && this.x < this.context.canvas.width - 40) {

            this.x += this.velocidade;
        } if (this.teclado.pressionada(SETA_CIMA) && this.y - OFFSET > 0) {

            this.y -= this.velocidade;
        } if (this.teclado.pressionada(SETA_BAIXO) && this.y + OFFSET < this.context.canvas.height - 40) {

            this.y += this.velocidade;
        }
    }

    desenhar() {

        this.context.drawImage(this.imagem, this.x, this.y, this.imagem.width, this.imagem.height);
    }

    atirar() {
        //Forma dinâmica 
        //const angle = Math.atan2(y1 - this.x, x1 - this.y);
        //const velocity = { x: Math.cos(angle) * 6, y: Math.sin(angle) * 6 };
        //var t = new Tiro(this.context, this, 'green', velocity);
        //TODO criar bônus para aumentar os tiros e deixá-los mais rápidos
        var t = new Tiro(this.context, this, 'red', { x: 0, y: -7 });
        var t2 = new Tiro(this.context, this, 'red', { x: -1, y: -7 });
        var t3 = new Tiro(this.context, this, 'red', { x: 1, y: -7 });
        var t4 = new Tiro(this.context, this, 'white', { x: -2, y: -10 });
        var t5 = new Tiro(this.context, this, 'white', { x: 2, y: -10 });
        this.animacao.novoSprite(t);
        this.colisor.novoSprite(t);
        this.animacao.novoSprite(t2);
        this.colisor.novoSprite(t2);
        this.animacao.novoSprite(t3);
        this.colisor.novoSprite(t3);
        this.animacao.novoSprite(t4);
        this.colisor.novoSprite(t4);
        this.animacao.novoSprite(t5);
        this.colisor.novoSprite(t5);

    }

    retangulosColisao() {
        // Estes valores vão sendo ajustados aos poucos
        var rets =
            [
                { x: this.x + 2, y: this.y + 19, largura: 9, altura: 13 },
                { x: this.x + 13, y: this.y + 3, largura: 10, altura: 33 },
                { x: this.x + 25, y: this.y + 19, largura: 9, altura: 13 }
            ];
        // Desenhando os retângulos para visualização
        var ctx = this.context;
        for (var i in rets) {
            ctx.save();
            ctx.strokeStyle = 'yellow';
            ctx.strokeRect(rets[i].x, rets[i].y, rets[i].largura, rets[i].altura);
            ctx.restore();
        }
        return rets;
    }

    colidiuCom(outro) {

        //Se colidir com o ovni, game over
        if (outro instanceof Ovni) {
            this.energia--;
            console.log(this.energia);
            if (this.energia <= 0) {
                this.animacao.desligar();
                //this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
                var ctx = this.context;
                ctx.save();
                ctx.font = '38pt Arial';
                ctx.fillStyle = 'white';
                ctx.strokeStyle = 'blue';

                var w = ctx.canvas.width;
                var h = ctx.canvas.height;

                ctx.fillText("Game over!", w / 2 - 150, h / 2 + 15, w);
                ctx.strokeText("Game over!", w / 2 - 150, h / 2 + 15, w);
                ctx.restore();
            }
        }
    }
}