//criação de um Objetos com função construtora
class Carro {
    constructor(cor, velocMax) {
        this.cor = cor;
        this.velocMax = velocMax;
        this.velocAtual = 0;
    }
    //criando método acelerar
    acelerar() {
        if (this.velocMax > this.velocAtual) {
            this.velocAtual += 10;
        }

    }
    age() {
        let date = new Date();
        return date.getFullYear() - this.year;
    }
}
//criação de um Objetos sem função construtora
var fusca = {
    cor: 'azul',
    velocidade: 0,
    acelerar: function () {
        this.velocidade += 10;
    }
}

// let meuCarro1 = new Carro('azul', 250);
// let oponente2 = new Carro('red', 300);

// meuCarro1.acelerar();

// document.write(meuCarro1.cor + ': ' + meuCarro1.velocAtual);
// document.write('<br/>');
// document.write(oponente2.cor + ': ' + oponente2.velocAtual);

