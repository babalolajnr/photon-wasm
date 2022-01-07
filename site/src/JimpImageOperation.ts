import Jimp from "jimp";
import ImageOperation from "./ImageOperation";

export default class JimpImageOperation implements ImageOperation {

    constructor(
        private imageUrl: string,
        private jsResult: HTMLImageElement,
        private jsResultPlaceholder: HTMLElement,
        private jsResultTitle: HTMLElement,
    ) { }

    async blur() {
        const image = await Jimp.read(this.imageUrl)
        image.blur(20)
        this.jsResult.src = await image.getBase64Async(Jimp.MIME_JPEG)

        this.displayResult()
    }

    async grayscale() {
        const image = await Jimp.read(this.imageUrl)
        image.greyscale()
        this.jsResult.src = await image.getBase64Async(Jimp.MIME_JPEG)

        this.displayResult()
    }

    async invert() {
        const image = await Jimp.read(this.imageUrl)
        image.invert()
        this.jsResult.src = await image.getBase64Async(Jimp.MIME_JPEG)

        this.displayResult()
    }

    async flipv() {
        const image = await Jimp.read(this.imageUrl)
        image.flip(false, true)
        this.jsResult.src = await image.getBase64Async(Jimp.MIME_JPEG)

        this.displayResult()
    }

    async fliph() {
        const image = await Jimp.read(this.imageUrl)
        image.flip(true, false)
        this.jsResult.src = await image.getBase64Async(Jimp.MIME_JPEG)

        this.displayResult()
    }

    /**
     * Hide the placeholder and display image
     */
    private displayResult(): void {

        this.jsResultPlaceholder.classList.add('hidden')
        this.jsResult.classList.remove('hidden')
        this.jsResultTitle.classList.remove('hidden')
        this.jsResultTitle.classList.add('flex')
    }
}