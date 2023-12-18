import { describe, it, expect, beforeEach } from 'vitest';
import Tool from '../ToolSvg';
import path from 'node:path';
import os from 'node:os';
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'

describe('ToolSvg', () => {
    let toolInstance;
    const __dirname = path.dirname(fileURLToPath(import.meta.url));

    beforeEach(async () => {
        toolInstance = new Tool();
    });

    it('should create an instance of Tool', () => {
        expect(toolInstance).toBeInstanceOf(Tool);
    });

    it('should run the tool logic', async () => {
        const tempDir = path.join(os.tmpdir(), `ToolSvg`);
        const tempDirPathOut = path.join(tempDir, `out`);

        const tempFilePath = `${__dirname}/assets/**/*`;

        const options = {
            settings: {
                floatPrecision: 5,
                transformPrecision: 5,
                js2svg: {
                    pretty: true
                }
            }
        };
        const pathIn = tempFilePath;
        const pathOut = tempDirPathOut;

        const toolInstance = new Tool();
        const result = await toolInstance.run(options, pathIn, pathOut);

        const processedFiles = await fs.promises.readdir(tempDirPathOut)

        expect(processedFiles.some(e => e.includes('.svg'))).toEqual(true)
    });
});
