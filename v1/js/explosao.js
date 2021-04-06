class Explosao{
    constructor(context, imagem, x, y){
        this.context = context;
        this.imagem = imagem;
        this.spritesheet = new Spritesheet(context, imagem, 1, 5);
        this.spritesheet.intervalo = 80;
        this.x = x;
        this.y = y;

        let explosao = this;
        this.fimDaExplosao = null;
        this.spritesheet.fimDoCiclo = function(){
            explosao.animacao.excluirSprite(explosao);
            if(explosao.fimDaExplosao) explosao.fimDaExplosao();
        }
    }

    atualizar(){

    }

    desenhar(){
        
        this.spritesheet.desenhar(this.x, this.y);
        this.spritesheet.proximoQuadro();
    }
}