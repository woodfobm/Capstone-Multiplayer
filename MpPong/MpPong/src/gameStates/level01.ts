module MpPong.Client {
    export class Level01 extends Phaser.State {
        background: Phaser.Sprite
        ball: Ball;
        music: Phaser.Sound;
        player: Player;
        player2: Player;

        create() {
            this.physics.startSystem(Phaser.Physics.ARCADE);//Starts physics system for game and begins creating our player and ball objects
            this.player = new Player(this.game, this.world.centerX - 500, this.world.centerX);
            this.player.anchor.setTo(0, 5);

            this.player2 = new Player(this.game, this.world.centerX + 475, this.world.centerX);
            this.player2.anchor.setTo(0, 5);

            this.ball = new Ball(this.game, this.world.centerX, this.world.centerX);
            this.ball.anchor.setTo(0, 5);
            //Going to want some invisible barriers that if the ball hits will score a point
            //Depending on the side it is scored on 
            //Must increment score too (score++)
            //Would then have to reset ball to middle of screen and launch it
           
            //this.game.debug.text("Use Up and Down arrow keys to move the paddle", 0, this.world.height, "red");
        }

        update() {
            //Sets up collisions so ball bounces off players
            this.physics.arcade.collide(this.ball, this.player);
            this.physics.arcade.collide(this.ball, this.player2);
        }
    }
}