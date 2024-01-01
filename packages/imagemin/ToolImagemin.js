
import Tool from '@toolx/core/Tool.server.js';
import { runFile } from '@toolx/core/utils.server.js'
import optipng from 'optipng-bin';

class ToolImagemin extends Tool {
    options = {
        exts: ['png']
        //'jpg', 'jpeg', 'gif'
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

        execFile(optipng, ['-out', 'output.png', 'input.png'], error => {
            console.log('Image minified!');
        });

        await runFile()
        // await imagemin([file], {
        //     destination: pathIn,
        //     plugins: [
        //         imageminJpegtran({
        //             ...(options?.jpg || {})
        //         }),
        //         imageminPngquant({
        //             speed: 1,
        //             strip: true,
        //             quality: [0.2, 0.6],
        //             ...(options?.png || {})
        //         }),
        //         imageminGifsicle({
        //             interlaced: false,
        //             optimizationLevel: 1,
        //             colors: 256,
        //             ...(options?.gif || {})
        //         })
        //     ]
        // })

        next(file);
    }
}

export default ToolImagemin


/**
 * @typedef ToolOptions
 * @property {Object} [png] - The parameter object containing details for OptiPNGOptions.
 * @property {number} [png.optimizationLevel=2] - Optimization level (0-7).
 * @property {boolean} [png.verbose=false] - Run in verbose mode.
 * @property {boolean} [png.backup=false] - Keep a backup of the modified files.
 * @property {boolean} [png.clobber=false] - Overwrite existing files.
 * @property {boolean} [png.fix=false] - Enable error recovery.
 * @property {boolean} [png.force=false] - Enforce writing of a new output file.
 * @property {boolean} [png.preserve=false] - Preserve file attributes if possible.
 * @property {boolean} [png.quiet=false] - Run in quiet mode.
 * @property {boolean} [png.simulate=false] - Run in simulation mode.
 * @property {string} [png.out] - Write output file to specified path.
 * @property {string} [png.dir] - Write output file(s) to specified directory.
 * @property {string} [png.log] - Log messages to specified file.
 * @property {number[]} [png.filters=[0, 5]] - PNG delta filters (0-5).
 * @property {number} [png.interlaceType] - PNG interlace type (0-1).
 * @property {number[]} [png.zlibCompressionLevels=9] - Zlib compression levels (1-9).
 * @property {number[]} [png.zlibMemoryLevels=8] - Zlib memory levels (1-9).
 * @property {number[]} [png.zlibCompressionStrategies=[0, 3]] - Zlib compression strategies (0-3).
 * @property {string} [png.zlibWindowSize] - Zlib window size (256,512,1k,2k,4k,8k,16k,32k).
 * @property {boolean} [png.fullReport=false] - Produce a full report on IDAT.
 * @property {boolean} [png.noBitDepthReduction=false] - No bit depth reduction.
 * @property {boolean} [png.noColorTypeReduction=false] - No color type reduction.
 * @property {boolean} [png.noPaletteReduction=false] - No palette reduction.
 * @property {boolean} [png.noReductions=false] - No reductions.
 * @property {boolean} [png.noIDATRecoding=false] - No IDAT recoding.
 * @property {boolean} [png.snip=false] - Cut one image out of multi-image or animation files.
 * @property {string} [png.strip] - Strip metadata objects (e.g., "all").
 */
