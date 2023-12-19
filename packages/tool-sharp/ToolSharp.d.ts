export default ToolSharp;
export type ToolSharpOptions = {
    /**
     * - Options to configure sharp library features.
     */
    api?: SharpOptions;
};
export type SharpOptions = import('sharp').SharpOptions;
declare class ToolSharp extends Tool {
    /**
    * Constructs a new ToolSharp instance.
    * @param {ToolSharpOptions} options - Configuration options for ToolSharp.
    */
    constructor(options: ToolSharpOptions, pathIn: any, pathOut: any);
    options: {
        exts: string[];
    };
    onEveryFile(next: any, { file, options }: {
        file: any;
        options: any;
    }): Promise<void>;
}
import Tool from "@toolx/core/Tool.server";
