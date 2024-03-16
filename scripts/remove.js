import fs from 'node:fs';
import { Tool } from '@toolx/core';
import { toCamelCase } from '@toolx/core/utils.js';

const args = process.argv.slice(2);

const run = async () => {
    const [name, type = "tools"] = args;
    const dir = `${process.cwd()}/${type}/${toCamelCase(name).toLowerCase()}/`;
    const folder = await Tool.exist(dir);

    const packageRootInfo = await fs.promises.readFile(`${process.cwd()}/package.json`);
    const tsconfig = await fs.promises.readFile(`${process.cwd()}/tsconfig.json`);

    if (folder) {
        await fs.promises.rm(dir, { recursive: true, force: true });

        const packageRootInfoEdited = JSON.parse(packageRootInfo);
        packageRootInfoEdited.workspaces = packageRootInfoEdited.workspaces.filter(e => e !== `${type}/${name}`);
        await fs.promises.writeFile(`${process.cwd()}/package.json`, JSON.stringify(packageRootInfoEdited, null, 4));

        const tsconfigEdited = JSON.parse(tsconfig);
        tsconfigEdited.include = tsconfigEdited.include.filter(e => e !== `${type}/${name}/Tool${toCamelCase(name, true)}.js`);
        await fs.promises.writeFile(`${process.cwd()}/tsconfig.json`, JSON.stringify(tsconfigEdited, null, 4));
    }
};

run();

