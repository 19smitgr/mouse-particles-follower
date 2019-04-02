// MVP for Nerd Group lesson
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
        updatePosition() {
            console.log(this.velocity)
            this.x += this.velocity.x;
            this.y += this.velocity.y;
        }
    };

    return mouseParticle;
}

setInterval(function() {
    var velocity = getVelocity();

    if (particles.length > maxParticlesNum) {
        particles.splice(0, 1);
    }

    var mouseParticle = getMouseParticle(mouseCoords.new.x, mouseCoords.new.y, velocity);
    particles.push(mouseParticle);
}, timeInterval);

function graphicsLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < particles.length; i++) {
        var particle = particles[i];

        particle.updatePosition();
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 5, 0, Math.PI * 2);
        ctx.fill();

    }

    requestAnimationFrame(graphicsLoop);
}

graphicsLoop();