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

    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    };

    drawFrame(ctx){
        if(this instanceof Character || this instanceof Chicken || this instanceof Endboss || this.constructor.name === 'Coin'){
            ctx.beginPath();
            ctx.lineWidth = "5"; 
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
     * @param {Array} arr -['img/image1.png', 'img/image2.png']
     */
    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

   loadImages(arr){
    arr.forEach((path) => {
        let img = new Image();
        img.src = path;
        this.imageCache[path] = img;
        });
    };
    
}