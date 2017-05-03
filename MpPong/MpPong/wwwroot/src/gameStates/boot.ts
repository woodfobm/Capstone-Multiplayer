module MpPong.Client {
    export class Boot extends Phaser.State {
        preload() {
            //You can preload an image here if you dont want to use text for the loading screen
        }

        create() {
        //Sets background color below Could maybe cycle this 
            this.stage.backgroundColor = '#298AB4';
            this.input.maxPointers = 1; //Not sure if we need to change this with the MP aspect?
            this.stage.disableVisibilityChange = true;



            if (this.game.device.desktop) {
                this.scale.pageAlignHorizontally = true;
                //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            } else {
                // mobile
                //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                this.scale.minWidth = 480;
                this.scale.minHeight = 260;
                this.scale.maxWidth = 1024;
                this.scale.maxHeight = 768;
                this.scale.forceLandscape = true;
                this.scale.pageAlignHorizontally = true;
                this.scale.refresh();
            }
            //Passes to the preloader state after initial booting is completed
            this.game.state.start('Preloader', true, false);
        }
    }
}