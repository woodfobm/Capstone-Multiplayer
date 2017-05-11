module MpPong.Client {
    export class Pause extends Phaser.Sprite {
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'pause', 1);
            this.anchor.setTo(0.5);
            game.add.existing(this);
            this.alpha = 0.3;
            this.scale.setTo(0.3, 0.3);
            this.inputEnabled = true; //W/o this the next event wont work, enables input
            game.input.onDown.add(unpause, this);

            this.events.onInputDown.add(function () {
                this.alpha = 0;
                if (!this.game.play) { //Play button does not exist
                    this.game.play = game.add.sprite(this.x - 35, this.y - 40, 'play');
                    this.game.play.scale.setTo(0.18);
                } else {
                    this.game.play.alpha = 1;
                }

                if (!game.paused) {//If not paused, pause
                    game.paused = true; 
                } 
            }, this); 

            this.events.onInputOver.add(function () {
                this.alpha = 1; //Fades in the button 
                this.game.canvas.style.cursor = "default"; 
            }, this); 

            this.events.onInputOut.add(function () {
                this.alpha = 0.3; //Fades it back out
                this.game.canvas.style.cursor = "none"; 
            }, this); 

            function unpause() {
                if (this.game.play) { //If play button exists hide it while pause button is brought back
                    this.game.play.alpha = 0;
                }

                this.alpha = 0.3;
                game.paused = false;
            }
        }
    }
}