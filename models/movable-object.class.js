class MovableObject{
    x;
    y;
    img;
    height = 100;
    width = 100;

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
