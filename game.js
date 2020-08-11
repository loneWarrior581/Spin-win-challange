//Set up basic game with Phaser
 
let config = {
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
let game = new Phaser.Game(config);

function preload() {
    //load an image
    console.log(this, "is the scene");
    this.load.image('background', "Assets/back.jpg");
    this.load.image('wheel', "Assets/wheel.png");
    this.load.image('stand', "Assets/stand.png");
    this.load.image('pin', "Assets/pin.png");
    this.load.image('logo', "Assets/spin-n-win-logo.png");
    this.load.audio("audio",'Assets/wheel-audio.mp3');
    this.load.audio("congo",'Assets/drum-roll.mp3');
    this.load.image('yougot', 'Assets/yougot.png');
    this.load.image('flags','Assets/flag.png');
    this.load.image('flag2','Assets/flag2.png');
    


}
function create() {
    let W = game.config.width;
    let H = game.config.height;

    this.flag=this.add.sprite(90,190,'flags').setScale(.40);
    this.flag.depth=5;
    this.flag.angle=-5;
    this.flag2=this.add.sprite(600,170,'flag2').setScale(.40);
    this.flag2.depth=1;
    this.flag2.angle=40;
    background=this.add.sprite(W / 2, H / 2, 'background').setScale(1.50);
    this.pin = this.add.sprite(W / 2, H / 2 - 150, 'pin').setScale(0.16);
    this.pin.depth = 5;
    this.stand=this.add.sprite(W / 2, H / 2 + 273, 'stand').setScale(0.16);
    this.wheel = this.add.sprite(W / 2, H/2 +60, "wheel");
    this.wheel.setScale(0.20);
    this.button = this.add.sprite(W / 2, 60, 'logo');
    this.yougot = this.add.sprite(W/2, H/2, 'yougot');
    this.yougot.visible = false;
    this.rollSound=this.sound.add("audio");
    this.drumRoll=this.sound.add("congo");
    this.button.on('pointerdown', spinwheel, this).setInteractive({cursor:'pointer'});
    this.button.setScale(.20);
   
}
function update() {
    console.log("In Update");
    //this.wheel.angle -= 1;

}

function spinwheel() {
    let W = game.config.width;
    let H = game.config.height;
    this.button.visible=false;
    
    console.log("Time to spin the wheel");
        let rounds = Phaser.Math.Between(2, 6);  //this gives the no of random rounds that the wheel is going to make i.e between 2-4
        let extra_degrees = Phaser.Math.Between(0, 11) * 30;
        let total_angle = rounds * 360 + extra_degrees;
        console.log(total_angle);
        let tot_round=Math.floor(extra_degrees/30);
        console.log(tot_round);
        let prizes = ["CB BOOK", "CB T-SHIRT", "2 EXTRA SPIN", "AMAZON VOUCHER", "50% OFF", "NETFLIX SUBS.", "100% OFF", "CB SWAGPACK", "70% OFF", "HARD LUCK", "35% OFF", "3000 CB CREDITS", ];
        this.rollSound.play();
        let tween = this.tweens.add({
            targets: this.wheel,
            angle: total_angle,
            ease: "Cubic.easeOut",
            duration: 5000
        })
        setTimeout(() => {
            console.log("Timeout to freeze the mouse")
            this.pin.visible = false;
            this.yougot.visible = true;
            this.wheel.visible=false;
            this.stand.visible=false;
            this.drumRoll.play();
            this.add.text(W / 2 - 135, H / 2 + 110, `${prizes[tot_round]}`, {
                fontSize: '40px',
                fontFamily: 'Times New Roman',
                color: 'rgb(221, 148, 29)',
                
                
            });
            console.log(this.add.text(),"this is the text properties")
            this.input.on("pointerdown", reset, this);
        }, 6000);
    

        console.log("this is tween", tween)
    
}    

function reset() {
    this.scene.restart();
    console.log("restarted the scene")

}
