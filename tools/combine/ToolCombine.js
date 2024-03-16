
import Tool from '@toolx/core/Tool.server.js';
import sharp from 'sharp';
import path from 'node:path';
import { exec } from 'node:child_process';

class ToolCombine extends Tool {
    options = {
        exts: ['jpg', 'jpeg', 'png', 'webp', 'tiff', 'gif', 'avif', 'heif'],
    }

    fileCollector = []

    groups = []

    /**
     * combineImages
     * @param {string} image1 
     * @param {string} image2 
     * @param {string} image3 
     * @returns {[Buffer, { width: number, height: number, channels: number }];}
     */
    async combineImages(image1, image2, image3) {
        // Use the metadata from the first image to define width, height, and channels
        const { width, height } = await sharp(image1).metadata();

        // Helper function to convert an image to grayscale and extract the red channel buffer
        const toRedChannelBuffer = async (imgPath) => {
            if (imgPath) {
                const { data } = await sharp(imgPath)
                    .grayscale() // Convert to grayscale
                    .flatten({ background: '#000000' }) // Flatten image onto black background
                    .raw()
                    .toBuffer({ resolveWithObject: true });
                return data;
            }
            return Buffer.alloc(width * height, 0); // Return buffer filled with zeros if image does not exist
        };

        // Convert images to grayscale and extract red channel buffers
        const redBuffer = await toRedChannelBuffer(image1);
        const greenBuffer = await toRedChannelBuffer(image2);
        const blueBuffer = await toRedChannelBuffer(image3);

        // Allocate buffer for RGB (no alpha channel)
        const combinedBuffer = Buffer.alloc(width * height * 3);

        // Combine the red channels from each image into the final image's RGB channels
        for (let i = 0; i < width * height; i++) {
            combinedBuffer[i * 3] = redBuffer[i];      // Red channel from the first image
            combinedBuffer[i * 3 + 1] = greenBuffer[i]; // Green channel from the second image
            combinedBuffer[i * 3 + 2] = blueBuffer[i];  // Blue channel from the third image
        }

        return [combinedBuffer, { width, height, channels: 3 }];
    }

    /**
     * onEveryFile
     * @param {function} next - Callback function to proceed to the next file or operation.
     * @param {Object} param - The parameter object containing details for file processing.
     * @param {string} param.file - The current file being processed.
     * @param {string} param.pathIn - The input path where the current file is located.
     * @param {string} param.pathOut - The output path where the processed file will be stored.
     * @param {string[]} param.files - An array of file paths that are being processed in the current operation.
     * @param {*} param.options - Additional options or settings specific to the current processing task.
     * @param {*} param.prev - The result or data from the previous file processed or the previous step in the pipeline.
     * @param {number} param.index - The index of the current file in the array of files being processed.
     */
    async onEveryFile(next, { file }) {
        this.fileCollector.push(file)

        next(file);
    }

    /**
     * onBody
     * @param {function} next - Callback function to proceed to the next file or operation.
     * @param {Object} param - The parameter object containing details for file processing.
     * @param {string} param.pathIn - The input path where the current file is located.
     * @param {string} param.pathOut - The output path where the processed file will be stored.
     * @param {string[]} param.files - An array of file paths that are being processed in the current operation.
     * @param {*} param.options - Additional options or settings specific to the current processing task.
     */
    async onBody(next, { files, ...props }) {
        for (let i = 0; i < this.fileCollector.length; i += 3) {
            this.groups.push(this.fileCollector.slice(i, i + 3));
        }

        const buffers = await Promise.all(this.groups.map(async (group, i) => {
            if (group.length < 2) Promise.resolve();
            const [combinedBuffer, info] = await this.combineImages(...group);
            return { combinedBuffer, width: info.width, height: info.height, channels: info.channels, ext: path.extname(group[0]), dirname: path.dirname(group[0]), filename: group.map(e => path.basename(e.replace(path.extname(e), ''))).join('__') }
        }))

        await Promise.all(files.map((file) => Tool.removeDir(file)))

        await Promise.all(buffers.map(async ({ combinedBuffer, width, height, channels, dirname, ext, filename }) => {
            await sharp(combinedBuffer, { raw: { width, height, channels } }).toFile(path.resolve(dirname, filename + ext));
        }))

        this.fileCollector = [];

        next(files)
    }
}

export default ToolCombine