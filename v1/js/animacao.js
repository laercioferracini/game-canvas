class Animacao {
    constructor(context) {
        this.context = context;
        this.sprites = [];
        this.ligado = false;
        this.limpaTela = true;

        this.processamentos = [];

        this.ultimoCiclo = 0;
        this.decorrido = 0;
    }

    desligar() {
        this.ligado = false;
    }

    excluirProcessamento(processamento) {

        this.processamentos.forEach((p, index) => {
            if (p == processamento)
                this.processamentos.splice(index, 1);
        });
    }

    excluirSprite(sprite) {
        this.sprites.forEach((s, index) => {
            if (s == sprite) {
                this.sprites.splice(index, 1);
            }
        });
    }

    ligar() {
        this.ultimoCiclo = 0;
        this.ligado = true;
        this.proximoFrame();
    }


    limparTela() {
        if (this.limpaTela) {
            var ctx = this.context;
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        }
    }

    novoProcessamento(processamento) {
        this.processamentos.push(processamento);
        processamento.animacao = this;
    }

    novoSprite(sprite) {
        this.sprites.push(sprite);
        sprite.animacao = this;
    }

    /**
         * Temos uma implicação importante: todo objeto que quiser participar do loop de animação (ou seja, que quiser ser um sprite), 
         * terá que implementar os métodos 'atualizar' e 'desenhar'. Este é o conceito
         * de 'interface' da Orientação a objetos: um conjunto de métodos que uma
         * classe deve implementar para poder interagir com outra.
         */
    proximoFrame() {
        //posso continuar?
        if (!this.ligado) return;

        var agora = new Date().getTime();
        if (this.ultimoCiclo == 0) this.ultimoCiclo = agora;
        this.decorrido = agora - this.ultimoCiclo;

        //A cada ciclo, limpamos a tela ou desenhamos um fundo
        //this.limparTela();

        //Atualizamos o estado dos sprites
        this.sprites.forEach(sp => {
            sp.atualizar();
            sp.desenhar();
        });

        //Desenhamos os sprites
        // this.sprites.forEach(sp => {

        // });

        //Processamentos gerais
        this.processamentos.forEach(p => {
            p.processar();
        });

        //Atualizar o instante do último ciclo
        this.ultimoCiclo = agora;

        /**
         * A função de animação é chamada pelo JavaScript como uma função comum, não como um método de objeto — não podemos usar o this dentro dela
         * A solução é referenciar o objeto em uma variável e chamar uma função anônima, que por sua vez chama proximoFrame como um verdadeiro método do objeto:
         */
        //Chamamos o próximo ciclo
        var animacao = this;
        requestAnimationFrame(function () {
            animacao.proximoFrame();
        });
    }

    mensagem(msg) {

        context.save();
        context.font = '55px palatino';
        context.fillStyle = 'white';
        context.strokeStyle = 'rgba(100,50,50,0.4)';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        var w = context.canvas.width / 2;
        var h = context.canvas.height / 3;

        context.fillText(msg, w, h);
        context.strokeText(msg, w, h);

        context.restore();

    }

}