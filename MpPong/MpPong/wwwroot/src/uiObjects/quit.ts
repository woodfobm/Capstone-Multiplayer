module MpPong.Client {
    export class Quit extends Phaser.Sprite {
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'quit', 1);
            this.anchor.setTo(0.5);
            game.add.existing(this);
            this.alpha = 0.3;
            this.scale.setTo(0.3, 0.3);
            this.inputEnabled = true; //W/o this the next event wont work, enables input

            this.events.onInputOver.add(function () {
                this.alpha = 1; //Fades in the button 
            }, this);

            this.events.onInputOut.add(function () {
                this.alpha = 0.3; //Fades it back out
            }, this); 

            this.events.onInputDown.add(function () {
                game.destroy();//Destroy all our hard work.
            });   

        }
    }
}