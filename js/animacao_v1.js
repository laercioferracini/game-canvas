class Animacao {
    constructor(context) {
        this.context = context;
        this.sprites = [];
        this.ligado = false;
        this.limpaTela = true;

        this.processamentos = [];
        this.spritesExcluir = [];
        this.processamentosExcluir = [];
    }

    desligar() {
        this.ligado = false;
    }

    excluirProcessamento(processamento) {

        this.processamentosExcluir.push(processamento)
    }

    excluirSprite(sprite) {
        this.spritesExcluir.push(sprite);
    }

    ligar() {
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

        //A cada ciclo, limpamos a tela ou desenhamos um fundo
        this.limparTela();

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

        //Processar exclusões
        this.processarExclusoes();
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

    processarExclusoes() {
        // Criar novos arrays
        var novosSprites = [];
        var novosProcessamentos = [];

        // Adicionar somente se não constar no array de excluídos
        this.sprites.forEach((s, index) => {
            if (this.spritesExcluir.indexOf(s) != -1) {

                this.sprites.splice(index, 1);
            }
        });

        this.processamentos.forEach((p, index) => {
            if (this.processamentosExcluir.indexOf(p) != -1)
                this.processamentos.splice(index, 1);
        });

        // Limpar os arrays de exclusões
        this.spritesExcluir = [];
        this.processamentosExcluir = [];

        // Substituir os arrays velhos pelos novos
        //this.sprites = novosSprites;
        //this.processamentos = novosProcessamentos;
    }

}