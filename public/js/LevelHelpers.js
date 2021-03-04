export function checkCollision(character, enemy, screen) {
    if (Math.round(enemy.pos.x + enemy.size.x) === Math.round(character.pos.x + enemy.size.x) && 
    Math.round(enemy.pos.y + enemy.size.y) === Math.round(character.pos.y + character.size.y)) {
        character.pos.set(64, 64);
        screen.position.set(0, 0);
        if (character.lives > 0) {
            character.lives = character.lives - 1;
        }
    }
}

export function checkWinBlock(xPos, yPos, character) {
    if (Math.floor(character.pos.x) == xPos && Math.floor(character.pos.y) == yPos) {
        return true;
    }
    return false;
}

export function updateUI(context, screen, player, time) {
    //time
    context.font = '8px Comic Sans MS';
    context.fillStyle = 'white';
    context.fillText(time, screen.size.x - 252, screen.size.y - 210);

    //lives
    context.font = '8px Comic Sans MS';
    context.fillStyle = 'white';
    context.fillText(player.lives + ' Lives', screen.size.x - 252, screen.size.y - 200);

    //points
    context.font = '8px Comic Sans MS';
    context.fillStyle = 'white';
    context.fillText(0 + ' points', screen.size.x - 252, screen.size.y - 190);
}

export function gameEnd(character, mins, seconds) {

    let gameData = {
        points: character.points,
        lives: character.lives,
        minutes: mins,
        seconds: seconds
    }

    //posting data to backend
    fetch('/game/post', {
        method: 'POST',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
            "content-type": "text/json"
        },
        body: JSON.stringify(gameData)
    }).then(function (response) {
        if (response.ok) {
            return gameData;
        }
        return Promise.reject(response);
    }).then(function (response) {
        console.log(response);
    }).catch(function (response) {
        console.log(response);
    })
}

export function lastPageRestart(context, character, time) {
    //top rect
    context.beginPath();
    context.rect(0, 0, 300, 40);
    context.fillStyle = '#7d7d7d';
    context.fillRect(80, 110, 100, 50);
    context.fill();
    context.closePath();
    context.font = '20px Comic Sans MS';
    context.fillStyle = 'white';
    context.fillText('Game Complete!', 55, 25);

    //bottom rect
    context.beginPath();
    context.rect(0, 200, 300, 40);
    context.fillStyle = '#7d7d7d';
    context.fillRect(80, 110, 100, 50);
    context.fill();
    context.closePath();

    context.font = '8px Comic Sans MS';
    context.fillStyle = 'white';
    context.fillText('Time: ' + time, 20, 225);

    context.font = '8px Comic Sans MS';
    context.fillStyle = 'white';
    context.fillText('Points: ' + character.points, 110, 225);

    context.font = '8px Comic Sans MS';
    context.fillStyle = 'white';
    context.fillText('Lives: ' + character.lives, 200, 225);

    //restart rect
    context.beginPath();
    context.rect(80, 110, 100, 50);
    context.fillStyle = '#7d7d7d';
    context.fillRect(80, 110, 100, 50);
    context.fill();
    context.closePath();
    context.font = '12px Comic Sans MS';
    context.fillStyle = 'white';
    context.fillText('Restart', 109, 139);

    //exit rect
    context.beginPath();
    context.rect(80, 50, 100, 50);
    context.fillStyle = '#b85c5c';
    context.fillRect(80, 50, 100, 50);
    context.fill();
    context.closePath();
    context.font = '12px Comic Sans MS';
    context.fillStyle = 'white';
    context.fillText('Exit', 118, 80);
}