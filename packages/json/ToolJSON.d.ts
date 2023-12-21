export default ToolJSON;
declare class ToolJSON extends Tool {
    options: {
        exts: string[];
    };
    onEveryFile(next: any, { file, options }: {
        file: any;
        options: any;
    }): Promise<void>;
}
import Tool from "@toolx/core/Tool.server";
