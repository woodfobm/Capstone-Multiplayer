module MpPong.Client {
    export class LBound extends Phaser.Sprite {
        constructor(game: Phaser.Game, x: number, y: number) {
            //Sets up a 1 px long left boundary behind player
            super(game, x, y, 'lBound', 1);
            this.anchor.setTo(0.5);
            game.add.existing(this);
            // Physics
            game.physics.enable(this);
            this.body.immovable = true;
        }
    }
}