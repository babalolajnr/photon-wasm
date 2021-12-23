import './styles.css'
import Jimp from 'jimp'
import * as photon from 'photon-wasm'


const wasmResult = document.getElementById("wasm-result")
const ctx = wasmResult.getContext('2d')
const srcImage = document.getElementById("src-image")
const imageInput = document.getElementById('image-input')
const jsResult = document.getElementById("js-result")
const srcImagePlaceholder = document.getElementById('src-image-placeholder')
const wasmResultPlaceholder = document.getElementById('wasm-result-placeholder')
const jsResultPlaceholder = document.getElementById('js-result-placeholder')
const jsResultTitle = document.getElementById('js-result-title')
const wasmResultTitle = document.getElementById('wasm-result-title')
const canvasImageDimensionReference = document.getElementById('canvas-image-dimension-reference')

let srcImageUrl;

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

function blur() {
    photonBlur()
    jimpBlur()
}

function jimpBlur() {
    Jimp.read(srcImageUrl).then((result) => {
        result.blur(20)
        result.getBase64Async(Jimp.MIME_JPEG).then((base64string) => {
            // hide the placeholder and display image
            jsResultPlaceholder.classList.add('hidden')
            jsResult.classList.remove('hidden')
            jsResultTitle.classList.remove('hidden')
            jsResultTitle.classList.add('flex')

            jsResult.src = base64string
        })
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
const scaleToFill = function (img, ctx, canvas) {
    // get the scale
    var scale = Math.max(canvas.width / img.width, canvas.height / img.height);
    // get the top left position of the image
    var x = (canvas.width / 2) - (img.width / 2) * scale;
    var y = (canvas.height / 2) - (img.height / 2) * scale;
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
}
