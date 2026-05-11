/**
 * Class representing the main playable character.
 * @extends MovableObject
 */
class Character extends MovableObject{
    height = 230;
    width = 120;
    y = 200;
    energy = 180;
    IMAGES_WALKING = [
            'img/2_character_pepe/2_walk/W-21.png',
            'img/2_character_pepe/2_walk/W-22.png',
            'img/2_character_pepe/2_walk/W-23.png',
            'img/2_character_pepe/2_walk/W-24.png',
            'img/2_character_pepe/2_walk/W-25.png',
            'img/2_character_pepe/2_walk/W-26.png'
        ]
        IMAGES_JUMPING =[
            'img/2_character_pepe/3_jump/J-31.png',
            'img/2_character_pepe/3_jump/J-32.png',
            'img/2_character_pepe/3_jump/J-33.png',
            'img/2_character_pepe/3_jump/J-34.png',
            'img/2_character_pepe/3_jump/J-35.png',
            'img/2_character_pepe/3_jump/J-36.png',
            'img/2_character_pepe/3_jump/J-37.png',
            'img/2_character_pepe/3_jump/J-38.png',
            'img/2_character_pepe/3_jump/J-39.png'
        ]
        IMAGES_DEAD = [
            'img/2_character_pepe/5_dead/D-51.png',
            'img/2_character_pepe/5_dead/D-52.png',
            'img/2_character_pepe/5_dead/D-53.png',
            'img/2_character_pepe/5_dead/D-54.png',
            'img/2_character_pepe/5_dead/D-55.png',
            'img/2_character_pepe/5_dead/D-56.png',
            'img/2_character_pepe/5_dead/D-57.png' 
        ];
        IMAGES_HURT =[
            'img/2_character_pepe/4_hurt/H-41.png',
            'img/2_character_pepe/4_hurt/H-42.png',
            'img/2_character_pepe/4_hurt/H-43.png'
        ]

    world;
    currentImage = 0;
    speed = 10;
    coins = 0;
    bottles = 0;

    offset = {
        top: 120,
        left: 30,
        right: 30,
        bottom: 15
    };

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_SLEEP = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    lastActionTime = 0;

    /**
     * Creates an instance of Character.
     * @constructor
     */
    constructor() {
        super();
        this.loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SLEEP);
        this.applyGravity();
        this.lastActionTime = new Date().getTime();
        this.animate();
    }

    /**
     * Starts the animation and movement intervals for the character.
     */
    animate() {
        setInterval(() => {
            if (gamePaused) return;
            this.handleMovement();
        }, 1000 / 60);
        setInterval(() => {
            if (gamePaused) return;
            this.handleStateAnimations();
        }, 50);
    }

    /**
     * Increments the collected coins amount.
     */
    collectCoin() {
        this.coins += 20;
        if (this.coins > 100) {
            this.coins = 100;
        }
    }

    /**
     * Increments the collected bottles amount.
     */
    collectBottle() {
        this.bottles += 20;
        if (this.bottles > 100) {
            this.bottles = 100;
        }
    }

    /**
     * Handles keyboard input and character movement logic.
     */
    handleMovement() {
        if (!this.world || !this.world.keyboard || this.isDead()) return;
        
        // Fall faster when moving downwards
        if (this.speedY < 0 && this.isAboveGround()) {
            this.acceleration = 2.5; 
        } else if (!this.isAboveGround()) {
            this.acceleration = 1; 
        }

        let isWalking = false;
        
        if (this.world.keyboard.RIGHT && this.x <= this.world.level.level_end_x) {
            this.moveCharRight();
            isWalking = true;
        }
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveCharLeft();
            isWalking = true;
        }
        if (this.world.keyboard.SPACE && !this.isAboveGround()) this.jump();
        
        if (!isWalking || this.isAboveGround()) {
            audioHub.pauseSound('img/sounds/character/characterRun.mp3');
        } else {
            audioHub.playSound('img/sounds/character/characterRun.mp3');
        }
        
        this.world.camera_x = -this.x + 100;
        this.checkActivity();
    }

    /**
     * Executes movement to the right and updates direction.
     */
    moveCharRight() {
        this.otherDirection = false;
        this.moveRight();
    }

    /**
     * Executes movement to the left and updates direction.
     */
    moveCharLeft() {
        this.moveLeft();
        this.otherDirection = true;
    }

    /**
     * Records the last action time to manage idle states.
     */
    checkActivity() {
        let kb = this.world.keyboard;
        if (kb.RIGHT || kb.LEFT || kb.SPACE || kb.D) {
            this.lastActionTime = new Date().getTime();
        }
    }

    /**
     * Handles the visual state animations based on character status.
     */
    handleStateAnimations() {
        if (this.isDead()) this.playDeadAnimation();
        else if (this.isHurt()) this.playAnimation(this.IMAGES_HURT);
        else if (this.isAboveGround()) {
            if (this.jumpAnimationIndex === undefined) this.jumpAnimationIndex = 0;
            let frame = Math.floor(this.jumpAnimationIndex / 2); // 2 ticks per frame -> 100ms per frame
            if (frame < this.IMAGES_JUMPING.length) {
                this.img = this.imageCache[this.IMAGES_JUMPING[frame]];
                this.jumpAnimationIndex++;
            } else {
                this.img = this.imageCache[this.IMAGES_JUMPING[this.IMAGES_JUMPING.length - 1]];
            }
        }
        else {
            this.jumpAnimationIndex = 0;
            this.handleGroundAnimations();
        }
    }

    /**
     * Handles animations when the character is on the ground.
     */
    handleGroundAnimations() {
        let kb = this.world.keyboard;
        if (kb && (kb.RIGHT || kb.LEFT)) this.playAnimation(this.IMAGES_WALKING);
        else this.handleIdleAnimations();
    }

    /**
     * Manages idle and sleep animations based on inactivity duration.
     */
    handleIdleAnimations() {
        let timePassed = new Date().getTime() - this.lastActionTime;
        if (timePassed > 3000) {
            this.playAnimation(this.IMAGES_SLEEP);
            if (!this.isAboveGround()) audioHub.playSound('img/sounds/character/characterSnoring.mp3');
        } else {
            this.playAnimation(this.IMAGES_IDLE);
            audioHub.pauseSound('img/sounds/character/characterSnoring.mp3');
        }
    }

    /**
     * Plays the death animation sequence once.
     */
    playDeadAnimation() {
        if(!this.deadAnimationStarted) {
            audioHub.playSound('img/sounds/character/characterDead.wav');
            this.deadAnimationIndex = 0;
            this.deadAnimationStarted = true;
        }
        if (this.deadAnimationIndex < this.IMAGES_DEAD.length * 4) {
            let frame = Math.floor(this.deadAnimationIndex / 4);
            this.img = this.imageCache[this.IMAGES_DEAD[frame]];
            this.deadAnimationIndex++;
        } else {
            this.img = this.imageCache[this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1]];
        }
    }

    /**
     * Makes the character jump by applying vertical speed.
     */
    jump() {
        super.jump();
        this.speedY = 17.5; // Roughly 3/4 of the original jump height
        this.jumpAnimationIndex = 0;
        audioHub.playSound('img/sounds/character/characterJump.wav');
    }

    /**
     * Applies damage to the character and plays the hurt sound.
     */
    hit() {
        let wasHurt = this.isHurt();
        super.hit();
        if (!wasHurt && this.isHurt() && !this.isDead()) {
            audioHub.playSound('img/sounds/character/characterDamage.mp3');
        }
    }
}
