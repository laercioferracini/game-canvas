/**
 * Na teoria da Orientação a objetos, um estado é uma forma em que
 * um objeto se encontra e que determina seu comportamento. 
 * Em estados diferentes, a mesma mensagem (chamada de método) enviada a um 
 * objeto pode produzir comportamentos diferentes
 */
var SONIC_PARADO = 0;
var SONIC_DIREITA = 1;
var SONIC_ESQUERDA = 2;

class Sonic {
    constructor(context, teclado, imagem) {
        this.context = context;
        this.teclado = teclado;
        this.x = 0;
        this.y = 0;
        this.velocidade = 5;

        //Criando a spritesheet a partir da imagem recebida
        this.sheet = new Spritesheet(context, imagem, 3, 8);
        this.sheet.intervalo = 60;

        //Estado inicial 
        this.andando = false;
        this.direcao = SONIC_DIREITA;
    }

    atualizar() {
        if (this.teclado.pressionada(SETA_DIREITA)) {
            //se já não estava nesse estado
            if (!this.andando || this.direcao != SONIC_DIREITA) {
                //seleciono o quadro
                this.sheet.linha = 1;
                this.sheet.coluna = 0;

            }

            //configurando o estado atual
            this.andando = true;
            this.direcao = SONIC_DIREITA;

            //Neste estado, a animação da spritesheet deve rodar
            this.sheet.proximoQuadro();

            //Desloco o Sonic
            this.x += this.velocidade;


        }
        else if (this.teclado.pressionada(SETA_ESQUERDA)) {
            if (!this.andando || this.direcao != SONIC_ESQUERDA) {
                this.sheet.linha = 2; // linha 2
                this.sheet.coluna = 0;
            }
            this.andando = true;
            this.direcao = SONIC_ESQUERDA;
            this.sheet.proximoQuadro();
            this.x -= this.velocidade; // aqui é sinal de menos
        }
        // else if (this.teclado.pressionada(ESPACO)) {
        //     if (!this.andando || this.direcao == SONIC_DIREITA) {
        //         this.y -= 5;
        //         this.sheet.proximoQuadro();
        //         //this.x += this.velocidade;

        //     }
        // } 
        else {
            if (this.direcao == SONIC_DIREITA) this.sheet.coluna = 0;
            else if (this.direcao == SONIC_ESQUERDA) this.sheet.coluna = 1;

            this.sheet.linha = 0;
            this.andando = false;
        }
    }

    desenhar() {
        // var largura = this.imagem.width / colunas;
        // var altura = this.imagem.height / linhas;

        this.sheet.desenhar(this.x, this.y);

        // this.context.lineWidth = 2;
        // this.context.strokeStyle = 'red';
        // this.context.beginPath();
        // this.context.moveTo(0, y + alturaQuadro - 5);
        // this.context.lineTo(this.context.canvas.width, y + alturaQuadro - 5);
        // this.context.stroke();
    }
}