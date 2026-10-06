export type Rect = {
    x: number,
    y: number,
    w: number,
    h: number
};

export type Point = {
    x: number,
    y: number
};

export function getCorners(rect: Rect): [Point, Point, Point, Point] {
    return [
        {x: rect.x, y: rect.y},
        {x: rect.x + rect.w, y: rect.y},
        {x: rect.x + rect.w, y: rect.y + rect.h},
        {x: rect.x, y: rect.y + rect.h}
    ];
}

export function dist(r1: Rect | Point, r2: Rect | Point): number {
    const rect1: Rect = "w" in r1 ? r1 : {x: r1.x, y: r1.y, w: 0, h: 0};
    const rect2: Rect = "w" in r2 ? r2 : {x: r2.x, y: r2.y, w: 0, h: 0};
    const dx = Math.max(0, rect1.x - (rect2.x + rect2.w), rect2.x - (rect1.x + rect1.w));
    const dy = Math.max(0, rect1.y - (rect2.y + rect2.h), rect2.y - (rect1.y + rect1.h));
    return Math.sqrt(dx ** 2 + dy ** 2);
}

export class Vector2D {
    constructor(
        public x: number,
        public y: number
    ) {}

    length(): number {
        return Math.sqrt(this.x **2 + this.y **2);
    }

    normalize(): Vector2D {
        const l = this.length();
        if (l === 0) {
            return new Vector2D(9, 0);
        }
        return new Vector2D(this.x / l, this.y / l);
    }

    amplify(scalar: number): Vector2D {
        return new Vector2D(this.x * scalar, this.y * scalar);
    }

    add(v: Vector2D): Vector2D {
        return new Vector2D(this.x + v.x, this.y + v.y);
    }
}