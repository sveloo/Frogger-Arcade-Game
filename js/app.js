// This loads the Google font VT323 for use within Canvas
WebFontConfig = {
    google: {
        families: ['VT323']
    },
    active: function() {
        start();
    },
};

(function() {
    var wf = document.createElement("script");
    wf.src = 'https://fonts.googleapis.com/css?family=VT323';
    wf.async = 'true';
    document.head.appendChild(wf);
})();

// Basic character class

var Char = function(x, y){
    this.x = x;
    this.y = y;
}

Char.prototype.render = function() {
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemy class

var Enemy = function(x, y){
    Char.call(this, x, y); // add the keyword 'this' and optionally more arguments and objects here
    // add more properties here
    this.sprite = 'images/enemy-bug.png';
    this.speed = Math.floor(Math.random() * 250);
};

Enemy.prototype = Object.create(Char.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt; // this ensures the game runs at the same speed across different computers
    if (this.x > 505) { // if the enemy reaches the end of the screen area,
        this.x = 0; // this resets its position to the start point on the x-axis
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y); // Draws the enemy sprites
};





// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y){
    Char.call(this, x, y); // add the keyword 'this' and optionally more arguments and objects here
    // add more properties here
    this.sprite = 'images/char-boy.png'; // assigs the image file, remember to note the pixel dimensions
    this.score = 0; // sets the starting score to 0
    this.lives = 3; // gives the player 3 lives
};

Player.prototype = Object.create(Char.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function(dt) {
    // if the player reaches the end game y-axis point (-9), execute
    // game won function
    if (this.y <= -9) {
        this.gameWon();
    };
};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y); // Draws the player sprite
    // Draws the header text, scores and lives
    ctx.clearRect(1, 1, 505, 35);
    ctx.font = "3em VT323";
    ctx.fillStyle = "orange";
    ctx.textAlign = "left";
    ctx.fillText("Classic Arcade Game Clone", 1, 35);
    this.scoreBoard();
    this.livesLeft();
};


Player.prototype.scoreBoard = function() {
    ctx.clearRect(1, 590, 200, 50);
    ctx.font = "2.25em VT323";
    ctx.fillStyle = "yellow";
    ctx.textAlign = "left";
    ctx.fillText("Score: " + this.score, 1, 620);
};


Player.prototype.livesLeft = function() {
    ctx.clearRect(310, 590, 200, 50);
    ctx.font = "2.25em VT323";
    ctx.fillStyle = "red";
    ctx.textAlign = "left";
    ctx.fillText("Lives left: " + this.lives, 310, 620);
};


Player.prototype.handleInput = function(direction) {
    // Here we define the distance moved with each keypress diretion
    // We also check to see if the position is within the boundaries of the games x and y values
    // Note that the boundary values will change if you use a different image dimension
    if (direction === 'left' && this.x > 0) {
        this.x -= 101;
    }
    if (direction === 'right' && this.x < 400) {
        this.x += 101;
    }
    if (direction === 'up' && this.y > -9) {
        this.y -= 83;
    }
    if (direction === 'down' && this.y < 405) {
        this.y += 83;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// Here the Math.floor(Math.randon() * 505) assigns a random starting position for the enemies on the X axis.
// The Y values create the enemies on the correct Y axis values in line with the three rows in the graphics.
var allEnemies = [
    new Enemy((Math.floor(Math.random() * 505)), 60),
    new Enemy((Math.floor(Math.random() * 505)), 145),
    new Enemy((Math.floor(Math.random() * 505)), 230)
];

var player = new Player(200, 405);
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

// I obtained the exact image dimensions of the player and enemy graphics by examining the PNG files in Photoshop.
// I modelled the collision function from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
// following a tip from one of the Udacity instructors in the forums. It calculates the area of the PNG image (hence the need
// for the height and width) and uses that to calculate the area of the image. If you change the PNG files, you must remember
// to change the number values here too.
var checkCollisions = function() {
    for (var i = 0; i < 3; i++) {
        if (player.x < allEnemies[i].x + 90 && // number value is the width of the enemy image in pixels
            player.x + 67 > allEnemies[i].x && // number value is the width of the player image in pixels
            player.y < allEnemies[i].y + 65 && // number value is the height of the enemy image in pixels
            67 + player.y > allEnemies[i].y) { // number value is the height of the enemy image in pixels
            // collision detected!
            player.gameLose(); // Reset the game if a collision is detected.
        };
    };
};

Player.prototype.gameLose = function() {
    this.x = 200;
    this.y = 406;
    this.lives -= 1;
    this.scoreBoard();
    if (this.lives === 0) {
        alert("You've run outta lives mate. You DEAD!");
    }
};

Player.prototype.gameWon = function() {
    this.x = 200;
    this.y = 406;
    this.score += 100;
    this.scoreBoard();
};

Player.prototype.gameReset = function() {
    this.x = 200;
    this.y = 406;
    this.score = 0;
    this.lives = 9;
    this.scoreBoard();
};