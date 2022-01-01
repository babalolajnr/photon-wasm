import App from './App'
import './styles.css'

const srcImage = <HTMLImageElement>document.getElementById("src-image")
const srcImagePlaceholder = document.getElementById('src-image-placeholder')
const imageInput = <HTMLInputElement>document.getElementById('image-input')

const wasmResult = <HTMLCanvasElement>document.getElementById("wasm-result")
const wasmResultPlaceholder = document.getElementById('wasm-result-placeholder')
const wasmResultTitle = document.getElementById('wasm-result-title')
const canvasImageDimensionReference = <HTMLImageElement>document.getElementById('canvas-image-dimension-reference')

const jsResult = <HTMLImageElement>document.getElementById("js-result")
const jsResultPlaceholder = document.getElementById('js-result-placeholder')
const jsResultTitle = document.getElementById('js-result-title')

const operationsList = document.getElementById('operations-list')


new App(wasmResult, srcImage, imageInput, jsResult,
    srcImagePlaceholder, wasmResultPlaceholder,
    jsResultPlaceholder, jsResultTitle,
    wasmResultTitle, canvasImageDimensionReference,
    operationsList).run()

