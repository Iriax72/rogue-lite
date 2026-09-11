type Rect = {
    x: number,
    y: number,
    w: number,
    h: number
};

export abstract class Shoot {
    constructor (
        private x: number,
        private y: number,
        private readonly width: number,
        private readonly height: number,
        private readonly dir: number,
        public readonly strength: number,
        private readonly speed: number, // pixel / ms
        private readonly image: HTMLImageElement
    ) {}

    public update (deltaTime: number): void {
        this.x += Math.cos(this.dir) * deltaTime * this.speed;
        this.y += Math.sin(this.dir) * deltaTime * this.speed;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.dir);
        ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }

    public getRect(): Rect {
        return {
            x: this.x,
            y: this.y,
            w: this.width,
            h: this.height
        }
    }
}