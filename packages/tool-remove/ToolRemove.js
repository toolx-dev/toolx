
import Tool from '@toolx/core/Tool.server.js';

class ToolRemove extends Tool {
    options = {
        noTempCopy: true,
    }

    async onEveryFile(next, { file, options }) {
        if (await Tool.exist(file))
            await Tool.removeDir(file)
        next(file);
    }
}

export default ToolRemove
