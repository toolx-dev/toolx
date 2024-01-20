import Tool from '@toolx/core/Tool.server.js';
import { runFile } from '@toolx/core/utils.server.js'
import fs from 'node:fs';
import path from 'path';
import optipng from 'optipng-bin';
import pngquant from 'pngquant-bin';
import jpegtran from 'jpegtran-bin';
import mozjpeg from 'mozjpeg';
import ketargs from 'ketargs';

class ToolImagemin extends Tool {
    options = {
        exts: ['png', 'jpg', 'jpeg'],
        lossless: false,
        compression: 0,
        colors: 0,
        pngquant: {
            force: true,
            strip: true,
            quality: '65-80'
        },
        optipng: {
            force: true,
            quiet: true,
            strip: 'all',
        },
        mozjpeg: {},
        jpegtran: {},
    }

    mapRange(value, fromMin, fromMax, toMin, toMax, roundOutput) {
        const fromRange = fromMax - fromMin;
        const toRange = toMax - toMin;
        const scaledValue = (value - fromMin) / fromRange;
        let result;

        if (roundOutput) {
            result = Math.round(toMin + scaledValue * toRange);
        } else {
            result = toMin + scaledValue * toRange;
        }
        return result;
    }

    getArgs(type, lossless) {
        this.options.compression = Math.min(this.options.compression, 10);
        if (type === 'png') {
            if (lossless) {
                const process = (arr) => {
                    return arr.reduce((acc, current, index) => {
                        const condition = (current === '-o' || current === '-optimization');
                        if (condition && !isNaN(parseInt(arr[index + 1]))) {
                            current = `-o${arr[index + 1]}`;
                            return [...acc, current];
                        }
                        if (!isNaN(parseInt(current)) && index > 0 && String(arr[index - 1]).startsWith('-o')) {
                            return [...acc];
                        }
                        return [...acc, current];
                    }, []);
                }

                if (this.options.compression) {
                    this.options.optipng.optimization = this.mapRange(this.options.compression, 0, 10, 1, 7, true);
                }

                return process(ketargs(this.options.optipng).map(e => e.replace('--', '-'))) || [];
            } else {
                let colors = this.options.colors;

                const process = (arr) => {
                    const _arr = arr.reduce((acc, current, index) => {
                        const condition = (current === '--colors');

                        if (condition && !isNaN(parseInt(arr[index + 1]))) {
                            colors = Number(arr[index + 1]);
                            return [...acc];
                        }
                        if (!isNaN(parseInt(current)) && index > 0 && arr[index - 1] === '--colors')
                            return [...acc];

                        return [...acc, current];
                    }, []);

                    if (colors)
                        _arr.push(colors)
                    return _arr;
                }

                let opts = {};

                if (!colors && this.options.compression) {
                    opts.speed = this.mapRange(this.options.compression, 0, 10, 11, 1, true);
                }

                if (colors) {
                    opts.colors = this.options.colors;
                    this.options.pngquant.quality = false;
                }

                return process(ketargs({ ...opts, ...this.options.pngquant })) || [];
            }

        } else if (type === 'jpg') {
            if (lossless) {
                return ketargs(this.options.jpegtran).map(e => e.replace('--', '-')) || [];
            } else {
                if (this.options.compression > 0) this.options.mozjpeg.quality = this.mapRange(this.options.compression, 0, 10, 100, 1, true);
                return ketargs(this.options.mozjpeg).map(e => e.replace('--', '-')) || [];
            }
        }
    }

