
module MpPong.Client {
    export class Ball extends Phaser.Sprite {
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'ball', 1);
            this.anchor.setTo(0.5);
            game.add.existing(this);
            // Physics
            game.physics.enable(this);
            this.body.collideWorldBounds = true;
            //Have to set a initial velocity to ensure the ball bounces off the top and bottom and
            //the player paddles and doesn't stay in its spawn area


            // This setting is what has the ball starting bottom right. Change the velocities to a random
            // number so that the ball starts randomly everytime.
            this.body.bounce.set(1);
            this.body.velocity.y = 500; //Maybe change values to signify different difficulty/speed up in game?
            this.body.velocity.x = 500;
            
        }
    }
}