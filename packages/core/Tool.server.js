import Base from './Base.js';
import os from 'node:os';
import fs, { constants } from 'node:fs';
import path from 'node:path';
import glob from 'fast-glob';
import Event from './Event.js';

/**
 * Tool.server
 * @extends Base
 */
class Tool extends Base {
    /**
     * Enum of supported custom event names.
     * @readonly
     * @enum {string}
     */
    static EVENTS = {
        /**
         * Event triggered when the tool starts its operation.
         * @type {string}
         */
        START: 'start',

        /**
         * Event triggered during the processing of files.
         * @type {string}
         */
        PROCESS: 'process',

        /**
         * Event triggered when the tool completes its operation.
         * @type {string}
         */
        END: 'end'
    };

    options = {

    }

    /**
     * Creates a directory if it doesn't exist.
     * @param {string} dirPath - The path of the directory to create.
     * @returns {Promise<boolean>} - Returns a promise indicating whether the directory was created.
     */
    static async createDir(dirPath) {
        const exist = await Tool.exist(dirPath);
        if (!exist) return !!fs.promises.mkdir(dirPath, { recursive: true });
        return Promise.resolve(null);
    }

    /**
     * Checks if a path exists.
     * @param {string} path - The path to check for existence.
     * @returns {Promise<boolean>} - Returns a promise indicating whether the path exists.
     */
    static async exist(path) {
        try {
            await fs.promises.access(path, constants.R_OK | constants.W_OK);
            return true;
        } catch (error) {
            // no output error
        }
        return false;
    }

    /**
     * changeExt
     * @param {string} [file]
     * @param {string} [ext]
     * @returns {string}
     */
    static changeExt(file, ext) {
        return file.replace(path.extname(file), ext);
    }

    /**
     * removeFiles
     * @param {string[]} files
     * @returns {Promise<any>}
     */
    static removeFiles(files) {
        return Promise.all(files.map(file => {
            return fs.promises.unlink(file)
        }));
    }

    /**
     * Removes a directory and its contents.
     * @param {string} dirPath - The path of the directory to remove.
     * @returns {Promise<void>}
     */
    static async removeDir(dirPath) {
        const exist = await Tool.exist(dirPath);
        if (exist) {
            return fs.promises.rm(dirPath, { recursive: true, force: true });
        }
        return Promise.resolve()
    }

    /**
     * Runs the tool's main logic.
     * @param {object} options - Options for the tool.
     * @param {string | string[]} pathIn - Input path(s).
     * @param {string} pathOut - Output path.
     * @returns {Promise<object>} - A promise containing the modified pathIn and copied files paths.
     */
    async run(options, pathIn, pathOut) {
        this.eventHandler = new Event({
            name: this.constructor.name,
        });

        this.opts = {
            export: true,
            ...this.options, // options from tool
            ...this._options, // options from tool props
            ...options,
        }

        // Convert input path(s) to a flat array
        const _pathIn = Array(pathIn).flat();

        // Generate a temporary path using os.tmpdir() and a unique identifier
        const pathTemp = path.join(os.tmpdir(), `toolx_${this.getUID()}`);

        // Create a temporary directory if it doesn't exist
        await Tool.createDir(pathTemp);

        // Create the output directory if it doesn't exist
        await Tool.createDir(pathOut);

        // Copy files from input paths to the temporary path
        const filesPath = await this.copyFiles(_pathIn, pathTemp);

        // Check if the first input path starts with the temporary directory and remove it if necessary
        if (this.isTempFolder(_pathIn[0])) await Tool.removeDir(_pathIn[0]);

        this.eventHandler.emit(Tool.EVENTS.START, { pathIn: pathTemp, pathOut, options: this.opts })

        await this.onStart(pathTemp, pathOut, this.opts);

        // Process the files
        const output = await this.process(filesPath, pathTemp, pathOut);

        // Return the modified temporary path and the copied files paths
        return { pathIn: pathTemp, files: filesPath, ...output };
    }

