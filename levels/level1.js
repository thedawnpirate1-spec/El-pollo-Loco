/**
 * Global variable storing the initialized level.
 * @type {Level}
 */
let level1;
/**
 * Initializes Level 1 by creating all objects and setting the level1 variable.
 */
function initLevel() {
    level1 = new Level(
    [
        new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(),
        new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(),
        new Chicken(), new Chicken(), new Chicken(), new Chicken(),
        new ChickenSmall(), new ChickenSmall(), new ChickenSmall(), new ChickenSmall(), new ChickenSmall(),
        new ChickenSmall(), new ChickenSmall(), new ChickenSmall(), new ChickenSmall(), new ChickenSmall(),
        new Endboss(),
    ],
    [
        new Cloud(), new Cloud(), new Cloud(), new Cloud(), new Cloud(),
        new Cloud(), new Cloud(), new Cloud(), new Cloud(), new Cloud(),
        new Cloud(), new Cloud(), new Cloud(), new Cloud(), new Cloud(),
    ],
    [
        new BackgroundObject('img/5_background/layers/air.png', -719*2),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', -719*2),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', -719*2),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', -719*2),
        new BackgroundObject('img/5_background/layers/air.png', -719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

        new BackgroundObject('img/5_background/layers/air.png', 0,),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0,),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0,),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0,),
        new BackgroundObject('img/5_background/layers/air.png', 719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

        new BackgroundObject('img/5_background/layers/air.png', 719*2),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*2),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*2),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*2),
        new BackgroundObject('img/5_background/layers/air.png', 719*3),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*3),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*3),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*3),

        new BackgroundObject('img/5_background/layers/air.png', 719*4),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*4),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*4),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*4),
        new BackgroundObject('img/5_background/layers/air.png', 719*5),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*5),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*5),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*5),

        new BackgroundObject('img/5_background/layers/air.png', 719*6),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*6),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*6),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*6),
        new BackgroundObject('img/5_background/layers/air.png', 719*7),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*7),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*7),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*7),
        
        new BackgroundObject('img/5_background/layers/air.png', 719*8),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*8),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*8),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*8),

        new BackgroundObject('img/5_background/layers/air.png', 719*9),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*9),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*9),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*9),

        new BackgroundObject('img/5_background/layers/air.png', 719*10),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*10),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*10),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*10),
    ],
    [
        new Coin(300, 200), new Coin(450, 150), new Coin(600, 200), new Coin(900, 100),
        new Coin(1200, 150), new Coin(1500, 200), new Coin(1800, 150), new Coin(2100, 100),
        new Coin(2400, 200), new Coin(2700, 150), new Coin(3000, 100), new Coin(3300, 200),
        new Coin(3600, 150), new Coin(3900, 100), new Coin(4200, 200), new Coin(4500, 150),
        new Coin(4800, 100)
    ],
    [
        new Bottle(200, 360), new Bottle(400, 360), new Bottle(700, 360), new Bottle(1000, 360),
        new Bottle(1300, 360), new Bottle(1600, 360), new Bottle(1900, 360), new Bottle(2200, 360),
        new Bottle(2500, 360), new Bottle(2800, 360), new Bottle(3100, 360), new Bottle(3400, 360),
        new Bottle(3700, 360), new Bottle(4000, 360), new Bottle(4300, 360), new Bottle(4600, 360),
        new Bottle(4900, 360)
    ]
    );
}