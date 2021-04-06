// arquivo colisor

class Colisor {
    constructor(context) {
        this.sprites = [];
        this.context = context;
        this.aoColidir = null;
    }

    novoSprite(sprite) {
        this.sprites.push(sprite);
        sprite.colisor = this;
    }

    processar() {
        var jaTestados = new Object();

        //Verificação da colisão
        this.sprites.forEach(s1 => {
            this.sprites.forEach(s2 => {

                //Não colidir um sprite com ele mesmo
                if (s1 != s2) {
                    //Gerar strings únicas para os objetos
                    var id1 = this.stringUnica(s1);
                    var id2 = this.stringUnica(s2);

                    //Criar os arrays se não existem
                    if (!jaTestados[id1]) jaTestados[id1] = [];
                    if (!jaTestados[id2]) jaTestados[id2] = [];

                    //Teste de repetição
                    if (!(jaTestados[id1].indexOf(id2) >= 0 || jaTestados[id2].indexOf(id1) >= 0)) {
                        //Abstrair a colisão
                        this.testarColisao(s1, s2);

                        //Registrando o teste
                        jaTestados[id1].push(id2);
                        jaTestados[id2].push(id1);
                    }
                }
            });

        });
    }

    excluirSprite(sprite) {

        this.sprites.forEach((s, index) => {
            if (sprite == s) {
                this.sprites.splice(index, 1);
            }
        });
    }

    retangulosColidem(ret1, ret2) {
        //Fórmula de intersecção de retângulos
        return (ret1.x + ret1.largura) > ret2.x && ret1.x < (ret2.x + ret2.largura) && (ret1.y + ret1.altura) > ret2.y && ret1.y < (ret2.y + ret2.altura);
    }

    stringUnica(sprite) {
        var str = '';
        var retangulos = sprite.retangulosColisao();
        retangulos.forEach(r => {
            str +=
                'x:' + r.x + ',' +
                'y:' + r.y + ',' +
                'l:' + r.largura + ',' +
                'a:' + r.altura + '\n';
        });

        return str;
    }

    testarColisao(sprite1, sprite2) {
        //Obter os retângulos de colisão de cada sprite
        var rets1 = sprite1.retangulosColisao();
        var rets2 = sprite2.retangulosColisao();

        //Testar as colisões entre eles
        rets1.every(r1 => {
            rets2.every(r2 => {
                //AInda abstraindo a fórmula
                if (this.retangulosColidem(r1, r2)) {
                    //Eles colidem, vamos notificá-los
                    sprite1.colidiuCom(sprite2);
                    sprite2.colidiuCom(sprite1);

                    //tratador geral
                    //if (this.aoColidir) this.aoColidir(sprite1, sprite2);

                    //Não precisa terminar de ver todos os retângulos
                    return;
                }
            });
        });
    }

}
