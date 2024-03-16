import Tool from '@toolx/core/Tool.server.js';
import fs from 'node:fs';
class ToolJSON extends Tool {
    options = {
        exts: ['json']
    }

    async onEveryFile(next, { file, options }) {
        const json = JSON.parse(await fs.promises.readFile(file, 'utf8'));
        await fs.promises.writeFile(file, JSON.stringify(json));
        next(file);
    }
}

export default ToolJSON