export default Tool;
/**
 * Tool.server
 * @extends Base
 */
declare class Tool extends Base {
    /**
     * Enum of supported custom event names.
     * @readonly
     * @enum {string}
     */
    static readonly EVENTS: {
        /**
         * Event triggered when the tool starts its operation.
         * @type {string}
         */
        START: string;
        /**
         * Event triggered during the processing of files.
         * @type {string}
         */
        PROCESS: string;
        /**
         * Event triggered when the tool completes its operation.
         * @type {string}
         */
        END: string;
    };
    /**
     * Creates a directory if it doesn't exist.
     * @param {string} dirPath - The path of the directory to create.
     * @returns {Promise<boolean>} - Returns a promise indicating whether the directory was created.
     */
    static createDir(dirPath: string): Promise<boolean>;
    /**
     * Checks if a path exists.
     * @param {string} path - The path to check for existence.
     * @returns {Promise<boolean>} - Returns a promise indicating whether the path exists.
     */
    static exist(path: string): Promise<boolean>;
    /**
     * changeExt
     * @param {string} [file]
     * @param {string} [ext]
     * @returns {string}
     */
    static changeExt(file?: string, ext?: string): string;
    /**
     * removeFiles
     * @param {string[]} files
     * @returns {Promise<any>}
     */
    static removeFiles(files: string[]): Promise<any>;
    /**
     * Removes a directory and its contents.
     * @param {string} dirPath - The path of the directory to remove.
     * @returns {Promise<void>}
     */
    static removeDir(dirPath: string): Promise<void>;
    options: {};
    /**
     * Runs the tool's main logic.
     * @param {object} options - Options for the tool.
     * @param {string | string[]} pathIn - Input path(s).
     * @param {string} pathOut - Output path.
     * @returns {Promise<object>} - A promise containing the modified pathIn and copied files paths.
     */
    run(options: object, pathIn: string | string[], pathOut: string): Promise<object>;
    eventHandler: Event;
    opts: any;
    /**
     * Processes files.
     * @param {string[]} files - Array of file paths.
     * @param {string} pathIn - Input path.
     * @param {string} pathOut - Output path.
     * @returns {Promise<any>} - A promise containing the processing output.
     */
    process(files: string[], pathIn: string, pathOut: string): Promise<any>;
    /**
    * Filters files based on inclusion, exclusion, and basename criteria.
    * @param {string} file - The file path to filter.
    * @param {string[]} [includes] - Array of patterns to include.
    * @param {string[]} [excludes] - Array of patterns to exclude.
    * @param {string} [basename] - Basename to match.
    * @returns {boolean} - Returns true if the file matches the criteria, otherwise false.
    */
    filterFile(file: string, includes?: string[], excludes?: string[], basename?: string): boolean;
    /**
     * Copies files from source paths to a target path.
     * @param {string[]} pathsIn - Source path(s).
     * @param {string} pathOut - Target path.
     * @param {(arg0: string) => void} [onCopy]
     * @returns {Promise<string[]>} - A promise containing an array of copied file paths.
     */
    copyFiles(pathsIn: string[], pathOut: string, onCopy?: (arg0: string) => void): Promise<string[]>;
    /**
     * Checks if a path belongs to a temporary folder.
     * @param {string} pathIn - The path to check.
     * @returns {boolean} - Returns true if the path is within a temporary folder, otherwise false.
     */
    isTempFolder(pathIn: string): boolean;
    /**
     * onStart
     * @param {string | string[]} pathIn
     * @param {string} pathOut
     * @param {*} options
     */
    onStart(pathIn: string | string[], pathOut: string, options: any): Promise<void>;
    /**
     * onEveryFile
     * @param {function} resolveFile - Callback function to proceed to the next file or operation.
     * @param {Object} data - The parameter object containing details for file processing.
     * @param {string} data.file - The current file being processed.
     * @param {string} data.pathIn - The input path where the current file is located.
     * @param {string} data.pathOut - The output path where the processed file will be stored.
     * @param {string[]} data.files - An array of file paths that are being processed in the current operation.
     * @param {*} data.options - Additional options or settings specific to the current processing task.
     * @param {*} data.prev - The result or data from the previous file processed or the previous step in the pipeline.
     * @param {number} data.index - The index of the current file in the array of files being processed.
     */
    onEveryFile(resolveFile: Function, data: {
        file: string;
        pathIn: string;
        pathOut: string;
        files: string[];
        options: any;
        prev: any;
        index: number;
    }): void;
    /**
     * onBody
     * @param {function} resolveFile - Callback function to proceed to the next file or operation.
     * @param {Object} data - The parameter object containing details for file processing.
     * @param {string} data.pathIn - The input path where the current file is located.
     * @param {string} data.pathOut - The output path where the processed file will be stored.
     * @param {string[]} data.files - An array of file paths that are being processed in the current operation.
     * @param {*} data.options - Additional options or settings specific to the current processing task.
     */
    onBody(resolveFile: Function, data: {
        pathIn: string;
        pathOut: string;
        files: string[];
        options: any;
    }): void;
}
import Base from "./Base.js";
import Event from "./Event.js";
