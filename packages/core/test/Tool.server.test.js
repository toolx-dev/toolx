import { describe, it, expect, beforeEach } from 'vitest';
import Tool from '../Tool.server';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';

describe('Tool class', () => {
    let toolInstance;

    beforeEach(async () => {
        toolInstance = new Tool();
    });

    it('should create an instance of Tool', () => {
        expect(toolInstance).toBeInstanceOf(Tool);
    });

    it('should have options initialized', () => {
        expect(toolInstance.options).toEqual({});
    });

    it('should check if create dir and path exists', async () => {
        const tempDirPath = path.join(os.tmpdir(), `toolTest`);
        await Tool.createDir(tempDirPath);
        const dirExists = await Tool.exist(tempDirPath)
        expect(dirExists).toBe(true);
        const tempFilePath = path.join(tempDirPath, 'temp.txt');
        await fs.writeFile(tempFilePath, 'Hello, World!');
        const fileExists = await Tool.exist(tempFilePath)
        expect(fileExists).toBe(true);
    });

    it('should create a directory if it does not exist', async () => {
        const tempDirPath = path.join(os.tmpdir(), `toolTestNoExist`);
        const dirExists = await Tool.exist(tempDirPath)
        expect(dirExists).toBe(false);
    });

    it('should change the file extension', () => {
        const file = 'example.jpg';
        const newExt = '.png';
        const changedFile = Tool.changeExt(file, newExt);

        expect(changedFile).toBe('example.png');
    });

    it('should remove specified files', async () => {
        const tempDirPath = path.join(os.tmpdir(), `toolTest`);
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

    it('should remove a directory and its contents', async () => {
        const tempDirPath = path.join(os.tmpdir(), `toolTestRemoveDir`);
        await Tool.createDir(tempDirPath);

        const tempFilePath = path.join(tempDirPath, 'temp.txt');
        await fs.writeFile(tempFilePath, 'Hello, World!');

        //TODO: check this test
        // await Tool.removeDir(tempDirPath);

        // const dirExists = await Tool.exist(tempDirPath);
        // expect(dirExists).toBe(false);
    });

    it('should run the tool logic', async () => {
        const tempDir = path.join(os.tmpdir(), `Tool`);
        const tempDirPathOut = path.join(tempDir, `out`);

        const tempFilePath = path.join(tempDir, 'temp.txt');
        await fs.writeFile(tempFilePath, 'Hello, World!');

        const options = {};
        const pathIn = tempFilePath;
        const pathOut = tempDirPathOut;

        const toolInstance = new Tool();
        const result = await toolInstance.run(options, pathIn, pathOut);

        // TODO: check this test
        // expect(result.files).toEqual([
        //     `${tempDir}/toolTest_out/temp.txt`
        // ]);
    });
});
