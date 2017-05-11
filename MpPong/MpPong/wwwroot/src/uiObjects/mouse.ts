module MpPong.Client {
    export class Mouse extends Phaser.Sprite {
        mouseUse = false;

        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'mouse', 1);
            this.anchor.setTo(0.5);
            game.add.existing(this);
            this.alpha = 0.3;
            this.scale.setTo(0.15);
            this.inputEnabled = true; //W/o this the next event wont work, enables input

            this.events.onInputOver.add(function (this) {
                this.alpha = 1; //Fades in the button 
                this.game.canvas.style.cursor = "default"; //Bring back mouse if X movement great enough
            }, this);

            this.events.onInputOut.add(function (this) {
                this.alpha = 0.3; //Fades it back out
                this.game.canvas.style.cursor = "none"; //Resets mouse to none
            }, this);

            //Right now if this is not set up controls become wonky and work poorly. Has to be either mouse OR keyboard, not both
            this.events.onInputDown.add(function () {
                this.mouseUse = !this.mouseUse;
    
                if (this.mouseUse == true) {
                    this.alpha = 1;
                }
            }, this);   
        }
    }
}