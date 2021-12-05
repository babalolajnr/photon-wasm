import("./node_modules/photon-wasm/photon_wasm.js").then((photon) => {

    const imageInput = document.getElementById('image-input')
    const canvas = document.getElementById("canvas")
    const sourceImage = document.getElementById('src-image')
    const ctx = canvas.getContext("2d")

    imageInput.onchange = e => {
        const reader = new FileReader()
        reader.onload = e => {
            const image = new Image()
            image.onload = () => {
                ctx.fillStyle = "white"
                ctx.fillRect(0, 0, canvas.width, canvas.height)
                // canvas.width = image.width
                // canvas.height = image.height
                filterImage(image)
            }
            image.src = sourceImage.src = e.target.result
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    function filterImage(image) {
        // Create a canvas and get a 2D context from the canvas
        scaleToFit(image, ctx)

        // Convert the ImageData found in the canvas to a PhotonImage (so that it can communicate with the core Rust library)
        let rust_image = photon.open_image(canvas, ctx)

        // Filter the image, the PhotonImage's raw pixels are modified
        photon.filter(rust_image, "radio")

        // Place the PhotonImage back on the canvas
        photon.putImageData(canvas, ctx, rust_image)
    }

    function scaleToFit(img, ctx) {
        // get the scale
        let scale = Math.min(canvas.width / img.width, canvas.height / img.height)
        // get the top left position of the image
        let x = (canvas.width / 2) - (img.width / 2) * scale
        let y = (canvas.height / 2) - (img.height / 2) * scale
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale)
    }
})
