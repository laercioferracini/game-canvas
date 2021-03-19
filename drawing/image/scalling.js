const idCanvas = 'canvas';
var canvas = document.getElementById(idCanvas);
var context = canvas.getContext('2d');
var image = new Image();

var scaleSlider = document.getElementById('scaleSlider');
var scaleOutput = document.getElementById('scaleOutput');
var scale = 1.0;
var MINIMUM_SCALE = 1.0;
var MAXIMUM_SCALE = 3.0;

//FUNCTIONS......................................................

function drawImage() {
    var w = canvas.width;
    var h = canvas.height;
    var sw = w * scale;
    var sh = h * scale;

    context.clearRect(0, 0, w, h);

    context.drawImage(image, -sw / 2 + w / 2, -sh / 2 + h / 2, sw, sh);

}

function drawScaleText(value) {
    var text = parseFloat(value).toFixed(2);
    var percent = parseFloat(value - MINIMUM_SCALE) / parseFloat(MAXIMUM_SCALE - MINIMUM_SCALE);

    scaleOutput.innexText = text;
    percent = percent < 0.35 ? 0.35 : percent;
    scaleOutput.style.fontSize = percent * MAXIMUM_SCALE / 1.5 + 'em';
}

//Event handlers
scaleSlider.onchange = function (e) {
    scale = e.target.value;
    if (scale < MINIMUM_SCALE) scale = MINIMUM_SCALE;
    else if (scale > MAXIMUM_SCALE) scale = MAXIMUM_SCALE;

    drawScaleText(scale);
    drawImage();
};

// Initialization......................................................

context.fillStyle = 'cornflowerblue';
context.strokeStyle = 'yellow';
context.shadowColor = 'rgba(50,50,50,1.0)';
context.shadowOffsetX = 5;
context.shadowOffsetY = 5;
context.shadowBlur = 10;

image.src = '../../images/29._art332022.jpg'
image.onload = function () {
    drawImage();
    drawScaleText(scaleSlider.value);
}

scaleCheckbox.onclick = function () {
    drawImage();
}