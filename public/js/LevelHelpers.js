
//checks if enemy and player are in same index in matrix
export function checkCollision(character, enemy, screen) {
    if (Math.round(enemy.pos.x/16) === Math.round(character.pos.x/16) && 
    Math.round(enemy.pos.y/16) === Math.round(character.pos.y/16)) {
        character.pos.set(64, 64);
        screen.position.set(0, 0);
        if (character.lives > 0) {
            character.lives = character.lives - 1;
        }
    }
}

//check collision of win block
export function checkWinBlock(xPos, yPos, character) {
    if (Math.floor(character.pos.x) == xPos && Math.floor(character.pos.y) == yPos) {
        return true;
    }
    return false;
}   

//draws UI components in the corner of the screen
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
    context.fillText(player.points + ' points', screen.size.x - 252, screen.size.y - 190);
}

//posts game data to backend one game completion. 
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
    }).catch(function (response) {
        console.log(response);
    })
}

//game completion screen
export function lastPageRestart(context, character, time, dead = false) {
    //top rect
    context.beginPath();
    context.rect(0, 0, 300, 40);
    context.fillStyle = '#7d7d7d';
    context.fillRect(80, 110, 100, 50);
    context.fill();
    context.closePath();
    context.font = '20px Comic Sans MS';
    context.fillStyle = 'white';
    if(dead === true){
        context.fillText('Game Over!', 75, 25);
    } else {
        context.fillText('Game Complete!', 55, 25);
    }

    //bottom rect
    context.beginPath();
    context.rect(0, 200, 300, 40);
    context.fillStyle = '#7d7d7d';
    context.fillRect(80, 110, 100, 50);
    context.fill();
    context.closePath();

    //time
    context.font = '8px Comic Sans MS';
    context.fillStyle = 'white';
    context.fillText('Time: ' + time, 20, 225);

    //points
    context.font = '8px Comic Sans MS';
    context.fillStyle = 'white';
    context.fillText('Points: ' + character.points, 110, 225);

    //lives
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