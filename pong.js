const canvas = document.getElementById('pongCanvas');
const context = canvas.getContext('2d');

const gameSettings = {
    isSinglePlayer: false,
    difficulty: 'normal'
};

let ballSpeed = 5;
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 20,
    speed: ballSpeed,
    velocityX: 5,
    velocityY: 5,
    color: 'red'
};

const player1 = {
    x: 50,
    y: canvas.height / 2 - 50,
    width: 20,
    height: 100,
    color: 'blue',
    score: 0
};

const player2 = {
    x: canvas.width - 70,
    y: canvas.height / 2 - 50,
    width: 20,
    height: 100,
    color: 'blue',
    score: 0
};

function drawRect(x, y, w, h, color) {
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
}

function drawText(text, x, y) {
    context.fillStyle = 'black';
    context.font = '45px Arial';
    context.fillText(text, x, y);
}

function render() {
    drawRect(0, 0, canvas.width, canvas.height, 'white');
    drawRect(canvas.width / 2 - 2, 0, 4, canvas.height, 'black');
    drawRect(0, 0, canvas.width, 4, 'red');
    drawRect(0, canvas.height - 4, canvas.width, 4, 'red');
    drawText(player1.score, canvas.width / 4, canvas.height / 5);
    drawText(player2.score, 3 * canvas.width / 4, canvas.height / 5);
    drawRect(player1.x, player1.y, player1.width, player1.height, player1.color);
    drawRect(player2.x, player2.y, player2.width, player2.height, player2.color);
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
}

function update() {
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.velocityY = -ball.velocityY;
    }

    let player = (ball.x < canvas.width / 2) ? player1 : player2;

    if (collision(ball, player)) {
        let collidePoint = ball.y - (player.y + player.height / 2);
        collidePoint = collidePoint / (player.height / 2);
        let angleRad = collidePoint * Math.PI / 4;
        let direction = (ball.x < canvas.width / 2) ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);
        ball.speed += 0.1;
    }

    if (ball.x - ball.radius < 0) {
        player2.score++;
        resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
        player1.score++;
        resetBall();
    }

    if (gameSettings.isSinglePlayer) {
        // AI Movement
        let targetY = ball.y - player2.height / 2;
        player2.y += (targetY - player2.y) * 0.1;
    }
}

function collision(b, p) {
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    return b.right > p.left && b.bottom > p.top && b.left < p.right && b.top < p.bottom;
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speed = ballSpeed;
    ball.velocityX = -ball.velocityX;
}

canvas.addEventListener('touchmove', (evt) => {
    const rect = canvas.getBoundingClientRect();
    const touch = evt.touches[0];
    const touchX = touch.clientX - rect.left;
    const touchY = touch.clientY - rect.top;

    if (touchX < canvas.width / 2) {
        player1.y = touchY - player1.height / 2;
    } else {
        player2.y = touchY - player2.height / 2;
    }
});

function gameLoop() {
    setInterval(() => {
        update();
        render();
    }, 1000 / 50);
}
