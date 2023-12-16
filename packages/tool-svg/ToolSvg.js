import Tool from '@toolx/core/Tool.server.js';
import { optimize } from 'svgo';
import fs from 'node:fs';

class ToolSvg extends Tool {
    options = {
        exts: ['svg'],
        settings: {},
    }

    async onEveryFile(next, { file, options }) {
        const svgString = await fs.promises.readFile(file, 'utf-8');
        const result = optimize(svgString, {
            path: file,
            multipass: true,
            ...options.settings,
        });
        await fs.promises.writeFile(file, result.data);
        next(file);
    }
}

export default ToolSvg
