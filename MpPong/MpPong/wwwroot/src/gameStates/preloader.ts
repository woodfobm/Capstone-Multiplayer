module MpPong.Client {
    export class Preloader extends Phaser.State {
        loaderText: Phaser.Text;

        preload() { // Preloads assets and sets them up so that we can call them by their key (player1, ball logo etc) in other files
            this.loaderText = this.game.add.text(this.world.centerX, 200, "Loading...",
                { font: "36px Arial", fill: "#A9A91111", align: "center" }); //Won't be seen unless game gets big enough that loading is necessary
            this.loaderText.anchor.setTo(0.5);
            this.load.image('player1', 'build/assets/sprites/p1Bar.png');
            this.load.image('paddleAi', 'build/assets/sprites/p1Bar.png');

            this.load.image('ball', 'build/assets/sprites/ball.png');
            this.load.image('lBound', 'build/assets/sprites/Bound.png');
            this.load.image('rBound', 'build/assets/sprites/Bound.png');
            this.load.image('titlepage', 'build/assets/ui/bg.png');
            this.load.image('logo', 'build/assets/ui/logo.png');
            this.load.image('pause', 'build/assets/ui/pause.png');
            this.load.image('quit', 'build/assets/ui/quit.jpg');
            this.load.image('full', 'build/assets/ui/full.png');
            this.load.audio('bgMusic', 'build/assets/sounds/bgMusic.ogg', true)
        }

        create() {
            var tween = this.add.tween(this.loaderText).to({ alpha: 0 }, 2000,
                Phaser.Easing.Linear.None, true);
                //Once intro logo animation is complete passes to startMainMenu and runs the title screen
            tween.onComplete.add(this.startMainMenu, this);
        }

        startMainMenu() {
        //Passes to the mainMenu.ts file
            this.game.state.start('MainMenu', true, false);
        }
    }
}