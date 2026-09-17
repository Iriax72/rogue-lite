type Rect = {
    x: number,
    y: number,
    w: number,
    h: number
};

export function assertDefined<T>(
    value: T | null | undefined,
    message: string
): asserts value is T {
    if (value === null || value === undefined) {
        throw new Error(message);
    }
}

export function getImage(id: string): HTMLImageElement {
    const foundImage: HTMLImageElement | null = document.querySelector('img#' + id);
    if (!foundImage) {
        throw new Error(`L'image ${id} n'a pas pu être trouvée`);
    }
    return foundImage;
}

export function collides (r1: Rect, r2: Rect): boolean {
    if (r1.x > r2.x + r2.w) {
        return false;
    }
    if (r1.x + r1.w < r2.x) {
        return false;
    }
    if (r1.y > r2.y + r2.h) {
        return false;
    }
    if (r1.y + r1.h < r2.y) {
        return false;
    }
    return true;
}