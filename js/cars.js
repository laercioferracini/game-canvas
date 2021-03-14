
var meuCarro = new Carro('blue', 50);
var oponente = new Carro('red', 300);

var mCar = document.getElementById('meuCar');
var opon = document.getElementById('Oponent');

mCar.onclick = function () {
    meuCarro.acelerar();
    var car = document.getElementById('car1');
    car.setAttribute("color", car.cor);
    car.innerHTML = meuCarro.cor + ': ' + meuCarro.velocAtual + ": ";
}

opon.onclick = function () {
    oponente.acelerar();
    document.getElementById('car2').innerHTML = oponente.cor + ': ' + oponente.velocAtual;
}

// var canvas = document.getElementById('canvas_car');
// var context = canvas.getContext('2d');
// var w = canvas.width;
// var h = canvas.height;