    /**
     * Processes files.
     * @param {string[]} files - Array of file paths.
     * @param {string} pathIn - Input path.
     * @param {string} pathOut - Output path.
     * @returns {Promise<any>} - A promise containing the processing output.
     */
    async process(files, pathIn, pathOut) {
        const options = this.opts;
        const { excludes, includes, basename } = options;
        let filesOutput = [];

        if (!files) {
            this.log('No files?')
        }

        if (files && files.length > 0) {
            /**
             *
             * @param {string} file
             * @param {number} index
             * @param {any} [prev]
             */
            const fileRun = (file, index, prev) => {
                if (!this.filterFile(file, includes, excludes, basename)) {
                    return Promise.resolve();
                }

                return new Promise((resolveFile) => {
                    this.onEveryFile(resolveFile, {
                        pathIn,
                        pathOut,
                        files,
                        file,
                        options,
                        prev,
                        index,
                    });
                });
            };

            // Perform asynchronous operations on each file in sequence using reduce
            await files.reduce(
                // prevFile is a promise that resolves to the value passed between iterations
                (prevFile, nextFile, index) =>
                    prevFile.then((value) => {
                        if ((this.opts?.exts && Tool.checkFileExt(nextFile, this.opts.exts)) || !this.opts?.exts) {
                            // Execute the fileRun function for the current file
                            const outputFile = fileRun(nextFile, index, value).then((file) => {

                                this.eventHandler.emit(Tool.EVENTS.PROCESS, { file })

                                // Push the resolved file value to the filesOutput array
                                filesOutput.push(file);
                            });
                            return outputFile; // Return the promise of the fileRun operation
                        } else {
                            return Promise.resolve()
                        }

                    }),
                Promise.resolve() // Initial value of prevFile promise
            );
        }

        const body = await new Promise((resolveFile) => {
            this.onBody(resolveFile, {
                pathIn,
                pathOut,
                files: filesOutput,
                options,
            });
        });

        // Check if the current iteration is the last one
        if (!options.count || options.index === options.count - 1) {
            body.files = []
            // Check if export option is enabled
            if (options.export) {
                // Determine the path to be exported based on the export option type
                const _pathIn = typeof options.export === 'boolean' ? `${pathIn}/**/*` : `${pathIn}/${options.export}`;

                // Copy the files to the output path
                await this.copyFiles([_pathIn], pathOut, (file) => {
                    body.files.push(file)
                });
            }

            filesOutput = body.files;

            // Remove the temporary directory
            await Tool.removeDir(pathIn);
        }


        this.eventHandler.emit(Tool.EVENTS.END, {
            pathIn,
            pathOut,
            files: filesOutput,
            options,
        })

        return body
    }

    /**
    * Filters files based on inclusion, exclusion, and basename criteria.
    * @param {string} file - The file path to filter.
    * @param {string[]} [includes] - Array of patterns to include.
    * @param {string[]} [excludes] - Array of patterns to exclude.
    * @param {string} [basename] - Basename to match.
    * @returns {boolean} - Returns true if the file matches the criteria, otherwise false.
    */
    filterFile(file, includes, excludes, basename) {
        // Check if file matches inclusion criteria or no inclusion criteria is provided
        if ((includes && this.includes(includes, file)) || !includes) {
            // Check if file matches exclusion criteria or no exclusion criteria is provided
            if ((excludes && this.excludes(excludes, file)) || !excludes) {
                // Check if file matches basename criterion or no basename criterion is provided
                if ((basename && this.exact(basename, path.basename(file))) || !basename) {
                    return true; // File matches all criteria
                }
            }
        }
        return false; // File does not match one or more criteria
    }

    /**
     * Copies files from source paths to a target path.
     * @param {string[]} pathsIn - Source path(s).
     * @param {string} pathOut - Target path.
     * @param {(arg0: string) => void} [onCopy]
     * @returns {Promise<string[]>} - A promise containing an array of copied file paths.
     */
    async copyFiles(pathsIn, pathOut, onCopy) {
        try {
            const copyPromises = await Promise.all(pathsIn.map(async (_pathIn) => {
                const { dynamic } = glob.generateTasks(_pathIn, { objectMode: true })[0];

                const pathIn = this.isTempFolder(_pathIn) && !dynamic ? _pathIn : _pathIn;

                const files = await glob(pathIn, {
                    objectMode: false,
                    dot: false,
                    extglob: true,
                    globstar: true,
                });

                const { base } = glob.generateTasks(pathIn, { objectMode: true })[0];

                this.opts.basePathIn = base;

                if (files.length === 0) {
                    return Promise.resolve([]);
                }

                return Promise.all(files.map((pathFile) => {
                    const basePath = this.opts?.basePath;
                    let pathFileOut = pathFile.replace(base, pathOut);

                    if (basePath && pathFile.startsWith(basePath) && !dynamic) {
                        const file = path.basename(pathFile);
                        const subPath = pathFile.replace(basePath, '').replace(file, '');
                        console.log(pathOut + subPath + file)
                        pathFileOut = pathOut + subPath + file;
                    }

                    if (onCopy) onCopy(pathFileOut)
                    return fs.promises.cp(pathFile, pathFileOut, { recursive: false }).then(() => pathFileOut);
                }))
            }))

            return copyPromises.flat();

        } catch (error) {
            console.error('Error reading source folder:', error);
        }
    }

    /**
     * Checks if a path belongs to a temporary folder.
     * @param {string} pathIn - The path to check.
     * @returns {boolean} - Returns true if the path is within a temporary folder, otherwise false.
     */
    isTempFolder(pathIn) {
        return pathIn.startsWith(os.tmpdir())
    }

    /**
     * onStart
     * @param {string | string[]} pathIn
     * @param {string} pathOut
     * @param {*} options
     */
    async onStart(pathIn, pathOut, options) {
    }

    /**
     * Placeholder for handling every file.
     * @param {function} resolveFile - Callback function to resolve the file processing.
     * @param {object} data - Data related to file processing.
     */
    onEveryFile(resolveFile, data) {
        resolveFile(data);
    }

    /**
     * Placeholder for handling the body of files processing.
     * @param {function} resolveFile - Callback function to resolve the file processing.
     * @param {object} data - Data related to the files processing.
     */
    onBody(resolveFile, data) {
        resolveFile(data);
    }
}

export default Tool;
