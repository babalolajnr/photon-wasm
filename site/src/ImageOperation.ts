export default interface ImageOperation {
    blur(): void | Promise<void>
    grayscale(): void | Promise<void>
    invert(): void | Promise<void>
}