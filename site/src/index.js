import './styles.css'
import Jimp from 'jimp'


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

let photonBlur

import('photon-wasm').then((photon) => {
    photonBlur = function () {
        const image = new Image()
        image.onload = () => {
            scaleToFit(srcImage, ctx, wasmResult)
            const photonImage = photon.open_image(wasmResult, ctx)
            photon.gaussian_blur(photonImage, 1)
            photon.putImageData(wasmResult, ctx, photonImage)
        }
        image.src = srcImage.src
    }
})

const loadImage = function () {
    const url = URL.createObjectURL(this.files[0])
    srcImage.src = url
    jsResult.src = url

    srcImagePlaceholder.classList.add('hidden')
    srcImage.classList.remove('hidden')

    jsResultPlaceholder.classList.add('hidden')
    jsResult.classList.remove('hidden')
    jsResultTitle.classList.remove('hidden')
    jsResultTitle.classList.add('flex')

    wasmResultPlaceholder.classList.add('hidden')
    wasmResult.classList.remove('hidden')
    wasmResultTitle.classList.remove('hidden')
    wasmResultTitle.classList.add('flex')

    // srcImage.onload = blur(url)
}

const blur = function (image) {
    Jimp.read(image).then((result) => {
        result.blur(20)
        result.getBase64Async(Jimp.MIME_JPEG).then((base64string) => {
            jsResult.src = base64string
        })
    })
    photonBlur()
}

imageInput.onchange = loadImage

const scaleToFit = function (img, ctx, canvas) {
    // get the scale
    let scale = Math.min(canvas.width / img.width, canvas.height / img.height)
    // get the top left position of the image
    let x = (canvas.width / 2) - (img.width / 2) * scale
    let y = (canvas.height / 2) - (img.height / 2) * scale
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale)
}
