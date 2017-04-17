module MpPong.Client {
    export class Level01 extends Phaser.State {
        background: Phaser.Sprite
        ball: Ball;
        music: Phaser.Sound;
        player: Player;
        player2: Player;

        create() {
            this.physics.startSystem(Phaser.Physics.ARCADE);

            //this.background = this.add.sprite(-150, 0, 'level01-sprites','background');
            this.player = new Player(this.game, this.world.centerX - 500, this.world.centerX);
            this.player.anchor.setTo(0, 5);

            this.player2 = new Player(this.game, this.world.centerX + 475, this.world.centerX);
            this.player2.anchor.setTo(0, 5);

            this.ball = new Ball(this.game, this.world.centerX, this.world.centerX);
            this.ball.anchor.setTo(0, 5);
           
            //this.game.debug.text("Use Right and Left arrow keys to move the bat", 0, this.world.height, "red");
        }

        update() {
            this.physics.arcade.collide(this.ball, this.player);
            this.physics.arcade.collide(this.ball, this.player2);
        }
    }
}