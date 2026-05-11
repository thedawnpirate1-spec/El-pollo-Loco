/**
 * Class representing a moving background cloud.
 * @extends MovableObject
 */
class Cloud extends MovableObject{
    y=50;
    height = 250;
    width = 500;
    speed = 0.5;
    /**
     * Creates an instance of a cloud.
     * @constructor
     */
    constructor(){
        super();
        let cloudImages = [
            "img/5_background/layers/4_clouds/1.png",
            "img/5_background/layers/4_clouds/2.png"
        ];
        let randomImage = cloudImages[Math.floor(Math.random() * cloudImages.length)];
        this.loadImage(randomImage);
        this.x = Math.random() * 7000;
        this.animate();
    }

    /**
     * Starts the cloud movement to the left.
     */
    animate() {
        setInterval(() => {
            if (gamePaused) return;
            this.x -= this.speed;
        }, 1000/60);
    }
}