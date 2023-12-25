import { describe, it, expect, beforeEach, afterAll, } from 'vitest';
import Tool from '../Tool.server';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';


describe('Tool class', () => {
    const tempDirPath = path.join(process.env.RUNNER_TEMP || os.tmpdir(), "Toolx", path.basename(__filename).replace(".js", ""));
    let toolInstance;

    beforeEach(async () => {
        toolInstance = new Tool();
        if (await Tool.exist(tempDirPath)) {
            await Tool.removeDir(tempDirPath);
        }
    });

    afterAll(async () => {
        if (await Tool.exist(tempDirPath)) {
            await Tool.removeDir(tempDirPath);
        }
    });

    it('should create an instance of Tool', () => {
        expect(toolInstance).toBeInstanceOf(Tool);
    });

    it('should have options initialized', () => {
        expect(toolInstance.options).toEqual({});
    });

    it('should check if create dir and path exists', async () => {
        if (process.env.RUNNER_TEMP) return; // TODO: check this test on github actions
        await Tool.createDir(tempDirPath);
        const dirExists = await Tool.exist(tempDirPath)
        expect(dirExists).toBe(true);
        const tempFilePath = path.join(tempDirPath, 'temp.txt');
        await fs.writeFile(tempFilePath, 'Hello, World!');
        const fileExists = await Tool.exist(tempFilePath)
        expect(fileExists).toBe(true);
    });

    it('should create a directory if it does not exist', async () => {
        let dirExists = await Tool.exist(tempDirPath)
        expect(dirExists).toBe(false);

        await Tool.createDir(tempDirPath);
        dirExists = await Tool.exist(tempDirPath)
        expect(dirExists).toBe(true);
    });

    it('should change the file extension', () => {
        const file = 'example.jpg';
        const newExt = '.png';
        const changedFile = Tool.changeExt(file, newExt);

        expect(changedFile).toBe('example.png');
    });

    it('should remove specified files', async () => {
        await Tool.createDir(tempDirPath);
        const tempFilePath1 = path.join(tempDirPath, 'temp1.txt');
        const tempFilePath2 = path.join(tempDirPath, 'temp2.txt');
        await fs.writeFile(tempFilePath1, 'Hello, World!', 'utf8');
        await fs.writeFile(tempFilePath2, 'Hello, World!', 'utf8');

        const filesToRemove = [tempFilePath1, tempFilePath2];

        await Tool.removeFiles(filesToRemove);

        const file1Exists = await Tool.exist(tempFilePath1);
        expect(file1Exists).toBe(false);

        const file2Exists = await Tool.exist(tempFilePath2);
        expect(file2Exists).toBe(false);
    });

    //TODO: check this test
    //it('should remove a directory and its contents', async () => {

    // const tempDirPath = path.join(process.env.RUNNER_TEMP || tmpDir, `toolTestRemoveDir`);
    // await Tool.createDir(tempDirPath);

    // const tempFilePath = path.join(tempDirPath, 'temp.txt');
    // await fs.writeFile(tempFilePath, 'Hello, World!');

    // await Tool.removeDir(tempDirPath);

    // const dirExists = await Tool.exist(tempDirPath);
    // expect(dirExists).toBe(false);
    //});

    it('should run the tool logic', async () => {
        if (process.env.RUNNER_TEMP) return; // TODO: check this test on github actions
        const tempDir = tempDirPath
        const tempDirPathOut = path.join(tempDir, `out`);

        await Tool.removeDir(tempDir);
        await Tool.createDir(tempDir);

        const tempFilePath = path.join(tempDir, 'temp.txt');
        await fs.writeFile(tempFilePath, 'Hello, World!');

        const options = {};
        const pathIn = tempFilePath;
        const pathOut = tempDirPathOut;

        const toolInstance = new Tool(options, path.join(tempDir, '**/*'), pathOut);
        const result = await toolInstance.run();

        expect(result.files).toEqual([
            `${tempDirPathOut}/temp.txt`
        ]);
    });

    it('should run the tool logic with arguments on constructor', async () => {
        if (process.env.RUNNER_TEMP) return; // TODO: check this test on github actions 
        const tempDir = tempDirPath
        const tempDirPathOut = path.join(tempDir, `Tool`, `out`);

        await Tool.removeDir(tempDir);
        await Tool.createDir(tempDir);

        const tempFilePath = path.join(tempDir, 'temp.txt');
        await fs.writeFile(tempFilePath, 'Hello, World!');

        const pathIn = tempFilePath;
        const pathOut = tempDirPathOut;

        const toolInstance = new Tool({ export: false }, path.join(tempDir, '**/*'), pathOut);
        const result = await toolInstance.run();

        expect(result.options.export).toEqual(false);
    });
});
