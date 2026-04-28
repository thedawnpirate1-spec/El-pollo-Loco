class Endboss extends MovableObject{
    height = 340;
    width = 270;
    
    IMAGES_ALERT = [
    'img/4_enemie_boss_chicken/2_alert/G5.png',
    'img/4_enemie_boss_chicken/2_alert/G6.png',
    'img/4_enemie_boss_chicken/2_alert/G7.png',
    'img/4_enemie_boss_chicken/2_alert/G8.png',
    'img/4_enemie_boss_chicken/2_alert/G9.png',
    'img/4_enemie_boss_chicken/2_alert/G10.png',
    'img/4_enemie_boss_chicken/2_alert/G11.png',
    'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];
    IMAGES_WALKING = [
    'img/4_enemie_boss_chicken/1_walk/G1.png',
    'img/4_enemie_boss_chicken/1_walk/G2.png',
    'img/4_enemie_boss_chicken/1_walk/G3.png',
    'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    offset = {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20
    };
    hadFirstContact = false;

    constructor(){
        super();
        this.loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 2500; 
        this.y = 100;
        this.speed = 1.5;
        this.animate();
    }
    animate(){
        setInterval(() => {
            if(this.hadFirstContact){
                this.moveLeft();
                this.otherDirection = false;
            }
        }, 1000/60);

        setInterval(() => {
            if(this.hadFirstContact){
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.playAnimation(this.IMAGES_ALERT);
            }
        }, 200);
    }
}