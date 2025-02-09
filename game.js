const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

// Load images
const playerImg = new Image();
playerImg.src = "img/player.png"; // Your character
const enemyImg = new Image();
enemyImg.src = "img/cupcake_enemy.png"; // Enemy cupcake
const backgroundImg = new Image();
backgroundImg.src = "img/bakery_background.png"; // Evil bakery background

// Player object
const player = {
    x: 50,
    y: 300,
    width: 50,
    height: 50,
    speed: 5,
    dx: 0,
    dy: 0,
    jumpPower: -12,
    gravity: 0.6,
    onGround: false
};

// Enemy Cupcake
const enemies = [
    { x: 600, y: 320, width: 50, height: 50, speed: 2 }
];

// Key controls
const keys = {};

// Handle key events
document.addEventListener("keydown", (e) => {
    keys[e.code] = true;
});

document.addEventListener("keyup", (e) => {
    keys[e.code] = false;
});

// Update game state
function update() {
    // Movement
    if (keys["ArrowRight"]) player.dx = player.speed;
    else if (keys["ArrowLeft"]) player.dx = -player.speed;
    else player.dx = 0;

    // Jumping
    if (keys["Space"] && player.onGround) {
        player.dy = player.jumpPower;
        player.onGround = false;
    }

    // Apply gravity
    player.dy += player.gravity;
    player.y += player.dy;
    player.x += player.dx;

    // Ground collision
    if (player.y > 300) {
        player.y = 300;
        player.dy = 0;
        player.onGround = true;
    }

    // Move enemies
    enemies.forEach(enemy => {
        enemy.x -= enemy.speed;
        if (enemy.x < -50) enemy.x = canvas.width + Math.random() * 300;
    });

    requestAnimationFrame(update);
}

// Draw everything
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);

    // Draw player
    ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);

    // Draw enemies
    enemies.forEach(enemy => {
        ctx.drawImage(enemyImg, enemy.x, enemy.y, enemy.width, enemy.height);
    });

    requestAnimationFrame(draw);
}

// Start the game loop
update();
draw();
