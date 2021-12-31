import './styles.css'
import Jimp from 'jimp'
import { JimpFunctions } from './jimpFunctions'
import * as photon from 'photon-wasm'
import Toastr from 'toastr'

const srcImage = <HTMLImageElement>document.getElementById("src-image")

const wasmResult = <HTMLCanvasElement>document.getElementById("wasm-result")
const ctx = wasmResult.getContext('2d')
const imageInput = document.getElementById('image-input')
const jsResult = <HTMLImageElement>document.getElementById("js-result")
const srcImagePlaceholder = document.getElementById('src-image-placeholder')
const wasmResultPlaceholder = document.getElementById('wasm-result-placeholder')
const jsResultPlaceholder = document.getElementById('js-result-placeholder')
const jsResultTitle = document.getElementById('js-result-title')
const wasmResultTitle = document.getElementById('wasm-result-title')
const canvasImageDimensionReference = <HTMLImageElement>document.getElementById('canvas-image-dimension-reference')

let srcImageUrl: string;

// functions
const blurButton = document.getElementById('blur')

blurButton.onclick = () => blur()

const loadImage = function () {
    srcImageUrl = URL.createObjectURL(this.files[0])
    srcImage.src = srcImageUrl
    jsResult.src = srcImageUrl

    srcImagePlaceholder.classList.add('hidden')
    srcImage.classList.remove('hidden')
}

async function blur() {

    let t0wasm = performance.now()
    photonBlur()
    let tfwasm = performance.now() - t0wasm
    console.log('wasm time: ' + tfwasm)
    Toastr.info(`Wasm run time: ${(tfwasm / 1000).toFixed(5)} s`, undefined, {
        "timeOut": -1
    })

    let t0js = performance.now()
    // await jimpBlur()
    let jimpFunctions = new JimpFunctions(srcImageUrl, jsResult, jsResultPlaceholder, jsResultTitle)
    await jimpFunctions.blur()
    let tfjs = performance.now() - t0js
    console.log('js time: ' + tfjs)
    Toastr.info(`Javascript run time: ${(tfjs / 1000).toFixed(5)} s`, undefined, {
        'timeOut': -1
    })

}



/**
 * Blurs image and places it on the canvas
 */
function photonBlur() {
    resetCanvasImageDimensionReference()

    canvasImageDimensionReference.src = srcImageUrl
    canvasImageDimensionReference.onload = () => {

        // Get image dimensions from the image element to ensure the canvas fits the image
        wasmResult.height = canvasImageDimensionReference.height
        canvasImageDimensionReference.classList.add('hidden')


        // hide the placeholder and display image
        wasmResultPlaceholder.classList.add('hidden')
        wasmResult.classList.remove('hidden')
        wasmResultTitle.classList.remove('hidden')
        wasmResultTitle.classList.add('flex')

        scaleToFill(srcImage, ctx, wasmResult)
        const photonImage = photon.open_image(wasmResult, ctx)
        photon.gaussian_blur(photonImage, 1)
        photon.putImageData(wasmResult, ctx, photonImage)
    }
}

/**
 * Reset the dimensions of the image reference element so that
 * the canvas does not get distorted after changing the reference
 * image
 */
function resetCanvasImageDimensionReference() {
    canvasImageDimensionReference.src = ''
    canvasImageDimensionReference.classList.remove('hidden')
}

imageInput.onchange = loadImage

/**
 * Scale image to fill canvas
 * @param  {HTMLImageElement} img
 * @param  {CanvasRenderingContext2D} ctx
 * @param  {HTMLCanvasElement} canvas
 */
const scaleToFill = function (img: HTMLImageElement, ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    // get the scale
    let scale = Math.max(canvas.width / img.width, canvas.height / img.height);
    // get the top left position of the image
    let x = (canvas.width / 2) - (img.width / 2) * scale;
    let y = (canvas.height / 2) - (img.height / 2) * scale;
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
}
