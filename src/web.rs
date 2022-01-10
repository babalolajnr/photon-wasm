//! Web-only functions, which utilize the HTML5 Canvas for image manipulation.

extern crate image;
extern crate rand;
use image::{DynamicImage, GenericImageView, RgbaImage};
use palette::{Srgba, LinSrgba, Lab, Blend, Lch, Pixel, Gradient, Srgb};
use crate::channels::color_sim;
use crate::{PhotonImage, Rgb, helpers, GenericImage};
use wasm_bindgen::prelude::*;

/// Selective colorisation using alpha mask blending.
/// 
/// # Arguments
/// * `img` - Source image. A HTML5 Canvas that contains a view into the image.
/// * `mask_img` - Mask image. The watermark to be placed onto the `img` image.
/// # Example
///
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
pub fn selective_colorization(src_canvas: &HtmlCanvasElement, mask_canvas: &HTMLCanvasElement) -> HtmlCanvasElement {

    let document = web_sys::window().unwrap().document().unwrap();
    let canvas = document
        .create_element("canvas").unwrap()
        .dyn_into::<web_sys::HtmlCanvasElement>().unwrap();

    canvas.set_width(resized_img.width());
    canvas.set_height(resized_img.height());

    let new_img_data = ImageData::new_with_u8_clamped_array_and_sh(Clamped(&mut resized_img.raw_pixels()), canvas.width(), canvas.height());

    let ctx = canvas
    .get_context("2d").unwrap()
    .unwrap()
    .dyn_into::<web_sys::CanvasRenderingContext2d>().unwrap();

    // Place the new imagedata onto the canvas
    ctx.put_image_data(&new_img_data.unwrap(), 0.0, 0.0);

    return canvas;
}