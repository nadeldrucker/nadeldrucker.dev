// initialize body displayed and screensaver hidden
var div_screen = document.getElementById("div-screen");
var div_body = document.getElementById("div-body");
div_body.style.display = 'block'; 
div_screen.style.display = 'none';

var can = document.getElementById("screen");


setTimeout(hide_body,5000);
function hide_body() {
    div_body.style.display = 'none';
    div_screen.style.display = 'block'; 

    can.width = window.innerWidth;
    can.height = window.innerHeight;
}


function show_body() {
    div_body.style.display = 'block'; 
    div_screen.style.display = 'none';
}

'use strict';
(function () {
    var context = can.getContext('2d');
    can.width = window.innerWidth;
    can.height = window.innerHeight;

    var x0 = 0;
    var x1 = can.width;
    var x = x0;

    var y0 = 0;
    var y1 = can.height;
    var y = y0;
    
    var sizex = 100;
    var sizey = 50;

    var speedx = 3;
    var speedy = 3;
    
    var colors =['red', 'green', 'blue'];
    var c = 0;

	function animate() {
		requestAnimationFrame(animate);
        x += speedx;
        y += speedy;
		if (x <= x0 || x + sizex >= x1) {
            speedx = -speedx;
            c = (c + 1) % 3;
        }		
        if (y <= y0 || y + sizey >= y1) {
			speedy = -speedy;
            c = (c + 1) % 3;
		}
		draw();
	}

	function draw() {
		context.clearRect(0, 0, x1, y1);
		context.fillStyle = colors[c];
		context.fillRect(x, y, sizex, sizey);
	}
	document.addEventListener("DOMContentLoaded", function () {
		animate();
    });
    
    // end animation when window is resized
    window.addEventListener("resize", show_body);

}());