import { describe, it, afterAll, expect, beforeEach } from 'vitest';
import Tool from '../ToolCombine';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url'

describe('ToolCombine', () => {
    let toolInstance;
    const __dirname = path.dirname(fileURLToPath(import.meta.url));

    beforeEach(() => {  
        toolInstance = new Tool();
    });

    it('should create an instance of Tool', () => {
        expect(toolInstance).toBeInstanceOf(Tool);
    });

    it('should run the tool logic', async () => {
        const tempDir = path.join(os.tmpdir(), `ToolCombine`);
        await Tool.removeDir(path.join(os.tmpdir(), `ToolCombine`));
        const tempDirPathOut = path.join(tempDir, `out`);

        const tempFilePath = `${__dirname}/assets/**/*`;

        const options = {};
        const pathIn = tempFilePath;
        const pathOut = tempDirPathOut;

        const result = await toolInstance.run(options, pathIn, pathOut);
    });
});
