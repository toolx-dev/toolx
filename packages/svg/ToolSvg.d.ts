export default ToolSvg;
export type ToolOptions = {
    /**
     * - Options to set the multipass property [default = true].
     */
    multipass?: boolean;
    /**
     * - Options to configure extensions.
     */
    exts?: ['svg'];
    /**
     * - Options to configure sharp library features.
     */
    settings?: ToolSettings;
};
export type ToolSettings = {
    /**
     * - Control the precision of floating point numbers.
     */
    floatPrecision?: number;
    /**
     * - Control the precision of transformation expressions.
     */
    transformPrecision?: number;
};
declare class ToolSvg extends Tool {
    /**
    * Constructs a new ToolSvg instance.
    * @param {ToolOptions} options - Configuration options for ToolSvg.
    */
    constructor(options: ToolOptions, pathIn: any, pathOut: any);
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
