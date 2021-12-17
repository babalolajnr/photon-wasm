import './styles.css'
// import Caman from 'caman'
// console.log(Caman)
import Jimp from 'jimp'

console.log(Jimp)
// import("../node_modules/photon-wasm/photon_wasm.js").then((photon) => {

//     const imageInput = document.getElementById('image-input')
//     const finalImage = document.getElementById("final-image")
//     const finalImageCtx = finalImage.getContext("2d")
//     const srcImage = document.getElementById("src-image")
//     const srcImageCtx = srcImage.getContext("2d")


//     imageInput.onchange = e => {
//         const reader = new FileReader()
//         reader.onload = e => {
//             const image = new Image()
//             image.onload = () => {
//                 // paint white over the canvas to cover previous image
//                 finalImageCtx.fillStyle = "white"
//                 finalImageCtx.fillRect(0, 0, finalImage.width, finalImage.height)
//                 filterImage(image)

//                 // paint the src image onto the canvas
//                 scaleToFit(image, srcImageCtx, srcImage)
//             }
//             image.src = e.target.result
//         }
//         reader.readAsDataURL(e.target.files[0]);
//     }

//     function filterImage(image) {

//         scaleToFit(image, finalImageCtx, finalImage)

//         // Convert the ImageData found in the canvas to a PhotonImage (so that it can communicate with the core Rust library)
//         let rust_image = photon.open_image(finalImage, finalImageCtx)

//         // Filter the image, the PhotonImage's raw pixels are modified
//         photon.filter(rust_image, "radio")

//         // Place the PhotonImage back on the canvas
//         photon.putImageData(finalImage, finalImageCtx, rust_image)
//     }

//     function scaleToFit(img, ctx, canvas) {
//         // get the scale
//         let scale = Math.min(canvas.width / img.width, canvas.height / img.height)
//         // get the top left position of the image
//         let x = (canvas.width / 2) - (img.width / 2) * scale
//         let y = (canvas.height / 2) - (img.height / 2) * scale
//         ctx.drawImage(img, x, y, img.width * scale, img.height * scale)
//     }
// })

