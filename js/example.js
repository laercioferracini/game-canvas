
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
context.font = '38pt Arial';
context.fillStyle = 'cornflowerblue';
context.strokeStyle = 'blue';

var w = canvas.width;
var h = canvas.height;

context.fillText("Game canvas!", w / 2 - 150, h / 2 + 15, w)
context.strokeText("Game canvas!", w / 2 - 150, h / 2 + 15, w);