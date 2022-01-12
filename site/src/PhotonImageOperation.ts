import { fliph, flipv, gaussian_blur, grayscale, invert, open_image, PhotonImage, putImageData } from 'photon-wasm'
import ImageOperation from './ImageOperation'

export default class PhotonImageOperation implements ImageOperation {
    private ctx: CanvasRenderingContext2D
    private photonImage: PhotonImage

    constructor(
        private srcImage: HTMLImageElement,
        private imageUrl: string,
        private wasmResult: HTMLCanvasElement,
        private wasmResultPlaceholder: HTMLElement,
        private wasmResultTitle: HTMLElement,
        private canvasImageDimensionReference: HTMLImageElement
    ) {
        this.ctx = this.wasmResult.getContext('2d')
    }

    /**
     * Blur image
     */
    blur(): void {
        this.resetCanvasImageDimensionReference()

        this.canvasImageDimensionReference.src = this.imageUrl
        this.canvasImageDimensionReference.onload = () => {

            this.prepareDisplay()

            this.photonImage = open_image(this.wasmResult, this.ctx)
            gaussian_blur(this.photonImage, 1)
            putImageData(this.wasmResult, this.ctx, this.photonImage)
        }
    }

    /**
     * Convert to grayscale
     */
    grayscale(): void {

        this.resetCanvasImageDimensionReference()

        this.canvasImageDimensionReference.src = this.imageUrl
        this.canvasImageDimensionReference.onload = () => {

            this.prepareDisplay()

            this.photonImage = open_image(this.wasmResult, this.ctx)
            grayscale(this.photonImage)
            putImageData(this.wasmResult, this.ctx, this.photonImage)
        }
    }

    /**
     * Invert image color
     */
    invert(): void {
        this.resetCanvasImageDimensionReference()

        this.canvasImageDimensionReference.src = this.imageUrl
        this.canvasImageDimensionReference.onload = () => {

            this.prepareDisplay()

            this.photonImage = open_image(this.wasmResult, this.ctx)
            invert(this.photonImage)
            putImageData(this.wasmResult, this.ctx, this.photonImage)
        }
    }

    /**
     * Flip Image vertically
     */
    flipv(): void {
        this.resetCanvasImageDimensionReference()

        this.canvasImageDimensionReference.src = this.imageUrl
        this.canvasImageDimensionReference.onload = () => {

            this.prepareDisplay()

            this.photonImage = open_image(this.wasmResult, this.ctx)
            flipv(this.photonImage)
            putImageData(this.wasmResult, this.ctx, this.photonImage)
        }
    }

    /**
     * Flip Image horizontally
     */
    fliph(): void {
        this.resetCanvasImageDimensionReference()

        this.canvasImageDimensionReference.src = this.imageUrl
        this.canvasImageDimensionReference.onload = () => {

            this.prepareDisplay()

            this.photonImage = open_image(this.wasmResult, this.ctx)
            fliph(this.photonImage)
            putImageData(this.wasmResult, this.ctx, this.photonImage)
        }
    }

    /**
     * Scale image to fill canvas
    */
    private scaleToFill(): void {
        // get the scale
        const scale = Math.max(this.wasmResult.width / this.srcImage.width, this.wasmResult.height / this.srcImage.height);
        // get the top left position of the image
        const x = (this.wasmResult.width / 2) - (this.srcImage.width / 2) * scale;
        const y = (this.wasmResult.height / 2) - (this.srcImage.height / 2) * scale;
        this.ctx.drawImage(this.srcImage, x, y, this.srcImage.width * scale, this.srcImage.height * scale);
    }

    /**
    * Reset the dimensions of the image reference element so that
    * the canvas does not get distorted after changing the reference
    * image
    */
    private resetCanvasImageDimensionReference(): void {
        this.canvasImageDimensionReference.src = ''
        this.canvasImageDimensionReference.classList.remove('hidden')
    }

    /**
     * Prepare Canvas to display image 
     */
    private prepareDisplay(): void {

        // Get image dimensions from the image element to ensure the canvas fits the image
        this.wasmResult.height = this.canvasImageDimensionReference.height
        this.canvasImageDimensionReference.classList.add('hidden')


        // hide the placeholder and display image
        this.wasmResultPlaceholder.classList.add('hidden')
        this.wasmResult.classList.remove('hidden')
        this.wasmResultTitle.classList.remove('hidden')
        this.wasmResultTitle.classList.add('flex')

        this.scaleToFill()
    }

}