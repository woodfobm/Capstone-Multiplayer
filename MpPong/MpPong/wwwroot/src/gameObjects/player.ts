module MpPong.Client {
    export class Player extends Phaser.Sprite {
        mouseUse: Mouse;
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
            this.mouseUse = new Mouse(this.game, this.game.width - 50, this.game.height - 50);
        }

        update() {
        //Player y movement setup here. The 0 assignment outside the if and else ensures the player
        //doesn't continue to move if no keys are pressed/there is no drag effect
            this.body.velocity.y = 0;
            if (!this.mouseUse.mouseUse) {
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                    this.body.velocity.y = -800;
                } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
                    this.body.velocity.y = 800;
                }
            } else {
                //Setup for mouse control. Currently breaks keyboard movesment but it checks the y position of paddle to the
                //y position of the mouse cursor and attempts to then change the paddles y to match mouse.y
                if (this.y > this.game.input.activePointer.worldY || this.y < this.game.input.activePointer.worldY) {
                    this.y = (this.game.input.activePointer.clientY - 57) //Want to do this to get the center of the player paddle);
                }
            }
        }
    }
}