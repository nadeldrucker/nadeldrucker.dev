const TIMEOUT = 5000;

const COLORS = ['#1abc9c', '#2ecc71', '#3498db', 
        '#9b59b6', '#f1c40f', '#e67e22', '#e74c3c'];

// initialize body displayed and screensaver hidden
var div_screen = document.getElementById("div-screen");
var div_body = document.getElementById("div-body");
div_body.style.display = 'block'; 
div_screen.style.display = 'none';

var can = document.getElementById("screen");
can.width = window.innerWidth;
can.height = window.innerHeight;
var context = can.getContext('2d');

// Animation variables 
// ---
var x0 = 0;
var x = x0;

var y0 = 0;
var y = y0;

var sizex = 100;
var sizey = 50;

var speedx = 4;
var speedy = 4;

var c = 0;
// ---

var frame = null;
var timer = null;

timer = setTimeout(screensaver_start,TIMEOUT);
function screensaver_start() {
    clearTimeout(timer);
    clearInterval(timer);
    div_body.style.display = 'none';
    div_screen.style.display = 'block'; 

    can.width = window.innerWidth;
    can.height = window.innerHeight;

    // TODO choose random starting points x and y
    // at least sizex and sizey away from borders
    x = Math.floor(Math.random() * ((can.width - sizex) - (x0 + sizex)) + (x0+ sizex));
    x = Math.floor(Math.random() * ((can.height - sizey) - (y0 + sizey)) + (y0 + sizey));

    animate();
}

function screensaver_stop() {
    div_body.style.display = 'block'; 
    div_screen.style.display = 'none';

    window.cancelAnimationFrame(frame);
    speedx = 4;
    speedy = 4;

    clearInterval(timer);
    // TODO bug when using touhscreen: called multiple times
    timer = setInterval(screensaver_start,TIMEOUT);
}


// TODO only animate when animation on
function animate() {
    frame = window.requestAnimationFrame(animate);
    x += speedx;
    y += speedy;
    var c1 = x <= x0 || x + sizex >= can.width;
    var c2 = y <= y0 || y + sizey >= can.height;
    if(c1 && c2){
        // change both movement directions and color once
        speedx = -speedx;
        speedy = -speedy;
        c = (c + 1) % COLORS.length;
    } else {
        if (c1) {
            // change movement direction and color
            speedx = -speedx;
            c = (c + 1) % COLORS.length;
        }		
        if (c2) {
            // change movement direction and color
            speedy = -speedy;
            c = (c + 1) % COLORS.length;
        }
    }
    draw();
}

// draw rectangle in position x,y
function draw() {
    context.clearRect(0, 0, can.width, can.height);
    context.fillStyle = COLORS[c];
    context.fillRect(x, y, sizex, sizey);
}

// end animation when window is resized
window.addEventListener("resize", screensaver_stop);

// end animation when window is clicked
window.addEventListener("click", screensaver_stop);

// end animation when window is touched on touchscreen
window.addEventListener("touchstart", screensaver_stop);

// end animation when mouse moved
window.addEventListener("mousemove", screensaver_stop);