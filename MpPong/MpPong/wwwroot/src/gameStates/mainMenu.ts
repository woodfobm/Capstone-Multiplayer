module MpPong.Client {
    export class MainMenu extends Phaser.State {
        logo: Phaser.Sprite;
        mainMenutxt: Phaser.Text;
        singlePlayertxt: Phaser.Text;
        multiPlayertxt: Phaser.Text;
        highscoretxt: Phaser.Text;

        create() {
            //creating the logo objects
            this.logo = this.add.sprite(this.world.centerX, -300, 'logo');
            this.logo.anchor.setTo(0.5);

            // Creating the text objects
            this.mainMenutxt = this.add.text(this.world.centerX, -200, "Main Menu",
                { font: "10rem Joystick, Arial", fill: "#FFF", align: "center" });

            this.singlePlayertxt = this.add.text(this.world.centerX, -200, "Single Player",
                { font: "4rem Joystick, Arial", fill: "#FFF", align: "center" });

            this.multiPlayertxt = this.add.text(this.world.centerX, -200, "Multi-Player",
                { font: "4rem Joystick, Arial", fill: "#FFF", align: "center" });

            this.highscoretxt = this.add.text(this.world.centerX, -200, "Hi-Scores",
                { font: "4rem Joystick, Arial", fill: "#FFF", align: "center" });

            // LOGO ANIMATION
            this.add.tween(this.logo).to({ y: 120 }, 1800, Phaser.Easing.Elastic.Out, true, 500);

            // MAIN MENU ANIMATIONS
            this.add.tween(this.mainMenutxt).to({ y: 245 }, 1850, Phaser.Easing.Elastic.Out, true, 500);
            this.add.tween(this.singlePlayertxt).to({ y: 350 }, 1900, Phaser.Easing.Elastic.Out, true, 500);
            this.add.tween(this.multiPlayertxt).to({ y: 385 }, 1950, Phaser.Easing.Elastic.Out, true, 500);
            this.add.tween(this.highscoretxt).to({ y: 420 }, 2000, Phaser.Easing.Elastic.Out, true, 500);

            // Replace this with different options
            this.input.onDown.addOnce(this.fadeOut, this);
        }

        fadeOut() {
            //Starts audio as we bring the game forward, should loop upon song completion
            //and work across all browsers due to the ogg format of the file
            //0.05 is level the audio will play at
            this.add.audio('bgMusic', 1, true).play().volume = 0.05; // Have to set this or its too dang loud!
            //this.add.tween(this.background).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            var tween = this.add.tween(this.logo).to({ y: 800 }, 2000, Phaser.Easing.Linear.None, true);
            //When done playing animations on the logo and background will start the actual game state
            tween.onComplete.add(this.startGame, this);
        }

        startGame() {
            this.game.state.start('Level01', true, false);
            // Destroying the logo and text objects to cleaar the screen
            this.logo.destroy();
            this.mainMenutxt.destroy();
            this.singlePlayertxt.destroy();
            this.multiPlayertxt.destroy();
            this.highscoretxt.destroy();
        }
    }
}