import Tool from '@toolx/core/Tool.server.js';
import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs';

class ToolSharp extends Tool {
    /**
    * Constructs a new ToolSharp instance.
    * @param {ToolOptions} options - Configuration options for ToolSharp.
    */
    constructor(options, pathIn, pathOut) {
        super(options, pathIn, pathOut);
    }

    options = {
        exts: ['jpg', 'jpeg', 'png', 'webp', 'tiff', 'gif', 'avif', 'heif', 'svg'],
    }

    async onEveryFile(next, { file, options }) {
        const processor = sharp(file, options?.settings)
        const apis = options?.api;

        /**
         * meta = format,width,height,space,channels,depth,density,isProgressive,hasProfile,hasAlpha
         */
        const meta = await processor.metadata();

        if (apis) {
            Object.keys(apis).forEach((api) => {
                if (api) {
                    if (apis[api]?.args) {
                        processor[api](...[apis[api].args])
                    } else {
                        processor[api](apis[api])
                    }
                }
            })
        }

        if (options?.scale) {
            processor.resize(Math.round(meta.width * options.scale))
        }

        processor.toBuffer({ resolveWithObject: !!options?.resolveWithObject }).then((data) => {
            const _file = options.ext ? file.replace(path.extname(file), options.ext) : file;
            if (options?.onBuffer) {
                const buffer = options.onBuffer(data);
                if (buffer) fs.writeFileSync(_file, buffer);
            } else {
                fs.writeFileSync(_file, data);
            }
            next(_file)
        }).catch((err) => { console.log(err) })
    }
}

export default ToolSharp;

/**
 * @typedef {import('sharp').Matrix3x3} Matrix3x3
 * @typedef {import('sharp').Kernel} Kernel
 * @typedef {import('sharp').Color} Color
 * @typedef {import('sharp').BoolEnum} BoolEnum
 * @typedef {import('sharp').OverlayOptions} OverlayOptions
 * @typedef {import('sharp').SharpenOptions} SharpenOptions
 * @typedef {import('sharp').FlattenOptions} FlattenOptions
 * @typedef {import('sharp').NegateOptions} NegateOptions
 * @typedef {import('sharp').NormaliseOptions} NormaliseOptions
 * @typedef {import('sharp').ClaheOptions} ClaheOptions
 * @typedef {import('sharp').ThresholdOptions} ThresholdOptions
 * @typedef {import('sharp').Matrix2x2} Matrix2x2
 * @typedef {import('sharp').Raw} Raw
 */

/**
 * @typedef {Object} ToolOptions
 * @property {import('sharp').SharpOptions} [settings] - Options to configure the options of sharp class.
 * @property {'jpg'|'jpeg'|'png'|'webp'|'tiff'|'gif'|'avif'|'heif'|'svg'} [ext] - Options to set the output extension of file.
 * @property {number} [scale] - Options to configure the scale of image.
 * @property {['jpg', 'jpeg', 'png', 'webp', 'tiff', 'gif', 'avif', 'heif', 'svg']} [exts] - Options to configure extensions.
 * @property {ToolSharpOptions} [api] - Options to configure sharp library features.
 */

/**
 * @typedef ToolSharpOptions
 * @property {import('sharp').ResizeOptions} [resize] - Resize options.
 * @property {import('sharp').RotateOptions} [rotate] - Options for image rotation.
 * @property {boolean} [flip] - Flip the image about the vertical Y axis.
 * @property {boolean} [flop] - Flop the image about the horizontal X axis.
 * @property {import('sharp').SharpenOptions} [sharpen] - Sharpen the image.
 * @property {import('sharp').ThresholdOptions} [threshold] - Threshold for image binarization.
 * @property {import('sharp').OverlayOptions[]} [composite] - Composite image options.
 * @property {import('sharp').OutputOptions} [toFormat] - Output format options.
 * @property {import('sharp').JpegOptions} [jpeg] - JPEG format options.
 * @property {import('sharp').PngOptions} [png] - PNG format options.
 * @property {import('sharp').WebpOptions} [webp] - WebP format options.
 * @property {import('sharp').AvifOptions} [avif] - AVIF format options.
 * @property {import('sharp').HeifOptions} [heif] - HEIF format options.
 * @property {import('sharp').TiffOptions} [tiff] - TIFF format options.
 * @property {import('sharp').GifOptions} [gif] - GIF format options.
 * @property {import('sharp').Jp2Options} [jp2] - JPEG 2000 format options.
 * @property {import('sharp').JxlOptions} [jxl] - JPEG XL format options.
 * @property {import('sharp').RawOptions} [raw] - Raw format options.
 * @property {import('sharp').TileOptions} [tile] - Tile options.
 * @property {boolean} [removeAlpha] - Remove the alpha channel from the image.
 * @property {number} [ensureAlpha] - Ensure the image has an alpha channel.
 * @property {0 | 1 | 2 | 3 | 'red' | 'green' | 'blue' | 'alpha'} [extractChannel] - Extract a specific channel from the image.
 * @property {string | Buffer | ArrayLike<string | Buffer>} [joinChannel] - Join one or more channels to the image.
 * @property {keyof BoolEnum} [bandbool] - Perform a bitwise boolean operation on all image channels.
 * @property {Color} [tint] - Tint the image using the provided chroma.
 * @property {boolean} [greyscale] - Convert the image to 8-bit greyscale.
 * @property {boolean} [grayscale] - Alternative spelling of greyscale.
 * @property {string} [pipelineColourspace] - Set the pipeline colourspace.
 * @property {string} [pipelineColorspace] - Alternative spelling of pipelineColourspace.
 * @property {string} [toColourspace] - Set the output colourspace.
 * @property {string} [toColorspace] - Alternative spelling of toColourspace.
 * @property {OverlayOptions[]} [composite] - Composite images over the processed image.
 * @property {number} [rotate] - Rotate the output image by a specific angle.
 * @property {boolean} [flip] - Flip the image about the vertical Y axis.
 * @property {boolean} [flop] - Flop the image about the horizontal X axis.
 * @property {[number, number, number, number] | Matrix2x2} [affine] - Perform an affine transform on the image.
 * @property {SharpenOptions} [sharpen] - Sharpen the image.
 * @property {number} [median] - Apply a median filter to the image.
 * @property {number | boolean} [blur] - Blur the image.
 * @property {boolean | FlattenOptions} [flatten] - Merge alpha transparency channel with a background.
 * @property {number} [gamma] - Apply gamma correction to the image.
 * @property {boolean | NegateOptions} [negate] - Produce the "negative" of the image.
 * @property {NormaliseOptions} [normalise] - Enhance image contrast by stretching its luminance.
 * @property {NormaliseOptions} [normalize] - Alternative spelling of normalise.
 * @property {ClaheOptions} [clahe] - Perform contrast limiting adaptive histogram equalization.
 * @property {Kernel} [convolve] - Convolve the image with a specified kernel.
 * @property {number | ThresholdOptions} [threshold] - Apply a threshold effect to the image.
 * @property {string | Buffer, keyof BoolEnum, { raw: Raw }} [boolean] - Perform a bitwise boolean operation with an operand image.
 * @property {number | number[] | null, number | number[]} [linear] - Apply a linear formula to the image.
 * @property {Matrix3x3} [recomb] - Recomb the image with a specified matrix.
 */
