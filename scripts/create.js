import { Tool } from '@toolx/core';
import { toCamelCase } from '@toolx/core/utils.js';
import fs from 'node:fs';
import path from 'node:path';
import { execCommand } from './utils.js'

const args = process.argv.slice(2);

const templateJS = (name) => /*js*/`
import Tool from '@toolx/core/Tool.server.js';

class Tool${name} extends Tool {
    async onEveryFile(next, { file, options }) {
        next(file);
    }
}

export default Tool${name}
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
    "homepage": "https://github.com/williammanco/toolx#readme"
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
    const [name] = args;

    const dir = `${process.cwd()}/packages/${toCamelCase(name).toLowerCase()}/`;
    const folder = await Tool.createDir(dir);
    const nameCamelCase = toCamelCase(name, true);

    const packageInfo = await fs.promises.readFile(`${process.cwd()}/packages/core/package.json`);
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
        packageRootInfoEdited.workspaces.push(`packages/${name}`)
        await fs.promises.writeFile(`${process.cwd()}/package.json`, JSON.stringify(packageRootInfoEdited, null, 4));

        const tsconfigEdited = JSON.parse(tsconfig);
        tsconfigEdited.include.push(`packages/${name}/Tool${toCamelCase(name, true)}.js`)
        await fs.promises.writeFile(`${process.cwd()}/tsconfig.json`, JSON.stringify(tsconfigEdited, null, 4));
    }
};

run();

