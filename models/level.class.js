/**
 * Class representing a level structure and its contents.
 */
class Level{
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    level_end_x = 5600;
    
    /**
     * Creates a new level instance.
     * @param {Array<MovableObject>} enemies - The enemies in the level.
     * @param {Array<Cloud>} clouds - The background clouds in the level.
     * @param {Array<BackgroundObject>} backgroundObjects - The background objects.
     * @param {Array<Coin>} coins - The collectable coins.
     * @param {Array<Bottle>} bottles - The collectable bottles.
     * @constructor
     */
    constructor(enemies, clouds, backgroundObjects, coins, bottles){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    };
}