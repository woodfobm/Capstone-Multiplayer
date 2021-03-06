﻿module MpPong.Client {
    export class GameEngine extends Phaser.Game {
        constructor() {
            super(900, 700, Phaser.CANVAS, 'content', null);
            this.state.add('Boot', Boot, false);
            this.state.add('Preloader', Preloader, false);
            this.state.add('MainMenu', MainMenu, false);
            this.state.add('Level01', Level01, false);
            this.state.add('Level02', Level02, false);
            this.state.add('Win', Win, false);
            this.state.add('Lose', Lose, false);
            //Adds our various states and starts our initial boot. This is where we would add more levels or 
            //potentially declare some different ones. Sort of like a Header file in other languages
            this.state.start('Boot');
            
        }
    }
}

window.onload = () => {
//No idea what this is, doing something with the game itself on load
    new MpPong.Client.GameEngine();
    
    var scheme = window.location.protocol == "https:" ? "wss" : "ws";
    var port = window.location.port ? (":" + document.location.port) : "";
    console.log(scheme + "://" + window.location.hostname + port + "/ws");
};