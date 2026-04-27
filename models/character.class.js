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
            'img/2_character_pepe/3_jump/J-39.png',
        ]
    world;
    currentImage = 0;
    speed = 10;

    constructor(){
        super();
        this.loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.applyGravity();
        this.animate();
    }
    animate(){
        setInterval(() => {
            if (this.world && this.world.keyboard) {
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
            if (this.world && this.world.keyboard) {

                if (this.isAboveGround()){
                    //Jump animation
                    this.playAnimation(this.IMAGES_JUMPING);
                } else {

                    if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT){
                        //Walk animation
                        this.playAnimation(this.IMAGES_WALKING);
                    }
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