    getCommands(type, inputFile, outputfile, args = []) {
        if (type === 'png') {
            if (this.options.lossless) {
                return [optipng, [...this.getArgs('png', true), ...args, inputFile, '-out', outputfile]]
            } else {
                return [pngquant, [...this.getArgs('png', false), ...args, '--output', outputfile, inputFile]]
            }
        } else if (type === 'jpg') {
            if (this.options.lossless) {
                return [jpegtran, [...this.getArgs('jpg', true), ...args, '-outfile', outputfile, inputFile]]
            } else {
                return [mozjpeg, [...this.getArgs('jpg', false), ...args, '-outfile', outputfile, inputFile]]
            }
        }
    }

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
    async onEveryFile(next, { file, pathIn, options }) {
        const tempFilePath = file.replace(path.basename(file), `___temp___${path.basename(file)}`);
        const pristineFilePath = file.replace(path.basename(file), `___pristine___${path.basename(file)}`);

        await fs.promises.cp(file, tempFilePath, { recursive: false });
        await fs.promises.cp(file, pristineFilePath, { recursive: false });
        await Tool.removeDir(file);

        if (path.extname(file) === '.png') {
            await runFile(...this.getCommands('png', tempFilePath, file));
        } else if (path.extname(file) === '.jpg' || path.extname(file) === '.jpeg') {
            await runFile(...this.getCommands('jpg', tempFilePath, file));
        }

        const fileStats = await fs.promises.stat(file);
        const pristineStats = await fs.promises.stat(pristineFilePath);

        if (fileStats.size > pristineStats.size) {
            await Tool.removeDir(file);
            await fs.promises.rename(pristineFilePath, pristineFilePath.replace('___pristine___', ''));
        } else {
            await Tool.removeDir(pristineFilePath);
        }

        await Tool.removeDir(tempFilePath);

        next(file);
    }
}


export default ToolImagemin


/**
 * @typedef ToolOptions
 * @property {boolean} [lossless=false] - Use lossless or lossy method.
 * @property {number} [compression=0] - Optimization quality (1-10). 10 = Max compression.
 * @property {number} [colors=0] - Number of colors (1-255). Only on png format.
 * @property {OptiPNGOptions} [optipng] - The parameter object containing details for OptiPNGOptions.
 * @property {PNGQuantOptions} [pngquant] - The parameter object containing details for PNGQuantOptions.
 * @property {JPEGTranOptions} [jpegtran] - The parameter object containing details for JPEGTranOptions.
 * @property {MozJPEGOptions} [mozjpeg] - The parameter object containing details for MozJPEGOptions.
 */

/**
 * @typedef OptiPNGOptions
 * @property {number} [o=2] - Optimization level (0-7).
 * @property {number} [optimization=2] - Optimization level (0-7).
 * @property {boolean} [fix=false] - Enable error recovery.
 * @property {boolean} [preserve=false] - Preserve file attributes if possible.
 * @property {number} [filters] - PNG delta filters (0-5).
 * @property {number} [interlaceType] - PNG interlace type (0-1).
 * @property {number} [zlibCompressionLevels=9] - Zlib compression levels (1-9).
 * @property {number} [zlibMemoryLevels=8] - Zlib memory levels (1-9).
 * @property {number} [zlibCompressionStrategies] - Zlib compression strategies (0-3).
 * @property {string} [zlibWindowSize] - Zlib window size (256,512,1k,2k,4k,8k,16k,32k).
 * @property {boolean} [fullReport=false] - Produce a full report on IDAT.
 * @property {boolean} [noBitDepthReduction=false] - No bit depth reduction.
 * @property {boolean} [noColorTypeReduction=false] - No color type reduction.
 * @property {boolean} [noPaletteReduction=false] - No palette reduction.
 * @property {boolean} [noReductions=false] - No reductions.
 * @property {boolean} [optipng.noIDATRecoding=false] - No IDAT recoding.
 * @property {boolean} [optipng.snip=false] - Cut one image out of multi-image or animation files.
 * @property {string} [optipng.strip="all"] - Strip metadata objects (e.g., "all").
 */

/**
 * @typedef PNGQuantOptions
 * @property {number} [quality=0] - Synonym of speed (0-100).
 * @property {string} [quality="65-80"] - don't save below min, use fewer colors below max (0-100).
 * @property {number} [speed=4] - speed/quality trade-off. 1=slow, 4=default, 11=fast & rough.
 * @property {boolean} [nofs=false] - disable Floyd-Steinberg dithering. Synonym: --nofs.
 * @property {number} [posterize=0] - output lower-precision color (e.g. for ARGB4444 output).
 * @property {boolean} [strip=true] - remove optional metadata (default on Mac). Synonym: --strip.
*/

