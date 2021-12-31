import './styles.css'

import JimpImageOperation from './JimpImageOperation'
import Toastr from 'toastr'
import PhotonImageOperation from './PhotonImageOperation'

const srcImage = <HTMLImageElement>document.getElementById("src-image")
const srcImagePlaceholder = document.getElementById('src-image-placeholder')
const imageInput = document.getElementById('image-input')

const wasmResult = <HTMLCanvasElement>document.getElementById("wasm-result")
const wasmResultPlaceholder = document.getElementById('wasm-result-placeholder')
const wasmResultTitle = document.getElementById('wasm-result-title')
const canvasImageDimensionReference = <HTMLImageElement>document.getElementById('canvas-image-dimension-reference')

const jsResult = <HTMLImageElement>document.getElementById("js-result")
const jsResultPlaceholder = document.getElementById('js-result-placeholder')
const jsResultTitle = document.getElementById('js-result-title')

let srcImageUrl: string;

// function buttons
const blurButton = document.getElementById('blur')
const grayscaleButton = document.getElementById('grayscale')

blurButton.onclick = () => blur()
grayscaleButton.onclick = () => grayscale()

const loadImage = function () {
    srcImageUrl = URL.createObjectURL(this.files[0])
    srcImage.src = srcImageUrl
    jsResult.src = srcImageUrl

    srcImagePlaceholder.classList.add('hidden')
    srcImage.classList.remove('hidden')
}

async function blur() {

    let t0wasm = performance.now()
    let photonImageOperation = new PhotonImageOperation(srcImage, srcImageUrl, wasmResult, wasmResultPlaceholder, wasmResultTitle, canvasImageDimensionReference)
    photonImageOperation.blur()
    let tfwasm = performance.now() - t0wasm
    console.log('wasm time: ' + tfwasm)
    Toastr.info(`Wasm run time: ${(tfwasm / 1000).toFixed(5)} s`, undefined, {
        "timeOut": -1
    })

    let t0js = performance.now()
    let jimpImageOperation = new JimpImageOperation(srcImageUrl, jsResult, jsResultPlaceholder, jsResultTitle)
    await jimpImageOperation.blur()
    let tfjs = performance.now() - t0js
    console.log('js time: ' + tfjs)
    Toastr.info(`Javascript run time: ${(tfjs / 1000).toFixed(5)} s`, undefined, {
        'timeOut': -1
    })

}

async function grayscale() {

    let t0wasm = performance.now()
    let photonImageOperation = new PhotonImageOperation(srcImage, srcImageUrl, wasmResult, wasmResultPlaceholder, wasmResultTitle, canvasImageDimensionReference)
    photonImageOperation.grayscale()
    let tfwasm = performance.now() - t0wasm
    console.log('wasm time: ' + tfwasm)
    Toastr.info(`Wasm run time: ${(tfwasm / 1000).toFixed(5)} s`, undefined, {
        "timeOut": -1
    })

    let t0js = performance.now()
    let jimpImageOperation = new JimpImageOperation(srcImageUrl, jsResult, jsResultPlaceholder, jsResultTitle)
    await jimpImageOperation.grayscale()
    let tfjs = performance.now() - t0js
    console.log('js time: ' + tfjs)
    Toastr.info(`Javascript run time: ${(tfjs / 1000).toFixed(5)} s`, undefined, {
        'timeOut': -1
    })
}

imageInput.onchange = loadImage

