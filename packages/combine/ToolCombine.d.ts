export default ToolCombine;
declare class ToolCombine extends Tool {
    options: {
        exts: string[];
    };
    fileCollector: any[];
    groups: any[];
    /**
     * combineImages
     * @param {string} image1
     * @param {string} image2
     * @param {string} image3
     * @returns {[Buffer, { width: number, height: number, channels: number }];}
     */
    combineImages(image1: string, image2: string, image3: string): [Buffer, {
        width: number;
        height: number;
        channels: number;
    }];
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
    onEveryFile(next: Function, { file }: {
        file: string;
        pathIn: string;
        pathOut: string;
        files: string[];
        options: any;
        prev: any;
        index: number;
    }): Promise<void>;
    /**
     * onBody
     * @param {function} next - Callback function to proceed to the next file or operation.
     * @param {Object} param - The parameter object containing details for file processing.
     * @param {string} param.pathIn - The input path where the current file is located.
     * @param {string} param.pathOut - The output path where the processed file will be stored.
     * @param {string[]} param.files - An array of file paths that are being processed in the current operation.
     * @param {*} param.options - Additional options or settings specific to the current processing task.
     */
    onBody(next: Function, { files, ...props }: {
        pathIn: string;
        pathOut: string;
        files: string[];
        options: any;
    }): Promise<void>;
}
import Tool from "@toolx/core/Tool.server";
