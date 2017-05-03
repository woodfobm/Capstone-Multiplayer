module MpPong.Client {
    export class Lose extends Phaser.State {
        create() {
            this.game.add.text(this.world.centerX - 130, this.world.centerY - 100, "          You lose!\n Go give it another go!", "red");
            setTimeout(function () {
                location.reload();
            }, 3000); //Need to make this an option for the user
            //Apparently if we try to skip to MainMenu all assets are "unloaded" so errors happen
            //Nothing gets reset either so...this is the easiest thing to do
            //location.reload();
        }
    }
}