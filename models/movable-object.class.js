class MovableObject extends DrawableObject{
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    energy = 100;
    lastHit = 0;

    applyGravity(){
        setInterval(() => {
            if (gamePaused) return;
            if(this.isAboveGround() || this.speedY > 0){
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                if (this.speedY < 0) this.isFalling = true;
            } else {
                // Reset falling speed when on ground
                if (this.y >= 180 && !(this instanceof ThrowableObject)) {
                    this.y = 180;
                    this.speedY = 0;
                    setTimeout(() => this.isFalling = false, 100); // 100ms grace period for jump attacks
                }
            }
        }, 1000/25);
    };

    isAboveGround(){
        if(this instanceof ThrowableObject){
            return true;
        }else{
            return this.y <180;
        }
    };

    
    isColliding(mo){
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
        this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
        this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
        this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    hit(){
        if (this.isHurt()) return;
        this.energy -= 20;
        if(this.energy < 0){
            this.energy = 0;
        }else{
            this.lastHit = new Date().getTime();
        }
    }
    isHurt(){
        let timepassed = new Date().getTime() - this.lastHit; // Time in ms
        timepassed = timepassed / 1000; // Time in s
        return timepassed < 0.5; // 0.5 second hurt status
    }
    isDead(){
        return this.energy == 0;
    }

    moveRight(){
        this.x += this.speed;
    };

    moveLeft(){
        this.x -= this.speed;
    };

    playAnimation(images){
            let i = this.currentImage % images.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
    }

    jump(){
        this.speedY = 20;
    }
};
