type Rect = {
    x: number,
    y: number,
    w: number,
    h: number
};

export class Entity {
    constructor(
        protected x: number,
        protected y: number,
        protected width: number,
        protected height: number
    )

    public getRect(): Rect {
        return {
            x: this.x,
            y: this.y,
            w: this.width,
            h: this.height
        };
    }

    public abstract draw(ctx: CanvasRenderingContext2D): void
}