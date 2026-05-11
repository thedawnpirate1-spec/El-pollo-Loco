/**
 * Class representing the character health status bar in the UI.
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject{
    IMAGES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    IMAGES_BOTTLE = [
        
    ]
    /**
     * Creates an instance of StatusBar for health.
     * @constructor
     */
    constructor(){
        super();
        this.loadImages(this.IMAGES_HEALTH);
        this.x = 40;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }
    /**
     * Sets the percentage of health to update the visual bar.
     * @param {number} percentage - The health percentage.
     */
    setPercentage(percentage){
        this.percentage = percentage;
        let imagePath = this.IMAGES_HEALTH[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath];
    }

    /**
     * Resolves the appropriate image index based on the health percentage.
     * @returns {number} The image index to use from the IMAGES_HEALTH array.
     */
    resolveImageIndex(){
        if(this.percentage == 100){
            return 5;
        }else if(this.percentage > 80){
            return 4;
        }else if(this.percentage > 60){
            return 3;
        }else if(this.percentage > 40){
            return 2;
        }else if(this.percentage > 20){
            return 1;
        }else{
            return 0;
        }
    }
};