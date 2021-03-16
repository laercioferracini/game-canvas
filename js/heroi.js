
//class Heroi
// Códigos únicos para as direções
const DIRECAO_ESQUERDA = 1;
const DIRECAO_DIREITA = 2;
const DIRECAO_CIMA = 3;
const DIRECAO_BAIXO = 4;

class Heroi {
    constructor(context, teclado, animacao) {
        this.context = context;
        this.teclado = teclado;
        this.animacao = animacao;
        this.x = 0;
        this.y = 0;
        this.velocidade = 10;

        // Direção padrão
        this.direcao = DIRECAO_DIREITA;
    }

    atualizar() {
        if (this.teclado.pressionada(SETA_ESQUERDA) && this.x > 0) {
            this.direcao = DIRECAO_ESQUERDA;
            this.x -= this.velocidade;
        } else if (this.teclado.pressionada(SETA_DIREITA) && this.x < this.context.canvas.width - 20) {
            this.direcao = DIRECAO_DIREITA;
            this.x += this.velocidade;
        } else if (this.teclado.pressionada(SETA_CIMA) && this.y > 0) {
            this.direcao = DIRECAO_CIMA;
            this.y -= this.velocidade;
        } else if (this.teclado.pressionada(SETA_BAIXO) && this.y < this.context.canvas.height - 20) {
            this.direcao = DIRECAO_BAIXO;
            this.y += this.velocidade;
        }
    }

    desenhar() {
        this.context.fillRect(this.x, this.y, 13, 17);
    }

    atirar() {
        var tiro = new Bola(this.context);
        tiro.x = this.x + 10;
        tiro.y = this.y + 10;
        tiro.raio = 20;
        tiro.cor = 'red';
        tiro.atualizar = function () {
            this.x += this.velocidadeX;
            this.y += this.velocidadeY;
        }
        // if (this.teclado.pressionada(SETA_ESQUERDA)) tiro.velocidadeX = -20;
        // else tiro.velocidadeX = 20;
        if (this.direcao == DIRECAO_ESQUERDA) {
            tiro.velocidadeX = -20;
        } else if (this.direcao == DIRECAO_DIREITA) {
            tiro.velocidadeX = 20;
        } else if (this.direcao == DIRECAO_CIMA) {
            tiro.velocidadeY = -20;
        } else if (this.direcao == DIRECAO_BAIXO) {
            tiro.velocidadeY = 20;
        }
        //Não tenho como incluir nada na animação!
        this.animacao.novoSprite(tiro);

    }
}