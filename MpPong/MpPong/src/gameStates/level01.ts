module MpPong.Client {
    export class Level01 extends Phaser.State {
        background: Phaser.Sprite
        ball: Ball;
        music: Phaser.Sound;
        lBound: LBound;
        rBound: RBound;
        player: Player;
        p1ScoreText: Phaser.Text;
        player2: Player;
        p2ScoreText: Phaser.Text;
        p1Score = 0;
        p2Score = 0; // Not sure WHY we can do object literal and regular assignment Sets properties on current level object?

        create() {
            this.physics.startSystem(Phaser.Physics.ARCADE);//Starts physics system for game and begins creating our player and ball objects
            this.player = new Player(this.game, this.world.centerX - 500, this.world.centerX);
            this.player.anchor.setTo(0, 5);

            this.player2 = new Player(this.game, this.world.centerX + 475, this.world.centerX);
            this.player2.anchor.setTo(0, 5);

            this.lBound = new LBound(this.game, (this.world.centerX - this.world.centerX), this.world.centerX);
            this.rBound = new RBound(this.game, (this.world.centerX + this.world.centerX), this.world.centerX);

            //Creates and position player scores
            this.p1ScoreText = this.add.text((this.world.centerX - (this.world.centerX - 300)), this.world.centerX - 500, 'P1 Score: 0', { fontSize: '32px', fill: '#000' });
            this.p2ScoreText = this.add.text((this.world.centerX + (this.world.centerX - 450)), this.world.centerX - 500, 'P2 Score: 0', { fontSize: '32px', fill: '#000' });
            //This will create a 3 second delay before the game initially starts
            this.time.events.add(Phaser.Timer.SECOND * 2, this.resetBall, this);
            //this.game.debug.text("Use Up and Down arrow keys to move the paddle", 0, this.world.height, "red");
        }

        createBall() {
            //Self explanatory
            this.ball = new Ball(this.game, this.world.centerX, this.world.centerX);
            this.ball.anchor.setTo(0, 5);
        }

        resetBall() {
        //Kills previous ball if it exists freeing up memory
        //And resets game
            if (this.ball) {
                this.ball.kill();
            }
            //Adds 1 second delay before new ball is created
            this.time.events.add(Phaser.Timer.SECOND, this.createBall, this);
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

        powerMode() {
        //For powerups, careful sort of causes seizures right now
            this.stage.backgroundColor = Phaser.Color.getRandomColor(50, 255, 255); //gets random RGB color for background
            this.player.tint = Math.random() * 0xffffff; //Hex/Numeric color value that is multiplied by math.random
            this.player2.tint = Math.random() * 0xffffff;
            this.ball.tint = Math.random() * 0xffffff;
        }

        update() {
            //Sets up collisions so ball bounces off players
            this.physics.arcade.collide(this.ball, this.player);
            this.physics.arcade.collide(this.ball, this.player2);
            this.physics.arcade.collide(this.ball, this.lBound, this.lBoundHit, null, this); //Left bound collision
            this.physics.arcade.collide(this.ball, this.rBound, this.rBoundHit, null, this);// Right bound collision
            //this.time.events.add(Phaser.Timer.SECOND * 13, this.powerMode, this); //Need delay so it isn't triggered right away
        }
    }
}