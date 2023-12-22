import { describe, it, expect, beforeEach } from 'vitest';
import Tool from '../ToolCombine';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url'

describe('ToolCombine', async () => {
    let toolInstance;
    const __dirname = path.dirname(fileURLToPath(import.meta.url));

    await Tool.removeDir(path.join(os.tmpdir(), `ToolCombine`));

    beforeEach(async () => {
        toolInstance = new Tool();
    });

    it('should create an instance of Tool', () => {
        expect(toolInstance).toBeInstanceOf(Tool);
    });

    it('should run the tool logic', async () => {
        const tempDir = path.join(os.tmpdir(), `ToolCombine`);
        const tempDirPathOut = path.join(tempDir, `out`);

        const tempFilePath = `${__dirname}/assets/**/*`;

        const options = {};
        const pathIn = tempFilePath;
        const pathOut = tempDirPathOut;

        const toolInstance = new Tool();
        const result = await toolInstance.run(options, pathIn, pathOut);
    });
});
