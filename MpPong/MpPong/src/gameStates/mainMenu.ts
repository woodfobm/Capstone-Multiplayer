module MpPong.Client {
    export class MainMenu extends Phaser.State {    
        background: Phaser.Sprite;
        logo: Phaser.Sprite;

        create() {
            this.background = this.add.sprite(0, 0, 'titlepage');
            this.background.alpha = 0;
            //Scales background to fit the game screen no matter what (Might have issues on TV screen resolution or phone)
            this.background.width = this.game.width;
            this.background.height = this.game.height;
            this.logo = this.add.sprite(this.world.centerX, -300, 'logo');
            this.logo.anchor.setTo(0.5);
            this.add.tween(this.background).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
            this.add.tween(this.logo).to({ y: 220 }, 2000, Phaser.Easing.Elastic.Out, true, 500);
            // this.game.debug.text("Click the logo to start the game", 0, this.world.height, "red");
            this.input.onDown.addOnce(this.fadeOut, this);
        }

        fadeOut() {
        //Starts audio as we bring the game forward, should loop upon song completion
        //and work across all browsers due to the ogg format of the file
            this.add.audio('bgMusic', 1, true).play();
            this.add.tween(this.background).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            var tween = this.add.tween(this.logo).to({ y: 800 }, 2000, Phaser.Easing.Linear.None, true);
            //When done playing animations on the logo and background will start the actual game state
            tween.onComplete.add(this.startGame, this);
        }

        startGame() {
            this.game.state.start('Level01', true, false);
        }
    }
}