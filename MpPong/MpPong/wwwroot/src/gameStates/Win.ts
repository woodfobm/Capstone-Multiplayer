module MpPong.Client {
    export class Win extends Phaser.State {
        create() {
            this.game.add.text(this.world.centerX - 130, this.world.centerY - 100, "          You Win!\nWould you like to play again?", "red");
            setTimeout(function () {
                location.reload();
            }, 3000); //Need to make this an option for the user
        }
    }
}