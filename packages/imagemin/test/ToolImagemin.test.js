import { describe, it, expect, beforeEach } from 'vitest';
import Tool from '../ToolImagemin';
import path from 'node:path'
import { fileURLToPath } from 'node:url'

describe('ToolImagemin', () => {
    let toolInstance;

    const __dirname = path.dirname(fileURLToPath(import.meta.url));

    beforeEach(async () => {
        toolInstance = new Tool();
    });

    it('should create an instance of Tool', () => {
        expect(toolInstance).toBeInstanceOf(Tool);
    });

    it('should run the tool logic', async () => {
        const tempDirPathOut = path.join(__dirname, 'tmp')

        await Tool.removeDir(tempDirPathOut);

        const tempFilePath = `${__dirname}/assets/*`;

        const toolInstance = new Tool({}, tempFilePath, tempDirPathOut);
        const result = await toolInstance.run();

        expect(result.files).toEqual([
            `${tempDirPathOut}/fileTest_1.png`,
            `${tempDirPathOut}/fileTest_2.png`,
            `${tempDirPathOut}/fileTest_3.gif`
        ]);
    });

    it('should run the tool logic with options', async () => {
        const tempDirPathOut = path.join(__dirname, 'tmp')

        await Tool.removeDir(tempDirPathOut);

        const tempFilePath = `${__dirname}/assets/**/*`;

        const toolInstance = new Tool({
            png: {
                quality: [0.2, 0.9],
                strip: true,
                speed: 1,
                dithering: 0.4,
                posterize: 0.2,
            },
            jpg: {
                progressive: true,
                arithmetic: true,
            }
        }, tempFilePath, tempDirPathOut);
        const result = await toolInstance.run();

        expect(result.files).toEqual([
            `${tempDirPathOut}/fileTest_1.png`,
            `${tempDirPathOut}/fileTest_2.png`,
            `${tempDirPathOut}/fileTest_3.gif`,
            `${tempDirPathOut}/subfolder/fileTest_1.png`,
        ]);
    });
});
