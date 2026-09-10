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