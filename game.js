<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Escape the Evil Bakery</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="navbar">
        <a href="index.html">Home</a>
        <a href="menu.html">Menu</a>
        <a href="gallery.html">Gallery</a>
        <a href="contact.html">Contact</a>
        <a href="game.html" class="active">Game</a>
    </div>

    <h1>🕹️ Escape the Evil Bakery!</h1>
    <canvas id="gameCanvas"></canvas>

    <script>
        const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");

        canvas.width = 800;
        canvas.height = 400;

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

        const enemies = [
            { x: 600, y: 320, width: 50, height: 50, speed: 2, alive: true }
        ];

        const keys = {};
        document.addEventListener("keydown", (e) => { keys[e.code] = true; });
        document.addEventListener("keyup", (e) => { keys[e.code] = false; });

        function update() {
            if (keys["ArrowRight"]) player.dx = player.speed;
            else if (keys["ArrowLeft"]) player.dx = -player.speed;
            else player.dx = 0;

            if (keys["Space"] && player.onGround) {
                player.dy = player.jumpPower;
                player.onGround = false;
            }

            if (keys["KeyX"]) {
                enemies.forEach(enemy => {
                    if (
                        enemy.alive &&
                        player.x + player.width > enemy.x &&
                        player.x < enemy.x + enemy.width &&
                        player.y + player.height > enemy.y &&
                        player.y < enemy.y + enemy.height
                    ) {
                        enemy.alive = false;
                    }
                });
            }

            player.dy += player.gravity;
            player.y += player.dy;
            player.x += player.dx;

            if (player.y > 300) {
                player.y = 300;
                player.dy = 0;
                player.onGround = true;
            }

            enemies.forEach(enemy => {
                if (enemy.alive) {
                    enemy.x -= enemy.speed;
                    if (enemy.x < -50) enemy.x = canvas.width + Math.random() * 300;
                }
            });

            requestAnimationFrame(update);
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "blue";
            ctx.fillRect(player.x, player.y, player.width, player.height);

            enemies.forEach(enemy => {
                if (enemy.alive) {
                    ctx.fillStyle = "red";
                    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
                }
            });

            requestAnimationFrame(draw);
        }

        update();
        draw();
    </script>

    <div class="container">
        <h2>🕹️ How to Play Escape the Evil Bakery</h2>
        <p>Help the <strong>Baker Hero</strong> escape the evil bakery by fighting off the living cupcakes! Here’s how to play:</p>
        <ul>
            <li>➡️ Move Right: <strong>Arrow Right</strong></li>
            <li>⬅️ Move Left: <strong>Arrow Left</strong></li>
            <li>🔼 Jump: <strong>Spacebar</strong></li>
            <li>🎯 Attack Enemies: <strong>Press X</strong> (Destroys cupcakes on contact)</li>
            <li>🏆 Goal: Defeat the evil cupcakes and reach the exit!</li>
        </ul>
    </div>
</body>
</html>