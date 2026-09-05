export class Loot {
    x;
    y;
    width;
    height;
    value;
    image;

    constructor (x, y, width, height, value, image) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.value = value;
        this.image = image;
    }

    draw(ctx) {
        ctx.drawImage(
            this.image,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}