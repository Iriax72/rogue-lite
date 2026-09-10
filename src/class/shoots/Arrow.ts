import { getImage } from "../../functions.js";

type Rect = {
    x: number,
    y: number,
    w: number,
    h: number
};

export class Arrow {
    private readonly image: HTMLImageElement;
    private readonly WIDTH = 15;
    private readonly HEIGHT = 5;
    private readonly SPEED = 0.3; // pixel / ms

    constructor (
        private x: number,
        private y: number,
        private readonly dir: number,
        public readonly strength: number
    ) {
        this.image = getImage('arrow-img'); 
    }

    public update (deltaTime: number): void {
        this.x += Math.cos(this.dir) * deltaTime * this.SPEED;
        this.y += Math.sin(this.dir) * deltaTime * this.SPEED;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        ctx.translate(this.x + this.WIDTH / 2, this.y + this.HEIGHT / 2);
        ctx.rotate(this.dir);
        ctx.drawImage(this.image, -this.WIDTH / 2, -this.HEIGHT / 2, this.WIDTH, this.HEIGHT);
        ctx.restore();
    }

    public getRect(): Rect {
        return {
            x: this.x,
            y: this.y,
            w: this.WIDTH,
            h: this.HEIGHT
        }
    }
}