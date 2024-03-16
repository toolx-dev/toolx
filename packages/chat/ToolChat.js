
import Tool from '@toolx/core/Tool.server.js';
import fs from 'node:fs'
import path from 'node:path'
import OpenAI from 'openai';

class ToolChat extends Tool {


    /**
    * Constructs a new ToolChat instance.
    * @param {ToolOptions} options - Configuration options for ToolChat.
    * @param {string | [string]} pathIn - The input path where the current files are located.
    * @param {string} pathOut - The output path where the processed file will be stored.
    */
    constructor(options, pathIn, pathOut) {
        super(options, pathIn, pathOut);
    }


    onStart(pathIn, pathOut, options) {
        this.openai = new OpenAI({
            apiKey: options.apiKey
        });
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
    async onEveryFile(next, { file, options }) {

        const fileContent = await fs.promises.readFile(file, 'utf8');

        const userPrevMessages = options?.userMessages ? options.userMessages.map((message) => ({ role: "user", content: message })) : []

        const completion = await this.openai.chat.completions.create({
            messages: [...options?.messages, ...userPrevMessages, { role: "user", content: fileContent }],
            model: options?.model || "gpt-3.5-turbo",
            ...options.api
        });

        const fileName = options.ext ? file.replace(path.extname(file), options.ext) : file;

        await fs.promises.writeFile(fileName, completion.choices[0].message.content);

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
        next(files);
    }
}

export default ToolChat

/**
 * @typedef {Object} ToolOptions
 * @property {string[]} [exts] - Option to configure extensions.
 * @property {string[]} [includes] - Option to configure include files with this string.
 * @property {string[]} [excludes] - Option to configure exclude files with this string.
 */

