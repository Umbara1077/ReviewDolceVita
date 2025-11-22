const canvas = document.getElementById("snow-canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let snowflakes = [];

function createSnowflakes() {
    snowflakes = [];

    for (let i = 0; i < 150; i++) {
        const isFlag = Math.random() < 0.08; // about 8% flags

        snowflakes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 3 + 1,
            speed: Math.random() * 1 + 0.5,
            drift: Math.random() * 1 - 0.5,
            flag: isFlag
        });
    }
}

function drawItalianFlag(x, y) {
    const width = 16;
    const height = 10;

    // green
    ctx.fillStyle = "#009246";
    ctx.fillRect(x, y, width / 3, height);

    // white
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(x + width / 3, y, width / 3, height);

    // red
    ctx.fillStyle = "#ce2b37";
    ctx.fillRect(x + 2 * (width / 3), y, width / 3, height);
}

function drawSnowflakes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snowflakes.forEach(flake => {
        flake.y += flake.speed;
        flake.x += flake.drift;

        if (flake.y > canvas.height) flake.y = 0;
        if (flake.x > canvas.width) flake.x = 0;
        if (flake.x < 0) flake.x = canvas.width;

        if (flake.flag) {
            drawItalianFlag(flake.x, flake.y);
        } else {
            ctx.beginPath();
            ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
            ctx.fillStyle = "white";
            ctx.fill();
        }
    });

    requestAnimationFrame(drawSnowflakes);
}

createSnowflakes();
drawSnowflakes();
