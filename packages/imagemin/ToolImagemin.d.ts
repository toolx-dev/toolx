export default ToolImagemin;
export type ToolOptions = {
    /**
     * - Use lossless or lossy method.
     */
    lossless?: boolean;
    /**
     * - Optimization quality (1-10). 10 = Max compression.
     */
    compression?: number;
    /**
     * - Number of colors (1-255). Only on png format.
     */
    colors?: number;
    /**
     * - The parameter object containing details for OptiPNGOptions.
     */
    optipng?: OptiPNGOptions;
    /**
     * - The parameter object containing details for PNGQuantOptions.
     */
    pngquant?: PNGQuantOptions;
    /**
     * - The parameter object containing details for JPEGTranOptions.
     */
    jpegtran?: JPEGTranOptions;
    /**
     * - The parameter object containing details for MozJPEGOptions.
     */
    mozjpeg?: MozJPEGOptions;
    /**
     * - The parameter object containing details for GuetzliOptions.
     */
    guetzli?: GuetzliOptions;
    /**
     * - Activate guetzli instead of mozjpeg.
     */
    useGuetzli?: boolean;
};
export type OptiPNGOptions = {
    /**
     * - Optimization level (0-7).
     */
    o?: number;
    /**
     * - Optimization level (0-7).
     */
    optimization?: number;
    /**
     * - Enable error recovery.
     */
    fix?: boolean;
    /**
     * - Preserve file attributes if possible.
     */
    preserve?: boolean;
    /**
     * - PNG delta filters (0-5).
     */
    filters?: number;
    /**
     * - PNG interlace type (0-1).
     */
    interlaceType?: number;
    /**
     * - Zlib compression levels (1-9).
     */
    zlibCompressionLevels?: number;
    /**
     * - Zlib memory levels (1-9).
     */
    zlibMemoryLevels?: number;
    /**
     * - Zlib compression strategies (0-3).
     */
    zlibCompressionStrategies?: number;
    /**
     * - Zlib window size (256,512,1k,2k,4k,8k,16k,32k).
     */
    zlibWindowSize?: string;
    /**
     * - Produce a full report on IDAT.
     */
    fullReport?: boolean;
    /**
     * - No bit depth reduction.
     */
    noBitDepthReduction?: boolean;
    /**
     * - No color type reduction.
     */
    noColorTypeReduction?: boolean;
    /**
     * - No palette reduction.
     */
    noPaletteReduction?: boolean;
    /**
     * - No reductions.
     */
    noReductions?: boolean;
    /**
     * - No IDAT recoding.
     */
    noIDATRecoding?: boolean;
    /**
     * - Cut one image out of multi-image or animation files.
     */
    snip?: boolean;
    /**
     * - Strip metadata objects (e.g., "all").
     */
    strip?: string;
};
export type PNGQuantOptions = {
    /**
     * - Synonym of speed (0-100).
     */
    quality?: number;
    /**
     * - speed/quality trade-off. 1=slow, 4=default, 11=fast & rough.
     */
    speed?: number;
    /**
     * - disable Floyd-Steinberg dithering. Synonym: --nofs.
     */
    nofs?: boolean;
    /**
     * - output lower-precision color (e.g. for ARGB4444 output).
     */
    posterize?: number;
    /**
     * - remove optional metadata (default on Mac). Synonym: --strip.
     */
    strip?: boolean;
};
export type JPEGTranOptions = {
    /**
     * - Copy all extra markers. Synonym: --copy-all, --ca.
     */
    all?: boolean;
    /**
     * - Optimize Huffman table (smaller file, but slow compression). Synonym: --optimize-huffman.
     */
    optimize?: boolean;
    /**
     * - Create progressive JPEG file. Synonym: --progressive-jpeg.
     */
    progressive?: boolean;
    /**
     * - Crop to a rectangular subarea. Format: WxH+X+Y.
     */
    crop?: string;
    /**
     * - Reduce to grayscale (omit color data). Synonym: --grayscale, --gray.
     */
    grayscale?: boolean;
    /**
     * - Mirror image (left-right or top-bottom). Values: "horizontal" or "vertical".
     */
    flip?: string;
    /**
     * - Fail if there is non-transformable edge blocks. Synonym: --perfect, --p.
     */
    perfect?: boolean;
    /**
     * - Rotate image (degrees clockwise). Values: 90, 180, or 270.
     */
    rotate?: number;
    /**
     * - Transpose image. Synonym: --transpose, --t.
     */
    transpose?: boolean;
    /**
     * - Transverse transpose image. Synonym: --transverse-transpose, --tt.
     */
    transverse?: boolean;
    /**
     * - Drop non-transformable edge blocks. Synonym: --trim, --t.
     */
    trim?: boolean;
    /**
     * - Use arithmetic coding. Synonym: --arithmetic-coding, --ac.
     */
    arithmetic?: boolean;
    /**
     * - Set restart interval in rows or in blocks with B. Format: N.
     */
    restart?: number;
    /**
     * - Maximum memory to use (in kbytes). Synonym: --max-memory, --mm.
     */
    maxMemory?: number;
    /**
     * - Emit debug output. Synonyms: --verbose, --v, --debug.
     */
    verbose?: boolean;
    /**
     * - Create multi-scan JPEG per script file. Format: file.
     */
    scans?: boolean;
};
export type MozJPEGOptions = {
    /**
     * - Compression quality (0-100; 5-95 is most useful range, default is 75).
     */
    quality?: number[];
    /**
     * - Create monochrome JPEG file.
     */
    grayscale?: boolean;
    /**
     * - Create RGB JPEG file.
     */
    rgb?: boolean;
    /**
     * - Optimize Huffman table (smaller file, but slow compression, enabled by default).
     */
    optimize?: boolean;
    /**
     * - Create progressive JPEG file (enabled by default).
     */
    progressive?: boolean;
    /**
     * - Create baseline JPEG file (disable progressive coding).
     */
    baseline?: boolean;
    /**
     * - Input file is Targa format (usually not needed).
     */
    targa?: boolean;
    /**
     * - Revert to standard defaults (instead of mozjpeg defaults).
     */
    revert?: boolean;
    /**
     * - DC scan optimization mode: 0 One scan for all components, 1 One scan per component (default), 2 Optimize between one scan for all components and one scan for 1st component plus one scan for remaining components.
     */
    dcScanOpt?: number;
    /**
     * - Disable trellis optimization.
     */
    notrellis?: boolean;
    /**
     * - Enable trellis optimization of DC coefficients (default).
     */
    trellisDC?: boolean;
    /**
     * - Tune trellis optimization: 'psnr', 'hvs-psnr' (default), 'ssim', or 'ms-ssim'.
     * // Switches for advanced users:
     */
    tune?: string;
    /**
     * - Disable black-on-white deringing via overshoot.
     */
    noovershoot?: boolean;
    /**
     * - Use arithmetic coding.
     */
    arithmetic?: boolean;
    /**
     * - Use integer DCT method (default), 'fast' (less accurate), or floating-point DCT method.
     */
    dct?: 'int' | 'fast' | 'float';
    /**
     * - Use 8-bit quantization table entries for baseline JPEG compatibility.
     */
    quantBaseline?: boolean;
    /**
     * - Use predefined quantization table N: 0 (JPEG Annex K), 1 (Flat), 2 (Custom, tuned for MS-SSIM), 3 (ImageMagick table by N. Robidoux), 4 (Custom, tuned for PSNR-HVS), or 5 (Table from paper by Klein, Silverstein and Carney).
     */
    quantTable?: number;
    /**
     * - Set restart interval in rows or blocks with B.
     */
    restart?: number;
    /**
     * - Smooth dithered input (N=1..100 is strength).
     */
    smooth?: number;
    /**
     * - Maximum memory to use (in kbytes).
     */
    maxmemory?: number;
};
export type GuetzliOptions = {
    /**
     * - Visual quality to aim for, expressed as a JPEG quality value.
     */
    quality?: number;
    /**
     * - Memory limit in MB for Guetzli. If unable to stay under this limit, the process will fail.
     */
    memlimit?: number;
    /**
     * - Do not limit memory usage during the JPEG compression process by Guetzli.
     */
    nomemlimit?: boolean;
};
declare class ToolImagemin extends Tool {
    options: {
        exts: string[];
        lossless: boolean;
        compression: number;
        colors: number;
        pngquant: {
            force: boolean;
            strip: boolean;
            quality: string;
        };
        optipng: {
            force: boolean;
            quiet: boolean;
            strip: string;
        };
        mozjpeg: {};
        guetzli: {};
        jpegtran: {};
        useGuetzli: boolean;
    };
    mapRange(value: any, fromMin: any, fromMax: any, toMin: any, toMax: any, roundOutput: any): any;
    getArgs(type: any, lossless: any): any;
    getCommands(type: any, inputFile: any, outputfile: any, args?: any[]): any[];
    /**
     * onEveryFile
     * @param {function} next - Callback function to proceed to the next file or operation.
     * @param {Object} param - The parameter object containing details for file processing.
     * @param {string} param.file - The current file being processed.
     * @param {string} param.pathIn - The input path where the current file is located.
     * @param {string} param.pathOut - The output path where the processed file will be stored.
     * @param {string[]} param.files - An array of file paths that are being processed in the current operation.
     * @param {ToolOptions} param.options - Additional options or settings specific to the current processing task.
     * @param {*} param.prev - The result or data from the previous file processed or the previous step in the pipeline.
     * @param {number} param.index - The index of the current file in the array of files being processed.
     */
    onEveryFile(next: Function, { file, pathIn, options }: {
        file: string;
        pathIn: string;
        pathOut: string;
        files: string[];
        options: ToolOptions;
        prev: any;
        index: number;
    }): Promise<void>;
}
import Tool from '@toolx/core/Tool.server.js';
