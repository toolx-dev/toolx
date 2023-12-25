import { describe, it, expect, beforeEach } from 'vitest';
import Tool from '../ToolJSON';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

describe('ToolJSON', async () => {
    let toolInstance;

    const __dirname = path.dirname(fileURLToPath(import.meta.url));

    beforeEach(async () => {
        toolInstance = new Tool();
    });

    it('should create an instance of Tool', () => {
        expect(toolInstance).toBeInstanceOf(Tool);
    });

    it('should run the tool logic', async () => {
        await Tool.removeDir(path.join(os.tmpdir(), `ToolImagemin`));

        const tempDir = path.join(os.tmpdir(), `ToolImagemin`);
        const tempFilePath = [`${__dirname}/assets/fileTest_1.json`, `${__dirname}/assets/fileTest_2.json`];
        const tempDirPathOut = path.join(tempDir, `out`);

        await Tool.removeDir(tempDirPathOut);
        await Tool.createDir(tempDirPathOut);

        const toolInstance = new Tool();
        const result = await toolInstance.run({}, tempFilePath, tempDirPathOut);
        expect(result.files).toEqual([
            `${__dirname}/assets/out/fileTest_1.json`,
            `${__dirname}/assets/out/fileTest_2.json`
        ]);
    });
});
