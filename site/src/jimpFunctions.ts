import Jimp from "jimp";

export class JimpFunctions {

    constructor(
        private imageUrl: string,
        private jsResult: HTMLImageElement,
        private jsResultPlaceholder: HTMLElement,
        private jsResultTitle: HTMLElement,
    ) { }

    async blur() {
        const image = await Jimp.read(this.imageUrl)
        image.blur(20)
        this.jsResult.src = await image.getBase64Async(Jimp.MIME_JPEG)

        // hide the placeholder and display image
        this.jsResultPlaceholder.classList.add('hidden')
        this.jsResult.classList.remove('hidden')
        this.jsResultTitle.classList.remove('hidden')
        this.jsResultTitle.classList.add('flex')
    }
}