import { Tool } from '@toolx/core';
import { toCamelCase } from '@toolx/core/utils.js';
import fs from 'node:fs';
import path from 'node:path';
import { execCommand } from './utils.js'

const args = process.argv.slice(2);

const templateJS = (name) => /*js*/`
import Tool from '@toolx/core/Tool.server.js';

class Tool${name} extends Tool {
    /**
    * Constructs a new Tool${name} instance.
    * @param {ToolOptions} options - Configuration options for Tool${name}.
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
     * @param {*} param.options - Additional options or settings specific to the current processing task.
     * @param {*} param.prev - The result or data from the previous file processed or the previous step in the pipeline.
     * @param {number} param.index - The index of the current file in the array of files being processed.
     */
    async onEveryFile(next, { file, options }) {
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

export default Tool${name}

/**
 * @typedef {Object} ToolOptions
 * @property {string[]} [exts] - Option to configure extensions.
 * @property {string[]} [includes] - Option to configure include files with this string.
 * @property {string[]} [excludes] - Option to configure exclude files with this string.
 */

`;


const templatePackage = (name, version) => /* json */`{
    "name": "@toolx/${toCamelCase(name).toLowerCase()}",
    "version": "${version.split('.')[0]}.0.0",
    "description": "",
    "main": "Tool${toCamelCase(name, true)}.js",
    "source": "Tool${toCamelCase(name, true)}.js",
    "bin": {
        "toolx-${name}": "./Tool${toCamelCase(name, true)}.cli.js"
    },
    "publishConfig": {
        "access": "public",
        "main": "Tool${toCamelCase(name, true)}.js"
    },
    "type": "module",
    "sideEffects": false,
    "dependencies": {
        "@toolx/core": "^${version}"
    },
    "scripts": {
        "test": "vitest run",
        "test:watch": "vitest"
    },
    "repository": {
        "type": "git",
        "url": "git+https://github.com/williammanco/toolx.git"
    },
    "author": "William Manco",
    "license": "MIT",
    "bugs": {
        "url": "https://github.com/williammanco/toolx/issues"
    },
    "homepage": "https://github.com/williammanco/toolx#readme",
    "keywords": [
        "ToolX",
        "tool",
        "${name}"
      ]
}
`;

const templateTest = (name) => /*js*/`import { describe, it, expect, beforeEach } from 'vitest';
import Tool from '../Tool${name}';

describe('Tool${name}', () => {
    let toolInstance;

    beforeEach(async () => {
        toolInstance = new Tool();
    });

    it('should create an instance of Tool', () => {
        expect(toolInstance).toBeInstanceOf(Tool);
    });
});
`;

const templateReadme = (name) => /*js*/`#tool-${name}`;

const templateCLI = (name) => /*js*/`#!/usr/bin/env node
import Tool from './Tool${name}.js'
import { getArgsFromCLI } from '@toolx/core/utils.server.js'

const { options, pathIn, pathOut } = getArgsFromCLI();
const tool = new Tool(options, pathIn, pathOut);

tool.run();
`

const run = async () => {
    const [name, type = "tools"] = args;


    const dir = `${process.cwd()}/${type}/${toCamelCase(name).toLowerCase()}/`;
    const folder = await Tool.createDir(dir);
    const nameCamelCase = toCamelCase(name, true);

    const packageInfo = await fs.promises.readFile(`${process.cwd()}/${type}/core/package.json`);
    const packageRootInfo = await fs.promises.readFile(`${process.cwd()}/package.json`);
    const tsconfig = await fs.promises.readFile(`${process.cwd()}/tsconfig.json`);
    const version = JSON.parse(packageInfo).version;

    if (folder) {
        await fs.promises.writeFile(`${dir}Tool${nameCamelCase}.js`, templateJS(nameCamelCase));
        await fs.promises.writeFile(`${dir}package.json`, templatePackage(name, version));
        await fs.promises.writeFile(`${dir}Tool${nameCamelCase}.cli.js`, templateCLI(nameCamelCase));
        await fs.promises.writeFile(`${dir}/README.md`, templateReadme(name));

        await execCommand(`chmod +x ${dir}Tool${nameCamelCase}.cli.js`);

        await Tool.createDir(path.join(dir, 'test'));
        await fs.promises.writeFile(`${path.join(dir, 'test')}/Tool${nameCamelCase}.test.js`, templateTest(nameCamelCase));

        const packageRootInfoEdited = JSON.parse(packageRootInfo);
        packageRootInfoEdited.workspaces.push(`${type}/${name}`)
        await fs.promises.writeFile(`${process.cwd()}/package.json`, JSON.stringify(packageRootInfoEdited, null, 4));

        const tsconfigEdited = JSON.parse(tsconfig);
        tsconfigEdited.include.push(`${type}/${name}/Tool${toCamelCase(name, true)}.js`)
        await fs.promises.writeFile(`${process.cwd()}/tsconfig.json`, JSON.stringify(tsconfigEdited, null, 4));
    }
};

run();

