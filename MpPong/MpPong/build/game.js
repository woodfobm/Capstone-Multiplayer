var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MpPong;
(function (MpPong) {
    var Client;
    (function (Client) {
        var GameEngine = (function (_super) {
            __extends(GameEngine, _super);
            function GameEngine() {
                var _this = _super.call(this, 1024, 800, Phaser.AUTO, 'content', null) || this;
                _this.state.add('Boot', Client.Boot, false);
                _this.state.add('Preloader', Client.Preloader, false);
                _this.state.add('MainMenu', Client.MainMenu, false);
                _this.state.add('Level01', Client.Level01, false);
                _this.state.start('Boot');
                return _this;
            }
            return GameEngine;
        }(Phaser.Game));
        Client.GameEngine = GameEngine;
    })(Client = MpPong.Client || (MpPong.Client = {}));
})(MpPong || (MpPong = {}));
window.onload = function () {
    new MpPong.Client.GameEngine();
};
var MpPong;
(function (MpPong) {
    var Client;
    (function (Client) {
        var Ball = (function (_super) {
            __extends(Ball, _super);
            function Ball(game, x, y, xVelocity, yVelocity) {
                var _this = _super.call(this, game, x, y, 'ball', 1) || this;
                _this.anchor.setTo(0.5);
                game.add.existing(_this);
                game.physics.enable(_this);
                _this.body.collideWorldBounds = true;
                _this.body.bounce.set(1);
                _this.body.velocity.x = xVelocity;
                _this.body.velocity.y = yVelocity;
                return _this;
            }
            return Ball;
        }(Phaser.Sprite));
        Client.Ball = Ball;
    })(Client = MpPong.Client || (MpPong.Client = {}));
})(MpPong || (MpPong = {}));
var MpPong;
(function (MpPong) {
    var Client;
    (function (Client) {
        var LBound = (function (_super) {
            __extends(LBound, _super);
            function LBound(game, x, y) {
                var _this = _super.call(this, game, x, y, 'lBound', 1) || this;
                _this.anchor.setTo(0.5);
                game.add.existing(_this);
                game.physics.enable(_this);
                _this.body.immovable = true;
                return _this;
            }
            return LBound;
        }(Phaser.Sprite));
        Client.LBound = LBound;
    })(Client = MpPong.Client || (MpPong.Client = {}));
})(MpPong || (MpPong = {}));
var MpPong;
(function (MpPong) {
    var Client;
    (function (Client) {
        var Player = (function (_super) {
            __extends(Player, _super);
            function Player(game, x, y) {
                var _this = _super.call(this, game, x, y, 'player1', 1) || this;
                _this.anchor.setTo(0.5);
                game.add.existing(_this);
                game.physics.enable(_this);
                _this.body.collideWorldBounds = true;
                _this.body.immovable = true;
                return _this;
            }
            Player.prototype.update = function () {
                this.body.velocity.y = 0;
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                    this.body.velocity.y = -800;
                }
                else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
                    this.body.velocity.y = 800;
                }
            };
            return Player;
        }(Phaser.Sprite));
        Client.Player = Player;
    })(Client = MpPong.Client || (MpPong.Client = {}));
})(MpPong || (MpPong = {}));
var MpPong;
(function (MpPong) {
    var Client;
    (function (Client) {
        var RBound = (function (_super) {
            __extends(RBound, _super);
            function RBound(game, x, y) {
                var _this = _super.call(this, game, x, y, 'rBound', 1) || this;
                _this.anchor.setTo(0.5);
                game.add.existing(_this);
                game.physics.enable(_this);
                _this.body.immovable = true;
                return _this;
            }
            return RBound;
        }(Phaser.Sprite));
        Client.RBound = RBound;
    })(Client = MpPong.Client || (MpPong.Client = {}));
})(MpPong || (MpPong = {}));
var MpPong;
(function (MpPong) {
    var Client;
    (function (Client) {
        var Boot = (function (_super) {
            __extends(Boot, _super);
            function Boot() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Boot.prototype.preload = function () {
            };
            Boot.prototype.create = function () {
                this.stage.setBackgroundColor(0x061639);
                this.input.maxPointers = 1;
                this.stage.disableVisibilityChange = true;
                if (this.game.device.desktop) {
                    this.scale.pageAlignHorizontally = true;
                }
                else {
                    this.scale.minWidth = 480;
                    this.scale.minHeight = 260;
                    this.scale.maxWidth = 1024;
                    this.scale.maxHeight = 768;
                    this.scale.forceLandscape = true;
                    this.scale.pageAlignHorizontally = true;
                    this.scale.refresh();
                }
                this.game.state.start('Preloader', true, false);
            };
            return Boot;
        }(Phaser.State));
        Client.Boot = Boot;
    })(Client = MpPong.Client || (MpPong.Client = {}));
})(MpPong || (MpPong = {}));
var MpPong;
(function (MpPong) {
    var Client;
    (function (Client) {
        var Level01 = (function (_super) {
            __extends(Level01, _super);
            function Level01() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.p1Score = 0;
                _this.p2Score = 0;
                _this.xVelocity = 500;
                _this.yVelocity = 500;
                return _this;
            }
            Level01.prototype.create = function () {
                this.physics.startSystem(Phaser.Physics.ARCADE);
                this.player = new Client.Player(this.game, this.world.centerX - 500, this.world.centerX);
                this.player.anchor.setTo(0, 5);
                this.player2 = new Client.Player(this.game, this.world.centerX + 475, this.world.centerX);
                this.player2.anchor.setTo(0, 5);
                this.lBound = new Client.LBound(this.game, (this.world.centerX - this.world.centerX), this.world.centerX);
                this.rBound = new Client.RBound(this.game, (this.world.centerX + this.world.centerX), this.world.centerX);
                this.p1ScoreText = this.add.text((this.world.centerX - (this.world.centerX - 300)), this.world.centerX - 500, 'P1 Score: 0', { fontSize: '32px', fill: '#000' });
                this.p2ScoreText = this.add.text((this.world.centerX + (this.world.centerX - 450)), this.world.centerX - 500, 'P2 Score: 0', { fontSize: '32px', fill: '#000' });
                this.time.events.add(Phaser.Timer.SECOND * 2, this.resetBall, this);
            };
            Level01.prototype.createBall = function () {
                this.ball = new Client.Ball(this.game, this.world.centerX, this.world.centerX, this.xVelocity, this.yVelocity);
                this.ball.anchor.setTo(0, 5);
            };
            Level01.prototype.resetBall = function (score) {
                if (this.ball) {
                    this.ball.kill();
                }
                if (score === 1) {
                    this.xVelocity = Math.floor(Math.random() * (0 + (-500))) + (-500);
                    this.yVelocity = Math.floor(Math.random() * (0 + (-500))) + (-500);
                }
                else {
                    this.xVelocity = Math.floor(Math.random() * (500 + 0)) + (0);
                    this.yVelocity = Math.floor(Math.random() * (500 + 0)) + (0);
                }
                this.time.events.add(Phaser.Timer.SECOND, this.createBall, this);
            };
            Level01.prototype.lBoundHit = function () {
                this.p2Score += 1;
                this.p2ScoreText.text = 'P2 Score: ' + this.p2Score;
                this.resetBall(2);
            };
            Level01.prototype.rBoundHit = function () {
                this.p1Score += 1;
                this.p1ScoreText.text = 'P1 Score: ' + this.p1Score;
                this.resetBall(1);
            };
            Level01.prototype.powerMode = function () {
                this.stage.backgroundColor = Phaser.Color.getRandomColor(50, 255, 255);
                this.player.tint = Math.random() * 0xffffff;
                this.player2.tint = Math.random() * 0xffffff;
                this.ball.tint = Math.random() * 0xffffff;
            };
            Level01.prototype.update = function () {
                this.physics.arcade.collide(this.ball, this.player);
                this.physics.arcade.collide(this.ball, this.player2);
                this.physics.arcade.collide(this.ball, this.lBound, this.lBoundHit, null, this);
                this.physics.arcade.collide(this.ball, this.rBound, this.rBoundHit, null, this);
            };
            return Level01;
        }(Phaser.State));
        Client.Level01 = Level01;
    })(Client = MpPong.Client || (MpPong.Client = {}));
})(MpPong || (MpPong = {}));
var MpPong;
(function (MpPong) {
    var Client;
    (function (Client) {
        var MainMenu = (function (_super) {
            __extends(MainMenu, _super);
            function MainMenu() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MainMenu.prototype.create = function () {
                this.background = this.add.sprite(0, 0, 'titlepage');
                this.background.alpha = 0;
                this.background.width = this.game.width;
                this.background.height = this.game.height;
                this.logo = this.add.sprite(this.world.centerX, -300, 'logo');
                this.logo.anchor.setTo(0.5);
                this.add.tween(this.background).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
                this.add.tween(this.logo).to({ y: 220 }, 2000, Phaser.Easing.Elastic.Out, true, 500);
                this.input.onDown.addOnce(this.fadeOut, this);
            };
            MainMenu.prototype.fadeOut = function () {
                this.add.audio('bgMusic', 1, true).play();
                this.add.tween(this.background).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
                var tween = this.add.tween(this.logo).to({ y: 800 }, 2000, Phaser.Easing.Linear.None, true);
                tween.onComplete.add(this.startGame, this);
            };
            MainMenu.prototype.startGame = function () {
                this.game.state.start('Level01', true, false);
            };
            return MainMenu;
        }(Phaser.State));
        Client.MainMenu = MainMenu;
    })(Client = MpPong.Client || (MpPong.Client = {}));
})(MpPong || (MpPong = {}));
var MpPong;
(function (MpPong) {
    var Client;
    (function (Client) {
        var Preloader = (function (_super) {
            __extends(Preloader, _super);
            function Preloader() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Preloader.prototype.preload = function () {
                this.loaderText = this.game.add.text(this.world.centerX, 200, "Loading...", { font: "36px Arial", fill: "#A9A91111", align: "center" });
                this.loaderText.anchor.setTo(0.5);
                this.load.image('player1', './assets/sprites/p1Bar.png');
                this.load.image('player2', './assets/sprites/p1Bar.png');
                this.load.image('ball', './assets/sprites/ball.png');
                this.load.image('lBound', './assets/sprites/Bound.png');
                this.load.image('rBound', './assets/sprites/Bound.png');
                this.load.image('titlepage', './assets/ui/bg.png');
                this.load.image('logo', './assets/ui/logo.png');
                this.load.audio('bgMusic', './assets/sounds/bgMusic.ogg', true);
            };
            Preloader.prototype.create = function () {
                var tween = this.add.tween(this.loaderText).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
                tween.onComplete.add(this.startMainMenu, this);
            };
            Preloader.prototype.startMainMenu = function () {
                this.game.state.start('MainMenu', true, false);
            };
            return Preloader;
        }(Phaser.State));
        Client.Preloader = Preloader;
    })(Client = MpPong.Client || (MpPong.Client = {}));
})(MpPong || (MpPong = {}));
//# sourceMappingURL=game.js.map