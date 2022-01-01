import JimpImageOperation from "./JimpImageOperation"
import PhotonImageOperation from "./PhotonImageOperation"
import RunTimeDisplay from "./RunTimeDisplay"
import ToastrRunTimeDisplay from "./ToastrRunTimeDisplay"

export default class App {
    private srcImageUrl: string
    private operations: any = {
        blur: () => this.blur(),
        grayscale: () => this.grayscale(),
    }

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
        private operationsList: HTMLElement,
        private runTimeDisplay: RunTimeDisplay = new ToastrRunTimeDisplay
    ) { }


    run(): void {
        this.imageInput.onchange = () => this.loadImage()

        this.buildOperationsList()
    }

    private loadImage(): void {
        this.srcImage.src = this.srcImageUrl = URL.createObjectURL(this.imageInput.files[0])

        this.srcImagePlaceholder.classList.add('hidden')
        this.srcImage.classList.remove('hidden')
    }

    private async blur(): Promise<void> {

        let t0wasm = performance.now()
        this.PhotonImageOperation().blur()
        let tfwasm = performance.now() - t0wasm
        console.log('wasm time: ' + tfwasm)

        // Display runtime
        this.runTimeDisplay.show(`Wasm run time: ${(tfwasm / 1000).toFixed(5)} s`)

        let t0js = performance.now()

        await this.JimpImageOperation().blur()
        let tfjs = performance.now() - t0js
        console.log('js time: ' + tfjs)

        this.runTimeDisplay.show(`Javascript run time: ${(tfjs / 1000).toFixed(5)} s`)
    }

    private async grayscale(): Promise<void> {
        let t0wasm = performance.now()
        this.PhotonImageOperation().grayscale()
        let tfwasm = performance.now() - t0wasm
        console.log('wasm time: ' + tfwasm)
        this.runTimeDisplay.show(`Wasm run time: ${(tfwasm / 1000).toFixed(5)} s`)


        let t0js = performance.now()
        await this.JimpImageOperation().grayscale()
        let tfjs = performance.now() - t0js
        console.log('js time: ' + tfjs)

        this.runTimeDisplay.show(`Javascript run time: ${(tfjs / 1000).toFixed(5)} s`)
    }

    private JimpImageOperation(): JimpImageOperation {
        return new JimpImageOperation(this.srcImageUrl, this.jsResult,
            this.jsResultPlaceholder, this.jsResultTitle)
    }

    private PhotonImageOperation(): PhotonImageOperation {
        return new PhotonImageOperation(this.srcImage, this.srcImageUrl,
            this.wasmResult, this.wasmResultPlaceholder, this.wasmResultTitle,
            this.canvasImageDimensionReference)
    }

    /**
     * Build Operations list in the UI
     */
    private buildOperationsList() {
        Object.keys(this.operations).forEach(operationName => {
            let li = document.createElement('li')
            li.id = operationName
            li.innerText = operationName.toUpperCase()

            this.operationsList.appendChild(li)

            // add event handler for when operation is clicked
            li.onclick = () => this.operations[operationName]()
        })
    }
}