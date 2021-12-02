import("./node_modules/photon-wasm/photon_wasm.js").then((photon) => {

    function filterImage() {
        // Create a canvas and get a 2D context from the canvas
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        var myImage = document.getElementById("myImage");


        // Draw the image element onto the canvas
        ctx.drawImage(myImage, 0, 0, myImage.width, myImage.height,
            0, 0, canvas.width, canvas.height)

        // Convert the ImageData found in the canvas to a PhotonImage (so that it can communicate with the core Rust library)
        let rust_image = photon.open_image(canvas, ctx);

        // Filter the image, the PhotonImage's raw pixels are modified
        photon.filter(rust_image, "radio");

        // Place the PhotonImage back on the canvas
        photon.putImageData(canvas, ctx, rust_image)
    }

    filterImage()
});
