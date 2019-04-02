// MVP for lesson
var canvas = document.getElementById('mousetracker');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var mouseCoords = {
    old: {
        x: 0,
        y: 0
    },
    new: {
        x: 0,
        y: 0
    }
}

var timeInterval = 15;

var particles = [];
var maxParticlesNum = 50;

canvas.addEventListener('mousemove', function(e) {
    mouseCoords.new.x = e.clientX;
    mouseCoords.new.y = e.clientY;
});

function getVelocity() {
    var xVelocity = 5 * ((mouseCoords.new.x - mouseCoords.old.x) / timeInterval);
    var yVelocity = 5 * ((mouseCoords.new.y - mouseCoords.old.y) / timeInterval);
    
    mouseCoords.old.x = mouseCoords.new.x;
    mouseCoords.old.y = mouseCoords.new.y;
    
    var velocity = {
        x: xVelocity,
        y: yVelocity
    }

    return velocity;
}

function getMouseParticle(x, y, velocity) {
    var mouseParticle = {
        x: x, 
        y: y, 
        velocity: velocity,
        color: getRandColor(),
        updatePosition() {
            this.x += this.velocity.x;
            this.y += this.velocity.y;
        }
    };

    return mouseParticle;
}

// copied from https://stackoverflow.com/questions/23095637/how-do-you-get-random-rgb-in-javascript?lq=1
// too code golfed for my liking
function getRandColor() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ', .5)';
}

function getRandInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

setInterval(function() {
    var velocity = getVelocity();

    if (velocity.x == 0 && velocity.y == 0) {
        velocity.x = getRandInt(-6, 6);
        velocity.y = getRandInt(-6,6);
    }

    if (particles.length > maxParticlesNum) {
        particles.splice(0, 1);
    }

    var mouseParticle = getMouseParticle(mouseCoords.new.x, mouseCoords.new.y, velocity);
    particles.push(mouseParticle);
}, timeInterval);

function graphicsLoop() {
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "lighter";

    for (var i = 0; i < particles.length; i++) {
        var particle = particles[i];

        particle.updatePosition();
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

    }

    requestAnimationFrame(graphicsLoop);
}

graphicsLoop();