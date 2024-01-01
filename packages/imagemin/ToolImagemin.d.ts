export default ToolImagemin;
export type ToolOptions = {
    /**
     * - Option to configure extensions.
     */
    exts?: string[];
    /**
     * - Option to configure include files with this string.
     */
    includes?: string[];
    /**
     * - Option to configure exclude files with this string.
     */
    excludes?: string[];
    /**
     * - The parameter object containing details for jpg file.
     */
    jpg?: {
        progressive?: boolean;
        arithmetic?: boolean;
    };
    /**
     * - The parameter object containing details for png file.
     */
    png?: {
        speed?: number;
        strip?: boolean;
        quality?: [number, number];
        dithering?: number | boolean;
        posterize?: number;
    };
    /**
     * - The parameter object containing details for gif file.
     */
    gif?: {
        interlaced?: boolean;
        optimizationLevel?: number;
        colors?: number;
    };
};
declare class ToolImagemin extends Tool {
    options: {
        exts: string[];
    };
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
