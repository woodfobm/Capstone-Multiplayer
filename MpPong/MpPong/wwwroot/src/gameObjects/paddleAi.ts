module MpPong.Client {
    export class PaddleAi extends Phaser.Sprite {
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y,'paddleAi', 1);
            this.anchor.setTo(0.5);
            game.add.existing(this);
            // Physics
            game.physics.enable(this);
            this.body.collideWorldBounds = true;
            this.body.immovable = true;
            this.body.allowGravity = false; //Forget Einsten and his theories on gravity
        }
    }
}