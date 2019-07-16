// initialize body displayed and screensaver hidden
var div_screen = document.getElementById("div-screen");
var div_body = document.getElementById("div-body");
div_body.style.display = 'block'; 
div_screen.style.display = 'none';

var can = document.getElementById("screen");
var context = can.getContext('2d');
can.width = window.innerWidth;
can.height = window.innerHeight;

// Animation variables 
// ---
var x0 = 0;
var x = x0;

var y0 = 0;
var y = y0;

var sizex = 100;
var sizey = 50;

var speedx = 3;
var speedy = 3;

var colors =['red', 'green', 'blue'];
var c = 0;
// ---

setTimeout(screensaver_start,5000);
function screensaver_start() {
    div_body.style.display = 'none';
    div_screen.style.display = 'block'; 

    can.width = window.innerWidth;
    can.height = window.innerHeight;

    animate();
}


function screensaver_stop() {
    div_body.style.display = 'block'; 
    div_screen.style.display = 'none';
}



// TODO only animate when animation on
function animate() {
    requestAnimationFrame(animate);
    x += speedx;
    y += speedy;
    if (x <= x0 || x + sizex >= can.width) {
        // change movement direction and color
        speedx = -speedx;
        c = (c + 1) % 3;
    }		
    if (y <= y0 || y + sizey >= can.height) {
        // change movement direction and color
        speedy = -speedy;
        c = (c + 1) % 3;
    }
    draw();
}

// draw rectangle in position x,y
function draw() {
    context.clearRect(0, 0, can.width, can.height);
    context.fillStyle = colors[c];
    context.fillRect(x, y, sizex, sizey);
}

// TODO implement differently (animation start and w/ random start)
//document.addEventListener("DOMContentLoaded", animate);

// end animation when window is resized
window.addEventListener("resize", screensaver_stop);

// end animation when window is clicked
window.addEventListener("click", screensaver_stop);

// end animation when window is touched on touchscreen
window.addEventListener("touchstart", screensaver_stop);