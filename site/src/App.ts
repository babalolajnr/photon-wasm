import JimpImageOperation from "./JimpImageOperation"
import PhotonImageOperation from "./PhotonImageOperation"
import RunTimeDisplay from "./RunTimeDisplay"
import ToastrRunTimeDisplay from "./ToastrRunTimeDisplay"

export default class App {
    private srcImageUrl: string
    private operations: any = {
        blur: () => this.blur(),
        grayscale: () => this.grayscale(),
        invert: () => this.invert(),
        flip_vertically: () => this.flipv(),
        flip_horizontally: () => this.fliph()
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

        const t0wasm = performance.now()
        this.PhotonImageOperation().blur()
        const tfwasm = performance.now() - t0wasm
        console.log('wasm time: ' + tfwasm)

        // Display runtime
        this.runTimeDisplay.show(`Wasm run time: ${(tfwasm / 1000).toFixed(5)} s`)

        const t0js = performance.now()

        await this.JimpImageOperation().blur()
        const tfjs = performance.now() - t0js
        console.log('js time: ' + tfjs)

        this.runTimeDisplay.show(`Javascript run time: ${(tfjs / 1000).toFixed(5)} s`)
    }

    private async grayscale(): Promise<void> {
        const t0wasm = performance.now()
        this.PhotonImageOperation().grayscale()
        const tfwasm = performance.now() - t0wasm
        console.log('wasm time: ' + tfwasm)
        this.runTimeDisplay.show(`Wasm run time: ${(tfwasm / 1000).toFixed(5)} s`)


        const t0js = performance.now()
        await this.JimpImageOperation().grayscale()
        const tfjs = performance.now() - t0js
        console.log('js time: ' + tfjs)

        this.runTimeDisplay.show(`Javascript run time: ${(tfjs / 1000).toFixed(5)} s`)
    }

    private async invert(): Promise<void> {
        const t0wasm = performance.now()
        this.PhotonImageOperation().invert()
        const tfwasm = performance.now() - t0wasm
        console.log('wasm time: ' + tfwasm)
        this.runTimeDisplay.show(`Wasm run time: ${(tfwasm / 1000).toFixed(5)} s`)


        const t0js = performance.now()
        await this.JimpImageOperation().invert()
        const tfjs = performance.now() - t0js
        console.log('js time: ' + tfjs)

        this.runTimeDisplay.show(`Javascript run time: ${(tfjs / 1000).toFixed(5)} s`)
    }

    private async flipv(): Promise<void> {
        const t0wasm = performance.now()
        this.PhotonImageOperation().flipv()
        const tfwasm = performance.now() - t0wasm
        console.log('wasm time: ' + tfwasm)
        this.runTimeDisplay.show(`Wasm run time: ${(tfwasm / 1000).toFixed(5)} s`)


        const t0js = performance.now()
        await this.JimpImageOperation().flipv()
        const tfjs = performance.now() - t0js
        console.log('js time: ' + tfjs)

        this.runTimeDisplay.show(`Javascript run time: ${(tfjs / 1000).toFixed(5)} s`)
    }

    private async fliph(): Promise<void> {
        const t0wasm = performance.now()
        this.PhotonImageOperation().fliph()
        const tfwasm = performance.now() - t0wasm
        console.log('wasm time: ' + tfwasm)
        this.runTimeDisplay.show(`Wasm run time: ${(tfwasm / 1000).toFixed(5)} s`)


        const t0js = performance.now()
        await this.JimpImageOperation().fliph()
        const tfjs = performance.now() - t0js
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
            const li = document.createElement('li')
            li.id = operationName
            li.innerText = operationName.toLowerCase()
            li.classList.add('hover:text-blue-600')

            this.operationsList.appendChild(li)

            // add event handler for when operation is clicked
            li.onclick = () => {
                // if an image has not been chosen
                if (this.srcImageUrl == undefined)
                    this.runTimeDisplay.show('You have not selected an image')
                else
                    this.operations[operationName]()

            }
        })
    }
}