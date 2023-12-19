import Tool from '@toolx/core/Tool.server.js';
import sharp, { Sharp, ResizeOptions, OutputInfo } from 'sharp';
import path from 'node:path';
import fs from 'node:fs';

class ToolSharp extends Tool {
    /**
    * Constructs a new ToolSharp instance.
    * @param {ToolSharpOptions} options - Configuration options for ToolSharp.
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
 * @typedef {Object} ToolSharpOptions
 * @property {SharpOptions} [api] - Options to configure sharp library features.
 */

/**
 * @typedef {import('sharp').SharpOptions} SharpOptions
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
 */
