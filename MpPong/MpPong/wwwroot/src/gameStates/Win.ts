module MpPong.Client {
    export class Win extends Phaser.State {
        mainMenutxt: Phaser.Text;
        exitGametxt: Phaser.Text;
        ai2: PaddleAi;
        ai3: PaddleAi;
        ball: Ball;

        preload() {
            this.load.image('ball', 'build/assets/sprites/ball.png');
            this.load.image('paddleAi', 'build/assets/sprites/p1Bar.png');
        }

        create() {
            this.game.canvas.style.cursor = "default";
            this.physics.startSystem(Phaser.Physics.ARCADE);//Starts physics system for game and begins creating our player and ball objects
            this.ai2 = new PaddleAi(this.game, this.world.centerX - 500, this.world.centerX);
            this.ai3 = new PaddleAi(this.game, this.world.centerX + 475, this.world.centerX);
            this.ball = new Ball(this.game, this.world.centerX, this.world.centerX, 800, 800);

            this.game.add.text(this.world.centerX - 160, this.world.centerY - 310, "               You Win!\nWould you like to play again?", "red");
            this.mainMenutxt = this.game.add.text(this.world.centerX - 400, this.world.centerY - 200, "Return to Main Menu",
                { font: "10rem Joystick, Arial", fill: "#FFF", align: "center" });
            this.mainMenutxt.inputEnabled = true;
            this.mainMenutxt.events.onInputDown.add(function () {
                location.reload();
            }, this);

            this.exitGametxt = this.game.add.text(this.world.centerX - 160, this.world.centerY - 50, "Exit Game",
                { font: "10rem Joystick, Arial", fill: "#FFF", align: "center" });
            this.exitGametxt.inputEnabled = true;
            this.exitGametxt.events.onInputDown.add(function () {
                location.assign("https://www.google.com/");
            }, this);
            setTimeout(function () {
                location.reload();
            }, 30000); //Need to make this an option for the user
        }

        aiFollow2() {
            this.ai2.body.y = 0;
            if (this.ball.body.velocity.y >= 0) {
                this.game.physics.arcade.moveToXY(this.ai2, this.ai2.x, (this.ai2.body.y - this.ball.body.y), -850); // Move down
            } else if (this.ball.body.velocity.y < 0) {
                this.game.physics.arcade.moveToXY(this.ai2, this.ai2.x, (this.ai2.body.y - this.ball.body.y), 850); //Move up
            }
        }

        aiFollow3() {
            this.ai3.body.y = 0;
            if (this.ball.body.velocity.y >= 0) {
                this.game.physics.arcade.moveToXY(this.ai3, this.ai3.x, (this.ai3.body.y - this.ball.body.y), -500); // Move down
            } else if (this.ball.body.velocity.y < 0) {
                this.game.physics.arcade.moveToXY(this.ai3, this.ai3.x, (this.ai3.body.y - this.ball.body.y), 500); //Move up
            }
        }

        update() {
            this.time.events.add(Phaser.Timer.SECOND * 1, this.aiFollow2, this);
            this.time.events.add(Phaser.Timer.SECOND * 2, this.aiFollow3, this);
        }
    }
}