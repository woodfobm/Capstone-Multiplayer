module MpPong.Client {
    export class Full extends Phaser.Sprite {
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'full', 1);
            this.anchor.setTo(0.5);
            game.add.existing(this);
            this.alpha = 0.3;
            this.scale.setTo(0.15, 0.2);
            this.inputEnabled = true; //W/o this the next event wont work, enables input

            this.events.onInputOver.add(function (this) {
                this.alpha = 1; //Fades in the button 
                this.game.canvas.style.cursor = "default"; //Bring back mouse if X movement great enough
            }, this);

            this.events.onInputOut.add(function (this) {
                this.alpha = 0.3; //Fades it back out
                this.game.canvas.style.cursor = "none"; //Resets mouse to none
            }, this); 

            this.events.onInputDown.add(function () {
                game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT; //Setup for fullscreen
                if (!game.scale.isFullScreen) {
                    game.scale.startFullScreen(false); //Starts fullscreen, the flse is a bunch of graphics options we dont need
                }
            }, this);   

        }
    }
}