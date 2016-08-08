#FEND: Classic Arcade Game Clone#

##Installation Instructions##
Clone the game from my repository into your local machine.

##Starting the game##
To play the game, open index.html in your browser.

##Playing the game##
The game works with the direction keys on your keyboard. It's pretty straightforward. You got to get the player from the green grass to the river and avoid all the bugs in the process. You have three lives!

##Making your own customizations##
You can make customizations in the game by editing the app.js file. This is the only file you will need to edit. Some of the things you can do include:

###1. Increasing the speed of the bugs###

`
var Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // assigns a random speed of movement to the Enemy
    this.speed = Math.floor(Math.random() * 250);
};
`
You can make the bugs faster or slower by changing the * 250 value in the Enemy function to whatever you like.

