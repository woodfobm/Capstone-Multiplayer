module MpPong.Client {
    export class Pause extends Phaser.Sprite {
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'pause', 1);
            this.anchor.setTo(0.5);
            game.add.existing(this);
            this.alpha = 0.3;
            this.scale.setTo(0.3, 0.3);
            this.inputEnabled = true; //W/o this the next event wont work, enables input
            game.input.onDown.add(unpause);
            this.events.onInputDown.add(function () {
                if (!game.paused) {//If not paused, pause
                   //this.pauseText = game.add.text(game.world.centerX, game.world.centerX + 100, "Paused", "red");
                    game.paused = true; 
                } 
            }); 

            this.events.onInputOver.add(function () {
                this.alpha = 1; //Fades in the button 
            }, this); 

            this.events.onInputOut.add(function () {
                this.alpha = 0.3; //Fades it back out
            }, this); 

            function unpause() {
                game.paused = false;
                //this.pauseText.kill();
            }
        }
    }
}