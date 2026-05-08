class ThrowableObject extends MovableObject {


    IMAGES_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    hasSplashed = false;
    moveInterval;
    animInterval;

    constructor(x, y, direction) {
        super();
        this.loadImage(this.IMAGES_ROTATION[0]);
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.otherDirection = direction;
        this.throw();
    }

    /** Initiates the throwing mechanics and rotation */
    throw() {
        this.speedY = 15;
        this.applyGravity();
        this.moveInterval = setInterval(() => {
            if (gamePaused) return;
            if (this.hasSplashed) return;
            if (this.otherDirection) {
                this.x -= 8;
            } else {
                this.x += 8;
            }
            
            // Boden berühren -> Platz animation & Sound
            if (this.y >= 360) {
                this.y = 360; // Set to ground level exactly
                this.splash();
            }
        }, 25);

        this.animInterval = setInterval(() => {
            if (gamePaused) return;
            this.playAnimation(this.IMAGES_ROTATION);
        }, 50);
    }

    /** Plays splash animation and stops bottle movement */
    splash() {
        this.hasSplashed = true;
        audioHub.playSound('img/sounds/throwable/bottleBreak.mp3');
        this.speedY = 0;
        this.acceleration = 0;
        clearInterval(this.moveInterval);
        clearInterval(this.animInterval);

        let idx = 0;
        this.animInterval = setInterval(() => {
            if (idx < this.IMAGES_SPLASH.length) {
                this.img = this.imageCache[this.IMAGES_SPLASH[idx]];
                idx++;
            }
        }, 50);
    }


}