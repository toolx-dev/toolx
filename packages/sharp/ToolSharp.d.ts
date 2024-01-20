export default ToolSharp;
export type Matrix3x3 = import('sharp').Matrix3x3;
export type Kernel = import('sharp').Kernel;
export type Color = import('sharp').Color;
export type BoolEnum = import('sharp').BoolEnum;
export type OverlayOptions = import('sharp').OverlayOptions;
export type SharpenOptions = import('sharp').SharpenOptions;
export type FlattenOptions = import('sharp').FlattenOptions;
export type NegateOptions = import('sharp').NegateOptions;
export type NormaliseOptions = import('sharp').NormaliseOptions;
export type ClaheOptions = import('sharp').ClaheOptions;
export type ThresholdOptions = import('sharp').ThresholdOptions;
export type Matrix2x2 = import('sharp').Matrix2x2;
export type Raw = import('sharp').Raw;
export type ToolOptions = {
    /**
     * - Options to configure the options of sharp class.
     */
    settings?: import('sharp').SharpOptions;
    /**
     * - Options to set the output extension of file.
     */
    ext?: 'jpg' | 'jpeg' | 'png' | 'webp' | 'tiff' | 'gif' | 'avif' | 'heif' | 'svg';
    /**
     * - Options to configure the scale of image.
     */
    scale?: number;
    /**
     * - Options to configure extensions.
     */
    exts?: ['jpg', 'jpeg', 'png', 'webp', 'tiff', 'gif', 'avif', 'heif', 'svg'];
    /**
     * - Options to configure sharp library features.
     */
    api?: ToolSharpOptions;
};
export type ToolSharpOptions = {
    /**
     * - Resize options.
     */
    resize?: import('sharp').ResizeOptions;
    /**
     * - Options for image rotation.
     */
    rotate?: import('sharp').RotateOptions;
    /**
     * - Flip the image about the vertical Y axis.
     */
    flip?: boolean;
    /**
     * - Flop the image about the horizontal X axis.
     */
    flop?: boolean;
    /**
     * - Sharpen the image.
     */
    sharpen?: import('sharp').SharpenOptions;
    /**
     * - Threshold for image binarization.
     */
    threshold?: import('sharp').ThresholdOptions;
    /**
     * - Composite image options.
     */
    composite?: import('sharp').OverlayOptions[];
    /**
     * - Output format options.
     */
    toFormat?: import('sharp').OutputOptions;
    /**
     * - JPEG format options.
     */
    jpeg?: import('sharp').JpegOptions;
    /**
     * - PNG format options.
     */
    png?: import('sharp').PngOptions;
    /**
     * - WebP format options.
     */
    webp?: import('sharp').WebpOptions;
    /**
     * - AVIF format options.
     */
    avif?: import('sharp').AvifOptions;
    /**
     * - HEIF format options.
     */
    heif?: import('sharp').HeifOptions;
    /**
     * - TIFF format options.
     */
    tiff?: import('sharp').TiffOptions;
    /**
     * - GIF format options.
     */
    gif?: import('sharp').GifOptions;
    /**
     * - JPEG 2000 format options.
     */
    jp2?: import('sharp').Jp2Options;
    /**
     * - JPEG XL format options.
     */
    jxl?: import('sharp').JxlOptions;
    /**
     * - Raw format options.
     */
    raw?: import('sharp').RawOptions;
    /**
     * - Tile options.
     */
    tile?: import('sharp').TileOptions;
    /**
     * - Remove the alpha channel from the image.
     */
    removeAlpha?: boolean;
    /**
     * - Ensure the image has an alpha channel.
     */
    ensureAlpha?: number;
    /**
     * - Extract a specific channel from the image.
     */
    extractChannel?: 0 | 1 | 2 | 3 | 'red' | 'green' | 'blue' | 'alpha';
    /**
     * - Join one or more channels to the image.
     */
    joinChannel?: string | Buffer | ArrayLike<string | Buffer>;
    /**
     * - Perform a bitwise boolean operation on all image channels.
     */
    bandbool?: keyof BoolEnum;
    /**
     * - Tint the image using the provided chroma.
     */
    tint?: Color;
    /**
     * - Convert the image to 8-bit greyscale.
     */
    greyscale?: boolean;
    /**
     * - Alternative spelling of greyscale.
     */
    grayscale?: boolean;
    /**
     * - Set the pipeline colourspace.
     */
    pipelineColourspace?: string;
    /**
     * - Alternative spelling of pipelineColourspace.
     */
    pipelineColorspace?: string;
    /**
     * - Set the output colourspace.
     */
    toColourspace?: string;
    /**
     * - Alternative spelling of toColourspace.
     */
    toColorspace?: string;
    /**
     * - Perform an affine transform on the image.
     */
    affine?: [number, number, number, number] | import("sharp").Matrix2x2;
    /**
     * - Apply a median filter to the image.
     */
    median?: number;
    /**
     * - Blur the image.
     */
    blur?: number | boolean;
    /**
     * - Merge alpha transparency channel with a background.
     */
    flatten?: boolean | FlattenOptions;
    /**
     * - Apply gamma correction to the image.
     */
    gamma?: number;
    /**
     * - Produce the "negative" of the image.
     */
    negate?: boolean | NegateOptions;
    /**
     * - Enhance image contrast by stretching its luminance.
     */
    normalise?: NormaliseOptions;
    /**
     * - Alternative spelling of normalise.
     */
    normalize?: NormaliseOptions;
    /**
     * - Perform contrast limiting adaptive histogram equalization.
     */
    clahe?: ClaheOptions;
    /**
     * - Convolve the image with a specified kernel.
     */
    convolve?: Kernel;
    /**
     * , keyof BoolEnum, { raw: Raw }} [boolean] - Perform a bitwise boolean operation with an operand image.
     */
    "": string | Buffer;
    /**
     * - Recomb the image with a specified matrix.
     */
    recomb?: import("sharp").Matrix3x3;
};
declare class ToolSharp extends Tool {
    /**
    * Constructs a new ToolSharp instance.
    * @param {ToolOptions} options - Configuration options for ToolSharp.
    */
    constructor(options: ToolOptions, pathIn: any, pathOut: any);
    options: {
        exts: string[];
    };
    onEveryFile(next: any, { file, options }: {
        file: any;
        options: any;
    }): Promise<void>;
}
import Tool from '@toolx/core/Tool.server.js';
