export default interface ImageOperation {
    blur(): void | Promise<void>
    grayscale(): void | Promise<void>
    invert(): void | Promise<void>
    flipv(): void | Promise<void>
    fliph(): void | Promise<void>
}