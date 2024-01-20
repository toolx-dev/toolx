import { describe, it, expect, beforeEach } from 'vitest';
import Tool from '../ToolImagemin';
import path from 'node:path'
import fs from 'node:fs'
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
        const tempDirPathOut = `${__dirname}/tmp`

        await Tool.removeDir(tempDirPathOut);

        const tempFilePath = `${__dirname}/assets/*`;

        const toolInstance = new Tool({}, tempFilePath, tempDirPathOut);
        const result = await toolInstance.run();

        expect(result.files).toEqual(expect.arrayContaining(([
            `${tempDirPathOut}/fileTest_1.png`,
            `${tempDirPathOut}/fileTest_2.png`,
            `${tempDirPathOut}/fileTest_3.jpg`,
        ])));
    });

    it('should run the tool logic with sub folder', async () => {
        const tempDirPathOut = `${__dirname}/tmp`

        await Tool.removeDir(tempDirPathOut);

        const tempFilePath = `${__dirname}/assets/**/*`;

        const toolInstance = new Tool({}, tempFilePath, tempDirPathOut);
        const result = await toolInstance.run();

        expect(result.files).toEqual(expect.arrayContaining(([
            `${tempDirPathOut}/fileTest_1.png`,
            `${tempDirPathOut}/fileTest_2.png`,
            `${tempDirPathOut}/fileTest_3.jpg`,
            `${tempDirPathOut}/subfolder/fileTest_1.png`,
        ])));
    });


    let prevSizeFile;

    [{
        options: { lossless: true },
        label: 'JPG lossless = true',
        type: 'toBeLessThan',
        fileName: 'fileTest_3.jpg',
    },
    {
        options: { lossless: false },
        label: 'JPG lossless = false',
        type: 'toBeLessThan',
        fileName: 'fileTest_3.jpg',
        thanPrevious: true
    },
    {
        options: { lossless: true },
        label: 'PNG lossless = true',
        type: 'toBeLessThan',
        fileName: 'fileTest_2.png',
    },
    {
        options: { lossless: false },
        label: 'PNG lossless = false',
        type: 'toBeLessThan',
        fileName: 'fileTest_2.png',
        thanPrevious: true
    },
    {
        options: { compression: 2 },
        label: 'JPG compression = 2',
        type: 'toBeLessThan',
        fileName: 'fileTest_3.jpg',
    },
    {
        options: { compression: 8 },
        label: 'JPG compression = 8',
        type: 'toBeLessThan',
        fileName: 'fileTest_3.jpg',
        thanPrevious: true
    },
    {
        options: { compression: 2 },
        label: 'PNG compression = 2',
        type: 'toBeLessThan',
        fileName: 'fileTest_2.png',
    },
    {
        options: { compression: 8 },
        label: 'PNG compression = 8',
        type: 'toBeLessThan',
        fileName: 'fileTest_2.png',
        thanPrevious: true
    },
    {
        options: { colors: 190, lossless: false },
        label: 'PNG colors = 190',
        type: 'toBeLessThan',
        fileName: 'fileTest_2.png',
    },
    {
        options: { colors: 40, lossless: false },
        label: 'PNG colors = 40',
        type: 'toBeLessThan',
        fileName: 'fileTest_2.png',
        thanPrevious: true
    }
    ].forEach(({ options, type, label, thanPrevious, fileName }) => {
        it(`should run the tool logic with options: ${label}`, async () => {
            const tempDirPathOut = `${__dirname}/tmp`

            await Tool.removeDir(tempDirPathOut);

            const tempFilePath = `${__dirname}/assets/${fileName}`;
            let prevSize;

            const toolInstance = new Tool({
                ...options,
                preprocess: ({ file }) => {
                    prevSize = fs.statSync(file).size;
                    return Promise.resolve();
                },
                postprocess: ({ file }) => {
                    const currentSize = fs.statSync(file).size;
                    expect(currentSize)[type](prevSize);
                    if (thanPrevious && prevSizeFile) expect(currentSize)[type](prevSizeFile);
                    prevSizeFile = currentSize;
                    return Promise.resolve();
                }
            }, tempFilePath, tempDirPathOut);

            await toolInstance.run();
        });
    })
});
