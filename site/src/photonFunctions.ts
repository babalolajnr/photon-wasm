import * as photon from 'photon-wasm'
import Operations from './operations'

export default class PhotonFunctions implements Operations {
    private ctx: CanvasRenderingContext2D

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

    blur() {
        this.resetCanvasImageDimensionReference()

        this.canvasImageDimensionReference.src = this.imageUrl
        this.canvasImageDimensionReference.onload = () => {

            // Get image dimensions from the image element to ensure the canvas fits the image
            this.wasmResult.height = this.canvasImageDimensionReference.height
            this.canvasImageDimensionReference.classList.add('hidden')


            // hide the placeholder and display image
            this.wasmResultPlaceholder.classList.add('hidden')
            this.wasmResult.classList.remove('hidden')
            this.wasmResultTitle.classList.remove('hidden')
            this.wasmResultTitle.classList.add('flex')

            this.scaleToFill()
            const photonImage = photon.open_image(this.wasmResult, this.ctx)
            photon.gaussian_blur(photonImage, 1)
            photon.putImageData(this.wasmResult, this.ctx, photonImage)
        }
    }

    /**
     * Scale image to fill canvas
    */
    private scaleToFill() {
        // get the scale
        let scale = Math.max(this.wasmResult.width / this.srcImage.width, this.wasmResult.height / this.srcImage.height);
        // get the top left position of the image
        let x = (this.wasmResult.width / 2) - (this.srcImage.width / 2) * scale;
        let y = (this.wasmResult.height / 2) - (this.srcImage.height / 2) * scale;
        this.ctx.drawImage(this.srcImage, x, y, this.srcImage.width * scale, this.srcImage.height * scale);
    }

    /**
 * Reset the dimensions of the image reference element so that
 * the canvas does not get distorted after changing the reference
 * image
 */
    private resetCanvasImageDimensionReference() {
        this.canvasImageDimensionReference.src = ''
        this.canvasImageDimensionReference.classList.remove('hidden')
    }

}