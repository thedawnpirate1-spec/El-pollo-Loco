class Character extends MovableObject{
    height = 230;
    width = 120;
    y = 200;
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

    collectCoin() {
        this.coins += 20;
        if (this.coins > 100) {
            this.coins = 100;
        }
    }

    collectBottle() {
        this.bottles += 20;
        if (this.bottles > 100) {
            this.bottles = 100;
        }
    }

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

    constructor(){
        super();
        this.loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.applyGravity();
        this.animate();
    }
    animate(){
        setInterval(() => {
            if (this.world && this.world.keyboard && !this.isDead()) {
                if(this.world.keyboard.RIGHT && this.x <= this.world.level.level_end_x){
                    this.otherDirection = false;
                    this.moveRight();
                }
                if(this.world.keyboard.LEFT && this.x > 0){
                    this.moveLeft();
                    this.otherDirection = true;
                }
                this.world.camera_x = -this.x +100;

                if(this.world.keyboard.SPACE && !this.isAboveGround()){
                    this.jump();
                }
            }
        }, 1000/60);

        setInterval(() => {
            if (this.isDead()){
                if(!this.deadAnimationStarted) {
                    this.deadAnimationIndex = 0;
                    this.deadAnimationStarted = true;
                }
                if (this.deadAnimationIndex < this.IMAGES_DEAD.length * 4) { // Slow down: 4 ticks per frame (200ms)
                    let frame = Math.floor(this.deadAnimationIndex / 4);
                    this.img = this.imageCache[this.IMAGES_DEAD[frame]];
                    this.deadAnimationIndex++;
                } else {
                    this.img = this.imageCache[this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1]];
                }
            }else if(this.isHurt()){
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()){
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                if(this.world && this.world.keyboard && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)){
                    this.playAnimation(this.IMAGES_WALKING);
                } else {
                    this.playAnimation(this.IMAGES_IDLE);
                }
            }
        }, 50);
    }

    offset = {
        top: 100,
        left: 20,
        right: 20,
        bottom: 0
    };
    
}