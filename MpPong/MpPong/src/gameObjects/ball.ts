module MpPong.Client {
    export class Ball extends Phaser.Sprite {
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y,'ball', 1);
            this.anchor.setTo(0.5);
            game.add.existing(this);
            // Physics
            game.physics.enable(this);
            this.body.collideWorldBounds = true;
            this.body.gravity.x = 10;
            this.body.gravity.y = 10;
            this.body.bounce.set(1);
            this.body.velocity.y = 500;
            this.body.velocity.x = 500;
        }
    }
}