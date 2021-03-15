class Animacao {
    constructor(context) {
        this.context = context;
        this.sprites = [];
        this.ligado = false;
        this.limpaTela = true;
    }

    novoSprite(sprite) {
        this.sprites.push(sprite);
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

        //A cada ciclo, limpamos a tela ou desenhamos um fundo
        this.limparTela();

        //Atualizamos o estado dos sprites
        this.sprites.forEach(element => {
            element.atualizar();
        });

        //Desenhamos os sprites
        this.sprites.forEach(element => {
            element.desenhar();
        });

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
    ligar() {
        this.ligado = true;
        this.proximoFrame();
    }

    desligar() {
        this.ligado = false;
    }

    limparTela() {
        if (this.limpaTela) {
            var ctx = this.context;
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        }
    }

}