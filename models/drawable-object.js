/**
 * Class representing a base drawable object in the game.
 */
class DrawableObject {
img;
imageCache = {};
currentImage = 0;
width = 100;
height = 150;
x = 120;
y = 250;
offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
};

    /**
     * Draws the image on the canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    };

    /**
     * Draws a debug frame around the object for collision detection.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawFrame(ctx){
        if(this instanceof Character || this.constructor.name === 'Chicken' || this.constructor.name === 'ChickenSmall' || this.constructor.name === 'Endboss' || this.constructor.name === 'Coin'){
            ctx.beginPath();
            ctx.lineWidth = "4"; 
            ctx.strokeStyle = "transparent"; 
            ctx.rect(
                this.x + this.offset.left,
                this.y + this.offset.top,
                this.width - this.offset.left - this.offset.right,
                this.height - this.offset.top - this.offset.bottom
            );
            ctx.stroke();
        }
    }
    /**
     * Loads a single image.
     * @param {string} path - The path to the image.
     */
    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads an array of images into the image cache.
     * @param {Array<string>} arr - The array of image paths.
     */
   loadImages(arr){
    arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    };
    
}