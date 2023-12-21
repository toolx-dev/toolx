export default ToolSharp;
export type ToolSharpOptions = {
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
declare class ToolSharp extends Tool {
    /**
    * Constructs a new ToolSharp instance.
    * @param {ToolSharpOptions} options - Configuration options for ToolSharp.
    */
    constructor(options: ToolSharpOptions, pathIn: any, pathOut: any);
    options: {
        exts: string[];
    };
    onEveryFile(next: any, { file, options }: {
        file: any;
        options: any;
    }): Promise<void>;
}
import Tool from "@toolx/core/Tool.server";
