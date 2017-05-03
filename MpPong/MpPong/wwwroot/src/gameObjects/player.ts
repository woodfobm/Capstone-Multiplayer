module MpPong.Client {
    export class Player extends Phaser.Sprite {
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y,'player1', 1);
            this.anchor.setTo(0.5);
            game.add.existing(this);
            // Physics
            game.physics.enable(this);
            this.body.collideWorldBounds = true;
            this.body.immovable = true;
            //Unsure of where to do this but need to seperate players so they can be controlled 
            //by each player whom joins the game
        }

        update() {
        //Player y movement setup here. The 0 assignment outside the if and else ensures the player
        //doesn't continue to move if no keys are pressed/there is no drag effect
            this.body.velocity.y = 0;
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                this.body.velocity.y = -800;
            } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
                this.body.velocity.y = 800;
            }
        }
    }
}