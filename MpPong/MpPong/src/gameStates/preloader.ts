module MpPong.Client {
    export class Preloader extends Phaser.State {
        loaderText: Phaser.Text;

        preload() {
            this.loaderText = this.game.add.text(this.world.centerX, 200, "Loading...",
                { font: "18px Arial", fill: "#A9A91111", align: "center" });
            this.loaderText.anchor.setTo(0.5);
            this.load.image('player1', './assets/sprites/p1Bar.png');
            this.load.image('player2', './assets/sprites/p1Bar.png');
            this.load.image('ball', './assets/sprites/ball.png');
            this.load.image('titlepage', './assets/ui/bg.png');
            this.load.image('logo', './assets/ui/logo.png');
            this.load.audio('click', './assets/sounds/click.ogg', true);    
        }

        create() {
            var tween = this.add.tween(this.loaderText).to({ alpha: 0 }, 2000,
                Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);
        }

        startMainMenu() {
            this.game.state.start('MainMenu', true, false);
        }
    }
}