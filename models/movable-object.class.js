/**
 * Base class for all moving objects in the game.
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject{
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    energy = 100;
    lastHit = 0;
    isFalling = false;

    /**
     * Applies gravity to the movable object.
     */
    applyGravity(){
        setInterval(() => {
            if (gamePaused) return;
            if(this.isAboveGround() || this.speedY > 0){
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                if (this.speedY < 0) this.isFalling = true;
            } else {
                this.resetFallStatus();
            }
        }, 1000/25);
    };

    /**
     * Resets the fall status and vertically positions the object when landing.
     */
    resetFallStatus() {
        if (this.y >= 200 && !(this instanceof ThrowableObject)) {
            this.y = 200;
            this.speedY = 0;
            setTimeout(() => this.isFalling = false, 100);
        }
    }

    /**
     * Checks if the object is currently above ground level.
     * @returns {boolean} True if above ground.
     */
    isAboveGround(){
        if(this instanceof ThrowableObject){
            return true;
        }else{
            return this.y < 200 || this.speedY > 0;
        }
    };

    
    /**
     * Checks for a collision with another object.
     * @param {MovableObject} mo - The object to check collision against.
     * @returns {boolean} True if colliding.
     */
    isColliding(mo){
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
        this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
        this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
        this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * Reduces object energy when hit.
     * @param {number} damage - The amount of damage to take (default 20).
     */
    hit(damage = 20){
        if (this.isHurt()) return;
        this.energy -= damage;
        if(this.energy < 0){
            this.energy = 0;
        }else{
            this.lastHit = new Date().getTime();
        }
    }
    /**
     * Checks if the object is currently in a hurt state.
     * @returns {boolean} True if hurt.
     */
    isHurt(){
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }
    /**
     * Checks if the object's energy is zero.
     * @returns {boolean} True if dead.
     */
    isDead(){
        return this.energy == 0;
    }

    /**
     * Moves the object to the right by its speed.
     */
    moveRight(){
        this.x += this.speed;
    };

    /**
     * Moves the object to the left by its speed.
     */
    moveLeft(){
        this.x -= this.speed;
    };

    /**
     * Plays an animation cycle through an array of images.
     * @param {Array<string>} images - The array of image paths.
     */
    playAnimation(images){
            let i = this.currentImage % images.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
    }

    /**
     * Applies an upward vertical speed.
     */
    jump(){
        this.speedY = 20;
    }
};
