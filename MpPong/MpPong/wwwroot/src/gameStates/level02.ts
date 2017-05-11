module MpPong.Client {
    //Multiplayer level
    export class Level02 extends Phaser.State {
        ai: PaddleAi;
        background: Phaser.Sprite
        ball: Ball;
        full: Full;
        music: Phaser.Sound;
        lBound: LBound;
        rBound: RBound;
        player: Player;
        p1ScoreText: Phaser.Text;
        player2: Player;
        p2ScoreText: Phaser.Text;
        quit: Quit;
        i = 0;
        p1Score = 0;
        p2Score = 0; // Not sure WHY we can do object literal and regular assignment Sets properties on current level object?
        countdownText: Phaser.Text;
        countdownTimer: Phaser.TimerEvent;
        streak = [];
        scoreToWin = 11;

        // Number of ticks for game countdown
        // remember to also change value in 
        // startCountdown()
        countdownAmount = 3;

        create() {

            this.stage.alpha = 1;

            this.physics.startSystem(Phaser.Physics.ARCADE);//Starts physics system for game and begins creating our player and ball objects
            this.player = new Player(this.game, this.world.centerX - 500, this.world.centerX);
            this.player.anchor.setTo(0, 5);

            //Replace this with other player at some point
            this.ai = new PaddleAi(this.game, this.world.centerX + 475, this.world.centerX);
            this.ai.anchor.setTo(0, 5);

            this.lBound = new LBound(this.game, (this.world.centerX - this.world.centerX), this.world.centerX);
            this.rBound = new RBound(this.game, (this.world.centerX + this.world.centerX), this.world.centerX);

            //Creates and position player scores /* UI BELOW HERE */
            this.p1ScoreText = this.add.text((this.world.centerX - (this.world.centerX - 150)), this.world.centerX - 450, 'P1 Score: 0', { fontSize: '32px', fill: '#000' });
            this.p2ScoreText = this.add.text((this.world.centerX + (this.world.centerX - 350)), this.world.centerX - 450, 'P2 Score: 0', { fontSize: '32px', fill: '#000' });
            this.quit = new Quit(this.game, this.world.centerX, this.world.centerY + (this.world.centerY - 50));
           
            this.full = new Full(this.game, this.world.centerX - 90, this.world.centerY + (this.world.centerY - 50));
            // Call reset ball to start a new serve
            this.resetBall();
            
        }

        createBall() {
            //Self explanatory
            //this.ball = new Ball(this.game, this.world.centerX, this.world.centerX);
            this.ball.anchor.setTo(0, 5);
            
        }

        resetBall() {
        //Kills previous ball if it exists freeing up memory
        //And resets game
            if (this.ball) {
                this.ball.kill();
                this.streak = [];
            }

            this.countdownText = this.add.text(this.world.centerX, this.world.centerY, "", { fontSize: '200px', fill: '#FFF' });
            this.countdownText.anchor.setTo(0.5, 0.5);

            this.startCountdown();
            
        }

        startCountdown() {

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
                    } else if (_this.countdownAmount == 2) {
                        _this.countdownText.addColor('yellow', 0);
                    } else if (_this.countdownAmount == 1) {
                        _this.countdownText.addColor('green', 0);
                    }
                    
                    _this.countdownAmount -= 1;

                } else {

                    _this.createBall();

                    // Reset tick amount
                    _this.countdownAmount = 3;
                    _this.countdownText.destroy();
                    // clear stored setInterval
                    clearInterval(loop);

                }
                
               //Set a timer for 1050 milliseconds
            }, Phaser.Timer.SECOND * 1.05);

        }

        
         
        addStreak(ball) {

            if (ball) {

                if (this.ball.body.velocity) {

                   // this.streak.unshift(new Ball(this.game, this.ball.x, this.ball.y));

                    if (this.streak.length > 3) {
                        var dump = this.streak.pop();
                        dump.destroy();
                    }

                } else {

                    this.streak = [];
                    return false;

                }

            }

            return false;

        }
        

        lBoundHit() {
        //Increments and then updates player score on the fly
            this.p2Score += 1;
            this.p2ScoreText.text = 'P2 Score: ' + this.p2Score;
            this.resetBall();
        }

        rBoundHit() {
            this.p1Score += 1;
            this.p1ScoreText.text = 'P1 Score: ' + this.p1Score;
            this.resetBall();
        }

        winLoseState() {
        //Need to check p1 and p2 score to see if either has won, this is setup for singleplayer right now
        //Probably needs some tweaking for multiplayer
            if (this.p1Score == this.scoreToWin) {
                this.game.state.start('Win', true, true);
            } else if (this.p2Score == this.scoreToWin) {
                this.game.state.start('Lose', true, true);
            }
        }

        aiFollow() {
            //Need to setup ai movement AFTER ball is created else errors happen. First parameter
            //tells the game what tos etup movement on, second is the x (We dont want ANY x movement)
            //Third is y axis which aprox where the ball's Y position is, and the last parameter
            //is the velocity it will have
            this.ai.body.y = 0;
            if (this.ball.body.velocity.y >= 0) {
                this.game.physics.arcade.moveToXY(this.ai, this.ai.x, (this.ai.body.y - this.ball.body.y), -400); // Move down
            } else if (this.ball.body.velocity.y < 0) {
                this.game.physics.arcade.moveToXY(this.ai, this.ai.x, (this.ai.body.y - this.ball.body.y), 400); //Move up
            }
        }

        powerMode() {
            while (this.i < 100) {
                //For powerups, careful sort of causes seizures right now
                this.stage.backgroundColor = Phaser.Color.getRandomColor(50, 255, 255); //gets random RGB color for background
                this.player.tint = Math.random() * 0xffffff; //Hex/Numeric color value that is multiplied by math.random
                this.ai.tint = Math.random() * 0xffffff;
                this.ball.tint = Math.random() * 0xffffff;
                this.i += 1;

            }
        }

        update() {
            //Sets up collisions so ball bounces off players
            this.physics.arcade.collide(this.ball, this.player);
            this.physics.arcade.collide(this.ball, this.ai);
            this.physics.arcade.collide(this.ball, this.lBound, this.lBoundHit, null, this); //Left bound collision
            this.physics.arcade.collide(this.ball, this.rBound, this.rBoundHit, null, this);// Right bound collision
            //this.time.events.add(Phaser.Timer.SECOND * 13, this.powerMode, this); //Need delay so it isn't triggered right away
            this.time.events.add(Phaser.Timer.SECOND * 5, this.aiFollow, this);
            this.winLoseState();
        }
    }
}