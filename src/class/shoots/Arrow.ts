type Rect = {
    x: number,
    y: number,
    w: number,
    h: number
};

export class Arrow {
    x: number;
    y: number;
    dir: number;
    strength: number;
    image: HTMLImageElement;
    WIDTH = 15;
    HEIGHT = 5;
    SPEED = 0.3; // pixel / ms

    constructor (x: number, y: number, dir: number, strength: number) {
        this.x = x;
        this.y = y;
        this.dir = dir;
        this.strength = strength

        const arrowImage: HTMLImageElement | null = document.querySelector('img#arrow-img');
        if (!arrowImage) {
            throw new Error('Image de la fleche introuvable');
        }
        this.image = arrowImage
    }

    update (deltaTime: number): void {
        this.x += Math.cos(this.dir) * deltaTime * this.SPEED;
        this.y += Math.sin(this.dir) * deltaTime * this.SPEED;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        ctx.translate(this.x + this.WIDTH / 2, this.y + this.HEIGHT / 2);
        ctx.rotate(this.dir);
        ctx.drawImage(this.image, -this.WIDTH / 2, -this.HEIGHT / 2, this.WIDTH, this.HEIGHT);
        ctx.restore();
    }

    getRect(): Rect {
        return {
            x: this.x,
            y: this.y,
            w: this.WIDTH,
            h: this.HEIGHT
        }
    }
}