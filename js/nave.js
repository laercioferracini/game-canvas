
//class Nave
// Códigos únicos para as direções
const DIRECAO_ESQUERDA = 1;
const DIRECAO_DIREITA = 2;
const DIRECAO_CIMA = 3;
const DIRECAO_BAIXO = 4;
const OFFSET = 5
class Nave {
    constructor(context, teclado, imagem) {
        this.context = context;
        this.teclado = teclado;
        this.imagem = imagem
        this.x = 0;
        this.y = 0;
        this.velocidade = 10;

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
        var t = new Tiro(this.context, this);
        this.animacao.novoSprite(t);
        this.colisor.novoSprite(t);

        // if (this.teclado.pressionada(SETA_ESQUERDA)) tiro.velocidadeX = -20;
        // else tiro.velocidadeX = 20;
        // if (this.direcao == DIRECAO_ESQUERDA) {
        //     tiro.velocidadeX = -20;
        // } else if (this.direcao == DIRECAO_DIREITA) {
        //     tiro.velocidadeX = 20;
        // } else if (this.direcao == DIRECAO_CIMA) {
        //     tiro.velocidadeY = -20;
        // } else if (this.direcao == DIRECAO_BAIXO) {
        //     tiro.velocidadeY = 20;
        // }
        //Não tenho como incluir nada na animação!

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
            ctx.strokeRect(rets[i].x, rets[i].y, rets[i].largura,
                rets[i].altura);
            ctx.restore();
        }
        return rets;
    }
    colidiuCom() { }
}