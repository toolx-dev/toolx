
import Tool from '@toolx/core/Tool.server.js';
import imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';

class ToolImagemin extends Tool {
    /**
    * Constructs a new ToolImagemin instance.
    * @param {ToolOptions} options - Configuration options for ToolImagemin.
    * @param {string | [string]} pathIn - The input path where the current files are located.
    * @param {string} pathOut - The output path where the processed file will be stored.
    */
    constructor(options, pathIn, pathOut) {
        super(options, pathIn, pathOut);
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
    async onEveryFile(next, { file, options }) {
        await imagemin([file], {
            destination: pathIn,
            plugins: [
                imageminJpegtran({
                    ...(options?.jpg || {})
                }),
                imageminPngquant({
                    speed: 1,
                    strip: true,
                    quality: [0.2, 0.6],
                    ...(options?.png || {})
                })
            ]
        })

        next(file);
    }
}

export default ToolImagemin

/**
 * @typedef ToolOptions
 * @property {string[]} [exts] - Option to configure extensions.
 * @property {string[]} [includes] - Option to configure include files with this string.
 * @property {string[]} [excludes] - Option to configure exclude files with this string.
 * @property {Object} [jpg] - The parameter object containing details for jpg file.
 * @property {boolean} [jpg.progressive] - Lossless conversion to progressive.
 * @property {boolean} [jpg.arithmetic] - Use arithmetic coding.
 * @property {Object} [png] - The parameter object containing details for png file.
 * @property {number} [png.speed] - Default = 4, Speed 10 has 5% lower quality, but is about 8 times faster than the default. Speed 11 disables dithering and lowers compression level.
 * @property {boolean} [png.strip] - Remove optional metadata.
 * @property {[number, number]} [png.quality] - Min and max are numbers in range 0 (worst) to 1 (perfect), similar to JPEG.
 * @property {number|boolean} [png.dithering] - Set the dithering level using a fractional number between 0 (none) and 1 (full).
 * @property {number} [png.posterize] - Truncate number of least significant bits of color (per channel)
 */
