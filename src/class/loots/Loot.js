export class Loot {
    game;
    x;
    y;
    value;
    image;
    WIDTH = 15;
    HEIGHT = 15;

    constructor (game, x, y, value, image) {
        this.game = game
        this.x = x;
        this.y = y;
        this.value = value;
        this.image = image;
    }

    draw(ctx) {
        ctx.drawImage(
            this.image,
            this.x,
            this.y,
            this.WIDTH,
            this.HEIGHT
        );
    }

    pickup(player) {
        player.gold += this.value;
        this.game.loots = this.game.loots.filter((loot) => loot !== this)
    }
}