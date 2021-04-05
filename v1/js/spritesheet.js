
class Spritesheet {
    constructor(context, imagem, linhas, colunas) {
        this.context = context;
        this.imagem = imagem;
        this.linhas = linhas;
        this.colunas = colunas;
        this.intervalo = 0;
        this.linha = 0;
        this.coluna = 0;
    }

    proximoQuadro() {
        // Momento atual
        var agora = new Date().getTime();
        // Se ainda não tem último tempo medido
        if (!this.ultimoTempo) this.ultimoTempo = agora;
        // Já é hora de mudar de coluna?
        if (agora - this.ultimoTempo < this.intervalo) return;
        if (this.coluna < this.colunas - 1)
            this.coluna++;
        else
            this.coluna = 0;
        // Guardar hora da última mudança
        this.ultimoTempo = agora;

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
    }
}