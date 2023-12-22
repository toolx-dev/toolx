import Tool from '@toolx/core/Tool.server.js';
import { optimize } from 'svgo';
import fs from 'node:fs';

class ToolSvg extends Tool {
    options = {
        exts: ['svg'],
        settings: {},
    }

    /**
    * Constructs a new ToolSvg instance.
    * @param {ToolOptions} options - Configuration options for ToolSvg.
    */
    constructor(options, pathIn, pathOut) {
        super(options, pathIn, pathOut);
    }

    async onEveryFile(next, { file, options }) {
        const svgString = await fs.promises.readFile(file, 'utf-8');
        const result = optimize(svgString, {
            path: file,
            multipass: options?.multipass || true,
            ...options.settings,
        });
        await fs.promises.writeFile(file, result.data);
        next(file);
    }
}

export default ToolSvg


/**
 * @typedef {Object} ToolOptions
 * @property {boolean} [multipass] - Options to set the multipass property [default = true].
 * @property {['svg']} [exts] - Options to configure extensions.
 * @property {ToolSettings} [settings] - Options to configure sharp library features.
 */

/**
 * @typedef ToolSettings
 * @property {number} [floatPrecision] - Control the precision of floating point numbers.
 * @property {number} [transformPrecision] - Control the precision of transformation expressions.
 */
