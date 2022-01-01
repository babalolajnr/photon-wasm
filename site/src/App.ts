import JimpImageOperation from "./JimpImageOperation"
import PhotonImageOperation from "./PhotonImageOperation"
import RunTimeDisplay from "./RunTimeDisplay"
import ToastrRunTimeDisplay from "./ToastrRunTimeDisplay"

export default class App {
    private srcImageUrl: string

    constructor(
        private wasmResult: HTMLCanvasElement,
        private srcImage: HTMLImageElement,
        private imageInput: HTMLInputElement,
        private jsResult: HTMLImageElement,
        private srcImagePlaceholder: HTMLElement,
        private wasmResultPlaceholder: HTMLElement,
        private jsResultPlaceholder: HTMLElement,
        private jsResultTitle: HTMLElement,
        private wasmResultTitle: HTMLElement,
        private canvasImageDimensionReference: HTMLImageElement,
        private runTimeDisplay: RunTimeDisplay = new ToastrRunTimeDisplay
    ) { }


    run(): void {
        this.imageInput.onchange = () => this.loadImage()

        const blurButton = document.getElementById('blur')
        const grayscaleButton = document.getElementById('grayscale')

        blurButton.onclick = () => this.blur()
        grayscaleButton.onclick = () => this.grayscale()
    }

    private loadImage(): any {
        this.srcImage.src = this.srcImageUrl = URL.createObjectURL(this.imageInput.files[0])

        this.srcImagePlaceholder.classList.add('hidden')
        this.srcImage.classList.remove('hidden')
    }

    private async blur() {

        let t0wasm = performance.now()
        let photonImageOperation = new PhotonImageOperation(this.srcImage, this.srcImageUrl,
            this.wasmResult, this.wasmResultPlaceholder, this.wasmResultTitle,
            this.canvasImageDimensionReference)

        photonImageOperation.blur()
        let tfwasm = performance.now() - t0wasm
        console.log('wasm time: ' + tfwasm)

        // Display runtime
        this.runTimeDisplay.show(`Wasm run time: ${(tfwasm / 1000).toFixed(5)} s`)

        let t0js = performance.now()
        let jimpImageOperation = new JimpImageOperation(this.srcImageUrl, this.jsResult,
            this.jsResultPlaceholder, this.jsResultTitle)

        await jimpImageOperation.blur()
        let tfjs = performance.now() - t0js
        console.log('js time: ' + tfjs)

        this.runTimeDisplay.show(`Javascript run time: ${(tfjs / 1000).toFixed(5)} s`)
    }

    private async grayscale() {
        let t0wasm = performance.now()
        let photonImageOperation = new PhotonImageOperation(this.srcImage, this.srcImageUrl,
            this.wasmResult, this.wasmResultPlaceholder, this.wasmResultTitle,
            this.canvasImageDimensionReference)

        photonImageOperation.grayscale()
        let tfwasm = performance.now() - t0wasm
        console.log('wasm time: ' + tfwasm)
        this.runTimeDisplay.show(`Wasm run time: ${(tfwasm / 1000).toFixed(5)} s`)


        let t0js = performance.now()
        let jimpImageOperation = new JimpImageOperation(this.srcImageUrl, this.jsResult,
            this.jsResultPlaceholder, this.jsResultTitle)

        await jimpImageOperation.grayscale()
        let tfjs = performance.now() - t0js
        console.log('js time: ' + tfjs)

        this.runTimeDisplay.show(`Javascript run time: ${(tfjs / 1000).toFixed(5)} s`)
    }
}