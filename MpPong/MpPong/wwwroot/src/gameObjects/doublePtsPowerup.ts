﻿module MpPong.Client {
    export class DoublePtsPowerup extends Phaser.Sprite {
        constructor(game: Phaser.Game, x: number, y: number, xVelocity: number, yVelocity: number) {
            super(game, x, y, 'doublePts', 1);
            this.anchor.setTo(0.5);
            game.add.existing(this);
            // Physics
            game.physics.enable(this);
            this.body.collideWorldBounds = true;
            // This setting is what has the powerup maintaining velocity when bouncing.
            this.body.bounce.set(1);
            this.scale.setTo(0.35);
             //Have to set a initial velocity to ensure the ball bounces off the top and bottom and
            //the player paddles and doesn't stay in its spawn area
            this.body.velocity.x = xVelocity;
            this.body.velocity.y = yVelocity;
        }
    }
}