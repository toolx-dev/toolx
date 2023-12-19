export default ToolSvg;
declare class ToolSvg extends Tool {
    options: {
        exts: string[];
        settings: {};
    };
    onEveryFile(next: any, { file, options }: {
        file: any;
        options: any;
    }): Promise<void>;
}
import Tool from "@toolx/core/Tool.server";
