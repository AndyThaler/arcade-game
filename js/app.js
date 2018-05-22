var score = 0;
var hscore = 0;
var gemscore = 0;
var hgemscore = 0;
//A star indicating a complete walk through the game
var Stars = function(x,y) {
  this.x = x;
  this.y = y;
  this.sprite = 'images/Star.png';
}
//render method
Stars.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
//Gems for the player to collect
var Gems = function (x,y) {
  this.x = x;
  this.y = y;
  this.sprite = 'images/Gem_Orange.png' ;
}

//render method
Gems.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
// Enemies our player must avoid
var Enemy = function(move, x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.move = move;
    this.x = x;
    this.y = y;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.move * dt;

    //looping the enemies back to the start, when they reach the right corner
    if (this.x > 505) {
        this.x = -100;
        this.move = Math.floor((Math.random() * 401)) + 300;
}
  //Collision-Detection with tolerance
    if (player.x < this.x + 40 &&
        player.x + 30 > this.x &&
        player.y < this.y + 30 &&
        35 + player.y > this.y) {
          player.x = 200;
          player.y = 380;
          //Changing the score accordingly to the Collision
          if (score > hscore) {
          document.querySelector('.hscore').innerText = score + " / " + hgemscore;;
          hscore = score;
          }
          if (gemscore > hgemscore) {
          document.querySelector('.hscore').innerText = score + " / " + gemscore;;
          hgemscore = gemscore;
          }
          score = 0;
          gemscore = 0;
          document.querySelector('.score').innerText = score;
          document.querySelector('.gems').innerText = gemscore;
        }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (move, x, y) {
  this.move = move;
  this.x = x;
  this.y = y;
  // The image/sprite for our player
  this.sprite = 'images/char-horn-girl.png';
}

Player.prototype.update = function() {
  //limiting the player to the game field
  if(this.y > 380) {
    this.y = 380;
  }
  //Reset Player-pos when reaching water
  if(this.y < 0) {
    this.y = 380;
    this.x = 200;
    //Updating the score
    score += 1;
    document.querySelector('.score').innerText = score;
    //Showing star
    star = new Stars(200, 0);
    gem = new Gems(Math.floor((Math.random() * 301)), Math.floor((Math.random() * 301)+100));
  }
  if(this.x > 400) {
    this.x = 400;
  }
  if(this.x < 0) {
    this.x = 0;
  }

//collision detection for a gem
if (this.x < gem.x + 60 &&
    this.x + 60 > gem.x &&
    this.y < gem.y + 60 &&
    60 + player.y > gem.y)
    {
      //Deleting the old gem and adding the score
      gemscore += 1;
      document.querySelector('.gems').innerText = gemscore;
      gem = new Gems(-200,-200);
    }
}

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(pressedKey) {
  //Reset Star
  star = new Stars(-200, -200);
  if (pressedKey == 'left') player.x -= (player.move +15);
  if (pressedKey == 'right') player.x += (player.move +15);
  if (pressedKey == 'up') player.y -= player.move;
  if (pressedKey == 'down') player.y += player.move;
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// Place the gems object in a variable called gem
// Place the stars object in a variable called star
var allEnemies = [];
var spawnLines = [50, 130, 220];

spawnLines.forEach(function(y) {
  var enemy = new Enemy(Math.floor((Math.random() * 401)) + 300, 0, y);
  allEnemies.push(enemy);
})
var gem = new Gems(Math.floor((Math.random() * 301)), Math.floor((Math.random() * 301)+100));
var player = new Player(85, 200, 380);
var star = new Stars(-200, -200);

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
