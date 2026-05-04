class Endboss extends MovableObject {
    height = 340;
    width = 270;
    y = 100;
    speed = 1.5;
    energy = 140;
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

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

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    offset = { top: 60, bottom: 20, left: 40, right: 40 };
    hadFirstContact = false;

    constructor() {
        super();
        this.loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2500;
        this.animate();
    }

    /** Starts the endboss animation and movement intervals */
    animate() {
        setInterval(() => {
            if (gamePaused) return;
            this.handleMovement();
        }, 1000 / 60);
        setInterval(() => {
            if (gamePaused) return;
            this.handleAnimations();
        }, 200);
        
        // Attack timer
        setInterval(() => {
            if (gamePaused) return;
            if (this.hadFirstContact && !this.isDead() && !this.isHurt()) {
                this.isAttacking = true;
                setTimeout(() => {
                    this.isAttacking = false;
                }, 1600); // 8 frames * 200ms = 1600ms
            }
        }, 4000); // Trigger attack every 4 seconds
    }

    /** Handles the horizontal movement of the endboss */
    handleMovement() {
        if (this.hadFirstContact && !this.isDead() && !this.isAttacking) {
            this.moveLeft();
            this.otherDirection = false;
        }
    }

    /** Manages the visual state animations of the endboss */
    handleAnimations() {
        if (this.isDead()) {
            this.playDeadAnimation();
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.isAttacking) {
            this.playAnimation(this.IMAGES_ATTACK);
        } else if (this.hadFirstContact) {
            this.playAnimation(this.IMAGES_WALKING);
        } else {
            this.playAnimation(this.IMAGES_ALERT);
        }
    }

    /** Plays the dead animation sequence only once */
    playDeadAnimation() {
        if (!this.deadAnimationStarted) {
            this.deadAnimationIndex = 0;
            this.deadAnimationStarted = true;
        }
        if (this.deadAnimationIndex < this.IMAGES_DEAD.length) {
            this.img = this.imageCache[this.IMAGES_DEAD[this.deadAnimationIndex]];
            this.deadAnimationIndex++;
        } else {
            this.img = this.imageCache[this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1]];
        }
    }
}