class MovableObject{
    x;
    y;
    img;

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }
    moveRight(){
        console.log('move right');
    }
    moveLeft(){
        console.log('move left');
    }
}
