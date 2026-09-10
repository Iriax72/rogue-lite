export function getImage(id: string): HTMLImageElement {
    const foundImage: HTMLImageElement | null = document.querySelector('img#' + id);
    if (!foundImage) {
        throw new Error(`L'image ${id} n'a pas pu être trouvée`);
    }
    return foundImage;
}