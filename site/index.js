import("./node_modules/photon-wasm/photon_wasm.js").then((photon) => {

    let imageInput = document.getElementById('image-input')
    let sourceImage = document.getElementById('src-image')

    imageInput.onchange = e => {
        const [image] = imageInput.files
        if (image) sourceImage.src = URL.createObjectURL(image)
    }

    function filterImage() {
        // Create a canvas and get a 2D context from the canvas
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        let myImage = document.getElementById("myImage");


        scaleToFit(myImage, ctx);

        // Convert the ImageData found in the canvas to a PhotonImage (so that it can communicate with the core Rust library)
        let rust_image = photon.open_image(canvas, ctx);

        // Filter the image, the PhotonImage's raw pixels are modified
        photon.filter(rust_image, "radio");

        // Place the PhotonImage back on the canvas
        photon.putImageData(canvas, ctx, rust_image)
    }

    // filterImage()

    function scaleToFit(img, ctx) {
        // get the scale
        let scale = Math.min(canvas.width / img.width, canvas.height / img.height);
        // get the top left position of the image
        let x = (canvas.width / 2) - (img.width / 2) * scale;
        let y = (canvas.height / 2) - (img.height / 2) * scale;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    }
});
