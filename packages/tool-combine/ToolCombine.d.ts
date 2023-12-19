export default ToolCombine;
declare class ToolCombine extends Tool {
    options: {
        exts: string[];
    };
    fileCollector: any[];
    groups: any[];
    combineImages(image1: any, image2: any, image3: any): Promise<(Buffer | {
        width: any;
        height: any;
        channels: number;
    })[]>;
    onEveryFile(next: any, { file }: {
        file: any;
    }): Promise<void>;
    onBody(next: any, { files, ...props }: {
        [x: string]: any;
        files: any;
    }): Promise<void>;
}
import Tool from "@toolx/core/Tool.server";
