var canvas = document.getElementById('canvas_colisao');
var context = canvas.getContext('2d');

function resize_canvas() {
    var canvas = document.getElementById('canvas_colisao');
    canvas.width = window.innerWidth - 50;
    canvas.height = window.innerHeight - 50;
}