// arquivo colisor

class Colisao {
    constructor(context) {
        this.sprites = [];
        this.context = context;
    }

    novoSprite(sprite) {
        this.sprites.push(sprite);
    }

    processar() {
        //Verificação da colisão
        this.sprites.forEach(e1 => {
            this.sprites.forEach(e2 => {
                //Não colidir um sprite com ele mesmo
                if (!(e1 == e2)) //Abstrair a colisão
                    this.testarColisao(e1, e2);
            });

        });
    }

    testarColisao(sprite1, sprite2) {
        //Obter os retângulos de colisão de cada sprite
        var rets1 = sprite1.retangulosColisao();
        var rets2 = sprite2.retangulosColisao();

        //Testar as colisões entre eles
        colisoes:
        rets1.every(r1 => {
            rets2.every(r2 => {
                //AInda abstraindo a fórmula
                if (this.retangulosColidem(r1, r2)) {
                    //Eles colidem, vamos notificá-los
                    console.log(sprite1)
                    console.log(sprite2)
                    sprite1.colidiuCom("sprite2");
                    sprite2.colidiuCom("sprite1");

                    //Não precosa terminar de ver todos os retângulos
                    
                }
            });
        });
    }

    retangulosColidem(ret1, ret2) {
        //Fórmula de intersecção de retângulos
        return (ret1.x + ret1.largura) > ret2.x && ret1.x < (ret2.x + ret2.largura) && (ret1.y + ret1.altura) > ret2.y && ret1.y < (ret2.y + ret2.altura);

    }
}
