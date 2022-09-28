// Enemies our player must avoid
var Enemy = function (row, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.row = row;
    this.x = 0;
    this.col = 0;
    this.y = this.row * 83;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 606) {
        this.x = 0;
    }
    else {
        switch (this.speed) {
            case 'slow':
                this.x += dt * 50;
                break;
            case 'faster':
                this.x += dt * 100;
                break;
            case 'fastest':
                this.x += dt * 200;
                break;
            default:
                break;
        }
    }
    this.col = Math.round(this.x / 101);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.row = 5;
    this.col = 2;
};

Player.prototype.update = function (dt) {

};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.col * 101, this.row * 83);
}

Player.prototype.reset = function () {
    this.col = 2;
    this.row = 5;
}

Player.prototype.handleInput = function (direction) {
    switch (direction) {
        case 'left':
            //test if can move left
            if (this.col > 0) {
                this.col--;
            }
            break;
        case 'up':
            //test if can move up
            //player cannot move into the water
            if (this.row > 1) {
                this.row--;
            }
            break;
        case 'right':
            //test if can move right
            if (this.col < 4) {
                this.col++;
            }
            break;
        case 'down':
            //test if can move down
            if (this.row < 5) {
                this.row++;
            }
            break;
        default:
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(1, 'slow'), new Enemy(2, 'faster'), new Enemy(3, 'fastest')];
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