/**
 * @typedef JPEGTranOptions
 * @property {boolean} [all=false] - Copy all extra markers. Synonym: --copy-all, --ca.
 * @property {boolean} [optimize=false] - Optimize Huffman table (smaller file, but slow compression). Synonym: --optimize-huffman.
 * @property {boolean} [progressive=false] - Create progressive JPEG file. Synonym: --progressive-jpeg.
 * @property {string} [crop=""] - Crop to a rectangular subarea. Format: WxH+X+Y.
 * @property {boolean} [grayscale=false] - Reduce to grayscale (omit color data). Synonym: --grayscale, --gray.
 * @property {string} [flip="horizontal"] - Mirror image (left-right or top-bottom). Values: "horizontal" or "vertical".
 * @property {boolean} [perfect=false] - Fail if there is non-transformable edge blocks. Synonym: --perfect, --p.
 * @property {number} [rotate=0] - Rotate image (degrees clockwise). Values: 90, 180, or 270.
 * @property {boolean} [transpose=false] - Transpose image. Synonym: --transpose, --t.
 * @property {boolean} [transverse=false] - Transverse transpose image. Synonym: --transverse-transpose, --tt.
 * @property {boolean} [trim=false] - Drop non-transformable edge blocks. Synonym: --trim, --t.
 * @property {boolean} [arithmetic=false] - Use arithmetic coding. Synonym: --arithmetic-coding, --ac.
 * @property {number} [restart] - Set restart interval in rows or in blocks with B. Format: N.
 * @property {number} [maxMemory=0] - Maximum memory to use (in kbytes). Synonym: --max-memory, --mm.
 * @property {boolean} [verbose=false] - Emit debug output. Synonyms: --verbose, --v, --debug.
 * @property {boolean} [scans=false] - Create multi-scan JPEG per script file. Format: file.
*/

/**
 * @typedef MozJPEGOptions
 * @property {number[]} [quality=[75]] - Compression quality (0-100; 5-95 is most useful range, default is 75).
 * @property {boolean} [grayscale=false] - Create monochrome JPEG file.
 * @property {boolean} [rgb=true] - Create RGB JPEG file.
 * @property {boolean} [optimize=true] - Optimize Huffman table (smaller file, but slow compression, enabled by default).
 * @property {boolean} [progressive=true] - Create progressive JPEG file (enabled by default).
 * @property {boolean} [baseline=false] - Create baseline JPEG file (disable progressive coding).
 * @property {boolean} [targa=false] - Input file is Targa format (usually not needed).
 * @property {boolean} [revert=false] - Revert to standard defaults (instead of mozjpeg defaults).
 * @property {number} [dcScanOpt=1] - DC scan optimization mode: 0 One scan for all components, 1 One scan per component (default), 2 Optimize between one scan for all components and one scan for 1st component plus one scan for remaining components.
 * @property {boolean} [notrellis=false] - Disable trellis optimization.
 * @property {boolean} [trellisDC=true] - Enable trellis optimization of DC coefficients (default).
 * @property {string} [tune='hvs-psnr'] - Tune trellis optimization: 'psnr', 'hvs-psnr' (default), 'ssim', or 'ms-ssim'.
 * // Switches for advanced users:
 * @property {boolean} [noovershoot=false] - Disable black-on-white deringing via overshoot.
 * @property {boolean} [arithmetic=false] - Use arithmetic coding.
 * @property {'int'|'fast'|'float'} [dct='int'] - Use integer DCT method (default), 'fast' (less accurate), or floating-point DCT method.
 * @property {boolean} [quantBaseline=false] - Use 8-bit quantization table entries for baseline JPEG compatibility.
 * @property {number} [quantTable=0] - Use predefined quantization table N: 0 (JPEG Annex K), 1 (Flat), 2 (Custom, tuned for MS-SSIM), 3 (ImageMagick table by N. Robidoux), 4 (Custom, tuned for PSNR-HVS), or 5 (Table from paper by Klein, Silverstein and Carney).
 * @property {number} [restart] - Set restart interval in rows or blocks with B.
 * @property {number} [smooth=0] - Smooth dithered input (N=1..100 is strength).
 * @property {number} [maxmemory] - Maximum memory to use (in kbytes).
*/