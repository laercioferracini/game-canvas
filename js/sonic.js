/**
 * Na teoria da Orientação a objetos, um estado é uma forma em que
 * um objeto se encontra e que determina seu comportamento. 
 * Em estados diferentes, a mesma mensagem (chamada de método) enviada a um 
 * objeto pode produzir comportamentos diferentes
 */
var SONIC_DIREITA = 1;
var SONIC_ESQUERDA = 2;

class Sonic {
    constructor(context, teclado, imagem) {
        this.context = context;
        this.teclado = teclado;
        this.x = 0;
        this.y = 0;

        //Criando a spritesheet a partir da imagem recebida
        this.sheet = new Spritesheet(context, imagem, 3, 8);
        this.sheet.intervalo = 120;

        //Estado inicial 
        this.andando = false;
        this.direcao = SONIC_DIREITA;
    }

    atualizar() {
        if (this.teclado.pressionada = SETA_DIREITA) {
            //se já não estava nesse estado
            if (!this.andando || this.direcao != SONIC_DIREITA) {
                //seleciono o quadro
                this.sheet.linha = 1;
                this.sheet.coluna = 0;
            }
        }
    }

    desenhar(x, y) {
        // var largura = this.imagem.width / colunas;
        // var altura = this.imagem.height / linhas;

        var larguraQuadro = this.imagem.width / this.colunas;
        var alturaQuadro = this.imagem.height / this.linhas;

        this.context.drawImage(
            this.imagem,
            larguraQuadro * this.coluna,
            alturaQuadro * this.linha,
            larguraQuadro,
            alturaQuadro,
            x,
            y,
            larguraQuadro,
            alturaQuadro
        );
        this.context.lineWidth = 2;
        this.context.strokeStyle = 'red';
        this.context.beginPath();
        this.context.moveTo(0, y + alturaQuadro - 5);
        this.context.lineTo(this.context.canvas.width, y + alturaQuadro - 5);
        this.context.stroke();
    }
}