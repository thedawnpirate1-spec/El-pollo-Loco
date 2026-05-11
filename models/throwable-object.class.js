/**
 * Class representing a throwable object (salsa bottle).
 * @extends MovableObject
 */
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

    /**
     * Creates a throwable bottle object.
     * @param {number} x - The starting x-coordinate.
     * @param {number} y - The starting y-coordinate.
     * @param {boolean} direction - The direction to throw (true for left, false for right).
     * @constructor
     */
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

    /**
     * Initiates the throwing mechanics and rotation.
     */
    throw() {
        this.speedY = 15;
        this.applyGravity();
        this.startMovementInterval();
        this.startAnimationInterval();
    }

    /**
     * Starts the horizontal and vertical movement interval for the thrown object.
     */
    startMovementInterval() {
        this.moveInterval = setInterval(() => {
            if (gamePaused || this.hasSplashed) return;
            this.updatePosition();
            this.checkGroundContact();
        }, 25);
    }

    /**
     * Updates the horizontal position based on the throw direction.
     */
    updatePosition() {
        if (this.otherDirection) {
            this.x -= 8;
        } else {
            this.x += 8;
        }
    }

    /**
     * Checks if the bottle has hit the ground and triggers splash.
     */
    checkGroundContact() {
        if (this.y >= 360) {
            this.y = 360;
            this.splash();
        }
    }

    /**
     * Starts the rotation animation interval.
     */
    startAnimationInterval() {
        this.animInterval = setInterval(() => {
            if (gamePaused) return;
            this.playAnimation(this.IMAGES_ROTATION);
        }, 50);
    }

    /**
     * Plays the splash animation and stops bottle movement.
     */
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