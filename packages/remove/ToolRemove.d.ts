export default ToolRemove;
declare class ToolRemove extends Tool {
    options: {
        noTempCopy: boolean;
    };
    onEveryFile(next: any, { file, options }: {
        file: any;
        options: any;
    }): Promise<void>;
}
import Tool from '@toolx/core/Tool.server.js';
