var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MpPong;
(function (MpPong) {
    var Client;
    (function (Client) {
        var GameEngine = (function (_super) {
            __extends(GameEngine, _super);
            function GameEngine() {
                var _this = _super.call(this, 900, 700, Phaser.CANVAS, 'content', null) || this;
                _this.state.add('Boot', Client.Boot, false);
                _this.state.add('Preloader', Client.Preloader, false);
                _this.state.add('MainMenu', Client.MainMenu, false);
                _this.state.add('Level01', Client.Level01, false);
                _this.state.add('Level02', Client.Level02, false);
                _this.state.add('Win', Client.Win, false);
                _this.state.add('Lose', Client.Lose, false);
                //Adds our various states and starts our initial boot. This is where we would add more levels or 
                //potentially declare some different ones. Sort of like a Header file in other languages
                _this.state.start('Boot');
                return _this;
            }
            return GameEngine;
        }(Phaser.Game));
        Client.GameEngine = GameEngine;
    })(Client = MpPong.Client || (MpPong.Client = {}));
})(MpPong || (MpPong = {}));
window.onload = function () {
    //No idea what this is, doing something with the game itself on load
    new MpPong.Client.GameEngine();
    var scheme = window.location.protocol == "https:" ? "wss" : "ws";
    var port = window.location.port ? (":" + document.location.port) : "";
    console.log(scheme + "://" + window.location.hostname + port + "/ws");
};
var MpPong;
(function (MpPong) {
    var Client;
    (function (Client) {
        var Ball = (function (_super) {
            __extends(Ball, _super);
            function Ball(game, x, y, xVelocity, yVelocity) {
                var _this = _super.call(this, game, x, y, 'ball', 1) || this;
                _this.anchor.setTo(0.5);
                game.add.existing(_this);
                // Physics
                game.physics.enable(_this);
                _this.body.collideWorldBounds = true;
                // This setting is what has the ball maintaining velocity when bouncing.
                _this.body.bounce.set(1);
                //Have to set a initial velocity to ensure the ball bounces off the top and bottom and
                //the player paddles and doesn't stay in its spawn area
                _this.body.maxVelocity = 525;
                _this.body.velocity.x = xVelocity;
                _this.body.velocity.y = yVelocity;
                return _this;
            }
            return Ball;
        }(Phaser.Sprite));
        Client.Ball = Ball;
    })(Client = MpPong.Client || (MpPong.Client = {}));
})(MpPong || (MpPong = {}));
var MpPong;
(function (MpPong) {
    var Client;
    (function (Client) {
        var DoublePtsPowerup = (function (_super) {
            __extends(DoublePtsPowerup, _super);
            function DoublePtsPowerup(game, x, y, xVelocity, yVelocity) {
                var _this = _super.call(this, game, x, y, 'doublePts', 1) || this;
                _this.anchor.setTo(0.5);
                game.add.existing(_this);
                // Physics
                game.physics.enable(_this);
                _this.body.collideWorldBounds = true;
                // This setting is what has the powerup maintaining velocity when bouncing.
                _this.body.bounce.set(1);
                _this.scale.setTo(0.35);
                //Have to set a initial velocity to ensure the ball bounces off the top and bottom and
                //the player paddles and doesn't stay in its spawn area
                _this.body.velocity.x = xVelocity;
                _this.body.velocity.y = yVelocity;
                return _this;
            }
            return DoublePtsPowerup;
        }(Phaser.Sprite));
        Client.DoublePtsPowerup = DoublePtsPowerup;
    })(Client = MpPong.Client || (MpPong.Client = {}));
})(MpPong || (MpPong = {}));
var MpPong;
(function (MpPong) {
    var Client;
    (function (Client) {
        var LBound = (function (_super) {
            __extends(LBound, _super);
            function LBound(game, x, y) {
                var _this = 
                //Sets up a 1 px long left boundary behind player
                _super.call(this, game, x, y, 'lBound', 1) || this;
                _this.anchor.setTo(0.5);
                game.add.existing(_this);
                // Physics
                game.physics.enable(_this);
                _this.body.immovable = true;
                return _this;
            }
            return LBound;
        }(Phaser.Sprite));
        Client.LBound = LBound;
    })(Client = MpPong.Client || (MpPong.Client = {}));
})(MpPong || (MpPong = {}));
var MpPong;
(function (MpPong) {
    var Client;
    (function (Client) {
        var PaddleAi = (function (_super) {
            __extends(PaddleAi, _super);
            function PaddleAi(game, x, y) {
                var _this = _super.call(this, game, x, y, 'paddleAi', 1) || this;
                _this.anchor.setTo(0.5);
                game.add.existing(_this);
                // Physics
                game.physics.enable(_this);
                _this.body.collideWorldBounds = true;
                _this.body.immovable = true;
                _this.body.allowGravity = false; //Forget Einsten and his theories on gravity
                return _this;
            }
            return PaddleAi;
        }(Phaser.Sprite));
        Client.PaddleAi = PaddleAi;
    })(Client = MpPong.Client || (MpPong.Client = {}));
})(MpPong || (MpPong = {}));
var MpPong;
(function (MpPong) {
    var Client;
    (function (Client) {
        var Player = (function (_super) {
            __extends(Player, _super);
            function Player(game, x, y) {
                var _this = _super.call(this, game, x, y, 'player1', 1) || this;
                _this.anchor.setTo(0.5);
                game.add.existing(_this);
                // Physics
                game.physics.enable(_this);
                _this.body.collideWorldBounds = true;
                _this.body.immovable = true;
                //Unsure of where to do this but need to seperate players so they can be controlled 
                //by each player whom joins the game
                _this.mouseUse = new Client.Mouse(_this.game, _this.game.width - 50, _this.game.height - 50);
                return _this;
            }
            Player.prototype.update = function () {
                //Player y movement setup here. The 0 assignment outside the if and else ensures the player
                //doesn't continue to move if no keys are pressed/there is no drag effect
                this.body.velocity.y = 0;
                if (!this.mouseUse.mouseUse) {
                    if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                        this.body.velocity.y = -800;
                    }
                    else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
                        this.body.velocity.y = 800;
                    }
                }
                else {
                    //Setup for mouse control. Currently breaks keyboard movesment but it checks the y position of paddle to the
                    //y position of the mouse cursor and attempts to then change the paddles y to match mouse.y
                    if (this.y > this.game.input.activePointer.worldY || this.y < this.game.input.activePointer.worldY) {
                        this.y = (this.game.input.activePointer.clientY - 57); //Want to do this to get the center of the player paddle);
                    }
                }
            };
            return Player;
        }(Phaser.Sprite));
        Client.Player = Player;
    })(Client = MpPong.Client || (MpPong.Client = {}));
})(MpPong || (MpPong = {}));
var MpPong;
(function (MpPong) {
    var Client;
    (function (Client) {
        var RBound = (function (_super) {
            __extends(RBound, _super);
            function RBound(game, x, y) {
                var _this = _super.call(this, game, x, y, 'rBound', 1) || this;
                _this.anchor.setTo(0.5);
                game.add.existing(_this);
                // Physics
                game.physics.enable(_this);
                _this.body.immovable = true;
                return _this;
            }
            return RBound;
        }(Phaser.Sprite));
        Client.RBound = RBound;
    })(Client = MpPong.Client || (MpPong.Client = {}));
})(MpPong || (MpPong = {}));
var MpPong;
(function (MpPong) {
    var Client;
    (function (Client) {
        var Boot = (function (_super) {
            __extends(Boot, _super);
            function Boot() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Boot.prototype.preload = function () {
                //You can preload an image here if you dont want to use text for the loading screen
            };
            Boot.prototype.create = function () {
                //Sets background color below Could maybe cycle this 
                this.stage.backgroundColor = '#298AB4';
                this.input.maxPointers = 1; //Not sure if we need to change this with the MP aspect?
                this.stage.disableVisibilityChange = true;
                if (this.game.device.desktop) {
                    this.scale.pageAlignHorizontally = true;
                }
                else {
                    // mobile
                    //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                    this.scale.minWidth = 480;
                    this.scale.minHeight = 260;
                    this.scale.maxWidth = 1024;
                    this.scale.maxHeight = 768;
                    this.scale.forceLandscape = true;
                    this.scale.pageAlignHorizontally = true;
                    this.scale.refresh();
                }
                //Passes to the preloader state after initial booting is completed
                this.game.state.start('Preloader', true, false);
            };
            return Boot;
        }(Phaser.State));
        Client.Boot = Boot;
    })(Client = MpPong.Client || (MpPong.Client = {}));
})(MpPong || (MpPong = {}));
var MpPong;
(function (MpPong) {
    var Client;
    (function (Client) {
        var Level01 = (function (_super) {
            __extends(Level01, _super);
            function Level01() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.doublePowerupFlag = false;
                _this.i = 0;
                _this.powerupAliveCounter = 0;
                _this.p1Score = 0;
                _this.p2Score = 0; // Not sure WHY we can do object literal and regular assignment Sets properties on current level object?
                _this.streak = [];
                _this.scoreToWin = 11;
                _this.xVelocity = 600;
                _this.yVelocity = 600;
                // Number of ticks for game countdown
                // remember to also change value in 
                // startCountdown()
                _this.countdownAmount = 3;
                return _this;
            }
            Level01.prototype.create = function () {
                //Makes cursor invisible Tweaked in the button ui classes so that it reappears for a bit. Could also do a custom cursor
                this.game.canvas.style.cursor = "none";
                this.stage.alpha = 1;
                this.physics.startSystem(Phaser.Physics.ARCADE); //Starts physics system for game and begins creating our player and ball objects
                this.player = new Client.Player(this.game, this.world.centerX - 500, this.world.centerX);
                this.ai = new Client.PaddleAi(this.game, this.world.centerX + 475, this.world.centerX);
                this.lBound = new Client.LBound(this.game, (this.world.centerX - this.world.centerX), this.world.centerX);
                this.rBound = new Client.RBound(this.game, (this.world.centerX + this.world.centerX), this.world.centerX);
                //Creates and position player scores /* UI BELOW HERE */
                this.p1ScoreText = this.add.text((this.world.centerX - (this.world.centerX - 150)), this.world.centerX - 450, 'P1 Score: 0', { fontSize: '32px', fill: '#000' });
                this.p2ScoreText = this.add.text((this.world.centerX + (this.world.centerX - 350)), this.world.centerX - 450, 'P2 Score: 0', { fontSize: '32px', fill: '#000' });
                this.quit = new Client.Quit(this.game, this.world.centerX, this.world.centerY + (this.world.centerY - 50));
                this.pause = new Client.Pause(this.game, this.world.centerX + 85, this.world.centerY + (this.world.centerY - 50));
                this.full = new Client.Full(this.game, this.world.centerX - 90, this.world.centerY + (this.world.centerY - 50));
                // Call reset ball to start a new server
                this.resetBall(2);
                this.time.events.add(Phaser.Timer.SECOND * 50, this.createPowerUp, this);
            };
            Level01.prototype.createBall = function () {
                //Self explanatory
                this.ball = new Client.Ball(this.game, this.world.centerX, this.world.centerX, this.xVelocity, this.yVelocity);
            };
            Level01.prototype.createPowerUp = function () {
                this.doublePtsPowerup = new Client.DoublePtsPowerup(this.game, this.world.centerX - 100, this.world.centerX, this.xVelocity, this.yVelocity);
                this.powerupAliveCounter = 1;
            };
            Level01.prototype.resetPowerUp = function () {
                if (this.doublePtsPowerup) {
                    this.doublePtsPowerup.kill();
                    this.powerupAliveCounter = 0;
                }
            };
            Level01.prototype.resetBall = function (score) {
                //Kills previous ball if it exists freeing up memory
                //And resets game
                if (this.ball) {
                    this.ball.kill();
                    this.streak = [];
                }
                this.countdownText = this.add.text(this.world.centerX, this.world.centerY, "", { fontSize: '200px', fill: '#FFF' });
                this.countdownText.anchor.setTo(0.5, 0.5);
                // Math.floor(Math.random() * (max - min)) + min;
                // In this case, min = 300, max = 500.
                if (score === 1) {
                    // Player 1 scored on player 2 so
                    // launch the ball towards player 1 as if
                    // player 2 is serving.
                    this.xVelocity = Math.floor(Math.random() * (500 - 300)) + (300);
                    // Invert the X axis so that it actually launches towards player 1.
                    this.xVelocity = this.xVelocity * (-1);
                    this.yVelocity = Math.floor(Math.random() * (500 - 300)) + (300);
                }
                else {
                    // If game is fresh, nobody scored but ALSO
                    // if Player 2 scored on player 1;
                    // launch the ball towards player 2 as if
                    // player 1 is serving.
                    this.xVelocity = Math.floor(Math.random() * (500 - 300)) + (300);
                    this.yVelocity = Math.floor(Math.random() * (500 - 300)) + (300);
                }
                // The yVelocity currently only shoots on the bottom half of the screen
                // Let's give it a chance to be either a positive or negative shot along the y-coordinate!
                // Initialize a variable to a random number with the possibilities of 1-10
                var yCoordinateInversion = Math.floor(Math.random() * (10 - 1)) + 1;
                // If the random number is 6 or higher, invert it!
                // Else not required but; Else - leave it how it is!
                if (yCoordinateInversion >= 6) {
                    this.yVelocity = this.yVelocity * (-1);
                }
                // Function that calls the ball with our new velocities for it
                this.startCountdown();
            };
            Level01.prototype.startCountdown = function () {
                // store context for setInterval
                var _this = this;
                // store setInterval to end loop
                var loop = setInterval(function () {
                    if (_this.countdownAmount != 0) {
                        _this.countdownText.text = _this.countdownAmount.toString();
                        _this.countdownText.stroke = "#000";
                        _this.countdownText.strokeThickness = .5;
                        if (_this.countdownAmount == 3) {
                            _this.countdownText.addColor('red', 0);
                        }
                        else if (_this.countdownAmount == 2) {
                            _this.countdownText.addColor('yellow', 0);
                        }
                        else if (_this.countdownAmount == 1) {
                            _this.countdownText.addColor('green', 0);
                        }
                        _this.countdownAmount -= 1;
                    }
                    else {
                        _this.createBall();
                        // Reset tick amount
                        _this.countdownAmount = 3;
                        _this.countdownText.destroy();
                        // clear stored setInterval
                        clearInterval(loop);
                    }
                    //Set a timer for 1050 milliseconds
                }, Phaser.Timer.SECOND * 1.05);
            };
            Level01.prototype.addStreak = function (ball) {
                if (ball) {
                    if (this.ball.body.velocity) {
                        this.streak.unshift(new Client.Ball(this.game, this.ball.x, this.ball.y, this.xVelocity, this.yVelocity));
                        if (this.streak.length > 3) {
                            var dump = this.streak.pop();
                            dump.destroy();
                        }
                    }
                    else {
                        this.streak = [];
                        return false;
                    }
                }
                return false;
            };
            Level01.prototype.lBoundHit = function () {
                //Increments and then updates player score on the fly
                if (!this.doublePowerupFlag) {
                    this.p2Score += 1;
                }
                else {
                    this.p2Score += 2;
                }
                this.p2ScoreText.text = 'P2 Score: ' + this.p2Score;
                // If player 2 scores, send player 2 to function resetBall
                this.resetBall(2);
            };
            Level01.prototype.rBoundHit = function () {
                if (!this.doublePowerupFlag) {
                    this.p1Score += 1;
                }
                else {
                    this.p1Score += 2;
                }
                this.p1ScoreText.text = 'P1 Score: ' + this.p1Score;
                // If player 1 scores, send player 1 to function resetBall
                this.resetBall(1);
            };
            Level01.prototype.dieRoll = function () {
                return Math.floor(Math.random() * 100);
            };
            Level01.prototype.doublePoints = function () {
                this.i = 0;
                this.doublePowerupFlag = true;
                this.time.events.add(Phaser.Timer.MINUTE * 1.5, function () {
                    this.doublePowerupFlag = false;
                }, this);
                this.resetPowerUp();
            };
            Level01.prototype.winLoseState = function () {
                //Need to check p1 and p2 score to see if either has won, this is setup for singleplayer right now
                //Probably needs some tweaking for multiplayer
                if (this.p1Score >= this.scoreToWin) {
                    this.game.state.start('Win', true, true);
                    this.ball.alpha = 0; //The ball from this state somehow carries forward, at least makes it invisible for now
                }
                else if (this.p2Score >= this.scoreToWin) {
                    this.game.state.start('Lose', true, true);
                    this.ball.alpha = 0;
                }
            };
            Level01.prototype.aiFollow = function () {
                //Need to setup ai movement AFTER ball is created else errors happen. First parameter
                //tells the game what tos etup movement on, second is the x (We dont want ANY x movement)
                //Third is y axis which aprox where the ball's Y position is, and the last parameter
                //is the velocity it will have
                this.ai.body.y = 0;
                if (this.ball.body.velocity.y >= 0) {
                    this.game.physics.arcade.moveToXY(this.ai, this.ai.x, (this.ai.body.y - this.ball.body.y), -500); // Move down
                }
                else if (this.ball.body.velocity.y < 0) {
                    this.game.physics.arcade.moveToXY(this.ai, this.ai.x, (this.ai.body.y - this.ball.body.y), 500); //Move up
                }
            };
            Level01.prototype.powerMode = function () {
                //For powerups, careful sort of causes seizures right now
                this.stage.backgroundColor = Phaser.Color.getRandomColor(50, 255, 255); //gets random RGB color for background
                this.player.tint = Math.random() * 0xffffff; //Hex/Numeric color value that is multiplied by math.random
                this.ai.tint = Math.random() * 0xffffff;
                this.ball.tint = Math.random() * 0xffffff;
            };
            Level01.prototype.update = function () {
                //Sets up collisions so ball bounces off players
                this.physics.arcade.collide(this.ball, this.ai);
                this.physics.arcade.collide(this.ball, this.player);
                this.physics.arcade.collide(this.ball, this.lBound, this.lBoundHit, null, this); //Left bound collision
                this.physics.arcade.collide(this.ball, this.rBound, this.rBoundHit, null, this); // Right bound collision
                //End ball collision
                this.physics.arcade.collide(this.doublePtsPowerup, this.ai, this.resetPowerUp, null, this);
                this.physics.arcade.collide(this.doublePtsPowerup, this.player, this.doublePoints, null, this);
                this.physics.arcade.collide(this.doublePtsPowerup, this.lBound, this.resetPowerUp, null, this); //Left bound collision
                this.physics.arcade.collide(this.doublePtsPowerup, this.rBound, this.resetPowerUp, null, this); // Right bound collision
                //End double points powerup collision
                this.time.events.add(Phaser.Timer.SECOND * 5, this.aiFollow, this);
                this.winLoseState();
                if (this.dieRoll() >= 99) {
                    this.resetPowerUp();
                    this.time.events.add(Phaser.Timer.MINUTE * 5, function () {
                        if (this.powerupAliveCounter == 0) {
                            this.createPowerUp();
                        }
                    }, this);
                }
            };
            return Level01;
        }(Phaser.State));
        Client.Level01 = Level01;
    })(Client = MpPong.Client || (MpPong.Client = {}));
})(MpPong || (MpPong = {}));
var MpPong;
(function (MpPong) {
    var Client;
    (function (Client) {
        //Multiplayer level
        var Level02 = (function (_super) {
            __extends(Level02, _super);
            function Level02() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.i = 0;
                _this.p1Score = 0;
                _this.p2Score = 0; // Not sure WHY we can do object literal and regular assignment Sets properties on current level object?
                _this.streak = [];
                _this.scoreToWin = 11;
                _this.xVelocity = 600;
                _this.yVelocity = 600;
                // Number of ticks for game countdown
                // remember to also change value in 
                // startCountdown()
                _this.countdownAmount = 3;
                return _this;
            }
            Level02.prototype.create = function () {
                this.stage.alpha = 1;
                this.physics.startSystem(Phaser.Physics.ARCADE); //Starts physics system for game and begins creating our player and ball objects
                this.player = new Client.Player(this.game, this.world.centerX - 500, this.world.centerX);
                //Replace this with other player at some point
                this.player2 = new Client.Player(this.game, this.world.centerX + 475, this.world.centerX);
                this.lBound = new Client.LBound(this.game, (this.world.centerX - this.world.centerX), this.world.centerX);
                this.rBound = new Client.RBound(this.game, (this.world.centerX + this.world.centerX), this.world.centerX);
                //Creates and position player scores /* UI BELOW HERE */
                this.p1ScoreText = this.add.text((this.world.centerX - (this.world.centerX - 150)), this.world.centerX - 450, 'P1 Score: 0', { fontSize: '32px', fill: '#000' });
                this.p2ScoreText = this.add.text((this.world.centerX + (this.world.centerX - 350)), this.world.centerX - 450, 'P2 Score: 0', { fontSize: '32px', fill: '#000' });
                this.quit = new Client.Quit(this.game, this.world.centerX, this.world.centerY + (this.world.centerY - 50));
                this.full = new Client.Full(this.game, this.world.centerX - 90, this.world.centerY + (this.world.centerY - 50));
                // Call reset ball to start a new serve
                this.resetBall(2);
                var uri = "ws://" + window.location.host + "/ws";
                function connect() {
                    this.socket = new WebSocket(uri);
                    this.socket.onopen = function (event) {
                    };
                    this.socket.onclose = function (event) {
                    };
                    this.socket.onerror = function (event) {
                    };
                    this.socket.onmessage = function (event) {
                        console.log(event.data);
                    };
                }
                connect();
            };
            Level02.prototype.createBall = function () {
                //Self explanatory
                this.ball = new Client.Ball(this.game, this.world.centerX, this.world.centerX, this.xVelocity, this.yVelocity);
            };
            Level02.prototype.resetBall = function (score) {
                //Kills previous ball if it exists freeing up memory
                //And resets game
                if (this.ball) {
                    this.ball.kill();
                    this.streak = [];
                }
                this.countdownText = this.add.text(this.world.centerX, this.world.centerY, "", { fontSize: '200px', fill: '#FFF' });
                this.countdownText.anchor.setTo(0.5, 0.5);
                // Math.floor(Math.random() * (max - min)) + min;
                // In this case, min = 300, max = 500.
                if (score === 1) {
                    // Player 1 scored on player 2 so
                    // launch the ball towards player 1 as if
                    // player 2 is serving.
                    this.xVelocity = Math.floor(Math.random() * (500 - 300)) + (300);
                    // Invert the X axis so that it actually launches towards player 1.
                    this.xVelocity = this.xVelocity * (-1);
                    this.yVelocity = Math.floor(Math.random() * (500 - 300)) + (300);
                }
                else {
                    // If game is fresh, nobody scored but ALSO
                    // if Player 2 scored on player 1;
                    // launch the ball towards player 2 as if
                    // player 1 is serving.
                    this.xVelocity = Math.floor(Math.random() * (500 - 300)) + (300);
                    this.yVelocity = Math.floor(Math.random() * (500 - 300)) + (300);
                }
                // The yVelocity currently only shoots on the bottom half of the screen
                // Let's give it a chance to be either a positive or negative shot along the y-coordinate!
                // Initialize a variable to a random number with the possibilities of 1-10
                var yCoordinateInversion = Math.floor(Math.random() * (10 - 1)) + 1;
                // If the random number is 6 or higher, invert it!
                // Else not required but; Else - leave it how it is!
                if (yCoordinateInversion >= 6) {
                    this.yVelocity = this.yVelocity * (-1);
                }
                this.startCountdown();
            };
            Level02.prototype.startCountdown = function () {
                // store context for setInterval
                var _this = this;
                // store setInterval to end loop
                var loop = setInterval(function () {
                    if (_this.countdownAmount != 0) {
                        _this.countdownText.text = _this.countdownAmount.toString();
                        _this.countdownText.stroke = "#000";
                        _this.countdownText.strokeThickness = .5;
                        if (_this.countdownAmount == 3) {
                            _this.countdownText.addColor('red', 0);
                        }
                        else if (_this.countdownAmount == 2) {
                            _this.countdownText.addColor('yellow', 0);
                        }
                        else if (_this.countdownAmount == 1) {
                            _this.countdownText.addColor('green', 0);
                        }
                        _this.countdownAmount -= 1;
                    }
                    else {
                        _this.createBall();
                        // Reset tick amount
                        _this.countdownAmount = 3;
                        _this.countdownText.destroy();
                        // clear stored setInterval
                        clearInterval(loop);
                    }
                    //Set a timer for 1050 milliseconds
                }, Phaser.Timer.SECOND * 1.05);
            };
            Level02.prototype.addStreak = function (ball) {
                if (ball) {
                    if (this.ball.body.velocity) {
                        // this.streak.unshift(new Ball(this.game, this.ball.x, this.ball.y));
                        if (this.streak.length > 3) {
                            var dump = this.streak.pop();
                            dump.destroy();
                        }
                    }
                    else {
                        this.streak = [];
                        return false;
                    }
                }
                return false;
            };
            Level02.prototype.lBoundHit = function () {
                //Increments and then updates player score on the fly
                this.p2Score += 1;
                this.p2ScoreText.text = 'P2 Score: ' + this.p2Score;
                this.resetBall(2);
            };
            Level02.prototype.rBoundHit = function () {
                this.p1Score += 1;
                this.p1ScoreText.text = 'P1 Score: ' + this.p1Score;
                this.resetBall(1);
            };
            Level02.prototype.winLoseState = function () {
                //Need to check p1 and p2 score to see if either has won, this is setup for singleplayer right now
                //Probably needs some tweaking for multiplayer
                if (this.p1Score == this.scoreToWin) {
                    this.game.state.start('Win', true, true);
                }
                else if (this.p2Score == this.scoreToWin) {
                    this.game.state.start('Lose', true, true);
                }
            };
            Level02.prototype.powerMode = function () {
                while (this.i < 100) {
                    //For powerups, careful sort of causes seizures right now
                    this.stage.backgroundColor = Phaser.Color.getRandomColor(50, 255, 255); //gets random RGB color for background
                    this.player.tint = Math.random() * 0xffffff; //Hex/Numeric color value that is multiplied by math.random
                    this.ball.tint = Math.random() * 0xffffff;
                    this.i += 1;
                }
            };
            Level02.prototype.update = function () {
                //Sets up collisions so ball bounces off players
                this.physics.arcade.collide(this.ball, this.player);
                this.physics.arcade.collide(this.ball, this.player2);
                this.physics.arcade.collide(this.ball, this.lBound, this.lBoundHit, null, this); //Left bound collision
                this.physics.arcade.collide(this.ball, this.rBound, this.rBoundHit, null, this); // Right bound collision
                //this.time.events.add(Phaser.Timer.SECOND * 13, this.powerMode, this); //Need delay so it isn't triggered right away       
                this.winLoseState();
            };
            return Level02;
        }(Phaser.State));
        Client.Level02 = Level02;
    })(Client = MpPong.Client || (MpPong.Client = {}));
})(MpPong || (MpPong = {}));
var MpPong;
(function (MpPong) {
    var Client;
    (function (Client) {
        var Lose = (function (_super) {
            __extends(Lose, _super);
            function Lose() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Lose.prototype.preload = function () {
                this.load.image('ball', 'build/assets/sprites/ball.png');
                this.load.image('paddleAi', 'build/assets/sprites/p1Bar.png');
            };
            Lose.prototype.create = function () {
                this.game.canvas.style.cursor = "default";
                this.physics.startSystem(Phaser.Physics.ARCADE); //Starts physics system for game and begins creating our player and ball objects
                this.ai2 = new Client.PaddleAi(this.game, this.world.centerX - 500, this.world.centerX);
                this.ai3 = new Client.PaddleAi(this.game, this.world.centerX + 475, this.world.centerX);
                this.ball = new Client.Ball(this.game, this.world.centerX, this.world.centerX, 800, 800);
                this.game.add.text(this.world.centerX - 160, this.world.centerY - 310, "         You Lose!\nGo give it another go!", "red");
                this.mainMenutxt = this.game.add.text(this.world.centerX - 400, this.world.centerY - 200, "Return to Main Menu", { font: "10rem Joystick, Arial", fill: "#FFF", align: "center" });
                this.mainMenutxt.inputEnabled = true;
                this.mainMenutxt.alpha = 0.5;
                this.mainMenutxt.events.onInputDown.add(function () {
                    location.reload();
                }, this);
                this.mainMenutxt.events.onInputOver.add(function () {
                    this.mainMenutxt.alpha = 1; //Fades in the button         
                }, this);
                this.mainMenutxt.events.onInputOut.add(function () {
                    this.mainMenutxt.alpha = 0.5; //Fades it back out              
                }, this);
                this.exitGametxt = this.game.add.text(this.world.centerX - 160, this.world.centerY - 50, "Exit Game", { font: "10rem Joystick, Arial", fill: "#FFF", align: "center" });
                this.exitGametxt.inputEnabled = true;
                this.exitGametxt.alpha = 0.5;
                this.exitGametxt.events.onInputDown.add(function () {
                    location.assign("https://www.google.com/");
                }, this);
                this.exitGametxt.events.onInputOver.add(function () {
                    this.exitGametxt.alpha = 1; //Fades in the button  
                }, this);
                this.exitGametxt.events.onInputOut.add(function () {
                    this.exitGametxt.alpha = 0.5; //Fades it back out          
                }, this);
                setTimeout(function () {
                    location.reload();
                }, 30000); //Need to make this an option for the user
            };
            Lose.prototype.aiFollow2 = function () {
                this.ai2.body.y = 0;
                if (this.ball.body.velocity.y >= 0) {
                    this.game.physics.arcade.moveToXY(this.ai2, this.ai2.x, (this.ai2.body.y - this.ball.body.y), -850); // Move down
                }
                else if (this.ball.body.velocity.y < 0) {
                    this.game.physics.arcade.moveToXY(this.ai2, this.ai2.x, (this.ai2.body.y - this.ball.body.y), 850); //Move up
                }
            };
            Lose.prototype.aiFollow3 = function () {
                this.ai3.body.y = 0;
                if (this.ball.body.velocity.y >= 0) {
                    this.game.physics.arcade.moveToXY(this.ai3, this.ai3.x, (this.ai3.body.y - this.ball.body.y), -500); // Move down
                }
                else if (this.ball.body.velocity.y < 0) {
                    this.game.physics.arcade.moveToXY(this.ai3, this.ai3.x, (this.ai3.body.y - this.ball.body.y), 500); //Move up
                }
            };
            Lose.prototype.update = function () {
                this.time.events.add(Phaser.Timer.SECOND * 1, this.aiFollow2, this);
                this.time.events.add(Phaser.Timer.SECOND * 2, this.aiFollow3, this);
            };
            return Lose;
        }(Phaser.State));
        Client.Lose = Lose;
    })(Client = MpPong.Client || (MpPong.Client = {}));
})(MpPong || (MpPong = {}));
var MpPong;
(function (MpPong) {
    var Client;
    (function (Client) {
        var MainMenu = (function (_super) {
            __extends(MainMenu, _super);
            function MainMenu() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MainMenu.prototype.create = function () {
                //creating the logo objects
                this.logo = this.add.sprite(this.world.centerX, -300, 'logo');
                this.logo.anchor.setTo(0.5);
                // Creating the text objects
                this.mainMenutxt = this.add.text(this.world.centerX, -200, "Main Menu", { font: "10rem Joystick, Arial", fill: "#FFF", align: "center" });
                this.singlePlayertxt = this.add.text(this.world.centerX, -200, "Single Player", { font: "4rem Joystick, Arial", fill: "#FFF", align: "center" });
                this.multiPlayertxt = this.add.text(this.world.centerX, -200, "Multi-Player", { font: "4rem Joystick, Arial", fill: "#FFF", align: "center" });
                this.highscoretxt = this.add.text(this.world.centerX, -200, "Hi-Scores", { font: "4rem Joystick, Arial", fill: "#FFF", align: "center" });
                // LOGO ANIMATION
                this.add.tween(this.logo).to({ y: 120 }, 1800, Phaser.Easing.Elastic.Out, true, 500);
                // MAIN MENU ANIMATIONS
                this.add.tween(this.mainMenutxt).to({ y: 245 }, 1850, Phaser.Easing.Elastic.Out, true, 500);
                this.add.tween(this.singlePlayertxt).to({ y: 350 }, 1900, Phaser.Easing.Elastic.Out, true, 500);
                this.add.tween(this.multiPlayertxt).to({ y: 385 }, 1950, Phaser.Easing.Elastic.Out, true, 500);
                this.add.tween(this.highscoretxt).to({ y: 420 }, 2000, Phaser.Easing.Elastic.Out, true, 500);
                this.singlePlayertxt.inputEnabled = true;
                this.singlePlayertxt.events.onInputDown.add(this.startLevel01, this);
                this.multiPlayertxt.inputEnabled = true;
                this.multiPlayertxt.events.onInputDown.add(this.startLevel02, this);
            };
            MainMenu.prototype.fadeOut = function () {
                //Starts audio as we bring the game forward, should loop upon song completion
                //and work across all browsers due to the ogg format of the file
                //0.05 is level the audio will play at
                this.add.audio('bgMusic', 1, true).play().volume = 0.05; // Have to set this or its too dang loud!
                //this.add.tween(this.background).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
                var tween = this.add.tween(this.logo).to({ y: 800 }, 2000, Phaser.Easing.Linear.None, true);
                //When done playing animations on the logo and background will start the actual game state
                //tween.onComplete.add(this.startGame, this);
            };
            MainMenu.prototype.startGame = function () {
                this.game.state.start('Level01', true, false);
                this.destroyObjects();
            };
            MainMenu.prototype.destroyObjects = function () {
                // Destroying the logo and text objects to clear the screen
                this.logo.destroy();
                this.mainMenutxt.destroy();
                this.singlePlayertxt.destroy();
                this.multiPlayertxt.destroy();
                this.highscoretxt.destroy();
            };
            MainMenu.prototype.startLevel01 = function () {
                this.fadeOut();
                this.game.state.start('Level01', true, false);
                this.destroyObjects();
            };
            MainMenu.prototype.startLevel02 = function () {
                this.fadeOut();
                this.game.state.start('Level02', true, false);
                this.destroyObjects();
            };
            return MainMenu;
        }(Phaser.State));
        Client.MainMenu = MainMenu;
    })(Client = MpPong.Client || (MpPong.Client = {}));
})(MpPong || (MpPong = {}));
var MpPong;
(function (MpPong) {
    var Client;
    (function (Client) {
        var Preloader = (function (_super) {
            __extends(Preloader, _super);
            function Preloader() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Preloader.prototype.preload = function () {
                this.loaderText = this.game.add.text(this.world.centerX, 200, "Loading...", { font: "36px Arial", fill: "#A9A91111", align: "center" }); //Won't be seen unless game gets big enough that loading is necessary
                this.loaderText.anchor.setTo(0.5);
                this.load.image('player1', 'build/assets/sprites/p1Bar.png');
                this.load.image('mouse', 'build/assets/ui/mouse.png');
                this.load.image('paddleAi', 'build/assets/sprites/p1Bar.png');
                this.load.image('doublePts', 'build/assets/sprites/dbl.png');
                this.load.image('ball', 'build/assets/sprites/ball.png');
                this.load.image('lBound', 'build/assets/sprites/Bound.png');
                this.load.image('rBound', 'build/assets/sprites/Bound.png');
                this.load.image('titlepage', 'build/assets/ui/bg.png');
                this.load.image('logo', 'build/assets/ui/logo.png');
                this.load.image('pause', 'build/assets/ui/pause.png');
                this.load.image('play', 'build/assets/ui/play.png');
                this.load.image('quit', 'build/assets/ui/quit.jpg');
                this.load.image('full', 'build/assets/ui/full.png');
                this.load.audio('bgMusic', 'build/assets/sounds/bgMusic.ogg', true);
            };
            Preloader.prototype.create = function () {
                var tween = this.add.tween(this.loaderText).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
                //Once intro logo animation is complete passes to startMainMenu and runs the title screen
                tween.onComplete.add(this.startMainMenu, this);
            };
            Preloader.prototype.startMainMenu = function () {
                //Passes to the mainMenu.ts file
                this.game.state.start('MainMenu', true, false);
            };
            return Preloader;
        }(Phaser.State));
        Client.Preloader = Preloader;
    })(Client = MpPong.Client || (MpPong.Client = {}));
})(MpPong || (MpPong = {}));
var MpPong;
(function (MpPong) {
    var Client;
    (function (Client) {
        var Win = (function (_super) {
            __extends(Win, _super);
            function Win() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Win.prototype.preload = function () {
                this.load.image('ball', 'build/assets/sprites/ball.png');
                this.load.image('paddleAi', 'build/assets/sprites/p1Bar.png');
            };
            Win.prototype.create = function () {
                this.game.canvas.style.cursor = "default";
                this.physics.startSystem(Phaser.Physics.ARCADE); //Starts physics system for game and begins creating our player and ball objects
                this.ai2 = new Client.PaddleAi(this.game, this.world.centerX - 500, this.world.centerX);
                this.ai3 = new Client.PaddleAi(this.game, this.world.centerX + 475, this.world.centerX);
                this.ball = new Client.Ball(this.game, this.world.centerX, this.world.centerX, 800, 800);
                this.game.add.text(this.world.centerX - 160, this.world.centerY - 310, "               You Win!\nWould you like to play again?", "red");
                this.mainMenutxt = this.game.add.text(this.world.centerX - 400, this.world.centerY - 200, "Return to Main Menu", { font: "10rem Joystick, Arial", fill: "#FFF", align: "center" });
                this.mainMenutxt.inputEnabled = true;
                this.mainMenutxt.alpha = 0.5;
                this.mainMenutxt.events.onInputDown.add(function () {
                    location.reload();
                }, this);
                this.mainMenutxt.events.onInputOver.add(function () {
                    this.mainMenutxt.alpha = 1; //Fades in the button               
                }, this);
                this.mainMenutxt.events.onInputOut.add(function () {
                    this.mainMenutxt.alpha = 0.5; //Fades it back out             
                }, this);
                this.exitGametxt = this.game.add.text(this.world.centerX - 160, this.world.centerY - 50, "Exit Game", { font: "10rem Joystick, Arial", fill: "#FFF", align: "center" });
                this.exitGametxt.inputEnabled = true;
                this.exitGametxt.alpha = 0.5;
                this.exitGametxt.events.onInputDown.add(function () {
                    location.assign("https://www.google.com/");
                }, this);
                this.exitGametxt.events.onInputOver.add(function () {
                    this.exitGametxt.alpha = 1; //Fades in the button             
                }, this);
                this.exitGametxt.events.onInputOut.add(function () {
                    this.exitGametxt.alpha = 0.5; //Fades it back out       
                }, this);
                setTimeout(function () {
                    location.reload();
                }, 30000); //Need to make this an option for the user
            };
            Win.prototype.aiFollow2 = function () {
                this.ai2.body.y = 0;
                if (this.ball.body.velocity.y >= 0) {
                    this.game.physics.arcade.moveToXY(this.ai2, this.ai2.x, (this.ai2.body.y - this.ball.body.y), -850); // Move down
                }
                else if (this.ball.body.velocity.y < 0) {
                    this.game.physics.arcade.moveToXY(this.ai2, this.ai2.x, (this.ai2.body.y - this.ball.body.y), 850); //Move up
                }
            };
            Win.prototype.aiFollow3 = function () {
                this.ai3.body.y = 0;
                if (this.ball.body.velocity.y >= 0) {
                    this.game.physics.arcade.moveToXY(this.ai3, this.ai3.x, (this.ai3.body.y - this.ball.body.y), -500); // Move down
                }
                else if (this.ball.body.velocity.y < 0) {
                    this.game.physics.arcade.moveToXY(this.ai3, this.ai3.x, (this.ai3.body.y - this.ball.body.y), 500); //Move up
                }
            };
            Win.prototype.update = function () {
                this.time.events.add(Phaser.Timer.SECOND * 1, this.aiFollow2, this);
                this.time.events.add(Phaser.Timer.SECOND * 2, this.aiFollow3, this);
            };
            return Win;
        }(Phaser.State));
        Client.Win = Win;
    })(Client = MpPong.Client || (MpPong.Client = {}));
})(MpPong || (MpPong = {}));
var MpPong;
(function (MpPong) {
    var Client;
    (function (Client) {
        var Full = (function (_super) {
            __extends(Full, _super);
            function Full(game, x, y) {
                var _this = _super.call(this, game, x, y, 'full', 1) || this;
                _this.anchor.setTo(0.5);
                game.add.existing(_this);
                _this.alpha = 0.3;
                _this.scale.setTo(0.15, 0.2);
                _this.inputEnabled = true; //W/o this the next event wont work, enables input
                _this.events.onInputOver.add(function () {
                    this.alpha = 1; //Fades in the button 
                    this.game.canvas.style.cursor = "default"; //Bring back mouse if X movement great enough
                }, _this);
                _this.events.onInputOut.add(function () {
                    this.alpha = 0.3; //Fades it back out
                    this.game.canvas.style.cursor = "none"; //Resets mouse to none
                }, _this);
                _this.events.onInputDown.add(function () {
                    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT; //Setup for fullscreen
                    if (!game.scale.isFullScreen) {
                        game.scale.startFullScreen(false); //Starts fullscreen, the flse is a bunch of graphics options we dont need
                    }
                }, _this);
                return _this;
            }
            return Full;
        }(Phaser.Sprite));
        Client.Full = Full;
    })(Client = MpPong.Client || (MpPong.Client = {}));
})(MpPong || (MpPong = {}));
var MpPong;
(function (MpPong) {
    var Client;
    (function (Client) {
        var Mouse = (function (_super) {
            __extends(Mouse, _super);
            function Mouse(game, x, y) {
                var _this = _super.call(this, game, x, y, 'mouse', 1) || this;
                _this.mouseUse = false;
                _this.anchor.setTo(0.5);
                game.add.existing(_this);
                _this.alpha = 0.3;
                _this.scale.setTo(0.15);
                _this.inputEnabled = true; //W/o this the next event wont work, enables input
                _this.events.onInputOver.add(function () {
                    this.alpha = 1; //Fades in the button 
                    this.game.canvas.style.cursor = "default"; //Bring back mouse if X movement great enough
                }, _this);
                _this.events.onInputOut.add(function () {
                    this.alpha = 0.3; //Fades it back out
                    this.game.canvas.style.cursor = "none"; //Resets mouse to none
                }, _this);
                //Right now if this is not set up controls become wonky and work poorly. Has to be either mouse OR keyboard, not both
                _this.events.onInputDown.add(function () {
                    this.mouseUse = !this.mouseUse;
                    if (this.mouseUse == true) {
                        this.alpha = 1;
                    }
                }, _this);
                return _this;
            }
            return Mouse;
        }(Phaser.Sprite));
        Client.Mouse = Mouse;
    })(Client = MpPong.Client || (MpPong.Client = {}));
})(MpPong || (MpPong = {}));
var MpPong;
(function (MpPong) {
    var Client;
    (function (Client) {
        var Pause = (function (_super) {
            __extends(Pause, _super);
            function Pause(game, x, y) {
                var _this = _super.call(this, game, x, y, 'pause', 1) || this;
                _this.anchor.setTo(0.5);
                game.add.existing(_this);
                _this.alpha = 0.3;
                _this.scale.setTo(0.3, 0.3);
                _this.inputEnabled = true; //W/o this the next event wont work, enables input
                game.input.onDown.add(unpause, _this);
                _this.events.onInputDown.add(function () {
                    this.alpha = 0;
                    if (!this.game.play) {
                        this.game.play = game.add.sprite(this.x - 35, this.y - 40, 'play');
                        this.game.play.scale.setTo(0.18);
                    }
                    else {
                        this.game.play.alpha = 1;
                    }
                    if (!game.paused) {
                        game.paused = true;
                    }
                }, _this);
                _this.events.onInputOver.add(function () {
                    this.alpha = 1; //Fades in the button 
                    this.game.canvas.style.cursor = "default";
                }, _this);
                _this.events.onInputOut.add(function () {
                    this.alpha = 0.3; //Fades it back out
                    this.game.canvas.style.cursor = "none";
                }, _this);
                function unpause() {
                    if (this.game.play) {
                        this.game.play.alpha = 0;
                    }
                    this.alpha = 0.3;
                    game.paused = false;
                }
                return _this;
            }
            return Pause;
        }(Phaser.Sprite));
        Client.Pause = Pause;
    })(Client = MpPong.Client || (MpPong.Client = {}));
})(MpPong || (MpPong = {}));
var MpPong;
(function (MpPong) {
    var Client;
    (function (Client) {
        var Quit = (function (_super) {
            __extends(Quit, _super);
            function Quit(game, x, y) {
                var _this = _super.call(this, game, x, y, 'quit', 1) || this;
                _this.anchor.setTo(0.5);
                game.add.existing(_this);
                _this.alpha = 0.3;
                _this.scale.setTo(0.3, 0.3);
                _this.inputEnabled = true; //W/o this the next event wont work, enables input
                _this.events.onInputOver.add(function () {
                    this.alpha = 1; //Fades in the button 
                    this.game.canvas.style.cursor = "default"; //Bring back mouse if X movement great enough
                }, _this);
                _this.events.onInputOut.add(function () {
                    this.alpha = 0.3; //Fades it back out
                    this.game.canvas.style.cursor = "none"; //Resets mouse to none
                }, _this);
                _this.events.onInputDown.add(function () {
                    game.destroy(); //Destroy all our hard work.
                });
                return _this;
            }
            return Quit;
        }(Phaser.Sprite));
        Client.Quit = Quit;
    })(Client = MpPong.Client || (MpPong.Client = {}));
})(MpPong || (MpPong = {}));
//# sourceMappingURL=game.js.map